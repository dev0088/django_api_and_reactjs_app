from django.conf.urls import url
from team_member import views

urlpatterns = [
    url(r'^all', views.TeamMemberList.as_view()),
    url(r'^create', views.TeamMemberCreate.as_view()),
    url(r'^bulk', views.TeamMemberBulkCreate.as_view()),
    url(r'^(?P<pk>[0-9]+)/', views.TeamMemberDetail.as_view()),
]
