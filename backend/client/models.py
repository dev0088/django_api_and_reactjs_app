from django.db import models
import datetime
from authentication.models import User


class Client(models.Model):
    user = models.ForeignKey(User, related_name='client', on_delete=models.CASCADE)
    # casting_requests
    # shared_profiles
    # blocked_profiles
    # ratings
    created = models.DateTimeField(auto_now_add=True)
    description = models.CharField(max_length=100, blank=True)

    def __str__(self):
        """
        Returns a string representation of this `Client`.
        This string is used when a `Client` is printed in the console.
        """
        return "{client_id}, {user_name}, {email}".format(
                client_id=self.id,
                user_name=self.user.username,
                email=self.user.email
              )

    class Meta:
        db_table = "client"
        ordering = ('id',)
        managed = True
        unique_together = ('user', 'id')
#
# class Talent(models.Model):
#     master_types = (
#         (0, 'Vocalist'), (1, 'Dancer'), (2, 'Actor'), (3, 'Aerialist'), (4, 'Musician'), (5, 'Cruise Staff'),
#         (6, 'Youth Staff'), (7, 'Technician')
#     )
#
#     sub_types = (
#         (0, 'NULL'), (1, 'Soprano'), (2, 'Tenor'), (3, 'Alto'), (4, 'Baritone'), (5, 'Jazz'),
#         (6, 'Tap'), (7, 'Ballet'), (8, 'Contemp'), (9, 'Hip-Hop'), (10, 'Lyrical'),
#         (11, 'Ballroom'), (12, 'Gymnastics'), (13, 'Solo'), (14, 'Duo'), (15, 'Trio'),
#         (16, 'Quartet'), (17, 'Band'), (18, 'Audio'), (19, 'Lighting'), (20, 'Video')
#     )
#
#     sexes = (
#         (0, 'Male'), (1, 'Female')
#     )
#
#     master_roles = (
#         (0, 'Sings'), (1, 'Dances'), (2, 'Moves'), (3, 'Acts'), (4, 'Plays')
#     )
#
#     sub_roles = (
#         (0, 'NULL'), (1, 'Jazz'), (2, 'Tap'), (3, 'Ballet'), (4, 'Contemp'), (5, 'Hip-Hop'),
#         (6, 'Lyrical'), (7, 'Ballroom'), (8, 'Gymnastics'), (9, 'Piano'), (10, 'Bass'),
#         (11, 'Drums'), (12, 'Strings'), (13, 'Winds'), (14, 'Brass'), (15, 'Percussion')
#     )
#
#     langs = (
#         (0, 'NULL'), (1, 'English'), (2, 'Spanish'), (3, 'Portuguese'), (4, 'German'),
#         (5, 'French'), (6, 'Italian'), (7, 'Japanese'), (8, 'Mandarin'), (9, 'Cantonese')
#     )
#
#     name = models.CharField(max_length=50, default='')
#     sex = models.IntegerField(choices=sexes, default=0)
#     image = models.ImageField(upload_to="profile_image", blank=True)
#
#     vda_number = models.IntegerField(default=0)
#
#     master_type = models.IntegerField(choices=master_types, default=0)
#     sub_type = models.IntegerField(choices=sub_types, default=0)
#
#     master_role = models.IntegerField(choices=master_roles, default=0)
#     sub_role = models.IntegerField(choices=sub_roles, default=0)
#     role_description = models.CharField(max_length=100, default='')
#
#     able_date = models.DateField(default=datetime.date.today)
#     age = models.IntegerField(default=0)
#     height = models.IntegerField(default=0)
#
#     lang1 = models.IntegerField(choices=langs, default=0)
#     lang2 = models.IntegerField(choices=langs, default=0)
#     lang3 = models.IntegerField(choices=langs, default=0)
#
#     avg_rating = models.FloatField(default=0)
#     comment = models.TextField(max_length=500, default='')
#
#
# class CastingRequestModel(models.Model):
#     status_list = (
#         (0, 'Not Yet Submitted'), (1, 'Requested'), (2, 'In Progress'),
#         (3, 'Completed')
#     )
#
#     name = models.CharField(max_length=100, default='')
#     venue = models.CharField(max_length=50, default='')
#     start_date = models.DateField(default=datetime.date.today)
#     end_date = models.DateField(default=datetime.date.today)
#
#     status = models.IntegerField(choices=status_list, default=0)
#     request_date = models.DateField(default=datetime.date.today)
#
#     request_name = models.CharField(max_length=100, default='')
#     ship_name = models.CharField(max_length=100, default='')
#
#     employStartDate = models.DateField(default=datetime.date.today)
#     employEndDate = models.DateField(default=datetime.date.today)
#     joinDate = models.DateField(default=datetime.date.today)
#     rehearsalPlace = models.CharField(max_length=50, default='')
#
#     rehearsalStartDate = models.DateField(default=datetime.date.today)
#     rehearsalEndDate = models.DateField(default=datetime.date.today)
#     performanceStartDate = models.DateField(default=datetime.date.today)
#     performanceEndDate = models.DateField(default=datetime.date.today)
#
#     visa_requirement = models.TextField(default='')
#     comment = models.TextField(default='')
#
#
# class ClientCallbackModel(models.Model):
#     client_id = models.IntegerField(default=0)
#     talent_id = models.ForeignKey(Talent, on_delete=models.CASCADE)
#
#
# class ClientFavoriteModel(models.Model):
#     client_id = models.IntegerField(default=0)
#     talent_id = models.ForeignKey(Talent, on_delete=models.CASCADE)
