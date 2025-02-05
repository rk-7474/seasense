'use client'

import { useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import LocationCard from './LocationCard'

// Fix for default markers
const icon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
})

interface Location {
  id: number
  name: string
  position: [number, number]
  description?: string
  type: string
  metrics: {
    co2: number
    ph: number
    temperature: number
  }
}

const locations: Location[] = [
  {
    id: 1,
    name: "Sensor 1",
    position: [45.414403, 12.288523],
    type: "Fixed sensor",
    description: "Coastal floating sensor",
    metrics: {
      co2: 45,  // mg/L
      ph: 8.1,  // pH scale
      temperature: 22  // °C
    }
  },
  {
    id: 2,
    name: "Water station",
    position: [45.389895, 12.301345],
    type: "Data tower sensor",
    description: "Stationary water monitoring",
    metrics: {
      co2: 50,  // mg/L
      ph: 7.2,  // pH scale
      temperature: 24  // °C
    }
  },
  {
    id: 3,
    name: "Sensor 2",
    position: [45.465775, 12.334476],
    description: "Coastal floating sensor",
    type: "Fixed sensor",
    metrics: {
      co2: 40,  // mg/L
      ph: 8.0,  // pH scale
      temperature: 25  // °C
    }
  },
  {
    id: 4,
    name: "ROV Sensor",
    position: [45.477042, 12.371589],
    description: "Movable water vehicle",
    type: "Movable sensor",
    metrics: {
      co2: 55,  // mg/L
      ph: 7.8,  // pH scale
      temperature: 23  // °C
    }
  }
];


export default function Map() {
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null)
  const [isCardVisible, setIsCardVisible] = useState(false)
  const veniceCenter: [number, number] = [45.4371908, 12.3345898]

  const handleLocationSelect = (location: Location) => {
    setSelectedLocation(location)
    setIsCardVisible(true)
  }

  const handleClose = () => {
    setIsCardVisible(false)
  }

  return (
    <div className="relative w-full h-screen">
      {selectedLocation && (
        <LocationCard
          location={selectedLocation}
          onClose={handleClose}
          show={isCardVisible}
        />
      )}
      
      <MapContainer 
        center={veniceCenter}
        zoom={12} 
        minZoom={5} 
        scrollWheelZoom={true}
        style={{ width: '100%', height: '100%' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {locations.map((location) => (
          <Marker 
            key={location.id}
            position={location.position}
            icon={icon}
            eventHandlers={{
              click: () => handleLocationSelect(location),
            }}
          >
            {/* <Popup>
              <div className="text-sm font-medium">{location.name}</div>
              <div className="text-xs text-gray-500">{location.type}</div>
            </Popup> */}
          </Marker>
        ))}
      </MapContainer>
    </div>
  )
}
