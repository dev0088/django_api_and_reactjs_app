from django.shortcuts import render

# Create your views here.
from rest_framework import status
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.decorators import api_view
from rest_framework import viewsets
from .models import User
from .serializers import RegistrationSerializer
from talent.models import Talent


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