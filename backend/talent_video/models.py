from django.db import models

# Create your models here.
from django.db import models
from talent.models import Talent

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
  
  def __str__(self):
    return 'talent: {user_email}, video: {video_path}, {video_size}'.format(
        user_email=self.talent.user.email,
        video_path=self.path,
        video_size=self.size
      )

  class Meta:
    db_table = "talent_video"
    ordering = ('talent', 'updated', 'name')
    managed = True
