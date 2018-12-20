from django.db import models
from datetime import date
from authentication.models import User
from django.db.models import Avg
from django.db.models.functions import Trunc
from django.db.models import DateTimeField

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

    # height/weight/BMI/Age-Range
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
    tid = models.CharField(max_length=30, blank=True)

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
                        email=self.user.email)

    def get_average_rating(self):
        return self.talent_ratings.aggregate(Avg('rating'))['rating__avg']

    def get_is_completed_contact_info(self):
        return not self.user.first_name and not self.user.last_name and not self.phone_number and not self.sex and \
               not self.mailing_addresse1 and not self.mailing_addresse2 and not self.mailing_addresse3 and \
               not self.mailing_addresse4 and not self.birthday and not self.emergency_email and \
               not self.emergency_first_name and not self.emergency_last_name and not self.emergency_phone and \
               not self.emergency_relationship

    def get_is_completed_nationality(self):
        return not self.nationality and not self.citizenship and not self.passport_number and \
               not self.country_of_current_residence and not self.have_green_card and not self.visa_type and \
               not self.expiration_date and (self.talent_visas.count() > 0)

    def get_is_completed_language(self):
        return self.talent_languages.count() > 0

    def get_is_completed_bio(self):
        return (self.height > 0) and (self.weight > 0) and not self.age_range and not self.head_line and self.bmi > 0

    def get_is_completed_medical(self):
        return self.talent_medicals.count() > 0

    def get_is_completed_resume(self):
        return self.talent_resume.count() > 0

    def get_is_completed_pictures(self):
        return self.talent_pictures.count() > 0

    def get_is_completed_videos(self):
        return self.talent_videos.count() > 0

    def get_is_completed_position_types(self):
        return self.talent_position_types.count() > 0

    def get_is_completed_position_sub_types(self):
        return self.talent_position_sub_types.count() > 0

    def get_is_completed_skills(self):
        return self.talent_skills.count() > 0

    def get_is_completed_sub_skills(self):
        return self.talent_sub_skills.count() > 0

    def get_is_completed_profile(self):
        return self.get_is_completed_contact_info() and self.get_is_completed_nationality() and \
               self.get_is_completed_language() and self.get_is_completed_bio() and self.get_is_completed_medical() and \
               self.get_is_completed_resume() and self.get_is_completed_pictures() and self.get_is_completed_videos() and \
               self.get_is_completed_position_types() and self.get_is_completed_position_sub_types() and \
               self.get_is_completed_skills() and self.get_is_completed_sub_skills()

    def get_profile_status(self):
        profile_status = {
            "is_completed_profile": self.get_is_completed_profile(),
            "is_completed_contact_info": self.get_is_completed_contact_info(),
            "is_completed_nationality": self.get_is_completed_nationality(),
            "is_completed_language": self.get_is_completed_language(),
            "is_completed_bio": self.get_is_completed_bio(),
            "is_completed_medical": self.get_is_completed_medical(),
            "is_completed_resume": self.get_is_completed_resume(),
            "is_completed_pictures": self.get_is_completed_pictures(),
            "is_completed_videos": self.get_is_completed_videos(),
            "is_completed_position_types": self.get_is_completed_position_types(),
            "is_completed_position_sub_types": self.get_is_completed_position_sub_types(),
            "is_completed_skills": self.get_is_completed_skills(),
            "is_completed_sub_skills": self.get_is_completed_sub_skills(),
            "is_completed_position_sub_types": self.get_is_completed_position_sub_types(),
        }
        return profile_status

    def get_talent_availabilities_last_update(self):
        talent_availabilities = self.talent_availabilities.order_by(
                Trunc('updated_at', 'day', output_field=DateTimeField()).desc()
        )
        last_update_at = ''
        if len(talent_availabilities) > 0:
            last_update_at = talent_availabilities[0].updated_at

        return last_update_at

    class Meta:
        db_table = "talent"
        ordering = ('id',)
        managed = True
        unique_together = ('user', 'id')
