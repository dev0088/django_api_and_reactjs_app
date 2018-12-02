from rest_framework import serializers
from sub_skill.models import SubSkill

class SubSkillSerializer(serializers.ModelSerializer):
  skill = serializers.SlugRelatedField(many=False, read_only=True, slug_field='name')

  class Meta:
    model = SubSkill
    fields = (
      'id',
      'name',
      'priority',
      'skill',
      'video_audition_button_title',
      'wizard_button_title',
      # 'video_steps',
      'max_video_time',
      'download_video_link',
      'have_step2',
      'step1_title',
      'step1_link',
      'step2_title',
      'step2_link',
      'video_counts',
      'helpful_hint',
      'introduction_title',
      'introduction_link',
      'opts_in',
      'video_audition_type',
      'is_special_video_audition',
      'is_required_all',
      'is_required',
      'is_video_interview_button'
    )
