from django.conf.urls import url
from rest_framework.urlpatterns import format_suffix_patterns
from position_type import views

urlpatterns = [
  url(r'^/all', views.PositionTypeList.as_view()),
  url(r'^/(?P<pk>[0-9]+)/$', views.PositionTypeDetail.as_view()),
]
