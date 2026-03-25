from django.contrib import admin
from django.urls import path, include, re_path
from django.views.generic import TemplateView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('magazine_backend.urls')),
    path('api/', include('top10scraper.urls')),
    # Catch-all to serve React app for any other route
    re_path(r'^(?!api/).*$', TemplateView.as_view(template_name="index.html")),
]
