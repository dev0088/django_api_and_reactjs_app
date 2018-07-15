from django.conf.urls import url
from rest_framework.urlpatterns import format_suffix_patterns
from shiptalent_info import views

urlpatterns = [
    # url(r'^/create', views.ShipTalentInfoList.as_view()),
	url(r'^/all', views.ShipTalentInfoList.as_view()),
    url(r'^/(?P<pk>[0-9]+)/get', views.ShipTalentInfoDetail.as_view()),
	# url(r'^/(?P<pk>[0-9]+)/put', views.ShipTalentInfoDetail.as_view()),
	# url(r'^/(?P<pk>[0-9]+)/delete', views.ShipTalentInfoDetail.as_view()),

	# url(r'^/$', views.ShipTalentInfoList.as_view()),
    # url(r'^/(?P<pk>[0-9]+)/$', views.ShipTalentInfoDetail.as_view()),
]
