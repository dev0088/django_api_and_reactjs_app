from django.conf.urls import url
from user_note import views

urlpatterns = [
  url(r'^all', views.UserNoteList.as_view()),
  url(r'^search', views.UserNoteSearch.as_view()),
  url(r'^create', views.UserNoteCreate.as_view()),
  url(r'^(?P<pk>[0-9]+)/', views.UserNoteDetail.as_view()),
]
