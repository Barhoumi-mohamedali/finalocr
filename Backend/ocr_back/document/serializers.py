from rest_framework import serializers
from .models import Document, PassportModel, VitaleModel

    
    
class DocumentsSerializer(serializers.ModelSerializer):

    class Meta:
        model = Document
        fields = "__all__"
        
class DocumenDataSerializer(serializers.Serializer):
    
    class Meta:
        fields = ['file','modelType','ref','owner','title','description']
        
class PassportSerializer(serializers.ModelSerializer):
    class Meta:
        model = PassportModel
        fields = ['nationality','names','surname','type','date_of_birth','sex','expiration_date','ref']

class  PassSerializer(serializers.ModelSerializer):
    class Meta:
        model = PassportModel
        fields = "__all__"
        
class  VitaleSerializer(serializers.ModelSerializer):
    class Meta:
        model = VitaleModel
        fields = "__all__"