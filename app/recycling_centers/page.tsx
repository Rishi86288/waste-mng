"use client";
import React, { useEffect, useState, useRef } from 'react';
import {createRoot} from "react-dom/client";
import { APIProvider, Map, AdvancedMarker, Pin, useMap } from '@vis.gl/react-google-maps';
import { MarkerClusterer } from '@googlemaps/markerclusterer';

// आपके दिए गए लोकेशन्स
const locations = [
  // मुंबई (Mumbai - Recycling & Scrap Markets)
  { lat: 19.0413, lng: 72.8561 }, // Dharavi Plastic Recycling Zone
  { lat: 19.0760, lng: 72.8777 }, // Kurla Scrap Market
  { lat: 19.0490, lng: 72.9180 }, // Deonar Waste Management Area
  { lat: 19.1860, lng: 72.8485 }, // Malad E-waste dismantlers
  { lat: 19.3838, lng: 72.8276 }, // Vasai Industrial Recycling

  // दिल्ली (New Delhi - E-Waste & Metal Hubs)
  { lat: 28.6322, lng: 77.1264 }, // Mayapuri Industrial Area (Metal/Scrap)
  { lat: 28.5303, lng: 77.2799 }, // Okhla Industrial Estate (Waste to Energy/Recycling)
  { lat: 28.6640, lng: 77.2662 }, // Seelampur (Major E-waste Hub)
  { lat: 28.7963, lng: 77.0336 }, // Bawana Industrial Area
  { lat: 28.6253, lng: 77.3276 }, // Ghazipur Waste Management Site

  // बैंगलोर (Bangalore - Tech & Plastic Recycling)
  { lat: 13.0326, lng: 77.5147 }, // Peenya Industrial Area
  { lat: 12.9430, lng: 77.5255 }, // Nayandahalli Plastic Recycling Hub
  { lat: 12.8160, lng: 77.6775 }, // Bommasandra Industrial Area
  { lat: 12.9698, lng: 77.7499 }, // Whitefield E-waste processors
  { lat: 12.8996, lng: 77.4827 }, // Kengeri Scrap & Paper Recycling

  // चेन्नई (Chennai - Auto & Chemical Recycling)
  { lat: 13.0118, lng: 80.2078 }, // Guindy Industrial Estate
  { lat: 13.0963, lng: 80.1601 }, // Ambattur Industrial Estate
  { lat: 12.9654, lng: 80.2458 }, // Perungudi Waste Processing Zone
  { lat: 12.9743, lng: 80.1444 }, // Pallavaram Solid Waste Management
  { lat: 13.1672, lng: 80.2604 }, // Manali Industrial Recycling

  // अहमदाबाद (Ahmedabad - Textile & Plastic Recycling)
  { lat: 23.0722, lng: 72.6617 }, // Naroda Industrial Area
  { lat: 22.9566, lng: 72.6186 }, // Vatva GIDC
  { lat: 23.0232, lng: 72.6565 }, // Odhav GIDC
  { lat: 22.9813, lng: 72.4965 }, // Sarkhej Industrial Zone
  { lat: 22.9859, lng: 72.5714 }, // Pirana Waste Management Site

  // हैदराबाद (Hyderabad - Mixed Recycling)
  { lat: 17.5173, lng: 78.4735 }, // Jeedimetla Industrial Area
  { lat: 17.4646, lng: 78.4419 }, // Balanagar Scrap Market
  { lat: 17.4722, lng: 78.5830 }, // Cherlapally Industrial Hub

  // पुणे (Pune - Auto & Metal Scrap)
  { lat: 18.6277, lng: 73.8340 }, // Pimpri-Chinchwad (Bhosari MIDC)
  { lat: 18.5034, lng: 73.9317 }  // Hadapsar Industrial Area
];
// क्लस्टरर को हैंडल करने के लिए एक अलग कॉम्पोनेन्ट
const ClusteredMarkers = () => {
  const map = useMap();
  const [markers, setMarkers] = useState<{ [key: string]: google.maps.marker.AdvancedMarkerElement }>({});
  const clusterer = useRef<MarkerClusterer | null>(null);

  // क्लस्टरर को इनिशियलाइज़ करें
  useEffect(() => {
    if (!map) return;
    if (!clusterer.current) {
      clusterer.current = new MarkerClusterer({ map });
    }
  }, [map]);

  // जब भी मार्कर्स अपडेट हों, उन्हें क्लस्टरर में डालें
  useEffect(() => {
    clusterer.current?.clearMarkers();
    clusterer.current?.addMarkers(Object.values(markers));
  }, [markers]);

  const setMarkerRef = (marker: google.maps.marker.AdvancedMarkerElement | null, key: string) => {
    if (marker && markers[key]) return;
    if (!marker && !markers[key]) return;

    setMarkers((prev) => {
      if (marker) {
        return { ...prev, [key]: marker };
      } else {
        const newMarkers = { ...prev };
        delete newMarkers[key];
        return newMarkers;
      }
    });
  };

  return (
    <>
      {locations.map((loc, index) => (
        <AdvancedMarker
          key={index}
          position={loc}
          ref={(marker) => setMarkerRef(marker, String(index))}
        >
          {/* आप पिन का रंग अपनी थीम के हिसाब से बदल सकते हैं */}
          <Pin background={"#22c55e"} borderColor={"#16a34a"} glyphColor={"white"} />
        </AdvancedMarker>
      ))}
    </>
  );
};

export default function FullMapPage() {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY || "";

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-extrabold text-gray-900">Map</h1>
          <p className="text-gray-600 mt-1">All recycling hubs locations across the region.</p>
        </div>

        <div className="bg-white p-2 rounded-2xl shadow-sm border border-gray-200">
          {/* मैप का साइज़ यहाँ से कंट्रोल होगा */}
          <div style={{ width: '100%', height: '75vh', borderRadius: '12px', overflow: 'hidden' }}>
            <APIProvider apiKey={apiKey} onLoad={() => console.log('Maps API has loaded.')}>
              <Map
               defaultCenter={{ lat: 20.5937, lng: 78.9629 }} // India Center
               defaultZoom={5}
                mapId="DEMO_MAP_ID" // AdvancedMarker के लिए mapId होना ज़रूरी है
                onCameraChanged={(ev) =>
                  console.log('camera changed:', ev.detail.center, 'zoom:', ev.detail.zoom)
                }
              >
                <ClusteredMarkers />
              </Map>
            </APIProvider>
          </div>
        </div>
      </div>
    </div>
  );
}