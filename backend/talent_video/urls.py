from django.conf.urls import url
from .views import InterviewFileUploadCompleteHandler, InterviewFileUploadPolicy, InterviewVideos

urlpatterns = [
  url(r'^/upload/(?P<pk>[0-9]+)/interview/complete/$', InterviewFileUploadCompleteHandler.as_view(), name='upload-complete'),
  url(r'^/upload/(?P<pk>[0-9]+)/interview/policy/$', InterviewFileUploadPolicy.as_view()),
  url(r'^/upload/(?P<pk>[0-9]+)/interview/videos/$', InterviewVideos.as_view()),
]
