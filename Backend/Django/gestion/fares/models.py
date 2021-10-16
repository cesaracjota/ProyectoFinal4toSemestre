from django.db import models


# Create your models here.
class fares(models.Model):

    fare_per_km = models.IntegerField()
    minimum_fare = models.IntegerField()
    minimun_distance = models.IntegerField()
    waiting_fare = models.IntegerField()
    type = models.CharField(primary_key=True, max_length=30, default=None)
    
