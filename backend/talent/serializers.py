from rest_framework import serializers
from talent.models import Talent
from talent_video.serializers import TalentVideoSerializer
from talent_position_sub_type.serializers import TalentPositionSubTypeSerializer
from authentication.serializers import GeneralUserSerializer
from talent_additional_position_sub_type.serializers import GeneralTalentAdditionalPositionSubTypeSerializer

class TalentSerializer(serializers.ModelSerializer):
	user = serializers.PrimaryKeyRelatedField(many=False, read_only=True)
	talent_videos = TalentVideoSerializer(many=True, read_only=True)
	talent_position_sub_type = TalentPositionSubTypeSerializer(many=False, read_only=True)
	user = GeneralUserSerializer(many=False, read_only=True)
	talent_additional_position_sub_types = GeneralTalentAdditionalPositionSubTypeSerializer(many=True, read_only=True)

	class Meta:
		model = Talent
		fields = (
			'id',
			'user',
			'sex',
			'talent_position_sub_type',
			'talent_additional_position_sub_types',

			'phone_number',
			'mailing_addresse1',
			'mailing_addresse2',
			'mailing_addresse3',
			'mailing_addresse4',
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
			# 'resume_file_path'

			# pictures,

			'talent_videos',

			'worked_cruise_ship',

			# 'availabilities',
			# 'auditions',

			'created'
		)
