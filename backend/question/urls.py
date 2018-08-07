from django.conf.urls import url
from rest_framework.urlpatterns import format_suffix_patterns
from question import views

urlpatterns = [
	url(r'^/practice/random', views.QuestionPracticeRamdomList.as_view()),
	url(r'^/practice/static', views.QuestionPracticeStaticList.as_view()),
	url(r'^/random', views.QuestionRamdomList.as_view()),
]
