from django.shortcuts import render
from wizard_question_answer.models import WizardQuestionAnswer
from wizard_question_answer.serializers import WizardQuestionAnswerSerializer
from django.http import Http404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

class WizardQuestionAnswerList(APIView):
    """
    List all wizard question answers.
    """
    def get(self, request, format=None):
        wizard_question_answer = WizardQuestionAnswer.objects.all()
        serializer = WizardQuestionAnswerSerializer(wizard_question_answer, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = WizardQuestionAnswerSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class WizardQuestionAnswerDetail(APIView):
    """
    Retrieve a wizard question answer instance.
    """
    def get_object(self, pk):
        try:
            return WizardQuestionAnswer.objects.get(pk=pk)
        except WizardQuestionAnswer.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        wizard_question_answer_item = self.get_object(pk)
        serializer = WizardQuestionAnswerSerializer(wizard_question_answer_item)
        return Response(serializer.data)

    def put(self, request, pk, format=None):
        wizard_question_answer_item = self.get_object(pk)
        serializer = WizardQuestionAnswerSerializer(wizard_question_answer_item, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        wizard_question_answer_item = self.get_object(pk)
        wizard_question_answer_item.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
