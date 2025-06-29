import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Utensils, Star, DollarSign, Clock, MapPin, Users,
  Leaf, Heart, Award, Phone, ExternalLink, Filter,
  ChefHat, Coffee, Wine, Cake
} from 'lucide-react';
import { Button } from '../ui/Button';

interface Restaurant {
  id: string;
  name: string;
  cuisine: string;
  mealType: 'breakfast' | 'lunch' | 'dinner' | 'snacks' | 'drinks';
  priceRange: '$' | '$$' | '$$$' | '$$$$';
  rating: number;
  reviews: number;
  location: string;
  address: string;
  phone?: string;
  website?: string;
  image: string;
  description: string;
  specialties: string[];
  culturalContext?: string;
  dietaryOptions: string[];
  atmosphere: 'casual' | 'upscale' | 'traditional' | 'modern' | 'romantic';
  touristFriendly: boolean;
  reservationRequired: boolean;
  averageMealDuration: string;
  bestTimeToVisit: string;
  mustTryDishes: string[];
  localTips: string[];
}

interface RestaurantRecommendationsProps {
  restaurants: Restaurant[];
}

export function RestaurantRecommendations({ restaurants }: RestaurantRecommendationsProps) {
  const [selectedMealType, setSelectedMealType] = useState<string>('all');
  const [selectedPriceRange, setSelectedPriceRange] = useState<string>('all');
  const [selectedDietary, setSelectedDietary] = useState<string>('all');

  const mealTypes = [
    { id: 'all', label: 'All Meals', icon: Utensils },
    { id: 'breakfast', label: 'Breakfast', icon: Coffee },
    { id: 'lunch', label: 'Lunch', icon: ChefHat },
    { id: 'dinner', label: 'Dinner', icon: Wine },
    { id: 'snacks', label: 'Snacks', icon: Cake },
  ];

  const priceRanges = [
    { id: 'all', label: 'All Prices' },
    { id: '$', label: 'Budget ($)' },
    { id: '$$', label: 'Moderate ($$)' },
    { id: '$$$', label: 'Upscale ($$$)' },
    { id: '$$$$', label: 'Fine Dining ($$$$)' },
  ];

  const dietaryOptions = [
    { id: 'all', label: 'All Options' },
    { id: 'vegetarian', label: 'Vegetarian' },
    { id: 'vegan', label: 'Vegan' },
    { id: 'gluten-free', label: 'Gluten-Free' },
    { id: 'halal', label: 'Halal' },
    { id: 'kosher', label: 'Kosher' },
  ];

  const filteredRestaurants = restaurants.filter(restaurant => {
    const mealTypeMatch = selectedMealType === 'all' || restaurant.mealType === selectedMealType;
    const priceMatch = selectedPriceRange === 'all' || restaurant.priceRange === selectedPriceRange;
    const dietaryMatch = selectedDietary === 'all' || 
      restaurant.dietaryOptions.some(option => 
        option.toLowerCase().includes(selectedDietary.toLowerCase())
      );
    
    return mealTypeMatch && priceMatch && dietaryMatch;
  });

  const getPriceColor = (priceRange: string) => {
    switch (priceRange) {
      case '$': return 'text-green-600 bg-green-100 dark:bg-green-900/30';
      case '$$': return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/30';
      case '$$$': return 'text-orange-600 bg-orange-100 dark:bg-orange-900/30';
      case '$$$$': return 'text-red-600 bg-red-100 dark:bg-red-900/30';
      default: return 'text-gray-600 bg-gray-100 dark:bg-gray-900/30';
    }
  };

  const getAtmosphereColor = (atmosphere: string) => {
    switch (atmosphere) {
      case 'casual': return 'text-blue-600 bg-blue-100 dark:bg-blue-900/30';
      case 'upscale': return 'text-purple-600 bg-purple-100 dark:bg-purple-900/30';
      case 'traditional': return 'text-amber-600 bg-amber-100 dark:bg-amber-900/30';
      case 'modern': return 'text-cyan-600 bg-cyan-100 dark:bg-cyan-900/30';
      case 'romantic': return 'text-pink-600 bg-pink-100 dark:bg-pink-900/30';
      default: return 'text-gray-600 bg-gray-100 dark:bg-gray-900/30';
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-display font-bold text-gray-900 dark:text-white mb-4">
          Restaurant Recommendations
        </h2>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          Discover authentic flavors and culinary experiences that showcase the best of local cuisine
        </p>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
        <div className="flex items-center space-x-2 mb-4">
          <Filter className="w-5 h-5 text-gray-600 dark:text-gray-300" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Filter Restaurants</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Meal Type Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Meal Type
            </label>
            <div className="flex flex-wrap gap-2">
              {mealTypes.map((type) => (
                <button
                  key={type.id}
                  onClick={() => setSelectedMealType(type.id)}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                    selectedMealType === type.id
                      ? 'bg-primary-500 text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-primary-100 dark:hover:bg-primary-900/30'
                  }`}
                >
                  <type.icon className="w-4 h-4" />
                  <span>{type.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Price Range Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Price Range
            </label>
            <select
              value={selectedPriceRange}
              onChange={(e) => setSelectedPriceRange(e.target.value)}
              className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-gray-900 dark:text-white"
            >
              {priceRanges.map((range) => (
                <option key={range.id} value={range.id}>
                  {range.label}
                </option>
              ))}
            </select>
          </div>

          {/* Dietary Options Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Dietary Options
            </label>
            <select
              value={selectedDietary}
              onChange={(e) => setSelectedDietary(e.target.value)}
              className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-gray-900 dark:text-white"
            >
              {dietaryOptions.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Restaurant Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {filteredRestaurants.map((restaurant, index) => (
          <motion.div
            key={restaurant.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300"
          >
            {/* Restaurant Image */}
            <div className="relative h-48 overflow-hidden">
              <img
                src={restaurant.image}
                alt={restaurant.name}
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
              />
              
              {/* Badges */}
              <div className="absolute top-4 left-4 flex space-x-2">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriceColor(restaurant.priceRange)}`}>
                  {restaurant.priceRange}
                </span>
                
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getAtmosphereColor(restaurant.atmosphere)}`}>
                  {restaurant.atmosphere}
                </span>
              </div>

              {/* Tourist Friendly Badge */}
              {restaurant.touristFriendly && (
                <div className="absolute top-4 right-4">
                  <span className="px-2 py-1 bg-green-500 text-white text-xs font-medium rounded-full">
                    Tourist Friendly
                  </span>
                </div>
              )}
            </div>

            {/* Content */}
            <div className="p-6">
              {/* Header */}
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">
                    {restaurant.name}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    {restaurant.cuisine} • {restaurant.mealType}
                  </p>
                </div>
                
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                  <span className="font-medium text-gray-900 dark:text-white">{restaurant.rating}</span>
                  <span className="text-gray-500 dark:text-gray-400 text-sm">({restaurant.reviews})</span>
                </div>
              </div>

              {/* Description */}
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 leading-relaxed">
                {restaurant.description}
              </p>

              {/* Quick Info */}
              <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-600 dark:text-gray-300">{restaurant.location}</span>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-600 dark:text-gray-300">{restaurant.averageMealDuration}</span>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Users className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-600 dark:text-gray-300">
                    {restaurant.reservationRequired ? 'Reservation Required' : 'Walk-ins Welcome'}
                  </span>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Award className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-600 dark:text-gray-300">{restaurant.bestTimeToVisit}</span>
                </div>
              </div>

              {/* Specialties */}
              <div className="mb-4">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Specialties</h4>
                <div className="flex flex-wrap gap-2">
                  {restaurant.specialties.slice(0, 3).map((specialty, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-1 bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 text-xs rounded-full"
                    >
                      {specialty}
                    </span>
                  ))}
                </div>
              </div>

              {/* Must-Try Dishes */}
              <div className="mb-4">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Must-Try Dishes</h4>
                <ul className="space-y-1">
                  {restaurant.mustTryDishes.slice(0, 3).map((dish, idx) => (
                    <li key={idx} className="flex items-start space-x-2 text-sm">
                      <div className="w-1.5 h-1.5 bg-primary-500 rounded-full mt-2 flex-shrink-0" />
                      <span className="text-gray-600 dark:text-gray-300">{dish}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Dietary Options */}
              {restaurant.dietaryOptions.length > 0 && (
                <div className="mb-4">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2 flex items-center">
                    <Leaf className="w-4 h-4 mr-2 text-green-500" />
                    Dietary Options
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {restaurant.dietaryOptions.map((option, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 text-xs rounded-full"
                      >
                        {option}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Cultural Context */}
              {restaurant.culturalContext && (
                <div className="mb-4 p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                  <h4 className="font-semibold text-purple-900 dark:text-purple-300 mb-1 text-sm">
                    Cultural Context
                  </h4>
                  <p className="text-purple-800 dark:text-purple-200 text-xs">
                    {restaurant.culturalContext}
                  </p>
                </div>
              )}

              {/* Local Tips */}
              {restaurant.localTips.length > 0 && (
                <div className="mb-4 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                  <h4 className="font-semibold text-yellow-900 dark:text-yellow-300 mb-2 text-sm">
                    Local Tips
                  </h4>
                  <ul className="space-y-1">
                    {restaurant.localTips.slice(0, 2).map((tip, idx) => (
                      <li key={idx} className="flex items-start space-x-2 text-xs">
                        <div className="w-1 h-1 bg-yellow-500 rounded-full mt-1.5 flex-shrink-0" />
                        <span className="text-yellow-800 dark:text-yellow-200">{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex space-x-3">
                <Button className="flex-1" size="sm">
                  <MapPin className="w-4 h-4 mr-2" />
                  Directions
                </Button>
                
                {restaurant.phone && (
                  <Button variant="outline" size="sm">
                    <Phone className="w-4 h-4 mr-2" />
                    Call
                  </Button>
                )}
                
                {restaurant.website && (
                  <Button variant="outline" size="sm">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Website
                  </Button>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* No Results */}
      {filteredRestaurants.length === 0 && (
        <div className="text-center py-12">
          <Utensils className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            No restaurants found
          </h3>
          <p className="text-gray-600 dark:text-gray-300">
            Try adjusting your filters to see more options.
          </p>
        </div>
      )}
    </div>
  );
}