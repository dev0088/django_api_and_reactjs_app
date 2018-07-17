from django.shortcuts import render

# Create your views here.
from admin_setting.models import AdminSetting
from admin_setting.serializers import AdminSettingSerializer
from admin_setting.serializers import AdminVideoInterviewSettingSerializer
from django.http import Http404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

class AdminSettingList(APIView):
    """
    Retrieve admin settings.
    """
    def get(self, request, format=None):
        admin_settings = AdminSetting.objects.all()
        serializer = AdminSettingSerializer(admin_settings, many=False)
        return Response(serializer.data)

class AdminVideoInterviewSettingList(APIView):
    """
    Retrieve video interview settings.
    """
    def get(self, request, format=None):
        admin_setting = AdminSetting.objects.first()
        serializer = AdminVideoInterviewSettingSerializer(admin_setting, many=False)
        return Response(serializer.data)
