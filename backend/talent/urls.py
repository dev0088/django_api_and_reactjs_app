from django.conf.urls import include, url
from rest_framework.urlpatterns import format_suffix_patterns
from rest_framework.routers import DefaultRouter
from talent import views

router = DefaultRouter()
router.register(r'^', views.TalentViewSet)

urlpatterns = [
    url(r'currentTalentInfo/', views.CurrentTalent.as_view()),
    url(r'^(?P<pk>[0-9]+)/changePassword/', views.TalentChangePassword.as_view()),
    url(r'^(?P<pk>[0-9]+)/', views.TalentDetail.as_view()),

    # url(r'^', include(router.urls))
]
