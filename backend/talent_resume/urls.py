from django.views.generic.base import TemplateView
from .views import TalentResumeFileUploadCompleteHandler, TalentResumeFileUploadPolicy, TalentResumeList, TalentResumeGeneratePrevew
from django.conf.urls import url
from rest_framework.urlpatterns import format_suffix_patterns

urlpatterns = [
  url(r'^/upload/(?P<pk>[0-9]+)/complete/$', TalentResumeFileUploadCompleteHandler.as_view(), name='upload-complete'),
  url(r'^/upload/(?P<pk>[0-9]+)/policy/$', TalentResumeFileUploadPolicy.as_view()),
  url(r'^/upload/(?P<pk>[0-9]+)/resume/$', TalentResumeList.as_view()),
  url(r'^/upload/(?P<pk>[0-9]+)/generate_preview/$', TalentResumeGeneratePrevew.as_view()),
]