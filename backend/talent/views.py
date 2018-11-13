from django.shortcuts import render
from talent.models import Talent
from authentication.models import User
from talent.serializers import TalentSerializer
from django.http import Http404
# import coreapi
from rest_framework.compat import coreapi, coreschema
from rest_framework.views import APIView
from rest_framework.schemas import AutoSchema
from rest_framework.response import Response
from rest_framework import status
from position_type.models import PositionType
from position_sub_type.models import PositionSubType
from skill.models import Skill
from sub_skill.models import SubSkill
from talent_position_type.models import TalentPositionType
from talent_position_sub_type.models import TalentPositionSubType
from talent_visa.models import TalentVisa
from talent_skill.models import TalentSkill
from talent_sub_skill.models import TalentSubSkill

from rest_framework import viewsets, authentication, permissions
from rest_framework.permissions import IsAuthenticated


# Create your views here.
class TalentViewSet(viewsets.ModelViewSet):
    queryset = Talent.objects.all()
    serializer_class = TalentSerializer
    # permission_classes = (IsAuthenticated,)

class CurrentTalent(APIView):
    # authentication_classes = (authentication.TokenAuthentication, )
    # permission_classes = (permissions.IsAuthenticated,)
    schema = AutoSchema(manual_fields=[
        coreapi.Field(
            "Authorization",
            required=True,
            location="header",
            description="Use bearer token from login: ex: Bearer \{token\}",
            schema=coreschema.String()
        ),
    ])

    def get_object(self, user):
      try:
        user = User.objects.get(pk=user.pk)
        talent = Talent.objects.get(user=user.id)
        return talent
      except Talent.DoesNotExist:
        raise Http404
    """
    Get current talent info
    """
    def get(self, request, format=None):
        print('==== request.user: ', request.user)
        talent_item = self.get_object(request.user)
        serializer = TalentSerializer(talent_item)
        return Response(serializer.data)


class TalentDetail(APIView):
    # authentication_classes = (SessionAuthentication, JSONWebTokenAuthentication)
    # permission_classes = (permissions.IsAuthenticated,)

    
    """
    Retrieve, update or delete a talent.
    """
    def get_object(self, pk):
        try:
            user = User.objects.get(pk=pk)
            talent = Talent.objects.get(user=user.id)
            return talent
        except Talent.DoesNotExist:
            raise Http404

    def save_talent_position_type(self, talent, position_type_name):
        # delete all position types of talent
        TalentPositionType.objects.filter(talent=talent).delete()
        # delete all sub skills of talent
        TalentPositionSubType.objects.filter(talent=talent).delete()

        # save position type
        position_type = PositionType.objects.get(name=position_type_name)
        if position_type:
            new_talent_position_type = TalentPositionType.objects.create(
                    talent = talent,
                    position_type = position_type
                )
            new_talent_position_type.save()

    def save_talent_position_sub_type(self, talent, position_sub_type_name, position_type_name):
        # delete all position sub types of talent
        TalentPositionSubType.objects.filter(talent=talent).delete()
        # save position type
        position_type = PositionType.objects.get(name=position_type_name)
        position_sub_type = PositionSubType.objects.filter(name=position_sub_type_name, position_type=position_type).first()
        if position_sub_type:
            new_talent_position_sub_type = TalentPositionSubType.objects.create(
                    talent = talent,
                    position_sub_type = position_sub_type
                )
            new_talent_position_sub_type.save()

    def save_talent_skills(self, talent, talent_skills):
        # delete all skills of talent
        TalentSkill.objects.filter(talent=talent).delete()
        # save all talent skills
        for talent_skill in talent_skills:
            skill = Skill.objects.get(name=talent_skill['name'])
            new_talent_skill = TalentSkill.objects.create(
                    talent = talent,
                    skill = skill
                )
            new_talent_skill.save()

    def save_talent_sub_skills(self, talent, talent_sub_skills):
        print('====== save_talent_sub_skills: ', talent_sub_skills)
        # delete all sub skills of talent
        TalentSubSkill.objects.filter(talent=talent).delete()
        # save all talent sub skills
        for talent_sub_skill in talent_sub_skills:
            sub_skill = SubSkill.objects.get(name=talent_sub_skill['name'])
            new_talent_sub_skill = TalentSubSkill.objects.create(
                    talent = talent,
                    sub_skill = sub_skill
                )
            new_talent_sub_skill.save()

    def save_talent_visas(self, talent, talent_visas):
        # Delete all visas of talent
        TalentVisa.objects.filter(talent = talent).delete()
        # Save visas
        talent_visas = talent_visas
        for visa in talent_visas:
            new_visa = TalentVisa.objects.create(
                    talent = talent,
                    name = visa['name'],
                    expiration_date = visa['expiration_date']
                )
            new_visa.save()

    def pickout_data(self, data, child_name):
        res = {}
        if child_name in data:
            res = data[child_name]
            data.pop(child_name, None)
        return res

    def get(self, request, pk, format=None):
        talent_item = self.get_object(pk)
        serializer = TalentSerializer(talent_item)
        return Response(serializer.data)

    def put(self, request, pk, format=None):
        print('== request.data: ', request.data)
        talent_item = self.get_object(pk)
        talent_data = request.data

        # pick out user data
        user_data = self.pickout_data(talent_data, 'user')

        # pick out position sub type data
        talent_position_type_data = self.pickout_data(talent_data, 'talent_position_type')

        # pick out position sub type data
        talent_position_sub_type_data = self.pickout_data(talent_data, 'talent_position_sub_type')

        # pick out skills data
        talent_skills_data = self.pickout_data(talent_data, 'talent_skills')

        # pick out sub skills data
        talent_sub_skills_data = self.pickout_data(talent_data, 'talent_sub_skills')

        # pick out visa data
        talent_visas_data = self.pickout_data(talent_data, 'talent_visas')

        print('==== talent_data: ', talent_data)
        print('==== talent_skills_data: ', talent_skills_data)
        print('==== talent_sub_skills_data: ', talent_sub_skills_data)


        serializer = TalentSerializer(talent_item, data=talent_data)
        if serializer.is_valid():
            serializer.save()

            # Check and save position sub type
            if talent_position_type_data:
                self.save_talent_position_type(talent_item, talent_position_type_data)
                
                # Check and save position sub type
                if talent_position_sub_type_data:
                    self.save_talent_position_sub_type(talent_item, talent_position_sub_type_data, talent_position_type_data)

            # Check and save skills
            if talent_skills_data:
                self.save_talent_skills(talent_item, talent_skills_data)

            # Check and save skills
            if talent_sub_skills_data:
                self.save_talent_sub_skills(talent_item, talent_sub_skills_data)

            # Check and save visa types
            if talent_visas_data:
                self.save_talent_visas(talent_item, talent_visas_data)

            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        talent_item = self.get_object(pk)
        talent_item.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
