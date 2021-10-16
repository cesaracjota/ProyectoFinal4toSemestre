from django.shortcuts import render

# Create your views here.
from django.http.response import JsonResponse
from rest_framework.parsers import JSONParser 
from rest_framework import status
 
from coordinates.models import Coordinates
from coordinates.serializers import CoordinatesSerializer
from rest_framework.decorators import api_view


@api_view(['GET', 'POST', 'DELETE'])
def coordinates_list(request):
    if request.method == 'GET':
        coordinates = Coordinates.objects.all()

        name = request.GET.get('name', None)
        
        if name is not None:
            coordinates = Coordinates.filter(title__icontains=name)
        
        coordinate_serializer = CoordinatesSerializer(coordinates, many=True)
        return JsonResponse(coordinate_serializer.data, safe=False)
        # 'safe=False' for objects serialization
 
    elif request.method == 'POST':
        coordinate_data = JSONParser().parse(request)
        coordinate_serializer = CoordinatesSerializer(data=coordinate_data)
        if coordinate_serializer.is_valid():
            coordinate_serializer.save()
            return JsonResponse(coordinate_serializer.data, status=status.HTTP_201_CREATED) 
        return JsonResponse(coordinate_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    elif request.method == 'DELETE':
        count = Coordinates.objects.all().delete()
        return JsonResponse({'message': '{} Coordinate were deleted successfully!'.format(count[0])}, status=status.HTTP_204_NO_CONTENT)
 
 
@api_view(['GET', 'PUT', 'DELETE'])
def coordinate_detail(request, pk):
    try: 
        Coordinate = Coordinates.objects.get(pk=pk) 
    except Coordinates.DoesNotExist: 
        return JsonResponse({'message': 'The Coordinate does not exist'}, status=status.HTTP_404_NOT_FOUND) 
 
    if request.method == 'GET': 
        coordinate_serializer = CoordinatesSerializer(Coordinate) 
        return JsonResponse(coordinate_serializer.data) 
 
    elif request.method == 'PUT': 
        coordinate_data = JSONParser().parse(request) 
        coordinate_serializer = CoordinatesSerializer(Coordinate, data=coordinate_data) 
        if coordinate_serializer.is_valid(): 
            coordinate_serializer.save() 
            return JsonResponse(coordinate_serializer.data) 
        return JsonResponse(coordinate_serializer.errors, status=status.HTTP_400_BAD_REQUEST) 
 
    elif request.method == 'DELETE': 
        Coordinate.delete() 
        return JsonResponse({'message': 'Coordinate was deleted successfully!'}, status=status.HTTP_204_NO_CONTENT)
