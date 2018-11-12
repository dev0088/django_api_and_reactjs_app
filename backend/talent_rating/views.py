from django.shortcuts import render
from talent_rating.models import TalentRating
from talent_rating.serializers import TalentRatingSerializer
from django.http import Http404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

class TalentRatingList(APIView):
  """
  List all talent position sub types.
  """
  def get(self, request, format=None):
    talent_rating = TalentRating.objects.all()
    serializer = TalentRatingSerializer(talent_rating, many=True)
    return Response(serializer.data)

  def post(self, request, format=None):
    serializer = TalentRatingSerializer(data=request.data)
    if serializer.is_valid():
      serializer.save()
      return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class TalentRatingDetail(APIView):
  """
  Retrieve a talent_rating_item instance.
  """
  def get_object(self, pk):
    try:
      return TalentRating.objects.get(pk=pk)
    except TalentRating.DoesNotExist:
      raise Http404

  def get(self, request, pk, format=None):
    talent_rating_item = self.get_object(pk)
    serializer = TalentRatingSerializer(talent_rating_item)
    return Response(serializer.data)

  def put(self, request, pk, format=None):
    talent_rating_item = self.get_object(pk)
    serializer = TalentRatingSerializer(talent_rating_item, data=request.data)
    if serializer.is_valid():
      serializer.save()
      return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

  def delete(self, request, pk, format=None):
    talent_rating_item = self.get_object(pk)
    talent_rating_item.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)
