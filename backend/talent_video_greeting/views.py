import boto
import time
import os
from django.http import Http404
from rest_framework import permissions, status, authentication
from rest_framework.response import Response
from rest_framework.views import APIView
from talent_picture.config_aws import (
    AWS_UPLOAD_BUCKET,
    AWS_UPLOAD_REGION,
    AWS_UPLOAD_ACCESS_KEY_ID,
    AWS_UPLOAD_SECRET_KEY,
    AWS_UPLOAD_VIDEOS_PATH,
)
from .models import TalentVideoGreeting
from .serializers import TalentVideoGreetingSerializer
from talent.models import Talent
from authentication.models import User


class GreetingVideoFileUploadPolicy(APIView):
    """
    This view is to get the AWS Upload Policy for images to s3 bucket.
    What we do here is first create a TalentVideoGreeting object instance in ShipTalent
    backend. This is to include the TalentVideoGreeting instance in the path
    we will use within our bucket as you'll see below.
    """
    # permission_classes = [permissions.IsAuthenticated]
    # authentication_classes = [authentication.SessionAuthentication]

    def get_object(self, pk):
        try:
            user = User.objects.get(pk=pk)
            talent = Talent.objects.get(user=user.id)
            return talent
        except Talent.DoesNotExist:
            raise Http404

    def post(self, request, pk, format=None):
        conn = boto.connect_s3(AWS_UPLOAD_ACCESS_KEY_ID, AWS_UPLOAD_SECRET_KEY)

        object_name = request.data.get('objectName')
        content_type = request.data.get('contentType')
        language = request.data.get('language') if request.data.get('language') else "English"
        priority = request.data.get('priority') if request.data.get('priority') else 1

        if not object_name:
            return Response({"message": "A filename is required"}, status=status.HTTP_400_BAD_REQUEST)
        if not content_type:
            return Response({"message": "A content type is required"}, status=status.HTTP_400_BAD_REQUEST)

        # Generate bucket sub url
        policy_expires = int(time.time()+5000)
        talent = self.get_object(pk)
        talent_id = talent.id
        user_id = talent.user.username

        # Check and delete video_greeting for talent and language
        talent_video_greetings = TalentVideoGreeting.objects.filter(
            talent_id=talent_id,
            language=language,
            priority=priority
        )
        # if len(talent_video_greetings) > 0:
        #   talent_video_greeting = talent_video_greetings.first()
        # else:
        #   # In the case don't exist, create new
        #   talent_video_greeting = TalentVideoGreeting.objects.create(talent=talent, name=object_name)

        if len(talent_video_greetings) > 0:
            talent_video_greeting = talent_video_greetings.first()
            talent_video_greeting.delete()

        talent_video_greeting = TalentVideoGreeting.objects.create(talent=talent, name=object_name)
        talent_video_id = talent_video_greeting.id
        _, file_extension = os.path.splitext(object_name)
        
        upload_start_path = "{videos_path}/{talent_id}/".format(
                videos_path=AWS_UPLOAD_VIDEOS_PATH,
                talent_id=talent_id,
                talent_video_id=talent_video_id,
                file_extension=file_extension
            )
        filename_final = "{talent_video_id}{file_extension}".format(
                talent_video_id= talent_video_id,
                file_extension=file_extension
            )
 
        # Save signed url
        """
        Eventual file_upload_path includes the renamed file to the 
        Django-stored TalentVideoGreeting instance ID. Renaming the file is 
        done to prevent issues with user generated formatted names.
        """
        final_upload_path = "{upload_start_path}{filename_final}".format(
                upload_start_path=upload_start_path,
                filename_final=filename_final,
            )

        # get signed url from AWS S3
        signed_url = conn.generate_url(
            300,
            "PUT",
            AWS_UPLOAD_BUCKET,
            final_upload_path,
            headers = {'Content-Type': content_type, 'x-amz-acl':'public-read'})

        upload_url = "https://{bucket_name}.s3.amazonaws.com/{final_upload_path}".format(
                bucket_name=AWS_UPLOAD_BUCKET,
                final_upload_path=final_upload_path
            )

        if object_name and file_extension:
            """
            Save the eventual path to the Django-stored TalentVideoGreeting instance
            """
            talent_video_greeting.path = final_upload_path
            talent_video_greeting.url = upload_url
            talent_video_greeting.language = language
            talent_video_greeting.priority = priority
            talent_video_greeting.save()

        data = {
            'signedUrl': signed_url,
            'fileID': talent_video_id
        }
        return Response(data, status=status.HTTP_200_OK)


class GreetingVideoFileUploadCompleteHandler(APIView):
    # permission_classes = [permissions.IsAuthenticated]
    # authentication_classes = [authentication.SessionAuthentication]

    def post(self, request, *args, **kwargs):
        file_id = request.data.get('fileID')
        size = request.data.get('fileSize')
        course_obj = None
        data = {}
        type_ = request.data.get('fileType')
        print(file_id, size, type_)
        if file_id:
            obj = TalentVideoGreeting.objects.get(id=int(file_id))
            obj.size = int(size)
            obj.uploaded = True
            obj.file_type = type_
            obj.save()
            data['id'] = obj.id
            data['saved'] = True
        return Response(data, status=status.HTTP_200_OK)


class GreetingVideos(APIView):
    """
    List all talent pictures.
    """

    def get(self, request, pk, format=None):
        try:
            user = User.objects.get(pk=pk)
            talent = Talent.objects.get(user=user.id)
            talent_videos = TalentVideoGreeting.objects.filter(talent=talent.id)
            serializer = TalentVideoGreetingSerializer(talent_videos, many=True)
            return Response(serializer.data)
        except Talent.DoesNotExist:
            raise Http404

class GreetingVideoDetail(APIView):
    """
    Retrieve a greeting video instance.
    """
    def get_object(self, pk):
        try:
            return TalentVideoGreeting.objects.get(pk=pk)
        except TalentVideoGreeting.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        talent_greeting_video_item = self.get_object(pk)
        serializer = TalentVideoGreetingSerializer(talent_greeting_video_item)
        return Response(serializer.data)

    def put(self, request, pk, format=None):
        talent_greeting_video_item = self.get_object(pk)
        serializer = TalentVideoGreetingSerializer(talent_greeting_video_item, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response({'error': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        talent_greeting_video_item = self.get_object(pk)
        talent_greeting_video_item.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)