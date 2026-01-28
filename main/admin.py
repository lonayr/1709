from django.contrib import admin

# Register your models here.

from .models import library, Course, Enrollment, Rating

admin.site.register(library)
admin.site.register(Course)
admin.site.register(Enrollment)
admin.site.register(Rating)
