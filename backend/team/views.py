from authentication.models import User
from client.models import Client
from team.models import Team
from team.serializers import TeamSerializer
from team.create_serializers import TeamCreateSerializer
from django.http import Http404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from drf_yasg.utils import swagger_auto_schema


class TeamList(APIView):
    """
    Retrieve all casting requests of client.
    """
    @swagger_auto_schema(responses={200: TeamSerializer(many=True)})
    def get(self, request, format=None):
        user = User.objects.get(pk=request.user.pk)
        client = Client.objects.get(user=user)
        teams = Team.objects.filter(client_id=client.id)
        serializer = TeamSerializer(teams, many=True)
        return Response(serializer.data)


class TeamDetail(APIView):
    """
    Retrieve, update or delete a casting request of client.
    """
    def get_object(self, pk):
        try:
            return Team.objects.get(pk=pk)
        except Team.DoesNotExist:
            raise Http404

    @swagger_auto_schema(responses={200: TeamSerializer(many=False)})
    def get(self, request, pk, format=None):
        team = self.get_object(pk)
        serializer = TeamSerializer(team)
        return Response(serializer.data)

    @swagger_auto_schema(
        request_body=TeamCreateSerializer,
        responses={200: TeamSerializer(many=False)}
    )
    def put(self, request, pk, format=None):
        team = self.get_object(pk)
        serializer = TeamSerializer(team, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response({'error': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

    @swagger_auto_schema(responses={200: 'OK'})
    def delete(self, request, pk, format=None):
        team = self.get_object(pk)
        team.delete()
        return Response({'id': int(pk)}, status=status.HTTP_200_OK)


class TeamCreate(APIView):
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

    @swagger_auto_schema(request_body=TeamCreateSerializer,
                         responses={200: TeamCreateSerializer(many=False)})
    def post(self, request, format=None):
        client = self.get_object(request.user)
        serializer = TeamCreateSerializer(data=request.data)
        if serializer.is_valid():
            data = serializer.validated_data
            team_name = data['name'] if 'name' in data else ''
            new_team = Team.objects.create(
                client=client,
                name=team_name
            )
            new_team.save()
            new_serializer = TeamSerializer(new_team)
            return Response(new_serializer.data, status=status.HTTP_201_CREATED)
        return Response({'error': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)


