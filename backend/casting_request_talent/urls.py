from django.conf.urls import url
from casting_request_talent import views

urlpatterns = [
  url(r'^all', views.CastingRequestTalentList.as_view()),
  url(r'^completed_all', views.CastingRequestTalentCompletedList.as_view()),
  url(r'^create', views.CastingRequestTalentBulkCreate.as_view()),
  url(r'^(?P<pk>[0-9]+)/', views.CastingRequestTalentDetail.as_view()),
]
