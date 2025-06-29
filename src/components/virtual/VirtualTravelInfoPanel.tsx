import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '../ui/Button';
import { Link } from 'react-router-dom';

interface VirtualTravelInfoPanelProps {
  location: {
    id: string;
    name: string;
    landmarks: Array<{
      name: string;
      description: string;
    }>;
  };
  currentLandmark: number;
  onSelectLandmark: (index: number) => void;
}

export function VirtualTravelInfoPanel({
  location,
  currentLandmark,
  onSelectLandmark
}: VirtualTravelInfoPanelProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
      className="absolute left-4 top-20 bottom-20 w-80 bg-black/70 backdrop-blur-sm rounded-xl p-6 overflow-y-auto"
    >
      <h3 className="text-xl font-semibold text-white mb-4">
        {location.landmarks[currentLandmark].name}
      </h3>
      
      <p className="text-gray-200 mb-6">
        {location.landmarks[currentLandmark].description}
      </p>
      
      <div className="space-y-4">
        <h4 className="font-medium text-white">Landmarks in {location.name}</h4>
        <div className="space-y-2">
          {location.landmarks.map((landmark, index) => (
            <button
              key={index}
              onClick={() => onSelectLandmark(index)}
              className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                currentLandmark === index
                  ? 'bg-primary-500 text-white'
                  : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50'
              }`}
            >
              {landmark.name}
            </button>
          ))}
        </div>
      </div>
      
      <div className="mt-8">
        <Link to={`/destinations/${location.id}`}>
          <Button className="w-full">
            Plan Real Trip to {location.name.split(',')[0]}
          </Button>
        </Link>
      </div>
    </motion.div>
  );
}