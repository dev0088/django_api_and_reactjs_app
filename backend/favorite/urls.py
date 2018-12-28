from django.conf.urls import url
from favorite import views

urlpatterns = [
  url(r'^all', views.FavoriteList.as_view()),
  url(r'^create', views.FavoriteCreate.as_view()),
  url(r'^(?P<pk>[0-9]+)/', views.FavoriteDetail.as_view()),
]
