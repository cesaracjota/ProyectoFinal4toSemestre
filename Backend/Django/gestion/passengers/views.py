from django.shortcuts import render

from django.http.response import JsonResponse
from rest_framework.parsers import JSONParser 
from rest_framework import status
 
from passengers.models import passenger
from passengers.serializers import PassengerSerializer
from rest_framework.decorators import api_view


@api_view(['GET', 'POST', 'DELETE'])
def passenger_list(request):
    if request.method == 'GET':
        passengers = passenger.objects.all()

        name = request.GET.get('name', None)
        
        if name is not None:
            passengers = passengers.filter(title__icontains=name)
        
        passengers_serializer = PassengerSerializer(passengers, many=True)
        return JsonResponse(passengers_serializer.data, safe=False)
        # 'safe=False' for objects serialization
 
    elif request.method == 'POST':
        passenger_data = JSONParser().parse(request)
        passengers_serializer = PassengerSerializer(data=passenger_data)
        if passengers_serializer.is_valid():
            passengers_serializer.save()
            return JsonResponse(passengers_serializer.data, status=status.HTTP_201_CREATED) 
        return JsonResponse(passengers_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    elif request.method == 'DELETE':
        count = passenger.objects.all().delete()
        return JsonResponse({'message': '{} Passenger were deleted successfully!'.format(count[0])}, status=status.HTTP_204_NO_CONTENT)
 
 
@api_view(['GET', 'PUT', 'DELETE'])
def passenger_detail(request, pk):
    try: 
        Passenger = passenger.objects.get(pk=pk) 
    except passenger.DoesNotExist: 
        return JsonResponse({'message': 'The passenger does not exist'}, status=status.HTTP_404_NOT_FOUND) 
 
    if request.method == 'GET': 
        passenger_serializer = PassengerSerializer(Passenger) 
        return JsonResponse(passenger_serializer.data) 
 
    elif request.method == 'PUT': 
        passenger_data = JSONParser().parse(request) 
        passenger_serializer = PassengerSerializer(Passenger, data=passenger_data) 
        if passenger_serializer.is_valid(): 
            passenger_serializer.save() 
            return JsonResponse(passenger_serializer.data) 
        return JsonResponse(passenger_serializer.errors, status=status.HTTP_400_BAD_REQUEST) 
 
    elif request.method == 'DELETE': 
        Passenger.delete() 
        return JsonResponse({'message': 'Passenger was deleted successfully!'}, status=status.HTTP_204_NO_CONTENT)

#@api_view(['GET'])
#def worker_stutus_active(request):
   # workers = worker.objects.filter(status='A')
        
 #   if request.method == 'GET': 
  #      
   #     worker_serializer = WorkerSerializer(workers, many=True)
    #    return JsonResponse(worker_serializer.data, safe=False)