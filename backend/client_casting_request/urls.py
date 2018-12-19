from django.conf.urls import url
from rest_framework.urlpatterns import format_suffix_patterns
from client_casting_request import views

urlpatterns = [
  url(r'^/all', views.ClientCastingRequestList.as_view()),
  url(r'^/create', views.ClientCastingRequestCreate.as_view()),
  url(r'^/(?P<pk>[0-9]+)/', views.ClientCastingRequestDetail.as_view()),
]
