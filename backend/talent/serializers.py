from rest_framework import serializers
from talent.models import Talent
from talent_video.serializers import TalentVideoSerializer
from talent_position_sub_type.serializers import TalentPositionSubTypeSerializer

class TalentSerializer(serializers.ModelSerializer):
	user = serializers.PrimaryKeyRelatedField(many=False, read_only=True)
	talent_videos = TalentVideoSerializer(many=True, read_only=True)
	talent_position_sub_type = TalentPositionSubTypeSerializer(many=False, read_only=True)
	
	class Meta:
		model = Talent
		fields = (
			'id',
			'user',
			'sex',
			'talent_position_sub_type',
			# 'skills',

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

			# 'nationality',
			# 'citizenshi',
			'passport_expiration_data',
			'passport_number',
			# country_of_current_residence,

			# 'visa_type',
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
