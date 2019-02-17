from django.db import models
from talent.models import Talent


class TalentVideoGreeting(models.Model):
    talent = models.ForeignKey(Talent, related_name='talent_video_greetings', on_delete=models.CASCADE)
    name = models.CharField(max_length=120, null=True, blank=True)
    path = models.TextField(blank=True, null=True)
    url = models.TextField(blank=True, null=True)
    size = models.BigIntegerField(default=0)
    file_type = models.CharField(max_length=120, null=True, blank=True)
    timestamp = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    uploaded = models.BooleanField(default=False)
    active = models.BooleanField(default=True)
    language = models.CharField(max_length=50, null=True, blank=True)
    priority = models.IntegerField(blank=True, default=100)
    approved = models.BooleanField(default=False)
    approved_date = models.DateTimeField(blank=True, null=True)
    approved_by = models.CharField(max_length=50, null=True, blank=True)

    def __str__(self):
        return 'talent: {user_email}, language: {language}, video: {video_url}, {video_size}'.format(
                user_email=self.talent.user.email,
                language=self.language,
                video_url=self.url,
                video_size=self.size
            )

    class Meta:
        db_table = "talent_video_greeting"
        ordering = ('talent', 'priority', 'updated')
        managed = True
