from django.urls import path , include
from . import views
from .models import Article


urlpatterns = [
   path('',views.ArticleViewList.as_view(), name='post_list'),
   path('add',views.ArticleAdd.as_view(),name='Add_List'),
   path('details/<str:pk>',views.ArticleDetails.as_view(), name='post_details'),
   path('post_comment',views.AddComment.as_view(),name='post_comment'),
   path('post_comments/<str:pk>',views.PostComment.as_view(),name='post_comments')

  

]