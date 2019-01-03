from django.conf.urls import url
from rest_framework.urlpatterns import format_suffix_patterns
from talent_visa import views

urlpatterns = [
  url(r'^(?P<pk>[0-9]+)/all', views.TalentVisaList.as_view()),
]
