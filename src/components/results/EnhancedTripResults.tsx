import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  RefreshCw, Save, Share2, X, Download, Calendar, 
  MapPin, Users, DollarSign, Clock, Sparkles, 
  ChevronDown, ChevronUp, Printer, Copy, Check
} from 'lucide-react';
import { Button } from '../ui/Button';
import { TravelLoadingScreen } from '../ui/TravelLoadingScreen';
import { ErrorDisplay } from '../ui/ErrorDisplay';
import { ItineraryOverview } from '../itinerary/ItineraryOverview';
import { DayTimeline } from '../itinerary/DayTimeline';
import { MultiCityItinerary } from '../itinerary/MultiCityItinerary';
import { RestaurantRecommendations } from '../itinerary/RestaurantRecommendations';
import { TransportationGuide } from '../itinerary/TransportationGuide';
import { CulturalIntelligencePanel } from '../cultural/CulturalIntelligencePanel';
import { WeatherForecast } from '../weather/WeatherForecast';
import { ExportShareSystem } from '../export/ExportShareSystem';
import { useTravelContext } from '../../context/TravelContext';

interface TripResultsProps {
  itinerary: string;
  isLoading: boolean;
  error: string | null;
  progress: number;
  currentMessage: string;
  retryCount: number;
  onRegenerate: () => void;
  onSave: () => void;
  onShare: () => void;
  onCancel: () => void;
  formData: any;
}

