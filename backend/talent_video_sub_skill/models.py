from django.db import models
from talent.models import Talent
from sub_skill.models import SubSkill


class TalentVideoSubSkill(models.Model):
    talent = models.ForeignKey(Talent, related_name='talent_video_sub_skills', on_delete=models.CASCADE)
    sub_skill = models.ForeignKey(SubSkill, related_name='video_sub_skills', on_delete=models.CASCADE)
    priority = models.IntegerField(blank=True, default=0)
    name = models.CharField(max_length=120, null=True, blank=True)
    path = models.TextField(blank=True, null=True)
    url = models.TextField(blank=True, null=True)
    size = models.BigIntegerField(default=0)
    file_type = models.CharField(max_length=120, null=True, blank=True)
    timestamp = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    uploaded = models.BooleanField(default=False)
    active = models.BooleanField(default=True)

    def __str__(self):
        return 'talent: {user_email}, sub_skill: {sub_skill}, video: {video_url}, {video_size}'.format(
                user_email=self.talent.user.email,
                sub_skill=self.sub_skill.name,
                video_url=self.url,
                video_size=self.size
            )

    class Meta:
        db_table = "talent_video_sub_skill"
        ordering = ('talent', 'sub_skill', 'priority', 'updated')
        managed = True
