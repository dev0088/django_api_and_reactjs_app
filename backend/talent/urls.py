from django.conf.urls import url
from rest_framework.urlpatterns import format_suffix_patterns
from talent import views

urlpatterns = [
    url(r'^/(?P<pk>[0-9]+)/$', views.TalentDetail.as_view()),
]
