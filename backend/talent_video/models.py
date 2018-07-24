from django.db import models

# Create your models here.
from django.db import models
from talent.models import Talent
from talent_position_sub_type.models import TalentPositionSubType

class TalentVideo(models.Model):
  talent = models.ForeignKey(Talent, related_name='talent_videos', on_delete=models.CASCADE)
  name = models.CharField(max_length=120, null=True, blank=True)
  path = models.TextField(blank=True, null=True)
  url = models.TextField(blank=True, null=True)
  size = models.BigIntegerField(default=0)
  file_type = models.CharField(max_length=120, null=True, blank=True)
  timestamp = models.DateTimeField(auto_now_add=True)
  updated = models.DateTimeField(auto_now=True)
  uploaded = models.BooleanField(default=False)
  active = models.BooleanField(default=True)
  # question = models.TextField(blank=True, null=True)
  # talent_position_sub_type = models.ForeignKey(TalentPositionSubType, related_name='answered_videos', on_delete=models.CASCADE)
  
  def __str__(self):
    return 'talent: {user_email}, video: {video_url}, {video_size}'.format(
        user_email=self.talent.user.email,
        video_url=self.url,
        video_size=self.size
      )

  class Meta:
    db_table = "talent_video"
    ordering = ('talent', 'updated', 'name')
    managed = True
