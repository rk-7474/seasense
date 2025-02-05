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
  description: string
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
    name: "Venetian Lighthouse",
    position: [45.4347, 12.3397],
    description: "Historic lighthouse with stunning views of the lagoon",
    type: "Coastal Landmark",
    metrics: {
      co2: 45,  // mg/L
      ph: 7.5,  // pH scale
      temperature: 22  // °C
    }
  },
  {
    id: 2,
    name: "Murano Glass Factory",
    position: [45.4400, 12.3500],
    description: "Famous for exquisite glass-making techniques",
    type: "Cultural Site",
    metrics: {
      co2: 50,  // mg/L
      ph: 7.2,  // pH scale
      temperature: 24  // °C
    }
  },
  {
    id: 3,
    name: "Lido Beach",
    position: [45.4210, 12.3600],
    description: "Popular beach destination with golden sands",
    type: "Recreational Area",
    metrics: {
      co2: 40,  // mg/L
      ph: 8.0,  // pH scale
      temperature: 25  // °C
    }
  },
  {
    id: 4,
    name: "Giudecca Island",
    position: [45.4320, 12.3000],
    description: "Quiet island known for its gardens and views",
    type: "Island",
    metrics: {
      co2: 55,  // mg/L
      ph: 7.8,  // pH scale
      temperature: 23  // °C
    }
  },
  {
    id: 5,
    name: "Sant'Elena Park",
    position: [45.4260, 12.3470],
    description: "A serene park with walking paths and greenery",
    type: "Park",
    metrics: {
      co2: 42,  // mg/L
      ph: 7.4,  // pH scale
      temperature: 21  // °C
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
        zoom={15} 
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
            <Popup>
              <div className="text-sm font-medium">{location.name}</div>
              <div className="text-xs text-gray-500">{location.type}</div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  )
}
