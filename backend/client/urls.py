from django.conf.urls import url
from client import views

urlpatterns = [
    url(r'/currentClientInfo/', views.CurrentClient.as_view()),
    url(r'^/(?P<pk>[0-9]+)/$', views.ClientDetail.as_view()),
    url(r'^/talent_search/', views.ClientFindTalentList.as_view()),
    # url(r'^/request_view/', CastingRequest.as_view()),
]