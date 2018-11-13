from django.db import models
from talent.models import Talent
from client.models import Client


class TalentRating(models.Model):
    talent = models.ForeignKey(Talent, related_name='talent_ratings', on_delete=models.CASCADE)
    rating = models.FloatField(blank=True, default=0.0)
    comments = models.TextField(blank=True, null=True)
    client = models.ForeignKey(Client, related_name='talent_ratings_by_client', on_delete=models.CASCADE)
    updated = models.DateTimeField(auto_now=True)

    def __str__(self):
        return 'talent: {user_email}, rating: {rating} by {client} at {updated}'\
            .format(user_email=self.talent.user.email,
                    rating=self.rating,
                    client=self.client.user.email,
                    updated=self.updated)

    class Meta:
        db_table = "talent_rating"
        ordering = ('talent', 'updated', 'client')
        managed = True
