from django.conf.urls import url
from rest_framework.urlpatterns import format_suffix_patterns
from skill import views

urlpatterns = [
  url(r'^/all', views.SkillList.as_view()),
  url(r'^/(?P<pk>[0-9]+)/$', views.SkillDetail.as_view()),
]
