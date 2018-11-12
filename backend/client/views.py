import coreapi
import coreschema
from django.http import HttpResponse
from django.shortcuts import render
from rest_framework import status, viewsets, schemas
from rest_framework.decorators import api_view
from rest_framework.schemas import AutoSchema
from rest_framework.response import Response
from rest_framework import status
from django.http import Http404
from rest_framework.schemas import ManualSchema
from rest_framework.views import APIView
from client.models import *
from datetime import timedelta

from client.serializers import *
from client.models import *
from client.serializers import *
from talent.models import Talent
from talent.serializers import TalentSerializer
from rest_framework import generics
from rest_framework.decorators import action
from drf_yasg.utils import swagger_auto_schema

import datetime
import json


class ClientViewSet(generics.ListCreateAPIView):
    model = Client
    queryset = Client.objects.all()
    serializer_class = ClientSerializer
    # permission_classes = (IsAuthenticated,)

    # def list(self, request, *args, **kwargs):
    #     """
    #     Return a list of objects.
    #
    #     """
    #     return super(ClientViewSet, self).list(request, *args, **kwargs)


class CurrentClient(APIView):
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
    """
    Get current client info
    """
    def get(self, request, format=None):
        print('==== request.user: ', request.user)
        client_item = self.get_object(request.user)
        serializer = ClientSerializer(client_item)
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
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        client_item = self.get_object(pk)
        client_item.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class ClientFindTalentList(APIView):
    @swagger_auto_schema(request_body=TalentSearchConditionSerializer, responses={200: TalentSerializer(many=True)})
    def post(self, request, format=None):
        """
        List all talents for search conditions.
        """
        # Filter talents according to search condition
        search_conditions = request.data
        talent_name = self.pickout_data(search_conditions, 'talent_name')
        talent_id = self.pickout_data(search_conditions, 'talent_id')
        talents = Talent.objects.all()
        if talent_id:
            try:
                talent = talents.get(id=talent_id)
                serializer = TalentSerializer(talent)
                return Response(serializer.data)
            except Talent.DoesNotExist:
                raise Http404
        else:
            if talent_name:
                talents = talents.filter(user__first_name__contains=talent_name)
        serializer = TalentSerializer(talents, many=True)
        return Response(serializer.data)

    def pickout_data(self, data, child_name):
        res = {}
        if child_name in data:
            res = data[child_name]
        return res

# class CastingRequest(APIView):
#     def get(self, request):
#         qs_submitted = CastingRequestModel.objects.filter(status__in=[1, 2])
#         qs_not_submitted = CastingRequestModel.objects.filter(status=0)
#         qs_completed = CastingRequestModel.objects.filter(status=3)
#
#         serial_submitted = RequestViewSerializer(qs_submitted, many=True)
#         serial_not_submitted = RequestViewSerializer(qs_not_submitted, many=True)
#         serial_completed = RequestViewSerializer(qs_completed, many=True)
#
#         ret_data = json.dumps({
#             'on_submitted': serial_submitted.data,
#             'not_submitted': serial_not_submitted.data,
#             'completed': serial_completed.data
#         })
#
#         print(ret_data)
#
#         return Response(data=ret_data, status=status.HTTP_200_OK)
#
#     def post(self, request):
#         print(request.data)
#
#         # CHECK PARAMETERS IN ADD AND VIEW SCREENS
#
#         return Response(status=status.HTTP_200_OK)
