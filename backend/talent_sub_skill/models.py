from django.db import models
from talent.models import Talent
from sub_skill.models import SubSkill

class TalentSubSkillManager(models.Manager):
  def get_queryset(self):
      return super(TalentSubSkillManager, self).get_queryset().filter(active=True)

class TalentSubSkill(models.Model):
  talent = models.ForeignKey(Talent, related_name='talent_sub_skills', on_delete=models.CASCADE)
  sub_skill = models.ForeignKey(SubSkill, related_name='talent_sub_skills', on_delete=models.CASCADE)

  def __str__(self):
    return '{talent}: {skill} -> {sub_skill}'.format(
      talent=self.talent.user.email, 
      skill=self.sub_skill.skill.name,
      sub_skill=self.sub_skill.name)

  def get_skill(self):
    return '{skill}'.format(skill=self.sub_skill.skill.name)

  def get_sub_skill(self):
    return '{skill}'.format(skill=self.sub_skill.name)

  class Meta:
    db_table = "talent_sub_skill"
    ordering = ('talent', 'sub_skill')
    managed = True
    unique_together = ('talent', 'sub_skill')
