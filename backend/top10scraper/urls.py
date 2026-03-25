# top10scraper/urls.py
from django.urls import path
from .views import top10_api

urlpatterns = [
    path('top10/<str:country>/<str:item_type>/', top10_api),
]
