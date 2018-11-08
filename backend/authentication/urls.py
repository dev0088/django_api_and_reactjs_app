from django.conf.urls import include, url

from rest_framework_jwt.views import obtain_jwt_token
from rest_framework_jwt.views import obtain_jwt_token
from rest_framework_jwt.views import refresh_jwt_token
from rest_framework_jwt.views import verify_jwt_token

from rest_framework import status
from rest_framework.views import APIView
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from rest_framework.routers import DefaultRouter

from .serializers import RegistrationSerializer
from .models import User
from .views import RegistrationAPIView, RegisterViewSet

router = DefaultRouter()
router.register(r'^', RegisterViewSet)

register = RegisterViewSet.as_view({
    'post': 'create'
})

class CustomAuthToken(ObtainAuthToken):

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data,
                                           context={'request': request})
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        token, created = Token.objects.get_or_create(user=user)
        return Response({
            'token': token.key,
            'user_id': user.pk,
            'email': user.email
        })

urlpatterns = [
    url(r'^login/', obtain_jwt_token),
    url(r'^logout/', refresh_jwt_token),
    url(r'^token/refresh/', refresh_jwt_token),
    url(r'^token/verify/', verify_jwt_token),
    url(r'^register', register, name='register'),
    # url(r'^api-token-auth/', CustomAuthToken.as_view())
]
