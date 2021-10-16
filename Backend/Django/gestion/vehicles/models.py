from django.db import models

# Create your models here.

class vehicle(models.Model):

    number = models.CharField(max_length=10)
    type = models.CharField(max_length=20, default=None)
    model = models.CharField(max_length=50)
    capacity = models.IntegerField()
    insurance_renewal_date = models.DateField()
    fuel = models.CharField(max_length=20, default=None)
    photo = models.ImageField('Uploaded image', default='photos/user.png')
    alquiler = models.IntegerField(default=0)

    def __str__(self):
        return self.number


class rent_info(models.Model):
    vehicle = models.OneToOneField(vehicle, on_delete=models.CASCADE, null=True, blank=True)
    amount = models.IntegerField()

    # def __str__(self):
    #     return self.vehicle