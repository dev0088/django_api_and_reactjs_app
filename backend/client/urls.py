from django.urls import path
from django.conf.urls import url
from rest_framework_swagger.views import get_swagger_view
from client.views import *
from django.conf import settings
from django.conf.urls.static import static

# swagger schema
# schema_view = get_swagger_view(title='Api Practice')

urlpatterns = [
    url(r'^/talent_search/', FindTalent.as_view()),
    url(r'^/request_view/', CastingRequest.as_view()),

    # url(r'^docs/', schema_view)
]# + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)