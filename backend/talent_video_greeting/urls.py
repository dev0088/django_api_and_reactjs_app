from django.conf.urls import url
from .views import GreetingVideoFileUploadCompleteHandler, GreetingVideoFileUploadPolicy, GreetingVideos, GreetingVideoDetail

urlpatterns = [
  url(r'^upload/(?P<pk>[0-9]+)/complete/', GreetingVideoFileUploadCompleteHandler.as_view()),
  url(r'^upload/(?P<pk>[0-9]+)/policy/', GreetingVideoFileUploadPolicy.as_view()),
  url(r'^upload/(?P<pk>[0-9]+)/videos/', GreetingVideos.as_view()),
  url(r'^(?P<pk>[0-9]+)/', GreetingVideoDetail.as_view())
]
