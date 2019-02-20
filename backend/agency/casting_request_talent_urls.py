from django.urls import re_path
from agency import casting_request_talent_views

urlpatterns = [
  re_path(r'^search', casting_request_talent_views.CastingRequestTalentSearch.as_view()),
]
