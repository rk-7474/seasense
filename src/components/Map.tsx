'use client'

import { useState, useEffect } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import LocationCard from './LocationCard'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { Card } from './ui/card'
import Image from 'next/image'

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
  const [isMapLoaded, setIsMapLoaded] = useState(false)
  const veniceCenter: [number, number] = [45.4371908, 12.3345898]
  const router = useRouter();

  // Fallback to show map if loading takes too long
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isMapLoaded) {
        setIsMapLoaded(true);
        console.warn('Map load timeout - showing content anyway');
      }
    }, 3000); // 3 second timeout

    return () => clearTimeout(timer);
  }, [isMapLoaded]);

  const handleLocationSelect = (location: Location) => {
    setSelectedLocation(location)
    setIsCardVisible(true)
  }

  const handleClose = () => {
    setIsCardVisible(false)
  }

  return (
    <div className="relative w-full h-screen">
      {/* Loading State */}
      {!isMapLoaded && (
        <div className="absolute inset-0 bg-black z-50 flex items-center justify-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
      <Image className="absolute right-4 top-4 z-[1000] opacity-65 hover:opacity-100 hover:scale-110 transition-all cursor-pointer" alt="planck-logo" src="/planck_team_logo.png" width={55} height={40}/>
      <Button 
        className="absolute bottom-4 left-4 z-[1000] w-72 h-12 flex justify-center items-center hover:-translate-y-1 transition-all"
        onClick={() => router.push('/')}  
      >
        <ArrowLeft />Back to home
      </Button>
      <div className="absolute pointer-events-none w-full bottom-4 flex justify-center items-center z-[1000]">
          <h1 className="text-3xl hover:scale-110 pointer-events-auto cursor-default opacity-65 hover:opacity-100 transition-all sm:text-5xl font-bold drop-shadow-2xl mb-5 shadow-white tracking-tighter bg-gradient-to-r from-sky-400 to-blue-600 text-transparent bg-clip-text animate-gradient"> 
            SeaSense
          </h1>
      </div>
      <Card className="absolute flex justify-center items-center text-zinc-700 p-3 top-4 left-20 z-[1000] w-max cursor-help opacity-70 hover:opacity-100 shadow-lg transition-all">
        <p>Try to click on the map marks to see live data</p>
      </Card>
      {selectedLocation && (
        <LocationCard
          location={selectedLocation}
          onClose={handleClose}
          show={isCardVisible}
        />
      )}
      
      <div className={`w-full h-full transition-opacity duration-1000 ${
        isMapLoaded ? 'opacity-100' : 'opacity-0'
      }`}>
        <MapContainer 
          center={veniceCenter}
          zoom={12} 
          minZoom={5} 
          scrollWheelZoom={true}
          style={{ width: '100%', height: '100%' }}
          whenReady={() => setIsMapLoaded(true)}
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
    </div>
    
  )
}
