import os
from datetime import timedelta
import datetime
import psycopg2
import json
from six.moves.urllib import request
from cryptography.x509 import load_pem_x509_certificate
from cryptography.hazmat.backends import default_backend

# Build paths inside the project like this: os.path.join(BASE_DIR, ...)
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/1.11/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = '!pp45o$8uagf%rkj79pne099ff=10c-zv-^qndduaua)d@#!wy'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = [
    'www.shiptalent.com',
    'shiptalent.com',
    'staging.shiptalent.com',
    '172.31.41.201',
    '172.31.84.38',
    '34.193.87.115',
    'localhost',
    '127.0.0.1',
    '192.168.0.121',
    'localhost',
    'localhost:3000'
]

# Application definition

DJANGO_APPS = (
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
)

THIRD_PARTY_APPS = (
    'rest_framework',
    'rest_framework.authtoken',
    'rest_framework_jwt',
    'corsheaders',
    'rest_framework_swagger',
    'coreapi',
    'drf_yasg'
)

LOCAL_APPS = (
    'authentication',
    'shiptalent_info',
    'talent',
    'position_type',
    'position_sub_type',
    'skill',
    'sub_skill',
    'talent_position_type',
    'talent_position_sub_type',
    'talent_skill',
    'talent_sub_skill',
    'talent_picture',
    'talent_resume',
    'talent_video',
    'talent_visa',
    'talent_language',
    'talent_medical',
    'talent_availability',
    'talent_rating',
    'talent_video_greeting',
    'talent_video_sub_skill',
    'position_wizard_question_scenario',
    'wizard_question',
    'wizard_question_answer',
    'question',
    'admin_setting',
    'submission',
    'casting_request',
    # 'auth_permission',
    'client',
    'casting_request_talent',
    'blocked_profile',
    'call_back',
    'favorite',
    'team',
    'team_member',
    'shared_profile',
    'client_feedback',
    'client_request'
)

INSTALLED_APPS = DJANGO_APPS + THIRD_PARTY_APPS + LOCAL_APPS

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    'corsheaders.middleware.CorsMiddleware',
]

ROOT_URLCONF = 'config.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [os.path.join(BASE_DIR, 'templates/'), ],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'config.wsgi.application'

# Database
# https://docs.djangoproject.com/en/1.11/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql_psycopg2',
        'NAME': 'shiptalent',
        'USER': 'postgres',
        'PASSWORD': '',
        'HOST': 'localhost',
        'PORT': '5432',
    },
    'OPTIONS': {
        'isolation_level': psycopg2.extensions.ISOLATION_LEVEL_SERIALIZABLE,
    },
}

# Internationalization
# https://docs.djangoproject.com/en/1.11/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_L10N = True

USE_TZ = True

STATIC_URL = '/static_backend/'
STATIC_ROOT = 'static_backend'

STATICFILES_DIRS = (
    ("js", os.path.join(STATIC_ROOT, 'js')),
    ("css", os.path.join(STATIC_ROOT, 'css')),
    ("images", os.path.join(STATIC_ROOT, 'images')),
    ("fonts", os.path.join(STATIC_ROOT, 'fonts')),
    ("rest_framework", os.path.join(STATIC_ROOT, 'rest_framework'))
)

MEDIA_URL = '/media/'
MEDIA_ROOT = os.path.join(BASE_DIR, "media")

REST_FRAMEWORK = {
    'DEFAULT_PAGINATION_CLASS': 'rest_framework.pagination.PageNumberPagination',
    'PAGE_SIZE': 10,
    'DEFAULT_PERMISSION_CLASSES': (
        # 'rest_framework.permissions.IsAdminUser',
        # 'rest_framework.permissions.IsAuthenticated',
    ),
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework.authentication.BasicAuthentication',
        'rest_framework.authentication.TokenAuthentication',
        # 'rest_framework.authentication.SessionAuthentication',
        'rest_framework_jwt.authentication.JSONWebTokenAuthentication'
    ),
    'DEFAULT_PARSER_CLASSES': [
        'rest_framework.parsers.FormParser',
        'rest_framework.parsers.MultiPartParser',
        'rest_framework.parsers.JSONParser',
    ],
    # 'VIEW_DESCRIPTION_FUNCTION': 'rest_framework_swagger.views.get_restructuredtext',
    # 'VIEW_NAME_FUNCTION': 'module.path.to.custom.view.name.function'
}

