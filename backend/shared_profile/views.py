from authentication.models import User
from client.models import Client
from team.models import Team
from team_member.models import TeamMember
from team_member.serializers import TeamMemberSerializer
from shared_profile.models import SharedProfile
from shared_profile.serializers import SharedProfileSerializer
from shared_profile.detail_serializers import SharedProfileDetailSerializer
from shared_profile.create_serializers import SharedProfileCreateSerializer
from shared_profile.shared_talent_serializers import SharedTalentSerializer
from shared_profile.shared_talent_by_team_member_serializers import SharedTalentByTeamMemberSerializer
from talent.models import Talent
from talent.simple_serializers import TalentSimpleSerializer
from user_note.models import UserNote, UserNoteManager
from django.http import Http404, JsonResponse
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework import generics
from rest_framework_bulk import (ListBulkCreateUpdateDestroyAPIView)
from drf_yasg.utils import swagger_auto_schema
from django.db.models import Q


class SharedProfileList(APIView):
    """
    Retrieve all casting requests of client.
    """
    @swagger_auto_schema(responses={200: SharedProfileSerializer(many=True)})
    def get(self, request, format=None):
        user = User.objects.get(pk=request.user.pk)
        client = Client.objects.get(user=user)
        team = Team.objects.get(client_id=client.id)
        team_member_ids = TeamMember.objects.filter(team_id=team.id)\
            .values_list('id', flat=True)\
            .order_by('id')
        shared_profiles = SharedProfile.objects.filter(team_member_id__in=team_member_ids)
        serializer = SharedProfileSerializer(shared_profiles, many=True)
        return Response(serializer.data)


