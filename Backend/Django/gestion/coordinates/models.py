from django.db import models

# Create your models here.

class Coordinates(models.Model):
    name = models.CharField(max_length=100, default='')
    lat = models.DecimalField(max_digits=20, decimal_places=15, blank=False)
    lng = models.DecimalField(max_digits=20, decimal_places=15, blank=False)
