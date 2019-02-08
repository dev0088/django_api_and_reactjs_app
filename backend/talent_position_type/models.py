from django.db import models
from talent.models import Talent
from position_type.models import PositionType


class TalentPositionTypeManager(models.Manager):
    def get_queryset(self):
        return super(TalentPositionTypeManager, self).get_queryset().filter(active=True)


class TalentPositionType(models.Model):
    talent = models.ForeignKey(Talent, related_name='talent_position_types', on_delete=models.CASCADE)
    position_type = models.ForeignKey(PositionType, related_name='talent_position_types', on_delete=models.CASCADE)

    def __str__(self):
        return '{talent}: {position_type}'.format(
            talent=self.talent.user.email,
            position_type=self.position_type.name)

    def get_position_type_id(self):
        return self.position_type.id

    class Meta:
        db_table = "talent_position_type"
        ordering = ('talent', 'position_type')
        managed = True
        unique_together = ('talent', 'position_type')
