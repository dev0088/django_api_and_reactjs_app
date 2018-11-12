from django.db import models
from datetime import date
from authentication.models import User

SEX_CHOICES = (
    ('m', 'Male'),
    ('f', 'Female'),
)

class TalentManager(models.Manager):
    def get_queryset(self):
        return super(TalentManager, self).get_queryset().filter(active=True)

class Talent(models.Model):
  ### Relation with user
  user = models.ForeignKey(User, related_name='talent', on_delete=models.CASCADE)

  ### general info
  sex = models.CharField(choices=SEX_CHOICES, default='Male', max_length=10)

  ### business stuff ###
  # contact info
  # email = models.CharField(max_length=100, blank=True)
  phone_number = models.CharField(max_length=30, blank=True)
  mailing_addresse1 = models.CharField(max_length=100, blank=True)
  mailing_addresse2 = models.CharField(max_length=100, blank=True)
  mailing_addresse3 = models.CharField(max_length=100, blank=True)
  mailing_addresse4 = models.CharField(max_length=100, blank=True)
  mailing_addresse5 = models.CharField(max_length=100, blank=True)
  mailing_addresse6 = models.CharField(max_length=100, blank=True)
  birthday = models.DateField(blank=True, default=date.today)

  # emergency contact info
  emergency_first_name = models.CharField(max_length=50, blank=True)
  emergency_last_name = models.CharField(max_length=50, blank=True)
  emergency_email = models.CharField(max_length=100, blank=True)
  emergency_phone = models.CharField(max_length=30, blank=True)
  emergency_relationship = models.CharField(max_length=100, blank=True)

  # nationality_info
  nationality = models.CharField(max_length=50, blank=True)
  citizenship = models.CharField(max_length=50, blank=True)
  passport_expiration_date = models.DateField(blank=True, default=date.today)
  passport_number = models.CharField(max_length=100, blank=True)
  country_of_current_residence = models.CharField(max_length=50, blank=True)

  # current visas
  have_green_card = models.BooleanField(default=False)
  green_card_expiration_date = models.DateField(blank=True, default=date.today)
  visa_type = models.CharField(max_length=50, blank=True)
  expiration_date = models.DateField(blank=True, default=date.today)

  # language skills
  # language_skills: has_many -> talent_languages_skills

  # height/wegiht/BMI/Age-Range
  height = models.IntegerField(blank=True, default=0)
  weight = models.IntegerField(blank=True, default=0)
  bmi = models.FloatField(blank=True, default=0.0)
  age_range = models.CharField(max_length=100, blank=True, default='')

  # medical info
  # medicals: has_many -> talent_medicals
  # no_medical_conditions: has_many -> medical_conditions

  ### fun stuff ###
  # headline & Bio
  head_line = models.CharField(max_length=100, blank=True)
  bio = models.TextField(max_length=600, blank=True)

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
    Returns a string representation of this `Talent`.
    This string is used when a `Talent` is printed in the console.
    """
    return "{talent_id}, {user_name}, {email}".format(
            talent_id=self.id,
            user_name=self.user.username,
            email=self.user.email
          )

  class Meta:
    db_table = "talent"
    ordering = ('id',)
    managed = True
    unique_together = ('user', 'id')
