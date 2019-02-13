from django.db import models
from talent.models import Talent
from authentication.models import User

NOTE_TYPE_CHOICE = [
  ('Profile', 'Profile'),
  ('CastingRequest', 'CastingRequest'),
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
  created = models.DateTimeField(auto_now_add=True)

  def __str__(self):
    return '{created} ({creator}) - {note}'.format(
      created=self.created,
      creator=self.creator,
      note=self.note
    )

  class Meta:
    db_table = "user_note"
    ordering = ('-created', )
    managed = True


class UserNoteManager(models.Manager):

  @staticmethod
  def create_user_note(creator, actor, receiver, note_type, note):
    user_note = UserNote.objects.create(
      creator=(creator if creator else 'SYS'),
      actor=actor,
      receiver=receiver,
      note_type=note_type,
      note=(note if note else '')
    )
    user_note.save()

    return user_note

  @staticmethod
  def profile_logger(creator, actor, receiver, note):
    return UserNoteManager.create_user_note(creator, actor, receiver, 'Profile', note)

  @staticmethod
  def casting_request_logger(creator, actor, receiver, note):
    return UserNoteManager.create_user_note(creator, actor, receiver, 'CastingRequest', note)

  @staticmethod
  def search_logger(creator, actor, receiver, note):
    return UserNoteManager.create_user_note(creator, actor, receiver, 'Search', note)

  @staticmethod
  def view_logger(creator, actor, receiver, note):
    return UserNoteManager.create_user_note(creator, actor, receiver, 'View', note)

  @staticmethod
  def favorite_logger(creator, actor, receiver, note):
    return UserNoteManager.create_user_note(creator, actor, receiver, 'Favorite', note)

  @staticmethod
  def share_logger(creator, actor, receiver, note):
    return UserNoteManager.create_user_note(creator, actor, receiver, 'Share', note)
  
  @staticmethod
  def block_logger(creator, actor, receiver, note):
    return UserNoteManager.create_user_note(creator, actor, receiver, 'Block', note)

  @staticmethod
  def medical_condition_logger(creator, actor, receiver, note):
    return UserNoteManager.create_user_note(creator, actor, receiver, 'MedicalCondition', note)

  @staticmethod
  def medical_logger(creator, actor, receiver, note):
    return UserNoteManager.create_user_note(creator, actor, receiver, 'Medical', note)

  @staticmethod
  def login_logger(creator, actor, receiver, note):
    return UserNoteManager.create_user_note(creator, actor, receiver, 'Login', note)

  @staticmethod
  def logout_logger(creator, actor, receiver, note):
    return UserNoteManager.create_user_note(creator, actor, receiver, 'Logout', note)

  @staticmethod
  def tid_logger(creator, actor, receiver, note):
    return UserNoteManager.create_user_note(creator, actor, receiver, 'TID', note)

  @staticmethod
  def change_password_logger(creator, actor, receiver, note):
    return UserNoteManager.create_user_note(creator, actor, receiver, 'ChangePassword', note)

  @staticmethod
  def rating_logger(creator, actor, receiver, note):
    return UserNoteManager.create_user_note(creator, actor, receiver, 'Rating', note)

  @staticmethod
  def personal_info_logger(creator, actor, receiver, note):
    return UserNoteManager.create_user_note(creator, actor, receiver, 'PersonalInfo', note)

  @staticmethod
  def immigration_logger(creator, actor, receiver, note):
    return UserNoteManager.create_user_note(creator, actor, receiver, 'Immigration', note)

  @staticmethod
  def langguage_logger(creator, actor, receiver, note):
    return UserNoteManager.create_user_note(creator, actor, receiver, 'Language', note)
