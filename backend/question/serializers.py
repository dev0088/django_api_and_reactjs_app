from rest_framework import serializers
from question.models import Question

class QuestionSerializer(serializers.ModelSerializer):

  class Meta:
    model = Question
    fields = (
      'id',
      'position_type',
      'position_sub_type',
      'content'
    )
