from rest_framework import serializers
from sub_skill.models import SubSkill


class SubSkillSerializer(serializers.ModelSerializer):
    skill = serializers.SlugRelatedField(many=False, read_only=True, slug_field='name')

    class Meta:
        model = SubSkill
        fields = (
            'id',
            'name',
            'abbreviated_key',
            'caption',
            'priority',
            'skill',
            'select_option_title',
            'wizard_button_title',
            'video_audition_button_title',
            'form_title',
            'video_audition_title',
            'video_audition_sub_title',
            'agent_title',
            'max_video_time',
            'have_step2',
            'step1_title',
            'step1_sub_title',
            'step1_button_title',
            'step1_link',
            'step2_title',
            'step2_sub_title',
            'step2_button_title',
            'step2_link',
            'video_counts',
            'helpful_hint',
            'introduction_title',
            'introduction_link',
            'instruction_button_title',
            'instruction_button_link',
            'opts_in',
            'video_audition_type',
            'is_special_video_audition',
            'is_required_all',
            'is_required',
            'is_video_interview_button',
            'video_audition_view_content_type'
        )
