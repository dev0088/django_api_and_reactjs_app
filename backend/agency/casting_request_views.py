from authentication.models import User
from casting_request.models import CastingRequest
from casting_request.serializers import CastingRequestSerializer, CastingRequestCreateSerializer
from casting_request.detail_serializers import  CastingRequestDetailSerializer
from casting_request_talent.models import CastingRequestTalent
from casting_request_talent.details_by_talent_serializers import CastingRequestTalentDetailByTalentSerializer
from agency.casting_request_serializers import CastingRequestSearchSerializer, CastingRequestSetStatusSerializer
from django.http import Http404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from drf_yasg.utils import swagger_auto_schema


class CastingRequestList(APIView):
    """
    Retrieve all casting requests.
    """
    @swagger_auto_schema(responses={200: CastingRequestSerializer(many=True)})
    def get(self, request, format=None):
        user = User.objects.get(pk=request.user.pk)
        casting_requests = CastingRequest.objects.all()
        serializer = CastingRequestSerializer(casting_requests, many=True)
        return Response(serializer.data)

class CastingRequestSearch(APIView):
    """
    Retrieve all casting requests of talent.
    """
    @swagger_auto_schema(request_body=CastingRequestSearchSerializer, responses={200: CastingRequestTalentDetailByTalentSerializer(many=True)})
    def post(self, request, format=None):
        user = User.objects.get(pk=request.user.pk)
        casting_request_talents = CastingRequestTalent.objects.filter(talent=request.data['talent_id'])
        serializer = CastingRequestTalentDetailByTalentSerializer(casting_request_talents, many=True)
        return Response(serializer.data)

class CastingRequestDetail(APIView):
    """
    Retrieve, update or delete a casting request
    """
    def get_object(self, pk):
        try:
            return CastingRequest.objects.get(pk=pk)
        except CastingRequest.DoesNotExist:
            raise Http404

    @swagger_auto_schema(responses={200: CastingRequestDetailSerializer(many=False)})
    def get(self, request, pk, format=None):
        casting_request = self.get_object(pk)
        serializer = CastingRequestDetailSerializer(casting_request)
        return Response(serializer.data)

    @swagger_auto_schema(request_body=CastingRequestSerializer,
                         responses={200: CastingRequestSerializer(many=False)})
    def put(self, request, pk, format=None):
        casting_request = self.get_object(pk)
        serializer = CastingRequestSerializer(casting_request, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response({'error': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

    @swagger_auto_schema(responses={200: 'OK'})
    def delete(self, request, pk, format=None):
        casting_request = self.get_object(pk)
        casting_request.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class CastingRequestSetStatus(APIView):
    """
    Retrieve, update or delete a casting request
    """
    def get_object(self, pk):
        try:
            return CastingRequest.objects.get(pk=pk)
        except CastingRequest.DoesNotExist:
            raise Http404

    @swagger_auto_schema(request_body=CastingRequestSetStatusSerializer,
                         responses={200: CastingRequestDetailSerializer(many=False)})
    def put(self, request, pk, format=None):
        casting_request = self.get_object(pk)

        CastingRequestSerializer
        serializer = CastingRequestSetStatusSerializer(casting_request, data=request.data)
        if serializer.is_valid():
            casting_request.status = request.data['status']
            casting_request.status_updated_date = request.data['status_updated_date']
            casting_request.save()
            new_serializer = CastingRequestDetailSerializer(casting_request)
            return Response(new_serializer.data)
            # serializer.save()
            # return Response(serializer.data)
        return Response({'error': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)