from django.db import models
from position_type.models import PositionType


class SkillManager(models.Manager):
    def get_queryset(self):
        return super(SkillManager, self).get_queryset().filter(active=True)


class Skill(models.Model):
    name = models.CharField(blank=False, max_length=50)
    multi_selection = models.BooleanField(default=False)
    related_position_type = models.ForeignKey(PositionType, related_name='related_skills', on_delete=models.CASCADE)
    description = models.CharField(blank=True, max_length=50)
    question = models.TextField(max_length=300, blank=True)
    
    def __str__(self):
        return self.name

    class Meta:
        db_table = "skill"
        ordering = ('name', )
        managed = True
        unique_together = ('name', 'id')
