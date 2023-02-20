from django.shortcuts import redirect, render

# Create your views here.

from rest_framework import generics ,status,views
from yaml import serialize
from .serializers import *
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from rest_framework.response import Response

from rest_framework.permissions import IsAuthenticated
from django.contrib.auth import get_user_model

from reclamation import serializers

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
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView,ListAPIView,RetrieveAPIView,UpdateAPIView,DestroyAPIView
from .models import Reclamation
from .serializers import ReclamationsSerializer
from rest_framework import permissions
from Core.models import User

class ReclamationListAPIView(ListAPIView):
   
    serializer_class = ReclamationsSerializer
    queryset = Reclamation.objects.all()
    permission_classes = (permissions.AllowAny,)
    lookup_field = "owner_id"
    
    
    def  get(self,request,oid):
        
        file_serializer = self.queryset.filter(owner=oid)

        return Response(file_serializer.values(), status=status.HTTP_201_CREATED)

class ReclamationDetailAPIView(RetrieveAPIView):
    serializer_class = ReclamationsSerializer
    queryset = Reclamation.objects.all()
    permission_classes = (permissions.AllowAny,)
   
    
    lookup_field = "id"
    
    def detail_view(self):
        
        return self.queryset.filter(id=self.request.GET.get(id))
        
class ReclamationUpdateAPIView(UpdateAPIView):
    serializer_class = ReclamationsSerializer
    queryset = Reclamation.objects.all()
    permission_classes = (permissions.AllowAny,)
    
    lookup_field = "id"

    def post(self, request, *args, **kwargs):
        
      file_serializer = ReclamationsSerializer(data=request.data)

      if file_serializer.is_valid():
          file_serializer.update(id=self.request.GET.get(id))
          return Response(file_serializer.data, status=status.HTTP_201_CREATED)
      else:
          return Response(file_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class ReclamationDeleteAPIView(DestroyAPIView):
    serializer_class = ReclamationsSerializer
    queryset = Reclamation.objects.all()
    permission_classes = (permissions.AllowAny,)
    
    lookup_field = "id"

    def detail_view(self):
        
        return self.queryset.filter(id=self.request.GET.get(id))
    

class ReclamationCreateAPIView(ListCreateAPIView):
    serializer_class = ReclamationsSerializer
    queryset = Reclamation.objects.all()
    permission_classes = (permissions.AllowAny,)

    def perform_create(self, serializer):
        userset= User.objects.get(id=self.request.data.get('owner'))
        return serializer.save(owner=userset)
       


