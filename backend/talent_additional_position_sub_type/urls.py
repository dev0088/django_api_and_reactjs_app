from django.conf.urls import url
from rest_framework.urlpatterns import format_suffix_patterns
from talent_additional_position_sub_type import views

urlpatterns = [
	url(r'^/all', views.TalentAdditionalPositionSubTypeList.as_view()),
  # url(r'^/(?P<pk>[0-9]+)/$', views.TalentAdditionalPositionSubTypeDetail.as_view()),
]
