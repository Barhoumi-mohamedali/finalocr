import email
from email.policy import default
from typing import Tuple
from django.contrib.auth import get_user_model, authenticate 
from rest_framework import serializers
from rest_framework.exceptions import AuthenticationFailed
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.utils.encoding import smart_str, force_str, smart_bytes, DjangoUnicodeDecodeError
from django.utils.http import urlsafe_base64_decode, urlsafe_base64_encode
import datetime
from django.contrib import auth


User = get_user_model()
foo=[]

class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(max_length=68, min_length=6, write_only=True)

    default_error_messages = {'username': 'The username should only contain alphanumeric characters'}
    default_age_error ={'age' : 'You must be 18 years old or older'}

    class Meta:
        model = get_user_model()
        fields =('email','username','password','name','birthday')
    
    def validate(self, attrs):
        
        email = attrs.get('email', '')
        username = attrs.get('username', '')
        birthday= attrs.get('birthday','')
           
            
        age = int((datetime.date.today() - birthday).days / 365.25  )
   
        if age < 18 :
            raise serializers.ValidationError(
                self.default_age_error)
        if not username.isalnum():
            raise serializers.ValidationError(
                self.default_error_messages)
        return attrs

    def create(self,validated_data):
        return get_user_model().objects.create_user(**validated_data)



class EmailVerificationSerializer(serializers.ModelSerializer):
    token = serializers.CharField(max_length=555)

    class Meta:
        model = User
        fields = ['token']

        
        
class AuthTokenSerializer(serializers.Serializer):
    email = serializers.CharField()
    password = serializers.CharField(
        style={'input_type':'password'},
        trim_whitespace = False,
        write_only=True ,
    )
    username = serializers.CharField(
        max_length=255, min_length=3, read_only=True)
    
    tokens = serializers.SerializerMethodField()
    
    def get_tokens(self, obj):
        user = User.objects.get(email=obj['email'])

        return {
            'refresh': user.tokens()['refresh'],
            'access': user.tokens()['access']
        }
        
    
    class Meta:
        model = User
        fields = ['email', 'password','username' , 'tokens']
        
    
    def validate(self,attrs):
        email = attrs.get('email')
        password = attrs.get('password')
        
        filtered_user_by_email = User.objects.filter(email=email)
        user = auth.authenticate(email=email, password=password,request=self.context.get('request'),)
        
        if not user:
            raise AuthenticationFailed('Invalid credentials, try again')
        if not user.is_active:
            raise AuthenticationFailed('Account disabled, contact admin')
        if not user.is_verified:
            raise AuthenticationFailed('Email is not verified')
           
        attrs['user'] =user
        return attrs

        return super().validate(attrs)
     
    


class ChangePasswordSerializer(serializers.Serializer):
    model = get_user_model()

    """
    Serializer for password change endpoint.
    """
    email= serializers.CharField(required=True)
    old_password = serializers.CharField(required=True)
    new_password = serializers.CharField(required=True)



class ResetPasswordEmailRequestSerializer(serializers.Serializer):
    email = serializers.EmailField(min_length=2)
    
    class Meta:
        fields = ['email']



class SetNewPasswordSerializer(serializers.Serializer):
    password = serializers.CharField(
        min_length=6, max_length=68, write_only=True)
    token = serializers.CharField(
        min_length=1, write_only=True)
    uidb64 = serializers.CharField(
        min_length=1, write_only=True)

    class Meta:
        fields = ['password', 'token', 'uidb64']

    def validate(self, attrs):
        try:
            password = attrs.get('password')
            token = attrs.get('token')
            uidb64 = attrs.get('uidb64')

            id = force_str(urlsafe_base64_decode(uidb64))
            user = User.objects.get(id=id)
            if not PasswordResetTokenGenerator().check_token(user, token):
                raise AuthenticationFailed('The reset link is invalid', 401)

            user.set_password(password)
            user.save()

            return (user)
        except Exception as e:
            raise AuthenticationFailed('The reset link is invalid', 401)
        return super().validate(attrs)