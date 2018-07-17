from django.db import models

# Create your models here.
from datetime import datetime, timedelta

class Question(models.Model):
	### general info
	content = models.TextField(blank=False)
	created = models.DateTimeField(auto_now_add=True)

	def __str__(self):
		"""
        Returns a string representation of this `Question`.
        This string is used when a `Question` is printed in the console.
        """
		return self.user.username + ', ' + self.user.email