class SharedProfileDetail(APIView):
    """
    Retrieve, update or delete a casting request of client.
    """
    def get_object(self, pk):
        try:
            return SharedProfile.objects.get(pk=pk)
        except SharedProfile.DoesNotExist:
            raise Http404

    @swagger_auto_schema(responses={200: SharedProfileDetailSerializer(many=False)})
    def get(self, request, pk, format=None):
        shared_profile = self.get_object(pk)
        serializer = SharedProfileDetailSerializer(shared_profile)
        return Response(serializer.data)

    @swagger_auto_schema(
        request_body=SharedProfileCreateSerializer(many=True),
        responses={200: SharedProfileSerializer(many=False)}
    )
    def put(self, request, pk, format=None):
        shared_profile = self.get_object(pk)
        serializer = SharedProfileSerializer(shared_profile, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response({'error': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

    @swagger_auto_schema(responses={200: 'OK'})
    def delete(self, request, pk, format=None):
        shared_profile = self.get_object(pk)
        shared_profile.delete()
        return Response({'id': int(pk)}, status=status.HTTP_200_OK)


class SharedProfileBulkCreate(ListBulkCreateUpdateDestroyAPIView):
    """
    Create Team member info
    """
    # authentication_classes = (authentication.TokenAuthentication, )
    # permission_classes = (permissions.IsAuthenticated,)
    queryset = SharedProfile.objects.all()
    datas = queryset.values('team_member', 'talent', 'comment')
    member_names = ''
    client = None
    talent = None
    for data in datas:
        team_member = TeamMember.objects.get(id=data['team_member'])
        talent = Talent.objects.get(id=data['talent'])
        comment = data['comment']
        client = team_member.team.client
        member_names = '{prev}, {name}'.format(prev=member_names, name=team_member.member_email)

    note = 'PROFILE SHARED BY {client} with {member_names}.'.format(client=client.user.email, member_names=member_names)
    UserNoteManager.share_logger(None, client.user, talent.user, note, None)

    serializer_class = SharedProfileCreateSerializer


class SharedProfileSharedTalent(generics.ListCreateAPIView):

    @swagger_auto_schema(responses={200: SharedTalentSerializer(many=True)})
    def get(self, request, format=None):
        user = User.objects.get(pk=request.user.pk)
        client = Client.objects.get(user=user)
        team = Team.objects.get(client_id=client.id)
        team_member_ids = TeamMember.objects.filter(team_id=team.id)\
            .values_list('id', flat=True)\
            .order_by('id')\
            .distinct()

        shared_profiles = SharedProfile.objects.filter(team_member_id__in=team_member_ids)
        shared_talent_ids = shared_profiles.order_by('talent_id').values_list('talent_id', flat=True).distinct()

        res = []
        for shared_talent_id in shared_talent_ids:
            talent = Talent.objects.get(id=shared_talent_id)
            talent_serializer = TalentSimpleSerializer(talent)
            shared_team_member_ids = SharedProfile.objects.filter(
                team_member_id__in=team_member_ids,
                talent_id=shared_talent_id
            ).order_by('team_member_id').values_list('team_member_id', flat=True).distinct()

            team_members = TeamMember.objects.filter(id__in=shared_team_member_ids)

            if len(team_members) > 0:
                team_members_serializer = TeamMemberSerializer(team_members, many=True)
                res.append({
                    'talent': talent_serializer.data,
                    'team_members': team_members_serializer.data
                })

        serializer = SharedTalentSerializer(data=res, many=True)
        return JsonResponse(res, safe=False)


class SharedProfileTalentSharedWithClient(generics.ListCreateAPIView):

    @swagger_auto_schema(responses={200: SharedTalentSerializer(many=True)})
    def get(self, request, format=None):
        user = User.objects.get(pk=request.user.pk)
        client = Client.objects.get(user=user)
        team = Team.objects.get(client_id=client.id)
        # Find a team which include you as a team member
        team_member_ids = TeamMember.objects.filter(Q(member_email=client.user.email) & ~Q(team_id=team.id))\
            .values_list('id', flat=True).order_by('id').distinct()

        shared_profiles = SharedProfile.objects.filter(team_member_id__in=team_member_ids)
        shared_talent_ids = shared_profiles.order_by('talent_id').values_list('talent_id', flat=True).distinct()

        res = []
        for shared_talent_id in shared_talent_ids:
            talent = Talent.objects.get(id=shared_talent_id)
            talent_serializer = TalentSimpleSerializer(talent)
            shared_team_member_ids = SharedProfile.objects.filter(
                team_member_id__in=team_member_ids,
                talent_id=shared_talent_id
            )
            team_members = TeamMember.objects.filter(id__in=shared_team_member_ids)

            if len(team_members) > 0:
                team_members_serializer = TeamMemberSerializer(team_members, many=True)
                res.append({
                    'talent': talent_serializer.data,
                    'team_members': team_members_serializer.data
                })

        serializer = SharedTalentSerializer(data=res, many=True)
        return JsonResponse(res, safe=False)


class SharedProfileSharedTalentByTeamMemberSerializer(generics.ListCreateAPIView):

    @swagger_auto_schema(responses={200: SharedTalentByTeamMemberSerializer(many=True)})
    def get(self, request, format=None):
        user = User.objects.get(pk=request.user.pk)
        client = Client.objects.get(user=user)
        team = Team.objects.get(client_id=client.id)
        team_member_ids = TeamMember.objects.filter(team_id=team.id)\
            .values_list('id', flat=True)\
            .order_by('id')\
            .distinct()

        res = []
        for team_member_id in team_member_ids:
            team_member = TeamMember.objects.get(id=team_member_id)
            team_member_serializer = TeamMemberSerializer(team_member)

            shared_profiles_by_team_member = SharedProfile.objects.filter(team_member_id=team_member_id)
            talent_ids = shared_profiles_by_team_member.order_by('talent')\
                .values_list('talent').distinct()
            talents = Talent.objects.filter(id__in=talent_ids)
            if len(talents) > 0:
                talents_serializer = TalentSimpleSerializer(talents, many=True)
                res.append({
                    'team_member': team_member_serializer.data,
                    'talents': talents_serializer.data
                })

        serializer = SharedTalentByTeamMemberSerializer(data=res, many=True)
        return JsonResponse(res, safe=False)
