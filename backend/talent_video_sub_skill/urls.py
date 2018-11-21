from django.conf.urls import url
from .views import SubSkillVideoFileUploadCompleteHandler, SubSkillVideoFileUploadPolicy, \
  SubSkillVideos, SubSkillVideoDetail

urlpatterns = [
  url(r'^/upload/(?P<pk>[0-9]+)/complete/$', SubSkillVideoFileUploadCompleteHandler.as_view()),
  url(r'^/upload/(?P<pk>[0-9]+)/policy/$', SubSkillVideoFileUploadPolicy.as_view()),
  url(r'^/upload/(?P<pk>[0-9]+)/videos/$', SubSkillVideos.as_view()),
  url(r'^/(?P<pk>[0-9]+)/$', SubSkillVideoDetail.as_view())
]
