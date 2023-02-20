from django.db import models
from datetime import datetime

class docs(models.Model):
    title = models.CharField(max_length=50,null=False)
    file = models.FileField(blank=False, null=False)
    creationDate=models.DateTimeField(default=datetime.now, blank=True)

    def __str__(self):
        return self.file.name