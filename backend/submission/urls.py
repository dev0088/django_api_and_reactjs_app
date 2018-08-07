from django.conf.urls import url
from rest_framework.urlpatterns import format_suffix_patterns
from submission import views

urlpatterns = [
	  url(r'^/all', views.SubmissionList.as_view()),
	  url(r'^/create', views.CreateSubmission.as_view()),
	  url(r'^/(?P<pk>[0-9]+)/$', views.SubmissionDetail.as_view()),
	]
