from django.db import models
from talent.models import Talent


class TalentPicture(models.Model):
    talent = models.ForeignKey(Talent, related_name='talent_pictures', on_delete=models.CASCADE)
    caption = models.CharField(max_length=120, null=True, blank=True)
    priority = models.IntegerField(blank=True, default=100)
    name = models.CharField(max_length=120, null=True, blank=True)
    path = models.TextField(blank=True, null=True)
    url = models.TextField(blank=True, null=True)
    size = models.BigIntegerField(default=0)
    file_type = models.CharField(max_length=120, null=True, blank=True)
    timestamp = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    uploaded = models.BooleanField(default=False)
    active = models.BooleanField(default=True)
    approved = models.BooleanField(default=False)
    approved_date = models.DateTimeField(blank=True, null=True)
    approved_by = models.CharField(max_length=50, null=True, blank=True)

    def __str__(self):
        return 'talent: {user_email}, image: {image_url}, {image_size}'.format(
            user_email=self.talent.user.email,
            image_url=self.url,
            image_size=self.size
        )

    class Meta:
        db_table = "talent_picture"
        ordering = ('talent', 'priority', 'caption', 'updated', 'name')
        managed = True
