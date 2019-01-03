from django.conf.urls import url
from rest_framework.urlpatterns import format_suffix_patterns
from talent_sub_skill import views

urlpatterns = [
  url(r'^all', views.TalentSubSkillList.as_view()),
  url(r'^(?P<pk>[0-9]+)/', views.TalentSubSkillDetail.as_view()),
]
