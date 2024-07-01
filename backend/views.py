from django.http import JsonResponse
from .models import FoodTruck
from .serializers import FoodTruckSerializer
from .distance import compareDistance
from django.shortcuts import render

def FoodTruckList(request):
    trucks = FoodTruck.objects.all()
    serializer = FoodTruckSerializer(trucks, many=True)
    return JsonResponse({"Food Trucks": serializer.data})

def getLocations(request):
    posLat = request.GET.get('posLat', 0)
    posLon = request.GET.get('posLon', 0)
    radius = request.GET.get('radius', 5)

    validPositions = []
    for i in FoodTruck.objects.all():
        if (compareDistance(float(posLat), float(posLon), float(i.latitude), float(i.longitude), float(radius)) == True):
            validPositions.append(i.id)
            print(str(i.latitude) + " " + str(i.longitude))
    
    trucks = FoodTruck.objects.filter(id__in=validPositions)
    serializer = FoodTruckSerializer(trucks, many=True)
    return JsonResponse({"Food Trucks": serializer.data})

def index(request):
    return render(request, 'index.html')