# Generated by Django 2.0.5 on 2018-12-01 08:56

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('sub_skill', '0006_auto_20181201_0034'),
    ]

    operations = [
        migrations.AddField(
            model_name='subskill',
            name='is_required',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='subskill',
            name='is_required_all',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='subskill',
            name='is_special_video_audition',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='subskill',
            name='is_video_interview_button',
            field=models.BooleanField(default=False),
        ),
    ]
