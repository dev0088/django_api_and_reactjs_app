from django.conf.urls import url
from rest_framework.urlpatterns import format_suffix_patterns
from talent_position_sub_type import views

urlpatterns = [
  url(r'^/all', views.TalentPositionSubTypeList.as_view()),
    url(r'^/(?P<pk>[0-9]+)/$', views.TalentPositionSubTypeDetail.as_view()),
]
