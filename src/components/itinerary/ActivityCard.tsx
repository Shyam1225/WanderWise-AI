import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  MapPin, Clock, DollarSign, Star, Users, Camera, 
  ExternalLink, Bookmark, Share2, Info, Award,
  ChevronDown, ChevronUp, Navigation, Phone
} from 'lucide-react';
import { Button } from '../ui/Button';

interface ActivityCardProps {
  activity: {
    id: string;
    title: string;
    description: string;
    location: string;
    address: string;
    duration: string;
    cost: string;
    priceRange: string;
    difficulty: 'Easy' | 'Moderate' | 'Hard';
    category: 'culture' | 'food' | 'adventure' | 'relaxation' | 'sightseeing';
    rating: number;
    reviews: number;
    highlights: string[];
    culturalSignificance?: string;
    bookingInfo?: {
      website?: string;
      phone?: string;
      advanceBooking: boolean;
      bestTimeToVisit: string;
    };
    photos: string[];
    tips: string[];
    accessibility?: string;
  };
  isExpanded?: boolean;
  onToggleExpand?: () => void;
}

export function ActivityCard({ activity, isExpanded = false, onToggleExpand }: ActivityCardProps) {
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [isBookmarked, setIsBookmarked] = useState(false);

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

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'text-green-600 bg-green-100 dark:bg-green-900/30';
      case 'Moderate': return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/30';
      case 'Hard': return 'text-red-600 bg-red-100 dark:bg-red-900/30';
      default: return 'text-gray-600 bg-gray-100 dark:bg-gray-900/30';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300"
    >
      {/* Image Gallery */}
      <div className="relative h-64 overflow-hidden">
        <img
          src={activity.photos[currentPhotoIndex]}
          alt={activity.title}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
        
        {/* Image Navigation */}
        {activity.photos.length > 1 && (
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {activity.photos.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentPhotoIndex(index)}
                className={`w-2 h-2 rounded-full transition-all duration-200 ${
                  index === currentPhotoIndex 
                    ? 'bg-white scale-125' 
                    : 'bg-white/50 hover:bg-white/75'
                }`}
              />
            ))}
          </div>
        )}

        {/* Category Badge */}
        <div className="absolute top-4 left-4">
          <span className={`px-3 py-1 bg-gradient-to-r ${getCategoryColor(activity.category)} text-white text-sm font-medium rounded-full capitalize`}>
            {activity.category}
          </span>
        </div>

        {/* Action Buttons */}
        <div className="absolute top-4 right-4 flex space-x-2">
          <button
            onClick={() => setIsBookmarked(!isBookmarked)}
            className={`p-2 rounded-full backdrop-blur-sm transition-colors duration-200 ${
              isBookmarked 
                ? 'bg-red-500 text-white' 
                : 'bg-white/20 text-white hover:bg-white/30'
            }`}
          >
            <Bookmark className="w-4 h-4" />
          </button>
          
          <button className="p-2 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors duration-200">
            <Share2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              {activity.title}
            </h3>
            
            <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-300 mb-3">
              <div className="flex items-center space-x-1">
                <Star className="w-4 h-4 text-yellow-500 fill-current" />
                <span className="font-medium">{activity.rating}</span>
                <span>({activity.reviews} reviews)</span>
              </div>
              
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(activity.difficulty)}`}>
                {activity.difficulty}
              </span>
            </div>
          </div>

          {onToggleExpand && (
            <button
              onClick={onToggleExpand}
              className="ml-4 p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-200"
            >
              {isExpanded ? (
                <ChevronUp className="w-5 h-5" />
              ) : (
                <ChevronDown className="w-5 h-5" />
              )}
            </button>
          )}
        </div>

        {/* Description */}
        <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
          {activity.description}
        </p>

        {/* Quick Info Grid */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="flex items-center space-x-2 text-sm">
            <MapPin className="w-4 h-4 text-gray-400" />
            <span className="text-gray-600 dark:text-gray-300">{activity.location}</span>
          </div>
          
          <div className="flex items-center space-x-2 text-sm">
            <Clock className="w-4 h-4 text-gray-400" />
            <span className="text-gray-600 dark:text-gray-300">{activity.duration}</span>
          </div>
          
          <div className="flex items-center space-x-2 text-sm">
            <DollarSign className="w-4 h-4 text-gray-400" />
            <span className="text-gray-600 dark:text-gray-300">{activity.cost}</span>
          </div>
          
          <div className="flex items-center space-x-2 text-sm">
            <Award className="w-4 h-4 text-gray-400" />
            <span className="text-gray-600 dark:text-gray-300">{activity.priceRange}</span>
          </div>
        </div>

        {/* Highlights */}
        <div className="mb-4">
          <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Highlights</h4>
          <div className="flex flex-wrap gap-2">
            {activity.highlights.slice(0, 3).map((highlight, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 text-sm rounded-full"
              >
                {highlight}
              </span>
            ))}
            {activity.highlights.length > 3 && (
              <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-sm rounded-full">
                +{activity.highlights.length - 3} more
              </span>
            )}
          </div>
        </div>

        {/* Expanded Content */}
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="border-t border-gray-200 dark:border-gray-700 pt-4 space-y-4"
          >
            {/* Cultural Significance */}
            {activity.culturalSignificance && (
              <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                <h4 className="font-semibold text-purple-900 dark:text-purple-300 mb-2 flex items-center">
                  <Info className="w-4 h-4 mr-2" />
                  Cultural Significance
                </h4>
                <p className="text-purple-800 dark:text-purple-200 text-sm">
                  {activity.culturalSignificance}
                </p>
              </div>
            )}

            {/* Address & Contact */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Address</h4>
                <p className="text-gray-600 dark:text-gray-300 text-sm">{activity.address}</p>
              </div>
              
              {activity.bookingInfo && (
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Booking Info</h4>
                  <div className="space-y-2 text-sm">
                    {activity.bookingInfo.phone && (
                      <div className="flex items-center space-x-2">
                        <Phone className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-600 dark:text-gray-300">{activity.bookingInfo.phone}</span>
                      </div>
                    )}
                    <div className="text-gray-600 dark:text-gray-300">
                      Best time: {activity.bookingInfo.bestTimeToVisit}
                    </div>
                    {activity.bookingInfo.advanceBooking && (
                      <div className="text-amber-600 dark:text-amber-400 text-xs">
                        ⚠️ Advance booking recommended
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Tips */}
            {activity.tips.length > 0 && (
              <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                <h4 className="font-semibold text-yellow-900 dark:text-yellow-300 mb-2">
                  Insider Tips
                </h4>
                <ul className="space-y-1 text-sm">
                  {activity.tips.map((tip, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full mt-2 flex-shrink-0" />
                      <span className="text-yellow-800 dark:text-yellow-200">{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Accessibility */}
            {activity.accessibility && (
              <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <h4 className="font-semibold text-blue-900 dark:text-blue-300 mb-2">
                  Accessibility
                </h4>
                <p className="text-blue-800 dark:text-blue-200 text-sm">
                  {activity.accessibility}
                </p>
              </div>
            )}
          </motion.div>
        )}

        {/* Action Buttons */}
        <div className="flex space-x-3 mt-6">
          <Button className="flex-1" size="sm">
            <Navigation className="w-4 h-4 mr-2" />
            Get Directions
          </Button>
          
          {activity.bookingInfo?.website && (
            <Button variant="outline" size="sm">
              <ExternalLink className="w-4 h-4 mr-2" />
              Book Now
            </Button>
          )}
        </div>
      </div>
    </motion.div>
  );
}