from django.shortcuts import render

# Create your views here.
from talent.models import Talent
from authentication.models import User
from talent.serializers import TalentSerializer
from django.http import Http404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from talent_position_sub_type.models import TalentPositionSubType
from talent_additional_position_sub_type.models import TalentAdditionalPositionSubType

class TalentDetail(APIView):
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

    def get(self, request, pk, format=None):
        talent_item = self.get_object(pk)
        serializer = TalentSerializer(talent_item)
        return Response(serializer.data)

    def put(self, request, pk, format=None):
        print('== request.data: ', request.data)
        talent_item = self.get_object(pk)
        talent_data = request.data
        user_data = {}
        if "user" in talent_data:
            user_data = talent_data['user']
            talent_data.pop('user', None)
            
        print('=== talent_data: ', talent_data)
        print('=== user_data: ', user_data)
        serializer = TalentSerializer(talent_item, data=talent_data)
        if serializer.is_valid():
            serializer.save()
            if "talent_position_sub_type" in request.data:

                print('== request.data.talent_position_sub_type.name: ', request.data['talent_position_sub_type']['name'])
                print('== request.data.talent_additional_position_sub_types', request.data['talent_additional_position_sub_types'])

                # Save primary position sub type
                position_sub_type = TalentPositionSubType.objects.get(name=request.data['talent_position_sub_type']['name'])
                if position_sub_type:
                    talent_item.talent_position_sub_type = position_sub_type
                    talent_item.save()

                # Delete all secondary position sub types of talent
                TalentAdditionalPositionSubType.objects.filter(
                    talent = talent_item
                ).delete()

                # Save secondary position sub type
                talent_additional_position_sub_types = request.data['talent_additional_position_sub_types']
                for additional_position_sub_type in talent_additional_position_sub_types:
                    position_sub_type_item = TalentPositionSubType.objects.get(
                            name=additional_position_sub_type['name']
                        )
                    new_additional_position_sub_type_item = TalentAdditionalPositionSubType.objects.create(
                            talent_position_sub_type = position_sub_type_item,
                            talent = talent_item
                        )
                    new_additional_position_sub_type_item.save()

            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        talent_item = self.get_object(pk)
        talent_item.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
