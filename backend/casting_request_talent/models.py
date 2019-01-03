from django.db import models
from casting_request.models import CastingRequest
from talent.models import Talent


class CastingRequestTalent(models.Model):
    # Relation with user
    casting_request = models.ForeignKey(
            CastingRequest,
            related_name='casting_request_talents',
            on_delete=models.CASCADE
    )
    talent = models.ForeignKey(
        Talent,
        related_name='talent_casting_requests',
        on_delete=models.CASCADE
    )
    rehearsal_wage = models.IntegerField(blank=True, default=0)
    performance_wage = models.IntegerField(blank=True, default=0)
    comment = models.TextField(blank=True, default='')
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        """
        Returns a string representation of this `CastingRequest`.
        This string is used when a `CastingRequest` is printed in the console.
        """
        return "name: {casting_request_name}, talent: {talent_name}".format(
                    casting_request_name=self.casting_request.name,
                    talent_name=self.talent.user.username
                )

    class Meta:
        db_table = "casting_request_talents"
        ordering = ('id', 'casting_request', 'created')
        unique_together = ('casting_request', 'talent')
        managed = True
