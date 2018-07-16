from rest_framework import serializers
from talents.models import Talents

class TalentsSerializer(serializers.ModelSerializer):
	user = serializers.PrimaryKeyRelatedField(many=False, read_only=True)

	class Meta:
		model = Talents
		fields = (
			'id',
			'user',
			'sex',
			# 'talent_type',
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
			'passwort_expiration_data',
			'passwort_number',
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

			# videos,

			'worked_cruise_ship',

			# 'availabilities',
			# 'auditions',

			'created'
		)
