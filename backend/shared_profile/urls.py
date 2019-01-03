from django.conf.urls import url
from shared_profile import views

urlpatterns = [
    url(r'^all', views.SharedProfileList.as_view()),
    url(r'^bulk', views.SharedProfileBulkCreate.as_view()),
    url(r'^(?P<pk>[0-9]+)/', views.SharedProfileDetail.as_view()),
]
