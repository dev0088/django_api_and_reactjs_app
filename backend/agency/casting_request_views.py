from authentication.models import User
from casting_request.models import CastingRequest
from casting_request.serializers import CastingRequestSerializer, CastingRequestCreateSerializer
from casting_request.detail_serializers import  CastingRequestDetailSerializer
from casting_request_talent.models import CastingRequestTalent
from agency.casting_request_serializers import CastingRequestSearchSerializer, CastingRequestSetStatusSerializer
from user_note.models import UserNoteManager
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
    Retrieve all casting requests matching to search conditioin.
    """
    @swagger_auto_schema(request_body=CastingRequestSearchSerializer, responses={200: CastingRequestDetailSerializer(many=True)})
    def post(self, request, format=None):
        user = User.objects.get(pk=request.user.pk)
        if 'status' in request.data:
            casting_requests = CastingRequest.objects.filter(status__in=request.data['status'])
        else :
            casting_requests = CastingRequest.objects.all()

        serializer = CastingRequestDetailSerializer(casting_requests, many=True)
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

            agency = request.user
            client_user = casting_request.client.user
            UserNoteManager.casting_request_logger(
                agency, agency, client_user, 
                'updated casting reqeust.',
                casting_request
            )

            return Response(serializer.data)
        return Response({'error': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

    @swagger_auto_schema(responses={200: 'OK'})
    def delete(self, request, pk, format=None):
        casting_request = self.get_object(pk)

        agency = request.user
        client_user = casting_request.client.user
        UserNoteManager.casting_request_logger(
            agency, agency, client_user, 
            'deteled casting reqeust.',
            casting_request
        )

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

        serializer = CastingRequestSetStatusSerializer(casting_request, data=request.data)
        if serializer.is_valid():
            casting_request.status = request.data['status']
            casting_request.status_updated_date = request.data['status_updated_date']
            casting_request.save()

            agency_user = request.user
            if agency_user:
                client_user = casting_request.client.user
                status = casting_request.status
                if status == 'Requested':
                    note = '{client_user} requested.'.format(client_user=client_user.first_name)
                elif status == 'Reviewing':
                    note = 'Reviewing'
                elif status == 'In Progress':
                    note = 'Contracted to confirm request.'
                elif status == 'Accepted.':
                    note = 'Accepted'
                elif status == 'Declined.':
                    note = 'Declined'
                elif status == 'Canceled.':
                    note = '{client_user} canceled.'.format(client_user=client_user)
                elif status == 'Completed':
                    note = 'Completed.'

                UserNoteManager.casting_request_logger(agency_user.first_name, client_user, client_user, note, casting_request)

                casting_request_talents = CastingRequestTalent.objects.filter(casting_request=casting_request)
                if len(casting_request_talents) > 0:
                    for casting_request_talent in casting_request_talents:
                        talent_user = casting_request_talent.talent.user
                        UserNoteManager.casting_request_talent_logger(agency_user.first_name, client_user, talent_user, note, casting_request_talent)
                    
            new_serializer = CastingRequestDetailSerializer(casting_request)
            return Response(new_serializer.data)
            # serializer.save()
            # return Response(serializer.data)
        return Response({'error': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)