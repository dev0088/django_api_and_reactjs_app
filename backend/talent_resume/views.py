from django.shortcuts import render
from django.http import Http404

from rest_framework import permissions, status, authentication
from rest_framework.response import Response
from rest_framework.views import APIView
from talent_picture.config_aws import (
    AWS_UPLOAD_BUCKET,
    AWS_UPLOAD_REGION,
    AWS_UPLOAD_ACCESS_KEY_ID,
    AWS_UPLOAD_SECRET_KEY,
    AWS_UPLOAD_RESUMES_PATH
)
from .models import TalentResume
from .serializers import TalentResumeSerializer
from talent.models import Talent
from authentication.models import User

import boto
import mimetypes
import json
import time
import os

class TalentResumeFileUploadPolicy(APIView):
    """
    This view is to get the AWS Upload Policy for images to s3 bucket.
    What we do here is first create a TalentResume object instance in ShipTalent
    backend. This is to include the TalentResume instance in the path
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
        content_type = request.data.get('contentType') #mimetypes.guess_type(object_name)[0]
        if not object_name:
            return Response({"message": "A filename is required"}, status=status.HTTP_400_BAD_REQUEST)
        if not content_type:
            return Response({"message": "A content type is required"}, status=status.HTTP_400_BAD_REQUEST)

        # Generate bucket sub url
        policy_expires = int(time.time()+5000)
        talent = self.get_object(pk)
        talent_id = talent.id
        user_id = talent.user.username
        if not talent.talent_resume and not talent.talent_resume.id:
        	talent_resume = TalentResume.objects.get(id=talent.talent_resume.id)
        else:
        	talent_resume = TalentResume.objects.create(talent=talent, name=object_name)

        talent_resume_id = talent_resume.id
        _, file_extension = os.path.splitext(object_name)
        
        upload_start_path = "{resumes_path}/{talent_id}/".format(
                resumes_path=AWS_UPLOAD_RESUMES_PATH,
                talent_id = talent_id,
                talent_resume_id=talent_resume_id,
                file_extension=file_extension
            )
        filename_final = "{talent_resume_id}{file_extension}".format(
                talent_resume_id= talent_resume_id,
                file_extension=file_extension
            )
 
        # Save signed url
        """
        Eventual file_upload_path includes the renamed file to the 
        Django-stored TalentResume instance ID. Renaming the file is 
        done to prevent issues with user generated formatted names.
        """
        final_upload_path = "{upload_start_path}{filename_final}".format(
                upload_start_path=upload_start_path,
                filename_final=filename_final,
            )

        upload_url = "https://{bucket_name}.s3.amazonaws.com/{final_upload_path}".format(
                bucket_name=AWS_UPLOAD_BUCKET,
                final_upload_path=final_upload_path
            )

        # get signed url from AWS S3
        signed_url = conn.generate_url(
            300,
            "PUT",
            AWS_UPLOAD_BUCKET,
            final_upload_path,
            headers = {'Content-Type': content_type, 'x-amz-acl':'public-read'})

        if object_name and file_extension:
            """
            Save the eventual path to the Django-stored TalentResume instance
            """
            talent_resume.path = final_upload_path
            talent_resume.url = upload_url
            talent_resume.save()

        data = {
            'signedUrl': signed_url,
            'fileID': talent_resume_id
        }
        return Response(data, status=status.HTTP_200_OK)


class TalentResumeFileUploadCompleteHandler(APIView):
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
            obj = TalentResume.objects.get(id=int(file_id))
            obj.size = int(size)
            obj.uploaded = True
            obj.type = type_
            obj.save()
            data['id'] = obj.id
            data['saved'] = True
        return Response(data, status=status.HTTP_200_OK)


class TalentResumeList(APIView):
    """
    List all talent resumes.
    """

    def get(self, request, pk, format=None):
        try:
            user = User.objects.get(pk=pk)
            talent = Talent.objects.get(user=user.id)
            talent_resumes = TalentResume.objects.filter(talent=talent.id)
            serializer = TalentResumeSerializer(talent_resumes, many=True)
            return Response(serializer.data)
        except Talent.DoesNotExist:
            raise Http404
