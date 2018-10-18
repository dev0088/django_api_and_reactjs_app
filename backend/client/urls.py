from django.urls import path
from django.conf.urls import url
from rest_framework_swagger.views import get_swagger_view
from client.views import *

# swagger schema
schema_view = get_swagger_view(title='Api Practice')

urlpatterns = [
    path('talent_search/', FindTalent.as_view()),

    url(r'^docs/', schema_view)
]