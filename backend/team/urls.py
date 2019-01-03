from django.conf.urls import url
from team import views

urlpatterns = [
  url(r'^all', views.TeamList.as_view()),
  url(r'^create', views.TeamCreate.as_view()),
  url(r'^(?P<pk>[0-9]+)/', views.TeamDetail.as_view()),
]
