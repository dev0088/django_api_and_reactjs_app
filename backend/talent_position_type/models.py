from django.db import models
# from talent_position_sub_type.models import TalentPositionSubType

# Create your models here.
class TalentPositionTypeManager(models.Manager):
    def get_queryset(self):
        return super(TalentPositionTypeManager, self).get_queryset().filter(active=True)

class TalentPositionType(models.Model):
	name = models.CharField(blank=False, max_length=50)

	def __str__(self):
		return self.name

	class Meta:
		db_table = "talent_position_type"
		ordering = ('name',)
		managed = True
		unique_together = ('name', 'id')
