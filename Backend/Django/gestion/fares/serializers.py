from rest_framework import serializers 
from fares.models import fares

class FaresSerializer(serializers.ModelSerializer):

    class Meta:
        model = fares
        fields = (
                  'fare_per_km',
                  'minimum_fare',
                  'minimun_distance',
                  'waiting_fare',
                  'type')