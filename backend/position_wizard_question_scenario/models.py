from django.db import models
from sub_skill.models import SubSkill
from position_type.models import PositionType
from wizard_question.models import WizardQuestion


class PositionWizardQuestionScenarioManager(models.Manager):
    def get_queryset(self):
        return super(PositionWizardQuestionScenarioManager, self).get_queryset().filter(active=True)


class PositionWizardQuestionScenario(models.Model):
    position_type = models.ForeignKey(
        PositionType, related_name='position_type_wizard_question_scenarios',
        on_delete=models.CASCADE
    )
    priority = models.IntegerField(blank=True, default=100)
    wizard_question = models.ForeignKey(
        WizardQuestion, related_name='wizard_question_scenarios',
        on_delete=models.CASCADE
    )
    skippable_step = models.IntegerField(blank=True, default=0)

    def __str__(self):
        return "{position_type}: {priority}: {wizard_question}".format(
            position_type=self.position_type,
            priority=self.priority,
            wizard_question=self.wizard_question
        )

    class Meta:
        db_table = "position_wizard_question_scenario"
        ordering = ('position_type', 'priority', )
        managed = True
        unique_together = ('id', )
