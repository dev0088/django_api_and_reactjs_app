from rest_framework import serializers
from talent.models import Talent
from talent_picture.serializers import TalentPictureSerializer
from talent_video.serializers import TalentVideoSerializer
from talent_video_greeting.serializers import TalentVideoGreetingSerializer
from talent_video_sub_skill.serializers import TalentVideoSubSkillSerializer
from talent_resume.serializers import TalentResumeSerializer
from talent_position_type.serializers import TalentPositionTypeSerializer
from talent_position_sub_type.serializers import TalentPositionSubTypeSerializer, GeneralTalentPositionSubTypeSerializer
from authentication.serializers import GeneralUserSerializer
from talent_skill.serializers import TalentSkillSerializer, GeneralTalentSkillSerializerWithTalent
from talent_sub_skill.serializers import TalentSubSkillSerializer, GeneralTalentSubSkillSerializer
from talent_visa.serializers import TalentVisaSerializer
from talent_language.serializers import TalentLanguageSerializer
from talent_medical.serializers import TalentMedicalSerializer
from talent_availability.serializers import TalentAvailabilitySerializerWithoutTalentID
from talent_rating.deatil_by_talent_serializers import TalentRatingDetailByTalentSerializer
from django.contrib.auth.password_validation import validate_password


class TalentSerializer(serializers.ModelSerializer):
    talent_resume = TalentResumeSerializer(many=True, read_only=True)
    talent_pictures = TalentPictureSerializer(many=True, read_only=True)
    talent_videos = TalentVideoSerializer(many=True, read_only=True)
    talent_video_greetings = TalentVideoGreetingSerializer(many=True, read_only=True)
    talent_video_sub_skills = TalentVideoSubSkillSerializer(many=True, read_only=True)
    talent_position_types = TalentPositionTypeSerializer(many=True, read_only=True)
    talent_position_sub_types = GeneralTalentPositionSubTypeSerializer(many=True, read_only=True)
    talent_skills = TalentSkillSerializer(many=True, read_only=True)
    talent_sub_skills = GeneralTalentSubSkillSerializer(many=True, read_only=True)
    user = GeneralUserSerializer(many=False, read_only=True)
    talent_visas = TalentVisaSerializer(many=True, read_only=True)
    talent_languages = TalentLanguageSerializer(many=True, read_only=True)
    talent_medicals = TalentMedicalSerializer(many=True, read_only=True)
    talent_availabilities = TalentAvailabilitySerializerWithoutTalentID(many=True, read_only=True)
    talent_ratings = TalentRatingDetailByTalentSerializer(many=True, read_only=True)
    average_rating = serializers.FloatField(source='get_average_rating', read_only=True)
    profile_status = serializers.JSONField(source='get_profile_status', read_only=True)
    talent_availabilities_last_update = serializers.DateTimeField(
        source='get_talent_availabilities_last_update',
        read_only=True
    )

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
            
            'phone_number',
            'mailing_addresse1',
            'mailing_addresse2',
            'mailing_addresse3',
            'mailing_addresse4',
            'mailing_addresse5',
            'mailing_addresse6',
            'birthday',

            'emergency_first_name',
            'emergency_last_name',
            'emergency_email',
            'emergency_phone',
            'emergency_relationship',

            'nationality',
            'citizenship',
            'passport_expiration_date',
            'passport_number',
            'country_of_current_residence',
            'have_green_card',
            'green_card_expiration_date',
            'visa_type',
            'expiration_date',

            'height',
            'weight',
            'bmi',
            'age_range',
            'head_line',
            'bio',

            'talent_visas',
            'talent_languages',
            'talent_pictures',
            'talent_videos',
            'talent_video_greetings',
            'talent_video_sub_skills',
            'talent_resume',
            'talent_medicals',

            'talent_availabilities',
            'talent_availabilities_last_update',
            'talent_ratings',
            'average_rating',

            'worked_cruise_ship',
            # 'auditions',
            'tid',
            'approved',
            'created',

            'profile_status'
        )


class ChangePasswordSerializer(serializers.Serializer):
    """
    Serializer for password change endpoint.
    """
    current_password = serializers.CharField(required=True)
    new_password = serializers.CharField(required=True)

    def validate_new_password(self, value):
        validate_password(value)
        return value