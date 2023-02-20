from itertools import count
import json
from operator import eq
import tempfile
from django.forms import model_to_dict
from django.shortcuts import get_object_or_404, render
from matplotlib.pyplot import title

from rest_framework.generics import ListCreateAPIView, UpdateAPIView , ListAPIView ,RetrieveAPIView , DestroyAPIView  ,GenericAPIView

from Core.models import User
from .models import Document, PassportModel, VitaleModel
from .serializers import DocumenDataSerializer, DocumentsSerializer, PassSerializer, PassportSerializer, VitaleSerializer
from rest_framework import permissions
from rest_framework.parsers import FileUploadParser
from rest_framework.response import Response
from rest_framework.views import APIView 
from rest_framework import status

from passporteye import read_mrz
import requests

#count Extraction
class DocumentListAPICountView(ListAPIView):
    
    
    serializer_class = DocumentsSerializer
    queryset = Document.objects.all()
    permission_classes = (permissions.AllowAny,)
    lookup_field = "owner_id" 
    
    
    def  get(self,request,myid):
        
      #  file_serializer = self.queryset.filtre(owner=myid).count
       count = Document.objects.all().filter(owner=myid).count()

       return Response(count, status=status.HTTP_201_CREATED)

 #list Docs by owner
class DocumentListAPIView(ListAPIView):
    
    
    serializer_class = DocumentsSerializer
    queryset = Document.objects.all()
    permission_classes = (permissions.AllowAny,)
    lookup_field = "owner_id"
    
    
    def  get(self,request,oid):
        
        file_serializer = self.queryset.filter(owner=oid)

        return Response(file_serializer.values(), status=status.HTTP_201_CREATED)


 #Show detailed Doc buy doc_id  
class DocumentDetailAPIView(RetrieveAPIView):
    serializer_class = DocumentsSerializer
    queryset = Document.objects.all()
    permission_classes = (permissions.AllowAny,)
    
    lookup_field = "id"
    
    def detail_view(self):
        
        return self.queryset.filter(id=self.request.GET.get(id))
      
       
#Show detailed Data buy title  
class ExtractionDetailAPIView(ListAPIView):
    serializer_class = DocumentsSerializer
    queryset = Document.objects.all()
    permission_classes = (permissions.AllowAny,)
    
    lookup_field = "title"
    
    def  getAll(self,request,title):
            
        file_serializer = self.queryset.filter(title=title)
        
        return Response(file_serializer.values(), status=status.HTTP_201_CREATED)

    
 #Update a  Doc buy doc_id     
