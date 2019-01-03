from django.conf.urls import url
from talent_rating import views


urlpatterns = [
    url(r'^all', views.TalentRatingList.as_view()),
    url(r'^create', views.TalentRatingCreate.as_view()),
    url(r'^(?P<pk>[0-9]+)/', views.TalentRatingDetail.as_view()),
]
