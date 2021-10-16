from vehicles import views 
from django.urls import path
 
urlpatterns = [ 
    path('api/vehicles', views.vehicle_list),
    #path('api/passengers/status-active', views.worker_stutus_active),
    path('api/vehicles/<int:pk>', views.vehicle_detail),
    path('api/vehicles/rent', views.rent_list),
    path('api/vehicles/rent/<int:pk>', views.rent_detail),
]