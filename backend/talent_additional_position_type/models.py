from django.db import models
from talent.models import Talent
from talent_position_type.models import TalentPositionType

class TalentAdditionalPositionTypeManager(models.Manager):
  def get_queryset(self):
    return super(TalentAdditionalPositionTypeManager, self).get_queryset().filter(active=True)

class TalentAdditionalPositionType(models.Model):
  talent = models.ForeignKey(Talent, related_name='talent_additional_position_types', on_delete=models.CASCADE)
  talent_position_type = models.ForeignKey(TalentPositionType, related_name='talent_additional_position_types', on_delete=models.CASCADE)

  def __str__(self):
    return '{username}: {talent_position_name}'.format(
        username = self.talent.user.username,
        talent_position_name = self.talent_position_type.name,
      )

  class Meta:
    db_table = "talent_additional_position_type"
    managed = True
