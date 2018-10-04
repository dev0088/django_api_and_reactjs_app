from rest_framework import serializers
from talent_sub_skill.models import TalentSubSkill
from sub_skill.serializers import SubSkillSerializer

class TalentSubSkillSerializer(serializers.ModelSerializer):
  talent = serializers.SlugRelatedField(many=False, read_only=True, slug_field='id')
  sub_skill = serializers.SlugRelatedField(many=False, read_only=True, slug_field='name')

  class Meta:
    model = TalentSubSkill
    fields = ('id', 'talent', 'sub_skill')

class GeneralTalentSubSkillSerializer(serializers.ModelSerializer):
  talent = serializers.SlugRelatedField(many=False, read_only=True, slug_field='id')
  sub_skill = SubSkillSerializer(many=False)

  class Meta:
    model = TalentSubSkill
    fields = ('id', 'talent', 'sub_skill')
