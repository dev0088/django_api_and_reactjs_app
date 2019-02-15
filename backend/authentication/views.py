from .models import User
from .serializers import RegistrationSerializer
from user_note.models import UserNoteManager
from talent.models import Talent
from django.shortcuts import render
from django.core.exceptions import ObjectDoesNotExist
from rest_framework import status
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.decorators import api_view
from rest_framework import viewsets
from rest_framework_jwt.settings import api_settings
from rest_framework.authtoken.models import Token
from rest_framework.permissions import AllowAny
from datetime import datetime
from pytz import timezone

jwt_payload_handler = api_settings.JWT_PAYLOAD_HANDLER
jwt_encode_handler = api_settings.JWT_ENCODE_HANDLER


class RegisterViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = RegistrationSerializer
    # permission_classes = (IsAuthenticated,)


class RegistrationAPIView(APIView):
    # Allow any user (authenticated or not) to hit this endpoint.
    permission_classes = (AllowAny,)
    serializer_class = RegistrationSerializer

    def get_serializer_class(self):
        return RegistrationSerializer
    
    def post(self, request):
        user = {
            'email': request.data.get('email'),
            'password': request.data.get('password'),
            'username': request.data.get('username'),
            'first_name': request.data.get('first_name'),
            'last_name': request.data.get('last_name'),
            'type': request.data.get('type')
        }
        # The create serializer, validate serializer, save serializer pattern
        # below is common and you will see it a lot throughout this course and
        # your own work later on. Get familiar with it.
        serializer = self.serializer_class(data=user)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        # return super(RegistrationAPIView, self).post(request, *args, **kwargs)

        return Response(serializer.data, status=status.HTTP_201_CREATED)


class CustomAuthToken(ObtainAuthToken):
    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(
            data=request.data,
            context={'request': request}
        )
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        payload = jwt_payload_handler(user)
        payload['type'] = user.type
        token = jwt_encode_handler(payload)
        UserNoteManager.login_logger(
            None, None, user, 
            '{now} logged in'.format(now=UserNoteManager.get_current_time()),
            user
        )
        return Response({'token': token})


class Logout(APIView):
    def post(self, request, *args, **kwargs):
        # simply delete the token to force a login
        user = request.user
        UserNoteManager.logout_logger(
            None, None, user, 
            '{now} logged out'.format(now=UserNoteManager.get_current_time()),
            user
        )
        try:
            user.auth_token.delete()
        except (AttributeError, ObjectDoesNotExist):
            pass
        
        return Response(status=status.HTTP_200_OK)