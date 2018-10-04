from rest_framework import serializers
from skill.models import Skill
from position_type.serializers import PositionTypeNameSerializer

class SkillSerializer(serializers.ModelSerializer):
  sub_skills = serializers.SlugRelatedField(
                          many=True,
                          read_only=True,
                          slug_field='name'
                        )
  related_position_type = serializers.SlugRelatedField(
                                  many=False, 
                                  read_only=True,
                                  slug_field='name')

  class Meta:
    model = Skill
    fields = ('name', 'multi_selection', 'related_position_type', 'sub_skills')
