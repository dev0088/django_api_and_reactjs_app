# from django.conf.urls import url
# from rest_framework.urlpatterns import format_suffix_patterns
# from talent_position_type import views

# urlpatterns = [
#     url(r'^all', views.TalentPositionTypeList.as_view()),
#     url(r'^(?P<pk>[0-9]+)/', views.TalentPositionTypeDetail.as_view()),
# ]

from django.conf.urls import include, url
from rest_framework.urlpatterns import format_suffix_patterns
from rest_framework.routers import DefaultRouter
from talent_position_type import views

router = DefaultRouter()
router.register(r'^', views.TalentPositionTypeViewSet)

urlpatterns = [
    # url(r'^(?P<pk>[0-9]+)/', views.TalentDetail.as_view()),
    url(r'^', include(router.urls))
]
