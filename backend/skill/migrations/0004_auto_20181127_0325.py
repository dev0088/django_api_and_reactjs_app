# Generated by Django 2.0.5 on 2018-11-27 03:25

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('skill', '0003_auto_20181123_2214'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='skill',
            options={'managed': True, 'ordering': ('priority', 'name')},
        ),
        migrations.AddField(
            model_name='skill',
            name='priority',
            field=models.IntegerField(blank=True, default=0),
        ),
    ]
