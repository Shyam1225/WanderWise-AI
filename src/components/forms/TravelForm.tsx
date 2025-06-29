import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MapPin, Calendar, Users, DollarSign, Heart, Mountain, 
  Utensils, Building, Music, TreePine, Palette, ShoppingBag, 
  Waves, ChevronDown, ChevronUp, Plane, Bed, Accessibility,
  Globe, Languages, Check, X, Search, Sparkles, AlertCircle,
  Train, Bus, Car
} from 'lucide-react';
import { Button } from '../ui/Button';
import { TripResults } from '../results/TripResults';
import { useGeminiAPI } from '../../hooks/useGeminiAPI';

interface TravelFormData {
  origin: string;
  destination: string;
  departureDate: string;
  returnDate: string;
  groupSize: number;
  specialRequirements: string;
  interests: string[];
  budget: number;
  travelStyle: string;
  accommodation: string;
  dietaryRestrictions: string;
  accessibilityNeeds: string;
  languagePreferences: string[];
  transportationType: 'flight' | 'train' | 'bus' | 'car' | 'any';
}

const interestTags = [
  { id: 'culture', label: 'Culture', icon: Building, color: 'from-purple-500 to-pink-500' },
  { id: 'adventure', label: 'Adventure', icon: Mountain, color: 'from-green-500 to-teal-500' },
  { id: 'food', label: 'Food', icon: Utensils, color: 'from-orange-500 to-red-500' },
  { id: 'history', label: 'History', icon: Building, color: 'from-amber-500 to-orange-500' },
  { id: 'nightlife', label: 'Nightlife', icon: Music, color: 'from-indigo-500 to-purple-500' },
  { id: 'nature', label: 'Nature', icon: TreePine, color: 'from-green-400 to-emerald-500' },
  { id: 'art', label: 'Art', icon: Palette, color: 'from-pink-500 to-rose-500' },
  { id: 'shopping', label: 'Shopping', icon: ShoppingBag, color: 'from-blue-500 to-indigo-500' },
  { id: 'relaxation', label: 'Relaxation', icon: Waves, color: 'from-cyan-500 to-blue-500' },
];

const budgetRanges = [
  { id: 'budget', label: 'Budget', range: '$50-100/day', value: 75 },
  { id: 'comfort', label: 'Comfort', range: '$100-250/day', value: 175 },
  { id: 'luxury', label: 'Luxury', range: '$250-500/day', value: 375 },
  { id: 'ultra-luxury', label: 'Ultra-Luxury', range: '$500+/day', value: 750 },
];

const travelStyles = [
  { id: 'backpacker', label: 'Backpacker', description: 'Budget-friendly, authentic experiences' },
  { id: 'budget', label: 'Budget Traveler', description: 'Value-conscious with comfort' },
  { id: 'comfort', label: 'Comfort Seeker', description: 'Balance of comfort and experience' },
  { id: 'luxury', label: 'Luxury Traveler', description: 'Premium experiences and service' },
];

const transportationTypes = [
  { id: 'flight', label: 'Flight', icon: Plane },
  { id: 'train', label: 'Train', icon: Train },
  { id: 'bus', label: 'Bus', icon: Bus },
  { id: 'car', label: 'Car', icon: Car },
  { id: 'any', label: 'Any', icon: Globe },
];

