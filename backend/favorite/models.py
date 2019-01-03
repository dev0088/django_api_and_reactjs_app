from django.db import models
from client.models import Client
from talent.models import Talent


class Favorite(models.Model):
    client = models.ForeignKey(
            Client,
            related_name='client_favorites',
            on_delete=models.CASCADE
    )
    talent = models.ForeignKey(
        Talent,
        related_name='talent_favorites',
        on_delete=models.CASCADE
    )
    viewed_time = models.DateTimeField(auto_now=True)

    def __str__(self):
        return "client: {client_name} viewed talent: {talent_name} at {viewed_time}".format(
            client_name=self.client.user.first_name + ' ' + self.client.user.last_name,
            talent_name=self.talent.user.first_name + ' ' + self.talent.user.last_name,
            viewed_time=self.viewed_time
        )

    class Meta:
        db_table = "favorite"
        ordering = ('id', 'client', 'viewed_time', 'talent')
        unique_together = ('client', 'talent')
        managed = True
