import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, MapPin, DollarSign, Users, ChevronDown, ChevronUp, Car, Train, Scaling as Walking, Plane, Activity, Utensils, Camera, Star, Info, Navigation, Bus, Bike, Ship } from 'lucide-react';

interface Activity {
  id: string;
  time: string;
  title: string;
  description: string;
  location: string;
  duration: string;
  cost: string;
  difficulty: 'Easy' | 'Moderate' | 'Hard';
  category: 'culture' | 'food' | 'adventure' | 'relaxation' | 'sightseeing';
  transportation?: {
    method: 'walking' | 'taxi' | 'public' | 'car' | 'train' | 'bus' | 'plane';
    duration: string;
    cost: string;
  };
  tips?: string[];
}

interface DayData {
  day: number;
  date: string;
  theme: string;
  totalCost: string;
  activities: Activity[];
}

interface DayTimelineProps {
  days: DayData[];
}

export function DayTimeline({ days }: DayTimelineProps) {
  const [expandedDay, setExpandedDay] = useState<number | null>(1); // Default to first day expanded
  const [expandedActivity, setExpandedActivity] = useState<string | null>(null);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'culture': return Activity;
      case 'food': return Utensils;
      case 'adventure': return Star;
      case 'sightseeing': return Camera;
      case 'relaxation': return Star;
      default: return MapPin;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'culture': return 'from-purple-500 to-indigo-500';
      case 'food': return 'from-orange-500 to-red-500';
      case 'adventure': return 'from-green-500 to-teal-500';
      case 'relaxation': return 'from-blue-500 to-cyan-500';
      case 'sightseeing': return 'from-pink-500 to-rose-500';
      default: return 'from-gray-500 to-gray-600';
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
      case 'bike': return Bike;
      case 'boat': return Ship;
      default: return Navigation;
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'text-green-600 bg-green-100 dark:bg-green-900/30';
      case 'Moderate': return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/30';
      case 'Hard': return 'text-red-600 bg-red-100 dark:bg-red-900/30';
      default: return 'text-gray-600 bg-gray-100 dark:bg-gray-900/30';
    }
  };

  return (
    <div className="space-y-8">
      {days.map((day, dayIndex) => (
        <motion.div
          key={day.day}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: dayIndex * 0.1 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden"
        >
          {/* Day Header */}
          <div 
            className="bg-gradient-to-r from-primary-500 to-secondary-500 p-6 cursor-pointer"
            onClick={() => setExpandedDay(expandedDay === day.day ? null : day.day)}
          >
            <div className="flex items-center justify-between text-white">
              <div>
                <h2 className="text-2xl font-bold">Day {day.day}</h2>
                <p className="text-white/90">{day.date} • {day.theme}</p>
              </div>
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <div className="text-sm opacity-90">Daily Budget</div>
                  <div className="font-semibold">{day.totalCost}</div>
                </div>
                {expandedDay === day.day ? (
                  <ChevronUp className="w-6 h-6" />
                ) : (
                  <ChevronDown className="w-6 h-6" />
                )}
              </div>
            </div>
          </div>

          {/* Day Activities */}
          <AnimatePresence>
            {expandedDay === day.day && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="p-6"
              >
                <div className="relative">
                  {/* Timeline Line */}
                  <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary-500 to-secondary-500" />

                  <div className="space-y-6">
                    {day.activities.map((activity, activityIndex) => {
                      const CategoryIcon = getCategoryIcon(activity.category);
                      const isExpanded = expandedActivity === activity.id;

                      return (
                        <motion.div
                          key={activity.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: activityIndex * 0.1 }}
                          className="relative"
                        >
                          {/* Timeline Dot */}
                          <div className={`absolute left-6 w-4 h-4 bg-gradient-to-r ${getCategoryColor(activity.category)} rounded-full border-4 border-white dark:border-gray-800 shadow-lg`} />

                          {/* Activity Card */}
                          <div className="ml-16 bg-gray-50 dark:bg-gray-700 rounded-xl p-6 hover:shadow-lg transition-all duration-300">
                            <div 
                              className="cursor-pointer"
                              onClick={() => setExpandedActivity(isExpanded ? null : activity.id)}
                            >
                              <div className="flex items-start justify-between mb-4">
                                <div className="flex-1">
                                  <div className="flex items-center space-x-3 mb-2">
                                    <div className={`w-8 h-8 bg-gradient-to-r ${getCategoryColor(activity.category)} rounded-lg flex items-center justify-center`}>
                                      <CategoryIcon className="w-4 h-4 text-white" />
                                    </div>
                                    <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300">
                                      <Clock className="w-4 h-4" />
                                      <span className="font-medium">{activity.time}</span>
                                      <span>•</span>
                                      <span>{activity.duration}</span>
                                    </div>
                                  </div>
                                  
                                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                                    {activity.title}
                                  </h3>
                                  
                                  <p className="text-gray-600 dark:text-gray-300 mb-3">
                                    {activity.description}
                                  </p>

                                  <div className="flex items-center space-x-4 text-sm">
                                    <div className="flex items-center space-x-1 text-gray-600 dark:text-gray-300">
                                      <MapPin className="w-4 h-4" />
                                      <span>{activity.location}</span>
                                    </div>
                                    
                                    <div className="flex items-center space-x-1 text-gray-600 dark:text-gray-300">
                                      <DollarSign className="w-4 h-4" />
                                      <span>{activity.cost}</span>
                                    </div>
                                    
                                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(activity.difficulty)}`}>
                                      {activity.difficulty}
                                    </span>
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
                                  {/* Transportation Info */}
                                  {activity.transportation && (
                                    <div className="mb-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                                      <h4 className="font-semibold text-blue-900 dark:text-blue-300 mb-2 flex items-center">
                                        {React.createElement(getTransportIcon(activity.transportation.method), { className: "w-4 h-4 mr-2" })}
                                        Transportation
                                      </h4>
                                      <div className="grid grid-cols-3 gap-4 text-sm">
                                        <div>
                                          <span className="text-gray-600 dark:text-gray-400">Method:</span>
                                          <div className="font-medium capitalize">{activity.transportation.method}</div>
                                        </div>
                                        <div>
                                          <span className="text-gray-600 dark:text-gray-400">Duration:</span>
                                          <div className="font-medium">{activity.transportation.duration}</div>
                                        </div>
                                        <div>
                                          <span className="text-gray-600 dark:text-gray-400">Cost:</span>
                                          <div className="font-medium">{activity.transportation.cost}</div>
                                        </div>
                                      </div>
                                    </div>
                                  )}

                                  {/* Tips */}
                                  {activity.tips && activity.tips.length > 0 && (
                                    <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                                      <h4 className="font-semibold text-yellow-900 dark:text-yellow-300 mb-2 flex items-center">
                                        <Info className="w-4 h-4 mr-2" />
                                        Insider Tips
                                      </h4>
                                      <ul className="space-y-1 text-sm">
                                        {activity.tips.map((tip, tipIndex) => (
                                          <li key={tipIndex} className="flex items-start space-x-2">
                                            <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full mt-2 flex-shrink-0" />
                                            <span className="text-gray-700 dark:text-gray-300">{tip}</span>
                                          </li>
                                        ))}
                                      </ul>
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
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}
    </div>
  );
}