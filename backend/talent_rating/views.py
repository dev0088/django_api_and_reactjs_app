from talent_rating.models import TalentRating
from talent_rating.serializers import TalentRatingSerializer
from talent_rating.create_serializers import TalentRatingCreateSerializer
from talent_rating.detail_serializers import TalentRatingDetailSerializer
from casting_request.models import CastingRequest
from casting_request_talent.models import CastingRequestTalent
from django.http import Http404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from authentication.models import User
from client.models import Client
from drf_yasg.utils import swagger_auto_schema


class TalentRatingList(APIView):
    """
    List all talent ratings.
    """
    @swagger_auto_schema(responses={200: TalentRatingDetailSerializer(many=True)})
    def get(self, request, format=None):
        talent_rating = TalentRating.objects.all()
        serializer = TalentRatingSerializer(talent_rating, many=True)
        return Response(serializer.data)


class TalentRatingCompletedList(APIView):
    """
    List all talent ratings.
    """
    @swagger_auto_schema(responses={200: TalentRatingDetailSerializer(many=True)})
    def get(self, request, format=None):
        user = request.user
        client = Client.objects.filter(user_id=user.id).first
        if client:
            talent_rating = TalentRating.objects.all()

            completed_casting_request_ids = CastingRequest.objects\
                .filter(client=client, status='Completed')\
                .order_by('status_updated_date')\
                .values_list('id', falt=True)

            talent_ids = CastingRequestTalent.objects\
                .filter(casting_request_id__in=completed_casting_request_ids)\
                .values_list('talent', flat=True)

            completed_talent_ratings = TalentRating.objects.filter(talent_id__in=talent_ids)
            serializer = TalentRatingSerializer(completed_talent_ratings, many=True)

        serializer = TalentRatingSerializer(completed_talent_ratings, many=True)
        return Response(serializer.data)

class TalentRatingDetail(APIView):
    """
    Retrieve a talent rating instance.
    """
    def get_object(self, pk):
        try:
            return TalentRating.objects.get(pk=pk)
        except TalentRating.DoesNotExist:
            raise Http404

    def get_user(self, request):
        try:
            return User.objects.get(pk=request.user.pk)
        except User.DoesNotExist:
            raise Http404

    @swagger_auto_schema(responses={200: TalentRatingDetailSerializer(many=False)})
    def get(self, request, pk, format=None):
        talent_rating = self.get_object(pk)
        serializer = TalentRatingDetailSerializer(talent_rating)
        return Response(serializer.data)

    @swagger_auto_schema(
        request_body=TalentRatingCreateSerializer(many=False),
        responses={200: TalentRatingSerializer(many=False)}
    )
    def put(self, request, pk, format=None):
        talent_rating = self.get_object(pk)
        serializer = TalentRatingSerializer(talent_rating, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response({'error': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

    @swagger_auto_schema(responses={200: 'OK'})
    def delete(self, request, pk, format=None):
        talent_rating = self.get_object(pk)
        talent_rating.delete()
        return Response({'id': int(pk)}, status=status.HTTP_200_OK)


class TalentRatingCreate(APIView):
    @swagger_auto_schema(
        request_body=TalentRatingCreateSerializer(many=False),
        responses={200: TalentRatingCreateSerializer(many=False)}
    )
    def post(self, request, format=None):
        user = request.user
        client = Client.objects.get(user_id=user.id)
        # Check exist.
        talent_id = request.data['talent']
        talent_rating = TalentRating.objects.filter(client_id=client, talent_id=talent_id).first();
        if talent_rating:
            return Response(
                        {'error': {"talent": ["this talent already exists."]}},
                        status=status.HTTP_400_BAD_REQUEST
                    )

        serializer = TalentRatingCreateSerializer(data=request.data, many=False)
        if serializer.is_valid():
            new_talent_rating = TalentRating(client_id=client.id, **serializer.validated_data)
            new_talent_rating.save()
            new_serializer = TalentRatingCreateSerializer(new_talent_rating, many=False)
            return Response(new_serializer.data, status=status.HTTP_201_CREATED)

        return Response({'error': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
