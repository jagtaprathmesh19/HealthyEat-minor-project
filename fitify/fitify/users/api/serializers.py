from django.contrib.auth import authenticate
from rest_framework import serializers

from fitify.users.models import User


class UserSerializer(serializers.ModelSerializer[User]):
    class Meta:
        model = User
        fields = ["username", "name", "email"]


class UserRegisterationSerilizer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["username", "name", "email", "password"]

        extra_kwargs = {
            "password": {"write_only": True},
        }

    def create(self, validated_data):
        return User.objects.create_user(**validated_data)

    def validate_email(self, value):
        if User.objects.filter(email=value).exists():
            msg = "This email is already in use."
            raise serializers.ValidationError(msg)
        return value


class UserLoginSerilizer(serializers.Serializer):
    email = serializers.CharField()
    password = serializers.CharField()

    def validate(self, data):
        user = authenticate(**data)
        if user and user.is_active:
            return user
        msg = "Incorrect Credentials"
        raise serializers.ValidationError(msg)
