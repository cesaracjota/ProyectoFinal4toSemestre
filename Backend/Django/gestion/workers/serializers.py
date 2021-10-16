
from rest_framework import serializers 
from workers.models import worker, WorkerPayment
from drf_extra_fields.fields import Base64ImageField

 
class WorkerSerializer(serializers.ModelSerializer):
    # rent_info = serializers.SlugRelatedField(slug_field='id',
    #                                     read_only=True)
    photo = Base64ImageField(required=False)
    class Meta:
        model = worker
        fields = ('__all__')

    def to_representation(self, instance):
        data =super(WorkerSerializer, self).to_representation(instance)
        print(instance)
        data['rent_info2'] = instance.rent_info.vehicle.number
        data['amount'] = instance.rent_info.amount
        data['id_rent'] = instance.rent_info.id
        data.update()
        return data

class WorkerPaySerializer(serializers.ModelSerializer):
    # name =serializers.SlugRelatedField(slug_field='name',
    #                                     many=True,
    #                                     read_only=True,)

    class Meta:
        model = WorkerPayment
        fields = (
                    'transaction',
                    'name',
                    'date',
                    'amount',
                    'status',
                    'commission')
    
    def to_representation(self, instance):
        return {
            'transaction': instance.transaction,
            'date': instance.date,
            'amount': instance.amount,
            'status': instance.status,
            'commission': instance.commission,
            'name': instance.name.name
            }


class TripSerializer(serializers.ModelSerializer):
    class Meta:
        model = worker
        fields = ('__all__')
    def to_representation(self, instance):
        data =super(TripSerializer, self).to_representation(instance)
        data['vehicle'] = instance.rent_info.vehicle.number
        data.update()
        return data