from django.db import models
from talent.models import Talent
from position_sub_type.models import PositionSubType


class TalentPositionSubTypeManager(models.Manager):
    def get_queryset(self):
        return super(TalentPositionSubTypeManager, self).get_queryset().filter(active=True)


class TalentPositionSubType(models.Model):
    talent = models.ForeignKey(Talent, related_name='talent_position_sub_types', on_delete=models.CASCADE)
    position_sub_type = models.ForeignKey(PositionSubType, related_name='talent_position_sub_types', on_delete=models.CASCADE)

    def __str__(self):
        return '{talent}: {position_type} -> {position_sub_type}'.format(
            talent=self.talent.user.email, 
            position_type=self.position_sub_type.position_type.name,
            position_sub_type=self.position_sub_type.name)

    class Meta:
        db_table = "talent_position_sub_type"
        ordering = ('talent', 'position_sub_type')
        managed = True
        unique_together = ('talent', 'position_sub_type')
