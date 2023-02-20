from datetime import datetime
from django.db import models


# Create your models here.

from Core.models import User

class Reclamation(models.Model):

   
    title= models.CharField(max_length=200,unique=True)
    description=models.TextField()
    creationDate=models.DateTimeField(default=datetime.now, blank=True)
    owner=models.ForeignKey(to=User,on_delete=models.CASCADE ,blank=True, null=True)
    #owner=models.Case(to=User,on_delete=models.CASCADE)
   