import coreapi
import coreschema
from rest_framework.schemas import AutoSchema
from rest_framework.response import Response
from rest_framework import status
from django.http import Http404
from rest_framework.views import APIView
from client.serializers import *
from talent.models import Talent
from talent.serializers import TalentSerializer
from casting_request.models import CastingRequest
from casting_request_talent.models import CastingRequestTalent
from talent_position_type.models import TalentPositionType
from talent_position_sub_type.models import TalentPositionSubType
from talent_skill.models import TalentSkill
from talent_sub_skill.models import TalentSubSkill
from talent_availability.models import TalentAvailability
from talent_language.models import TalentLanguage
from talent_rating.models import TalentRating
from user_note.models import UserNoteManager
from rest_framework import generics
from drf_yasg.utils import swagger_auto_schema
from django.db.models import Q
from psycopg2.extras import NumericRange
from dateutil.parser import parse
from operator import or_, and_
from functools import reduce


class ClientViewSet(generics.ListCreateAPIView):
    model = Client
    queryset = Client.objects.all()
    serializer_class = ClientSerializer
    # permission_classes = (IsAuthenticated,)


class CurrentClient(APIView):
    """
    Get current client info
    """
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
        client = Client.objects.get(user=user.id)
        return client
      except Client.DoesNotExist:
        raise Http404

    @swagger_auto_schema(responses={200: ClientAllInfoSerializer(many=False)})
    def get(self, request, format=None):
        client_item = self.get_object(request.user)
        serializer = ClientAllInfoSerializer(client_item)
        return Response(serializer.data)


