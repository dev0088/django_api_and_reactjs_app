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
from client.serializers import *


# Create your views here.

class FindTalent(APIView):
    schema = ManualSchema(
        description="list selected talents",
        fields=[
            coreapi.Field(
                "sex",
                required=True,
                location="query",
                schema=coreschema.String(),
                description="Sex"
            ),
            coreapi.Field(
                "master_type",
                required=False,
                location="query",
                schema=coreschema.String(),
                description="Main type of talent"
            ),
            coreapi.Field(
                "sub_type",
                required=False,
                location="query",
                schema=coreschema.String(),
                description="Detail type of talent"
            ),
            coreapi.Field(
                "master_role",
                required=False,
                location="query",
                schema=coreschema.String(),
                description="What the talent can do mainly"
            ),
            coreapi.Field(
                "sub_role",
                required=False,
                location="query",
                schema=coreschema.String(),
                description="What the talent can do specifically"
            ),
            coreapi.Field(
                "able_start_date",
                required=False,
                location="query",
                schema=coreschema.String(),
                description="Start date when the talent are available"
            ),
            coreapi.Field(
                "age",
                required=False,
                location="query",
                schema=coreschema.String(),
                description="Age"
            ),
            coreapi.Field(
                "height",
                required=False,
                location="query",
                schema=coreschema.String(),
                description="Height"
            ),
            coreapi.Field(
                "language",
                required=False,
                location="query",
                schema=coreschema.String(),
                description="Language"
            ),
            coreapi.Field(
                "rating",
                required=False,
                location="query",
                schema=coreschema.String(),
                description="Rating of talent"
            ),
            coreapi.Field(
                "name",
                required=False,
                location="query",
                schema=coreschema.String(),
                description="Name of talent"
            ),
            coreapi.Field(
                "talent_id",
                required=False,
                location="query",
                schema=coreschema.String(),
                description="Talent's ID"
            )
        ]
    )

    def get(self, request):
        print(request.query_params.get('sex'))
        return Response(status=status.HTTP_200_OK)
