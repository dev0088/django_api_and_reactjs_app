from django.db import models
from sub_skill.models import SubSkill
from position_sub_type.models import PositionSubType
from wizard_question.models import WizardQuestion

class WizardQuestionAnswerManager(models.Manager):
    def get_queryset(self):
        return super(WizardQuestionAnswerManager, self).get_queryset().filter(active=True)


class WizardQuestionAnswer(models.Model):
    priority = models.IntegerField(blank=True, default=100)
    wizard_question = models.ForeignKey(
        WizardQuestion, related_name='wizard_question_answers',
        on_delete=models.CASCADE
    )
    sub_skill = models.ForeignKey(
        SubSkill, related_name='sub_skill_wizard_question_answers',
        on_delete=models.CASCADE,
        blank=True, null=True
    )
    position_sub_type = models.ForeignKey(
        PositionSubType, related_name='position_sub_type_wizard_question_answers',
        on_delete=models.CASCADE,
        blank=True, null=True
    )
    is_sub_skill = models.BooleanField(default=False)
    is_skippable = models.BooleanField(default=False)

    def __str__(self):
        name = ''
        if self.is_sub_skill:
            name = self.sub_skill.wizard_button_title if self.sub_skill else ''
        else:
            name = self.position_sub_type.wizard_button_title if self.position_sub_type else ''

        return name

    class Meta:
        db_table = "wizard_question_answer"
        ordering = ('wizard_question', 'priority', )
        managed = True
        unique_together = ('id', )
