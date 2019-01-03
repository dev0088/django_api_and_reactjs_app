from django.db import models
from authentication.models import User


class Client(models.Model):
    user = models.ForeignKey(User, related_name='client', on_delete=models.CASCADE)
    created = models.DateTimeField(auto_now_add=True)
    description = models.CharField(max_length=100, blank=True)

    def __str__(self):
        """
        Returns a string representation of this `Client`.
        This string is used when a `Client` is printed in the console.
        """
        return "{client_id}, {user_name}, {email}".format(
                client_id=self.id,
                user_name=self.user.username,
                email=self.user.email
              )

    class Meta:
        db_table = "client"
        ordering = ('id',)
        managed = True
        unique_together = ('user', 'id')
