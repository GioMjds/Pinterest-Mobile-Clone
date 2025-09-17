from django.contrib.auth import authenticate, login
from django.contrib.auth.hashers import make_password, check_password
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.response import Response
from rest_framework import status
from django.core.cache import cache
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from datetime import timedelta
from .validation.validation import RegistrationForm
from .models import User
from .email.email import send_otp_to_email, send_reset_password
import uuid

class Login(APIView):
    def post(self, request):
        try:
            email = request.data.get('email')
            password = request.data.get('password')
            
            if not email or not password:
                return Response({"error": "Email and password are required."}, status=status.HTTP_400_BAD_REQUEST)
            
            user = authenticate(request, email=email, password=password)
            
            if not user:
                return Response({"error": "User not found."}, status=status.HTTP_404_NOT_FOUND)

            if not check_password(password, user.password):
                return Response({"error": "Invalid credentials."}, status=status.HTTP_401_UNAUTHORIZED)

            login(request, user)
            token = RefreshToken.for_user(user)

            response = Response({
                "message": "Login successful.",
                "user": {
                    "email": user.email,
                    "first_name": user.first_name,
                    "last_name": user.last_name,
                    "username": user.username,
                },
            }, status=status.HTTP_200_OK)
            
            response.set_cookie(
                key='access_token',
                value=str(token.access_token),
                httponly=True,
                secure=True,
                samesite='Lax',
                max_age=int(timedelta(days=30).total_seconds())
            )

            response.set_cookie(
                key='refresh_token',
                value=str(token),
                httponly=True,
                secure=True,
                samesite='Lax',
                max_age=int(timedelta(weeks=54).total_seconds())
            )

            return response
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class Logout(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        try:
            response = Response({"message": "Logout successful."}, status=status.HTTP_200_OK)
            response.delete_cookie('access_token')
            response.delete_cookie('refresh_token')
            return response
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class SendRegisterOTP(APIView):
    def post(self, request):
        try:
            email = request.data.get('email')
            username = request.data.get('username')
            first_name = request.data.get('first_name')
            last_name = request.data.get('last_name')
            password = request.data.get('password')
            confirm_password = request.data.get('confirm_password')

            if not email or not username or not first_name or not last_name or not password or not confirm_password:
                return Response({"error": "Email, username, first name, last name, password, and confirm password are required."}, status=status.HTTP_400_BAD_REQUEST)

            if not username.isalnum() and "_" not in username:
                return Response({"error": "Username must be alphanumeric or contain underscores only."}, status=status.HTTP_400_BAD_REQUEST)
            if User.objects.filter(username=username).exists():
                return Response({"error": "Username is already taken."}, status=status.HTTP_400_BAD_REQUEST)

            if not first_name.isalpha() or not last_name.isalpha():
                return Response({"error": "First name and last name must contain only alphabetic characters."}, status=status.HTTP_400_BAD_REQUEST)

            if password != confirm_password:
                return Response({"error": "Passwords do not match."}, status=status.HTTP_400_BAD_REQUEST)

            if User.objects.filter(email=email).exists():
                return Response({"error": "Email is already registered."}, status=status.HTTP_400_BAD_REQUEST)

            form = RegistrationForm({
                'email': email,
                'username': username,
                'first_name': first_name,
                'last_name': last_name,
                'password': password,
                'confirm_password': confirm_password
            })
            if not form.is_valid():
                return Response({"errors": form.errors}, status=status.HTTP_400_BAD_REQUEST)

            purpose = 'account_activation'
            cache_key = f"otp_{purpose}_{email}"
            if cache.get(cache_key):
                return Response({"error": "An OTP has already been sent to this email. Please wait before requesting another."}, status=status.HTTP_429_TOO_MANY_REQUESTS)

            message = "OTP for Account Activation"
            otp_generated = send_otp_to_email(email, message)
            if otp_generated is None:
                return Response({"error": "Failed to send OTP. Please try again later."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

            expiry_time = 120 # 2 minutes
            cache.set(cache_key, otp_generated, timeout=expiry_time)

            return Response({
                "message": "OTP sent to email.",
                "otp": otp_generated # In production, do not return the OTP in the response
            }, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class VerifyOTP(APIView):
    def post(self, request):
        try:
            email = request.data.get('email')
            username = request.data.get('username')
            first_name = request.data.get('first_name')
            last_name = request.data.get('last_name')
            password = request.data.get('password')
            otp = request.data.get('otp')

            if not email or not username or not first_name or not last_name or not password or not otp:
                return Response({"error": "Email, username, first name, last name, password, and otp are required."}, status=status.HTTP_400_BAD_REQUEST)

            purpose = 'account_activation'
            cache_key = f"otp_{purpose}_{email}"
            cached_otp = cache.get(cache_key)

            if not cached_otp or str(cached_otp) != str(otp):
                return Response({"error": "Invalid or expired OTP."}, status=status.HTTP_400_BAD_REQUEST)

            if User.objects.filter(email=email).exists():
                return Response({"error": "Email is already registered."}, status=status.HTTP_400_BAD_REQUEST)
            if User.objects.filter(username=username).exists():
                return Response({"error": "Username is already taken."}, status=status.HTTP_400_BAD_REQUEST)

            hashed_password = make_password(password)

            DEFAULT_PROFILE_IMAGE = "https://res.cloudinary.com/ddjp3phzz/image/upload/v1741784007/wyzaupfxdvmwoogegsg8.jpg"

            user = User.objects.create(
                user_id=str(uuid.uuid4()),
                username=username,
                email=email,
                first_name=first_name,
                last_name=last_name,
                is_verified=True,
                password=hashed_password,
                profile_image=DEFAULT_PROFILE_IMAGE
            )

            user.save()

            cache.delete(cache_key)

            return Response({
                "message": "Account verified and created successfully.",
                "user": {
                    "user_id": user.user_id,
                    "username": user.username,
                    "email": user.email,
                    "first_name": user.first_name,
                    "last_name": user.last_name,
                    "is_verified": user.is_verified
                }
            }, status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

