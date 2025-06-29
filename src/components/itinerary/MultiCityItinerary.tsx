import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Calendar, MapPin, Users, DollarSign, ChevronDown, ChevronUp, 
  Plane, Train, Bus, Car, Clock, AlertTriangle, Info, Compass
} from 'lucide-react';
import { format, parseISO } from 'date-fns';
import { DetailedDaySchedule } from './DetailedDaySchedule';
import { WeatherForecast } from '../weather/WeatherForecast';
import { Button } from '../ui/Button';

interface City {
  name: string;
  days: number[];
  description: string;
}

interface TransportationBetweenCities {
  from: string;
  to: string;
  day: number;
  options: Array<{
    type: 'flight' | 'train' | 'bus' | 'car';
    duration: string;
    cost: string;
    departureTime: string;
    arrivalTime: string;
    operator?: string;
    details?: string;
    recommended?: boolean;
  }>;
}

interface DaySchedule {
  day: number;
  date: string;
  city: string;
  schedule: Array<{
    id: string;
    startTime: string;
    endTime: string;
    title: string;
    description: string;
    location: string;
    address?: string;
    category: 'morning' | 'afternoon' | 'evening' | 'transportation' | 'meal' | 'accommodation';
    cost: string;
    tips?: string[];
    weatherDependent?: boolean;
    bookingRequired?: boolean;
    bookingInfo?: {
      platform?: string;
      deadline?: string;
      url?: string;
    };
    transportation?: {
      method: 'walking' | 'taxi' | 'public' | 'car' | 'train' | 'bus' | 'plane';
      duration: string;
      cost: string;
      details?: string;
    };
    alternatives?: Array<{
      title: string;
      reason: string;
    }>;
  }>;
  totalCost: string;
  notes?: string;
}

interface MultiCityItineraryProps {
  origin: string;
  destination: string;
  startDate: string;
  endDate: string;
  cities: City[];
  transportation: TransportationBetweenCities[];
  daySchedules: DaySchedule[];
  totalBudget: string;
  weatherAlerts?: Array<{
    day: number;
    city: string;
    condition: string;
    impact: string;
  }>;
}

