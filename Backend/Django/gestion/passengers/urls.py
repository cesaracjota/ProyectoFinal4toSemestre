from passengers import views 
from django.urls import path
 
urlpatterns = [ 
    path('api/passengers', views.passenger_list),
    path('api/passengers/<int:pk>', views.passenger_detail),
]