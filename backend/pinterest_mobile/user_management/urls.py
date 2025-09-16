from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView, TokenObtainPairView
from . import views

# /api/** routes
urlpatterns = [
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    
    # User Authentication
    path('auth/login', views.Login.as_view(), name='login'),
    path('auth/logout', views.Logout.as_view(), name='logout'),
    path('auth/register', views.SendRegisterOTP.as_view(), name='register'),
    path('auth/verify_otp', views.VerifyOTP.as_view(), name='verify_otp'),
]
