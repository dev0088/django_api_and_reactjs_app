from django.shortcuts import render
from position_wizard_question_scenario.models import PositionWizardQuestionScenario
from position_wizard_question_scenario.serializers import PositionWizardQuestionScenarioSerializer
from django.http import Http404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status


class PositionWizardQuestionScenarioList(APIView):
    """
    List all position wizard question scenarios.
    """
    def get(self, request, format=None):
        position_wizard_question_scenario = PositionWizardQuestionScenario.objects.all()
        serializer = PositionWizardQuestionScenarioSerializer(position_wizard_question_scenario, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = PositionWizardQuestionScenarioSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class PositionWizardQuestionScenarioDetail(APIView):
    """
    Retrieve a position wizard question scenario instance.
    """
    def get_object(self, pk):
        try:
            return PositionWizardQuestionScenario.objects.get(pk=pk)
        except PositionWizardQuestionScenario.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        position_wizard_question_scenario_item = self.get_object(pk)
        serializer = PositionWizardQuestionScenarioSerializer(position_wizard_question_scenario_item)
        return Response(serializer.data)

    def put(self, request, pk, format=None):
        position_wizard_question_scenario_item = self.get_object(pk)
        serializer = PositionWizardQuestionScenarioSerializer(position_wizard_question_scenario_item, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        position_wizard_question_scenario_item = self.get_object(pk)
        position_wizard_question_scenario_item.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
