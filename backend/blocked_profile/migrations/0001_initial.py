# Generated by Django 2.0.5 on 2018-12-25 03:49

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('client', '0001_initial'),
        ('talent', '0002_talent_tid'),
    ]

    operations = [
        migrations.CreateModel(
            name='BlockedProfile',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('blocked_time', models.DateTimeField(auto_now_add=True)),
                ('description', models.CharField(choices=[('hour', 'Block for an hour'), ('today', 'Block for today'), ('week', 'Block for a week'), ('month', 'Block for a month'), ('six_months', 'Block for six months'), ('forever', 'Block forever')], default='month', max_length=50)),
                ('client', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='client_blocked_profiles', to='client.Client')),
                ('talent', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='talent_blocked_profiles', to='talent.Talent')),
            ],
            options={
                'db_table': 'blocked_profile',
                'ordering': ('id', 'client', 'talent', 'blocked_time', 'description'),
                'managed': True,
            },
        ),
        migrations.AlterUniqueTogether(
            name='blockedprofile',
            unique_together={('client', 'talent')},
        ),
    ]