from django.conf.urls import url
from rest_framework.urlpatterns import format_suffix_patterns
from admin_setting import views

urlpatterns = [
  url(r'^time', views.AdminVideoInterviewSettingList.as_view()),
]
