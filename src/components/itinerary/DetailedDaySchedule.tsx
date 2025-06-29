import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Clock, MapPin, DollarSign, Users, ChevronDown, ChevronUp, 
  Car, Train, Scaling as Walking, Plane, Activity, Utensils, 
  Camera, Star, Info, Navigation, Bus, Bike, Ship, Sun, Coffee, Sunset, Moon,
  AlertCircle, CheckCircle, Smartphone, CreditCard, Wifi, 
  Umbrella, ThermometerSun, Wind, Droplets
} from 'lucide-react';
import { format, parseISO } from 'date-fns';
import { Button } from '../ui/Button';

interface ScheduleItem {
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
}

interface DayWeather {
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

interface DetailedDayScheduleProps {
  day: number;
  date: string;
  city: string;
  schedule: ScheduleItem[];
  weather?: DayWeather;
  totalCost: string;
  notes?: string;
}

export function DetailedDaySchedule({ 
  day, 
  date, 
  city, 
  schedule, 
  weather, 
  totalCost,
  notes
}: DetailedDayScheduleProps) {
  const [expandedItem, setExpandedItem] = useState<string | null>(null);
  
  const toggleItem = (id: string) => {
    setExpandedItem(expandedItem === id ? null : id);
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'morning': return Sun;
      case 'afternoon': return Camera;
      case 'evening': return Sunset;
      case 'transportation': return Car;
      case 'meal': return Utensils;
      case 'accommodation': return Users;
      default: return Activity;
    }
  };

