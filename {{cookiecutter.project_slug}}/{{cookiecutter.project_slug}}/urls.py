"""{{cookiecutter.project_slug}} URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from allauth.account.views import confirm_email
from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi
from django.urls import path, include, re_path
from django.views.generic import TemplateView

urlpatterns = [
    #path("", include("home.urls")),
    path("accounts/", include("allauth.urls")),
    path("api/v1/", include("home.api.v1.urls")),
    path("admin/", admin.site.urls),
    path("users/", include("users.urls", namespace="users")),
    path("rest-auth/", include("rest_auth.urls")),
    # Override email confirm to use allauth's HTML view instead of rest_auth's API view
    path("rest-auth/registration/account-confirm-email/<str:key>/", confirm_email),
    path("rest-auth/registration/", include("rest_auth.registration.urls")),
]

admin.site.site_header = "{{cookiecutter.project_name}}"
admin.site.site_title = "{{cookiecutter.project_name}} Admin Portal"
admin.site.index_title = "{{cookiecutter.project_name}} Admin"

# swagger
schema_view = get_schema_view(
    openapi.Info(
        title="{{cookiecutter.project_name}} API",
        default_version="v1",
        description="API documentation for {{cookiecutter.project_name}} App",
    ),
    public=True,
    permission_classes=(permissions.IsAuthenticated,),
)

urlpatterns += [
    path("api-docs/", schema_view.with_ui("swagger", cache_timeout=0), name="api_docs")
]

urlpatterns += [path('', TemplateView.as_view(template_name='index.html'))]
urlpatterns += [
        re_path(r"^(?:.*)/?$",
                TemplateView.as_view(template_name='index.html'))
    ] 