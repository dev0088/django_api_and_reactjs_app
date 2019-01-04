from django.conf.urls import url
from shared_profile import views

urlpatterns = [
    url(r'^all', views.SharedProfileList.as_view()),
    url(r'^shared_talent/all', views.SharedProfileSharedTalent.as_view()),
    url(r'^talent_shared_with/all', views.SharedProfileTalentSharedWithClient.as_view()),
    url(r'^shared_talent_by_team_member/all', views.SharedProfileSharedTalentByTeamMemberSerializer.as_view()),
    url(r'^bulk', views.SharedProfileBulkCreate.as_view()),
    url(r'^(?P<pk>[0-9]+)/', views.SharedProfileDetail.as_view()),
]
