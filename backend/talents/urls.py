from django.conf.urls import url
from rest_framework.urlpatterns import format_suffix_patterns
from talent import views

urlpatterns = [
    # url(r'^/create', views.ShipTalentInfoList.as_view()),
	# url(r'^/all', views.ShipTalentInfoList.as_view()),
    url(r'^/(?P<pk>[0-9]+)/$', views.TalentDetail.as_view()),
	# url(r'^/(?P<pk>[0-9]+)/put', views.TalentDetail.as_view()),
	# url(r'^/(?P<pk>[0-9]+)/delete', views.TalentDetail.as_view()),

	# url(r'^/$', views.ShipTalentInfoList.as_view()),
    # url(r'^/(?P<pk>[0-9]+)/$', views.ShipTalentInfoDetail.as_view()),
]
