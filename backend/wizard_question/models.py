from django.db import models


class WizardQuestionManager(models.Manager):
    def get_queryset(self):
        return super(WizardQuestionManager, self).get_queryset().filter(active=True)


class WizardQuestion(models.Model):
    name = models.CharField(blank=False, max_length=50)
    question = models.TextField(max_length=300, blank=True)
    multi_selection = models.BooleanField(default=False)
    selection_title = models.CharField(blank=False, max_length=150)

    def __str__(self):
        return "{name}: {question}".format(
            name=self.name,
            question=self.question
        )

    class Meta:
        db_table = "wizard_question"
        ordering = ('id', )
        managed = True
        unique_together = ('name', 'id')
