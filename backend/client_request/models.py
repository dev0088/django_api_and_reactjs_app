from django.db import models
from client.models import Client
from talent.models import Talent


class ClientRequest(models.Model):
    client = models.ForeignKey(
            Client,
            related_name='client_client_requests',
            on_delete=models.CASCADE
    )
    talent = models.ForeignKey(
            Talent,
            related_name='talent_client_requests',
            on_delete=models.CASCADE
    )
    request = models.TextField(blank=False)
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return "client: {client_name}, talent: {talent_name}, {request} ".format(
            client_name=self.client.user.first_name + ' ' + self.client.user.last_name,
            talent_name=self.talent.user.first_name + ' ' + self.talent.user.last_name,
            request=self.request
        )

    class Meta:
        db_table = "client_request"
        ordering = ('id', 'client', 'talent', 'created')
        managed = True
