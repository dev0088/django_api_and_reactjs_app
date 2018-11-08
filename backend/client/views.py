import coreapi
import coreschema
from django.http import HttpResponse
from django.shortcuts import render
from rest_framework import status, viewsets, schemas
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.schemas import ManualSchema
from rest_framework.views import APIView
from client.models import *
from datetime import timedelta

from client.serializers import *
from client.models import *
from client.serializers import *

import datetime
import json


# Create your views here.

class FindTalent(APIView):
    def get(self, request):
        print(request.query_params.get('sex'))
        print(request.query_params)
        return Response(status=status.HTTP_200_OK)

    def post(self, request):
        print(request.data)
        result = request.data

        query = Talent.objects.all()

        if len(result['sex_list']):
            query = query.filter(sex__in=result['sex_list'])

        if len(result['master_type_list']):
            query = query.filter(master_type__in=result['master_type_list'])

        if len(result['sub_type_list']):
            query = query.filter(sub_type__in=result['sub_type_list'])

        if len(result['master_role_list']):
            query = query.filter(master_role__in=result['master_role_list'])

        if len(result['sub_role_list']):
            query = query.filter(sub_role__in=result['sub_role_list'])

        if len(result['lang_list']):
            qs1 = query.filter(lang1__in=result['lang_list'])
            qs2 = query.filter(lang2__in=result['lang_list'])
            qs3 = query.filter(lang3__in=result['lang_list'])
            query = qs1.union(qs2, qs3)

        if len(result['age_list']):
            qs = query.filter(age__gte=int(str(result['age_list'][0]).split(',')[0]),
                              age__lte=int(str(result['age_list'][0]).split(',')[1]))

            if len(result['age_list']) > 1:
                for index in range(1, len(result['age_list'])):
                    qs1 = query.filter(age__gte=int(str(result['age_list'][index]).split(',')[0]),
                                       age__lte=int(str(result['age_list'][index]).split(',')[1]))
                    qs = qs.union(qs1)
            query = qs

        if len(result['height_list']):
            gte = str(result['height_list'][0]).split(',')[0]
            lte = str(result['height_list'][0]).split(',')[1]
            gte_value = int(gte.split('.')[0]) * 12 + int(gte.split('.')[1])
            lte_value = int(lte.split('.')[0]) * 12 + int(lte.split('.')[1])

            qs = query.filter(height__gte=gte_value, height__lte=lte_value)

            if len(result['height_list']) > 1:
                for index in range(1, len(result['height_list'])):
                    gte = str(result['height_list'][index]).split(',')[0]
                    lte = str(result['height_list'][index]).split(',')[1]
                    gte_value = int(gte.split('.')[0]) * 12 + int(gte.split('.')[1])
                    lte_value = int(lte.split('.')[0]) * 12 + int(lte.split('.')[1])
                    qs1 = query.filter(height__gte=gte_value, height__lte=lte_value)
                    qs = qs.union(qs1)
            query = qs

        if len(result['rating_list']):
            qs = query.filter(avg_rating__gte=float(str(result['rating_list'][0]).split(',')[0]),
                              avg_rating__lte=float(str(result['rating_list'][0]).split(',')[1]))

            if len(result['rating_list']) > 1:
                for index in range(1, len(result['rating_list'])):
                    qs1 = query.filter(avg_rating__gte=float(str(result['rating_list'][index]).split(',')[0]),
                                       avg_rating__lte=float(str(result['rating_list'][index]).split(',')[1]))
                    qs = qs.union(qs1)
            query = qs

        if len(result['talent_name']):
            query = query.filter(name=result['talent_name'])

        if len(result['talent_id']):
            query = query.filter(pk=result['talent_id'])

        st1 = str(result['startDate']).split('T')[0]
        st2 = str(result['endDate']).split('T')[0]
        start_date = datetime.datetime.strptime(st1, "%Y-%m-%d")
        end_date = datetime.datetime.strptime(st2, "%Y-%m-%d")
        qs1 = query.filter(able_date__gte=start_date, able_date__lte=end_date)
        serial1 = TalentSerializer(qs1, many=True)

        start_date = start_date + timedelta(days=-14)
        end_date = end_date + timedelta(days=14)
        query = query.difference(qs1)
        qs2 = query.filter(able_date__gte=start_date, able_date__lte=end_date)
        serial2 = TalentSerializer(qs2, many=True)

        ret_data = json.dumps({
            'crt_data': serial1.data,
            'next_data': serial2.data
        })

        return Response(data=ret_data, status=status.HTTP_200_OK)


class CastingRequest(APIView):
    def get(self, request):
        qs_submitted = CastingRequestModel.objects.filter(status__in=[1, 2])
        qs_not_submitted = CastingRequestModel.objects.filter(status=0)
        qs_completed = CastingRequestModel.objects.filter(status=3)

        serial_submitted = RequestViewSerializer(qs_submitted, many=True)
        serial_not_submitted = RequestViewSerializer(qs_not_submitted, many=True)
        serial_completed = RequestViewSerializer(qs_completed, many=True)

        ret_data = json.dumps({
            'on_submitted': serial_submitted.data,
            'not_submitted': serial_not_submitted.data,
            'completed': serial_completed.data
        })

        print(ret_data)

        return Response(data=ret_data, status=status.HTTP_200_OK)

    def post(self, request):
        print(request.data)

        # CHECK PARAMETERS IN ADD AND VIEW SCREENS

        return Response(status=status.HTTP_200_OK)
