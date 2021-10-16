from coupons import views 
from django.urls import path
 
urlpatterns = [ 
    path('api/coupons', views.coupon_list),
    #path('api/passengers/status-active', views.worker_stutus_active),
    path('api/coupons/<int:pk>', views.coupon_detail),
]