from math import sin, cos, sqrt, atan2, radians

def compareDistance(posLat, posLon, tarLat, tarLon, r):
    radius = 6373.0
    dlon = tarLon - posLon
    dlat = tarLat - posLat
    a = sin(dlat / 2)**2 + cos(posLat) * cos(tarLat) * sin(dlon / 2)**2
    c = 2 * atan2(sqrt(a), sqrt(1 - a))
    distance = radius * c

    if distance <= r:
        return True
    else:
        return False