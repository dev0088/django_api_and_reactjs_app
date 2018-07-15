from django.db import models

# Create your models here.
from django.db import models
from datetime import datetime, timedelta
# from pygments.lexers import get_all_lexers
# from pygments.styles import get_all_styles
#
# LEXERS = [item for item in get_all_lexers() if item[1]]
# LANGUAGE_CHOICES = sorted([(item[1][0], item[0]) for item in LEXERS])
# STYLE_CHOICES = sorted((item, item) for item in get_all_styles())

DEFAULT_BACKGROUND_IMAGE='../images/backgrounds/background_side.png'

DEFAULT_WHAT = """<p>ShiptTalent.com is a community of Talent with one common goal: to work on a cruise ship.</p>
<p>With ShiptTalent.com, singers, dancers, aerialist, musicians, technicians, activity staff and youth staff can audition and interview with <b>every</b> cruise line <b>at the same time</b> in one easy setp. No need to go to endless auditions. ...</p>"""

DEFAULT_HOW = """<p>It's easy. In order to audition and interview with <b>every</b> cruise line at the same time, all you have to do is create your own unique profile. </p>
<p>What's in your profile? Unlinke other employment sites, your profile isn't simply a place to post your basic headshot, resume and demo reel. Sure, your profile includes these basics, ...</p>"""

DEFAULT_WHY = """<p>The bigger question is why would you not?</p>
<p>Are you frustrated with going to audition after audition? Tired of sending application after application only to wonder if you're even being considered? Don't know how to stand out from the rest of the crowd and get your big your big break into the exciting world of cruise ship entertainment? ...</p>"""
DEFAULT_DIFFERENT = """<p>Unlinke other employment sites, your profile isn't simply a place to post your headshot, resume and demo reel.</p>
<p>There is so much more about you that needs to be seen!</p>"""
DEFAULT_HOW_TO_USE = ''
DEFAULT_TERMS_FOR_TALENT = ''
DEFAULT_TERMS_FOR_CLIENT = ''
DEFAULT_FAQ = ''
DEFAULT_CONTACT_US = ''
DEFAULT_SLOGAN = 'Welcome, ShipTalent.com!'
DEFAULT_SLOGAN_DESCRIPTION = 'We are building a greate web application for talent and client.'
#
class ShipTalentInfoManager(models.Manager):
  def get_queryset(self):
    return super(ShipTalentInfoManager, self).get_queryset().filter(active=True)

class ShipTalentInfo(models.Model):
  name = models.CharField(max_length=50, blank=False, default='')
  value = models.TextField(default='', blank=False)
  description = models.CharField(max_length=100, blank=True, default='')
  created = models.DateTimeField(auto_now_add=True)

  def __str__(self):
    """
    Returns a string representation of this `ShipTalentInfo`.
    This string is used when a `ShipTalentInfo` is printed in the console.
    """
    return self.name

  class Meta:
    db_table = "shiptalent_info"
    ordering = ('name',)
    managed = True
