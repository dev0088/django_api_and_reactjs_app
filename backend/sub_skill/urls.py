from django.conf.urls import url
from rest_framework.urlpatterns import format_suffix_patterns
from sub_skill import views

urlpatterns = [
  url(r'^/all', views.SubSkillList.as_view()),
  url(r'^/(?P<pk>[0-9]+)/$', views.SubSkillDetail.as_view()),
]
