from django.db import models
from talent_position_type.models import TalentPositionType

# Create your models here.
class TalentPositionSubTypeManager(models.Manager):
    def get_queryset(self):
        return super(TalentPositionSubTypeManager, self).get_queryset().filter(active=True)

class TalentPositionSubType(models.Model):
	### Relation with user
	talent_position_type = models.ForeignKey(TalentPositionType, related_name='talent_position_sub_types', on_delete=models.CASCADE)

	name = models.CharField(blank=False, max_length=50)

	def __str__(self):
		return self.talent_position_type.name + ' -> ' + self.name

	class Meta:
		db_table = "talent_position_sub_type"
		ordering = ('talent_position_type', 'name')
		managed = True
		unique_together = ('name', 'id')
