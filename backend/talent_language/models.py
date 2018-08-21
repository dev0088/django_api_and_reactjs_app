from django.db import models
from talent.models import Talent

FLUENCY_CHOICE = (
  ('Fluent', 'Fluent'),
  ('Conversational', 'Conversational'),
  ('Basic', 'Basic'),
)

class TalentLanguage(models.Model):
  talent = models.ForeignKey(Talent, related_name='talent_languages', on_delete=models.CASCADE)
  language = models.CharField(max_length=50, null=True, blank=True)
  fluency = models.CharField(choices=FLUENCY_CHOICE, default='Basic', max_length=30)

  def __str__(self):
    return 'talent: {user_email}: {language}, {fluency}'.format(
      user_email=self.talent.user.email,
      language=self.language,
      fluency=self.fluency
    )

  class Meta:
    db_table = "talent_language"
    ordering = ('talent', 'language', 'fluency')
    managed = True
