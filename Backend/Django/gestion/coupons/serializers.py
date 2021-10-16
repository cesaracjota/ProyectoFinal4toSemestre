from rest_framework import serializers 
from coupons.models import coupons
 
 
class CouponsSerializer(serializers.ModelSerializer):
 
    class Meta:
        model = coupons
        fields = ('id', 'code', 'description', 'start_date', 'expired_date', 'amount', 'coupon_number', 'used_count')