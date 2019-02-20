from authentication.models import User
from talent.models import Talent
from casting_request.models import CastingRequest
from casting_request_talent.models import CastingRequestTalent
from favorite.models import Favorite
from blocked_profile.models import BlockedProfile
from talent_rating.models import TalentRating
from talent_language.models import TalentLanguage
from talent_video_sub_skill.models import TalentVideoSubSkill
from user_note.models import UserNote, UserNoteManager
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

    def get_object_by_type_and_id(self, type, id):
        if type == 'Profile':
            obj = User.objects.get(id=id)
        elif type == 'CastingRequest':
            obj = CastingRequest.objects.get(id=id)
        elif type == 'CastingRequestTalent':
            obj = CastingRequestTalent.objects.get(id=id)
        elif type == 'DanceCombination':
            obj = TalentVideoSubSkill.objects.get(id=id)
        elif type == 'Search':
            obj = None
        elif type == 'View':
            obj = None
        elif type == 'Favorite':
            obj = Favorite.objects.get(id=id)
        elif type == 'Share':
            obj = SharedProfile.objects.get(id=id)
        elif type == 'Block':
            obj = BlockedProfile.objects.get(id=id)
        elif type == 'MedicalCondition':
            obj = None
        elif type == 'Medical':
            obj = Medical.objects.get(id=id)
        elif type == 'Login':
            obj = User.objects.get(id=id)
        elif type == 'Logout':
            obj = User.objects.get(id=id)
        elif type == 'TID':
            obj = User.objects.get(id=id)
        elif type == 'ChangePassword':
            obj = User.objects.get(id=id)
        elif type == 'Rating':
            obj = TalentRating.objects.get(id=id)
        elif type == 'PersonalInfo':
            obj = User.objects.get(id=id)
        elif type == 'Immigration':
            obj = User.objects.get(id=id)
        elif type == 'Language':
            obj = TalentLanguage.objects.get(id=id)
        
        return obj


    @swagger_auto_schema(request_body=UserNoteCreateSerializer,
                         responses={200: UserNoteDetailSerializer(many=False)})
    def post(self, request, format=None):
        admin = self.get_object(request.user)
        serializer = UserNoteCreateSerializer(data=request.data)
        if serializer.is_valid():
            data = serializer.validated_data
            try:
                object_id = data['object_id']
                obj = None
                if object_id:
                    obj = self.get_object_by_type_and_id(data['note_type'], object_id)

                note = UserNoteManager.generate_prefix(admin) + data['note']
                
                new_user_note = UserNote.objects.create(
                    creator=admin.first_name,
                    actor=admin,
                    receiver=data['receiver'],
                    note_type=data['note_type'],
                    note=note,
                    object_id=object_id if object_id else 0,
                    object_type=type(obj).__name__ if obj else ''
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
            if 'receivers' in data:
                user_notes = user_notes.filter(receiver_id__in=data['receivers'])
            if 'actor' in data:
                user_notes = user_notes.filter(receiver_id=data['actor'])
            if 'note_types' in data:
                user_notes = user_notes.filter(Q(note_type__in=data['note_types']))
            if 'note' in data:
                user_notes = user_notes.filter(note__icontains=data['note'])
            if 'object_id' in data:
                user_notes = user_notes.filter(object_id=data['object_id'])

            new_serializer = UserNoteSerializer(user_notes, many=True)
            return Response(new_serializer.data, status=status.HTTP_200_OK)
        
        return Response({'error': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
