import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plane, MapPin, Compass, Globe, Camera, Mountain, 
  Utensils, Building, Heart, Sparkles, Clock, CheckCircle 
} from 'lucide-react';

interface TravelLoadingScreenProps {
  isVisible: boolean;
  progress: number;
  currentMessage: string;
}

const loadingMessages = [
  { icon: Sparkles, text: "Analyzing your travel preferences...", duration: 3000 },
  { icon: Globe, text: "Consulting local experts worldwide...", duration: 4000 },
  { icon: MapPin, text: "Finding hidden gems and local favorites...", duration: 3500 },
  { icon: Utensils, text: "Discovering authentic dining experiences...", duration: 3000 },
  { icon: Building, text: "Researching cultural attractions...", duration: 3500 },
  { icon: Mountain, text: "Planning adventure activities...", duration: 3000 },
  { icon: Camera, text: "Identifying Instagram-worthy spots...", duration: 2500 },
  { icon: Heart, text: "Crafting your perfect itinerary...", duration: 4000 },
];

const floatingIcons = [
  { icon: Plane, delay: 0, duration: 8 },
  { icon: Compass, delay: 1, duration: 6 },
  { icon: Globe, delay: 2, duration: 7 },
  { icon: MapPin, delay: 3, duration: 5 },
  { icon: Camera, delay: 4, duration: 9 },
];

export function TravelLoadingScreen({ isVisible, progress, currentMessage }: TravelLoadingScreenProps) {
  const [messageIndex, setMessageIndex] = useState(0);
  const [displayMessage, setDisplayMessage] = useState(loadingMessages[0]);

  useEffect(() => {
    if (!isVisible) return;

    const interval = setInterval(() => {
      setMessageIndex((prev) => {
        const next = (prev + 1) % loadingMessages.length;
        setDisplayMessage(loadingMessages[next]);
        return next;
      });
    }, 3500);

    return () => clearInterval(interval);
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-gradient-to-br from-primary-50 via-white to-secondary-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 z-50 flex items-center justify-center"
    >
      {/* Floating Background Icons */}
      <div className="absolute inset-0 overflow-hidden">
        {floatingIcons.map((item, index) => (
          <motion.div
            key={index}
            className="absolute text-primary-200 dark:text-gray-700"
            initial={{ 
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              opacity: 0.3,
              scale: 0.5
            }}
            animate={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              opacity: [0.3, 0.6, 0.3],
              scale: [0.5, 0.8, 0.5],
            }}
            transition={{
              duration: item.duration,
              repeat: Infinity,
              delay: item.delay,
              ease: "easeInOut"
            }}
          >
            <item.icon className="w-8 h-8" />
          </motion.div>
        ))}
      </div>

      {/* Main Loading Content */}
      <div className="relative z-10 text-center max-w-md mx-auto px-6">
        {/* Central Loading Animation */}
        <div className="relative mb-8">
          {/* Outer Ring */}
          <motion.div
            className="w-32 h-32 border-4 border-primary-200 dark:border-gray-700 rounded-full mx-auto"
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          />
          
          {/* Inner Ring */}
          <motion.div
            className="absolute top-4 left-4 w-24 h-24 border-4 border-secondary-300 dark:border-gray-600 rounded-full"
            animate={{ rotate: -360 }}
            transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
          />
          
          {/* Center Icon */}
          <motion.div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <displayMessage.icon className="w-8 h-8 text-white" />
          </motion.div>
        </div>

        {/* Loading Message */}
        <AnimatePresence mode="wait">
          <motion.div
            key={messageIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <h2 className="text-2xl font-display font-bold text-gray-900 dark:text-white mb-2">
              Creating Your Perfect Trip
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              {currentMessage || displayMessage.text}
            </p>
          </motion.div>
        </AnimatePresence>

        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Progress
            </span>
            <span className="text-sm font-medium text-primary-600 dark:text-primary-400">
              {Math.round(progress)}%
            </span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />
          </div>
        </div>

        {/* Fun Facts */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="text-sm text-gray-500 dark:text-gray-400"
        >
          <p>💡 Did you know? Our AI considers over 50 factors to create your perfect itinerary!</p>
        </motion.div>
      </div>
    </motion.div>
  );
}