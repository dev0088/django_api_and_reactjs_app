from rest_framework import serializers
from talent_video_sub_skill.models import TalentVideoSubSkill


class TalentVideoSubSkillSerializer(serializers.ModelSerializer):
    # talent = serializers.SlugRelatedField(many=False, read_only=True, slug_field='id')

    class Meta:
        model = TalentVideoSubSkill
        fields = (
            'id',
            'talent',
            'sub_skill',
            'priority',
            'name',
            'path',
            'url',
            'size',
            'file_type',
            'timestamp',
            'updated',
            'uploaded',
            'active',
            'approved',
            'approved_date',
            'approved_by'
        )


class TalentVideoSubSkillsSearchConditionSerializer(serializers.Serializer):
    sub_skill_id = serializers.IntegerField()