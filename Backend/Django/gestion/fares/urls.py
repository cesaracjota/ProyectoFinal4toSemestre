from fares import views 
from django.urls import path
 
urlpatterns = [ 
    path('api/fares', views.fare_list),
    #path('api/passengers/status-active', views.worker_stutus_active),
    path('api/fares/<int:pk>', views.fare_detail),
    path('api/fares/<pk>', views.fare_detail),
]