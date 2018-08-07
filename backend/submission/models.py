from django.db import models

# Create your models here.
from datetime import datetime, timedelta

class Submission(models.Model):
  full_name = models.CharField(max_length=255, blank=False)
  email = models.EmailField(max_length=255, blank=False)
  subject = models.CharField(max_length=255, blank=False)
  message = models.TextField(blank=False)
  created = models.DateTimeField(auto_now_add=True)

  def __str__(self):
    """
    Returns a string representation of this `Question`.
    This string is used when a `Question` is printed in the console.
    """
    return '{subject}: From {user}'.format(
	      subject = self.subject,
	      user = self.full_name
      )

  class Meta:
    ordering = ('created',)
    managed = True
