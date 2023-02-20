from django.urls import path , include
from . import views


urlpatterns = [
  

   path('<oid>/', views.ReclamationListAPIView.as_view(), name="reclamations"),
   path('create', views.ReclamationCreateAPIView.as_view(), name="createRec"),
   path('detail/<int:id>', views.ReclamationDetailAPIView.as_view(), name="reclamationnnn"),
   path('delete/<id>', views.ReclamationDeleteAPIView.as_view(), name="deleteRec"),
   path('edit/<id>', views.ReclamationUpdateAPIView.as_view(), name="editRec"),

]