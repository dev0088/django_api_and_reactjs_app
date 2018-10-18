from django.db import models
import datetime


# Create your models here.


class Talent(models.Model):
    master_types = (
        (0, 'Vocalist'), (1, 'Dancer'), (2, 'Actor'), (3, 'Aerialist'), (4, 'Musician'), (5, 'Cruise Staff'),
        (6, 'Youth Staff'), (7, 'Technician')
    )

    sub_types = (
        (0, 'NULL'), (1, 'Soprano'), (2, 'Tenor'), (3, 'Alto'), (4, 'Baritone'), (5, 'Jazz'),
        (6, 'Tap'), (7, 'Ballet'), (8, 'Contemp'), (9, 'Hip-Hop'), (10, 'Lyrical'),
        (11, 'Ballroom'), (12, 'Gymnastics'), (13, 'Solo'), (14, 'Duo'), (15, 'Trio'),
        (16, 'Quartet'), (17, 'Band'), (18, 'Audio'), (19, 'Lighting'), (20, 'Video')
    )

    sexes = (
        (0, 'Male'), (1, 'Female')
    )

    master_roles = (
        (0, 'Sings'), (1, 'Dances'), (2, 'Moves'), (3, 'Acts'), (4, 'Plays')
    )

    sub_roles = (
        (0, 'NULL'), (1, 'Jazz'), (2, 'Tap'), (3, 'Ballet'), (4, 'Contemp'), (5, 'Hip-Hop'),
        (6, 'Lyrical'), (7, 'Ballroom'), (8, 'Gymnastics'), (9, 'Piano'), (10, 'Bass'),
        (11, 'Drums'), (12, 'Strings'), (13, 'Winds'), (14, 'Brass'), (15, 'Percussion')
    )

    langs = (
        (0, 'NULL'), (1, 'English'), (2, 'Spanish'), (3, 'Portuguese'), (4, 'German'),
        (5, 'French'), (6, 'Italian'), (7, 'Japanese'), (8, 'Mandarin'), (9, 'Cantonese')
    )

    name = models.CharField(max_length=50, default='')
    sex = models.IntegerField(choices=sexes, default=0)

    vda_number = models.IntegerField(default=0)

    master_type = models.IntegerField(choices=master_types, default=0)
    sub_type = models.IntegerField(choices=sub_types, default=0)

    master_role = models.IntegerField(choices=master_roles, default=0)
    sub_role = models.IntegerField(choices=sub_roles, default=0)
    role_description = models.CharField(max_length=100, default='')

    able_in = models.DateField(default=datetime.date.today)
    able_out = models.DateField(default=datetime.date.today)
    age = models.IntegerField(default=0)
    height = models.IntegerField(default=0)

    lang1 = models.IntegerField(choices=langs, default=0)
    lang2 = models.IntegerField(choices=langs, default=0)
    lang3 = models.IntegerField(choices=langs, default=0)

    avg_rating = models.CharField(max_length=10, default='')
    comment = models.TextField(max_length=500, default='')
