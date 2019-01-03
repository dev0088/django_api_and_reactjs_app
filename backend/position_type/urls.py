from django.urls import re_path
from position_type import views

urlpatterns = [
  re_path(r'^all', views.PositionTypeList.as_view()),
  re_path(r'^(?P<pk>[0-9]+)/', views.PositionTypeDetail.as_view()),
]
