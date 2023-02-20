from django.contrib import admin

# Register your models here.

from .models import Article

class ArticleAdmin(admin.ModelAdmin):
    ordering = ['id']
    list_display = ['title','headerimage','author','content','created_at']
    list_display_links = ['title','author']

    
admin.site.register(Article,ArticleAdmin)