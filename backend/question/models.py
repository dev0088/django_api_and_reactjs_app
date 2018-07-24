from django.db import models

# Create your models here.
from datetime import datetime, timedelta
from talent_position_sub_type.models import TalentPositionSubType

class Question(models.Model):
  talent_position_sub_type = models.ForeignKey(TalentPositionSubType, related_name='questions', on_delete=models.CASCADE)
  content = models.TextField(blank=False)
  created = models.DateTimeField(auto_now_add=True)

  def __str__(self):
    """
    Returns a string representation of this `Question`.
    This string is used when a `Question` is printed in the console.
    """
    truncatedContent = (self.content[:75] + '..') if len(self.content) > 75 else self.content
    return self.talent_position_sub_type.name + ' ' + self.talent_position_sub_type.talent_position_type.name + ': ' + self.content

  class Meta:
    db_table = "question"
    ordering = ('content',)
    managed = True
