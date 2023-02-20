
from yaml import serialize
from .serializers import *

from rest_framework.response import Response

from article import serializers

from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.utils.encoding import smart_str, force_str, smart_bytes, DjangoUnicodeDecodeError
from django.utils.http import urlsafe_base64_decode, urlsafe_base64_encode
from .utils import Util
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.utils.encoding import smart_str, force_str, smart_bytes, DjangoUnicodeDecodeError
from django.urls import reverse
from django.contrib.sites.shortcuts import get_current_site
from django.http import HttpResponsePermanentRedirect
import os

from .renderers import UserRenderer
from rest_framework_simplejwt.tokens import RefreshToken
from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema
import jwt
from django.conf import settings
from rest_framework.views import APIView
from rest_framework.generics import CreateAPIView
from .models import Article
from .serializers import ArticlesSerializer
from rest_framework import permissions
from Core.models import User
from django.core.exceptions import ObjectDoesNotExist


class ArticleViewList(APIView):
    def get(self,request):
        blog=Article.objects.all()
        serializer = ArticlesSerializer(blog,many=True)
        return Response({'status':201,'payload':serializer.data})



class ArticleAdd(CreateAPIView):
    serializer_class = ArticlesSerializer

    def post(self,request):
        serializer=ArticlesSerializer(data=request.data)
        if not serializer.is_valid():
            return Response({'payload':serializer.errors,'status':400,'message':'Something went Wrong'})
        serializer.save()
        return Response({'payload':serializer.data,'status':201,'message':'Blog is created'})



class ArticleDetails(APIView):
    

    def get(self,request,pk):
        try:
            blog= Article.objects.get(id= pk)
            serializer = ArticlesSerializer(blog)
            return Response({'payload':serializer.data, 'status':200})
        except ObjectDoesNotExist:
            return Response({'status': 404, 'message': 'Not Found'})

    def patch(self,request,pk):
        try:
            blog = Article.objects.get(id=pk)
            serializer=ArticlesSerializer(blog,data=request.data,partial=True)
            if not serializer.is_valid():
                return Response({'payload':serializer.errors,'status':400,'message':'Something went Wrong'})
            serializer.save()
            return Response({'payload':serializer.data,'status':201,'message':'Blog is successfully Updated'})
        except ObjectDoesNotExist:
            return Response({'status': 404, 'message': 'Not Found'})

    def delete(self,request,pk):
        try:
            blog = Article.objects.get(id=pk)
            blog.delete()
            return Response({'message':'Blog successfully Deleted', 'status':200})

        except ObjectDoesNotExist:
            return Response({'status': 404, 'message': 'Not Found'})
        
        
        


class AddComment(CreateAPIView):
    
    serializer_class = CommentSerializer

    def comment(self,request):
        article = Article.objects.get(id=request.data['article'])
        new_comment =Comment.objects.create(
        body=request.data['body'],
        date_added = request.data['date_added'],
        article=article
    )
        new_comment.save()
        serializer = CommentSerializer(new_comment)
       # serializer=ArticlesSerializer(data=request.data)
        if not serializer.is_valid():
            return Response({'payload':serializer.errors,'status':400,'message':'Something went Wrong'})
        serializer.save()
        return Response({'payload':serializer.data,'status':201,'message':'Blog is created'})

class PostComment(APIView):
    
    serializer_class = CommentSerializer

    def get(self,request,pk):
        
        try:
            comments= Comment.objects.filter(article= pk)
            serializer = CommentSerializer(comments,many=True)
            return Response({'payload':serializer.data, 'status':200})
        except ObjectDoesNotExist:
            return Response({'status': 404, 'message': 'Not Found'})

    
  