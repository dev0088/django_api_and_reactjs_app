from django.db import models
from datetime import datetime, timedelta
from client.models import Client
from talent.models import Talent

BLOCK_DESCRIPTION_CHOICES = (
    ('hour', 'Block for an hour'),
    ('today', 'Block for today'),
    ('week', 'Block for a week'),
    ('month', 'Block for a month'),
    ('six months', 'Block for six months'),
    ('forever', 'Block forever')
)


class BlockedProfile(models.Model):
    client = models.ForeignKey(
            Client,
            related_name='client_blocked_profiles',
            on_delete=models.CASCADE
    )
    talent = models.ForeignKey(
        Talent,
        related_name='talent_blocked_profiles',
        on_delete=models.CASCADE
    )
    blocked_time = models.DateTimeField(auto_now_add=True)
    description = models.CharField(choices=BLOCK_DESCRIPTION_CHOICES, default='month', max_length=50)

    def __str__(self):
        return "client: {client_name}, talent: {talent_name}, blocked for {description} at {blocked_time}".format(
            client_name=self.client.user.first_name + ' ' + self.client.user.last_name,
            talent_name=self.talent.user.first_name + ' ' + self.talent.user.last_name,
            description=self.description,
            blocked_time=self.blocked_time
        )

    class Meta:
        db_table = "blocked_profile"
        ordering = ('id', 'client', 'talent', 'blocked_time', 'description')
        unique_together = ('client', 'talent')
        managed = True
