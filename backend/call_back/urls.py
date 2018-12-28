from django.conf.urls import url
from call_back import views

urlpatterns = [
  url(r'^all', views.CallBackList.as_view()),
  url(r'^create', views.CallBackCreate.as_view()),
  url(r'^(?P<pk>[0-9]+)/', views.CallBackDetail.as_view()),
]
