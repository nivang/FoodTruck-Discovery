from rest_framework import serializers
from .models import FoodTruck

class FoodTruckSerializer(serializers.ModelSerializer):
    class Meta:
        model = FoodTruck
        # fields = ['locationId', 'applicant', 'facilityType', 'cnn', 'locationDescription', 'address', 'blocklot', 'block', 'lot', 'permit', 'status', 'foodItems', 'x', 'y', 'latitude', 'longitude', 'schedule', 'dayHours', 'NOISent', 'approved', 'recieved', 'priorPermit', 'expirationDate', 'location', 'firePreventionDistrict', 'policeDistricts', 'supervisorDistrict', 'zipCode', 'neighborhood']
        fields = ['applicant', 'address', 'foodItems', 'latitude', 'longitude']