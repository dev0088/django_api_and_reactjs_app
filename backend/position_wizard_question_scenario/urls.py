from django.conf.urls import url
from position_wizard_question_scenario import views

urlpatterns = [
  url(r'^/all', views.PositionWizardQuestionScenarioList.as_view()),
  url(r'^/(?P<pk>[0-9]+)/$', views.PositionWizardQuestionScenarioDetail.as_view()),
]