  const getTransportIcon = (method: string) => {
    switch (method) {
      case 'walking': return Walking;
      case 'taxi': return Car;
      case 'public': return Train;
      case 'car': return Car;
      case 'train': return Train;
      case 'bus': return Bus;
      case 'plane': return Plane;
      default: return Navigation;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'morning': return 'from-yellow-500 to-orange-500';
      case 'afternoon': return 'from-blue-500 to-cyan-500';
      case 'evening': return 'from-indigo-500 to-purple-500';
      case 'transportation': return 'from-gray-500 to-gray-600';
      case 'meal': return 'from-green-500 to-emerald-500';
      case 'accommodation': return 'from-pink-500 to-rose-500';
      default: return 'from-gray-500 to-gray-600';
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

  const formattedDate = date ? format(parseISO(date), 'EEEE, MMMM d, yyyy') : '';

  // Group schedule items by time of day
  const morningActivities = schedule.filter(item => {
    const hour = parseInt(item.startTime.split(':')[0], 10);
    return hour >= 5 && hour < 12;
  });

  const afternoonActivities = schedule.filter(item => {
    const hour = parseInt(item.startTime.split(':')[0], 10);
    return hour >= 12 && hour < 17;
  });

  const eveningActivities = schedule.filter(item => {
    const hour = parseInt(item.startTime.split(':')[0], 10);
    return hour >= 17 && hour < 24;
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden"
    >
      {/* Day Header */}
      <div className="bg-gradient-to-r from-primary-500 to-secondary-500 p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between text-white">
          <div>
            <h2 className="text-2xl font-bold">Day {day} • {city}</h2>
            <p className="text-white/90">{formattedDate}</p>
          </div>
          
          {weather && (
            <div className="mt-4 md:mt-0 flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <ThermometerSun className="w-5 h-5" />
                <span>{Math.round(weather.temperature.min)}° - {Math.round(weather.temperature.max)}°C</span>
              </div>
              <div className="flex items-center space-x-2">
                <Umbrella className="w-5 h-5" />
                <span>{weather.precipitation > 0 ? `${weather.precipitation}mm` : 'No rain'}</span>
              </div>
            </div>
          )}
        </div>
        
        {/* Weather Alert */}
        {weather && weather.condition.toLowerCase().includes('rain') && (
          <div className="mt-4 p-3 bg-yellow-500/20 rounded-lg">
            <div className="flex items-center space-x-2">
              <AlertCircle className="w-4 h-4 text-yellow-200" />
              <span className="text-yellow-100 text-sm font-medium">
                Rain expected today. Consider indoor activities or bring rain gear.
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Daily Overview */}
      <div className="p-6 bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Daily Overview</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
            <div className="flex items-center space-x-2 mb-2">
              <Sun className="w-5 h-5 text-yellow-500" />
              <h4 className="font-medium text-gray-900 dark:text-white">Morning</h4>
            </div>
            <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-300">
              {morningActivities.map((activity, idx) => (
                <li key={idx} className="truncate">{activity.title}</li>
              ))}
              {morningActivities.length === 0 && <li className="text-gray-400">No activities scheduled</li>}
            </ul>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
            <div className="flex items-center space-x-2 mb-2">
              <Sun className="w-5 h-5 text-blue-500" />
              <h4 className="font-medium text-gray-900 dark:text-white">Afternoon</h4>
            </div>
            <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-300">
              {afternoonActivities.map((activity, idx) => (
                <li key={idx} className="truncate">{activity.title}</li>
              ))}
              {afternoonActivities.length === 0 && <li className="text-gray-400">No activities scheduled</li>}
            </ul>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
            <div className="flex items-center space-x-2 mb-2">
              <Moon className="w-5 h-5 text-indigo-500" />
              <h4 className="font-medium text-gray-900 dark:text-white">Evening</h4>
            </div>
            <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-300">
              {eveningActivities.map((activity, idx) => (
                <li key={idx} className="truncate">{activity.title}</li>
              ))}
              {eveningActivities.length === 0 && <li className="text-gray-400">No activities scheduled</li>}
            </ul>
          </div>
        </div>
      </div>

      {/* Schedule Timeline */}
      <div className="p-6">
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary-500 to-secondary-500" />

          <div className="space-y-6">
            {schedule.map((item, index) => {
              const CategoryIcon = getCategoryIcon(item.category);
              const isExpanded = expandedItem === item.id;

              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="relative"
                >
                  {/* Timeline Dot */}
                  <div className={`absolute left-6 w-4 h-4 bg-gradient-to-r ${getCategoryColor(item.category)} rounded-full border-4 border-white dark:border-gray-800 shadow-lg`} />

                  {/* Activity Card */}
                  <div className="ml-16 bg-gray-50 dark:bg-gray-700 rounded-xl p-6 hover:shadow-lg transition-all duration-300">
                    <div 
                      className="cursor-pointer"
                      onClick={() => toggleItem(item.id)}
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <div className={`w-8 h-8 bg-gradient-to-r ${getCategoryColor(item.category)} rounded-lg flex items-center justify-center`}>
                              <CategoryIcon className="w-4 h-4 text-white" />
                            </div>
                            <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300">
                              <Clock className="w-4 h-4" />
                              <span className="font-medium">{formatTime(item.startTime)} - {formatTime(item.endTime)}</span>
                            </div>
                          </div>
                          
                          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                            {item.title}
                          </h3>
                          
                          <p className="text-gray-600 dark:text-gray-300 mb-3">
                            {item.description}
                          </p>

                          <div className="flex flex-wrap items-center gap-4 text-sm">
                            <div className="flex items-center space-x-1 text-gray-600 dark:text-gray-300">
                              <MapPin className="w-4 h-4" />
                              <span>{item.location}</span>
                            </div>
                            
                            <div className="flex items-center space-x-1 text-gray-600 dark:text-gray-300">
                              <DollarSign className="w-4 h-4" />
                              <span>{item.cost}</span>
                            </div>
                            
                            {item.bookingRequired && (
                              <span className="px-2 py-1 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 text-xs rounded-full flex items-center">
                                <AlertCircle className="w-3 h-3 mr-1" />
                                Booking Required
                              </span>
                            )}
                            
                            {item.weatherDependent && (
                              <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 text-xs rounded-full flex items-center">
                                <Umbrella className="w-3 h-3 mr-1" />
                                Weather Dependent
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="ml-4">
                          {isExpanded ? (
                            <ChevronUp className="w-5 h-5 text-gray-400" />
                          ) : (
                            <ChevronDown className="w-5 h-5 text-gray-400" />
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Expanded Activity Details */}
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="border-t border-gray-200 dark:border-gray-600 pt-4 mt-4"
                        >
                          {/* Address */}
                          {item.address && (
                            <div className="mb-4">
                              <h4 className="font-medium text-gray-900 dark:text-white mb-2">Address:</h4>
                              <p className="text-sm text-gray-600 dark:text-gray-300">{item.address}</p>
                            </div>
                          )}

                          {/* Transportation Info */}
                          {item.transportation && (
                            <div className="mb-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                              <h4 className="font-semibold text-blue-900 dark:text-blue-300 mb-2 flex items-center">
                                {React.createElement(getTransportIcon(item.transportation.method), { className: "w-4 h-4 mr-2" })}
                                Transportation
                              </h4>
                              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                                <div>
                                  <span className="text-gray-600 dark:text-gray-400">Method:</span>
                                  <div className="font-medium capitalize">{item.transportation.method}</div>
                                </div>
                                <div>
                                  <span className="text-gray-600 dark:text-gray-400">Duration:</span>
                                  <div className="font-medium">{item.transportation.duration}</div>
                                </div>
                                <div>
                                  <span className="text-gray-600 dark:text-gray-400">Cost:</span>
                                  <div className="font-medium">{item.transportation.cost}</div>
                                </div>
                              </div>
                              {item.transportation.details && (
                                <div className="mt-2 text-sm text-blue-700 dark:text-blue-300">
                                  {item.transportation.details}
                                </div>
                              )}
                            </div>
                          )}

                          {/* Booking Info */}
                          {item.bookingRequired && item.bookingInfo && (
                            <div className="mb-4 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                              <h4 className="font-semibold text-yellow-900 dark:text-yellow-300 mb-2 flex items-center">
                                <Smartphone className="w-4 h-4 mr-2" />
                                Booking Information
                              </h4>
                              <div className="space-y-2 text-sm">
                                {item.bookingInfo.platform && (
                                  <div className="flex items-start space-x-2">
                                    <CreditCard className="w-4 h-4 text-yellow-700 dark:text-yellow-400 mt-0.5" />
                                    <div>
                                      <span className="font-medium">Platform: </span>
                                      <span>{item.bookingInfo.platform}</span>
                                    </div>
                                  </div>
                                )}
                                {item.bookingInfo.deadline && (
                                  <div className="flex items-start space-x-2">
                                    <Clock className="w-4 h-4 text-yellow-700 dark:text-yellow-400 mt-0.5" />
                                    <div>
                                      <span className="font-medium">Book by: </span>
                                      <span>{item.bookingInfo.deadline}</span>
                                    </div>
                                  </div>
                                )}
                                {item.bookingInfo.url && (
                                  <div className="mt-2">
                                    <Button size="sm" variant="outline" className="text-xs">
                                      Book Now
                                    </Button>
                                  </div>
                                )}
                              </div>
                            </div>
                          )}

                          {/* Tips */}
                          {item.tips && item.tips.length > 0 && (
                            <div className="mb-4 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                              <h4 className="font-semibold text-green-900 dark:text-green-300 mb-2 flex items-center">
                                <Info className="w-4 h-4 mr-2" />
                                Insider Tips
                              </h4>
                              <ul className="space-y-1 text-sm">
                                {item.tips.map((tip, tipIndex) => (
                                  <li key={tipIndex} className="flex items-start space-x-2">
                                    <CheckCircle className="w-4 h-4 text-green-600 dark:text-green-400 mt-0.5" />
                                    <span className="text-gray-700 dark:text-gray-300">{tip}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}

                          {/* Weather-Dependent Alternatives */}
                          {item.weatherDependent && item.alternatives && item.alternatives.length > 0 && (
                            <div className="mb-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                              <h4 className="font-semibold text-blue-900 dark:text-blue-300 mb-2 flex items-center">
                                <Umbrella className="w-4 h-4 mr-2" />
                                Weather Alternatives
                              </h4>
                              <div className="space-y-3">
                                {item.alternatives.map((alt, altIndex) => (
                                  <div key={altIndex} className="bg-white dark:bg-gray-700 rounded-lg p-3">
                                    <div className="font-medium text-gray-900 dark:text-white mb-1">{alt.title}</div>
                                    <div className="text-xs text-gray-600 dark:text-gray-300">{alt.reason}</div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Day Summary */}
      <div className="bg-gray-50 dark:bg-gray-700 p-6 border-t border-gray-200 dark:border-gray-600">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center">
          <div className="mb-4 md:mb-0">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">Day Summary</h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              Total estimated cost: <span className="font-semibold">{totalCost}</span>
            </p>
          </div>
          
          {notes && (
            <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg max-w-md">
              <div className="flex items-start space-x-2">
                <Info className="w-4 h-4 text-yellow-600 dark:text-yellow-400 mt-0.5" />
                <p className="text-sm text-yellow-700 dark:text-yellow-300">{notes}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}