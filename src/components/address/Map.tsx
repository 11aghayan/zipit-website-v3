"use client";

import {APIProvider, Map as GoogleMap, AdvancedMarker } from '@vis.gl/react-google-maps';

export default function Map_() {
  const position = { lat: 40.169634, lng: 44.522070 };
  
  return (
    <div className='w-full max-w-[1000px] mx-auto h-[500px] border-2'>
      <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string}>
        <GoogleMap 
          defaultCenter={position} 
          defaultZoom={19} 
          mapId='google-map' 
          fullscreenControl={true} 
          fullscreenControlOptions={{ position: 10 }} 
          className="w-full h-full"
        >
          <AdvancedMarker position={position} />
        </GoogleMap>
      </APIProvider>
    </div>
  );
}