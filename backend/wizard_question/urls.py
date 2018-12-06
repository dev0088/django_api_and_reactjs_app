from django.conf.urls import url
from wizard_question import views

urlpatterns = [
  url(r'^/all', views.WizardQuestionList.as_view()),
  url(r'^/(?P<pk>[0-9]+)/$', views.WizardQuestionDetail.as_view()),
]
