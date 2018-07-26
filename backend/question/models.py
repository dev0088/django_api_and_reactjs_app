from django.db import models

# Create your models here.
from datetime import datetime, timedelta
from talent_position_type.models import TalentPositionType

class Question(models.Model):
  talent_position_type = models.ForeignKey(TalentPositionType, related_name='questions', on_delete=models.CASCADE)
  talent_position_sub_type = models.CharField(max_length=120, null=True, blank=True)
  content = models.TextField(blank=False)
  created = models.DateTimeField(auto_now_add=True)

  def __str__(self):
    """
    Returns a string representation of this `Question`.
    This string is used when a `Question` is printed in the console.
    """
    truncatedContent = (self.content[:75] + '..') if len(self.content) > 75 else self.content
    return 'Position type: ' + self.talent_position_type.name + ', Question: ' + self.content

  class Meta:
    db_table = "question"
    ordering = ('content',)
    managed = True
