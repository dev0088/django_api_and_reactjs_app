from rest_framework import serializers
from admin_setting.models import AdminSetting

class AdminVideoInterviewSettingSerializer(serializers.ModelSerializer):

  class Meta:
    model = AdminSetting
    fields = (
      'video_interview_prep_countdown',
      'video_interview_response_time'
    )

class AdminSettingSerializer(serializers.ModelSerializer):

  class Meta:
    model = AdminSetting
    fields = (
      'video_interview_prep_countdown',
      'video_interview_response_time'
    )
