from django.urls import path
from django.conf.urls import  include 
from django.contrib import admin

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('workers.urls')),
    path('', include('passengers.urls')),
    path('', include('vehicles.urls')),
    path('', include('coupons.urls')),
    path('', include('fares.urls')),
    path('', include('coordinates.urls')),
]
