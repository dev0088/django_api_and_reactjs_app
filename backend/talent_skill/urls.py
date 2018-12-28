from django.conf.urls import url
from rest_framework.urlpatterns import format_suffix_patterns
from talent_skill import views

urlpatterns = [
  url(r'^all', views.TalentSkillList.as_view()),
  url(r'^(?P<pk>[0-9]+)/', views.TalentSkillDetail.as_view()),
]
