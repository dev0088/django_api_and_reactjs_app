from django.conf.urls import url
from rest_framework.urlpatterns import format_suffix_patterns
from talent_position_type import views

urlpatterns = [
  url(r'^/all', views.TalentPositionTypeList.as_view()),
    url(r'^/(?P<pk>[0-9]+)/$', views.TalentPositionTypeDetail.as_view()),
]
