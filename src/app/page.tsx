"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function Home() {
  const router = useRouter();
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [videoError, setVideoError] = useState(false);

  // Fallback to show content if video takes too long or fails
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isVideoLoaded) {
        setIsVideoLoaded(true);
        console.warn('Video load timeout - showing content anyway');
      }
    }, 3000); // 3 second timeout

    return () => clearTimeout(timer);
  }, [isVideoLoaded]);
  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* Loading State */}
      {!isVideoLoaded && (
        <div className="absolute inset-0 bg-black z-50 flex items-center justify-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
      
      {/* Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        onLoadedData={() => setIsVideoLoaded(true)}
        onError={(e) => {
          console.error('Video loading error:', e);
          setVideoError(true);
          setIsVideoLoaded(true);
        }}
        className={`absolute top-0 left-0 w-full h-full object-cover z-0 transition-opacity duration-1000 ${
          isVideoLoaded ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <source
          src="/ocean-background.mp4"
          type="video/mp4"
        />
      </video>

      {/* Overlay */}
      <div className="absolute top-0 left-0 w-full h-full bg-black/40 z-10" />

      {/* Content */}
      <div className={`relative z-20 min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 text-white transition-opacity duration-1000 ${
        isVideoLoaded ? 'opacity-100' : 'opacity-0'
      }`}>
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl sm:text-7xl hover:scale-105 transition-all font-bold mb-6 drop-shadow-2xl shadow-white tracking-tighter bg-gradient-to-r from-sky-400 to-blue-600 text-transparent bg-clip-text animate-gradient"> 
            SeaSense
          </h1>
          <h2 className="text-2xl sm:text-4xl font-bold mb-6 tracking-tight">
            Listening to the Ocean's Whisper
          </h2>
          <p className="text-lg sm:text-xl mb-8 text-gray-200 max-w-2xl mx-auto">
            Dive into comprehensive ocean data analysis, research, and monitoring.
            Let the sea understand itself like never before.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-blue-600 w-60 h-12 text-xl font-bold hover:bg-blue-700 text-white"
              onClick={() => router.push('/map')}
            >
              See the map
            </Button>
          </div>
        </div>

        {/* Features */}
        <div className="mt-20 grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-6xl mx-auto px-4">
          <div className="backdrop-blur-sm bg-white/10 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-3">Real-time Analysis</h3>
            <p className="text-gray-200">
              Monitor ocean conditions with live data streams and advanced analytics
            </p>
          </div>
          <div className="backdrop-blur-sm bg-white/10 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-3">Research Tools</h3>
            <p className="text-gray-200">
              Access powerful tools for marine research and data visualization
            </p>
          </div>
          <div className="backdrop-blur-sm bg-white/10 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-3">Global Coverage</h3>
            <p className="text-gray-200">
              Study oceans worldwide with comprehensive geographical data
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
