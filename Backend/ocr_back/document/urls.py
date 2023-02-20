from django.urls import path
from . import views


urlpatterns = [
    path('<oid>/', views.DocumentListAPIView.as_view(), name="documents"),
    path('create', views.DocumentCreateAPIView.as_view(), name="createDoc"),
    path('detail/<int:id>', views.DocumentDetailAPIView.as_view(), name="document"),
    path('delete/<id>', views.DocumentDeleteAPIView.as_view(), name="deleteDoc"),
    path('edit/<id>', views.DocumentUpdateAPIView.as_view(), name="editDoc"),
    path('detailExtract/<id>', views.ExtractionDetailsAPIView.as_view(), name="Dextract"),
    path('detailExtractT/<title>', views.ExtractionDetailAPIView.as_view(), name="DextractT"),
    path('extractDoc', views.DocumentExtractAPIView.as_view(), name="ExtractDoc"),
    path('verifyData/<ref>', views.DataUpdateAPIView.as_view(), name="verifyData"),
    path('verifyDataById/<id>', views.DataUpdateByIdAPIView.as_view(), name="verifyDataById"),
    
    path('detailExtractVitale/<id>', views.ExtractionVitaleDetailsAPIView.as_view(), name="DextractV"),
    path('verifyDataVitale/<ref>', views.DataVitaleUpdateAPIView.as_view(), name="verifyDataVitale"),
    path('verifyDataVitaleById/<id>', views.DataVitaleUpdateByIdAPIView.as_view(), name="verifyDataVitaleById"),
    path('<myid>', views.DocumentListAPICountView.as_view(), name="documentsCount"),






    


]
