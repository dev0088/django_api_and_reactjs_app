from django.urls import re_path
from agency.overview import views

urlpatterns = [
  re_path(r'^overview', views.AgencyOverview.as_view()),
]
