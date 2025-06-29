import React, { useEffect, useRef, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import * as Mapillary from 'mapillary-js';
import 'mapillary-js/dist/mapillary.css';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

// Fix Leaflet icon issue
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

interface VirtualTravelExperienceProps {
  location: {
    id: string;
    name: string;
    landmarks: Array<{
      name: string;
      description: string;
    }>;
  };
  currentLandmark: number;
  isPaused: boolean;
  isMuted: boolean;
}

// Component to update map center when props change
function MapUpdater({ center }: { center: [number, number] }) {
  const map = useMap();
  
  useEffect(() => {
    map.setView(center, 15);
  }, [center, map]);
  
  return null;
}

export function VirtualTravelExperience({ 
  location, 
  currentLandmark,
  isPaused,
  isMuted
}: VirtualTravelExperienceProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapillaryRef = useRef<Mapillary.Viewer | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showMap, setShowMap] = useState(true); // Default to map view
  const [streetViewAvailable, setStreetViewAvailable] = useState(false);
  
  // Coordinates for each location and landmark
  const coordinates = {
    'delhi': {
      center: [28.6139, 77.2090],
      landmarks: [
        [28.6562, 77.2410], // Red Fort
        [28.6129, 77.2295], // India Gate
        [28.5245, 77.1855], // Qutub Minar
        [28.5933, 77.2507]  // Humayun's Tomb
      ]
    },
    'jaipur': {
      center: [26.9124, 75.7873],
      landmarks: [
        [26.9239, 75.8267], // Hawa Mahal
        [26.9855, 75.8513], // Amber Fort
        [26.9258, 75.8237], // City Palace
        [26.9246, 75.8242]  // Jantar Mantar
      ]
    },
    'agra': {
      center: [27.1767, 78.0081],
      landmarks: [
        [27.1751, 78.0421], // Taj Mahal
        [27.1784, 78.0214], // Agra Fort
        [27.0945, 77.6706], // Fatehpur Sikri
        [27.1927, 78.0297]  // Itimad-ud-Daulah
      ]
    },
    'mumbai': {
      center: [19.0760, 72.8777],
      landmarks: [
        [18.9220, 72.8347], // Gateway of India
        [18.9442, 72.8237], // Marine Drive
        [18.9398, 72.8354], // CST
        [18.9633, 72.9315]  // Elephanta Caves
      ]
    },
    'udaipur': {
      center: [24.5854, 73.7125],
      landmarks: [
        [24.5764, 73.6858], // City Palace
        [24.5766, 73.6801], // Lake Pichola
        [24.5827, 73.6764], // Jag Mandir
        [24.5937, 73.6876]  // Sajjangarh Palace
      ]
    },
    'tokyo': {
      center: [35.6762, 139.6503],
      landmarks: [
        [35.6586, 139.7454], // Tokyo Tower
        [35.6595, 139.7005], // Shibuya Crossing
        [35.7147, 139.7967], // Senso-ji Temple
        [35.6763, 139.6993]  // Meiji Shrine
      ]
    }
  };

  // Initialize Google Street View if available
  useEffect(() => {
    if (!containerRef.current) return;
    
    // Check if Google Maps API is loaded
    if (window.google && window.google.maps) {
      initializeStreetView();
    } else {
      // Load Google Maps API
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyBw4tqQD3TmahBibilMAgOyn4vr66DIwy8&libraries=places`;
      script.async = true;
      script.defer = true;
      script.onload = initializeStreetView;
      script.onerror = () => {
        console.error('Failed to load Google Maps API');
        setShowMap(true);
      };
      document.head.appendChild(script);
    }

    // Add ambient audio based on location
    const getAudioForLocation = () => {
      const audioMap: Record<string, string> = {
        'delhi': 'https://cdn.pixabay.com/download/audio/2022/03/10/audio_2cce3d91fa.mp3?filename=city-ambience-9272.mp3',
        'jaipur': 'https://cdn.pixabay.com/download/audio/2022/01/18/audio_d1a8d6dc0f.mp3?filename=india-market-ambience-7762.mp3',
        'agra': 'https://cdn.pixabay.com/download/audio/2022/03/10/audio_2cce3d91fa.mp3?filename=city-ambience-9272.mp3',
        'mumbai': 'https://cdn.pixabay.com/download/audio/2022/03/10/audio_2cce3d91fa.mp3?filename=city-ambience-9272.mp3',
        'udaipur': 'https://cdn.pixabay.com/download/audio/2021/04/07/audio_b0e3e9ce0e.mp3?filename=birds-singing-02-6771.mp3',
        'tokyo': 'https://cdn.pixabay.com/download/audio/2022/03/10/audio_2cce3d91fa.mp3?filename=city-ambience-9272.mp3'
      };
      
      return audioMap[location.id] || audioMap['delhi'];
    };

    const audio = new Audio();
    audio.src = getAudioForLocation();
    audio.loop = true;
    audio.volume = isMuted ? 0 : 0.3;
    audioRef.current = audio;
    
    if (!isPaused) {
      audio.play().catch(e => console.log('Audio play prevented:', e));
    }
    
    return () => {
      if (mapillaryRef.current) {
        mapillaryRef.current.remove();
      }
      
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = '';
      }
    };
  }, [location.id]);

  // Initialize Street View
  const initializeStreetView = () => {
    if (!containerRef.current || !window.google || !window.google.maps) return;
    
    try {
      // Get coordinates for the current landmark
      const locationCoords = coordinates[location.id as keyof typeof coordinates];
      if (!locationCoords) {
        setShowMap(true);
        return;
      }
      
      const landmarkCoords = locationCoords.landmarks[currentLandmark];
      const position = new window.google.maps.LatLng(landmarkCoords[0], landmarkCoords[1]);
      
      // Create Street View panorama
      const panorama = new window.google.maps.StreetViewPanorama(
        containerRef.current,
        {
          position: position,
          pov: { heading: 0, pitch: 0 },
          zoom: 1,
          addressControl: false,
          showRoadLabels: false,
          linksControl: true,
          panControl: true,
          enableCloseButton: false,
          visible: true
        }
      );
      
      // Check if Street View is available at this location
      const streetViewService = new window.google.maps.StreetViewService();
      streetViewService.getPanorama({ location: position, radius: 50 }, (data, status) => {
        if (status === 'OK') {
          setStreetViewAvailable(true);
          setShowMap(false);
          setIsLoaded(true);
        } else {
          console.log('Street View not available at this location');
          setStreetViewAvailable(false);
          setShowMap(true);
        }
      });
    } catch (err) {
      console.error('Error initializing Street View:', err);
      setError('Virtual experience temporarily unavailable');
      setShowMap(true);
    }
  };

  // Update landmark when it changes
  useEffect(() => {
    if (window.google && window.google.maps && streetViewAvailable) {
      updateLandmark();
    }
  }, [location.id, currentLandmark, streetViewAvailable]);

  // Handle audio muting
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : 0.3;
    }
  }, [isMuted]);

  // Handle pausing
  useEffect(() => {
    if (audioRef.current) {
      if (isPaused) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(e => console.log('Audio play prevented:', e));
      }
    }
  }, [isPaused]);

  const updateLandmark = () => {
    if (!window.google || !window.google.maps || !streetViewAvailable) return;
    
    try {
      // Cancel any previous requests
      if (window.previousController) {
        window.previousController.abort();
      }
      
      // Create a new abort controller for this request
      const controller = new AbortController();
      window.previousController = controller;
      
      // Get coordinates for the current landmark
      const locationCoords = coordinates[location.id as keyof typeof coordinates];
      if (!locationCoords) return;
      
      const landmarkCoords = locationCoords.landmarks[currentLandmark];
      const position = new window.google.maps.LatLng(landmarkCoords[0], landmarkCoords[1]);
      
      // Check if Street View is available at this location
      const streetViewService = new window.google.maps.StreetViewService();
      streetViewService.getPanorama({ location: position, radius: 50 }, (data, status) => {
        // Check if this request has been aborted
        if (controller.signal.aborted) {
          return;
        }
        
        if (status === 'OK' && containerRef.current) {
          // Create new panorama at the landmark location
          const panorama = new window.google.maps.StreetViewPanorama(
            containerRef.current,
            {
              position: position,
              pov: { heading: 0, pitch: 0 },
              zoom: 1,
              addressControl: false,
              showRoadLabels: false,
              linksControl: true,
              panControl: true,
              enableCloseButton: false,
              visible: true
            }
          );
          
          setStreetViewAvailable(true);
          setShowMap(false);
        } else {
          console.log('Street View not available at this landmark');
          setStreetViewAvailable(false);
          setShowMap(true);
        }
      });
    } catch (err) {
      console.error('Error updating landmark:', err);
      setError('Virtual experience temporarily unavailable');
      setShowMap(true);
    }
  };

  // Get current landmark coordinates
  const currentCoords = coordinates[location.id as keyof typeof coordinates]?.landmarks[currentLandmark] || 
                       coordinates[location.id as keyof typeof coordinates]?.center || 
                       [28.6139, 77.2090];
  
  return (
    <div className="w-full h-full">
      {/* Back Button - Always visible */}
      <div className="absolute top-4 left-4 z-[2000]">
        <Link 
          to="/virtual-travel" 
          className="flex items-center space-x-2 bg-black/70 text-white px-4 py-2 rounded-lg hover:bg-black/80 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Destinations</span>
        </Link>
      </div>
      
      {showMap ? (
        // Map View
        <div className="w-full h-full">
          <MapContainer 
            center={[currentCoords[0], currentCoords[1]]} 
            zoom={15} 
            style={{ width: '100%', height: '100%' }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={[currentCoords[0], currentCoords[1]]}>
              <Popup>
                {location.landmarks[currentLandmark].name}
              </Popup>
            </Marker>
            <MapUpdater center={[currentCoords[0], currentCoords[1]]} />
          </MapContainer>
          
          <div className="absolute top-16 left-4 right-4 bg-blue-500/80 text-white p-4 rounded-lg z-[1000]">
            <p className="font-semibold">Map View</p>
            <p className="text-sm">Showing {location.landmarks[currentLandmark].name} location</p>
            <button 
              onClick={() => {
                if (window.google && window.google.maps) {
                  updateLandmark();
                }
              }}
              className="mt-2 px-3 py-1 bg-white text-blue-600 rounded-lg text-sm font-medium"
            >
              Try Street View
            </button>
          </div>
        </div>
      ) : (
        // Street View
        <div ref={containerRef} className="w-full h-full" />
      )}
    </div>
  );
}

// Add Google Maps to Window interface
declare global {
  interface Window {
    google?: any;
    previousController?: AbortController;
  }
}