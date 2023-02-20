from django.contrib import admin

# Register your models here.

from .models import Reclamation

class ReclamationAdmin(admin.ModelAdmin):
    ordering = ['id']
    list_display = ['title','description','creationDate','owner_id']
    list_display_links = ['title','owner_id']

admin.site.register(Reclamation,ReclamationAdmin)