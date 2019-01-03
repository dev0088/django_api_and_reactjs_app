from authentication.models import User
from client.models import Client
from team.models import Team
from team_member.models import TeamMember
from team_member.serializers import TeamMemberSerializer
from team_member.detail_serializers import TeamMemberDetailSerializer
from team_member.create_serializers import TeamMemberCreateSerializer
from django.http import Http404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from drf_yasg.utils import swagger_auto_schema


class TeamMemberList(APIView):
    """
    Retrieve all casting requests of client.
    """
    @swagger_auto_schema(responses={200: TeamMemberSerializer(many=True)})
    def get(self, request, format=None):
        user = User.objects.get(pk=request.user.pk)
        client = Client.objects.get(user=user)
        team = Team.objects.get(client_id=client.id)
        team_members = TeamMember.objects.filter(team_id=team.id)
        serializer = TeamMemberSerializer(team_members, many=True)
        return Response(serializer.data)


class TeamMemberDetail(APIView):
    """
    Retrieve, update or delete a casting request of client.
    """
    def get_object(self, pk):
        try:
            return TeamMember.objects.get(pk=pk)
        except TeamMember.DoesNotExist:
            raise Http404

    @swagger_auto_schema(responses={200: TeamMemberDetailSerializer(many=False)})
    def get(self, request, pk, format=None):
        team_member = self.get_object(pk)
        serializer = TeamMemberDetailSerializer(team_member)
        return Response(serializer.data)

    @swagger_auto_schema(
        request_body=TeamMemberCreateSerializer(many=True),
        responses={200: TeamMemberSerializer(many=False)}
    )
    def put(self, request, pk, format=None):
        team_member = self.get_object(pk)
        serializer = TeamMemberSerializer(team_member, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response({'error': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

    @swagger_auto_schema(responses={200: 'OK'})
    def delete(self, request, pk, format=None):
        team_member = self.get_object(pk)
        team_member.delete()
        return Response({'id': int(pk)}, status=status.HTTP_200_OK)


class TeamMemberCreate(APIView):
    """
    Get current client info
    """
    # authentication_classes = (authentication.TokenAuthentication, )
    # permission_classes = (permissions.IsAuthenticated,)

    def get_object(self, user):
        try:
            user = User.objects.get(pk=user.pk)
            client = Client.objects.get(user=user.id)
            return client
        except Client.DoesNotExist:
            raise Http404

    @swagger_auto_schema(
        request_body=TeamMemberCreateSerializer,
        responses={200: TeamMemberCreateSerializer(many=True)}
    )
    def post(self, request, format=None):
        client = self.get_object(request.user)
        serializer = TeamMemberCreateSerializer(data=request.data)
        if serializer.is_valid():
            data = serializer.validated_data

            new_team_member = TeamMember.objects.create(
                team=data['team'],
                member_email=data['member_email']
            )
            new_team_member.save()

            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response({'error': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)


class TeamMemberBulkCreate(APIView):
    """
    Create Team member info
    """
    # authentication_classes = (authentication.TokenAuthentication, )
    # permission_classes = (permissions.IsAuthenticated,)

    def get_object(self, user):
      try:
        user = User.objects.get(pk=user.pk)
        client = Client.objects.get(user=user.id)
        return client
      except Client.DoesNotExist:
        raise Http404

    def get_serializer(self, *args, **kwargs):
        if "data" in kwargs:
            data = kwargs["data"]

            # check if many is required
            if isinstance(data, list):
                kwargs["many"] = True

        return super(TeamMemberBulkCreate, self).get_serializer(*args, **kwargs)

    @swagger_auto_schema(
        request_body=TeamMemberCreateSerializer(many=True),
        responses={200: TeamMemberSerializer(many=True)}
    )
    def post(self, request, format=None):
        client = self.get_object(request.user)
        is_many = True if isinstance(request.data, list) else False
        print("==== is_many: ", is_many)
        serializer = TeamMemberCreateSerializer(data=request.data, many=is_many)
        print('==== TeamMemberBulkCreate: ', request.data)
        if serializer.is_valid():
            new_team_members_ids = []
            for team_member in serializer.validated_data:
                new_team_member = TeamMember(**team_member)
                new_team_member.save()
                new_team_members_ids.append(new_team_member.id)

            new_team_members = TeamMember.objects.filter(id__in=new_team_members_ids)
            new_serializer = TeamMemberSerializer(new_team_members, many=True)
            return Response(new_serializer.data, status=status.HTTP_201_CREATED)

        return Response({'error': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
