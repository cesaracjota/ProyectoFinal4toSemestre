from django.shortcuts import render

# Create your views here.

from django.http.response import JsonResponse
from rest_framework.parsers import JSONParser 
from rest_framework import status
 
from vehicles.models import vehicle, rent_info
from vehicles.serializers import VehiclesSerializer, RentInfoSerializer
from rest_framework.decorators import api_view


@api_view(['GET', 'POST', 'DELETE'])
def vehicle_list(request):
    if request.method == 'GET':
        vehicles = vehicle.objects.all()

        name = request.GET.get('name', None)
        
        if name is not None:
            vehicles = vehicle.filter(title__icontains=name)
        
        vehicles_serializer = VehiclesSerializer(vehicles, many=True)
        return JsonResponse(vehicles_serializer.data, safe=False)
        # 'safe=False' for objects serialization
 
    elif request.method == 'POST':
        vehicle_data = JSONParser().parse(request)
        vehicles_serializer = VehiclesSerializer(data=vehicle_data)
        if vehicles_serializer.is_valid():
            vehicles_serializer.save()
            return JsonResponse(vehicles_serializer.data, status=status.HTTP_201_CREATED) 
        return JsonResponse(vehicles_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    elif request.method == 'DELETE':
        count = vehicle.objects.all().delete()
        return JsonResponse({'message': '{} Vehicle were deleted successfully!'.format(count[0])}, status=status.HTTP_204_NO_CONTENT)
 
 
@api_view(['GET', 'PUT', 'DELETE'])
def vehicle_detail(request, pk):
    try: 
        Vehicle = vehicle.objects.get(pk=pk) 
    except vehicle.DoesNotExist: 
        return JsonResponse({'message': 'The vehicle does not exist'}, status=status.HTTP_404_NOT_FOUND) 
 
    if request.method == 'GET': 
        vehicles_serializer = VehiclesSerializer(Vehicle) 
        return JsonResponse(vehicles_serializer.data) 
 
    elif request.method == 'PUT': 
        vehicle_data = JSONParser().parse(request) 
        vehicles_serializer = VehiclesSerializer(Vehicle, data=vehicle_data) 
        if vehicles_serializer.is_valid(): 
            vehicles_serializer.save() 
            return JsonResponse(vehicles_serializer.data) 
        return JsonResponse(vehicles_serializer.errors, status=status.HTTP_400_BAD_REQUEST) 
 
    elif request.method == 'DELETE': 
        Vehicle.delete() 
        return JsonResponse({'message': 'Vehicle was deleted successfully!'}, status=status.HTTP_204_NO_CONTENT)
#+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
@api_view(['GET', 'POST', 'DELETE'])
def rent_list(request):
    if request.method == 'GET':
        vehicles = rent_info.objects.all()

        name = request.GET.get('id', None)
        
        if name is not None:
            vehicles = rent_info.filter(title__icontains=name)
        
        vehicles_serializer = RentInfoSerializer(vehicles, many=True)
        return JsonResponse(vehicles_serializer.data, safe=False)
        # 'safe=False' for objects serialization
 
    elif request.method == 'POST':
        vehicle_data = JSONParser().parse(request)
        print(vehicle_data)
        vehicles_serializer = RentInfoSerializer(data=vehicle_data)
        if vehicles_serializer.is_valid():
            vehicles_serializer.save()
            return JsonResponse(vehicles_serializer.data, status=status.HTTP_201_CREATED) 
        return JsonResponse(vehicles_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    elif request.method == 'DELETE':
        count = rent_info.objects.all().delete()
        return JsonResponse({'message': '{} Rent Vehicle were deleted successfully!'.format(count[0])}, status=status.HTTP_204_NO_CONTENT)
 
 
@api_view(['GET', 'PUT', 'DELETE'])
def rent_detail(request, pk):
    try: 
        rent = rent_info.objects.get(pk=pk) 
    except rent_info.DoesNotExist: 
        return JsonResponse({'message': 'The rent does not exist'}, status=status.HTTP_404_NOT_FOUND) 
 
    if request.method == 'GET': 
        vehicles_serializer = RentInfoSerializer(rent) 
        return JsonResponse(vehicles_serializer.data) 
 
    elif request.method == 'PUT': 
        vehicle_data = JSONParser().parse(request) 
        vehicles_serializer = RentInfoSerializer(rent, data=vehicle_data) 
        if vehicles_serializer.is_valid(): 
            vehicles_serializer.save() 
            return JsonResponse(vehicles_serializer.data) 
        return JsonResponse(vehicles_serializer.errors, status=status.HTTP_400_BAD_REQUEST) 
 
    elif request.method == 'DELETE': 
        rent.delete() 
        return JsonResponse({'message': 'Rent was deleted successfully!'}, status=status.HTTP_204_NO_CONTENT)