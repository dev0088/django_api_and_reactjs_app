from django.shortcuts import render
from django.http import Http404

# Create your views here.
from rest_framework import permissions, status, authentication
from rest_framework.response import Response
from rest_framework.views import APIView
from .config_aws import (
    AWS_UPLOAD_BUCKET,
    AWS_UPLOAD_REGION,
    AWS_UPLOAD_ACCESS_KEY_ID,
    AWS_UPLOAD_SECRET_KEY,
    AWS_UPLOAD_IMAGES_PATH,
)
from .models import TalentPicture
from .serializers import TalentPictureSerializer
from talent.models import Talent
from authentication.models import User

import boto
import mimetypes
import json
import time
import os

class TalentPicturePolicy(APIView):
    """
    This view is to get the AWS Upload Policy for images to s3 bucket.
    What we do here is first create a TalentPicture object instance in ShipTalent
    backend. This is to include the TalentPicture instance in the path
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
        if not object_name:
            return Response({"message": "A filename is required"}, status=status.HTTP_400_BAD_REQUEST)
        if not content_type:
            return Response({"message": "A content type is required"}, status=status.HTTP_400_BAD_REQUEST)

        caption = request.data.get('caption')
        # Generate bucket sub url
        policy_expires = int(time.time()+5000)
        talent = self.get_object(pk)
        talent_id = talent.id
        user_id = talent.user.username
        talent_picture = TalentPicture.objects.create(talent=talent, name=object_name)
        talent_picture_id = talent_picture.id
        _, file_extension = os.path.splitext(object_name)
        
        upload_start_path = "{images_path}/{talent_id}/".format(
                images_path=AWS_UPLOAD_IMAGES_PATH,
                talent_id=talent_id,
                talent_picture_id=talent_picture_id,
                file_extension=file_extension
            )
        filename_final = "{talent_picture_id}{file_extension}".format(
                talent_picture_id= talent_picture_id,
                file_extension=file_extension
            )
 
        # Save signed url
        """
        Eventual file_upload_path includes the renamed file to the 
        Django-stored TalentPicture instance ID. Renaming the file is 
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
            Save the eventual path to the Django-stored TalentPicture instance
            """
            talent_picture.path = final_upload_path
            talent_picture.url = upload_url
            talent_picture.caption = caption
            talent_picture.save()

        data = {
            'signedUrl': signed_url,
            'fileID': talent_picture_id
        }
        return Response(data, status=status.HTTP_200_OK)


class FileUploadCompleteHandler(APIView):
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
            obj = TalentPicture.objects.get(id=int(file_id))
            obj.size = int(size)
            obj.uploaded = True
            obj.file_type = type_
            obj.save()
            data['id'] = obj.id
            data['saved'] = True
        return Response(data, status=status.HTTP_200_OK)


class TalentPictureList(APIView):
    """
    List all talent pictures.
    """
    def get(self, request, pk, format=None):
        try:
            user = User.objects.get(pk=pk)
            talent = Talent.objects.get(user=user.id)
            talent_pictures = TalentPicture.objects.filter(talent=talent.id)
            serializer = TalentPictureSerializer(talent_pictures, many=True)
            return Response(serializer.data)
        except Talent.DoesNotExist:
            raise Http404

class TalentPictureDetail(APIView):
    """
    Retrieve a talent picture instance.
    """
    def get_object(self, pk):
        try:
            return TalentPicture.objects.get(pk=pk)
        except TalentPicture.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        talent_picture_item = self.get_object(pk)
        serializer = TalentPictureSerializer(talent_picture_item)
        return Response(serializer.data)

    def put(self, request, pk, format=None):
        talent_picture_item = self.get_object(pk)
        serializer = TalentPictureSerializer(talent_picture_item, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        talent_picture_item = self.get_object(pk)
        talent_picture_item.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)