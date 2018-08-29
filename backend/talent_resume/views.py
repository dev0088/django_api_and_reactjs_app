import boto
import mimetypes
import json
import time
import os
import sys

from werkzeug.utils import secure_filename

from django.shortcuts import render
from django.http import Http404

from django.core.files.storage import default_storage
from django.core.files.base import ContentFile
from django.conf import settings

from rest_framework import permissions, status, authentication
from rest_framework.exceptions import ParseError
from rest_framework.parsers import FileUploadParser
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
from talent_resume.text2pdf import text_to_image
from talent_resume.pdf2jpg import pdf_to_image
from talent_resume.doc2pdf import doc_to_pdf, docx_to_pdf

ALLOWED_EXTENSIONS = set(['txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif'])

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
        talent_resumes = TalentResume.objects.filter(talent=talent)
        print('==== talent_resumes: ', talent_resumes)
        print('==== talent.talent_resume.count: ', len(talent_resumes))
        if len(talent_resumes) > 0:
          talent_resume = talent_resumes.first()
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
            talent_resume.file_type = file_extension
            talent_resume.save()

        data = {
            'signedUrl': signed_url,
            'fileID': talent_resume_id
        }
        return Response(data, status=status.HTTP_200_OK)


class TalentResumeFileUploadCompleteHandler(APIView):
    # permission_classes = [permissions.IsAuthenticated]
    # authentication_classes = [authentication.SessionAuthentication]
    # Save uploaded file path and mark active state of it.
    """
    Save uploaded file path and mark active state of it.
    """
    def post(self, request, *args, **kwargs):
        print('==== request.data: ', request.data)
        file_id = request.data.get('fileID')
        size = request.data.get('fileSize')
        course_obj = None
        data = {}
        file_type = request.data.get('fileType')
        tmp = file_type.split('/')
        file_type = tmp[len(tmp) - 1]
        print(file_id, size, file_type)
        if file_id:
            obj = TalentResume.objects.get(id=int(file_id))
            obj.size = int(size)
            obj.uploaded = True
            # obj.file_type = file_type
            obj.save()
            data['id'] = obj.id
            data['saved'] = True
        return Response(data, status=status.HTTP_200_OK)


class TalentResumeGeneratePrevew(APIView):
    parser_class = (FileUploadParser,)
    height = 1024
    width = 526
    page_id = 1

    def get_object(self, pk):
        try:
            user = User.objects.get(pk=pk)
            talent = Talent.objects.get(user=user.id)
            return talent
        except Talent.DoesNotExist:
            raise Http404
 

    def convert_pdf_to_image(self, cach_dir_path, file_path):
        return pdf_to_image(cach_dir_path, file_path)

    def convert_text_to_png(self, file_path):
        file_name, file_extension = os.path.splitext(file_path)
        image_file_name = '{file_name}{extension}'.format(
                file_name = file_name,
                extension = '.png'
            )
        image = text_to_image(file_path)
        image.save(image_file_name)
        return image_file_name

    def convert_doc_to_pdf(self, file_path):
        preview = doc_to_pdf(file_path)
        return preview

    def convert_docx_to_pdf(self, file_path):
        preview = docx_to_pdf(file_path)
        return preview


    """
    Generate preview resume file in pdf, doc, docx format files and return image path.
    """   
    def put(self, request, pk, format=None):
        talent = self.get_object(pk)

        if 'file' not in request.data:
            raise ParseError("Empty content")

        if not talent:
            raise ParseError("Not found the talent or user")

        # Save temp file
        f = request.data['file']

        file_name = secure_filename(request.data['fileName'])
        file_id = request.data['fileID']
        tmp_file_dir = 'resumes/{talent_id}/'.format(
                talent_id = talent.id
            )
        tmp_file_path = '{tmp_file_dir}/{file_name}'.format(
                tmp_file_dir = tmp_file_dir,
                file_name = file_name
            )
        stored_path = default_storage.save(tmp_file_path, ContentFile(f.read()))

        # Generate preview file in image file
        media_root = settings.MEDIA_ROOT
        full_dir = os.path.join(media_root, tmp_file_dir)
        full_path = os.path.join(media_root, stored_path)

        # Get extension
        _, file_extension = os.path.splitext(stored_path)
        if sys.platform == 'darwin':
            if file_extension == '.txt':
                preview = self.convert_text_to_png(full_path)
            elif file_extension == '.doc':
                preview = self.convert_doc_to_pdf(full_path)
                preview = self.convert_pdf_to_image(full_dir, preview)
            elif file_extension == '.docx':
                preview = self.convert_docx_to_pdf(full_path)
                preview = self.convert_pdf_to_image(full_dir, preview)
            elif file_extension == '.pdf':
                preview = self.convert_pdf_to_image(full_dir, full_path)
        else:
            preview = self.convert_pdf_to_image(full_dir, full_path)

        tmp = preview.split('/')
        preview_file_name = tmp[len(tmp) - 1]
        preview_file_path = os.path.join('media', tmp_file_dir, preview_file_name)
        
        # Save generated preview image file path
        data = {}
        obj = TalentResume.objects.get(id=int(file_id))
        obj.uploaded = True
        obj.preview_path = preview_file_path
        obj.save()

        data['id'] = obj.id
        data['preview_path'] = stored_path
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

class TalentResumeDetail(APIView):
    """
    Retrieve a talent picture instance.
    """
    def get_object(self, pk):
        try:
            return TalentResume.objects.get(pk=pk)
        except TalentResume.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        talent_resume_item = self.get_object(pk)
        serializer = TalentResumeSerializer(talent_resume_item)
        return Response(serializer.data)

    def put(self, request, pk, format=None):
        talent_resume_item = self.get_object(pk)
        serializer = TalentResumeSerializer(talent_resume_item, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        talent_resume_item = self.get_object(pk)
        talent_resume_item.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)