from django.db import models
from talent.models import Talent
from team_member.models import TeamMember


class SharedProfile(models.Model):
    team_member = models.ForeignKey(
        TeamMember,
        related_name='team_member_shared_profiles',
        on_delete=models.CASCADE
    )
    talent = models.ForeignKey(
        Talent,
        related_name='talent_shared_profiles',
        on_delete=models.CASCADE
    )
    comment = models.TextField(blank=True, null=True)
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return "team: {team}, client: {client_name}, talent: {talent_name}, member: {member_email}".format(
            team=self.team_member.team.name,
            client_name=self.team_member.team.client.user.first_name + self.team_member.team.client.user.last_name,
            talent_name=self.talent.user.first_name + self.talent.user.last_name,
            member_email=self.team_member.member_email
        )

    class Meta:
        db_table = "shared_profile"
        ordering = ('id', 'team_member', 'talent', 'created')
        unique_together = ('team_member', 'talent')
        managed = True
