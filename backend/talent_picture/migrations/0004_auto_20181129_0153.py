# Generated by Django 2.0.5 on 2018-11-29 01:53

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('talent_picture', '0003_auto_20181128_0039'),
    ]

    operations = [
        migrations.AlterField(
            model_name='talentpicture',
            name='priority',
            field=models.IntegerField(blank=True, default=100),
        ),
    ]
