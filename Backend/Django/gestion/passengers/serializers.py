from rest_framework import serializers 
from passengers.models import passenger
from django.contrib.auth.hashers import make_password
 
 
class PassengerSerializer(serializers.ModelSerializer):
 
    class Meta:
        model = passenger
        fields = ('__all__')

    def create(self, validated_data):
        user= passenger(**validated_data)
        user.set_password(validated_data['password'])
        user.save()
        return user
    
    def update(self, instance,validated_data):
        updated_user = super().update(instance,validated_data)
        updated_user.set_password(validated_data['password'])
        updated_user.save()
        return updated_user