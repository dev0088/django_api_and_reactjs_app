from django.conf.urls import url
from casting_request import views

urlpatterns = [
  url(r'^/all', views.CastingRequestList.as_view()),
  url(r'^/create', views.CastingRequestCreate.as_view()),
  url(r'^/(?P<pk>[0-9]+)/', views.CastingRequestDetail.as_view()),
]
