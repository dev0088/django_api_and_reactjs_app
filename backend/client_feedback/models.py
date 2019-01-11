from django.db import models
from client.models import Client


class ClientFeedback(models.Model):
    client = models.ForeignKey(
            Client,
            related_name='client_client_feedbacks',
            on_delete=models.CASCADE
    )
    feedback = models.TextField(blank=False)
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return "client: {client_name}, {feedback} ".format(
            client_name=self.client.user.first_name + ' ' + self.client.user.last_name,
            feedback=self.feedback
        )

    class Meta:
        db_table = "client_feedback"
        ordering = ('id', 'client', 'created')
        managed = True
