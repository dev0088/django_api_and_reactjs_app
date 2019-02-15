from authentication.models import User
from user_note.models import UserNote
from user_note.serializers import UserNoteSerializer
from user_note.detail_serializers import UserNoteDetailSerializer
from user_note.create_serializers import UserNoteCreateSerializer
from user_note.search_serializers import UserNoteSearchSerializer
from django.db.models import Q
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
        user_notes = UserNote.objects.all()
        serializer = UserNoteSerializer(user_notes, many=True)
        return Response(serializer.data)


class UserNoteDetail(APIView):
    """
    Retrieve, update or delete a casting request of user note.
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


class UserNoteCreate(APIView):
    """
    Get user note info
    """
    # authentication_classes = (authentication.TokenAuthentication, )
    # permission_classes = (permissions.IsAuthenticated,)

    def get_object(self, user):
      try:
        user = User.objects.get(pk=user.pk)
        return user
      except User.DoesNotExist:
        raise Http404

    @swagger_auto_schema(request_body=UserNoteCreateSerializer,
                         responses={200: UserNoteDetailSerializer(many=False)})
    def post(self, request, format=None):
        admin = self.get_object(request.user)
        serializer = UserNoteCreateSerializer(data=request.data)
        if serializer.is_valid():
            data = serializer.validated_data
            try:
                new_user_note = UserNote.objects.create(
                    creator=admin.first_name,
                    actor=admin,
                    receiver=data['receiver'],
                    note_type=data['note_type'],
                    note=data['note']
                )
                if 'object_type' in data:
                    new_user_note.object_type = data['object_type']
                    new_user_note.object_id = data['object_id']

                new_user_note.save()
                new_serializer = UserNoteDetailSerializer(new_user_note)
                return Response(new_serializer.data, status=status.HTTP_201_CREATED)
                
            except User.DoesNotExist:
                raise Http404

        return Response({'error': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)


class UserNoteSearch(APIView):
    """
    Search user note info according to conditions
    """
    # authentication_classes = (authentication.TokenAuthentication, )
    # permission_classes = (permissions.IsAuthenticated,)

    def get_object(self, user):
      try:
        user = User.objects.get(pk=user.pk)
        return user
      except User.DoesNotExist:
        raise Http404

    @swagger_auto_schema(request_body=UserNoteSearchSerializer,
                         responses={200: UserNoteDetailSerializer(many=True)})
    def post(self, request, format=None):
        admin = self.get_object(request.user)
        serializer = UserNoteSearchSerializer(data=request.data)
        if serializer.is_valid():
            data = serializer.validated_data
            user_notes = UserNote.objects.all()
            if 'creator' in request.data:
                user_notes = user_notes.filter(creator=data['creator'])
            if 'receiver' in data:
                user_notes = user_notes.filter(receiver_id=data['receiver'])
            if 'actor' in data:
                user_notes = user_notes.filter(receiver_id=data['actor'])
            if 'note_types' in data:
                user_notes = user_notes.filter(Q(note_type__in=data['note_types']))
            if 'note' in data:
                user_notes = user_notes.filter(note__icontains=data['note'])

            new_serializer = UserNoteSerializer(user_notes, many=True)
            return Response(new_serializer.data, status=status.HTTP_200_OK)
        
        return Response({'error': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
