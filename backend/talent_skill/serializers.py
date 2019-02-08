from rest_framework import serializers
from talent_skill.models import TalentSkill
from skill.serializers import SkillSerializer
from talent_sub_skill.models import TalentSubSkill
from talent_sub_skill.serializers import TalentSubSkillSerializer


class TalentSkillSerializer(serializers.ModelSerializer):
  talent = serializers.SlugRelatedField(many=False, read_only=True, slug_field='id')
  skill = serializers.SlugRelatedField(many=False, read_only=True, slug_field='name')
  skill_id = serializers.IntegerField(source='get_skill_id', read_only=True)

  class Meta:
    model = TalentSkill
    fields = ('id', 'talent', 'skill', 'skill_id')


class GeneralTalentSkillSerializerWithTalent(serializers.ModelSerializer):
  talent = serializers.SlugRelatedField(many=False, read_only=True, slug_field='id')
  skill = SkillSerializer(many=True)
  sub_skills = serializers.Field(source="skill.sub_skills")
  
  # sub_skills = serializers.SerializerMethodField('_get_sub_skills')

  def _get_sub_skills(self, obj):
    talent_id = self.context.get("talent_id")
    if talent_id:
      try:
        talent_sub_skills = TalentSubSkill.objects.filter(talent_id=talent_id)
        print("==== talent_sub_skills: ", talent_sub_skills)
      except:
        return None

      serializer = TalentSubSkillSerializer(talent_sub_skills)
      return serializer.data

      return user_id in obj.skill.sub_skills("user_id", flat=True)
    return False

  # talent = serializers.SlugRelatedField(many=False, read_only=True, slug_field='id')
  # position_sub_type = PositionSubTypeSerializer(many=False)
  class Meta:
    model = TalentSkill
    fields = ('id', 'talent', 'skill')