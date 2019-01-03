from rest_framework import serializers
from talent.models import Talent
from talent_picture.serializers import TalentPictureSerializer
from talent_position_type.serializers import TalentPositionTypeSerializer
from talent_position_sub_type.serializers import GeneralTalentPositionSubTypeSerializer
from authentication.serializers import GeneralUserSerializer
from talent_skill.serializers import TalentSkillSerializer
from talent_sub_skill.serializers import GeneralTalentSubSkillSerializer
from talent_rating.serializers import TalentRatingSerializer


class TalentSimpleSerializer(serializers.ModelSerializer):
    user = GeneralUserSerializer(many=False, read_only=True)
    talent_pictures = TalentPictureSerializer(many=True, read_only=True)
    talent_position_types = TalentPositionTypeSerializer(many=True, read_only=True)
    talent_position_sub_types = GeneralTalentPositionSubTypeSerializer(many=True, read_only=True)
    talent_skills = TalentSkillSerializer(many=True, read_only=True)
    talent_sub_skills = GeneralTalentSubSkillSerializer(many=True, read_only=True)
    talent_ratings = TalentRatingSerializer(many=True, read_only=True)
    average_rating = serializers.FloatField(source='get_average_rating', read_only=True)
    profile_status = serializers.JSONField(source='get_profile_status', read_only=True)


    class Meta:
        model = Talent
        fields = (
            'id',
            'user',
            'sex',
            'talent_position_types',
            'talent_position_sub_types',
            'talent_skills',
            'talent_sub_skills',
            'talent_pictures',
            'talent_medicals',
            'talent_ratings',
            'average_rating',
            'head_line',
            'bio',
            'tid',
            'created',
            'profile_status'
        )
