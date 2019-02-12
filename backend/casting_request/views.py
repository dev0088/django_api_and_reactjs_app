from authentication.models import User
from client.models import Client
from casting_request.models import CastingRequest
from casting_request.serializers import CastingRequestSerializer, CastingRequestCreateSerializer
from casting_request.detail_serializers import  CastingRequestDetailSerializer
from django.http import Http404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from drf_yasg.utils import swagger_auto_schema


class CastingRequestList(APIView):
    """
    Retrieve all casting requests of client.
    """
    @swagger_auto_schema(responses={200: CastingRequestSerializer(many=True)})
    def get(self, request, format=None):
        user = User.objects.get(pk=request.user.pk)
        client = Client.objects.get(user=user)
        casting_request = CastingRequest.objects.filter(client=client)
        serializer = CastingRequestSerializer(casting_request, many=True)
        return Response(serializer.data)


class CastingRequestDetail(APIView):
    """
    Retrieve, update or delete a casting request of client.
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

    @swagger_auto_schema(request_body=CastingRequestCreateSerializer,
                         responses={200: CastingRequestCreateSerializer(many=False)})
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


class CastingRequestCreate(APIView):
    """
    Get current client info
    """
    # authentication_classes = (authentication.TokenAuthentication, )
    # permission_classes = (permissions.IsAuthenticated,)

    def get_object(self, user):
      try:
        user = User.objects.get(pk=user.pk)
        client = Client.objects.get(user=user.id)
        return client
      except Client.DoesNotExist:
        raise Http404

    @swagger_auto_schema(request_body=CastingRequestCreateSerializer,
                         responses={200: CastingRequestCreateSerializer(many=False)})
    def post(self, request, format=None):
        client = self.get_object(request.user)
        serializer = CastingRequestCreateSerializer(data=request.data)
        if serializer.is_valid():
            data = serializer.validated_data
            new_casting_request = CastingRequest.objects.create(
                client=client,
                name=data['name'],
                ship_name=data['ship_name'],
                employment_start_date=data['employment_start_date'],
                employment_end_date=data['employment_end_date'],
                talent_join_date=data['talent_join_date'],
                rehearsal_start_date=data['rehearsal_start_date'],
                rehearsal_end_date=data['rehearsal_end_date'],
                performance_start_date=data['performance_start_date'],
                performance_end_date=data['performance_end_date'],
                visa_requirements=data['visa_requirements'],
                comments=data['comments']
            )
            new_casting_request.save()

            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response({'error': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)


class CastingRequestSubmit(APIView):
    """
    Set submit status of a casting request from client.
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
