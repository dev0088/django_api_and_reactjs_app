from authentication.models import User
from client.models import Client
from casting_request.models import CastingRequest
from casting_request_talent.models import CastingRequestTalent
from casting_request_talent.serializers import CastingRequestTalentSerializer, CastingRequestTalentCreateSerializer
from django.http import Http404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from drf_yasg.utils import swagger_auto_schema


class CastingRequestTalentList(APIView):
    """
    Retrieve all casting requests of client.
    """
    @swagger_auto_schema(responses={200: CastingRequestTalentSerializer(many=True)})
    def get(self, request, format=None):
        user = User.objects.get(pk=request.user.pk)
        client = Client.objects.get(user=user)
        casting_requests = CastingRequest.objects.filter(client_id=client.id)
        casting_request_talents = CastingRequestTalent.objects.filter(
                casting_request_id__in=casting_requests.values_list('id'))
        serializer = CastingRequestTalentSerializer(casting_request_talents, many=True)
        return Response(serializer.data)


class CastingRequestTalentDetail(APIView):
    """
    Retrieve, update or delete a casting request of client.
    """
    def get_object(self, pk):
        try:
            return CastingRequestTalent.objects.get(pk=pk)
        except CastingRequestTalent.DoesNotExist:
            raise Http404

    @swagger_auto_schema(responses={200: CastingRequestTalentSerializer(many=False)})
    def get(self, request, pk, format=None):
        casting_request = self.get_object(pk)
        serializer = CastingRequestTalentSerializer(casting_request)
        return Response(serializer.data)

    @swagger_auto_schema(responses={200: CastingRequestTalentSerializer(many=False)})
    def put(self, request, pk, format=None):
        casting_request = self.get_object(pk)
        serializer = CastingRequestTalentSerializer(casting_request, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response({'error': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

    @swagger_auto_schema(responses={200: 'OK'})
    def delete(self, request, pk, format=None):
        casting_request = self.get_object(pk)
        casting_request.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class CastingRequestTalentCreate(APIView):
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

    @swagger_auto_schema(request_body=CastingRequestTalentCreateSerializer,
                         responses={200: CastingRequestTalentCreateSerializer(many=False)})
    def post(self, request, format=None):
        client = self.get_object(request.user)

        serializer = CastingRequestTalentCreateSerializer(data=request.data)
        if serializer.is_valid():
            data = serializer.validated_data
            new_casting_request = CastingRequestTalent.objects.create(
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
