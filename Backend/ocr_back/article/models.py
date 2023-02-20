from datetime import datetime
from django.db import models


# Create your models here.

from Core.models import User

class Article(models.Model):

   
    

    title= models.CharField(max_length=100)
    headerimage = models.ImageField(null=True, blank=True, upload_to="images/")
    author = models.ForeignKey(User , on_delete=models.CASCADE)
    content=models.TextField()
    created_at = models.DateTimeField(auto_now=True)
    updated_at= models.DateTimeField(auto_now=True)
    category = models.CharField(max_length=255, default="coding")
    likes = models.ManyToManyField(User , related_name='blog_posts')
    
    def total_likes(self):
        return self.likes.count()
        
    
    def __str__(self):
        return self.title + ' | ' + str(self.author)

class Comment(models.Model):
    article = models.ForeignKey(Article, related_name="comments", on_delete=models.CASCADE) 
    date_added = models.DateTimeField(auto_now_add=True)
    body=models.TextField(max_length=255, default="coding")
   