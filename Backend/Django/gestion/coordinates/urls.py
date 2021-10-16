from coordinates import views 
from django.urls import path
 
urlpatterns = [ 
    path('api/coordinates', views.coordinates_list),
    path('api/coordinates/<int:pk>', views.coordinate_detail),
]