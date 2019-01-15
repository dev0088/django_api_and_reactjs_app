from django.db import models
from skill.models import Skill

VIDEO_TYPES = [
    (0, 0),  # introduction(optional), video (1,2,4), helpful hint(optional)
    (1, 1),  # step 2, video 2, helpful hint, download
    (2, 2),  # step2, download link, helpful hint
    (3, 3),  # step2, introduction, helpful hint
]

VIDEO_VIEW_CONTENT_TYPES = [
    ('Nothing Content', 'Nothing Content'),
    ('Site Content', 'Site Content'),
    ('Talent Content', 'Talent Content'),
    ('Reference', 'Reference'),
]


class SubSkillManager(models.Manager):
    def get_queryset(self):
        return super(SubSkillManager, self).get_queryset().filter(active=True)


class SubSkill(models.Model):
    # Relation with user
    skill = models.ForeignKey(Skill, related_name='sub_skills', on_delete=models.CASCADE)
    name = models.CharField(blank=False, max_length=50)
    caption = models.CharField(blank=True, max_length=50, default='')
    priority = models.IntegerField(blank=True, default=100)
    select_option_title = models.CharField(blank=True, max_length=100, default='')
    wizard_button_title = models.CharField(blank=True, max_length=100, default='')
    video_audition_button_title = models.CharField(blank=True, max_length=100, default='')
    form_title = models.CharField(blank=True, max_length=50, default='')
    video_audition_title = models.TextField(blank=True, default='')
    video_audition_sub_title = models.TextField(blank=True, default='')
    description = models.CharField(blank=True, max_length=50)
    max_video_time = models.IntegerField(blank=True, default=3600)
    have_step2 = models.BooleanField(blank=False, default=False)
    step1_title = models.TextField(blank=True, default='')
    step1_sub_title = models.TextField(blank=True, default='')
    step1_button_title = models.TextField(blank=True, default='')
    step1_link = models.CharField(blank=True, max_length=1024)
    step2_title = models.TextField(blank=True, default='')
    step2_sub_title = models.TextField(blank=True, default='')
    step2_button_title = models.TextField(blank=True, default='')
    step2_link = models.CharField(blank=True, max_length=1024)
    video_counts = models.IntegerField(blank=True, default=1)
    helpful_hint = models.BooleanField(blank=False, default=False)
    introduction_title = models.TextField(blank=True, default='')
    introduction_link = models.CharField(blank=True, max_length=1024)
    instruction_button_title = models.TextField(blank=True, default='')
    instruction_button_link = models.CharField(blank=True, max_length=100, default='')
    opts_in = models.BooleanField(blank=False, default=False)
    video_audition_type = models.IntegerField(choices=VIDEO_TYPES, blank=False, default=0)
    is_special_video_audition = models.BooleanField(blank=False, default=False)
    is_required_all = models.BooleanField(blank=False, default=False)
    is_required = models.BooleanField(blank=False, default=False)
    is_video_interview_button = models.BooleanField(blank=False, default=False)
    video_audition_view_content_type = models.CharField(
        choices=VIDEO_VIEW_CONTENT_TYPES,
        blank=True,
        default='Nothing Content',
        max_length=50
    )
    
    def __str__(self):
        return self.skill.name + ' -> ' + self.name

    class Meta:
        db_table = "sub_skill"
        ordering = ('skill', 'priority', 'name')
        managed = True
        unique_together = ('name', 'id')
