from django.db import models
from django.contrib.auth.models import AbstractBaseUser
# Create your models here.

class passenger(AbstractBaseUser):

    name = models.CharField(max_length=50, blank=False, default='')
    mobile = models.IntegerField()
    email = models.EmailField()
    trips = models.IntegerField()
    status = models.CharField(max_length=10)
    favorite = models.CharField(max_length=100, default='')

    USERNAME_FIELD = 'email'
