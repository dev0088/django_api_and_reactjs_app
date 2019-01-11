from django.db import models
from client.models import Client
from talent.models import Talent


class CallBack(models.Model):
    client = models.ForeignKey(
            Client,
            related_name='client_call_backs',
            on_delete=models.CASCADE
    )
    talent = models.ForeignKey(
        Talent,
        related_name='talent_call_backs',
        on_delete=models.CASCADE
    )
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return "client: {client_name}, talent: {talent_name} at {created}".format(
            client_name=self.client.user.first_name + ' ' + self.client.user.last_name,
            talent_name=self.talent.user.first_name + ' ' + self.talent.user.last_name,
            created=self.created
        )

    class Meta:
        db_table = "call_back"
        ordering = ('id', 'client', 'talent', 'created')
        unique_together = ('client', 'talent')
        managed = True
