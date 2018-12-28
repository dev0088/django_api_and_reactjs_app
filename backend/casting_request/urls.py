from django.urls import re_path
from casting_request import views

urlpatterns = [
  re_path(r'^all', views.CastingRequestList.as_view()),
  re_path(r'^create', views.CastingRequestCreate.as_view()),
  re_path(r'^(?P<pk>[0-9]+)/', views.CastingRequestDetail.as_view()),
  re_path(r'^(?P<pk>[0-9]+)/submit', views.CastingRequestSubmit.as_view()),
]
