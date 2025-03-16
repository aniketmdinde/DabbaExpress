import React, { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import axios from 'axios';

// Fix for default marker icons in React
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Component to handle location changes and map updates
function LocationMarker({ setUserLocation, providers, setNearbyProviders }) {
  const [position, setPosition] = useState(null);
  const [draggable, setDraggable] = useState(true);
  const markerRef = useRef(null);
  const map = useMap();
  
  // Calculate distance between two points using Leaflet's method
  const calculateDistance = (point1, point2) => {
    return map.distance(point1, point2) / 1000; // Convert to kilometers
  };
  
  // Find providers within 5km radius
  const findNearbyProviders = (location) => {
    if (!providers || !location) return [];
    
    const nearby = providers.filter(provider => {
      const providerLocation = [provider.user.latitude, provider.user.longitude];
      const distance = calculateDistance(location, providerLocation);
      return distance <= 5; // 5km radius
    });
    
    setNearbyProviders(nearby);
    return nearby;
  };
  
  // Handle marker drag end
  const handleDragEnd = () => {
    const marker = markerRef.current;
    if (marker) {
      const newPosition = marker.getLatLng();
      setPosition([newPosition.lat, newPosition.lng]);
      setUserLocation([newPosition.lat, newPosition.lng]);
      findNearbyProviders([newPosition.lat, newPosition.lng]);
    }
  };
  
  // Get user's current location
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (location) => {
        const { latitude, longitude } = location.coords;
        setPosition([latitude, longitude]);
        setUserLocation([latitude, longitude]);
        map.flyTo([latitude, longitude], 13);
        findNearbyProviders([latitude, longitude]);
      },
      (error) => {
        console.error("Error getting location:", error);
        // Default location if user denies permission
        setPosition([20.5937, 78.9629]); // Default to center of India
        setUserLocation([20.5937, 78.9629]);
        map.flyTo([20.5937, 78.9629], 5);
      }
    );
  }, [map, providers, setUserLocation]);
  
  return position === null ? null : (
    <>
      <Marker 
        position={position}
        draggable={draggable}
        ref={markerRef}
        eventHandlers={{
          dragend: handleDragEnd,
        }}
      >
        <Popup>Your location. Drag to change.</Popup>
      </Marker>
      <Circle 
        center={position} 
        radius={5000} 
        pathOptions={{ fillColor: 'blue', fillOpacity: 0.1, color: 'blue' }}
      />
    </>
  );
}

const TiffinMap = ({ providers, setNearbyProviders }) => {
  const [userLocation, setUserLocation] = useState([20.5937, 78.9629]); // Default to center of India
  
  return (
    <div className="mb-6">
      <h2 className="text-xl font-bold mb-3 text-orange-800">Nearby Tiffin Providers</h2>
      <div className="bg-white p-2 rounded-lg shadow-md border border-orange-200">
        <div style={{ height: '400px', width: '100%' }}>
          <MapContainer 
            center={userLocation} 
            zoom={13} 
            style={{ height: '100%', width: '100%' }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <LocationMarker 
              setUserLocation={setUserLocation} 
              providers={providers}
              setNearbyProviders={setNearbyProviders}
            />
            
            {/* Display markers for tiffin providers */}
            {providers && providers.map((provider, index) => (
              provider.user.latitude && provider.user.longitude ? (
                <Marker 
                  key={index} 
                  position={[provider.user.latitude, provider.user.longitude]}
                  icon={new L.Icon({
                    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-orange.png',
                    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
                    iconSize: [25, 41],
                    iconAnchor: [12, 41],
                    popupAnchor: [1, -34],
                    shadowSize: [41, 41]
                  })}
                >
                  <Popup>
                    <div>
                      <h3 className="font-bold">{provider.user.name}</h3>
                      <p>{provider.user.address}</p>
                      <p>Available: {provider.availableTime}</p>
                      <p>Half: ₹{provider.tiffin.half.price} | Full: ₹{provider.tiffin.full.price}</p>
                    </div>
                  </Popup>
                </Marker>
              ) : null
            ))}
          </MapContainer>
        </div>
        <div className="mt-3 p-2 bg-orange-50 rounded text-sm">
          <p>Showing tiffin providers within 5km of your location. Drag the blue marker to change your location.</p>
          <p className="font-semibold mt-1">Nearby providers: {setNearbyProviders ? (providers?.filter(p => p.user.latitude && p.user.longitude).length || 0) : 0}</p>
        </div>
      </div>
    </div>
  );
};

export default TiffinMap;
