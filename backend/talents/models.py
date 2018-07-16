from django.db import models

# Create your models here.
from datetime import datetime, timedelta
from authentication.models import User

SEX_CHOICES = (
    ('m', 'Male'),
    ('f', 'Female'),
)

class TalentsManager(models.Manager):
    def get_queryset(self):
        return super(TalentsManager, self).get_queryset().filter(active=True)

class Talents(models.Model):
	### Relation with user
	user = models.ForeignKey(User, related_name='talent', on_delete=models.CASCADE)

	### general info
	sex = models.CharField(choices=SEX_CHOICES, default='Male', max_length=10)
	# talent_type: has_one -> talent_types table
  	# skills: has_many -> talent_skills

	### business stuff ###
	# contact info
	# email = models.CharField(max_length=100, blank=True)
	phone_number = models.CharField(max_length=30, blank=True)
	mailing_addresse1 = models.CharField(max_length=100, blank=True)
	mailing_addresse2 = models.CharField(max_length=100, blank=True)
	mailing_addresse3 = models.CharField(max_length=100, blank=True)
	mailing_addresse4 = models.CharField(max_length=100, blank=True)
	birthday = models.DateField(blank=True)

	# emergency contact info
	emergency_first_name = models.CharField(max_length=50, blank=True)
	emergency_last_name = models.CharField(max_length=50, blank=True)
	emergency_email = models.CharField(max_length=100, blank=True)
	emergency_phone = models.CharField(max_length=30, blank=True)
	emergency_relationship = models.CharField(max_length=100, blank=True)

	# nationality_info
	# nationality: string(country)
	# citizenshi: string(passport country)
	passport_expiration_data = models.DateField(blank=True)
	passport_number = models.CharField(max_length=100, blank=True)
	# country_of_current_residence: string(country)

	# current visas
	# visa_type: string -> maybe one of visa_types table
	expiration_date = models.DateField(blank=True)

	# language skills
	# language_skills: has_many -> talent_languages_skills

	# height/wegiht/BMI/Age-Range
	height = models.IntegerField(blank=True)
	weight = models.IntegerField(blank=True)
	bmi = models.FloatField(blank=True)
	age_range = models.CharField(max_length=100, blank=True, default='')

	# medical info
	# medicals: has_many -> talent_medicals
	# no_medical_conditions: has_many -> medical_conditions

	### fun stuff ###
	# headline & Bio
	head_line = models.CharField(max_length=100, blank=True)
	bio = models.TextField()

	# resume
	# resume_file_path = models.CharField(max_length=100, blank=True)

	# pictures
	# pictures: has_many -> talent_pictures

	# videos
	# videos: has_many -> talent_videos

	# worked_cruise_ship
	worked_cruise_ship = models.BooleanField(default=False)

	# availability
	# availabilities: has_many -> talent_schedulings

	# auditions
	# auditions: has_many -> talent_auditions

	created = models.DateTimeField(auto_now_add=True)
	description = models.CharField(max_length=100, blank=True)

	def __str__(self):
		"""
        Returns a string representation of this `Talents`.
        This string is used when a `Talents` is printed in the console.
        """
		return self.user.username + ', ' + self.user.email

	class Meta:
		db_table = "talents"
		ordering = ('id',)
		managed = True
		unique_together = ('user', 'id')
