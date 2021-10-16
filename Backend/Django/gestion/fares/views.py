from django.shortcuts import render

# Create your views here.
from django.http.response import JsonResponse
from rest_framework.parsers import JSONParser 
from rest_framework import status
 
from fares.models import fares
from fares.serializers import FaresSerializer
from rest_framework.decorators import api_view


@api_view(['GET', 'POST', 'DELETE'])
def fare_list(request):
    if request.method == 'GET':
        fare = fares.objects.all()

        name = request.GET.get('name', None)
        
        if name is not None:
            fare = fares.filter(title__icontains=name)
        
        fares_serializer = FaresSerializer(fare, many=True)
        return JsonResponse(fares_serializer.data, safe=False)
        # 'safe=False' for objects serialization
 
    elif request.method == 'POST':
        fare_data = JSONParser().parse(request)
        fares_serializer = FaresSerializer(data=fare_data)
        if fares_serializer.is_valid():
            fares_serializer.save()
            return JsonResponse(fares_serializer.data, status=status.HTTP_201_CREATED) 
        return JsonResponse(fares_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    elif request.method == 'DELETE':
        count = fares.objects.all().delete()
        return JsonResponse({'message': '{} Fare were deleted successfully!'.format(count[0])}, status=status.HTTP_204_NO_CONTENT)
 
 
@api_view(['GET', 'PUT', 'DELETE'])
def fare_detail(request, pk):
    try: 
        Fare = fares.objects.get(pk=pk) 
    except fares.DoesNotExist: 
        return JsonResponse({'message': 'The fare does not exist'}, status=status.HTTP_404_NOT_FOUND) 
 
    if request.method == 'GET': 
        fares_serializer = FaresSerializer(Fare) 
        return JsonResponse(fares_serializer.data) 
 
    elif request.method == 'PUT': 
        fare_data = JSONParser().parse(request) 
        fares_serializer = FaresSerializer(Fare, data=fare_data) 
        if fares_serializer.is_valid(): 
            fares_serializer.save() 
            return JsonResponse(fares_serializer.data) 
        return JsonResponse(fares_serializer.errors, status=status.HTTP_400_BAD_REQUEST) 
 
    elif request.method == 'DELETE': 
        Fare.delete() 
        return JsonResponse({'message': 'Fare was deleted successfully!'}, status=status.HTTP_204_NO_CONTENT)
