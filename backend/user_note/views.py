from authentication.models import User
from client.models import Client
from team.models import Team
from user_note.models import UserNote
from user_note.serializers import UserNoteSerializer
from user_note.detail_serializers import UserNoteDetailSerializer
from user_note.create_serializers import UserNoteCreateSerializer
from django.http import Http404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework_bulk import (ListBulkCreateUpdateDestroyAPIView)
from drf_yasg.utils import swagger_auto_schema


class UserNoteList(APIView):
    """
    Retrieve all notes of user.
    """
    @swagger_auto_schema(responses={200: UserNoteSerializer(many=True)})
    def get(self, request, format=None):
        user = User.objects.get(pk=request.user.pk)
        user_notes = UserNote.objects.get(receiver=user)
        serializer = UserNoteSerializer(user_notes, many=True)
        return Response(serializer.data)


class UserNoteDetail(APIView):
    """
    Retrieve, update or delete a casting request of client.
    """
    def get_object(self, pk):
        try:
            return UserNote.objects.get(pk=pk)
        except UserNote.DoesNotExist:
            raise Http404

    @swagger_auto_schema(responses={200: UserNoteDetailSerializer(many=False)})
    def get(self, request, pk, format=None):
        user_note = self.get_object(pk)
        serializer = UserNoteDetailSerializer(user_note)
        return Response(serializer.data)

    @swagger_auto_schema(
        request_body=UserNoteCreateSerializer(many=True),
        responses={200: UserNoteSerializer(many=False)}
    )
    def put(self, request, pk, format=None):
        user_note = self.get_object(pk)
        serializer = UserNoteSerializer(user_note, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response({'error': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

    @swagger_auto_schema(responses={200: 'OK'})
    def delete(self, request, pk, format=None):
        user_note = self.get_object(pk)
        user_note.delete()
        return Response({'id': int(pk)}, status=status.HTTP_200_OK)