from datetime import datetime
from django.db import models

# Create your models here.
from django.db import models
from django.contrib.auth.models import BaseUserManager, AbstractBaseUser, PermissionsMixin

from django.conf import settings
from django.dispatch import receiver
from django.db.models.signals import post_save
from rest_framework.authtoken.models import Token
from rest_framework_simplejwt.tokens import RefreshToken


class UserManager(BaseUserManager):

    def create_user(self,email,username=None,password=None,**extrafields):
        if not email:
            raise ValueError('Users must have an email')
        user = self.model(username=username,email=self.normalize_email(email), **extrafields)
        user.set_password(password)
        user.save(using=self._db)

        return user
    
    def create_superuser(self,email,password,username=None):
        user = self.create_user(email,username,password)
        user.is_staff = True
        user.is_superuser = True
        user.save(using=self._db)
        return user
   

class User(AbstractBaseUser, PermissionsMixin):
    username = models.CharField(max_length=200,unique=True,null=True)
    email = models.EmailField(max_length=255,unique=True)
    name = models.CharField(max_length=100)
    birthday= models.DateField(null=True)
    is_verified = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    objects = UserManager()

    USERNAME_FIELD = 'email'



    def __str__(self):
        return self.email

    def tokens(self):
        refresh = RefreshToken.for_user(self)
        return {
            'refresh': str(refresh),
            'access': str(refresh.access_token)
        }


    