from django.conf.urls import include, url

from rest_framework_jwt.views import refresh_jwt_token
from rest_framework_jwt.views import verify_jwt_token
from rest_framework.routers import DefaultRouter
from .serializers import RegistrationSerializer
from .models import User
from .views import RegistrationAPIView, RegisterViewSet, CustomAuthToken, Logout


router = DefaultRouter()
router.register(r'^', RegisterViewSet)

register = RegisterViewSet.as_view({
    'post': 'create'
})

urlpatterns = [
    url(r'^login/', CustomAuthToken.as_view()), #obtain_jwt_token
    url(r'^logout/', Logout.as_view()), #refresh_jwt_token
    url(r'^token/refresh/', refresh_jwt_token),
    url(r'^token/verify/', verify_jwt_token),
    url(r'^register', register, name='register')
]
