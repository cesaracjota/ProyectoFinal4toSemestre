from gestion.settings import STATIC_URL
from django.conf.urls.static import static
from workers import views 
from django.urls import path
from django.conf import settings
 
urlpatterns = [ 
    path('api/workers', views.worker_list),
    path('api/workers/<int:pk>', views.worker_detail),
    path('api/workerspayment', views.workerpay_list),
    path('api/workerspayment/<int:pk>', views.workerpay_detail),
    path('api/workerspayment/<pk>', views.workerpay_detail),
    path('api/trip/info', views.trip_list),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)