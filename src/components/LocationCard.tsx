'use client'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card"
import { Transition } from '@headlessui/react'
import { AlertTriangle } from 'lucide-react'

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

interface LocationCardProps {
  location: Location
  onClose: () => void
  show: boolean
}

export default function LocationCard({ location, onClose, show }: LocationCardProps) {
  const metrics = location.metrics
  const isPhHigh = metrics.ph > 7.9

  return (
    <div className="absolute top-4 right-4 z-[1000] w-80">
      <Transition
        show={show}
        appear={true}
        enter="transition-all duration-300"
        enterFrom="opacity-0 translate-x-5"
        enterTo="opacity-100 translate-x-0"
        leave="transition-all duration-300"
        leaveFrom="opacity-100 translate-x-0"
        leaveTo="opacity-0 translate-x-5"
        afterLeave={onClose}
      >
        <Card className="backdrop-blur-sm bg-white/95">
          <CardHeader>
            <CardTitle className="text-xl">{location.name}</CardTitle>
            <CardDescription className="text-sm font-medium">
              {location.type}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              {location.description}
            </p>
            
            {/* Metrics Graph */}
            <div className="space-y-3 mb-4">
              {/* CO2 Level */}
              <div className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span>CO2 Level</span>
                  <span>{metrics.co2}</span>
                </div>
                <div className="h-2 bg-blue-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-blue-500 rounded-full transition-all duration-500 ease-out"
                    style={{ width: `${metrics.co2}%` }}
                  />
                </div>
              </div>

              {/* pH Level */}
              <div className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span>pH Level</span>
                  <span>{metrics.ph}</span>
                </div>
                <div className="h-2 bg-blue-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-blue-500 rounded-full transition-all duration-500 ease-out"
                    style={{ width: `${metrics.ph / 14 * 100}%` }}
                  />
                </div>
              </div>

              {/* Water Temperature */}
              <div className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span>Water Temperature</span>
                  <span>{metrics.temperature}°C</span>
                </div>
                <div className="h-2 bg-blue-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-blue-500 rounded-full transition-all duration-500 ease-out"
                    style={{ width: `${metrics.temperature/35 * 100}%` }}
                  />
                </div>
              </div>

              {/* Warning Message */}
              {isPhHigh && (
                <div className="flex items-center gap-2 p-3 mh-4 bg-yellow-50 border border-yellow-200 rounded-md">
                  <AlertTriangle className="h-10 w-10 mr-4 text-yellow-600" />
                  <p className="text-sm text-yellow-700">
                    High pH level detected. Water quality may be affected.
                  </p>
                </div>
              )}
            </div>

            <div className="flex gap-2">
              <Button 
                variant="default" 
                size="sm"
                className="flex-1"
              >
                More Info
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => onClose()}
                className="flex-1"
              >
                Close
              </Button>
            </div>
          </CardContent>
        </Card>
      </Transition>
    </div>
  )
}
