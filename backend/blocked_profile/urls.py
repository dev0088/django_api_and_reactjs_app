from django.conf.urls import url
from blocked_profile import views

urlpatterns = [
  url(r'^all', views.BlockedProfileList.as_view()),
  url(r'^create', views.BlockedProfileCreate.as_view()),
  url(r'^(?P<pk>[0-9]+)/', views.BlockedProfileDetail.as_view()),
]
