from django.shortcuts import render
from submission.models import Submission
from submission.serializers import SubmissionSerializer
from django.http import Http404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
# Create your views here.
class SubmissionList(APIView):
    """
    List all submissions.
    """
    def get(self, request, format=None):
        submission = Submission.objects.all()
        serializer = SubmissionSerializer(submission, many=True)
        return Response(serializer.data)

class CreateSubmission(APIView):
    """
    Create a submissions.
    """
    def post(self, request, format=None):
        serializer = SubmissionSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response({'error': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

class SubmissionDetail(APIView):
    """
    Retrieve a submission_item instance.
    """
    def get_object(self, pk):
        try:
            return Submission.objects.get(pk=pk)
        except Submission.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        submission_item = self.get_object(pk)
        serializer = SubmissionSerializer(submission_item)
        return Response(serializer.data)

    def put(self, request, pk, format=None):
        submission_item = self.get_object(pk)
        serializer = SubmissionSerializer(submission_item, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response({'error': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        submission_item = self.get_object(pk)
        submission_item.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
