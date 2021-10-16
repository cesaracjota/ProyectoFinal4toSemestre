from django.db import models

# Create your models here.
class coupons(models.Model):

    code = models.CharField( max_length=10)
    start_date = models.DateField()
    expired_date = models.DateField()
    amount = models.IntegerField()
    coupon_number = models.IntegerField()
    used_count = models.IntegerField()
    description = models.TextField(max_length=100, default=None)