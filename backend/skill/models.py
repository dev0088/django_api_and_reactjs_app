from django.db import models
from position_type.models import PositionType


class SkillManager(models.Manager):
    def get_queryset(self):
        return super(SkillManager, self).get_queryset().filter(active=True)


class Skill(models.Model):
    name = models.CharField(blank=False, max_length=50)
    priority = models.IntegerField(blank=True, default=100)
    multi_selection = models.BooleanField(default=False)
    related_position_type = models.ForeignKey(PositionType, related_name='related_skills', on_delete=models.CASCADE)
    description = models.CharField(blank=True, max_length=50)
    question = models.TextField(max_length=300, blank=True)
    video_audition_button_title = models.CharField(blank=True, max_length=100, default='')
    wizard_button_title = models.CharField(blank=True, max_length=100, default='')
    
    def __str__(self):
        return self.name

    class Meta:
        db_table = "skill"
        ordering = ('priority', 'name', )
        managed = True
        unique_together = ('name', 'id')
