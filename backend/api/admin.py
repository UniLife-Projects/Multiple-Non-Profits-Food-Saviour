from django.contrib import admin
from api.models import users
from api.models import posts

# Register your models here.
admin.site.register(users)
admin.site.register(posts)