from django.db import models

class PositionTypeManager(models.Manager):
    def get_queryset(self):
        return super(PositionTypeManager, self).get_queryset().filter(active=True)

class PositionType(models.Model):
    name = models.CharField(blank=False, max_length=50)
    multi_selection = models.BooleanField(default=False)
    question = models.TextField(max_length=300, blank=True)

    def __str__(self):
        return self.name

    class Meta:
        db_table = "position_type"
        ordering = ('name',)
        managed = True
        unique_together = ('name', 'id')
