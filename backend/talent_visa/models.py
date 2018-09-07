from django.db import models
from talent.models import Talent
from datetime import datetime, timedelta, date

class TalentVisa(models.Model):
  talent = models.ForeignKey(Talent, related_name='talent_visas', on_delete=models.CASCADE)
  name = models.CharField(max_length=50, null=True, blank=True)
  expiration_date = models.DateField(blank=True, default=date.today)

  def __str__(self):
    return 'talent: {user_email}: {name}, {expiration_date}'.format(
      user_email=self.talent.user.email,
      name=self.name,
      expiration_date=self.expiration_date
    )

  class Meta:
    db_table = "talent_visa"
    ordering = ('talent', 'name', 'expiration_date')
    managed = True
