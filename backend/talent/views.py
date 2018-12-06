from talent.models import Talent
from authentication.models import User
from talent.serializers import TalentSerializer
from talent.wizard_serializers import WizardTalentInfoSerializer
from django.http import Http404
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
from drf_yasg.utils import swagger_auto_schema


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

    def save_talent_position_sub_types(self, talent, position_sub_type_names, position_type_name):
        # delete all position sub types of talent
        TalentPositionSubType.objects.filter(talent=talent).delete()
        # save position type
        position_type = PositionType.objects.get(name=position_type_name)
        position_sub_types = PositionSubType.objects.filter(name__in=position_sub_type_names, position_type=position_type)
        if len(position_sub_types) > 0:
            for position_sub_type in position_sub_types:
                new_talent_position_sub_type = TalentPositionSubType.objects.create(
                    talent=talent,
                    position_sub_type=position_sub_type
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

    def add_talent_position_types(self, talent, talent_position_types):
        for talent_position_type in talent_position_types:
            position_type = talent_position_type.position_type
            position_sub_types = talent_position_type.position_sub_types

            if position_type:
                # check position type and skip if exist, else add it
                if 'id' in position_type:
                    pt = PositionType.objects.get(id=position_type.id)
                else:
                    pt = PositionType.objects.get(name=position_type.name)

                if pt:
                    res_talent_position_type = TalentPositionType.objects.get(talent=talent, position_type=pt)

                    if not res_talent_position_type:
                        # add this item
                        new_talent_position_type = TalentPositionType.object.create(
                            talent=talent, position_type=pt
                        )
                        new_talent_position_type.save()

                # add position sub types
                if position_sub_types:
                   self.add_talent_position_sub_types(talent, pt, position_sub_types)

    def add_talent_position_sub_types(self, talent, position_type, position_sub_types):
        for position_sub_type in position_sub_types:
            # check position sub types and skill if exist, else add it.
            if 'id' in position_sub_type:
                pst = PositionSubType.objects.get(id=position_sub_type.id)
            else:
                pst = PositionSubType.objects.get(position_type=position_type, name=position_sub_type.name)

            if pst:
                res_talent_position_sub_type = TalentPositionSubType.objects.get(
                    talent=talent, position_sub_type=pst
                )

                if not res_talent_position_sub_type:
                    # add this item
                    new_talent_position_sub_type = TalentPositionSubType.object.create(
                        talent=talent, position_sub_type=pst
                    )
                    new_talent_position_sub_type.save()

    def add_talent_skills(self, talent, talent_skills):
        for talent_skill in talent_skills:
            skill = talent_skill.skill
            sub_skills = talent_skill.sub_skills

            if skill:
                # check skill and skip if exist, else add it
                if 'id' in skill:
                    sk = Skill.objects.get(id=skill.id)
                else:
                    sk = Skill.objects.get(name=skill.name)

                if sk:
                    res_talent_skill = TalentSkill.objects.get(talent=talent, skill=sk)

                    if not res_talent_skill:
                        # add this item
                        new_talent_skill = TalentSkill.object.create(
                            talent=talent, skill=sk
                        )
                        new_talent_skill.save()

                # add position sub types
                if sub_skills:
                   self.add_talent_sub_skills(talent, sk, sub_skills)

    def add_talent_sub_skills(self, talent, skill, sub_skills):
        for sub_skill in sub_skills:
            # check position sub types and skill if exist, else add it.
            if 'id' in sub_skill:
                ssk = SubSkill.objects.get(id=sub_skill.id)
            else:
                ssk = SubSkill.objects.get(skill=skill, name=sub_skill.name)

            if ssk:
                res_talent_sub_skill = TalentSubSkill.objects.get(
                    talent=talent, sub_skill=ssk
                )

                if not res_talent_sub_skill:
                    # add this item
                    new_talent_sub_skill = TalentSubSkill.object.create(
                        talent=talent, sub_skill=ssk
                    )
                    new_talent_sub_skill.save()

    def pickout_data(self, data, child_name):
        res = {}
        if child_name in data:
            res = data[child_name]
            data.pop(child_name, None)
        return res

    @swagger_auto_schema(responses={200: TalentSerializer(many=False)})
    def get(self, request, pk, format=None):
        talent_item = self.get_object(pk)
        serializer = TalentSerializer(talent_item)
        return Response(serializer.data)

    @swagger_auto_schema(request_body=TalentSerializer, responses={200: TalentSerializer(many=False)})
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

        # pick out multiple position sub types data
        talent_position_sub_types_data = self.pickout_data(talent_data, 'talent_position_sub_types')

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
                    self.save_talent_position_sub_type(
                            talent_item,
                            talent_position_sub_type_data,
                            talent_position_type_data
                    )

                # Check and save multiple position sub types
                if talent_position_sub_types_data:
                    self.save_talent_position_sub_types(
                            talent_item,
                            talent_position_sub_types_data,
                            talent_position_type_data
                    )

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

    @swagger_auto_schema(request_body=WizardTalentInfoSerializer, responses={200: WizardTalentInfoSerializer(many=False)})
    def post(self, request, pk, format=None):
        print('== request.data: ', request.data)
        talent_item = self.get_object(pk)
        talent_data = request.data

        # pick out position types
        talent_position_types_data = self.pickout_data(talent_data, 'talent_position_types')

        # pick out skills
        talent_skills_data = self.pickout_data(talent_data, 'talent_skills')

        serializer = WizardTalentInfoSerializer(talent_item, data=talent_data)
        if serializer.is_valid():
            serializer.save()

            if talent_position_types_data:
                self.add_talent_position_types(talent_item, talent_position_types_data)

            if talent_skills_data:
                self.add_talent_skills(talent_item, talent_skills_data)

            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class TalentAddPositionSubType(APIView):


    def pickout_data(self, data, child_name):
        res = {}
        if child_name in data:
            res = data[child_name]
        return res
