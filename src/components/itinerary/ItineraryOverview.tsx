import React from 'react';
import { motion } from 'framer-motion';
import { 
  MapPin, Calendar, Users, DollarSign, Star, Cloud, 
  Thermometer, Umbrella, Sun, Activity, Clock, Award
} from 'lucide-react';

interface ItineraryOverviewProps {
  destination: string;
  startDate: string;
  endDate: string;
  groupSize: number;
  budget: number;
  highlights: string[];
  weather: {
    temperature: string;
    condition: string;
    precipitation: string;
  };
  difficulty: 'Easy' | 'Moderate' | 'Challenging';
  energyLevel: 'Relaxed' | 'Moderate' | 'Active' | 'High Energy';
}

export function ItineraryOverview({
  destination,
  startDate,
  endDate,
  groupSize,
  budget,
  highlights,
  weather,
  difficulty,
  energyLevel
}: ItineraryOverviewProps) {
  const tripDuration = Math.ceil((new Date(endDate).getTime() - new Date(startDate).getTime()) / (1000 * 60 * 60 * 24));

  const getDifficultyColor = (level: string) => {
    switch (level) {
      case 'Easy': return 'text-green-600 bg-green-100 dark:bg-green-900/30 dark:text-green-400';
      case 'Moderate': return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/30 dark:text-yellow-400';
      case 'Challenging': return 'text-red-600 bg-red-100 dark:bg-red-900/30 dark:text-red-400';
      default: return 'text-gray-600 bg-gray-100 dark:bg-gray-900/30 dark:text-gray-400';
    }
  };

  const getEnergyColor = (level: string) => {
    switch (level) {
      case 'Relaxed': return 'text-blue-600 bg-blue-100 dark:bg-blue-900/30 dark:text-blue-400';
      case 'Moderate': return 'text-green-600 bg-green-100 dark:bg-green-900/30 dark:text-green-400';
      case 'Active': return 'text-orange-600 bg-orange-100 dark:bg-orange-900/30 dark:text-orange-400';
      case 'High Energy': return 'text-red-600 bg-red-100 dark:bg-red-900/30 dark:text-red-400';
      default: return 'text-gray-600 bg-gray-100 dark:bg-gray-900/30 dark:text-gray-400';
    }
  };

  const getWeatherIcon = (condition: string) => {
    if (condition.toLowerCase().includes('rain')) return Umbrella;
    if (condition.toLowerCase().includes('cloud')) return Cloud;
    return Sun;
  };

  const WeatherIcon = getWeatherIcon(weather.condition);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-gradient-to-r from-primary-500 to-secondary-500 rounded-2xl p-8 text-white shadow-2xl mb-8"
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Trip Summary */}
        <div className="lg:col-span-2 space-y-6">
          <div>
            <h1 className="text-3xl sm:text-4xl font-display font-bold mb-2">
              {destination}
            </h1>
            <p className="text-white/90 text-lg">
              Your personalized {tripDuration}-day adventure awaits
            </p>
          </div>

          {/* Trip Details Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
              <Calendar className="w-6 h-6 mx-auto mb-2" />
              <div className="text-sm opacity-90">Duration</div>
              <div className="font-semibold">{tripDuration} days</div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
              <Users className="w-6 h-6 mx-auto mb-2" />
              <div className="text-sm opacity-90">Travelers</div>
              <div className="font-semibold">{groupSize} {groupSize === 1 ? 'person' : 'people'}</div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
              <DollarSign className="w-6 h-6 mx-auto mb-2" />
              <div className="text-sm opacity-90">Daily Budget</div>
              <div className="font-semibold">${budget}</div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
              <MapPin className="w-6 h-6 mx-auto mb-2" />
              <div className="text-sm opacity-90">Dates</div>
              <div className="font-semibold text-xs">
                {new Date(startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - {new Date(endDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
              </div>
            </div>
          </div>

          {/* Highlights */}
          <div>
            <h3 className="text-xl font-semibold mb-3 flex items-center">
              <Star className="w-5 h-5 mr-2" />
              Trip Highlights
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {highlights.slice(0, 6).map((highlight, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center space-x-2 text-white/90"
                >
                  <div className="w-2 h-2 bg-white rounded-full flex-shrink-0" />
                  <span className="text-sm">{highlight}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Weather & Trip Info */}
        <div className="space-y-6">
          {/* Weather Overview */}
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <WeatherIcon className="w-5 h-5 mr-2" />
              Weather Overview
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-white/80">Temperature</span>
                <div className="flex items-center">
                  <Thermometer className="w-4 h-4 mr-1" />
                  <span className="font-medium">{weather.temperature}</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-white/80">Condition</span>
                <span className="font-medium">{weather.condition}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-white/80">Precipitation</span>
                <span className="font-medium">{weather.precipitation}</span>
              </div>
            </div>
          </div>

          {/* Trip Indicators */}
          <div className="space-y-4">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-white/80 flex items-center">
                  <Activity className="w-4 h-4 mr-2" />
                  Difficulty Level
                </span>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(difficulty)} bg-white/20`}>
                {difficulty}
              </span>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-white/80 flex items-center">
                  <Award className="w-4 h-4 mr-2" />
                  Energy Level
                </span>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getEnergyColor(energyLevel)} bg-white/20`}>
                {energyLevel}
              </span>
            </div>
          </div>

          {/* Packing Suggestions */}
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
            <h4 className="font-semibold mb-2">Packing Essentials</h4>
            <div className="text-sm text-white/80 space-y-1">
              <div>• Comfortable walking shoes</div>
              <div>• Weather-appropriate clothing</div>
              <div>• Portable charger & adapter</div>
              <div>• Travel insurance documents</div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}