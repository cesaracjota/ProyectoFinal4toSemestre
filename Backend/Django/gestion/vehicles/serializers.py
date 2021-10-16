from rest_framework import serializers 
from vehicles.models import vehicle, rent_info
from drf_extra_fields.fields import Base64ImageField

class VehiclesSerializer(serializers.ModelSerializer):
    
    photo= Base64ImageField()

    class Meta:
        model = vehicle
        fields = ('__all__')

class RentInfoSerializer(serializers.ModelSerializer):
    # vehicle = serializers.SlugRelatedField(slug_field='number',
    #                                     read_only=True)
    class Meta:
        model = rent_info
        fields = ('__all__')

    def to_representation(self, instance):
        return {
            'id': instance.id,
            'amount': instance.amount,
            'vehicle': instance.vehicle.number,
            'placa': instance.vehicle.id
        }