import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Car, Train, Bus, Scaling as Walking, Plane, Bike, Ship, Clock, DollarSign, Users, MapPin, Info, Star, Navigation, Smartphone, CreditCard, AlertCircle } from 'lucide-react';

interface TransportRoute {
  id: string;
  from: string;
  to: string;
  methods: Array<{
    type: 'walking' | 'taxi' | 'bus' | 'train' | 'metro' | 'bike' | 'car' | 'plane' | 'boat';
    name: string;
    duration: string;
    cost: string;
    frequency?: string;
    comfort: 'basic' | 'standard' | 'premium';
    difficulty: 'easy' | 'moderate' | 'challenging';
    description: string;
    pros: string[];
    cons: string[];
    tips: string[];
    bookingInfo?: {
      advance: boolean;
      apps: string[];
      paymentMethods: string[];
    };
  }>;
}

interface TransportationGuideProps {
  routes: TransportRoute[];
  localEtiquette: {
    generalTips: string[];
    paymentTips: string[];
    culturalNorms: string[];
    safetyTips: string[];
  };
}

export function TransportationGuide({ routes, localEtiquette }: TransportationGuideProps) {
  const [selectedRoute, setSelectedRoute] = useState<string | null>(routes[0]?.id || null);
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);

  const getTransportIcon = (type: string) => {
    switch (type) {
      case 'walking': return Walking;
      case 'taxi': return Car;
      case 'bus': return Bus;
      case 'train': return Train;
      case 'metro': return Train;
      case 'bike': return Bike;
      case 'car': return Car;
      case 'plane': return Plane;
      case 'boat': return Ship;
      default: return Navigation;
    }
  };

  const getComfortColor = (comfort: string) => {
    switch (comfort) {
      case 'basic': return 'text-gray-600 bg-gray-100 dark:bg-gray-900/30';
      case 'standard': return 'text-blue-600 bg-blue-100 dark:bg-blue-900/30';
      case 'premium': return 'text-purple-600 bg-purple-100 dark:bg-purple-900/30';
      default: return 'text-gray-600 bg-gray-100 dark:bg-gray-900/30';
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'text-green-600 bg-green-100 dark:bg-green-900/30';
      case 'moderate': return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/30';
      case 'challenging': return 'text-red-600 bg-red-100 dark:bg-red-900/30';
      default: return 'text-gray-600 bg-gray-100 dark:bg-gray-900/30';
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-display font-bold text-gray-900 dark:text-white mb-4">
          Transportation Guide
        </h2>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          Navigate like a local with comprehensive transportation options, costs, and insider tips
        </p>
      </div>

      {/* Routes */}
      <div className="space-y-6">
        {routes.map((route, routeIndex) => (
          <motion.div
            key={route.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: routeIndex * 0.1 }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden"
          >
            {/* Route Header */}
            <div 
              className="bg-gradient-to-r from-primary-500 to-secondary-500 p-6 cursor-pointer"
              onClick={() => setSelectedRoute(selectedRoute === route.id ? null : route.id)}
            >
              <div className="flex items-center justify-between text-white">
                <div className="flex items-center space-x-4">
                  <Navigation className="w-6 h-6" />
                  <div>
                    <h3 className="text-xl font-semibold">
                      {route.from} → {route.to}
                    </h3>
                    <p className="text-white/90">{route.methods.length} transportation options</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm opacity-90">Best Option</div>
                  <div className="font-semibold">{route.methods[0]?.name}</div>
                </div>
              </div>
            </div>

            {/* Transportation Methods */}
            {selectedRoute === route.id && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="p-6"
              >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {route.methods.map((method, methodIndex) => {
                    const TransportIcon = getTransportIcon(method.type);
                    const isSelected = selectedMethod === `${route.id}-${methodIndex}`;

                    return (
                      <motion.div
                        key={methodIndex}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: methodIndex * 0.1 }}
                        className={`border-2 rounded-xl p-6 cursor-pointer transition-all duration-300 ${
                          isSelected 
                            ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20' 
                            : 'border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-primary-600'
                        }`}
                        onClick={() => setSelectedMethod(isSelected ? null : `${route.id}-${methodIndex}`)}
                      >
                        {/* Method Header */}
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center">
                              <TransportIcon className="w-5 h-5 text-white" />
                            </div>
                            <div>
                              <h4 className="font-semibold text-gray-900 dark:text-white">
                                {method.name}
                              </h4>
                              <p className="text-gray-600 dark:text-gray-300 text-sm capitalize">
                                {method.type}
                              </p>
                            </div>
                          </div>
                          
                          <div className="text-right">
                            <div className="font-semibold text-gray-900 dark:text-white">
                              {method.cost}
                            </div>
                            <div className="text-gray-600 dark:text-gray-300 text-sm">
                              {method.duration}
                            </div>
                          </div>
                        </div>

                        {/* Quick Info */}
                        <div className="grid grid-cols-2 gap-3 mb-4">
                          <div className="flex items-center space-x-2">
                            <Clock className="w-4 h-4 text-gray-400" />
                            <span className="text-gray-600 dark:text-gray-300 text-sm">
                              {method.frequency || method.duration}
                            </span>
                          </div>
                          
                          <div className="flex items-center space-x-2">
                            <Star className="w-4 h-4 text-gray-400" />
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getComfortColor(method.comfort)}`}>
                              {method.comfort}
                            </span>
                          </div>
                        </div>

                        {/* Description */}
                        <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                          {method.description}
                        </p>

                        {/* Badges */}
                        <div className="flex space-x-2 mb-4">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(method.difficulty)}`}>
                            {method.difficulty}
                          </span>
                        </div>

                        {/* Expanded Details */}
                        {isSelected && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="border-t border-gray-200 dark:border-gray-700 pt-4 mt-4 space-y-4"
                          >
                            {/* Pros and Cons */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                <h5 className="font-semibold text-green-700 dark:text-green-300 mb-2">
                                  Advantages
                                </h5>
                                <ul className="space-y-1">
                                  {method.pros.map((pro, idx) => (
                                    <li key={idx} className="flex items-start space-x-2 text-sm">
                                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                                      <span className="text-gray-600 dark:text-gray-300">{pro}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                              
                              <div>
                                <h5 className="font-semibold text-red-700 dark:text-red-300 mb-2">
                                  Considerations
                                </h5>
                                <ul className="space-y-1">
                                  {method.cons.map((con, idx) => (
                                    <li key={idx} className="flex items-start space-x-2 text-sm">
                                      <div className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2 flex-shrink-0" />
                                      <span className="text-gray-600 dark:text-gray-300">{con}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>

                            {/* Booking Information */}
                            {method.bookingInfo && (
                              <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                                <h5 className="font-semibold text-blue-900 dark:text-blue-300 mb-2 flex items-center">
                                  <Smartphone className="w-4 h-4 mr-2" />
                                  Booking & Payment
                                </h5>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                                  <div>
                                    <span className="text-blue-800 dark:text-blue-200 font-medium">Apps:</span>
                                    <div className="text-blue-700 dark:text-blue-300">
                                      {method.bookingInfo.apps.join(', ')}
                                    </div>
                                  </div>
                                  <div>
                                    <span className="text-blue-800 dark:text-blue-200 font-medium">Payment:</span>
                                    <div className="text-blue-700 dark:text-blue-300">
                                      {method.bookingInfo.paymentMethods.join(', ')}
                                    </div>
                                  </div>
                                </div>
                                {method.bookingInfo.advance && (
                                  <div className="mt-2 text-amber-700 dark:text-amber-300 text-xs flex items-center">
                                    <AlertCircle className="w-3 h-3 mr-1" />
                                    Advance booking recommended
                                  </div>
                                )}
                              </div>
                            )}

                            {/* Tips */}
                            {method.tips.length > 0 && (
                              <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                                <h5 className="font-semibold text-yellow-900 dark:text-yellow-300 mb-2 flex items-center">
                                  <Info className="w-4 h-4 mr-2" />
                                  Insider Tips
                                </h5>
                                <ul className="space-y-1">
                                  {method.tips.map((tip, idx) => (
                                    <li key={idx} className="flex items-start space-x-2 text-sm">
                                      <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full mt-2 flex-shrink-0" />
                                      <span className="text-yellow-800 dark:text-yellow-200">{tip}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </motion.div>
                        )}
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Local Transportation Etiquette */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="bg-gradient-to-r from-purple-500 to-indigo-500 rounded-2xl p-8 text-white"
      >
        <h3 className="text-2xl font-bold mb-6 flex items-center">
          <Users className="w-6 h-6 mr-3" />
          Local Transportation Etiquette
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div>
            <h4 className="font-semibold mb-3 flex items-center">
              <Info className="w-4 h-4 mr-2" />
              General Tips
            </h4>
            <ul className="space-y-2 text-sm text-white/90">
              {localEtiquette.generalTips.map((tip, idx) => (
                <li key={idx} className="flex items-start space-x-2">
                  <div className="w-1 h-1 bg-white rounded-full mt-2 flex-shrink-0" />
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-3 flex items-center">
              <CreditCard className="w-4 h-4 mr-2" />
              Payment Tips
            </h4>
            <ul className="space-y-2 text-sm text-white/90">
              {localEtiquette.paymentTips.map((tip, idx) => (
                <li key={idx} className="flex items-start space-x-2">
                  <div className="w-1 h-1 bg-white rounded-full mt-2 flex-shrink-0" />
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-3 flex items-center">
              <Users className="w-4 h-4 mr-2" />
              Cultural Norms
            </h4>
            <ul className="space-y-2 text-sm text-white/90">
              {localEtiquette.culturalNorms.map((tip, idx) => (
                <li key={idx} className="flex items-start space-x-2">
                  <div className="w-1 h-1 bg-white rounded-full mt-2 flex-shrink-0" />
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-3 flex items-center">
              <AlertCircle className="w-4 h-4 mr-2" />
              Safety Tips
            </h4>
            <ul className="space-y-2 text-sm text-white/90">
              {localEtiquette.safetyTips.map((tip, idx) => (
                <li key={idx} className="flex items-start space-x-2">
                  <div className="w-1 h-1 bg-white rounded-full mt-2 flex-shrink-0" />
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </motion.div>
    </div>
  );
}