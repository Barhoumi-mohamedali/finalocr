from datetime import datetime
from django.db import models


# Create your models here.

from Core.models import User

class VitaleModel(models.Model):
    ref = models.CharField(max_length=200,null=True,unique=True)
    full_name = models.CharField(max_length=200, null=True)
    emise_date= models.CharField(max_length=200, null=True)
    gender=models.CharField(max_length=200, null=True)
    date_of_birth=models.CharField(max_length=200, null=True)
    cle_de_securite=models.CharField(max_length=200, null=True)
    

class PassportModel(models.Model):
    nationality = models.CharField(max_length=200, null=True)
    names = models.CharField(max_length=200, null=True)
    surname = models.CharField(max_length=200, null=True)
    type = models.CharField(max_length=200, null=True)
    date_of_birth = models.CharField(max_length=200, null=True)
    sex = models.CharField(max_length=200,blank=True, null=True)
    expiration_date = models.CharField(max_length=200,null=True)
    ref = models.CharField(max_length=200,null=True,unique=True)


class Document(models.Model):
    file = models.FileField(blank=False, null=False)
    title= models.CharField(max_length=200,null=True)
    modelType=models.CharField(max_length=200)
    description=models.TextField(null=True)
    owner=models.ForeignKey(to=User,on_delete=models.CASCADE)
    data=models.ForeignKey(to=PassportModel,on_delete=models.CASCADE,null=True)
    vitale_data=models.ForeignKey(to=VitaleModel,on_delete=models.CASCADE,null=True)
    creationDate=models.DateTimeField(default=datetime.now, blank=True)
    
    
    def __str__(self):
        return self.file.name


