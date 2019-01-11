from django.conf.urls import url
from client_feedback import views

urlpatterns = [
  url(r'^all', views.ClientFeedbackList.as_view()),
  url(r'^create', views.ClientFeedbackCreate.as_view()),
  url(r'^(?P<pk>[0-9]+)/', views.ClientFeedbackDetail.as_view()),
]
