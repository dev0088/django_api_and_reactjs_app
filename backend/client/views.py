import coreapi
import coreschema
from rest_framework.schemas import AutoSchema
from rest_framework.response import Response
from rest_framework import status
from django.http import Http404
from rest_framework.views import APIView
from client.serializers import *
from talent.models import Talent
from talent.serializers import TalentSerializer
from casting_request.models import CastingRequest
from casting_request_talent.models import CastingRequestTalent
from rest_framework import generics
from drf_yasg.utils import swagger_auto_schema
from django.db.models import Q

class ClientViewSet(generics.ListCreateAPIView):
    model = Client
    queryset = Client.objects.all()
    serializer_class = ClientSerializer
    # permission_classes = (IsAuthenticated,)


class CurrentClient(APIView):
    """
    Get current client info
    """
    # authentication_classes = (authentication.TokenAuthentication, )
    # permission_classes = (permissions.IsAuthenticated,)
    schema = AutoSchema(manual_fields=[
        coreapi.Field(
            "Authorization",
            required=True,
            location="header",
            description="Use bearer token from login: ex: Bearer \{token\}",
            schema=coreschema.String()
        ),
    ])

    def get_object(self, user):
      try:
        user = User.objects.get(pk=user.pk)
        client = Client.objects.get(user=user.id)
        return client
      except Client.DoesNotExist:
        raise Http404

    @swagger_auto_schema(responses={200: CastingRequestSerializer(many=False)})
    def get(self, request, format=None):
        print('==== request.user: ', request.user)
        client_item = self.get_object(request.user)
        serializer = ClientAllInfoSerializer(client_item)
        return Response(serializer.data)


class ClientDetail(APIView):
    # authentication_classes = (SessionAuthentication, JSONWebTokenAuthentication)
    # permission_classes = (permissions.IsAuthenticated,)

    def get_object(self, pk):
        try:
            user = User.objects.get(pk=pk)
            client = Client.objects.get(user=user.id)
            return client
        except Client.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        client_item = self.get_object(pk)
        serializer = ClientSerializer(client_item)
        return Response(serializer.data)

    def put(self, request, pk, format=None):
        print('== request.data: ', request.data)
        client_item = self.get_object(pk)
        client_data = request.data

        print('==== client_data: ', client_data)

        serializer = ClientSerializer(client_item, data=client_data)
        if serializer.is_valid():
            serializer.save()

            return Response(serializer.data)
        return Response({'error': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        client_item = self.get_object(pk)
        client_item.delete()
        return Response({'id': int(pk)}, status=status.HTTP_204_NO_CONTENT)


class ClientFindTalentList(APIView):
    @swagger_auto_schema(request_body=TalentSearchConditionSerializer, responses={200: TalentSerializer(many=True)})
    def post(self, request, format=None):
        """
        List all talents for search conditions.
        """
        # Filter talents according to search condition
        search_conditions = request.data
        print('===== search_conditions: ', search_conditions)
        talent_name = self.pickout_data(search_conditions, 'talent_name')
        talent_tid = self.pickout_data(search_conditions, 'talent_tid')
        casting_request_id = self.pickout_data(search_conditions, 'casting_request_id')
        talent_name_or_tid = self.pickout_data(search_conditions, 'talent_name_or_tid')
        talents = Talent.objects.all()
        if talent_tid:
            try:
                talents = talents.filter(tid__icontains=talent_tid)
            except Talent.DoesNotExist:
                raise Http404

        if talent_name:
            talents = talents.filter(
                Q(user__first_name__icontains=talent_name) |
                Q(user__last_name__icontains=talent_name)
            )

        if casting_request_id:
            casting_request = CastingRequest.objects.get(pk=casting_request_id)
            #casting_request_talent_ids
            talent_ids = CastingRequestTalent.objects\
                .filter(casting_request_id=casting_request.id)\
                .values_list('talent', flat=True)\
                .order_by('talent')
            talents = talents.filter(~Q(id__in=talent_ids))

        if talent_name_or_tid:
            talents = talents.filter(
                Q(user__first_name__icontains=talent_name_or_tid) |
                Q(user__last_name__icontains=talent_name_or_tid) |
                Q(tid__icontains=talent_name_or_tid)
            )

        serializer = TalentSerializer(talents, many=True)
        return Response(serializer.data)

    def pickout_data(self, data, child_name):
        res = {}
        if child_name in data:
            res = data[child_name]
        return res
