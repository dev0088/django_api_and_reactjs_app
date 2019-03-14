from django.urls import re_path
from agency.sort_talent import views

urlpatterns = [
  re_path(r'^sort_talent', views.AgencySortTalent.as_view()),
]