class ClientDetail(APIView):
    # authentication_classes = (SessionAuthentication, JSONWebTokenAuthentication)
    # permission_classes = (permissions.IsAuthenticated,)

    def get_object(self, pk):
        try:
            user = User.objects.get(pk=pk)
            client = Client.objects.get(user=user.id)
            return client
        except Client.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        client_item = self.get_object(pk)
        serializer = ClientSerializer(client_item)
        return Response(serializer.data)

    def put(self, request, pk, format=None):
        client_item = self.get_object(pk)
        client_data = request.data
        serializer = ClientSerializer(client_item, data=client_data)
        if serializer.is_valid():
            serializer.save()

            return Response(serializer.data)
        return Response({'error': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        client_item = self.get_object(pk)
        client_item.delete()
        return Response({'id': int(pk)}, status=status.HTTP_204_NO_CONTENT)


class ClientFindTalentList(APIView):
    @swagger_auto_schema(request_body=TalentSearchConditionSerializer, responses={200: TalentSerializer(many=True)})
    def post(self, request, format=None):
        """
        Get talents matching to search condition
        """
        # Filter talents according to search condition
        search_conditions = request.data
        hasAnyConditions = len(search_conditions.values()) > 0
        talent_name = self.pickout_data(search_conditions, 'talent_name')
        talent_tid = self.pickout_data(search_conditions, 'talent_tid')
        casting_request_id = self.pickout_data(search_conditions, 'casting_request_id')
        talent_name_or_tid = self.pickout_data(search_conditions, 'talent_name_or_tid')
        ages = self.pickout_data(search_conditions, 'ages')
        availability = self.pickout_data(search_conditions, 'availability')
        heights = self.pickout_data(search_conditions, 'heights')
        languages = self.pickout_data(search_conditions, 'languages')
        position_ids = self.pickout_data(search_conditions, 'position_ids')
        position_sub_type_ids = self.pickout_data(search_conditions, 'position_sub_type_ids')
        ratings = self.pickout_data(search_conditions, 'ratings')
        sexes = self.pickout_data(search_conditions, 'sexes')
        skill_ids = self.pickout_data(search_conditions, 'skill_ids')
        sub_skill_ids = self.pickout_data(search_conditions, 'sub_skill_ids')
        approved = self.pickout_data(search_conditions, 'approved')

        talents = Talent.objects.all()

        # Check talent_tid
        if talent_tid:
            try:
                talents = talents.filter(tid__icontains=talent_tid)
            except Talent.DoesNotExist:
                raise Http404

        # Check talent_name
        if talent_name:
            talents = talents.filter(
                Q(user__first_name__icontains=talent_name) |
                Q(user__last_name__icontains=talent_name)
            )

        # Check casting_request_id
        if casting_request_id:
            casting_request = CastingRequest.objects.get(pk=casting_request_id)
            # casting_request_talent_ids
            talent_ids = CastingRequestTalent.objects\
                .filter(casting_request_id=casting_request.id)\
                .values_list('talent', flat=True)\
                .order_by('talent')\
                .distinct()
            talents = talents.filter(~Q(id__in=talent_ids))

        # Check talent_name_or_tid
        if talent_name_or_tid:
            talents = talents.filter(
                Q(user__first_name__icontains=talent_name_or_tid) |
                Q(user__last_name__icontains=talent_name_or_tid) |
                Q(tid__icontains=talent_name_or_tid)
            )

        # Check sexes
        if sexes:
            talents = talents.filter(Q(sex__in=sexes))

        # Check position_ids
        if position_ids:
            talent_position_talent_ids = TalentPositionType.objects.filter(
                    Q(position_type_id__in=position_ids)
                )\
                .values_list('talent', flat=True)\
                .order_by('talent')\
                .distinct()
            talents = talents.filter(Q(id__in=talent_position_talent_ids))

        # Check position_sub_type_ids
        if position_sub_type_ids:
            talent_position_sub_type_talent_ids = TalentPositionSubType.objects.filter(
                    Q(position_sub_type_id__in=position_sub_type_ids)
                )\
                .values_list('talent', flat=True)\
                .order_by('talent')\
                .distinct()
            talents = talents.filter(Q(id__in=talent_position_sub_type_talent_ids))

        # Check skill_ids
        if skill_ids:
            talent_skill_talent_ids = TalentSkill.objects.filter(
                    reduce(or_, (Q(skill_id=skill_id) for skill_id in skill_ids))
                )\
                .values_list('talent', flat=True)\
                .order_by('talent')\
                .distinct()
            talents = talents.filter(Q(id__in=talent_skill_talent_ids))

        # Check sub_skill_ids
        if sub_skill_ids:
            talent_sub_skill_talent_ids = TalentSubSkill.objects.filter(Q(sub_skill_id__in=sub_skill_ids))\
                .values_list('talent', flat=True)\
                .order_by('talent')\
                .distinct()
            talents = talents.filter(Q(id__in=talent_sub_skill_talent_ids))

        # Check availability
        if availability and (availability['start_date'] or availability['end_date']):
            queries = Q()
            if availability['end_date']:
                queries = Q(start_date__lte=parse(availability['end_date']))
            if availability['start_date']:
                queries &= Q(end_date__gte=parse(availability['start_date']))

            talent_availabilities_talent_ids = TalentAvailability.objects.filter(queries)\
                .values_list('talent', flat=True)\
                .order_by('talent')\
                .distinct()

            talents = talents.filter(Q(id__in=talent_availabilities_talent_ids))

        # Check ages
        if ages:
            talents = talents.filter(Q(age_range__in=ages))

        # Check heights
        if heights:
            queries = Q()
            for height_range in heights:
                start_height = height_range['start_height']
                end_height = height_range['end_height']
                if end_height == 0:
                    end_height = start_height + 1

                queries |= Q(height__contained_by=NumericRange(start_height, end_height))

            talents = talents.filter(queries)

        # Check languages
        if languages:
            talent_languages_talent_ids = TalentLanguage.objects.filter(language__in=languages)\
                .values_list('talent', flat=True)\
                .order_by('talent')\
                .distinct()
            talents = talents.filter(Q(id__in=talent_languages_talent_ids))

        # Check ratings
        if ratings:
            rated_talent_ids = []
            for talent in talents:
                talent_average_rating = TalentRating.objects.filter(talent=talent)\
                    .aggregate(Avg('rating'))['rating__avg']
                if talent_average_rating:
                    for rating_range in ratings:
                        if (talent_average_rating >= rating_range['start_rating']) and (talent_average_rating <= rating_range['end_rating']):
                            rated_talent_ids.append(talent.id)

            talents = talents.filter(Q(id__in=rated_talent_ids))

        # Check approved
        if approved is not None:
            talents = talents.filter(approved=approved)

        # Logging
        user = request.user
        if user and user.type != 'agency' and len(talents) > 0 and hasAnyConditions:
            for talent in talents:        
                UserNoteManager.search_logger(
                    None, user, talent.user, 
                    'TALENT APPEARED INSEARCH BY {finder}'.format(
                        finder=user
                    ),
                    user
                )

        serializer = TalentSerializer(talents, many=True)
        return Response(serializer.data)

    def pickout_data(self, data, child_name):
        res = None
        if child_name in data:
            res = data[child_name]
        return res

    # def make_and_query(selfs, itemName, objectType, items):
    #     queries = [Q(''.format(itemName)=item) for item in items]
    #     query = queries.pop()
    #     for item in queries:
    #         query &= item
    #
    #     # talent_skill_talent_ids = TalentSkill.objects.filter(Q(skill_id__all=skill_ids))\
    #     talent_skill_talent_ids = TalentSkill.objects.filter(query)\
    #             .values_list('talent', flat=True)\
    #             .order_by('talent')\
    #             .distinct()