export function MultiCityItinerary({
  origin,
  destination,
  startDate,
  endDate,
  cities,
  transportation,
  daySchedules,
  totalBudget,
  weatherAlerts = []
}: MultiCityItineraryProps) {
  const [expandedCity, setExpandedCity] = useState<string | null>(cities[0]?.name || null);
  const [expandedDay, setExpandedDay] = useState<number | null>(1);
  const [expandedTransport, setExpandedTransport] = useState<number | null>(null);
  
  const toggleCity = (cityName: string) => {
    setExpandedCity(expandedCity === cityName ? null : cityName);
  };
  
  const toggleDay = (day: number) => {
    setExpandedDay(expandedDay === day ? null : day);
  };
  
  const toggleTransport = (day: number) => {
    setExpandedTransport(expandedTransport === day ? null : day);
  };

  const getTransportIcon = (type: string) => {
    switch (type) {
      case 'flight': return Plane;
      case 'train': return Train;
      case 'bus': return Bus;
      case 'car': return Car;
      default: return Compass;
    }
  };

  const formatDate = (dateString: string) => {
    return format(parseISO(dateString), 'EEEE, MMMM d, yyyy');
  };

  return (
    <div className="space-y-8">
      {/* Itinerary Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6"
      >
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Journey: {origin} to {destination}
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="flex items-center space-x-3">
            <Calendar className="w-6 h-6 text-primary-500" />
            <div>
              <div className="text-sm text-gray-500 dark:text-gray-400">Travel Dates</div>
              <div className="font-medium text-gray-900 dark:text-white">
                {formatDate(startDate)} - {formatDate(endDate)}
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <MapPin className="w-6 h-6 text-primary-500" />
            <div>
              <div className="text-sm text-gray-500 dark:text-gray-400">Cities</div>
              <div className="font-medium text-gray-900 dark:text-white">
                {cities.map(city => city.name).join(' → ')}
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <DollarSign className="w-6 h-6 text-primary-500" />
            <div>
              <div className="text-sm text-gray-500 dark:text-gray-400">Total Budget</div>
              <div className="font-medium text-gray-900 dark:text-white">
                {totalBudget}
              </div>
            </div>
          </div>
        </div>
        
        {/* Weather Alerts */}
        {weatherAlerts.length > 0 && (
          <div className="mb-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-xl">
            <h3 className="flex items-center text-lg font-semibold text-yellow-800 dark:text-yellow-300 mb-3">
              <AlertTriangle className="w-5 h-5 mr-2" />
              Weather Alerts
            </h3>
            <div className="space-y-2">
              {weatherAlerts.map((alert, index) => (
                <div key={index} className="flex items-start space-x-3 text-yellow-700 dark:text-yellow-400">
                  <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full mt-2 flex-shrink-0" />
                  <div>
                    <span className="font-medium">Day {alert.day} ({alert.city}): </span>
                    <span>{alert.condition} - {alert.impact}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* City Overview */}
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
          City Overview
        </h3>
        <div className="space-y-4">
          {cities.map((city, index) => (
            <div key={city.name} className="border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden">
              <button
                onClick={() => toggleCity(city.name)}
                className="w-full flex items-center justify-between p-4 text-left bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-8 h-8 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center text-white font-medium">
                    {index + 1}
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">{city.name}</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Days {city.days.join(', ')}
                    </p>
                  </div>
                </div>
                {expandedCity === city.name ? (
                  <ChevronUp className="w-5 h-5 text-gray-400" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-400" />
                )}
              </button>
              
              {expandedCity === city.name && (
                <div className="p-4">
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    {city.description}
                  </p>
                  
                  {/* Weather for this city */}
                  <div className="mb-4">
                    <WeatherForecast 
                      location={city.name} 
                      startDate={daySchedules.find(d => d.day === city.days[0])?.date || startDate}
                      endDate={daySchedules.find(d => d.day === city.days[city.days.length - 1])?.date || endDate}
                    />
                  </div>
                  
                  {/* Day buttons for this city */}
                  <h5 className="font-medium text-gray-900 dark:text-white mb-3">Daily Schedule:</h5>
                  <div className="flex flex-wrap gap-2">
                    {city.days.map(dayNum => (
                      <Button 
                        key={dayNum}
                        size="sm"
                        variant={expandedDay === dayNum ? "primary" : "outline"}
                        onClick={() => toggleDay(dayNum)}
                      >
                        Day {dayNum}
                      </Button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </motion.div>

      {/* Transportation Between Cities */}
      {transportation.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6"
        >
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Intercity Transportation
          </h2>
          
          <div className="space-y-4">
            {transportation.map((transport, index) => (
              <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden">
                <button
                  onClick={() => toggleTransport(transport.day)}
                  className="w-full flex items-center justify-between p-4 text-left bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center text-white">
                      <Compass className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white">
                        {transport.from} → {transport.to}
                      </h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Day {transport.day} • {daySchedules.find(d => d.day === transport.day)?.date ? formatDate(daySchedules.find(d => d.day === transport.day)!.date) : ''}
                      </p>
                    </div>
                  </div>
                  {expandedTransport === transport.day ? (
                    <ChevronUp className="w-5 h-5 text-gray-400" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                  )}
                </button>
                
                {expandedTransport === transport.day && (
                  <div className="p-4">
                    <div className="space-y-4">
                      {transport.options.map((option, optIndex) => {
                        const TransportIcon = getTransportIcon(option.type);
                        const isRecommended = option.recommended;
                        
                        return (
                          <div 
                            key={optIndex}
                            className={`p-4 rounded-lg ${
                              isRecommended 
                                ? 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800' 
                                : 'bg-gray-50 dark:bg-gray-700'
                            }`}
                          >
                            <div className="flex items-start justify-between mb-3">
                              <div className="flex items-center space-x-3">
                                <div className={`w-10 h-10 ${
                                  isRecommended 
                                    ? 'bg-green-100 dark:bg-green-800 text-green-600 dark:text-green-400' 
                                    : 'bg-gray-100 dark:bg-gray-600 text-gray-600 dark:text-gray-400'
                                } rounded-lg flex items-center justify-center`}>
                                  <TransportIcon className="w-5 h-5" />
                                </div>
                                <div>
                                  <h5 className="font-medium text-gray-900 dark:text-white capitalize">
                                    {option.type}
                                    {isRecommended && (
                                      <span className="ml-2 text-xs px-2 py-1 bg-green-100 dark:bg-green-800 text-green-700 dark:text-green-300 rounded-full">
                                        Recommended
                                      </span>
                                    )}
                                  </h5>
                                  {option.operator && (
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                      {option.operator}
                                    </p>
                                  )}
                                </div>
                              </div>
                              <div className="text-right">
                                <div className="font-medium text-gray-900 dark:text-white">
                                  {option.cost}
                                </div>
                                <div className="text-sm text-gray-500 dark:text-gray-400">
                                  {option.duration}
                                </div>
                              </div>
                            </div>
                            
                            <div className="flex items-center justify-between mb-3 text-sm">
                              <div>
                                <div className="text-gray-500 dark:text-gray-400">Departure</div>
                                <div className="font-medium text-gray-900 dark:text-white">{option.departureTime}</div>
                              </div>
                              <div className="flex-1 px-4">
                                <div className="relative">
                                  <div className="absolute left-0 right-0 top-1/2 h-0.5 bg-gray-300 dark:bg-gray-600"></div>
                                  <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-2 h-2 rounded-full bg-gray-400 dark:bg-gray-500"></div>
                                  <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-2 h-2 rounded-full bg-gray-400 dark:bg-gray-500"></div>
                                </div>
                              </div>
                              <div className="text-right">
                                <div className="text-gray-500 dark:text-gray-400">Arrival</div>
                                <div className="font-medium text-gray-900 dark:text-white">{option.arrivalTime}</div>
                              </div>
                            </div>
                            
                            {option.details && (
                              <div className="text-sm text-gray-600 dark:text-gray-300 mt-3">
                                <Info className="w-4 h-4 inline-block mr-2 text-blue-500" />
                                {option.details}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Daily Schedules */}
      <div className="space-y-8">
        {expandedDay !== null && (
          <motion.div
            key={`day-${expandedDay}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {daySchedules
              .filter(day => day.day === expandedDay)
              .map(day => (
                <DetailedDaySchedule
                  key={day.day}
                  day={day.day}
                  date={day.date}
                  city={day.city}
                  schedule={day.schedule}
                  totalCost={day.totalCost}
                  notes={day.notes}
                />
              ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}