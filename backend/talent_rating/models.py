from django.db import models
from talent.models import Talent
from client.models import Client
from casting_request_talent.models import CastingRequestTalent


class TalentRating(models.Model):
    talent = models.ForeignKey(Talent, related_name='talent_ratings', on_delete=models.CASCADE)
    rating = models.FloatField(blank=False, default=0.0)
    comments = models.TextField(blank=True, null=True)
    client = models.ForeignKey(Client, related_name='talent_ratings_by_client', on_delete=models.CASCADE)
    casting_request_talent = models.ForeignKey(
        CastingRequestTalent,
        related_name='talent_rating_casting_request_talent',
        on_delete=models.CASCADE,
        blank=True, null=True
    )
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
        unique_together = ('talent', 'client', 'casting_request_talent')
        managed = True
