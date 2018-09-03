from django.db import models
from talent.models import Talent

class TalentMedical(models.Model):
  talent = models.ForeignKey(Talent, related_name='talent_medicals', on_delete=models.CASCADE)
  condition_title = models.CharField(max_length=300, null=True, blank=True)
  condition_value = models.BooleanField(default=False)

  def __str__(self):
    return 'talent: {user_email}: {condition_title}: {condition_value}'.format(
      user_email=self.talent.user.email,
      condition_title=self.condition_title,
      condition_value=self.condition_value
    )

  class Meta:
    db_table = "talent_medical"
    ordering = ('talent', 'condition_title', 'condition_value')
    managed = True
