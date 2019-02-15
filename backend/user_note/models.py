from django.db import models
from authentication.models import User
from datetime import datetime
from dateutil.tz import tzlocal
from pytz import timezone

NOTE_TYPE_CHOICE = [
  ('Profile', 'Profile'),
  ('CastingRequest', 'CastingRequest'),
  ('CastingRequestTalent', 'CastingRequestTalent'),
  ('Search', 'Search'),
  ('View', 'View'),
  ('Favorite', 'Favorite'),
  ('Share', 'Share'),
  ('Block', 'Block'),
  ('MedicalCondition', 'MedicalCondition'),
  ('Medical', 'Medical'),
  ('Login', 'Login'),
  ('Logout', 'Logout'),
  ('TID', 'TID'),
  ('ChangePassword', 'ChangePassword'),
  ('Rating', 'Rating'),
  ('PersonalInfo', 'PersonalInfo'),
  ('Immigration', 'Immigration'),
  ('Language', 'Language'),
]

class UserNote(models.Model):
  creator =  models.CharField(max_length=50, blank=False)
  actor = models.ForeignKey(User, related_name='user_actor_notes', on_delete=models.CASCADE)
  receiver = models.ForeignKey(User, related_name='user_receiver_notes', on_delete=models.CASCADE)
  note_type = models.CharField(choices=NOTE_TYPE_CHOICE, default='Profile', max_length=30)
  note = models.TextField(max_length=300, default='', blank=False)
  object_type = models.CharField(max_length=50, default='', blank=True)
  object_id = models.IntegerField(default=0, blank=True)
  created = models.DateTimeField(auto_now_add=True)
  updated = models.DateTimeField(auto_now=True)

  def __str__(self):
    return '{created} ({creator}) - {note}'.format(
      created=self.created,
      creator=self.creator,
      note=self.note
    )

  class Meta:
    db_table = "user_note"
    ordering = ('-updated',)
    managed = True