export function EnhancedTripResults({
  itinerary,
  isLoading,
  error,
  progress,
  currentMessage,
  retryCount,
  onRegenerate,
  onSave,
  onShare,
  onCancel,
  formData
}: TripResultsProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'details' | 'restaurants' | 'transportation' | 'cultural'>('overview');
  const [expandedDays, setExpandedDays] = useState<number[]>([1]);
  const [showExportModal, setShowExportModal] = useState(false);
  const [copiedToClipboard, setCopiedToClipboard] = useState(false);
  const [weatherAlerts, setWeatherAlerts] = useState<Array<{day: string, condition: string, impact: string}>>([]);
  const { state, dispatch } = useTravelContext();

  // Parse the itinerary data
  const parsedItinerary = React.useMemo(() => {
    if (!itinerary) return null;
    
    try {
      // In a real implementation, this would parse the AI-generated itinerary
      // For now, we'll use mock data
      return {
        destination: formData.destination,
        startDate: formData.departureDate,
        endDate: formData.returnDate,
        groupSize: formData.groupSize,
        budget: formData.budget,
        highlights: [
          'Explore historic landmarks and cultural sites',
          'Experience authentic local cuisine',
          'Discover hidden gems off the beaten path',
          'Immerse in local traditions and customs',
          'Visit breathtaking natural wonders',
          'Engage with local communities'
        ],
        weather: {
          temperature: '22-28°C',
          condition: 'Mostly sunny with occasional clouds',
          precipitation: 'Low chance of rain'
        },
        difficulty: 'Moderate',
        energyLevel: 'Active',
        days: [
          {
            day: 1,
            date: '2024-06-15',
            theme: 'Cultural Exploration',
            totalCost: '$120-150 per person',
            activities: [
              {
                id: 'act1',
                time: '09:00',
                title: 'Historic City Center Tour',
                description: 'Explore the historic heart of the city with its ancient architecture and vibrant atmosphere.',
                location: 'City Center',
                duration: '3 hours',
                cost: '$25',
                difficulty: 'Easy',
                category: 'culture',
                transportation: {
                  method: 'walking',
                  duration: '15 minutes',
                  cost: 'Free'
                },
                tips: [
                  'Wear comfortable walking shoes',
                  'Bring a water bottle and sun protection',
                  'Local guides available at the main square'
                ]
              },
              {
                id: 'act2',
                time: '13:00',
                title: 'Lunch at Local Restaurant',
                description: 'Enjoy authentic local cuisine at a traditional restaurant loved by locals.',
                location: 'Old Town District',
                duration: '1.5 hours',
                cost: '$30',
                difficulty: 'Easy',
                category: 'food',
                tips: [
                  'Try the signature local dish',
                  'Reservations recommended during peak season',
                  'Ask for the daily specials'
                ]
              },
              {
                id: 'act3',
                time: '15:00',
                title: 'Museum Visit',
                description: 'Discover the rich history and cultural heritage of the region at this world-class museum.',
                location: 'Cultural District',
                duration: '2 hours',
                cost: '$15',
                difficulty: 'Easy',
                category: 'culture',
                transportation: {
                  method: 'public',
                  duration: '20 minutes',
                  cost: '$2'
                },
                tips: [
                  'Audio guides available in multiple languages',
                  'Free guided tours at 3pm daily',
                  'Photography allowed without flash'
                ]
              },
              {
                id: 'act4',
                time: '19:00',
                title: 'Dinner & Evening Stroll',
                description: 'Enjoy dinner at a charming restaurant followed by a leisurely walk along the waterfront.',
                location: 'Riverside District',
                duration: '2.5 hours',
                cost: '$40',
                difficulty: 'Easy',
                category: 'food',
                transportation: {
                  method: 'taxi',
                  duration: '10 minutes',
                  cost: '$8'
                },
                tips: [
                  'Sunset views are spectacular from the riverside',
                  'Many restaurants offer outdoor seating',
                  'Area is well-lit and safe at night'
                ]
              }
            ]
          },
          {
            day: 2,
            date: '2024-06-16',
            theme: 'Natural Wonders',
            totalCost: '$140-180 per person',
            activities: [
              {
                id: 'act5',
                time: '08:30',
                title: 'Day Trip to National Park',
                description: 'Explore the stunning landscapes, hiking trails, and wildlife of this natural wonder.',
                location: 'National Park',
                duration: '6 hours',
                cost: '$60',
                difficulty: 'Moderate',
                category: 'adventure',
                transportation: {
                  method: 'bus',
                  duration: '45 minutes',
                  cost: '$12'
                },
                tips: [
                  'Wear hiking boots and bring layers',
                  'Pack a lunch and plenty of water',
                  'Check weather conditions before departing'
                ],
                weatherDependent: true
              },
              {
                id: 'act6',
                time: '16:00',
                title: 'Relaxation Time',
                description: 'Unwind after your adventure with some downtime at your accommodation.',
                location: 'Hotel',
                duration: '2 hours',
                cost: 'Free',
                difficulty: 'Easy',
                category: 'relaxation'
              },
              {
                id: 'act7',
                time: '19:00',
                title: 'Dinner at Acclaimed Restaurant',
                description: 'Experience fine dining with a menu featuring local ingredients and traditional recipes with a modern twist.',
                location: 'Gourmet District',
                duration: '2 hours',
                cost: '$70',
                difficulty: 'Easy',
                category: 'food',
                transportation: {
                  method: 'taxi',
                  duration: '15 minutes',
                  cost: '$10'
                },
                tips: [
                  'Reservations required at least 2 days in advance',
                  'Smart casual dress code',
                  'Tasting menu highly recommended'
                ]
              }
            ]
          },
          {
            day: 3,
            date: '2024-06-17',
            theme: 'Local Experiences',
            totalCost: '$100-130 per person',
            activities: [
              {
                id: 'act8',
                time: '09:00',
                title: 'Local Market Tour',
                description: 'Immerse yourself in the colors, scents, and flavors of the vibrant local market.',
                location: 'Central Market',
                duration: '2 hours',
                cost: '$15',
                difficulty: 'Easy',
                category: 'culture',
                transportation: {
                  method: 'walking',
                  duration: '20 minutes',
                  cost: 'Free'
                },
                tips: [
                  'Bring cash for small vendors',
                  'Best to arrive early for freshest produce',
                  'Bargaining is expected at some stalls'
                ]
              },
              {
                id: 'act9',
                time: '12:00',
                title: 'Cooking Class',
                description: 'Learn to prepare traditional dishes with a local chef using ingredients from the morning market.',
                location: 'Culinary School',
                duration: '3 hours',
                cost: '$45',
                difficulty: 'Easy',
                category: 'food',
                transportation: {
                  method: 'walking',
                  duration: '10 minutes',
                  cost: 'Free'
                },
                tips: [
                  'No prior cooking experience needed',
                  'Includes lunch and recipe booklet',
                  'Vegetarian options available'
                ]
              },
              {
                id: 'act10',
                time: '16:00',
                title: 'Artisan Workshop Visit',
                description: 'Visit local craftspeople and learn about traditional arts and crafts of the region.',
                location: 'Artisan Quarter',
                duration: '2 hours',
                cost: '$20',
                difficulty: 'Easy',
                category: 'culture',
                transportation: {
                  method: 'public',
                  duration: '15 minutes',
                  cost: '$2'
                },
                tips: [
                  'Many artisans offer hands-on mini-workshops',
                  'Great place for authentic souvenirs',
                  'Support local crafts by purchasing directly'
                ]
              },
              {
                id: 'act11',
                time: '19:30',
                title: 'Cultural Performance',
                description: 'Experience traditional music, dance, and theater in a historic venue.',
                location: 'Cultural Center',
                duration: '2 hours',
                cost: '$35',
                difficulty: 'Easy',
                category: 'culture',
                transportation: {
                  method: 'taxi',
                  duration: '10 minutes',
                  cost: '$8'
                },
                tips: [
                  'Book tickets in advance',
                  'Arrive 30 minutes early for good seats',
                  'English subtitles/translation available'
                ]
              }
            ]
          }
        ]
      };
    } catch (error) {
      console.error('Failed to parse itinerary:', error);
      return null;
    }
  }, [itinerary, formData]);

  // For multi-city trips (like India example)
  const multiCityData = React.useMemo(() => {
    if (!parsedItinerary) return null;
    
    // Check if this is a multi-city trip based on destination
    const isMultiCity = formData.destination.toLowerCase().includes('india');
    
    if (!isMultiCity) return null;
    
    // Create a multi-city itinerary for India
    return {
      destination: 'India',
      startDate: formData.departureDate,
      endDate: formData.returnDate,
      cities: [
        {
          name: 'Mumbai',
          days: [1, 2, 3],
          description: 'India\'s financial capital and home to Bollywood. Experience the vibrant city life, colonial architecture, and bustling markets.'
        },
        {
          name: 'Jaipur',
          days: [4, 5, 6],
          description: 'The Pink City of India known for its stunning palaces, forts, and vibrant culture. A perfect blend of history and modernity.'
        },
        {
          name: 'Udaipur',
          days: [7, 8, 9],
          description: 'The City of Lakes offers romantic settings with its beautiful lakes, palaces, and mountains. Known as the Venice of the East.'
        },
        {
          name: 'Delhi',
          days: [10, 11],
          description: 'India\'s capital city blends ancient and modern with historic monuments, government buildings, and diverse cultural experiences.'
        }
      ],
      transportation: [
        {
          from: 'Mumbai',
          to: 'Jaipur',
          day: 4,
          options: [
            {
              type: 'flight',
              duration: '1h 45m',
              cost: '$80-120',
              departureTime: '08:30',
              arrivalTime: '10:15',
              operator: 'IndiGo, Air India',
              details: 'Multiple daily flights available',
              recommended: true
            },
            {
              type: 'train',
              duration: '16h',
              cost: '$30-50',
              departureTime: '16:00',
              arrivalTime: '08:00 (next day)',
              operator: 'Indian Railways',
              details: 'Overnight sleeper train, book AC class for comfort'
            }
          ]
        },
        {
          from: 'Jaipur',
          to: 'Udaipur',
          day: 7,
          options: [
            {
              type: 'car',
              duration: '5h 30m',
              cost: '$60-80',
              departureTime: '09:00',
              arrivalTime: '14:30',
              details: 'Private car with driver, includes stops at Ajmer and Pushkar',
              recommended: true
            },
            {
              type: 'bus',
              duration: '7h',
              cost: '$15-25',
              departureTime: '08:00',
              arrivalTime: '15:00',
              operator: 'Rajasthan State Transport',
              details: 'AC and non-AC options available'
            }
          ]
        },
        {
          from: 'Udaipur',
          to: 'Delhi',
          day: 10,
          options: [
            {
              type: 'flight',
              duration: '1h 30m',
              cost: '$90-130',
              departureTime: '10:00',
              arrivalTime: '11:30',
              operator: 'IndiGo, Air India',
              details: 'Direct flights available daily',
              recommended: true
            },
            {
              type: 'train',
              duration: '12h',
              cost: '$25-45',
              departureTime: '19:00',
              arrivalTime: '07:00 (next day)',
              operator: 'Indian Railways',
              details: 'Overnight train, book in advance'
            }
          ]
        }
      ],
      daySchedules: Array.from({ length: 11 }, (_, i) => {
        const day = i + 1;
        let city;
        
        if (day <= 3) city = 'Mumbai';
        else if (day <= 6) city = 'Jaipur';
        else if (day <= 9) city = 'Udaipur';
        else city = 'Delhi';
        
        const date = new Date(formData.departureDate);
        date.setDate(date.getDate() + i);
        
        return {
          day,
          date: date.toISOString().split('T')[0],
          city,
          schedule: [
            {
              id: `morning_${day}`,
              startTime: '08:00',
              endTime: '12:00',
              title: `${city} Morning Exploration`,
              description: `Discover the highlights of ${city} with a guided morning tour of the main attractions.`,
              location: `${city} City Center`,
              category: 'morning',
              cost: '$20-30',
              weatherDependent: true,
              alternatives: [
                {
                  title: `${city} Museum Visit`,
                  reason: 'Great indoor option in case of rain'
                }
              ]
            },
            {
              id: `lunch_${day}`,
              startTime: '12:30',
              endTime: '14:00',
              title: 'Authentic Local Lunch',
              description: 'Experience the flavors of regional cuisine at a popular local restaurant.',
              location: `${city} Old Town`,
              category: 'meal',
              cost: '$15-25'
            },
            {
              id: `afternoon_${day}`,
              startTime: '14:30',
              endTime: '18:00',
              title: `${city} Cultural Experience`,
              description: `Immerse yourself in the unique cultural heritage of ${city} with visits to important sites.`,
              location: `${city} Cultural District`,
              category: 'afternoon',
              cost: '$25-35',
              tips: [
                'Dress modestly for temple visits',
                'Bargain at local markets',
                'Carry water and stay hydrated'
              ]
            },
            {
              id: `evening_${day}`,
              startTime: '19:00',
              endTime: '21:30',
              title: 'Dinner & Evening Entertainment',
              description: 'Enjoy local cuisine followed by traditional entertainment.',
              location: `${city} Entertainment District`,
              category: 'evening',
              cost: '$30-45',
              bookingRequired: true,
              bookingInfo: {
                platform: 'Local tour operator or hotel concierge',
                deadline: '1 day in advance'
              }
            }
          ],
          totalCost: '$90-135',
          notes: day % 3 === 0 ? 'Travel day tomorrow. Pack your bags in the evening and check out procedures.' : undefined
        };
      }),
      totalBudget: '$1,200-1,500 per person',
      weatherAlerts: [
        {
          day: 2,
          city: 'Mumbai',
          condition: 'Chance of rain showers',
          impact: 'Have indoor backup plans for afternoon activities'
        },
        {
          day: 5,
          city: 'Jaipur',
          condition: 'High temperatures (35°C+)',
          impact: 'Plan outdoor activities for early morning or evening'
        }
      ]
    };
  }, [parsedItinerary, formData]);

  // Handle weather alerts
  const handleWeatherImpact = (impacts: Array<{day: string, condition: string, impact: string}>) => {
    setWeatherAlerts(impacts);
  };

  // Copy itinerary to clipboard
  const copyToClipboard = async () => {
    if (!parsedItinerary) return;
    
    try {
      const text = `
        ${parsedItinerary.destination} Itinerary
        ${parsedItinerary.startDate} to ${parsedItinerary.endDate}
        
        ${parsedItinerary.days.map(day => `
          Day ${day.day}: ${day.theme}
          ${day.activities.map(activity => `
            ${activity.time} - ${activity.title}
            ${activity.location} | ${activity.duration} | ${activity.cost}
            ${activity.description}
          `).join('')}
        `).join('')}
      `;
      
      await navigator.clipboard.writeText(text);
      setCopiedToClipboard(true);
      setTimeout(() => setCopiedToClipboard(false), 2000);
    } catch (error) {
      console.error('Failed to copy to clipboard:', error);
    }
  };

  // Save trip to user's saved trips
  const handleSaveTrip = () => {
    if (!parsedItinerary) return;
    
    dispatch({
      type: 'ADD_SAVED_TRIP',
      payload: {
        id: `trip_${Date.now()}`,
        title: `Trip to ${parsedItinerary.destination}`,
        destination: parsedItinerary.destination,
        startDate: parsedItinerary.startDate,
        endDate: parsedItinerary.endDate,
        status: 'planning',
        travelers: parsedItinerary.groupSize,
        budget: parsedItinerary.budget * parsedItinerary.groupSize,
        image: 'https://images.pexels.com/photos/338515/pexels-photo-338515.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=2',
        createdAt: new Date().toISOString(),
        lastModified: new Date().toISOString(),
        itinerary: parsedItinerary
      }
    });
    
    onSave();
  };

  if (isLoading) {
    return <TravelLoadingScreen isVisible={true} progress={progress} currentMessage={currentMessage} />;
  }

  if (error) {
    return (
      <ErrorDisplay 
        error={error} 
        onRetry={onRegenerate} 
        onBack={onCancel}
        retryCount={retryCount}
      />
    );
  }

  if (!parsedItinerary) {
    return (
      <div className="text-center py-12">
        <div className="text-red-500 mb-4">
          <RefreshCw className="w-12 h-12 mx-auto" />
        </div>
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Unable to generate itinerary
        </h3>
        <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-md mx-auto">
          We encountered an issue while creating your itinerary. Please try again with more specific details.
        </p>
        <div className="flex justify-center space-x-4">
          <Button onClick={onRegenerate}>
            <RefreshCw className="w-5 h-5 mr-2" />
            Try Again
          </Button>
          <Button variant="outline" onClick={onCancel}>
            ← Back to Form
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      {/* Action Bar */}
      <div className="sticky top-16 z-30 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md border-b border-gray-200 dark:border-gray-700 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-4 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Your {parsedItinerary.destination} Itinerary
              </h2>
              <div className="hidden md:flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-1" />
                  <span>{new Date(parsedItinerary.startDate).toLocaleDateString()} - {new Date(parsedItinerary.endDate).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center">
                  <Users className="w-4 h-4 mr-1" />
                  <span>{parsedItinerary.groupSize} {parsedItinerary.groupSize === 1 ? 'traveler' : 'travelers'}</span>
                </div>
                <div className="flex items-center">
                  <DollarSign className="w-4 h-4 mr-1" />
                  <span>${parsedItinerary.budget}/day per person</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button
                onClick={onRegenerate}
                variant="outline"
                size="sm"
                className="hidden sm:flex"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Regenerate
              </Button>
              
              <Button
                onClick={handleSaveTrip}
                variant="outline"
                size="sm"
                className="hidden sm:flex"
              >
                <Save className="w-4 h-4 mr-2" />
                Save Trip
              </Button>
              
              <Button
                onClick={() => setShowExportModal(true)}
                variant="outline"
                size="sm"
                className="hidden sm:flex"
              >
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
              
              <Button
                onClick={onShare}
                variant="outline"
                size="sm"
              >
                <Share2 className="w-4 h-4 sm:mr-2" />
                <span className="hidden sm:inline">Share</span>
              </Button>
              
              <Button
                onClick={onCancel}
                variant="ghost"
                size="sm"
                className="text-gray-500"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>
          
          {/* Tabs */}
          <div className="flex space-x-8 overflow-x-auto pb-2">
            <button
              onClick={() => setActiveTab('overview')}
              className={`pb-4 text-sm font-medium border-b-2 transition-colors duration-200 ${
                activeTab === 'overview'
                  ? 'border-primary-500 text-primary-600 dark:text-primary-400'
                  : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab('details')}
              className={`pb-4 text-sm font-medium border-b-2 transition-colors duration-200 ${
                activeTab === 'details'
                  ? 'border-primary-500 text-primary-600 dark:text-primary-400'
                  : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
              }`}
            >
              Daily Itinerary
            </button>
            <button
              onClick={() => setActiveTab('restaurants')}
              className={`pb-4 text-sm font-medium border-b-2 transition-colors duration-200 ${
                activeTab === 'restaurants'
                  ? 'border-primary-500 text-primary-600 dark:text-primary-400'
                  : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
              }`}
            >
              Restaurants
            </button>
            <button
              onClick={() => setActiveTab('transportation')}
              className={`pb-4 text-sm font-medium border-b-2 transition-colors duration-200 ${
                activeTab === 'transportation'
                  ? 'border-primary-500 text-primary-600 dark:text-primary-400'
                  : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
              }`}
            >
              Transportation
            </button>
            <button
              onClick={() => setActiveTab('cultural')}
              className={`pb-4 text-sm font-medium border-b-2 transition-colors duration-200 ${
                activeTab === 'cultural'
                  ? 'border-primary-500 text-primary-600 dark:text-primary-400'
                  : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
              }`}
            >
              Cultural Tips
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Action Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 z-40 p-3">
        <div className="flex justify-between">
          <Button
            onClick={onRegenerate}
            variant="outline"
            size="sm"
            className="flex-1 mr-2"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Regenerate
          </Button>
          <Button
            onClick={handleSaveTrip}
            variant="outline"
            size="sm"
            className="flex-1 mr-2"
          >
            <Save className="w-4 h-4 mr-2" />
            Save
          </Button>
          <Button
            onClick={() => setShowExportModal(true)}
            variant="primary"
            size="sm"
            className="flex-1"
          >
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-24 lg:pb-8">
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            <ItineraryOverview
              destination={parsedItinerary.destination}
              startDate={parsedItinerary.startDate}
              endDate={parsedItinerary.endDate}
              groupSize={parsedItinerary.groupSize}
              budget={parsedItinerary.budget}
              highlights={parsedItinerary.highlights}
              weather={parsedItinerary.weather}
              difficulty={parsedItinerary.difficulty}
              energyLevel={parsedItinerary.energyLevel}
            />
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
                  <Sparkles className="w-5 h-5 mr-2 text-primary-500" />
                  Itinerary Highlights
                </h3>
                <DayTimeline days={parsedItinerary.days.slice(0, 1)} />
                
                <div className="mt-6 text-center">
                  <Button
                    onClick={() => setActiveTab('details')}
                    variant="outline"
                  >
                    View Full Itinerary
                  </Button>
                </div>
              </div>
              
              <div>
                <WeatherForecast
                  location={parsedItinerary.destination}
                  startDate={parsedItinerary.startDate}
                  endDate={parsedItinerary.endDate}
                  onWeatherImpact={handleWeatherImpact}
                />
              </div>
            </div>
            
            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Share Your Itinerary
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                  Share your travel plans with friends and family or export for offline access.
                </p>
                <div className="flex space-x-3">
                  <Button
                    onClick={onShare}
                    variant="outline"
                    size="sm"
                    className="flex-1"
                  >
                    <Share2 className="w-4 h-4 mr-2" />
                    Share
                  </Button>
                  <Button
                    onClick={() => setShowExportModal(true)}
                    variant="outline"
                    size="sm"
                    className="flex-1"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Export
                  </Button>
                </div>
              </div>
              
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Print Itinerary
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                  Get a printer-friendly version of your complete travel plan.
                </p>
                <Button
                  onClick={() => window.print()}
                  variant="outline"
                  size="sm"
                  className="w-full"
                >
                  <Printer className="w-4 h-4 mr-2" />
                  Print
                </Button>
              </div>
              
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Copy to Clipboard
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                  Copy your itinerary text to share via email or messaging.
                </p>
                <Button
                  onClick={copyToClipboard}
                  variant="outline"
                  size="sm"
                  className="w-full"
                >
                  {copiedToClipboard ? (
                    <>
                      <Check className="w-4 h-4 mr-2 text-green-500" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 mr-2" />
                      Copy Text
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Daily Itinerary Tab */}
        {activeTab === 'details' && (
          <div className="space-y-8">
            {multiCityData ? (
              <MultiCityItinerary
                destination={multiCityData.destination}
                startDate={multiCityData.startDate}
                endDate={multiCityData.endDate}
                cities={multiCityData.cities}
                transportation={multiCityData.transportation}
                daySchedules={multiCityData.daySchedules}
                totalBudget={multiCityData.totalBudget}
                weatherAlerts={multiCityData.weatherAlerts}
              />
            ) : (
              <>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                    Daily Itinerary
                  </h2>
                  <Button
                    onClick={() => setExpandedDays(
                      expandedDays.length === parsedItinerary.days.length
                        ? []
                        : parsedItinerary.days.map(d => d.day)
                    )}
                    variant="outline"
                    size="sm"
                  >
                    {expandedDays.length === parsedItinerary.days.length ? (
                      <>
                        <ChevronUp className="w-4 h-4 mr-2" />
                        Collapse All
                      </>
                    ) : (
                      <>
                        <ChevronDown className="w-4 h-4 mr-2" />
                        Expand All
                      </>
                    )}
                  </Button>
                </div>
                
                <DayTimeline days={parsedItinerary.days} />
              </>
            )}
          </div>
        )}

        {/* Restaurants Tab */}
        {activeTab === 'restaurants' && (
          <RestaurantRecommendations
            restaurants={[
              {
                id: 'rest1',
                name: 'Traditional Bistro',
                cuisine: 'Local Cuisine',
                mealType: 'dinner',
                priceRange: '$$',
                rating: 4.7,
                reviews: 342,
                location: 'Old Town',
                address: '123 Main Street, Old Town District',
                phone: '+1 (555) 123-4567',
                website: 'https://example.com/bistro',
                image: 'https://images.pexels.com/photos/1307698/pexels-photo-1307698.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=2',
                description: 'Authentic local cuisine served in a charming traditional setting with recipes passed down through generations.',
                specialties: ['Signature Local Dish', 'Traditional Stew', 'Regional Dessert'],
                culturalContext: 'This restaurant preserves century-old cooking techniques and serves dishes that reflect the region\'s cultural heritage.',
                dietaryOptions: ['Vegetarian Options', 'Gluten-Free Available'],
                atmosphere: 'traditional',
                touristFriendly: true,
                reservationRequired: true,
                averageMealDuration: '1.5-2 hours',
                bestTimeToVisit: 'Dinner (7-9 PM)',
                mustTryDishes: ['Signature Roast', 'Traditional Soup', 'Local Cheese Platter', 'Regional Wine'],
                localTips: ['Ask for the daily specials', 'Request a table by the window for the best views', 'The owner often shares stories about the history of the dishes']
              },
              {
                id: 'rest2',
                name: 'Modern Fusion',
                cuisine: 'Contemporary Fusion',
                mealType: 'dinner',
                priceRange: '$$$',
                rating: 4.8,
                reviews: 256,
                location: 'Arts District',
                address: '456 Creative Avenue, Arts District',
                phone: '+1 (555) 987-6543',
                website: 'https://example.com/fusion',
                image: 'https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=2',
                description: 'Innovative cuisine blending local ingredients with international techniques in a stylish, contemporary setting.',
                specialties: ['Fusion Tasting Menu', 'Creative Cocktails', 'Artistic Desserts'],
                culturalContext: 'Represents the modern evolution of local cuisine, showcasing how traditional flavors can be reimagined.',
                dietaryOptions: ['Vegetarian', 'Vegan', 'Gluten-Free', 'Dairy-Free'],
                atmosphere: 'modern',
                touristFriendly: true,
                reservationRequired: true,
                averageMealDuration: '2-3 hours',
                bestTimeToVisit: 'Dinner (6-10 PM)',
                mustTryDishes: ['Chef\'s Tasting Menu', 'Signature Fusion Plate', 'Local Ingredient Showcase', 'Wine Pairing'],
                localTips: ['The chef\'s table experience is worth the splurge', 'Ask about the inspiration behind each dish', 'Cocktail pairings are as impressive as the wine options']
              },
              {
                id: 'rest3',
                name: 'Local Market Eatery',
                cuisine: 'Street Food & Local Specialties',
                mealType: 'lunch',
                priceRange: '$',
                rating: 4.5,
                reviews: 512,
                location: 'Central Market',
                address: 'Central Market, Stalls 12-15',
                image: 'https://images.pexels.com/photos/2253643/pexels-photo-2253643.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=2',
                description: 'Authentic street food experience in the heart of the central market, offering quick, delicious local specialties.',
                specialties: ['Street Food Classics', 'Quick Bites', 'Local Snacks'],
                culturalContext: 'The market has been a culinary hub for over a century, where locals gather for fresh, affordable meals.',
                dietaryOptions: ['Vegetarian Options'],
                atmosphere: 'casual',
                touristFriendly: true,
                reservationRequired: false,
                averageMealDuration: '30-45 minutes',
                bestTimeToVisit: 'Lunch (11 AM-2 PM)',
                mustTryDishes: ['Signature Street Sandwich', 'Local Dumplings', 'Fresh Market Juice', 'Traditional Sweets'],
                localTips: ['Eat where the locals are lining up', 'Ask vendors about their specialties', 'Some stalls have been run by the same family for generations']
              },
              {
                id: 'rest4',
                name: 'Riverside Café',
                cuisine: 'Café & Light Meals',
                mealType: 'breakfast',
                priceRange: '$$',
                rating: 4.6,
                reviews: 328,
                location: 'Riverside District',
                address: '789 Riverside Walk',
                phone: '+1 (555) 456-7890',
                website: 'https://example.com/riverside',
                image: 'https://images.pexels.com/photos/1581384/pexels-photo-1581384.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=2',
                description: 'Charming café with riverside views, perfect for breakfast or light meals with excellent coffee and pastries.',
                specialties: ['Artisanal Coffee', 'Breakfast Plates', 'Homemade Pastries'],
                culturalContext: 'Represents the growing café culture that blends traditional breakfast items with international coffee trends.',
                dietaryOptions: ['Vegetarian', 'Vegan Options', 'Gluten-Free Options'],
                atmosphere: 'casual',
                touristFriendly: true,
                reservationRequired: false,
                averageMealDuration: '1 hour',
                bestTimeToVisit: 'Morning (7-11 AM)',
                mustTryDishes: ['Signature Breakfast Plate', 'Local Pastry Selection', 'Specialty Coffee', 'Fresh Fruit Bowl'],
                localTips: ['The outdoor terrace has the best views', 'Early morning is quietest and most peaceful', 'Their house-blend coffee is available to purchase']
              },
              {
                id: 'rest5',
                name: 'Historic Tavern',
                cuisine: 'Traditional & Hearty',
                mealType: 'dinner',
                priceRange: '$$',
                rating: 4.4,
                reviews: 287,
                location: 'Historic Quarter',
                address: '42 Heritage Lane, Historic Quarter',
                phone: '+1 (555) 234-5678',
                image: 'https://images.pexels.com/photos/260922/pexels-photo-260922.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=2',
                description: 'Centuries-old tavern serving hearty traditional fare in a rustic, historic setting with original features.',
                specialties: ['Slow-cooked Stews', 'Local Meats', 'Traditional Ales'],
                culturalContext: 'This tavern has served food since the 18th century and maintains recipes that have barely changed in generations.',
                dietaryOptions: ['Limited Vegetarian Options'],
                atmosphere: 'traditional',
                touristFriendly: true,
                reservationRequired: true,
                averageMealDuration: '1.5-2 hours',
                bestTimeToVisit: 'Dinner (6-8 PM)',
                mustTryDishes: ['Signature Meat Stew', 'House Special Pie', 'Local Craft Beer', 'Traditional Dessert'],
                localTips: ['Ask about the building\'s history', 'Try the seasonal specials', 'The fireplace seating is coveted in winter']
              },
              {
                id: 'rest6',
                name: 'Beachfront Seafood',
                cuisine: 'Fresh Seafood',
                mealType: 'lunch',
                priceRange: '$$$',
                rating: 4.9,
                reviews: 412,
                location: 'Coastal Area',
                address: '101 Beach Road',
                phone: '+1 (555) 876-5432',
                website: 'https://example.com/seafood',
                image: 'https://images.pexels.com/photos/67468/pexels-photo-67468.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=2',
                description: 'Premium seafood restaurant with panoramic ocean views, serving the freshest catch from local fishermen.',
                specialties: ['Daily Catch', 'Seafood Platters', 'Local Oysters'],
                culturalContext: 'Celebrates the region\'s maritime heritage and sustainable fishing practices that have supported the community for centuries.',
                dietaryOptions: ['Gluten-Free', 'Pescatarian'],
                atmosphere: 'upscale',
                touristFriendly: true,
                reservationRequired: true,
                averageMealDuration: '2 hours',
                bestTimeToVisit: 'Lunch (12-2 PM) for best views',
                mustTryDishes: ['Catch of the Day', 'Local Oyster Selection', 'Seafood Risotto', 'Signature Fish Stew'],
                localTips: ['Ask what was caught that morning', 'Sunset reservations offer spectacular views', 'The chef can explain sustainable fishing practices']
              }
            ]}
          />
        )}

        {/* Transportation Tab */}
        {activeTab === 'transportation' && (
          <TransportationGuide
            routes={[
              {
                id: 'route1',
                from: 'Airport',
                to: 'City Center',
                methods: [
                  {
                    type: 'taxi',
                    name: 'Taxi / Rideshare',
                    duration: '30-45 minutes',
                    cost: '$25-35',
                    comfort: 'premium',
                    difficulty: 'easy',
                    description: 'The most convenient option, especially if you have luggage. Available 24/7 from the designated taxi stands outside the terminal.',
                    pros: ['Door-to-door service', 'Available 24/7', 'No need to navigate public transport', 'Comfortable with AC'],
                    cons: ['Most expensive option', 'May face traffic during peak hours', 'Some drivers may take longer routes'],
                    tips: ['Use official taxi stands or rideshare apps', 'Confirm price before departure or ensure meter is used', 'Keep small bills for payment'],
                    bookingInfo: {
                      advance: false,
                      apps: ['Uber', 'Lyft', 'Local Taxi App'],
                      paymentMethods: ['Cash', 'Credit Card', 'In-app payment']
                    }
                  },
                  {
                    type: 'train',
                    name: 'Airport Express Train',
                    duration: '20-25 minutes',
                    cost: '$10-15',
                    comfort: 'standard',
                    difficulty: 'moderate',
                    description: 'Fast and reliable train service connecting the airport to the main train station in the city center. Trains depart every 15 minutes.',
                    pros: ['Fastest option during traffic hours', 'Fixed price', 'Frequent service', 'Environmentally friendly'],
                    cons: ['May require additional transport to final destination', 'Limited luggage space during peak hours', 'Stops running after midnight'],
                    tips: ['Buy tickets from machines at the airport station', 'Validate ticket before boarding', 'Allow extra time if you have large luggage'],
                    bookingInfo: {
                      advance: false,
                      apps: ['City Transport App', 'Google Maps'],
                      paymentMethods: ['Cash', 'Credit Card', 'Transport Card']
                    }
                  },
                  {
                    type: 'bus',
                    name: 'Airport Shuttle Bus',
                    duration: '45-60 minutes',
                    cost: '$5-8',
                    comfort: 'basic',
                    difficulty: 'moderate',
                    description: 'Budget-friendly option with multiple stops throughout the city. Buses depart every 30 minutes from outside the arrivals area.',
                    pros: ['Most economical option', 'Multiple stops throughout the city', 'Dedicated luggage space'],
                    cons: ['Longest travel time', 'Can be crowded during peak hours', 'Less frequent than the train'],
                    tips: ['Check the route map to find the closest stop to your accommodation', 'Have exact change ready', 'Allow extra time for potential delays'],
                    bookingInfo: {
                      advance: false,
                      apps: ['City Transport App'],
                      paymentMethods: ['Cash', 'Transport Card']
                    }
                  }
                ]
              },
              {
                id: 'route2',
                from: 'City Center',
                to: 'Popular Attractions',
                methods: [
                  {
                    type: 'public',
                    name: 'Public Transportation',
                    duration: 'Varies by destination',
                    cost: '$2-3 per ride or $10 day pass',
                    comfort: 'standard',
                    difficulty: 'moderate',
                    description: 'Extensive network of metro, trams, and buses covering all major attractions and neighborhoods.',
                    pros: ['Economical', 'Frequent service', 'Reaches most attractions', 'Environmentally friendly'],
                    cons: ['Can be crowded', 'Requires some navigation skills', 'May involve transfers'],
                    tips: ['Buy a day pass for multiple trips', 'Download the city transport app for real-time updates', 'Travel outside rush hour if possible'],
                    bookingInfo: {
                      advance: false,
                      apps: ['City Transport App', 'Google Maps', 'Citymapper'],
                      paymentMethods: ['Cash', 'Credit Card', 'Transport Card', 'Mobile Payment']
                    }
                  },
                  {
                    type: 'walking',
                    name: 'Walking',
                    duration: 'Varies by destination',
                    cost: 'Free',
                    comfort: 'basic',
                    difficulty: 'moderate',
                    description: 'Many attractions are within walking distance of each other in the central districts. Walking allows you to discover hidden gems along the way.',
                    pros: ['Free', 'Flexible', 'Discover hidden spots', 'No waiting time', 'Healthy'],
                    cons: ['Weather dependent', 'Limited by distance', 'Can be tiring for full days'],
                    tips: ['Wear comfortable shoes', 'Use offline maps', 'Plan routes through parks and interesting neighborhoods', 'Take water breaks'],
                    bookingInfo: {
                      advance: false,
                      apps: ['Google Maps', 'Maps.me (offline maps)'],
                      paymentMethods: []
                    }
                  },
                  {
                    type: 'bike',
                    name: 'Bike Sharing',
                    duration: 'Varies by destination',
                    cost: '$10-15 per day',
                    comfort: 'standard',
                    difficulty: 'challenging',
                    description: 'City-wide bike sharing system with numerous pickup/drop-off stations. Great way to cover more ground than walking while enjoying the outdoors.',
                    pros: ['Faster than walking', 'Flexible', 'Environmentally friendly', 'Fun way to explore'],
                    cons: ['Weather dependent', 'Requires confidence in traffic', 'Limited luggage capacity'],
                    tips: ['Download the bike-sharing app before arrival', 'Check bike condition before riding', 'Use dedicated bike lanes where available', 'Lock properly when parking'],
                    bookingInfo: {
                      advance: false,
                      apps: ['City Bike App', 'Lime', 'Donkey Republic'],
                      paymentMethods: ['Credit Card', 'Mobile Payment']
                    }
                  }
                ]
              }
            ]}
            localEtiquette={{
              generalTips: [
                'Stand on the right side of escalators',
                'Let passengers exit before boarding public transport',
                'Validate tickets before boarding trains or trams',
                'Quiet zones on trains should be respected'
              ],
              paymentTips: [
                'Most public transport requires pre-purchased tickets',
                'Keep small change for bus fares',
                'Daily or weekly passes offer better value for tourists',
                'Some taxis may not accept credit cards'
              ],
              culturalNorms: [
                'Greeting the driver when boarding buses is customary',
                'Offering seats to elderly, pregnant, or disabled passengers is expected',
                'Eating on public transport is generally frowned upon',
                'Speaking quietly on phones is appreciated'
              ],
              safetyTips: [
                'Be aware of pickpockets on crowded transport',
                'Keep valuables secure and out of sight',
                'Take official taxis from designated stands',
                'Note the last departure times for night services'
              ]
            }}
          />
        )}

        {/* Cultural Tab */}
        {activeTab === 'cultural' && (
          <CulturalIntelligencePanel
            destination={parsedItinerary.destination}
            culturalData={{
              destination: parsedItinerary.destination,
              dosAndDonts: {
                dos: [
                  'Greet locals with a smile and appropriate greeting',
                  'Dress modestly when visiting religious sites',
                  'Remove shoes before entering homes and temples',
                  'Ask permission before taking photos of people',
                  'Learn a few basic phrases in the local language'
                ],
                donts: [
                  'Point with your index finger at people or sacred objects',
                  'Touch someone\'s head (considered sacred in some cultures)',
                  'Show public displays of affection in conservative areas',
                  'Enter religious sites during prayer times',
                  'Discuss sensitive political topics with strangers'
                ],
                religious: [
                  'Cover shoulders and knees when visiting places of worship',
                  'Women may need to cover their hair in certain religious sites',
                  'Walk clockwise around religious monuments',
                  'Speak quietly and respectfully in sacred places',
                  'Some sites may be closed to non-practitioners'
                ],
                photography: [
                  'Always ask before photographing individuals, especially in rural areas',
                  'Many museums and religious sites prohibit flash photography',
                  'Some cultural ceremonies may restrict photography entirely',
                  'Avoid photographing military installations or government buildings',
                  'Be respectful when photographing cultural practices or ceremonies'
                ],
                dressCodes: [
                  {
                    situation: 'Religious Sites',
                    requirements: 'Modest clothing covering shoulders, knees, and sometimes head',
                    tips: 'Carry a scarf or sarong to cover up when needed'
                  },
                  {
                    situation: 'Upscale Restaurants',
                    requirements: 'Smart casual or formal attire depending on the venue',
                    tips: 'Men may need closed shoes and collared shirts; call ahead if unsure'
                  },
                  {
                    situation: 'Rural Villages',
                    requirements: 'Conservative, modest clothing',
                    tips: 'Avoid revealing or tight-fitting clothes that may offend local sensibilities'
                  }
                ]
              },
              communication: {
                essentialPhrases: [
                  {
                    english: 'Hello',
                    local: 'Local greeting',
                    pronunciation: 'Pronunciation guide',
                    context: 'Standard greeting used throughout the day'
                  },
                  {
                    english: 'Thank you',
                    local: 'Local thanks',
                    pronunciation: 'Pronunciation guide',
                    context: 'Used to express gratitude for any service or help'
                  },
                  {
                    english: 'Please',
                    local: 'Local please',
                    pronunciation: 'Pronunciation guide',
                    context: 'Used when making requests or asking for something'
                  },
                  {
                    english: 'Excuse me',
                    local: 'Local excuse me',
                    pronunciation: 'Pronunciation guide',
                    context: 'Used to get attention or apologize for minor disturbances'
                  },
                  {
                    english: 'How much?',
                    local: 'Local price question',
                    pronunciation: 'Pronunciation guide',
                    context: 'Essential for shopping and negotiating prices'
                  }
                ],
                greetings: [
                  {
                    situation: 'Formal Meeting',
                    phrase: 'Formal greeting phrase',
                    pronunciation: 'Pronunciation guide',
                    response: 'Expected response'
                  },
                  {
                    situation: 'Casual Encounter',
                    phrase: 'Casual greeting phrase',
                    pronunciation: 'Pronunciation guide',
                    response: 'Expected response'
                  },
                  {
                    situation: 'Business Setting',
                    phrase: 'Business greeting phrase',
                    pronunciation: 'Pronunciation guide',
                    response: 'Expected response'
                  }
                ],
                emergency: [
                  {
                    situation: 'Medical Emergency',
                    phrase: 'Help! I need a doctor!',
                    number: '112'
                  },
                  {
                    situation: 'Police Assistance',
                    phrase: 'Help! Police!',
                    number: '110'
                  },
                  {
                    situation: 'Lost/Directions',
                    phrase: 'I am lost. Where is...?',
                    number: 'Tourist Police: 113'
                  }
                ],
                nonVerbal: [
                  'Nodding means yes, shaking head means no',
                  'Maintain moderate eye contact during conversations',
                  'Keep appropriate personal space (arm\'s length)',
                  'Pointing with the entire hand rather than index finger is preferred',
                  'Removing shoes before entering homes and some businesses is customary',
                  'Covering mouth when yawning or coughing is expected'
                ]
              },
              payment: {
                currency: 'Local Currency (LC)',
                exchangeTips: [
                  'Exchange at official banks or ATMs for best rates',
                  'Avoid airport exchange counters due to poor rates',
                  'Keep small denominations for markets and taxis',
                  'Credit cards widely accepted in urban areas but cash needed in rural regions',
                  'Notify your bank of travel plans to prevent card blocks'
                ],
                tipping: [
                  {
                    service: 'Restaurants',
                    amount: '10-15%',
                    notes: 'Check if service charge is already included'
                  },
                  {
                    service: 'Taxis',
                    amount: 'Round up or 10%',
                    notes: 'Not strictly expected but appreciated'
                  },
                  {
                    service: 'Hotels',
                    amount: '$1-2 per bag',
                    notes: 'For porters and housekeeping'
                  },
                  {
                    service: 'Tour Guides',
                    amount: '$5-10 per person per day',
                    notes: 'More for private or exceptional service'
                  }
                ],
                bargaining: {
                  appropriate: [
                    'Local markets',
                    'Street vendors',
                    'Souvenir shops',
                    'Independent craft stores'
                  ],
                  strategies: [
                    'Start at 40-50% of initial asking price',
                    'Be friendly and respectful during negotiations',
                    'Be prepared to walk away if price isn\'t right',
                    'Bundle multiple items for better discounts',
                    'Learn key phrases for bargaining in local language'
                  ],
                  phrases: [
                    'Too expensive!',
                    'What\'s your best price?',
                    'I\'ll give you [amount]',
                    'Thank you, maybe later'
                  ]
                },
                scams: [
                  {
                    type: 'Taxi Overcharging',
                    description: 'Drivers taking longer routes or claiming meter is broken',
                    prevention: 'Use ride-hailing apps or agree on price before departure'
                  },
                  {
                    type: 'Counterfeit Money',
                    description: 'Being given fake notes as change',
                    prevention: 'Familiarize yourself with local currency and check notes carefully'
                  },
                  {
                    type: 'Unofficial Guides',
                    description: 'Unauthorized guides offering overpriced or misleading tours',
                    prevention: 'Book through official tourism offices or reputable agencies'
                  }
                ]
              },
              calendar: {
                holidays: [
                  {
                    date: '2024-01-01',
                    name: 'New Year\'s Day',
                    significance: 'National holiday celebrating the beginning of the calendar year',
                    impact: 'Government offices and many businesses closed. Expect crowds at tourist sites.'
                  },
                  {
                    date: '2024-05-01',
                    name: 'Labor Day',
                    significance: 'Celebration of workers\' contributions',
                    impact: 'Banks and government offices closed. Public transportation on holiday schedule.'
                  },
                  {
                    date: '2024-12-25',
                    name: 'Christmas Day',
                    significance: 'Religious and cultural celebration',
                    impact: 'Most businesses closed. Special events and decorations throughout the city.'
                  }
                ],
                businessHours: {
                  general: 'Monday-Friday: 9:00 AM - 6:00 PM',
                  restaurants: 'Lunch: 12:00 PM - 2:30 PM, Dinner: 7:00 PM - 10:30 PM',
                  shops: 'Monday-Saturday: 10:00 AM - 8:00 PM, Sunday: 12:00 PM - 6:00 PM',
                  attractions: 'Daily: 9:00 AM - 5:00 PM (last entry usually 1 hour before closing)'
                },
                seasonalCustoms: [
                  {
                    season: 'Spring (March-May)',
                    customs: [
                      'Flower festivals and outdoor markets',
                      'Spring cleaning rituals',
                      'Special seasonal menus in restaurants'
                    ],
                    considerations: [
                      'Book accommodations early for cherry blossom season',
                      'Pack for variable weather with layers',
                      'Expect higher prices during peak flower viewing periods'
                    ]
                  },
                  {
                    season: 'Summer (June-August)',
                    customs: [
                      'Outdoor festivals and concerts',
                      'Beach and waterfront activities',
                      'Night markets and extended evening hours'
                    ],
                    considerations: [
                      'High tourist season with larger crowds',
                      'Book air-conditioned accommodations',
                      'Hydrate frequently in hot weather'
                    ]
                  }
                ]
              },
              safety: {
                emergencyNumbers: [
                  {
                    service: 'General Emergency',
                    number: '112',
                    notes: 'Universal emergency number for police, fire, and medical'
                  },
                  {
                    service: 'Police',
                    number: '110',
                    notes: 'Direct line to police services'
                  },
                  {
                    service: 'Medical Emergency',
                    number: '118',
                    notes: 'Ambulance and emergency medical services'
                  },
                  {
                    service: 'Tourist Police',
                    number: '113',
                    notes: 'Specialized police service for tourists, often with English-speaking officers'
                  }
                ],
                embassy: {
                  address: '123 Diplomatic Avenue, Capital City',
                  phone: '+1 (555) 123-4567',
                  email: 'embassy@example.com',
                  hours: 'Monday-Friday: 9:00 AM - 4:00 PM'
                },
                commonConcerns: [
                  {
                    concern: 'Pickpocketing',
                    prevention: [
                      'Keep valuables in front pockets or hidden pouches',
                      'Be extra vigilant in crowded tourist areas and public transport',
                      'Don\'t keep all valuables in one place'
                    ],
                    response: 'Report to police immediately and get a police report for insurance'
                  },
                  {
                    concern: 'Taxi Scams',
                    prevention: [
                      'Use official taxis or ride-hailing apps',
                      'Ensure meter is used or agree on price beforehand',
                      'Note the taxi number when entering'
                    ],
                    response: 'Take a photo of the license plate and report to tourist police'
                  }
                ],
                healthTips: [
                  'Drink bottled or purified water only',
                  'Use sunscreen and stay hydrated in hot weather',
                  'Carry basic medications for stomach issues and pain relief',
                  'Ensure travel insurance covers medical evacuation if needed',
                  'Know the location of the nearest hospital or clinic to your accommodation',
                  'Wash hands frequently and carry hand sanitizer'
                ]
              }
            }}
          />
        )}
      </div>

      {/* Export Modal */}
      {showExportModal && (
        <ExportShareSystem
          itinerary={parsedItinerary}
          destination={parsedItinerary.destination}
          startDate={parsedItinerary.startDate}
          endDate={parsedItinerary.endDate}
          groupSize={parsedItinerary.groupSize}
          budget={parsedItinerary.budget}
          onClose={() => setShowExportModal(false)}
        />
      )}
    </div>
  );
}