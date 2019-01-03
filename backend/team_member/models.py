from django.db import models
from team.models import Team


class TeamMember(models.Model):
    team = models.ForeignKey(
        Team,
        related_name='team_team_members',
        on_delete=models.CASCADE
    )
    member_email = models.CharField(max_length=100, blank=False, default='')
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        """
        Returns a string representation of this `CastingRequest`.
        This string is used when a `CastingRequest` is printed in the console.
        """
        return "team: {team_name},  owner: {client_name}, member: {member_email}".format(
            team_name=self.team.name,
            client_name=self.team.client.user.first_name + self.team.client.user.last_name,
            member_email=self.member_email
        )

    class Meta:
        db_table = "team_member"
        ordering = ('id', 'team', 'member_email', 'created')
        unique_together = ('team', 'member_email')
        managed = True
