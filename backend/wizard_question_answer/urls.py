from django.conf.urls import url
from wizard_question_answer import views

urlpatterns = [
  url(r'^all', views.WizardQuestionAnswerList.as_view()),
  url(r'^(?P<pk>[0-9]+)/', views.WizardQuestionAnswerDetail.as_view()),
]