class DocumentUpdateAPIView(UpdateAPIView):
    serializer_class = DocumentsSerializer
    queryset = Document.objects.all()
    permission_classes = (permissions.AllowAny,)
    
    lookup_field = "id"

    def post(self, request, *args, **kwargs):
        
      file_serializer = DocumentsSerializer(data=request.data)

      if file_serializer.is_valid():
          file_serializer.update(id=self.request.GET.get(id))
          return Response(file_serializer.data, status=status.HTTP_201_CREATED)
      else:
          return Response(file_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

 #Delete a  Doc buy doc_id 
class DocumentDeleteAPIView(DestroyAPIView):
    serializer_class = DocumentsSerializer
    queryset = Document.objects.all()
    permission_classes = (permissions.AllowAny,)
    
    lookup_field = "id"

    def detail_view(self):
        
        return self.queryset.filter(id=self.request.GET.get(id))
    
    
 #Create New Doc 
class DocumentCreateAPIView(APIView):
    parser_class = (FileUploadParser,)

    def post(self, request, *args, **kwargs):

      file_serializer = DocumentsSerializer(data=request.data)
      
      if file_serializer.is_valid():
          userset= User.objects.get(id=self.request.data.get('owner'))
            # Process image
          print(self.request.FILES.get('file')) 
          file_temp = tempfile.NamedTemporaryFile()
          file_temp.write(self.request.FILES.get('file').read())
          mrz = read_mrz(file_temp.name)

            # Obtain image
          mrz_data = mrz.to_dict()
          
          passportData = PassportModel()
          passportData.names=mrz_data['names']
          passportData.nationality=mrz_data['nationality']
          passportData.surname=mrz_data['surname']
          passportData.type=mrz_data['type']
          passportData.date_of_birth=mrz_data['date_of_birth']
          passportData.sex=mrz_data['sex']
          passportData.expiration_date=mrz_data['expiration_date']
          
          
          passportData.save()
          
          
          file_serializer.save(owner=userset,data =passportData)
          return Response(file_serializer.data, status=status.HTTP_201_CREATED)
      else:
          return Response(file_serializer.errors, status=status.HTTP_400_BAD_REQUEST)



#Create New Doc & extract data
class DocumentExtractAPIView(APIView):
    parser_class = (FileUploadParser,)

    def post(self, request, *args, **kwargs):

      file_serializer = DocumenDataSerializer(data=request.data)
      if file_serializer.is_valid():
          
        print(self.request.POST.get('modelType'))
        
      if file_serializer.is_valid():
            userset= User.objects.get(id=self.request.data.get('owner'))

            if (self.request.POST.get('modelType') ) == 'PASSPORT':
                
                file_temp = tempfile.NamedTemporaryFile()
                file_temp.write(self.request.FILES.get('file').read())
                mrz = read_mrz(file_temp.name)

                    # Obtain image
                mrz_data = mrz.to_dict()
                
                passportData = PassportModel()
                passportData.names=mrz_data['names']
                passportData.nationality=mrz_data['nationality']
                passportData.surname=mrz_data['surname']
                passportData.type=mrz_data['type']
                passportData.date_of_birth=mrz_data['date_of_birth']
                passportData.sex=mrz_data['sex']
                passportData.expiration_date=mrz_data['expiration_date']
                passportData.ref=self.request.POST.get('ref')
                mrz_data['ref']=self.request.POST.get('ref')
                
                
                passportData.save()
                document = Document()
                document.title=self.request.POST.get('title')
                document.description=self.request.POST.get('description')
                document.file=self.request.FILES.get('file')
                document.modelType=self.request.POST.get('modelType')
                document.owner=userset
                document.data=passportData
                document.save()
            
                return Response(mrz_data, status=status.HTTP_201_CREATED)
            
            elif (self.request.POST.get('modelType') ) == 'VITALE':
                
                file_temp = tempfile.NamedTemporaryFile()
                file_temp.write(self.request.FILES.get('file').read())
                
                (url) = 'https://app.nanonets.com/api/v2/OCR/Model/1736e673-2c22-45cc-8dc4-9594de2038df/LabelFile/'
                data = {'file': open(file_temp.name, 'rb')}

                response = requests.post(url, auth=requests.auth.HTTPBasicAuth('jZccJzUWp5AZN-H-NXDl5NvhGUtGRaM_', ''), files=data)

                print(response.text)
                json_data = response.json()
                
                VitaleData = VitaleModel()
                vitale_data={}
                vitale_data['emise_date']=json_data['result'][0]['prediction'][0]['ocr_text']
                VitaleData.emise_date= json_data['result'][0]['prediction'][0]['ocr_text']
                vitale_data['full_name']= json_data['result'][0]['prediction'][1]['ocr_text']
                VitaleData.full_name= json_data['result'][0]['prediction'][1]['ocr_text']
                if (json_data['result'][0]['prediction'][2]['ocr_text']== '1'):
                    VitaleData.gender= 'Male'
                    vitale_data['gender'] ='Male'
                elif (json_data['result'][0]['prediction'][2]['ocr_text']== '2'):
                    VitaleData.gender= 'Female'
                    vitale_data['gender'] ='Female'
                else :
                    VitaleData.gender= '...'
                    vitale_data['gender'] ='...'
                try:
                    VitaleData.date_of_birth= (json_data['result'][0]['prediction'][4]['ocr_text']+'/'+json_data['result'][0]['prediction'][3]['ocr_text'])
                    VitaleData.cle_de_securite= json_data['result'][0]['prediction'][5]['ocr_text']
                    
                    
                except IndexError:
                    VitaleData.date_of_birth= json_data['result'][0]['prediction'][3]['ocr_text']
                    VitaleData.cle_de_securite= json_data['result'][0]['prediction'][4]['ocr_text']
                VitaleData.ref=self.request.POST.get('ref')
                VitaleData.save()
                
                document = Document()
                document.title=self.request.POST.get('title')
                document.description=self.request.POST.get('description')
                document.file=self.request.FILES.get('file')
                document.modelType=self.request.POST.get('modelType')
                document.owner=userset
                document.vitale_data=VitaleData
                document.save()
                
                dict_obj = model_to_dict( VitaleData )
               
            
                return Response(dict_obj, status=status.HTTP_201_CREATED)
            else:
                return Response(file_serializer.errors, status=status.HTTP_400_BAD_REQUEST)    
      else:
            return Response(file_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

         
  #Update a  Data buy ref     
class DataUpdateAPIView(UpdateAPIView):
    serializer_class = PassportSerializer
    queryset = PassportModel.objects.all()
    permission_classes = (permissions.AllowAny,)
    
    lookup_field = "ref"

    def post(self, request, *args, **kwargs):
        
      file_serializer = PassportSerializer(data=request.data)

      if file_serializer.is_valid():
          file_serializer.update(ref=self.request.POST.get('ref'))
          return Response(file_serializer.data, status=status.HTTP_201_CREATED)
      else:
          return Response(file_serializer.errors, status=status.HTTP_400_BAD_REQUEST)   
      
  #Update a  Data buy ref     
class DataVitaleUpdateAPIView(UpdateAPIView):
    serializer_class = VitaleSerializer
    queryset = VitaleModel.objects.all()
    permission_classes = (permissions.AllowAny,)
    
    lookup_field = "ref"

    def post(self, request, *args, **kwargs):
        
      file_serializer = VitaleSerializer(data=request.data)

      if file_serializer.is_valid():
          file_serializer.update(ref=self.request.POST.get('ref'))
          return Response(file_serializer.data, status=status.HTTP_201_CREATED)
      else:
          return Response(file_serializer.errors, status=status.HTTP_400_BAD_REQUEST)   
        

#Show detailed PassportData buy data_id  
class ExtractionDetailsAPIView(RetrieveAPIView):
    serializer_class = PassSerializer
    queryset = PassportModel.objects.all()
    permission_classes = (permissions.AllowAny,)
    
    lookup_field = "id"
    
    def detail_view(self):
         
        return self.queryset.filter(id=self.request.GET.get(id))
    
 #Show detailed Vitale_Data buy data_id  
class ExtractionVitaleDetailsAPIView(RetrieveAPIView):
    serializer_class = VitaleSerializer
    queryset = VitaleModel.objects.all()
    permission_classes = (permissions.AllowAny,)
    
    lookup_field = "id"
    
    def detail_view(self):
         
        return self.queryset.filter(id=self.request.GET.get(id))   
    

    
#Update a  Data buy Id 
class DataUpdateByIdAPIView(UpdateAPIView):
    serializer_class = PassportSerializer
    queryset = PassportModel.objects.all()
    permission_classes = (permissions.AllowAny,)
    
    lookup_field = "id"

    def post(self, request, *args, **kwargs):
        
      file_serializer = PassportSerializer(data=request.data)

      if file_serializer.is_valid():
          file_serializer.update(ref=self.request.POST.get('id'))
          return Response(file_serializer.data, status=status.HTTP_201_CREATED)
      else:
          return Response(file_serializer.errors, status=status.HTTP_400_BAD_REQUEST) 
      
#Update a  VitaleData buy Id 
class DataVitaleUpdateByIdAPIView(UpdateAPIView):
    serializer_class = VitaleSerializer
    queryset = VitaleModel.objects.all()
    permission_classes = (permissions.AllowAny,)
    
    lookup_field = "id"

    def post(self, request, *args, **kwargs):
        
      file_serializer = VitaleSerializer(data=request.data)

      if file_serializer.is_valid():
          file_serializer.update(ref=self.request.POST.get('id'))
          return Response(file_serializer.data, status=status.HTTP_201_CREATED)
      else:
          return Response(file_serializer.errors, status=status.HTTP_400_BAD_REQUEST) 
