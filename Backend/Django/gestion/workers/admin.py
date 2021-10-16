from django.contrib import admin
from .models import worker, WorkerPayment

# Register your models here.

admin.site.register(worker)
admin.site.register(WorkerPayment)