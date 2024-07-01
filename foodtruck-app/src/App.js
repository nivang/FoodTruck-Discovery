import React, { useRef, useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax

mapboxgl.accessToken = process.env.REACT_APP_MAP_BOX_TOKEN;

export default function App() {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(-122.39988421);
  const [lat, setLat] = useState(37.78845703);
  const [zoom, setZoom] = useState(16.5);
  const [foodTruckLocations, setFoodTruckLocations] = useState({});
  const [mapMarkers, setMapMarkers] = useState([]);
  const [inputs, setInputs] = useState({});

  const handleSubmit = (event) => {
    console.log(inputs);
  }

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(process.env.REACT_APP_API_URL+"?posLat=" + lat + "&posLon=" + lng + "&radius=5")
        .then((resp) => {
          const resultData = resp.data;
          setFoodTruckLocations(resultData);
        })
        .catch(err => console.log("err: ", err));

    }

    fetchData();

  }, [lat, lng, zoom]);


  useEffect(() => {
    if (!map.current) { // initialize map only once
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v12',
        center: [lng, lat],
        zoom: zoom
      });

      map.current.on('move', () => {
        setLng(map.current.getCenter().lng.toFixed(4));
        setLat(map.current.getCenter().lat.toFixed(4));
        setZoom(map.current.getZoom().toFixed(2));
      });
    }

    // new mapboxgl.Marker().setLngLat([lng, lat]).addTo(map.current);

    // removing
    mapMarkers.forEach((marker) => marker.remove())

    let markers = []
    foodTruckLocations["Food Trucks"]?.map((location) => {
      const marker = new mapboxgl.Marker()
        .setLngLat([location.longitude, location.latitude])
        .setPopup(
          new mapboxgl.Popup({ offset: 25 })
            .setHTML(`<h3>${location.applicant}</h3>`)
        )
        .addTo(map.current);
      markers.push(marker);
      return marker;
    });
    setMapMarkers(markers);

  }, [foodTruckLocations, lat, lng, zoom]);

  return (
    <div>
      <div className="sidebar">
        Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
      </div>
      <div ref={mapContainer} className="map-container" />
      <form onSubmit={handleSubmit}>
        <label>Longitude:
          <input
            type="number"
            name="longitude"
            value={inputs.longitude || ""}
          />
        </label>
        <label>Latitude:
          <input
            type="number"
            name="latitude"
            value={inputs.latitude || ""}
          />
        </label>
        <input type="submit" />
      </form>
    </div>
  );
}