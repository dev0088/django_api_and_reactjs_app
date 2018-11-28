from django.db import models
from datetime import date
from django.utils import timezone
from time import strftime
from talent.models import Talent


class TalentAvailabilityManager(models.Manager):
    def get_queryset(self):
        return super(TalentAvailabilityManager, self).get_queryset().filter(active=True)


class TalentAvailability(models.Model):
    talent = models.ForeignKey(Talent, related_name='talent_availabilities', on_delete=models.CASCADE)
    start_date = models.DateField(blank=False, default=date.today)
    end_date = models.DateField(blank=False, default=date.today)
    updated_at = models.DateTimeField(default=timezone.now, blank=True)

    def __str__(self):
        return '{talent}: {start_date}'.format(
            talent=self.talent.user.email, 
            start_date=self.start_date)

    class Meta:
        db_table = "talent_availability"
        ordering = ('talent', 'start_date', 'end_date')
        managed = True
        unique_together = ('talent', 'start_date', 'end_date')
