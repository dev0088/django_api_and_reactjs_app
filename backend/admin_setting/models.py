from django.db import models

# Create your models here.
from datetime import datetime, timedelta

class AdminSetting(models.Model):

	video_interview_prep_countdown = models.IntegerField(blank=False, default=30)
	video_interview_response_time = models.IntegerField(blank=False, default=120)

	def __str__(self):
		"""
        Returns a string representation of this `Question`.
        This string is used when a `Question` is printed in the console.
        """
		return 'Admin settings'
