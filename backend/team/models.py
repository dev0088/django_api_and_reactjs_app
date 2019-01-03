from django.db import models
from client.models import Client


class Team(models.Model):
    client = models.ForeignKey(
        Client,
        related_name='client_teams',
        on_delete=models.CASCADE
    )
    name = models.CharField(max_length=50, blank=True, default='')
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        """
        Returns a string representation of this `CastingRequest`.
        This string is used when a `CastingRequest` is printed in the console.
        """
        return "client: {client_name}".format(
                    client_name=self.client.user.first_name + self.client.user.last_name
                )

    class Meta:
        db_table = "team"
        ordering = ('id', 'client', 'created')
        unique_together = ('client', )
        managed = True
