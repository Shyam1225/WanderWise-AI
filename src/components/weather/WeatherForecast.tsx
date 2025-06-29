import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sun, Cloud, CloudRain, CloudSnow, CloudLightning, CloudFog, 
  Umbrella, Wind, Droplets, Thermometer, Sunrise, Sunset, 
  AlertTriangle, Calendar, ChevronLeft, ChevronRight, ChevronDown, ChevronUp, Info
} from 'lucide-react';
import { format, parseISO } from 'date-fns';
import { weatherService } from '../../services/weatherService';
import { Button } from '../ui/Button';

interface WeatherForecast {
  date: string;
  temperature: {
    min: number;
    max: number;
    current?: number;
  };
  condition: string;
  icon: string;
  precipitation: number;
  humidity: number;
  windSpeed: number;
}

interface WeatherForecastProps {
  location: string;
  startDate: string;
  endDate: string;
  onWeatherImpact?: (impacts: Array<{day: string, condition: string, impact: string}>) => void;
}

export function WeatherForecast({ location, startDate, endDate, onWeatherImpact }: WeatherForecastProps) {
  const [forecast, setForecast] = useState<WeatherForecast[]>([]);
  const [currentDay, setCurrentDay] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    const fetchWeather = async () => {
      if (!location) return;
      
      setIsLoading(true);
      setError(null);
      
      try {
        // Calculate number of days between start and end date
        const start = new Date(startDate);
        const end = new Date(endDate);
        const diffTime = Math.abs(end.getTime() - start.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
        
        // Get weather forecast
        const weatherData = await weatherService.getWeatherForecast(location, diffDays);
        setForecast(weatherData);
        
        // Analyze weather for potential impacts
        if (onWeatherImpact) {
          const impacts = weatherData
            .filter(day => {
              const condition = day.condition.toLowerCase();
              return condition.includes('rain') || 
                     condition.includes('storm') || 
                     condition.includes('snow') ||
                     day.temperature.max > 35 ||
                     day.temperature.min < 5;
            })
            .map(day => ({
              day: format(parseISO(day.date), 'MMM dd'),
              condition: day.condition,
              impact: getWeatherImpact(day)
            }));
          
          if (impacts.length > 0) {
            onWeatherImpact(impacts);
          }
        }
      } catch (err) {
        console.error('Failed to fetch weather:', err);
        setError('Unable to load weather forecast. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchWeather();
  }, [location, startDate, endDate, onWeatherImpact]);

  const getWeatherImpact = (day: WeatherForecast): string => {
    const condition = day.condition.toLowerCase();
    
    if (condition.includes('heavy rain') || condition.includes('storm')) {
      return 'Consider indoor activities or have backup plans';
    } else if (condition.includes('rain') || condition.includes('drizzle')) {
      return 'Pack rain gear and consider some indoor options';
    } else if (condition.includes('snow')) {
      return 'Check transportation options and dress warmly';
    } else if (day.temperature.max > 35) {
      return 'Extreme heat - plan activities for cooler parts of the day';
    } else if (day.temperature.min < 5) {
      return 'Very cold - dress in warm layers';
    }
    
    return '';
  };

  const getWeatherIcon = (condition: string) => {
    const conditionLower = condition.toLowerCase();
    
    if (conditionLower.includes('sunny') || conditionLower.includes('clear')) {
      return Sun;
    } else if (conditionLower.includes('partly cloudy')) {
      return Cloud;
    } else if (conditionLower.includes('cloudy') || conditionLower.includes('overcast')) {
      return Cloud;
    } else if (conditionLower.includes('rain') || conditionLower.includes('drizzle')) {
      return CloudRain;
    } else if (conditionLower.includes('thunder') || conditionLower.includes('storm')) {
      return CloudLightning;
    } else if (conditionLower.includes('snow') || conditionLower.includes('sleet')) {
      return CloudSnow;
    } else if (conditionLower.includes('mist') || conditionLower.includes('fog')) {
      return CloudFog;
    } else {
      return Cloud;
    }
  };

  const navigateDay = (direction: 'prev' | 'next') => {
    if (direction === 'prev' && currentDay > 0) {
      setCurrentDay(currentDay - 1);
    } else if (direction === 'next' && currentDay < forecast.length - 1) {
      setCurrentDay(currentDay + 1);
    }
  };

  const formatTime = (time: string) => {
    // Convert 24-hour format to 12-hour format
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours, 10);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const hour12 = hour % 12 || 12;
    return `${hour12}:${minutes} ${ampm}`;
  };

  if (isLoading) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 animate-pulse">
        <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
        <div className="flex space-x-4">
          <div className="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
          <div className="flex-1 space-y-4">
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
        <div className="flex items-center justify-center text-red-500 mb-4">
          <AlertTriangle className="w-8 h-8" />
        </div>
        <p className="text-center text-gray-600 dark:text-gray-300">{error}</p>
      </div>
    );
  }

  if (!forecast.length) {
    return null;
  }

  const currentForecast = forecast[currentDay];
  const WeatherIcon = getWeatherIcon(currentForecast.condition);
  const formattedDate = format(parseISO(currentForecast.date), 'EEEE, MMMM d, yyyy');
  const recommendations = weatherService.getActivityRecommendations(currentForecast);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-500 to-cyan-500 p-6 text-white">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold">Weather Forecast</h3>
          <div className="text-sm">{location}</div>
        </div>
      </div>

      {/* Current Day Weather */}
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Calendar className="w-5 h-5 text-blue-500" />
            <span className="font-medium text-gray-900 dark:text-white">{formattedDate}</span>
          </div>
          <div className="flex space-x-2">
            <button 
              onClick={() => navigateDay('prev')} 
              disabled={currentDay === 0}
              className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50"
            >
              <ChevronLeft className="w-5 h-5 text-gray-600 dark:text-gray-300" />
            </button>
            <button 
              onClick={() => navigateDay('next')} 
              disabled={currentDay === forecast.length - 1}
              className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50"
            >
              <ChevronRight className="w-5 h-5 text-gray-600 dark:text-gray-300" />
            </button>
          </div>
        </div>

        <div className="flex items-center space-x-6 mb-6">
          <div className="flex flex-col items-center">
            <WeatherIcon className="w-16 h-16 text-blue-500" />
            <span className="text-sm text-gray-600 dark:text-gray-400 mt-1">{currentForecast.condition}</span>
          </div>
          <div>
            <div className="text-4xl font-bold text-gray-900 dark:text-white">
              {Math.round(currentForecast.temperature.max)}°C
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Low: {Math.round(currentForecast.temperature.min)}°C
            </div>
          </div>
        </div>

        {/* Weather Details */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3 text-center">
            <Droplets className="w-5 h-5 text-blue-500 mx-auto mb-1" />
            <div className="text-sm font-medium text-gray-900 dark:text-white">{currentForecast.humidity}%</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">Humidity</div>
          </div>
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3 text-center">
            <Wind className="w-5 h-5 text-blue-500 mx-auto mb-1" />
            <div className="text-sm font-medium text-gray-900 dark:text-white">{currentForecast.windSpeed} km/h</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">Wind</div>
          </div>
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3 text-center">
            <Umbrella className="w-5 h-5 text-blue-500 mx-auto mb-1" />
            <div className="text-sm font-medium text-gray-900 dark:text-white">{currentForecast.precipitation} mm</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">Precipitation</div>
          </div>
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3 text-center">
            <Thermometer className="w-5 h-5 text-blue-500 mx-auto mb-1" />
            <div className="text-sm font-medium text-gray-900 dark:text-white">
              {Math.round(currentForecast.temperature.min)}° - {Math.round(currentForecast.temperature.max)}°C
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">Range</div>
          </div>
        </div>

        {/* Recommendations */}
        <div className="mb-4">
          <button 
            onClick={() => setShowDetails(!showDetails)}
            className="flex items-center justify-between w-full text-left p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
          >
            <div className="flex items-center space-x-2">
              <Info className="w-5 h-5 text-blue-500" />
              <span className="font-medium text-gray-900 dark:text-white">Weather Recommendations</span>
            </div>
            {showDetails ? (
              <ChevronUp className="w-5 h-5 text-gray-500" />
            ) : (
              <ChevronDown className="w-5 h-5 text-gray-500" />
            )}
          </button>
          
          {showDetails && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-3 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
            >
              <div className="text-sm text-gray-700 dark:text-gray-300 mb-4">
                {weatherService.getWeatherRecommendation(currentForecast)}
              </div>
              
              <div className="space-y-3">
                {recommendations.recommended.length > 0 && (
                  <div>
                    <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">Recommended Activities:</h4>
                    <div className="flex flex-wrap gap-2">
                      {recommendations.recommended.map((activity, index) => (
                        <span key={index} className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-xs rounded-full">
                          {activity}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                
                {recommendations.avoid.length > 0 && (
                  <div>
                    <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">Better to Avoid:</h4>
                    <div className="flex flex-wrap gap-2">
                      {recommendations.avoid.map((activity, index) => (
                        <span key={index} className="px-2 py-1 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 text-xs rounded-full">
                          {activity}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </div>

        {/* Week Overview */}
        <div>
          <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-3">Trip Weather Overview</h4>
          <div className="grid grid-cols-5 gap-2">
            {forecast.slice(0, 5).map((day, index) => {
              const DayIcon = getWeatherIcon(day.condition);
              const dayDate = parseISO(day.date);
              
              return (
                <button
                  key={index}
                  onClick={() => setCurrentDay(index)}
                  className={`flex flex-col items-center p-2 rounded-lg transition-colors ${
                    currentDay === index 
                      ? 'bg-blue-100 dark:bg-blue-900/30' 
                      : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {format(dayDate, 'EEE')}
                  </span>
                  <DayIcon className="w-6 h-6 my-1 text-blue-500" />
                  <span className="text-xs font-medium text-gray-900 dark:text-white">
                    {Math.round(day.temperature.max)}°
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}