'use client'

import dynamic from 'next/dynamic'

const Map = dynamic(() => import('@/components/Map'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="text-lg text-muted-foreground">Loading map...</div>
    </div>
  )
})

export default function MapPage() {
  return (
    <div className="w-full h-screen">
      <Map />
    </div>
  )
}
