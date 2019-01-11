from django.conf.urls import url
from client_request import views

urlpatterns = [
  url(r'^all', views.ClientRequestList.as_view()),
  url(r'^create', views.ClientRequestCreate.as_view()),
  url(r'^(?P<pk>[0-9]+)/', views.ClientRequestDetail.as_view()),
]
