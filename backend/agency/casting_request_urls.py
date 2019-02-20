from django.urls import re_path
from agency import casting_request_views

urlpatterns = [
  re_path(r'^all', casting_request_views.CastingRequestList.as_view()),
  re_path(r'^search', casting_request_views.CastingRequestSearch.as_view()),
  re_path(r'^(?P<pk>[0-9]+)/', casting_request_views.CastingRequestDetail.as_view()),
  re_path(r'^set_status/(?P<pk>[0-9]+)/', casting_request_views.CastingRequestSetStatus.as_view()),
]
