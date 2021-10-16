from django.shortcuts import render

# Create your views here.
from django.http.response import JsonResponse
from rest_framework.parsers import JSONParser 
from rest_framework import status
 
from coupons.models import coupons
from coupons.serializers import CouponsSerializer
from rest_framework.decorators import api_view


@api_view(['GET', 'POST', 'DELETE'])
def coupon_list(request):
    if request.method == 'GET':
        coupon = coupons.objects.all()

        name = request.GET.get('name', None)
        
        if name is not None:
            coupon = coupons.filter(title__icontains=name)
        
        coupons_serializer = CouponsSerializer(coupon, many=True)
        return JsonResponse(coupons_serializer.data, safe=False)
        # 'safe=False' for objects serialization
 
    elif request.method == 'POST':
        coupon_data = JSONParser().parse(request)
        coupons_serializer = CouponsSerializer(data=coupon_data)
        if coupons_serializer.is_valid():
            coupons_serializer.save()
            return JsonResponse(coupons_serializer.data, status=status.HTTP_201_CREATED) 
        return JsonResponse(coupons_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    elif request.method == 'DELETE':
        count = coupons.objects.all().delete()
        return JsonResponse({'message': '{} Coupon were deleted successfully!'.format(count[0])}, status=status.HTTP_204_NO_CONTENT)
 
 
@api_view(['GET', 'PUT', 'DELETE'])
def coupon_detail(request, pk):
    try: 
        Coupon = coupons.objects.get(pk=pk) 
    except coupons.DoesNotExist: 
        return JsonResponse({'message': 'The coupon does not exist'}, status=status.HTTP_404_NOT_FOUND) 
 
    if request.method == 'GET': 
        coupons_serializer = CouponsSerializer(Coupon) 
        return JsonResponse(coupons_serializer.data) 
 
    elif request.method == 'PUT': 
        coupon_data = JSONParser().parse(request) 
        coupons_serializer = CouponsSerializer(Coupon, data=coupon_data) 
        if coupons_serializer.is_valid(): 
            coupons_serializer.save() 
            return JsonResponse(coupons_serializer.data) 
        return JsonResponse(coupons_serializer.errors, status=status.HTTP_400_BAD_REQUEST) 
 
    elif request.method == 'DELETE': 
        Coupon.delete() 
        return JsonResponse({'message': 'Coupon was deleted successfully!'}, status=status.HTTP_204_NO_CONTENT)
