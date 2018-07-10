from django.conf.urls import url
from rest_framework_jwt.views import obtain_jwt_token
from rest_framework_jwt.views import obtain_jwt_token
from rest_framework_jwt.views import refresh_jwt_token
from rest_framework_jwt.views import verify_jwt_token

from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny

from .serializers import RegistrationSerializer
from .models import User
from .views import RegistrationAPIView
#
# class AuthRegister(APIView):
#     """
#     Register a new user.
#     """
#     serializer_class = AccountSerializer
#     permission_classes = (AllowAny,)
#
#     def post(self, request, format=None):
#         serializer = self.serializer_class(data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data, status=status.HTTP_201_CREATED)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

urlpatterns = [
    url(r'^login/', obtain_jwt_token),
	url(r'^token-refresh/', refresh_jwt_token),
    url(r'^token-verify/', verify_jwt_token),
    # url(r'^register/$', AuthRegister.as_view()),
	url(r'^register/?$', RegistrationAPIView.as_view()),
]
