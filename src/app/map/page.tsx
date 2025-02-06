'use client'

import dynamic from 'next/dynamic'

const Map = dynamic(() => import('@/components/Map'), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 bg-black z-50 flex items-center justify-center">
      <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
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
