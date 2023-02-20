from django.urls import path , include
from . import views
from rest_framework_simplejwt.views import (
    TokenRefreshView,
)

urlpatterns = [
    path('signup/',views.CreateUserView.as_view(),name='signup'),
    path('login/',views.LoginView.as_view(),name='login'),
 #   path('delete_user/',views.DeleteView.as_view(),name='delete_user'),

    
    path('verify-email/',views.VerifyEmail.as_view(),name='verify-email'),

    path('change-password/', views.ChangePasswordView.as_view(), name='change-password'),

    path('token/reflesh/', TokenRefreshView.as_view(), name='token_reflesh'),
    path('request-reset-email/', views.RequestPasswordResetEmail.as_view(),name="request-reset-email"),
    path('password-reset/<uidb64>/<token>/', views.PasswordTokenCheckAPI.as_view(),name='password-reset-confirm'),
    path('password-reset-complete/', views.SetNewPasswordAPIView.as_view(),name='password-reset-complete'),

]