from django.db import models
from talent.models import Talent
from talent_position_sub_type.models import TalentPositionSubType

class TalentAdditionalPositionSubTypeManager(models.Manager):
  def get_queryset(self):
    return super(TalentAdditionalPositionSubTypeManager, self).get_queryset().filter(active=True)

class TalentAdditionalPositionSubType(models.Model):
  talent = models.ForeignKey(Talent, related_name='talent_additional_position_sub_types', on_delete=models.CASCADE)
  talent_position_sub_type = models.ForeignKey(TalentPositionSubType, related_name='talent_additional_position_sub_types', on_delete=models.CASCADE)

  def __str__(self):
    return '{username}: {talent_position_name} -> {talent_position_sub_type_name}'.format(
        username = self.talent.user.username,
        talent_position_name = self.talent_position_sub_type.talent_position_type.position_type.name,
        talent_position_sub_type_name = self.talent_position_sub_type.position_sub_type.name
      )

  class Meta:
    db_table = "talent_additional_position_sub_type"
    managed = True