class UserNoteManager(models.Manager):

  @staticmethod
  def create_user_note(creator, actor, receiver, note_type, note, obj):
    user_note = UserNote.objects.create(
      creator=(creator if creator else 'SYS'),
      actor=(actor if actor else receiver),
      receiver=receiver,
      note_type=note_type,
      note=(note if note else ''),
      object_type=type(obj).__name__ if obj else '',
      object_id=obj.id if obj and (obj.id) else 0
    )
    user_note.save()

    return user_note

  @staticmethod
  def get_current_time():
    return datetime.utcnow().astimezone(timezone('GMT')).strftime("%m/%d/%Y %H:%M %Z")

  @staticmethod
  def generate_prefix(creator):
    return '{now} ({creator}): '.format(
      now=UserNoteManager.get_current_time(),
      creator=(creator if creator else 'SYS')
    )

  @staticmethod
  def profile_logger(creator, actor, receiver, note, obj=None):
    return UserNoteManager.create_user_note(
      creator, actor, receiver, 'Profile', 
      UserNoteManager.generate_prefix(creator) + note, 
      obj
    )

  @staticmethod
  def casting_request_logger(creator, actor, receiver, note, obj=None):
    return UserNoteManager.create_user_note(
      creator, actor, receiver, 'CastingRequest', 
      UserNoteManager.generate_prefix(creator) + note,
      obj
    )

  @staticmethod
  def casting_request_talent_logger(creator, actor, receiver, note, obj=None):
    return UserNoteManager.create_user_note(
      creator, actor, receiver, 'CastingRequestTalent', 
      UserNoteManager.generate_prefix(creator) + note,
      obj
    )

  @staticmethod
  def search_logger(creator, actor, receiver, note, obj=None):
    return UserNoteManager.create_user_note(
      creator, actor, receiver, 'Search', 
      UserNoteManager.generate_prefix(creator) + note, 
      obj
    )

  @staticmethod
  def view_logger(creator, actor, receiver, note, obj=None):
    return UserNoteManager.create_user_note(
      creator, actor, receiver, 'View', 
      UserNoteManager.generate_prefix(creator) + note, 
      obj
    )

  @staticmethod
  def favorite_logger(creator, actor, receiver, note, obj=None):
    return UserNoteManager.create_user_note(
      creator, actor, receiver, 'Favorite', 
      UserNoteManager.generate_prefix(creator) + note, 
      obj
    )

  @staticmethod
  def share_logger(creator, actor, receiver, note, obj=None):
    return UserNoteManager.create_user_note(
      creator, actor, receiver, 'Share', 
      UserNoteManager.generate_prefix(creator) + note, 
      obj
    )
  
  @staticmethod
  def block_logger(creator, actor, receiver, note, obj=None):
    return UserNoteManager.create_user_note(
      creator, actor, receiver, 'Block', 
      UserNoteManager.generate_prefix(creator) + note, 
      obj
    )

  @staticmethod
  def medical_condition_logger(creator, actor, receiver, note, obj=None):
    return UserNoteManager.create_user_note(
      creator, actor, receiver, 
      'MedicalCondition', 
      UserNoteManager.generate_prefix(creator) + note, 
      obj
    )

  @staticmethod
  def medical_logger(creator, actor, receiver, note, obj=None):
    return UserNoteManager.create_user_note(
      creator, actor, receiver, 
      'Medical', 
      UserNoteManager.generate_prefix(creator) + note, 
      obj
    )

  @staticmethod
  def login_logger(creator, actor, receiver, note, obj=None):
    return UserNoteManager.create_user_note(creator, actor, receiver, 'Login', note, obj)

  @staticmethod
  def logout_logger(creator, actor, receiver, note, obj=None):
    # Check last login record, remove it and update it.
    last_login_note = UserNote.objects.filter(receiver=receiver, note_type='Login').first()
    if last_login_note:
      last_login_note.note_type = 'Logout'
      diff = datetime.now(tzlocal()) - last_login_note.created
      diff_minutes = round((diff.days * 24 * 60) + (diff.seconds / 60), 2)
      last_login_note.note = '{login_time} - {now} {mins} mins'.format(
        login_time=last_login_note.created.astimezone(timezone('GMT')).strftime("%m/%d/%Y %H:%M %Z"),
        now=UserNoteManager.get_current_time(), 
        mins=diff_minutes
      )
      last_login_note.save()
      return last_login_note
    
    return UserNoteManager.create_user_note(creator, actor, receiver, 'Logout', note, obj)

  @staticmethod
  def tid_logger(creator, actor, receiver, note, obj=None):
    return UserNoteManager.create_user_note(creator, actor, receiver, 'TID', note, obj)

  @staticmethod
  def change_password_logger(creator, actor, receiver, note, obj=None):
    return UserNoteManager.create_user_note(creator, actor, receiver, 'ChangePassword', note, obj)

  @staticmethod
  def rating_logger(creator, actor, receiver, note, obj=None):
    return UserNoteManager.create_user_note(
      creator, actor, receiver, 
      'Rating', 
      UserNoteManager.generate_prefix(creator) + note, 
      obj
    )

  @staticmethod
  def personal_info_logger(creator, actor, receiver, note, obj=None):
    return UserNoteManager.create_user_note(
      creator, actor, receiver, 
      'PersonalInfo', 
      UserNoteManager.generate_prefix(creator) + note, 
      obj
    )

  @staticmethod
  def immigration_logger(creator, actor, receiver, note, obj=None):
    return UserNoteManager.create_user_note(
      creator, actor, receiver, 
      'Immigration', 
      UserNoteManager.generate_prefix(creator) + note, 
      obj
    )

  @staticmethod
  def langguage_logger(creator, actor, receiver, note, obj=None):
    return UserNoteManager.create_user_note(
      creator, actor, receiver, 'Language', 
      UserNoteManager.generate_prefix(creator) + note, 
      obj
    )
