# Generated by Django 2.0.5 on 2019-02-07 02:34

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('position_sub_type', '0006_positionsubtype_abbreviated_key'),
    ]

    operations = [
        migrations.AddField(
            model_name='positionsubtype',
            name='agent_title',
            field=models.CharField(blank=True, default='', max_length=100),
        ),
    ]
