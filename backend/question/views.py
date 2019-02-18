from django.shortcuts import render
import coreapi
import coreschema
# Create your views here.
from question.models import Question
from question.serializers import QuestionSerializer
from position_type.models import PositionType
from position_sub_type.models import PositionSubType
from django.http import Http404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.filters import BaseFilterBackend
from rest_framework.schemas import ManualSchema
import random
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi


class QuestionPracticeStaticList(APIView):
    """
    Retrieve 5 static practice questions.
    """
    def get(self, request, format=None):
        try:
            position_type_name = 'Staff' #'Practice'
            position_type = PositionType.objects.get(name=position_type_name)
            questions = Question.objects.filter(position_type=position_type.id).order_by('created')
        except PositionType.DoesNotExist:
            raise Http404

        if len(questions) > 5:
            # generate random numbers
            # randnums = random.sample(range(len(questions)), 5)

            # create new question list with the random numbers
            static_questions = []
            for index in range(0, 5):
                print('=== index: ', index)
                static_questions.append(questions[index])

            serializer = QuestionSerializer(static_questions, many=True)
            return Response(serializer.data)
        else :
            serializer = QuestionSerializer(questions, many=True)
            return Response(serializer.data)

class QuestionPracticeRamdomList(APIView):
    """
    Retrieve 5 practice questions randomly.
    """
    def get(self, request, format=None):
        try:
            position_type_name = 'Practice'
            position_type = PositionType.objects.get(name=position_type_name)
            questions = Question.objects.filter(position_type=position_type.id)
        except PositionType.DoesNotExist:
            raise Http404

        if len(questions) > 5:
            # generate random numbers
            randnums = random.sample(range(len(questions)), 5)

            # create new question list with the random numbers
            random_questions = []
            for index in randnums:
                random_questions.append(questions[index])

            serializer = QuestionSerializer(random_questions, many=True)
            return Response(serializer.data)
        else :
            serializer = QuestionSerializer(questions, many=True)
            return Response(serializer.data)


class SimpleFilterBackend(BaseFilterBackend):
    def get_schema_fields(self, view):
        return [coreapi.Field(
            "position_type",
            required=True,
            location="path",
            schema=coreschema.String()
            ),
            coreapi.Field(
                "position_sub_type",
                required=False,
                location="path",
                schema=coreschema.String()
            ),]
    def filter_queryset(self, request, queryset, view):
        return queryset.filter(owner=request.user)



class QuestionRamdomList(APIView):
    schema = ManualSchema(fields=[
        coreapi.Field(
            "position_type",
            required=True,
            location="path",
            schema=coreschema.String()
        ),
        coreapi.Field(
            "position_sub_type",
            required=False,
            location="path",
            schema=coreschema.String()
        ),
    ])

    position_type_param = openapi.Parameter(
            'position_type',
            openapi.IN_QUERY,
            description="position type name parameter",
            type=openapi.TYPE_STRING
    )

    # filter_backends = (SimpleFilterBackend,)
    """
    Retrieve 5 questions randomly.
    """
    @swagger_auto_schema(manual_parameters=[position_type_param],
                    responses={200: QuestionSerializer(many=True)})

    def get(self, request, format=None):
        try:
            position_type_name = request.query_params.get('position_type') #request.query_params.get('position_type')
            position_sub_type_name = request.query_params.get('position_sub_type') #request.query_params.get('position_type')
            
            if not position_type_name:
                questions = Question.objects.all()
            else :
                position_type = PositionType.objects.get(name__iexact=position_type_name)
                if not position_sub_type_name:
                    print('===== filter question: ', position_type.id)
                    questions = Question.objects.filter(position_type=position_type.id)
                else: 
                    questions = Question.objects.filter(position_type=position_type.id).filter(position_sub_type=position_sub_type_name)
        except PositionType.DoesNotExist:
            raise Http404

        if len(questions) > 5:
      # generate random numbers
            randnums = random.sample(range(len(questions)), 5)

            # create new question list with the random numbers
            random_questions = []
            for index in randnums:
                random_questions.append(questions[index])

            serializer = QuestionSerializer(random_questions, many=True)
            return Response(serializer.data)
        else :
            serializer = QuestionSerializer(questions, many=True)
            return Response(serializer.data)


class QuestionDetail(APIView):
    """
    Retrieve a question_item instance.
    """
    def get_object(self, pk):
        try:
            return Question.objects.get(pk=pk)
        except Question.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        question_item = self.get_object(pk)
        serializer = QuestionSerializer(question_item)
        return Response(serializer.data)
