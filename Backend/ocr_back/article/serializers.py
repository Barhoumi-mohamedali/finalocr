from rest_framework import serializers
from .models import Article
from .models import Comment


class ArticlesSerializer(serializers.ModelSerializer):
   

    class Meta:
        model = Article
        fields = fields =('id','title','headerimage','author','content','created_at','updated_at','category','likes')

class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model= Comment
        fields= '__all__' 