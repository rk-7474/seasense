'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Image from 'next/image'
import { SensorData } from "@/app/actions"
import dynamic from 'next/dynamic'

const SensorCharts = dynamic(
  () => import('@/components/SensorCharts').then(mod => mod.default),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-64 text-white text-xl flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin"/>
      </div>
    )
  }
);

export default function ClientSensorInfo({ sensor }: { sensor: SensorData }) {
  return (
    <div className="min-h-screen">
      <div className="w-full h-full bg-repeat bg-cover">
        <div className="container mx-auto p-8 space-y-8">
          <h1 className="text-4xl font-bold mb-8">BOA Sensor Details</h1>
          
          <Image 
            className="fixed right-10 top-0 m-0 z-[1000] opacity-65 hover:opacity-100 hover:scale-110 transition-all cursor-pointer" 
            alt="planck-logo" 
            src="/planck_team_logo.png" 
            width={65} 
            height={50}
          />
          
          <div className="space-y-6 mb-12">
            <Card className="bg-[url('/ocean.jpg')]">
              <div className="backdrop-blur-md w-full h-full overflow-hidden shadow-2xl shadow-cyan-800 rounded-lg">
                <CardHeader>
                  <CardTitle className="text-2xl text-white">{sensor.name}</CardTitle>
                  <div className="text-gray-300">
                    <p>{sensor.description}</p>
                    <p>Type: {sensor.type}</p>
                    <p>Coordinates: {sensor.coordinates}</p>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 gap-4 mb-8">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-xl">Average pH</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-3xl font-bold">{sensor.averages.ph.toFixed(2)}</div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-xl">Average Temperature</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-3xl font-bold">{sensor.averages.temperature.toFixed(1)}°C</div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-xl">Average CO₂</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-3xl font-bold">{sensor.averages.co2.toFixed(0)} ppm</div>
                      </CardContent>
                    </Card>
                  </div>

                  <SensorCharts sensor={sensor} />
                </CardContent>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
