from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView

from .views import UserInformationAPIView, UserLoginAPIView, UserViewSet
from .views import UserLogoutAPIView
from .views import UserRegistrationAPIView

urlpatterns = [
    path(
        "register/",
        UserRegistrationAPIView.as_view(
            {
                "post": "post",
            },
        ),
        name="register",
    ),
    path(
        "login/",
        UserLoginAPIView.as_view(
            {
                "post": "post",
            },
        ),
        name="login",
    ),
    path(
        "logout/",
        UserLogoutAPIView.as_view(
            {
                "post": "post",
            },
        ),
        name="logout",
    ),
    path("token/refresh/", TokenRefreshView.as_view(), name="token-refresh"),
    path("me/", UserViewSet.as_view({"get": "me"}), name="me"),
    path(
        "userinfo/",
        UserInformationAPIView.as_view(),
        name="user-info",
    ),
]