AUTH_USER_MODEL = 'authentication.User'
CORS_ORIGIN_ALLOW_ALL = True

# AWS
# If AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY are not defined,
# django-s3-upload will attempt to use the EC2 instance profile instead.
AWS_ACCESS_KEY_ID = os.environ.get('AWS_ACCESS_KEY_ID', 'AKIAJSQZNJJM5VPSXCBQ')
AWS_SECRET_ACCESS_KEY = os.environ.get('AWS_SECRET_ACCESS_KEY', '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')
AWS_STORAGE_BUCKET_NAME = os.environ.get('AWS_STORAGE_BUCKET_NAME', 'talents3')
S3UPLOAD_REGION = os.environ.get('S3UPLOAD_REGION', 'us-east-1')


def create_filename(filename):
    import uuid
    ext = filename.split('.')[-1]
    filename = '%s.%s' % (uuid.uuid4().hex, ext)
    return os.path.join('custom', filename)


S3UPLOAD_DESTINATIONS = {
    # Allow anybody to upload any MIME type
    'misc': {
        'key': 'uploads/'
    },

    # Allow staff users to upload any MIME type
    'pdfs': {
        'key': 'uploads/pdfs',
        'auth': lambda u: u.is_staff,
    },

    # Allow anybody to upload jpeg's and png's. Limit sizes to 5kb - 20mb
    'images': {
        'key': 'uploads/images',
        'auth': lambda u: True,
        'allowed_types': [
            'image/jpeg',
            'image/png'
        ],
        'allowed_extensions': (
            '.jpeg',
            '.jpg',
            '.png',
        ),
        'content_length_range': (5000, 20000000),
    },

    # Allow authenticated users to upload mp4's
    'videos': {
        'key': 'uploads/videos',
        'auth': lambda u: u.is_authenticated,
        'allowed_types': ['video/mp4']
    },

    # Allow anybody to upload any MIME type with a custom name function
    'custom_filename': {
        'key': create_filename
    },
}

LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'formatters': {
        'verbose': {
            'format': '%(levelname)s %(asctime)s %(module)s %(process)d %(thread)d %(message)s'
        },
        'simple': {
            'format': '%(levelname)s %(message)s'
        },
    },
    'handlers': {
        'console': {
            'level': 'DEBUG',
            'class': 'logging.StreamHandler',
            'formatter': 'simple'
        },
    },
    'loggers': {
        'request_token': {
            'handlers': ['console'],
            'level': 'DEBUG',
        }
    }
}

JWT_AUTH = {
    'JWT_ENCODE_HANDLER':
        'rest_framework_jwt.utils.jwt_encode_handler',

    'JWT_DECODE_HANDLER':
        'rest_framework_jwt.utils.jwt_decode_handler',

    'JWT_PAYLOAD_HANDLER':
        'rest_framework_jwt.utils.jwt_payload_handler',

    'JWT_PAYLOAD_GET_USER_ID_HANDLER':
        'rest_framework_jwt.utils.jwt_get_user_id_from_payload_handler',

    'JWT_RESPONSE_PAYLOAD_HANDLER':
        'rest_framework_jwt.utils.jwt_response_payload_handler',

    'JWT_SECRET_KEY': SECRET_KEY,
    'JWT_ALGORITHM': 'HS256',
    'JWT_VERIFY': True,
    'JWT_VERIFY_EXPIRATION': True,
    'JWT_LEEWAY': 0,
    'JWT_EXPIRATION_DELTA': datetime.timedelta(seconds=86400),
    'JWT_AUDIENCE': None,
    'JWT_ISSUER': None,

    'JWT_ALLOW_REFRESH': True,
    'JWT_REFRESH_EXPIRATION_DELTA': datetime.timedelta(days=7),

    'JWT_AUTH_HEADER_PREFIX': 'Bearer',
}

SWAGGER_SETTINGS = {
    'SHOW_REQUEST_HEADERS': True,
    'SECURITY_DEFINITIONS': {
        # 'api_key': {
        #     'type': 'apiKey',
        #     'in': 'header',
        #     'name': 'Authorization'
        # }
        'Basic': {
            'type': 'basic'
        },
        'Bearer': {
            'type': 'apiKey',
            'name': 'Authorization',
            'in': 'header'
        }
    },
    'USE_SESSION_AUTH': False,
    'JSON_EDITOR': True,
    'LOGIN_URL': '/admin/login/',
    'LOGOUT_URL': '/admin/logout/',
}
