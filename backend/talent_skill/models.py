from django.db import models
from talent.models import Talent
from skill.models import Skill

class TalentSkillManager(models.Manager):
  def get_queryset(self):
      return super(TalentSkillManager, self).get_queryset().filter(active=True)

class TalentSkill(models.Model):
  talent = models.ForeignKey(Talent, related_name='talent_skills', on_delete=models.CASCADE)
  skill = models.ForeignKey(Skill, related_name='talent_skills', on_delete=models.CASCADE)

  def __str__(self):
    return '{talent}: {skill}'.format(
      talent=self.talent.user.email, 
      skill=self.skill.name)

  def get_skill_id(self):
    return self.skill.id

  def get_sub_skills(self):
    return self.skill.sub_skills

  class Meta:
    db_table = "talent_skill"
    ordering = ('talent', 'skill')
    managed = True
    unique_together = ('talent', 'skill')
