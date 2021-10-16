from django.db import models
from vehicles.models import vehicle, rent_info

# Create your models here.

class worker(models.Model):

    name = models.CharField(max_length=50, blank=False)
    mobile = models.IntegerField()
    email = models.EmailField()
    address = models.CharField(max_length=100)
    ageWorker = models.IntegerField(blank=False, default=20)
    gender = models.CharField(max_length=15, default=None)
    license = models.CharField(max_length=10, default=None)
    joindate = models.DateField()
    photo = models.ImageField('Uploaded image',blank=True)
    trips = models.IntegerField(default=0)
    rent_info = models.OneToOneField(rent_info, on_delete=models.CASCADE, null=True, blank=True)

    def __str__(self):
        return self.name

class WorkerPayment(models.Model):
    transaction = models.CharField(primary_key=True,max_length=20)
    name = models.ForeignKey(worker, on_delete=models.CASCADE)
    date = models.DateField()
    amount = models.IntegerField()
    status = models.CharField(max_length=10)
    commission = models.IntegerField()
