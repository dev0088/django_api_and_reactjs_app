from django.contrib import admin

# Register your models here.
from .models import User
from rest_framework.authtoken.admin import TokenAdmin

class UserAdmin(admin.ModelAdmin):
    list_display = ('id', 'username', 'email', 'get_full_name', 'type', 'updated_at')
    list_display_links = ('id', 'username', 'email', 'get_full_name', 'type', 'updated_at')
    list_filter = ('type',)
    list_per_page = 25

TokenAdmin.raw_id_fields = ('user',)
ordering = ('id', 'created_at')
admin.site.register(User, UserAdmin)