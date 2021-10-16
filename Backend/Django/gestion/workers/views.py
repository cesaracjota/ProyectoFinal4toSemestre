
from django.shortcuts import render

from django.http.response import JsonResponse
from rest_framework.parsers import JSONParser 
from rest_framework import status
 
from workers.models import worker, WorkerPayment
from workers.serializers import WorkerSerializer, WorkerPaySerializer, TripSerializer
from rest_framework.decorators import api_view


@api_view(['GET', 'POST', 'DELETE'])
def worker_list(request):
    if request.method == 'GET':
        workers = worker.objects.all()

        name = request.GET.get('name', None)
        
        if name is not None:
            workers = workers.filter(title__icontains=name)
        
        workers_serializer = WorkerSerializer(workers, many=True)
        return JsonResponse(workers_serializer.data, safe=False)
        # 'safe=False' for objects serialization
 
    elif request.method == 'POST':
        worker_data = JSONParser().parse(request)
        workers_serializer = WorkerSerializer(data=worker_data)
        if workers_serializer.is_valid():
            workers_serializer.save()
            return JsonResponse(workers_serializer.data, status=status.HTTP_201_CREATED) 
        return JsonResponse(workers_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    elif request.method == 'DELETE':
        count = worker.objects.all().delete()
        return JsonResponse({'message': '{} Workers were deleted successfully!'.format(count[0])}, status=status.HTTP_204_NO_CONTENT)
 
 
@api_view(['GET', 'PUT', 'DELETE'])
def worker_detail(request, pk):
    try: 
        Worker = worker.objects.get(pk=pk) 
    except worker.DoesNotExist: 
        return JsonResponse({'message': 'The worker does not exist'}, status=status.HTTP_404_NOT_FOUND) 
 
    if request.method == 'GET': 
        worker_serializer = WorkerSerializer(Worker) 
        return JsonResponse(worker_serializer.data) 
 
    elif request.method == 'PUT': 
        worker_data = JSONParser().parse(request) 
        worker_serializer = WorkerSerializer(Worker, data=worker_data) 
        if worker_serializer.is_valid(): 
            worker_serializer.save() 
            return JsonResponse(worker_serializer.data) 
        return JsonResponse(worker_serializer.errors, status=status.HTTP_400_BAD_REQUEST) 
 
    elif request.method == 'DELETE': 
        Worker.delete() 
        return JsonResponse({'message': 'Tutorial was deleted successfully!'}, status=status.HTTP_204_NO_CONTENT)

# payment***********************************************************************************************************************
@api_view(['GET', 'POST', 'DELETE'])
def workerpay_list(request):
    if request.method == 'GET':
        workerspay = WorkerPayment.objects.all()

        transaction = request.GET.get('transaction', None)
        
        if transaction is not None:
            workerspay = workerspay.filter(title__icontains=transaction)
        
        workerspay_serializer = WorkerPaySerializer(workerspay, many=True)
        return JsonResponse(workerspay_serializer.data, safe=False)
        # 'safe=False' for objects serialization
 
    elif request.method == 'POST':
        worker_data = JSONParser().parse(request)
        workerspay_serializer = WorkerPaySerializer(data=worker_data)
        if workerspay_serializer.is_valid():
            workerspay_serializer.save()
            return JsonResponse(workerspay_serializer.data, status=status.HTTP_201_CREATED) 
        return JsonResponse(workerspay_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    elif request.method == 'DELETE':
        count = WorkerPayment.objects.all().delete()
        return JsonResponse({'message': '{} Workers payments were deleted successfully!'.format(count[0])}, status=status.HTTP_204_NO_CONTENT)
 
 
@api_view(['GET', 'PUT', 'DELETE'])
def workerpay_detail(request, pk):
    try: 
        Worker = WorkerPayment.objects.get(pk=pk) 
    except WorkerPayment.DoesNotExist: 
        return JsonResponse({'message': 'The worker does not exist'}, status=status.HTTP_404_NOT_FOUND) 
 
    if request.method == 'GET': 
        worker_serializer = WorkerPaySerializer(Worker) 
        return JsonResponse(worker_serializer.data) 
 
    elif request.method == 'PUT': 
        worker_data = JSONParser().parse(request) 
        worker_serializer = WorkerPaySerializer(Worker, data=worker_data) 
        if worker_serializer.is_valid(): 
            worker_serializer.save() 
            return JsonResponse(worker_serializer.data) 
        return JsonResponse(worker_serializer.errors, status=status.HTTP_400_BAD_REQUEST) 
 
    elif request.method == 'DELETE': 
        Worker.delete() 
        return JsonResponse({'message': 'Worker Payment was deleted successfully!'}, status=status.HTTP_204_NO_CONTENT)


@api_view(['GET', 'POST', 'DELETE'])
def trip_list(request):
    if request.method == 'GET':
        workers = worker.objects.all()

        name = request.GET.get('name', None)
        
        if name is not None:
            workers = workers.filter(title__icontains=name)
        
        workers_serializer = TripSerializer(workers, many=True)
        return JsonResponse(workers_serializer.data, safe=False)