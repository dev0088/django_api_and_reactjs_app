from django.shortcuts import render

# Create your views here.
from question.models import Question
from question.serializers import QuestionSerializer
from talent_position_sub_type.models import TalentPositionSubType
from django.http import Http404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
import random


class QuestionRamdomList(APIView):
    """
    Retrieve 5 questions randomly.
    """
    def get(self, request, format=None):
        try:
            position_type = request.query_params.get('position_type') #request.query_params.get('position_type')
            position_sub_type = request.query_params.get('position_sub_type') #request.qurey_params.get('position_sub_type')

            if not position_type or not position_sub_type:
                questions = Question.objects.all()
            else :
                position_sub_type = TalentPositionSubType.objects.get(name=position_sub_type)
                questions = Question.objects.filter(talent_position_sub_type=position_sub_type.id)
        except TalentPositionSubType.DoesNotExist:
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
    # def post(self, request, format=None):
    #     serializer = QuestionSerializer(data=request.data)
    #     if serializer.is_valid():
    #         serializer.save()
    #         return Response(serializer.data, status=status.HTTP_201_CREATED)
    #     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

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

    # def put(self, request, pk, format=None):
    #     question_item = self.get_object(pk)
    #     serializer = QuestionSerializer(question_item, data=request.data)
    #     if serializer.is_valid():
    #         serializer.save()
    #         return Response(serializer.data)
    #     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
	#
    # def delete(self, request, pk, format=None):
    #     question_item = self.get_object(pk)
    #     question_item.delete()
    #     return Response(status=status.HTTP_204_NO_CONTENT)