export function TravelForm() {
  const [formData, setFormData] = useState<TravelFormData>({
    origin: '',
    destination: '',
    departureDate: '',
    returnDate: '',
    groupSize: 2,
    specialRequirements: '',
    interests: [],
    budget: 175,
    travelStyle: 'comfort',
    accommodation: '',
    dietaryRestrictions: '',
    accessibilityNeeds: '',
    languagePreferences: [],
    transportationType: 'flight',
  });

  const [showAdvanced, setShowAdvanced] = useState(false);
  const [tripDuration, setTripDuration] = useState(0);
  const [completionPercentage, setCompletionPercentage] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const { 
    generateItinerary, 
    isLoading, 
    error, 
    response, 
    progress,
    currentMessage,
    retryCount,
    clearResponse, 
    clearError,
    cancelRequest
  } = useGeminiAPI();

  // Calculate trip duration
  useEffect(() => {
    if (formData.departureDate && formData.returnDate) {
      const departure = new Date(formData.departureDate);
      const returnDate = new Date(formData.returnDate);
      const diffTime = Math.abs(returnDate.getTime() - departure.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      setTripDuration(diffDays);
    }
  }, [formData.departureDate, formData.returnDate]);

  // Calculate form completion
  useEffect(() => {
    const requiredFields = ['origin', 'destination', 'departureDate', 'returnDate'];
    const completedRequired = requiredFields.filter(field => formData[field as keyof TravelFormData]).length;
    const hasInterests = formData.interests.length > 0;
    const completion = ((completedRequired / requiredFields.length) * 70) + (hasInterests ? 30 : 0);
    setCompletionPercentage(Math.round(completion));
  }, [formData]);

  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};

    if (!formData.origin.trim()) {
      errors.origin = 'Origin is required';
    }

    if (!formData.destination.trim()) {
      errors.destination = 'Destination is required';
    }

    if (!formData.departureDate) {
      errors.departureDate = 'Departure date is required';
    }

    if (!formData.returnDate) {
      errors.returnDate = 'Return date is required';
    }

    if (formData.departureDate && formData.returnDate) {
      const departure = new Date(formData.departureDate);
      const returnDate = new Date(formData.returnDate);
      
      if (departure >= returnDate) {
        errors.returnDate = 'Return date must be after departure date';
      }

      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      if (departure < today) {
        errors.departureDate = 'Departure date cannot be in the past';
      }
    }

    if (formData.interests.length === 0) {
      errors.interests = 'Please select at least one interest';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleInputChange = (field: keyof TravelFormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear specific field error when user starts typing
    if (formErrors[field]) {
      setFormErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const toggleInterest = (interestId: string) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interestId)
        ? prev.interests.filter(id => id !== interestId)
        : [...prev.interests, interestId]
    }));
    
    // Clear interests error when user selects an interest
    if (formErrors.interests) {
      setFormErrors(prev => ({ ...prev, interests: '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    clearError();
    clearResponse();
    setShowResults(true);
    await generateItinerary(formData);
  };

  const handleRegenerate = async () => {
    clearError();
    clearResponse();
    await generateItinerary(formData);
  };

  const handleCancel = () => {
    cancelRequest();
    setShowResults(false);
  };

  const handleSave = () => {
    // Implement save functionality
    console.log('Saving trip...');
  };

  const handleShare = () => {
    // Implement share functionality
    console.log('Sharing trip...');
  };

  if (showResults) {
    return (
      <div className="max-w-6xl mx-auto">
        <TripResults
          itinerary={response || ''}
          isLoading={isLoading}
          error={error}
          progress={progress}
          currentMessage={currentMessage}
          retryCount={retryCount}
          onRegenerate={handleRegenerate}
          onSave={handleSave}
          onShare={handleShare}
          onCancel={handleCancel}
          formData={formData}
        />
        
        {!isLoading && (
          <div className="mt-8 text-center">
            <Button
              variant="outline"
              onClick={() => setShowResults(false)}
              className="min-w-[200px]"
            >
              ← Back to Form
            </Button>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Form Completion
          </span>
          <span className="text-sm font-medium text-primary-600 dark:text-primary-400">
            {completionPercentage}%
          </span>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
          <motion.div
            className="bg-gradient-to-r from-primary-500 to-secondary-500 h-2 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${completionPercentage}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Origin Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl p-6 shadow-xl"
        >
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-xl flex items-center justify-center">
              <Plane className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Where are you traveling from?
            </h2>
          </div>

          <div className="relative">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={formData.origin}
                onChange={(e) => handleInputChange('origin', e.target.value)}
                placeholder="Enter your departure city..."
                className={`w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-700 border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 text-gray-900 dark:text-white transition-colors duration-200 ${
                  formErrors.origin 
                    ? 'border-red-500 dark:border-red-400' 
                    : 'border-gray-200 dark:border-gray-600'
                }`}
              />
              {formErrors.origin && (
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <AlertCircle className="w-5 h-5 text-red-500" />
                </div>
              )}
            </div>
            
            {formErrors.origin && (
              <p className="mt-2 text-sm text-red-600 dark:text-red-400 flex items-center">
                <AlertCircle className="w-4 h-4 mr-1" />
                {formErrors.origin}
              </p>
            )}
          </div>
        </motion.div>

        {/* Destination Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl p-6 shadow-xl"
        >
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-xl flex items-center justify-center">
              <MapPin className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Where do you want to go?
            </h2>
          </div>

          <div className="relative">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={formData.destination}
                onChange={(e) => handleInputChange('destination', e.target.value)}
                placeholder="Enter your destination..."
                className={`w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-700 border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 text-gray-900 dark:text-white transition-colors duration-200 ${
                  formErrors.destination 
                    ? 'border-red-500 dark:border-red-400' 
                    : 'border-gray-200 dark:border-gray-600'
                }`}
              />
              {formErrors.destination && (
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <AlertCircle className="w-5 h-5 text-red-500" />
                </div>
              )}
            </div>
            
            {formErrors.destination && (
              <p className="mt-2 text-sm text-red-600 dark:text-red-400 flex items-center">
                <AlertCircle className="w-4 h-4 mr-1" />
                {formErrors.destination}
              </p>
            )}
          </div>
        </motion.div>

        {/* Transportation Type */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl p-6 shadow-xl"
        >
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-xl flex items-center justify-center">
              <Plane className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              How would you like to travel?
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {transportationTypes.map((type) => (
              <button
                key={type.id}
                type="button"
                onClick={() => handleInputChange('transportationType', type.id as any)}
                className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                  formData.transportationType === type.id
                    ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                    : 'border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-primary-600'
                }`}
              >
                <div className="flex flex-col items-center">
                  <type.icon className="w-6 h-6 mb-2 text-gray-700 dark:text-gray-300" />
                  <span className="font-medium text-gray-900 dark:text-white">
                    {type.label}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Travel Details Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl p-6 shadow-xl"
        >
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-xl flex items-center justify-center">
              <Calendar className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Travel Details
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Departure Date
              </label>
              <input
                type="date"
                value={formData.departureDate}
                onChange={(e) => handleInputChange('departureDate', e.target.value)}
                min={new Date().toISOString().split('T')[0]}
                className={`w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 text-gray-900 dark:text-white transition-colors duration-200 ${
                  formErrors.departureDate 
                    ? 'border-red-500 dark:border-red-400' 
                    : 'border-gray-200 dark:border-gray-600'
                }`}
              />
              {formErrors.departureDate && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400 flex items-center">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {formErrors.departureDate}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Return Date
              </label>
              <input
                type="date"
                value={formData.returnDate}
                onChange={(e) => handleInputChange('returnDate', e.target.value)}
                min={formData.departureDate || new Date().toISOString().split('T')[0]}
                className={`w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 text-gray-900 dark:text-white transition-colors duration-200 ${
                  formErrors.returnDate 
                    ? 'border-red-500 dark:border-red-400' 
                    : 'border-gray-200 dark:border-gray-600'
                }`}
              />
              {formErrors.returnDate && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400 flex items-center">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {formErrors.returnDate}
                </p>
              )}
            </div>
          </div>

          {tripDuration > 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mt-4 p-4 bg-primary-50 dark:bg-primary-900/20 rounded-xl"
            >
              <p className="text-primary-700 dark:text-primary-300 font-medium">
                Trip Duration: {tripDuration} {tripDuration === 1 ? 'day' : 'days'}
              </p>
            </motion.div>
          )}

          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Group Size
            </label>
            <div className="flex items-center space-x-4">
              <Users className="w-5 h-5 text-gray-400" />
              <input
                type="range"
                min="1"
                max="10"
                value={formData.groupSize}
                onChange={(e) => handleInputChange('groupSize', parseInt(e.target.value))}
                className="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
              />
              <span className="text-lg font-semibold text-gray-900 dark:text-white min-w-[3rem]">
                {formData.groupSize} {formData.groupSize === 1 ? 'person' : 'people'}
              </span>
            </div>
          </div>

          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Special Requirements
            </label>
            <textarea
              value={formData.specialRequirements}
              onChange={(e) => handleInputChange('specialRequirements', e.target.value)}
              placeholder="Any special requests, celebrations, or requirements..."
              rows={3}
              className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 text-gray-900 dark:text-white resize-none"
            />
          </div>
        </motion.div>

        {/* Travel Preferences Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl p-6 shadow-xl"
        >
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-xl flex items-center justify-center">
              <Heart className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              What interests you?
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {interestTags.map((interest) => (
              <motion.button
                key={interest.id}
                type="button"
                onClick={() => toggleInterest(interest.id)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`relative p-4 rounded-xl border-2 transition-all duration-200 ${
                  formData.interests.includes(interest.id)
                    ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                    : 'border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-primary-600'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className={`w-8 h-8 bg-gradient-to-r ${interest.color} rounded-lg flex items-center justify-center`}>
                    <interest.icon className="w-4 h-4 text-white" />
                  </div>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {interest.label}
                  </span>
                </div>
                {formData.interests.includes(interest.id) && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-2 -right-2 w-6 h-6 bg-primary-500 rounded-full flex items-center justify-center"
                  >
                    <Check className="w-3 h-3 text-white" />
                  </motion.div>
                )}
              </motion.button>
            ))}
          </div>
          
          {formErrors.interests && (
            <p className="mt-3 text-sm text-red-600 dark:text-red-400 flex items-center">
              <AlertCircle className="w-4 h-4 mr-1" />
              {formErrors.interests}
            </p>
          )}
        </motion.div>

        {/* Budget Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl p-6 shadow-xl"
        >
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-xl flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Budget & Travel Style
            </h2>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">
                Daily Budget Range
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {budgetRanges.map((budget) => (
                  <button
                    key={budget.id}
                    type="button"
                    onClick={() => handleInputChange('budget', budget.value)}
                    className={`p-4 rounded-xl border-2 transition-all duration-200 text-left ${
                      formData.budget === budget.value
                        ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                        : 'border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-primary-600'
                    }`}
                  >
                    <div className="font-semibold text-gray-900 dark:text-white">
                      {budget.label}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      {budget.range}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">
                Travel Style
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {travelStyles.map((style) => (
                  <button
                    key={style.id}
                    type="button"
                    onClick={() => handleInputChange('travelStyle', style.id)}
                    className={`p-4 rounded-xl border-2 transition-all duration-200 text-left ${
                      formData.travelStyle === style.id
                        ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                        : 'border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-primary-600'
                    }`}
                  >
                    <div className="font-semibold text-gray-900 dark:text-white">
                      {style.label}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      {style.description}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Advanced Options */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl p-6 shadow-xl"
        >
          <button
            type="button"
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="flex items-center justify-between w-full text-left"
          >
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-xl flex items-center justify-center">
                <Plane className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Advanced Options
              </h2>
            </div>
            {showAdvanced ? (
              <ChevronUp className="w-5 h-5 text-gray-400" />
            ) : (
              <ChevronDown className="w-5 h-5 text-gray-400" />
            )}
          </button>

          <AnimatePresence>
            {showAdvanced && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-6 space-y-6"
              >
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    <Bed className="inline w-4 h-4 mr-2" />
                    Accommodation Preferences
                  </label>
                  <select
                    value={formData.accommodation}
                    onChange={(e) => handleInputChange('accommodation', e.target.value)}
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 text-gray-900 dark:text-white"
                  >
                    <option value="">Any accommodation type</option>
                    <option value="hotel">Hotels</option>
                    <option value="hostel">Hostels</option>
                    <option value="airbnb">Vacation Rentals</option>
                    <option value="resort">Resorts</option>
                    <option value="boutique">Boutique Hotels</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    <Utensils className="inline w-4 h-4 mr-2" />
                    Dietary Restrictions
                  </label>
                  <input
                    type="text"
                    value={formData.dietaryRestrictions}
                    onChange={(e) => handleInputChange('dietaryRestrictions', e.target.value)}
                    placeholder="e.g., Vegetarian, Vegan, Gluten-free, Halal..."
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 text-gray-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    <Accessibility className="inline w-4 h-4 mr-2" />
                    Accessibility Needs
                  </label>
                  <textarea
                    value={formData.accessibilityNeeds}
                    onChange={(e) => handleInputChange('accessibilityNeeds', e.target.value)}
                    placeholder="Please describe any accessibility requirements..."
                    rows={3}
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 text-gray-900 dark:text-white resize-none"
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Submit Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center"
        >
          <Button
            type="submit"
            size="lg"
            className="px-12 py-4 text-lg font-semibold min-w-[300px]"
            disabled={completionPercentage < 70}
          >
            <Sparkles className="w-6 h-6 mr-3" />
            Generate My Perfect Trip
          </Button>
          {completionPercentage < 70 && (
            <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">
              Please complete the required fields to generate your trip
            </p>
          )}
        </motion.div>
      </form>
    </div>
  );
}