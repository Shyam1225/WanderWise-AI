import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Cloud, Sun, CloudRain, Snowflake, Wind, Thermometer, Umbrella,
  Calendar, Music, MapPin, Utensils, Star, AlertTriangle, Shield,
  Navigation, DollarSign, Clock, Users, Accessibility, Eye,
  Wifi, Phone, Heart, Activity, Zap, Globe, Info, CheckCircle,
  TrendingUp, Camera, Building, Mountain, Waves, TreePine,
  Languages, Volume2, Download, Bookmark, Share2, Filter,
  ChevronDown, ChevronUp, Play, Pause, RefreshCw, Search,
  Plane, Train, Car, Bus, Bike, Scaling as Walking, Ship,
  Coffee, ShoppingBag, Headphones, Smartphone, CreditCard,
  Map, Compass, Lightbulb, Target, Award, Flag, Bell
} from 'lucide-react';
import { Button } from '../ui/Button';

interface WeatherData {
  current: {
    temperature: number;
    condition: string;
    humidity: number;
    windSpeed: number;
    uvIndex: number;
    visibility: number;
    feelsLike: number;
    pressure: number;
  };
  forecast: Array<{
    date: string;
    high: number;
    low: number;
    condition: string;
    precipitation: number;
    windSpeed: number;
    humidity: number;
    activities: string[];
    recommendations: string[];
    packingTips: string[];
  }>;
  alerts: Array<{
    type: 'warning' | 'watch' | 'advisory';
    title: string;
    description: string;
    impact: string;
    validUntil: string;
  }>;
  seasonal: {
    bestMonths: string[];
    worstMonths: string[];
    peakSeason: string;
    offSeason: string;
    insights: string[];
  };
}

interface LocalEvent {
  id: string;
  title: string;
  type: 'festival' | 'concert' | 'market' | 'cultural' | 'sports' | 'exhibition' | 'performance';
  date: string;
  time: string;
  endTime?: string;
  location: string;
  venue: string;
  description: string;
  ticketPrice: string;
  popularity: number;
  culturalSignificance: string;
  bookingUrl?: string;
  image: string;
  tags: string[];
  accessibility: boolean;
  ageRestriction?: string;
  weatherDependent: boolean;
  capacity?: number;
  soldOut?: boolean;
}

interface FoodieInsight {
  dish: {
    name: string;
    description: string;
    culturalStory: string;
    ingredients: string[];
    allergens: string[];
    difficulty: 'Easy' | 'Moderate' | 'Challenging';
    seasonality: string;
    region: string;
  };
  restaurants: Array<{
    name: string;
    rating: number;
    priceRange: string;
    specialty: string;
    location: string;
    authenticity: number;
    address: string;
    phone?: string;
    hours: string;
    reservationRequired: boolean;
    michelin?: boolean;
    localFavorite: boolean;
  }>;
  streetFoodSafety: {
    tips: string[];
    safeVendors: string[];
    timesToAvoid: string[];
    redFlags: string[];
    bestPractices: string[];
  };
  dietaryAlternatives: {
    vegetarian: string[];
    vegan: string[];
    glutenFree: string[];
    halal: string[];
    kosher: string[];
    keto: string[];
    diabetic: string[];
  };
  cookingClasses: Array<{
    name: string;
    duration: string;
    price: string;
    includes: string[];
    difficulty: string;
  }>;
  foodTours: Array<{
    name: string;
    duration: string;
    price: string;
    highlights: string[];
    groupSize: string;
  }>;
}

interface TransportationData {
  routes: Array<{
    from: string;
    to: string;
    distance: string;
    options: Array<{
      method: string;
      duration: string;
      cost: string;
      realTimeDelay?: string;
      crowdLevel: 'Low' | 'Medium' | 'High';
      accessibility: boolean;
      bookingApp: string;
      frequency: string;
      operatingHours: string;
      pros: string[];
      cons: string[];
      tips: string[];
    }>;
  }>;
  realTimeUpdates: Array<{
    line: string;
    status: 'On Time' | 'Delayed' | 'Cancelled' | 'Disrupted';
    delay?: string;
    reason?: string;
    alternativeRoute?: string;
    estimatedResolution?: string;
  }>;
  costComparison: {
    daily: Array<{ method: string; cost: number; efficiency: number }>;
    weekly: Array<{ method: string; cost: number; savings: number }>;
    monthly: Array<{ method: string; cost: number; unlimited: boolean }>;
  };
  smartRouting: {
    fastestRoute: string;
    cheapestRoute: string;
    mostComfortable: string;
    leastCrowded: string;
    mostScenic: string;
  };
  apps: Array<{
    name: string;
    platform: string[];
    features: string[];
    rating: number;
    price: string;
  }>;
}

interface SafetyData {
  currentAlerts: Array<{
    level: 'Low' | 'Medium' | 'High' | 'Critical';
    type: string;
    description: string;
    areas: string[];
    recommendations: string[];
    lastUpdated: string;
    source: string;
  }>;
  neighborhoods: Array<{
    name: string;
    safetyRating: number;
    dayTime: 'Safe' | 'Caution' | 'Avoid';
    nightTime: 'Safe' | 'Caution' | 'Avoid';
    commonIssues: string[];
    tips: string[];
    policeStations: string[];
    hospitals: string[];
    touristPolice: boolean;
  }>;
  embassy: {
    address: string;
    phone: string;
    email: string;
    emergencyNumber: string;
    services: string[];
    hours: string;
    website: string;
    consulates: Array<{
      city: string;
      phone: string;
      address: string;
    }>;
  };
  healthInfo: {
    vaccinations: Array<{
      name: string;
      required: boolean;
      recommended: boolean;
      timing: string;
    }>;
    waterSafety: string;
    foodSafety: string[];
    commonIllnesses: string[];
    medicalFacilities: Array<{
      name: string;
      type: string;
      address: string;
      phone: string;
      englishSpeaking: boolean;
      insurance: string[];
      specialties: string[];
    }>;
    pharmacies: Array<{
      name: string;
      address: string;
      hours: string;
      prescription: boolean;
    }>;
  };
  scams: Array<{
    type: string;
    description: string;
    prevention: string[];
    response: string;
    commonLocations: string[];
  }>;
}

interface AccessibilityInfo {
  transportation: {
    wheelchairAccessible: string[];
    audioAnnouncements: boolean;
    visualAids: boolean;
    assistanceAvailable: boolean;
    elevators: string[];
    ramps: string[];
    tactilePaving: boolean;
  };
  attractions: Array<{
    name: string;
    wheelchairAccess: 'Full' | 'Partial' | 'Limited' | 'None';
    visualImpairment: string[];
    hearingImpairment: string[];
    mobilityAssistance: string[];
    specialServices: string[];
    accessibleParking: boolean;
    accessibleRestrooms: boolean;
    guideDogs: boolean;
    brailleInfo: boolean;
    signLanguage: boolean;
  }>;
  accommodation: {
    accessibleRooms: string[];
    assistiveDevices: string[];
    serviceAnimals: boolean;
    specialDiets: boolean;
    accessiblePools: boolean;
    emergencyProcedures: string[];
  };
  resources: {
    localOrganizations: Array<{
      name: string;
      services: string[];
      contact: string;
    }>;
    equipmentRental: Array<{
      item: string;
      provider: string;
      cost: string;
      booking: string;
    }>;
    emergencyContacts: string[];
    accessibilityApps: string[];
  };
  cityFeatures: {
    accessibleRoutes: string[];
    audioSignals: boolean;
    lowFloorBuses: boolean;
    accessibleTaxis: boolean;
    wheelchairRentals: string[];
  };
}

interface AdvancedTravelIntelligenceProps {
  destination: string;
  startDate: string;
  endDate: string;
  interests: string[];
  budget: number;
  groupSize: number;
}

export function AdvancedTravelIntelligence({ 
  destination, 
  startDate, 
  endDate, 
  interests, 
  budget,
  groupSize 
}: AdvancedTravelIntelligenceProps) {
  const [activeTab, setActiveTab] = useState<'weather' | 'events' | 'food' | 'transport' | 'safety' | 'accessibility'>('weather');
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [localEvents, setLocalEvents] = useState<LocalEvent[]>([]);
  const [foodieInsights, setFoodieInsights] = useState<FoodieInsight[]>([]);
  const [transportData, setTransportData] = useState<TransportationData | null>(null);
  const [safetyData, setSafetyData] = useState<SafetyData | null>(null);
  const [accessibilityInfo, setAccessibilityInfo] = useState<AccessibilityInfo | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedEventType, setSelectedEventType] = useState<string>('all');
  const [playingAudio, setPlayingAudio] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

  const tabs = [
    { id: 'weather', label: 'Weather Intelligence', icon: Cloud, color: 'from-blue-500 to-cyan-500' },
    { id: 'events', label: 'Local Events', icon: Calendar, color: 'from-purple-500 to-pink-500' },
    { id: 'food', label: 'Foodie Intelligence', icon: Utensils, color: 'from-orange-500 to-red-500' },
    { id: 'transport', label: 'Transport Optimizer', icon: Navigation, color: 'from-green-500 to-teal-500' },
    { id: 'safety', label: 'Safety Advisor', icon: Shield, color: 'from-red-500 to-pink-500' },
    { id: 'accessibility', label: 'Accessibility', icon: Accessibility, color: 'from-indigo-500 to-purple-500' },
  ];

  useEffect(() => {
    loadIntelligenceData();
    
    // Set up real-time updates
    const interval = setInterval(() => {
      updateRealTimeData();
    }, 300000); // Update every 5 minutes

    return () => clearInterval(interval);
  }, [destination, startDate, endDate]);

  const loadIntelligenceData = async () => {
    setIsLoading(true);
    
    try {
      await Promise.all([
        loadWeatherData(),
        loadLocalEvents(),
        loadFoodieInsights(),
        loadTransportData(),
        loadSafetyData(),
        loadAccessibilityInfo()
      ]);
      
      setLastUpdated(new Date());
    } catch (error) {
      console.error('Failed to load intelligence data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateRealTimeData = async () => {
    // Update only time-sensitive data
    if (transportData) {
      await loadTransportData();
    }
    if (weatherData) {
      await loadWeatherData();
    }
    setLastUpdated(new Date());
  };

  const loadWeatherData = async () => {
    const mockWeatherData: WeatherData = {
      current: {
        temperature: 24,
        condition: 'Partly Cloudy',
        humidity: 65,
        windSpeed: 12,
        uvIndex: 6,
        visibility: 10,
        feelsLike: 26,
        pressure: 1013
      },
      forecast: [
        {
          date: '2024-03-15',
          high: 26,
          low: 18,
          condition: 'Sunny',
          precipitation: 10,
          windSpeed: 8,
          humidity: 60,
          activities: ['Outdoor sightseeing', 'Walking tours', 'Photography', 'Beach activities'],
          recommendations: ['Perfect day for outdoor activities', 'Bring sunscreen SPF 30+', 'Stay hydrated', 'Light clothing recommended'],
          packingTips: ['Sunglasses', 'Hat', 'Light jacket for evening', 'Comfortable walking shoes']
        },
        {
          date: '2024-03-16',
          high: 22,
          low: 16,
          condition: 'Light Rain',
          precipitation: 70,
          windSpeed: 15,
          humidity: 80,
          activities: ['Museums', 'Indoor markets', 'Cafes', 'Shopping centers', 'Art galleries'],
          recommendations: ['Plan indoor activities', 'Bring umbrella', 'Visit covered markets', 'Perfect for museum hopping'],
          packingTips: ['Waterproof jacket', 'Umbrella', 'Waterproof shoes', 'Quick-dry clothing']
        },
        {
          date: '2024-03-17',
          high: 25,
          low: 19,
          condition: 'Cloudy',
          precipitation: 30,
          windSpeed: 10,
          humidity: 70,
          activities: ['City tours', 'Shopping', 'Cultural sites', 'Food tours'],
          recommendations: ['Great for walking', 'Light jacket recommended', 'Good photography lighting', 'Comfortable temperature'],
          packingTips: ['Layers', 'Light sweater', 'Comfortable shoes', 'Small backpack']
        }
      ],
      alerts: [
        {
          type: 'advisory',
          title: 'High UV Index Expected',
          description: 'UV levels will be high during midday hours (11 AM - 3 PM)',
          impact: 'Use sun protection between 11 AM - 3 PM. Seek shade during peak hours.',
          validUntil: '2024-03-15T18:00:00Z'
        }
      ],
      seasonal: {
        bestMonths: ['March', 'April', 'May', 'September', 'October'],
        worstMonths: ['July', 'August', 'December', 'January'],
        peakSeason: 'April - June, September - November',
        offSeason: 'December - February',
        insights: [
          'Spring offers perfect weather with mild temperatures',
          'Summer can be hot and humid with occasional thunderstorms',
          'Fall provides comfortable temperatures and fewer crowds',
          'Winter is mild but can be rainy'
        ]
      }
    };
    
    setWeatherData(mockWeatherData);
  };

  const loadLocalEvents = async () => {
    const mockEvents: LocalEvent[] = [
      {
        id: '1',
        title: 'Spring Cherry Blossom Festival',
        type: 'festival',
        date: '2024-03-16',
        time: '10:00 AM',
        endTime: '6:00 PM',
        location: 'Central Park',
        venue: 'Main Pavilion Area',
        description: 'Annual celebration of spring with traditional performances, food stalls, cultural activities, and live music.',
        ticketPrice: 'Free',
        popularity: 95,
        culturalSignificance: 'Celebrates the arrival of spring and renewal, deeply rooted in local traditions dating back 200 years.',
        image: 'https://images.pexels.com/photos/1051075/pexels-photo-1051075.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=2',
        tags: ['Family Friendly', 'Cultural', 'Outdoor', 'Traditional'],
        accessibility: true,
        weatherDependent: true,
        capacity: 5000
      },
      {
        id: '2',
        title: 'International Jazz Night',
        type: 'concert',
        date: '2024-03-17',
        time: '8:00 PM',
        endTime: '11:00 PM',
        location: 'Blue Note Club',
        venue: 'Main Stage',
        description: 'Intimate jazz performance featuring renowned local and international artists in an authentic jazz club setting.',
        ticketPrice: '$25-45',
        popularity: 78,
        culturalSignificance: 'Part of the city\'s rich musical heritage and vibrant nightlife scene, showcasing both traditional and contemporary jazz.',
        bookingUrl: 'https://example.com/tickets',
        image: 'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=2',
        tags: ['Music', 'Nightlife', 'Indoor', 'Premium'],
        accessibility: true,
        ageRestriction: '18+',
        weatherDependent: false,
        capacity: 200
      },
      {
        id: '3',
        title: 'Weekend Farmers Market',
        type: 'market',
        date: '2024-03-18',
        time: '7:00 AM',
        endTime: '2:00 PM',
        location: 'Town Square',
        venue: 'Open Air Market',
        description: 'Fresh local produce, artisanal goods, street food from regional vendors, and live cooking demonstrations.',
        ticketPrice: 'Free entry',
        popularity: 85,
        culturalSignificance: 'Showcases local agriculture and traditional crafts, supporting community farmers and artisans for over 50 years.',
        image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=2',
        tags: ['Food', 'Local', 'Shopping', 'Family Friendly'],
        accessibility: true,
        weatherDependent: true,
        capacity: 1000
      },
      {
        id: '4',
        title: 'Contemporary Art Exhibition',
        type: 'exhibition',
        date: '2024-03-19',
        time: '10:00 AM',
        endTime: '8:00 PM',
        location: 'Modern Art Museum',
        venue: 'Gallery Wing A',
        description: 'Cutting-edge contemporary art exhibition featuring works from emerging and established artists.',
        ticketPrice: '$15-25',
        popularity: 72,
        culturalSignificance: 'Showcases the evolution of modern art and its impact on contemporary culture.',
        bookingUrl: 'https://example.com/art-tickets',
        image: 'https://images.pexels.com/photos/1839919/pexels-photo-1839919.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=2',
        tags: ['Art', 'Culture', 'Indoor', 'Educational'],
        accessibility: true,
        weatherDependent: false,
        capacity: 300
      }
    ];
    
    setLocalEvents(mockEvents);
  };

  const loadFoodieInsights = async () => {
    const mockFoodieData: FoodieInsight[] = [
      {
        dish: {
          name: 'Traditional Local Stew',
          description: 'A hearty stew made with local vegetables, herbs, and tender meat, slow-cooked for hours to develop rich, complex flavors.',
          culturalStory: 'Originally created by farmers as a way to use seasonal vegetables and preserve meat during winter months. Each family has their own secret recipe passed down through generations, making it a symbol of family heritage and community.',
          ingredients: ['Local grass-fed beef', 'Root vegetables', 'Traditional herbs', 'Local wine', 'Seasonal mushrooms'],
          allergens: ['Gluten', 'May contain dairy', 'Sulfites from wine'],
          difficulty: 'Moderate',
          seasonality: 'Best in autumn and winter',
          region: 'Northern highlands'
        },
        restaurants: [
          {
            name: 'Grandmother\'s Kitchen',
            rating: 4.8,
            priceRange: '$$',
            specialty: 'Traditional family recipes',
            location: 'Old Town',
            authenticity: 95,
            address: '123 Heritage Street, Old Town',
            phone: '+1-555-0123',
            hours: '11:00 AM - 10:00 PM',
            reservationRequired: false,
            localFavorite: true,
            michelin: false
          },
          {
            name: 'Modern Heritage',
            rating: 4.6,
            priceRange: '$$$',
            specialty: 'Contemporary take on classics',
            location: 'Downtown',
            authenticity: 85,
            address: '456 Innovation Ave, Downtown',
            phone: '+1-555-0456',
            hours: '5:00 PM - 11:00 PM',
            reservationRequired: true,
            localFavorite: false,
            michelin: true
          }
        ],
        streetFoodSafety: {
          tips: [
            'Look for vendors with high turnover and long queues',
            'Ensure food is cooked fresh and served hot',
            'Avoid raw vegetables in street food',
            'Choose vendors popular with locals',
            'Check for proper food handling practices'
          ],
          safeVendors: ['Central Market Food Court', 'University District Stalls', 'Harbor Front Vendors'],
          timesToAvoid: ['Late evening after 10 PM', 'Very early morning before 7 AM', 'During heavy rain'],
          redFlags: [
            'Food sitting out for long periods',
            'Vendors with poor hygiene',
            'Lukewarm or cold food',
            'Flies around food area',
            'No visible cooking process'
          ],
          bestPractices: [
            'Carry hand sanitizer',
            'Bring your own water bottle',
            'Start with small portions',
            'Ask locals for recommendations',
            'Trust your instincts'
          ]
        },
        dietaryAlternatives: {
          vegetarian: ['Vegetable stew with mushrooms', 'Lentil-based version', 'Chickpea and vegetable curry'],
          vegan: ['Plant-based stew with coconut milk', 'Vegetable broth version', 'Quinoa and vegetable medley'],
          glutenFree: ['Served with rice instead of bread', 'Gluten-free thickening agents', 'Corn-based accompaniments'],
          halal: ['Halal-certified meat version', 'Available at certified restaurants', 'Lamb or chicken alternatives'],
          kosher: ['Kosher-supervised preparation', 'Available at select locations', 'Beef or chicken options'],
          keto: ['Low-carb version with extra vegetables', 'Higher fat content', 'No root vegetables'],
          diabetic: ['Reduced sodium version', 'No added sugars', 'Portion-controlled servings']
        },
        cookingClasses: [
          {
            name: 'Traditional Stew Masterclass',
            duration: '3 hours',
            price: '$85 per person',
            includes: ['All ingredients', 'Recipe booklet', 'Wine tasting', 'Take-home portion'],
            difficulty: 'Beginner to Intermediate'
          },
          {
            name: 'Family Recipe Workshop',
            duration: '4 hours',
            price: '$120 per person',
            includes: ['Market tour', 'Cooking session', 'Family meal', 'Recipe collection'],
            difficulty: 'All levels'
          }
        ],
        foodTours: [
          {
            name: 'Heritage Food Walk',
            duration: '3.5 hours',
            price: '$65 per person',
            highlights: ['5 traditional restaurants', 'Local market visit', 'Cultural stories', 'Recipe cards'],
            groupSize: 'Max 12 people'
          },
          {
            name: 'Culinary Adventure Tour',
            duration: '6 hours',
            price: '$145 per person',
            highlights: ['Farm visit', 'Cooking class', 'Wine pairing', 'Traditional lunch'],
            groupSize: 'Max 8 people'
          }
        ]
      }
    ];
    
    setFoodieInsights(mockFoodieData);
  };

  const loadTransportData = async () => {
    const mockTransportData: TransportationData = {
      routes: [
        {
          from: 'Airport',
          to: 'City Center',
          distance: '35 km',
          options: [
            {
              method: 'Express Train',
              duration: '35 min',
              cost: '$12',
              realTimeDelay: 'On time',
              crowdLevel: 'Medium',
              accessibility: true,
              bookingApp: 'CityTransit',
              frequency: 'Every 15 minutes',
              operatingHours: '5:00 AM - 11:30 PM',
              pros: ['Fast', 'Reliable', 'Affordable', 'Scenic route'],
              cons: ['Limited luggage space', 'Can be crowded during peak'],
              tips: ['Buy tickets online for discount', 'Avoid rush hours 7-9 AM, 5-7 PM']
            },
            {
              method: 'Airport Shuttle',
              duration: '45-60 min',
              cost: '$25',
              crowdLevel: 'Low',
              accessibility: true,
              bookingApp: 'AirportShuttle',
              frequency: 'Every 30 minutes',
              operatingHours: '24/7',
              pros: ['Door-to-door service', 'Luggage assistance', 'Air conditioning'],
              cons: ['More expensive', 'Traffic dependent', 'Multiple stops'],
              tips: ['Book in advance for better rates', 'Allow extra time during peak hours']
            },
            {
              method: 'Taxi/Rideshare',
              duration: '45-60 min',
              cost: '$35-50',
              crowdLevel: 'Low',
              accessibility: true,
              bookingApp: 'RideShare',
              frequency: 'On demand',
              operatingHours: '24/7',
              pros: ['Direct route', 'Private', 'Flexible timing', 'Luggage space'],
              cons: ['Most expensive', 'Traffic dependent', 'Surge pricing'],
              tips: ['Compare prices between apps', 'Share ride to reduce cost']
            },
            {
              method: 'Public Bus',
              duration: '55 min',
              cost: '$8',
              realTimeDelay: '5 min delay',
              crowdLevel: 'High',
              accessibility: true,
              bookingApp: 'CityBus',
              frequency: 'Every 20 minutes',
              operatingHours: '5:30 AM - 11:00 PM',
              pros: ['Cheapest option', 'Frequent service', 'Multiple stops'],
              cons: ['Slowest', 'Can be very crowded', 'Limited luggage space'],
              tips: ['Have exact change ready', 'Validate ticket before boarding']
            }
          ]
        }
      ],
      realTimeUpdates: [
        {
          line: 'Blue Line Metro',
          status: 'On Time',
        },
        {
          line: 'Red Line Metro',
          status: 'Delayed',
          delay: '10 minutes',
          reason: 'Signal maintenance',
          alternativeRoute: 'Use Green Line to Central, then transfer',
          estimatedResolution: '2:30 PM'
        },
        {
          line: 'Green Line Bus',
          status: 'On Time'
        },
        {
          line: 'Airport Express',
          status: 'Disrupted',
          reason: 'Track work',
          alternativeRoute: 'Use shuttle bus service',
          estimatedResolution: '6:00 PM'
        }
      ],
      costComparison: {
        daily: [
          { method: 'Public Transport', cost: 15, efficiency: 85 },
          { method: 'Taxi/Rideshare', cost: 45, efficiency: 95 },
          { method: 'Bike Rental', cost: 12, efficiency: 70 },
          { method: 'Walking', cost: 0, efficiency: 40 }
        ],
        weekly: [
          { method: 'Public Transport Pass', cost: 85, savings: 20 },
          { method: 'Taxi/Rideshare', cost: 315, savings: 0 },
          { method: 'Bike Rental', cost: 70, savings: 15 },
          { method: 'Walking', cost: 0, savings: 100 }
        ],
        monthly: [
          { method: 'Public Transport', cost: 320, unlimited: true },
          { method: 'Bike Share', cost: 180, unlimited: true },
          { method: 'Car Rental', cost: 800, unlimited: false },
          { method: 'Mixed Transport', cost: 250, unlimited: false }
        ]
      },
      smartRouting: {
        fastestRoute: 'Express Train + Metro',
        cheapestRoute: 'Public Bus + Walking',
        mostComfortable: 'Taxi/Rideshare',
        leastCrowded: 'Bike + Metro off-peak',
        mostScenic: 'Ferry + Walking'
      },
      apps: [
        {
          name: 'CityTransit',
          platform: ['iOS', 'Android'],
          features: ['Real-time tracking', 'Route planning', 'Mobile tickets', 'Offline maps'],
          rating: 4.5,
          price: 'Free'
        },
        {
          name: 'RideShare',
          platform: ['iOS', 'Android'],
          features: ['Price comparison', 'Multiple providers', 'Split fare', 'Safety features'],
          rating: 4.3,
          price: 'Free'
        },
        {
          name: 'BikeShare',
          platform: ['iOS', 'Android'],
          features: ['Station locator', 'Bike availability', 'Route suggestions', 'Payment'],
          rating: 4.1,
          price: 'Free'
        }
      ]
    };
    
    setTransportData(mockTransportData);
  };

  const loadSafetyData = async () => {
    const mockSafetyData: SafetyData = {
      currentAlerts: [
        {
          level: 'Low',
          type: 'Pickpocketing',
          description: 'Increased pickpocketing reports in tourist areas during peak hours',
          areas: ['Central Station', 'Main Shopping District', 'Tourist Quarter'],
          recommendations: [
            'Keep valuables in front pockets or money belt',
            'Use bags with zippers and keep them in front',
            'Stay aware of surroundings in crowded areas',
            'Avoid displaying expensive items openly'
          ],
          lastUpdated: '2024-03-14T10:30:00Z',
          source: 'Local Police Department'
        },
        {
          level: 'Medium',
          type: 'Transportation Strike',
          description: 'Planned public transport strike affecting bus services',
          areas: ['City-wide bus network'],
          recommendations: [
            'Use alternative transport methods',
            'Allow extra travel time',
            'Consider metro or taxi services',
            'Check real-time updates before traveling'
          ],
          lastUpdated: '2024-03-14T08:00:00Z',
          source: 'Transport Authority'
        }
      ],
      neighborhoods: [
        {
          name: 'Old Town',
          safetyRating: 9,
          dayTime: 'Safe',
          nightTime: 'Safe',
          commonIssues: ['Crowded during peak hours', 'Tourist-targeted scams'],
          tips: [
            'Well-lit streets with regular police patrols',
            'Tourist-friendly with helpful locals',
            'Many 24-hour establishments',
            'Emergency call boxes every 200m'
          ],
          policeStations: ['Old Town Central Police', 'Heritage District Station'],
          hospitals: ['Old Town Medical Center'],
          touristPolice: true
        },
        {
          name: 'Downtown Business District',
          safetyRating: 8,
          dayTime: 'Safe',
          nightTime: 'Caution',
          commonIssues: ['Empty after business hours', 'Limited late-night services'],
          tips: [
            'Use main streets at night',
            'Good during business hours',
            'Well-connected public transport',
            'Security guards in office buildings'
          ],
          policeStations: ['Downtown Central'],
          hospitals: ['City General Hospital'],
          touristPolice: false
        },
        {
          name: 'Waterfront District',
          safetyRating: 7,
          dayTime: 'Safe',
          nightTime: 'Caution',
          commonIssues: ['Isolated areas near water', 'Variable lighting'],
          tips: [
            'Stay on main promenades',
            'Avoid isolated piers at night',
            'Good restaurant and bar area',
            'Regular security patrols'
          ],
          policeStations: ['Harbor Police Station'],
          hospitals: ['Waterfront Clinic'],
          touristPolice: true
        }
      ],
      embassy: {
        address: '123 Embassy Street, Diplomatic Quarter',
        phone: '+1-555-0123',
        email: 'consular@embassy.gov',
        emergencyNumber: '+1-555-0199',
        services: [
          'Passport services',
          'Emergency assistance',
          'Legal support',
          'Medical referrals',
          'Notarial services',
          'Welfare checks'
        ],
        hours: 'Monday-Friday: 8:30 AM - 5:00 PM',
        website: 'https://embassy.gov/services',
        consulates: [
          {
            city: 'Northern City',
            phone: '+1-555-0200',
            address: '456 Consulate Ave, Northern City'
          },
          {
            city: 'Coastal Town',
            phone: '+1-555-0201',
            address: '789 Harbor St, Coastal Town'
          }
        ]
      },
      healthInfo: {
        vaccinations: [
          {
            name: 'Routine vaccines',
            required: true,
            recommended: true,
            timing: 'Up to date'
          },
          {
            name: 'Hepatitis A',
            required: false,
            recommended: true,
            timing: '2 weeks before travel'
          },
          {
            name: 'Typhoid',
            required: false,
            recommended: true,
            timing: '2 weeks before travel'
          },
          {
            name: 'Yellow Fever',
            required: false,
            recommended: false,
            timing: 'Not applicable'
          }
        ],
        waterSafety: 'Tap water is safe to drink throughout the city',
        foodSafety: [
          'Eat at busy restaurants with high turnover',
          'Avoid street vendor salads and raw vegetables',
          'Peel fruits yourself',
          'Ensure meat is well-cooked',
          'Avoid ice in drinks from questionable sources'
        ],
        commonIllnesses: [
          'Traveler\'s diarrhea',
          'Common cold',
          'Seasonal allergies',
          'Sunburn',
          'Dehydration'
        ],
        medicalFacilities: [
          {
            name: 'Central Hospital',
            type: 'General Hospital',
            address: '456 Health Avenue',
            phone: '+1-555-0456',
            englishSpeaking: true,
            insurance: ['International', 'Travel Insurance', 'Private'],
            specialties: ['Emergency', 'Internal Medicine', 'Surgery']
          },
          {
            name: 'Tourist Medical Center',
            type: 'Clinic',
            address: '789 Tourist Street',
            phone: '+1-555-0789',
            englishSpeaking: true,
            insurance: ['Travel Insurance', 'Cash'],
            specialties: ['Travel Medicine', 'Minor Injuries', 'Vaccinations']
          },
          {
            name: 'International Clinic',
            type: 'Private Clinic',
            address: '321 International Blvd',
            phone: '+1-555-0321',
            englishSpeaking: true,
            insurance: ['International', 'Private', 'Credit Card'],
            specialties: ['General Practice', 'Dental', 'Pharmacy']
          }
        ],
        pharmacies: [
          {
            name: '24-Hour Pharmacy',
            address: 'Central Station',
            hours: '24/7',
            prescription: true
          },
          {
            name: 'Tourist Pharmacy',
            address: 'Old Town Square',
            hours: '8:00 AM - 10:00 PM',
            prescription: true
          }
        ]
      },
      scams: [
        {
          type: 'Fake Travel Agents',
          description: 'Unofficial agents offering cheap tours and accommodations',
          prevention: [
            'Book through verified agencies only',
            'Check official tourism board recommendations',
            'Verify business licenses',
            'Read online reviews carefully'
          ],
          response: 'Report to tourist police and local authorities',
          commonLocations: ['Tourist areas', 'Transportation hubs', 'Popular attractions']
        },
        {
          type: 'Overcharging Foreigners',
          description: 'Higher prices quoted to tourists for goods and services',
          prevention: [
            'Research standard prices beforehand',
            'Ask locals for price references',
            'Use official taxi meters',
            'Shop where locals shop'
          ],
          response: 'Politely negotiate or walk away',
          commonLocations: ['Markets', 'Tourist restaurants', 'Souvenir shops']
        },
        {
          type: 'Distraction Theft',
          description: 'Groups working together to distract while stealing',
          prevention: [
            'Stay alert in crowded areas',
            'Keep valuables secure',
            'Be wary of unsolicited help',
            'Trust your instincts'
          ],
          response: 'Report to police immediately',
          commonLocations: ['Public transport', 'Tourist attractions', 'Busy streets']
        }
      ]
    };
    
    setSafetyData(mockSafetyData);
  };

  const loadAccessibilityInfo = async () => {
    const mockAccessibilityData: AccessibilityInfo = {
      transportation: {
        wheelchairAccessible: ['Metro system (90% of stations)', 'Main bus lines', 'Airport shuttle', 'Tourist buses'],
        audioAnnouncements: true,
        visualAids: true,
        assistanceAvailable: true,
        elevators: ['All metro stations', 'Bus terminals', 'Airport'],
        ramps: ['Most public buildings', 'Tourist attractions', 'Hotels'],
        tactilePaving: true
      },
      attractions: [
        {
          name: 'National Museum',
          wheelchairAccess: 'Full',
          visualImpairment: [
            'Audio guides in 8 languages',
            'Braille descriptions',
            'Tactile exhibits',
            'Large print materials',
            'High contrast displays'
          ],
          hearingImpairment: [
            'Sign language tours (advance booking)',
            'Written guides',
            'Visual displays',
            'Hearing loop systems',
            'Captioned videos'
          ],
          mobilityAssistance: [
            'Wheelchairs available free',
            'Elevator access to all floors',
            'Accessible restrooms',
            'Reserved parking spaces',
            'Mobility scooter charging'
          ],
          specialServices: [
            'Priority entry',
            'Dedicated assistance staff',
            'Accessible parking',
            'Rest areas',
            'Companion seating'
          ],
          accessibleParking: true,
          accessibleRestrooms: true,
          guideDogs: true,
          brailleInfo: true,
          signLanguage: true
        },
        {
          name: 'Historic Cathedral',
          wheelchairAccess: 'Partial',
          visualImpairment: [
            'Audio descriptions',
            'Large print guides',
            'Tactile models'
          ],
          hearingImpairment: [
            'Written information',
            'Visual tours',
            'Printed guides'
          ],
          mobilityAssistance: [
            'Ramp access to main floor',
            'Limited upper level access',
            'Accessible entrance',
            'Seating areas'
          ],
          specialServices: [
            'Assistance available on request',
            'Accessible entrance',
            'Modified tours'
          ],
          accessibleParking: true,
          accessibleRestrooms: true,
          guideDogs: true,
          brailleInfo: false,
          signLanguage: false
        },
        {
          name: 'City Art Gallery',
          wheelchairAccess: 'Full',
          visualImpairment: [
            'Audio descriptions',
            'Tactile reproductions',
            'Large print labels',
            'Magnifying glasses'
          ],
          hearingImpairment: [
            'Visual information',
            'Written descriptions',
            'Sign language interpreter (by appointment)'
          ],
          mobilityAssistance: [
            'Full wheelchair access',
            'Elevator to all floors',
            'Accessible restrooms',
            'Seating throughout'
          ],
          specialServices: [
            'Free wheelchair loan',
            'Assistance staff',
            'Quiet hours for sensory sensitivities',
            'Accessible tours'
          ],
          accessibleParking: true,
          accessibleRestrooms: true,
          guideDogs: true,
          brailleInfo: true,
          signLanguage: true
        }
      ],
      accommodation: {
        accessibleRooms: [
          'Roll-in showers',
          'Lowered fixtures and controls',
          'Wide doorways (32+ inches)',
          'Accessible parking spaces',
          'Visual/vibrating alarms',
          'TTY phones available'
        ],
        assistiveDevices: [
          'Hearing loops',
          'Visual alert systems',
          'Mobility aids',
          'Bathroom grab bars',
          'Shower chairs',
          'Raised toilet seats'
        ],
        serviceAnimals: true,
        specialDiets: true,
        accessiblePools: true,
        emergencyProcedures: [
          'Visual emergency alerts',
          'Accessible evacuation routes',
          'Staff trained in disability assistance',
          'Emergency communication devices'
        ]
      },
      resources: {
        localOrganizations: [
          {
            name: 'Disability Support Center',
            services: ['Equipment rental', 'Accessibility information', 'Personal assistance'],
            contact: '+1-555-ACCESS'
          },
          {
            name: 'Accessibility Tourism Board',
            services: ['Accessible tour planning', 'Venue information', 'Transportation assistance'],
            contact: 'info@accessibletourism.gov'
          },
          {
            name: 'Independent Living Center',
            services: ['Daily living assistance', 'Equipment repair', 'Advocacy'],
            contact: '+1-555-LIVING'
          }
        ],
        equipmentRental: [
          {
            item: 'Manual wheelchair',
            provider: 'Medical Equipment Rental',
            cost: '$25/day',
            booking: '+1-555-RENT'
          },
          {
            item: 'Electric scooter',
            provider: 'Mobility Solutions',
            cost: '$45/day',
            booking: '+1-555-SCOOTER'
          },
          {
            item: 'Hearing devices',
            provider: 'Audio Assist',
            cost: '$15/day',
            booking: '+1-555-AUDIO'
          },
          {
            item: 'Visual aids',
            provider: 'Vision Support',
            cost: '$20/day',
            booking: '+1-555-VISION'
          }
        ],
        emergencyContacts: [
          'Accessibility Hotline: +1-555-ACCESS',
          'Emergency Services: 911',
          'Disability Rights Hotline: +1-555-RIGHTS',
          'Medical Emergency: +1-555-MEDICAL'
        ],
        accessibilityApps: [
          'AccessNow - Venue accessibility ratings',
          'Be My Eyes - Visual assistance',
          'Wheelmap - Wheelchair accessibility map',
          'Ava - Live captioning'
        ]
      },
      cityFeatures: {
        accessibleRoutes: [
          'Main pedestrian areas',
          'Tourist district',
          'Waterfront promenade',
          'Shopping districts',
          'Cultural quarter'
        ],
        audioSignals: true,
        lowFloorBuses: true,
        accessibleTaxis: true,
        wheelchairRentals: [
          'Tourist Information Centers',
          'Major hotels',
          'Airport',
          'Train station',
          'Medical centers'
        ]
      }
    };
    
    setAccessibilityInfo(mockAccessibilityData);
  };

  const getWeatherIcon = (condition: string) => {
    switch (condition.toLowerCase()) {
      case 'sunny': return Sun;
      case 'partly cloudy': return Cloud;
      case 'cloudy': return Cloud;
      case 'light rain': return CloudRain;
      case 'rain': return CloudRain;
      case 'snow': return Snowflake;
      case 'windy': return Wind;
      default: return Sun;
    }
  };

  const getSafetyColor = (level: string) => {
    switch (level) {
      case 'Low': return 'text-green-600 bg-green-100 dark:bg-green-900/30';
      case 'Medium': return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/30';
      case 'High': return 'text-orange-600 bg-orange-100 dark:bg-orange-900/30';
      case 'Critical': return 'text-red-600 bg-red-100 dark:bg-red-900/30';
      default: return 'text-gray-600 bg-gray-100 dark:bg-gray-900/30';
    }
  };

  const getAccessibilityIcon = (level: string) => {
    switch (level) {
      case 'Full': return CheckCircle;
      case 'Partial': return AlertTriangle;
      case 'Limited': return AlertTriangle;
      case 'None': return AlertTriangle;
      default: return Info;
    }
  };

  const getAccessibilityColor = (level: string) => {
    switch (level) {
      case 'Full': return 'text-green-600 bg-green-100 dark:bg-green-900/30';
      case 'Partial': return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/30';
      case 'Limited': return 'text-orange-600 bg-orange-100 dark:bg-orange-900/30';
      case 'None': return 'text-red-600 bg-red-100 dark:bg-red-900/30';
      default: return 'text-gray-600 bg-gray-100 dark:bg-gray-900/30';
    }
  };

  const playPronunciation = (text: string) => {
    if ('speechSynthesis' in window) {
      setPlayingAudio(text);
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.8;
      utterance.onend = () => setPlayingAudio(null);
      speechSynthesis.speak(utterance);
    }
  };

  const filteredEvents = selectedEventType === 'all' 
    ? localEvents.filter(event => 
        event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    : localEvents.filter(event => 
        event.type === selectedEventType &&
        (event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
         event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
         event.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())))
      );

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
              <Zap className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">Advanced Travel Intelligence</h2>
              <p className="text-blue-100">{destination} - Real-time insights and recommendations</p>
            </div>
          </div>
          
          <div className="flex space-x-3">
            <div className="text-sm text-blue-100">
              Last updated: {lastUpdated.toLocaleTimeString()}
            </div>
            <Button
              onClick={loadIntelligenceData}
              disabled={isLoading}
              variant="outline"
              className="border-white/30 text-white hover:bg-white/10"
            >
              {isLoading ? (
                <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <RefreshCw className="w-4 h-4 mr-2" />
              )}
              Refresh Data
            </Button>
            <Button
              variant="outline"
              className="border-white/30 text-white hover:bg-white/10"
            >
              <Download className="w-4 h-4 mr-2" />
              Export Report
            </Button>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-gray-50 dark:bg-gray-700 p-4 border-b border-gray-200 dark:border-gray-600">
        <div className="max-w-3xl mx-auto relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search for events, restaurants, transportation..."
            className="w-full pl-10 pr-4 py-3 bg-white dark:bg-gray-600 border border-gray-300 dark:border-gray-500 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white"
          />
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-gray-200 dark:border-gray-700">
        <nav className="flex space-x-8 px-6 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center space-x-2 py-4 px-2 border-b-2 font-medium text-sm transition-colors duration-200 whitespace-nowrap ${
                activeTab === tab.id
                  ? `border-${tab.id === 'weather' ? 'blue' : tab.id === 'events' ? 'purple' : tab.id === 'food' ? 'orange' : tab.id === 'transport' ? 'green' : tab.id === 'safety' ? 'red' : 'indigo'}-500 text-${tab.id === 'weather' ? 'blue' : tab.id === 'events' ? 'purple' : tab.id === 'food' ? 'orange' : tab.id === 'transport' ? 'green' : tab.id === 'safety' ? 'red' : 'indigo'}-600 dark:text-${tab.id === 'weather' ? 'blue' : tab.id === 'events' ? 'purple' : tab.id === 'food' ? 'orange' : tab.id === 'transport' ? 'green' : tab.id === 'safety' ? 'red' : 'indigo'}-400`
                  : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="p-6">
        <AnimatePresence mode="wait">
          {/* Weather Intelligence Tab */}
          {activeTab === 'weather' && weatherData && (
            <motion.div
              key="weather"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              {/* Current Weather */}
              <div className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                  <Thermometer className="w-5 h-5 mr-2" />
                  Current Conditions
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-3">
                      {React.createElement(getWeatherIcon(weatherData.current.condition), { 
                        className: "w-8 h-8 text-white" 
                      })}
                    </div>
                    <div className="text-3xl font-bold text-gray-900 dark:text-white">
                      {weatherData.current.temperature}°C
                    </div>
                    <div className="text-gray-600 dark:text-gray-300">
                      {weatherData.current.condition}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      Feels like {weatherData.current.feelsLike}°C
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-300">Humidity:</span>
                      <span className="font-medium text-gray-900 dark:text-white">
                        {weatherData.current.humidity}%
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-300">Wind Speed:</span>
                      <span className="font-medium text-gray-900 dark:text-white">
                        {weatherData.current.windSpeed} km/h
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-300">UV Index:</span>
                      <span className="font-medium text-gray-900 dark:text-white">
                        {weatherData.current.uvIndex}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-300">Pressure:</span>
                      <span className="font-medium text-gray-900 dark:text-white">
                        {weatherData.current.pressure} hPa
                      </span>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-300">Visibility:</span>
                      <span className="font-medium text-gray-900 dark:text-white">
                        {weatherData.current.visibility} km
                      </span>
                    </div>
                    <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                      <h4 className="font-medium text-blue-800 dark:text-blue-300 text-sm mb-1">
                        Weather Impact
                      </h4>
                      <p className="text-blue-700 dark:text-blue-200 text-xs">
                        {weatherData.current.condition === 'Sunny' 
                          ? 'Perfect for outdoor activities. Bring sun protection.'
                          : weatherData.current.condition === 'Partly Cloudy'
                          ? 'Good for most activities. Comfortable temperatures.'
                          : weatherData.current.condition === 'Light Rain'
                          ? 'Consider indoor activities or bring rain gear.'
                          : 'Check forecast for activity planning.'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Weather Alerts */}
              {weatherData.alerts.length > 0 && (
                <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-xl p-6">
                  <h4 className="font-semibold text-yellow-800 dark:text-yellow-300 mb-4 flex items-center">
                    <AlertTriangle className="w-5 h-5 mr-2" />
                    Weather Alerts
                  </h4>
                  <div className="space-y-3">
                    {weatherData.alerts.map((alert, index) => (
                      <div key={index} className="bg-white dark:bg-gray-700 rounded-lg p-4">
                        <h5 className="font-medium text-gray-900 dark:text-white mb-2">
                          {alert.title}
                        </h5>
                        <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                          {alert.description}
                        </p>
                        <p className="text-sm text-yellow-700 dark:text-yellow-300 font-medium">
                          Impact: {alert.impact}
                        </p>
                        <div className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                          Valid until: {new Date(alert.validUntil).toLocaleString()}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 3-Day Forecast */}
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                  3-Day Forecast & Activity Recommendations
                </h4>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {weatherData.forecast.map((day, index) => {
                    const WeatherIcon = getWeatherIcon(day.condition);
                    
                    return (
                      <div key={index} className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6">
                        <div className="text-center mb-4">
                          <div className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-2">
                            {new Date(day.date).toLocaleDateString('en-US', { 
                              weekday: 'short', 
                              month: 'short', 
                              day: 'numeric' 
                            })}
                          </div>
                          <WeatherIcon className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                          <div className="text-lg font-semibold text-gray-900 dark:text-white">
                            {day.high}° / {day.low}°
                          </div>
                          <div className="text-sm text-gray-600 dark:text-gray-300">
                            {day.condition}
                          </div>
                          <div className="flex items-center justify-center space-x-4 text-xs text-gray-500 dark:text-gray-400 mt-1">
                            <span>{day.precipitation}% rain</span>
                            <span>{day.windSpeed} km/h</span>
                            <span>{day.humidity}% humidity</span>
                          </div>
                        </div>
                        
                        <div className="space-y-3">
                          <div>
                            <h5 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                              Recommended Activities:
                            </h5>
                            <div className="space-y-1">
                              {day.activities.map((activity, idx) => (
                                <div key={idx} className="text-xs text-gray-600 dark:text-gray-400 flex items-center">
                                  <div className="w-1 h-1 bg-green-500 rounded-full mr-2" />
                                  {activity}
                                </div>
                              ))}
                            </div>
                          </div>
                          
                          <div>
                            <h5 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                              Weather Tips:
                            </h5>
                            <div className="space-y-1">
                              {day.recommendations.map((rec, idx) => (
                                <div key={idx} className="text-xs text-gray-600 dark:text-gray-400 flex items-center">
                                  <div className="w-1 h-1 bg-blue-500 rounded-full mr-2" />
                                  {rec}
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Packing Suggestions */}
              <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-6">
                <h4 className="font-semibold text-green-800 dark:text-green-300 mb-4 flex items-center">
                  <Activity className="w-5 h-5 mr-2" />
                  Smart Packing Suggestions
                </h4>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <h5 className="font-medium text-green-700 dark:text-green-300 mb-2">Essential Items:</h5>
                    <ul className="space-y-1 text-sm text-green-600 dark:text-green-200">
                      <li>• Light rain jacket</li>
                      <li>• Comfortable walking shoes</li>
                      <li>• Sunscreen (SPF 30+)</li>
                      <li>• Portable umbrella</li>
                      <li>• Reusable water bottle</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h5 className="font-medium text-green-700 dark:text-green-300 mb-2">Clothing:</h5>
                    <ul className="space-y-1 text-sm text-green-600 dark:text-green-200">
                      <li>• Layered clothing</li>
                      <li>• Light sweater/cardigan</li>
                      <li>• Breathable fabrics</li>
                      <li>• Waterproof jacket</li>
                      <li>• Quick-dry clothing</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h5 className="font-medium text-green-700 dark:text-green-300 mb-2">Accessories:</h5>
                    <ul className="space-y-1 text-sm text-green-600 dark:text-green-200">
                      <li>• Sunglasses</li>
                      <li>• Hat/cap</li>
                      <li>• Daypack</li>
                      <li>• Power bank</li>
                      <li>• Travel adapter</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Seasonal Insights */}
              <div className="bg-purple-50 dark:bg-purple-900/20 rounded-xl p-6">
                <h4 className="font-semibold text-purple-800 dark:text-purple-300 mb-4 flex items-center">
                  <Calendar className="w-5 h-5 mr-2" />
                  Seasonal Travel Insights
                </h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h5 className="font-medium text-purple-700 dark:text-purple-300 mb-3">Season Overview:</h5>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-300">Best Time to Visit:</span>
                        <span className="font-medium text-gray-900 dark:text-white">
                          {weatherData.seasonal.bestMonths.join(', ')}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-300">Peak Season:</span>
                        <span className="font-medium text-gray-900 dark:text-white">
                          {weatherData.seasonal.peakSeason}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-300">Off Season:</span>
                        <span className="font-medium text-gray-900 dark:text-white">
                          {weatherData.seasonal.offSeason}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h5 className="font-medium text-purple-700 dark:text-purple-300 mb-3">Seasonal Insights:</h5>
                    <ul className="space-y-1">
                      {weatherData.seasonal.insights.map((insight, idx) => (
                        <li key={idx} className="text-sm text-gray-600 dark:text-gray-300 flex items-start space-x-2">
                          <div className="w-1.5 h-1.5 bg-purple-500 rounded-full mt-2 flex-shrink-0" />
                          <span>{insight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                <div className="mt-4 p-3 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                  <h5 className="font-medium text-purple-800 dark:text-purple-300 text-sm mb-2">
                    Your Travel Dates: {new Date(startDate).toLocaleDateString()} - {new Date(endDate).toLocaleDateString()}
                  </h5>
                  <p className="text-purple-700 dark:text-purple-200 text-xs">
                    {new Date(startDate).getMonth() >= 2 && new Date(startDate).getMonth() <= 4
                      ? 'You\'re traveling during spring, one of the best times to visit with mild temperatures and fewer crowds.'
                      : new Date(startDate).getMonth() >= 5 && new Date(startDate).getMonth() <= 7
                      ? 'You\'re traveling during summer, which can be hot and crowded. Early morning and evening activities recommended.'
                      : new Date(startDate).getMonth() >= 8 && new Date(startDate).getMonth() <= 10
                      ? 'You\'re traveling during fall, a beautiful time with comfortable temperatures and seasonal festivals.'
                      : 'You\'re traveling during winter, which is less crowded but can be rainy. Pack accordingly and plan indoor alternatives.'}
                  </p>
                </div>
              </div>

              {/* Weather-Based Backup Plans */}
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6">
                <h4 className="font-semibold text-blue-800 dark:text-blue-300 mb-4 flex items-center">
                  <Umbrella className="w-5 h-5 mr-2" />
                  Weather-Based Backup Plans
                </h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white dark:bg-gray-700 rounded-lg p-4">
                    <h5 className="font-medium text-gray-900 dark:text-white mb-3 flex items-center">
                      <CloudRain className="w-4 h-4 mr-2 text-blue-500" />
                      If It Rains
                    </h5>
                    <ul className="space-y-2">
                      <li className="text-sm text-gray-600 dark:text-gray-300 flex items-start space-x-2">
                        <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                        <span>Visit the National Museum (indoor, 4-5 hours)</span>
                      </li>
                      <li className="text-sm text-gray-600 dark:text-gray-300 flex items-start space-x-2">
                        <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                        <span>Explore the covered Central Market (indoor, 2-3 hours)</span>
                      </li>
                      <li className="text-sm text-gray-600 dark:text-gray-300 flex items-start space-x-2">
                        <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                        <span>Take a cooking class at Culinary Institute (indoor, 3 hours)</span>
                      </li>
                      <li className="text-sm text-gray-600 dark:text-gray-300 flex items-start space-x-2">
                        <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                        <span>Visit the Art Gallery and Cafe (indoor, 2-3 hours)</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="bg-white dark:bg-gray-700 rounded-lg p-4">
                    <h5 className="font-medium text-gray-900 dark:text-white mb-3 flex items-center">
                      <Thermometer className="w-4 h-4 mr-2 text-red-500" />
                      If It's Too Hot
                    </h5>
                    <ul className="space-y-2">
                      <li className="text-sm text-gray-600 dark:text-gray-300 flex items-start space-x-2">
                        <div className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2 flex-shrink-0" />
                        <span>Visit the Underground Caverns (cool, 2-3 hours)</span>
                      </li>
                      <li className="text-sm text-gray-600 dark:text-gray-300 flex items-start space-x-2">
                        <div className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2 flex-shrink-0" />
                        <span>Enjoy the air-conditioned Aquarium (indoor, 3 hours)</span>
                      </li>
                      <li className="text-sm text-gray-600 dark:text-gray-300 flex items-start space-x-2">
                        <div className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2 flex-shrink-0" />
                        <span>Take a boat tour on the river (breezy, 1-2 hours)</span>
                      </li>
                      <li className="text-sm text-gray-600 dark:text-gray-300 flex items-start space-x-2">
                        <div className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2 flex-shrink-0" />
                        <span>Visit the Ice Cream Museum (cold treats, 1-2 hours)</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Local Events Tab */}
          {activeTab === 'events' && (
            <motion.div
              key="events"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              {/* Event Filters */}
              <div className="bg-white dark:bg-gray-700 rounded-xl p-6 shadow-sm">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="flex items-center space-x-4">
                    <Filter className="w-5 h-5 text-gray-400" />
                    <select
                      value={selectedEventType}
                      onChange={(e) => setSelectedEventType(e.target.value)}
                      className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white dark:bg-gray-600 text-gray-900 dark:text-white"
                    >
                      <option value="all">All Events</option>
                      <option value="festival">Festivals</option>
                      <option value="concert">Concerts</option>
                      <option value="market">Markets</option>
                      <option value="cultural">Cultural</option>
                      <option value="sports">Sports</option>
                      <option value="exhibition">Exhibitions</option>
                      <option value="performance">Performances</option>
                    </select>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="accessibleOnly"
                        className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                      />
                      <label htmlFor="accessibleOnly" className="text-sm text-gray-700 dark:text-gray-300">
                        Accessible Only
                      </label>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="weatherIndependent"
                        className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                      />
                      <label htmlFor="weatherIndependent" className="text-sm text-gray-700 dark:text-gray-300">
                        Weather Independent
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              {/* Events Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {filteredEvents.map((event) => (
                  <div key={event.id} className="bg-white dark:bg-gray-700 rounded-xl overflow-hidden hover:shadow-lg transition-shadow duration-300">
                    <div className="relative">
                      <img
                        src={event.image}
                        alt={event.title}
                        className="w-full h-48 object-cover"
                      />
                      
                      {/* Event Type Badge */}
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 bg-purple-500 text-white text-xs font-medium rounded-full capitalize">
                          {event.type}
                        </span>
                      </div>
                      
                      {/* Weather Dependent Badge */}
                      {event.weatherDependent && (
                        <div className="absolute top-4 right-4">
                          <span className="px-3 py-1 bg-yellow-500 text-white text-xs font-medium rounded-full flex items-center">
                            <Cloud className="w-3 h-3 mr-1" />
                            Weather Dependent
                          </span>
                        </div>
                      )}
                      
                      {/* Sold Out Badge */}
                      {event.soldOut && (
                        <div className="absolute bottom-4 right-4">
                          <span className="px-3 py-1 bg-red-500 text-white text-xs font-medium rounded-full">
                            Sold Out
                          </span>
                        </div>
                      )}
                    </div>
                    
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                            {event.title}
                          </h3>
                          <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-300">
                            <div className="flex items-center">
                              <Calendar className="w-4 h-4 mr-1" />
                              {new Date(event.date).toLocaleDateString()}
                            </div>
                            <div className="flex items-center">
                              <Clock className="w-4 h-4 mr-1" />
                              {event.time} {event.endTime ? `- ${event.endTime}` : ''}
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <div className="flex items-center">
                            <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                            <span className="text-sm font-medium text-green-600 dark:text-green-400">
                              {event.popularity}%
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2 mb-3">
                        <MapPin className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-600 dark:text-gray-300">
                          {event.location} • {event.venue}
                        </span>
                      </div>
                      
                      <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 leading-relaxed line-clamp-2">
                        {event.description}
                      </p>
                      
                      <div className="flex flex-wrap gap-2 mb-4">
                        {event.tags.map((tag, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-1 bg-gray-100 dark:bg-gray-600 text-gray-600 dark:text-gray-300 text-xs rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      
                      <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-3 mb-4">
                        <h4 className="font-medium text-purple-800 dark:text-purple-300 text-sm mb-1">
                          Cultural Significance:
                        </h4>
                        <p className="text-purple-700 dark:text-purple-200 text-xs">
                          {event.culturalSignificance}
                        </p>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <DollarSign className="w-4 h-4 text-gray-400" />
                          <span className="font-medium text-gray-900 dark:text-white">
                            {event.ticketPrice}
                          </span>
                          {event.accessibility && (
                            <span className="ml-2 text-xs px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full flex items-center">
                              <Accessibility className="w-3 h-3 mr-1" />
                              Accessible
                            </span>
                          )}
                        </div>
                        
                        <div className="flex space-x-2">
                          {event.bookingUrl && !event.soldOut && (
                            <Button size="sm" variant="outline">
                              Book Tickets
                            </Button>
                          )}
                          <Button size="sm">
                            <Bookmark className="w-4 h-4 mr-1" />
                            Save
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {filteredEvents.length === 0 && (
                <div className="text-center py-16">
                  <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    No events found
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Try adjusting your search criteria or check back later for new events.
                  </p>
                </div>
              )}

              {/* Event Calendar */}
              <div className="bg-white dark:bg-gray-700 rounded-xl p-6 shadow-sm">
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                  <Calendar className="w-5 h-5 mr-2 text-purple-500" />
                  Events During Your Stay
                </h4>
                
                <div className="overflow-x-auto">
                  <table className="min-w-full">
                    <thead>
                      <tr className="border-b border-gray-200 dark:border-gray-600">
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Date
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Event
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Type
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Location
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Price
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
                      {localEvents.map((event) => (
                        <tr key={event.id} className="hover:bg-gray-50 dark:hover:bg-gray-600">
                          <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                            {new Date(event.date).toLocaleDateString()}
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                            {event.title}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400 capitalize">
                            {event.type}
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400">
                            {event.location}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                            {event.ticketPrice}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>
          )}

          {/* Foodie Intelligence Tab */}
          {activeTab === 'food' && (
            <motion.div
              key="food"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              {foodieInsights.map((insight, index) => (
                <div key={index} className="space-y-6">
                  {/* Dish Story */}
                  <div className="bg-orange-50 dark:bg-orange-900/20 rounded-xl p-6">
                    <h3 className="text-xl font-semibold text-orange-800 dark:text-orange-300 mb-4 flex items-center">
                      <Utensils className="w-5 h-5 mr-2" />
                      Featured Dish: {insight.dish.name}
                    </h3>
                    
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <div>
                        <p className="text-orange-700 dark:text-orange-200 mb-4 leading-relaxed">
                          {insight.dish.description}
                        </p>
                        
                        <div className="space-y-3">
                          <div>
                            <h4 className="font-medium text-orange-800 dark:text-orange-300 mb-2">
                              Key Ingredients:
                            </h4>
                            <div className="flex flex-wrap gap-2">
                              {insight.dish.ingredients.map((ingredient, idx) => (
                                <span key={idx} className="px-3 py-1 bg-orange-100 dark:bg-orange-800 text-orange-700 dark:text-orange-200 text-sm rounded-full">
                                  {ingredient}
                                </span>
                              ))}
                            </div>
                          </div>
                          
                          <div>
                            <h4 className="font-medium text-orange-800 dark:text-orange-300 mb-2">
                              Allergen Information:
                            </h4>
                            <div className="flex flex-wrap gap-2">
                              {insight.dish.allergens.map((allergen, idx) => (
                                <span key={idx} className="px-3 py-1 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 text-sm rounded-full">
                                  {allergen}
                                </span>
                              ))}
                            </div>
                          </div>
                          
                          <div className="flex justify-between">
                            <div>
                              <h4 className="font-medium text-orange-800 dark:text-orange-300 mb-1">
                                Difficulty:
                              </h4>
                              <span className="text-sm text-orange-700 dark:text-orange-200">
                                {insight.dish.difficulty}
                              </span>
                            </div>
                            <div>
                              <h4 className="font-medium text-orange-800 dark:text-orange-300 mb-1">
                                Seasonality:
                              </h4>
                              <span className="text-sm text-orange-700 dark:text-orange-200">
                                {insight.dish.seasonality}
                              </span>
                            </div>
                            <div>
                              <h4 className="font-medium text-orange-800 dark:text-orange-300 mb-1">
                                Region:
                              </h4>
                              <span className="text-sm text-orange-700 dark:text-orange-200">
                                {insight.dish.region}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-white dark:bg-gray-700 rounded-lg p-4">
                        <h4 className="font-medium text-gray-900 dark:text-white mb-3">
                          Cultural Story
                        </h4>
                        <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                          {insight.dish.culturalStory}
                        </p>
                        
                        <div className="mt-4 p-3 bg-orange-100 dark:bg-orange-900/30 rounded-lg">
                          <h5 className="font-medium text-orange-800 dark:text-orange-300 text-sm mb-2">
                            Did You Know?
                          </h5>
                          <p className="text-orange-700 dark:text-orange-200 text-xs">
                            This dish is often served during special celebrations and family gatherings. 
                            The preparation is considered an art form, with techniques passed down through generations.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Best Restaurants */}
                  <div className="bg-white dark:bg-gray-700 rounded-xl p-6 shadow-sm">
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                      Best Places to Try This Dish
                    </h4>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {insight.restaurants.map((restaurant, idx) => (
                        <div key={idx} className="bg-gray-50 dark:bg-gray-600 rounded-lg p-4 hover:shadow-md transition-shadow duration-200">
                          <div className="flex items-start justify-between mb-2">
                            <h5 className="font-medium text-gray-900 dark:text-white">
                              {restaurant.name}
                              {restaurant.michelin && (
                                <span className="ml-2 text-xs px-2 py-1 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300 rounded-full">
                                  Michelin
                                </span>
                              )}
                              {restaurant.localFavorite && (
                                <span className="ml-2 text-xs px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-full">
                                  Local Favorite
                                </span>
                              )}
                            </h5>
                            <div className="flex items-center">
                              <Star className="w-4 h-4 text-yellow-500 fill-current mr-1" />
                              <span className="text-sm font-medium">{restaurant.rating}</span>
                            </div>
                          </div>
                          
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-gray-600 dark:text-gray-300">Price Range:</span>
                              <span className="font-medium">{restaurant.priceRange}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600 dark:text-gray-300">Specialty:</span>
                              <span className="font-medium">{restaurant.specialty}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600 dark:text-gray-300">Location:</span>
                              <span className="font-medium">{restaurant.location}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600 dark:text-gray-300">Authenticity:</span>
                              <div className="flex items-center">
                                <div className="w-16 bg-gray-200 dark:bg-gray-500 rounded-full h-2 mr-2">
                                  <div 
                                    className="bg-green-500 h-2 rounded-full" 
                                    style={{ width: `${restaurant.authenticity}%` }}
                                  />
                                </div>
                                <span className="text-xs">{restaurant.authenticity}%</span>
                              </div>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600 dark:text-gray-300">Hours:</span>
                              <span className="font-medium">{restaurant.hours}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600 dark:text-gray-300">Reservation:</span>
                              <span className="font-medium">{restaurant.reservationRequired ? 'Required' : 'Not required'}</span>
                            </div>
                          </div>
                          
                          <div className="mt-3 flex items-center justify-between">
                            <span className="text-xs text-gray-500 dark:text-gray-400">
                              {restaurant.address}
                            </span>
                            <Button size="sm" variant="outline">
                              <MapPin className="w-3 h-3 mr-1" />
                              Directions
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Street Food Safety */}
                  <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-xl p-6">
                    <h4 className="text-lg font-semibold text-yellow-800 dark:text-yellow-300 mb-4 flex items-center">
                      <Shield className="w-5 h-5 mr-2" />
                      Street Food Safety Guide
                    </h4>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div>
                        <h5 className="font-medium text-yellow-700 dark:text-yellow-300 mb-3">
                          Safety Tips:
                        </h5>
                        <ul className="space-y-2">
                          {insight.streetFoodSafety.tips.map((tip, idx) => (
                            <li key={idx} className="text-sm text-yellow-600 dark:text-yellow-200 flex items-start">
                              <CheckCircle className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
                              {tip}
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h5 className="font-medium text-yellow-700 dark:text-yellow-300 mb-3">
                          Recommended Vendors:
                        </h5>
                        <ul className="space-y-2">
                          {insight.streetFoodSafety.safeVendors.map((vendor, idx) => (
                            <li key={idx} className="text-sm text-yellow-600 dark:text-yellow-200 flex items-start">
                              <Star className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0 text-yellow-500" />
                              {vendor}
                            </li>
                          ))}
                        </ul>
                        
                        <h5 className="font-medium text-yellow-700 dark:text-yellow-300 mt-4 mb-3">
                          Times to Avoid:
                        </h5>
                        <ul className="space-y-2">
                          {insight.streetFoodSafety.timesToAvoid.map((time, idx) => (
                            <li key={idx} className="text-sm text-yellow-600 dark:text-yellow-200 flex items-start">
                              <AlertTriangle className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
                              {time}
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h5 className="font-medium text-yellow-700 dark:text-yellow-300 mb-3">
                          Red Flags to Watch For:
                        </h5>
                        <ul className="space-y-2">
                          {insight.streetFoodSafety.redFlags.map((flag, idx) => (
                            <li key={idx} className="text-sm text-yellow-600 dark:text-yellow-200 flex items-start">
                              <AlertTriangle className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
                              {flag}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Dietary Alternatives */}
                  <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-6">
                    <h4 className="text-lg font-semibold text-green-800 dark:text-green-300 mb-4">
                      Dietary Alternatives & Accommodations
                    </h4>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {Object.entries(insight.dietaryAlternatives).map(([diet, alternatives]) => (
                        <div key={diet} className="bg-white dark:bg-gray-700 rounded-lg p-4">
                          <h5 className="font-medium text-gray-900 dark:text-white mb-3 capitalize">
                            {diet.replace(/([A-Z])/g, ' $1').trim()}:
                          </h5>
                          <ul className="space-y-1">
                            {alternatives.map((alt, idx) => (
                              <li key={idx} className="text-sm text-gray-600 dark:text-gray-300 flex items-start">
                                <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 mr-2 flex-shrink-0" />
                                {alt}
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Cooking Classes & Food Tours */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6">
                      <h4 className="text-lg font-semibold text-blue-800 dark:text-blue-300 mb-4 flex items-center">
                        <Utensils className="w-5 h-5 mr-2" />
                        Cooking Classes
                      </h4>
                      
                      <div className="space-y-4">
                        {insight.cookingClasses.map((cookingClass, idx) => (
                          <div key={idx} className="bg-white dark:bg-gray-700 rounded-lg p-4">
                            <h5 className="font-medium text-gray-900 dark:text-white mb-2">
                              {cookingClass.name}
                            </h5>
                            <div className="grid grid-cols-2 gap-2 text-sm mb-3">
                              <div className="flex items-center">
                                <Clock className="w-4 h-4 text-gray-400 mr-1" />
                                <span className="text-gray-600 dark:text-gray-300">{cookingClass.duration}</span>
                              </div>
                              <div className="flex items-center">
                                <DollarSign className="w-4 h-4 text-gray-400 mr-1" />
                                <span className="text-gray-600 dark:text-gray-300">{cookingClass.price}</span>
                              </div>
                            </div>
                            <div>
                              <h6 className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Includes:
                              </h6>
                              <div className="flex flex-wrap gap-1">
                                {cookingClass.includes.map((item, i) => (
                                  <span key={i} className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs rounded-full">
                                    {item}
                                  </span>
                                ))}
                              </div>
                            </div>
                            <div className="mt-3 text-xs text-gray-500 dark:text-gray-400">
                              Difficulty: {cookingClass.difficulty}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="bg-purple-50 dark:bg-purple-900/20 rounded-xl p-6">
                      <h4 className="text-lg font-semibold text-purple-800 dark:text-purple-300 mb-4 flex items-center">
                        <Map className="w-5 h-5 mr-2" />
                        Food Tours
                      </h4>
                      
                      <div className="space-y-4">
                        {insight.foodTours.map((foodTour, idx) => (
                          <div key={idx} className="bg-white dark:bg-gray-700 rounded-lg p-4">
                            <h5 className="font-medium text-gray-900 dark:text-white mb-2">
                              {foodTour.name}
                            </h5>
                            <div className="grid grid-cols-2 gap-2 text-sm mb-3">
                              <div className="flex items-center">
                                <Clock className="w-4 h-4 text-gray-400 mr-1" />
                                <span className="text-gray-600 dark:text-gray-300">{foodTour.duration}</span>
                              </div>
                              <div className="flex items-center">
                                <DollarSign className="w-4 h-4 text-gray-400 mr-1" />
                                <span className="text-gray-600 dark:text-gray-300">{foodTour.price}</span>
                              </div>
                            </div>
                            <div>
                              <h6 className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Highlights:
                              </h6>
                              <ul className="space-y-1">
                                {foodTour.highlights.map((highlight, i) => (
                                  <li key={i} className="text-xs text-gray-600 dark:text-gray-300 flex items-start">
                                    <div className="w-1 h-1 bg-purple-500 rounded-full mt-1.5 mr-1.5 flex-shrink-0" />
                                    {highlight}
                                  </li>
                                ))}
                              </ul>
                            </div>
                            <div className="mt-3 text-xs text-gray-500 dark:text-gray-400">
                              Group Size: {foodTour.groupSize}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Food Allergy Translation Cards */}
                  <div className="bg-red-50 dark:bg-red-900/20 rounded-xl p-6">
                    <h4 className="text-lg font-semibold text-red-800 dark:text-red-300 mb-4 flex items-center">
                      <AlertTriangle className="w-5 h-5 mr-2" />
                      Food Allergy Translation Cards
                    </h4>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {['Gluten', 'Peanuts', 'Shellfish', 'Dairy', 'Eggs', 'Tree Nuts'].map((allergen) => (
                        <div key={allergen} className="bg-white dark:bg-gray-700 rounded-lg p-4 border-l-4 border-red-500">
                          <h5 className="font-medium text-gray-900 dark:text-white mb-2">
                            {allergen} Allergy
                          </h5>
                          <div className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                            "I have a serious {allergen.toLowerCase()} allergy. Please ensure my food does not contain any {allergen.toLowerCase()} or was prepared with {allergen.toLowerCase()}."
                          </div>
                          <div className="text-sm text-red-700 dark:text-red-300 font-medium">
                            Local Translation:
                          </div>
                          <div className="text-sm text-gray-900 dark:text-white mt-1 font-medium">
                            [Local language translation would appear here]
                          </div>
                          <Button size="sm" variant="outline" className="mt-3 w-full">
                            <Download className="w-4 h-4 mr-2" />
                            Download Card
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          )}

          {/* Transportation Optimizer Tab */}
          {activeTab === 'transport' && transportData && (
            <motion.div
              key="transport"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              {/* Real-time Updates */}
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-blue-800 dark:text-blue-300 mb-4 flex items-center">
                  <Navigation className="w-5 h-5 mr-2" />
                  Real-time Transportation Status
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {transportData.realTimeUpdates.map((update, index) => (
                    <div key={index} className="bg-white dark:bg-gray-700 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-gray-900 dark:text-white">
                          {update.line}
                        </h4>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          update.status === 'On Time' 
                            ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                            : update.status === 'Delayed'
                            ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
                            : update.status === 'Cancelled'
                            ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                            : 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400'
                        }`}>
                          {update.status}
                        </span>
                      </div>
                      
                      {update.delay && (
                        <div className="text-sm text-gray-600 dark:text-gray-300 mb-1">
                          Delay: {update.delay}
                        </div>
                      )}
                      
                      {update.reason && (
                        <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                          Reason: {update.reason}
                        </div>
                      )}
                      
                      {update.alternativeRoute && (
                        <div className="text-xs text-blue-600 dark:text-blue-400 mt-2">
                          Alternative: {update.alternativeRoute}
                        </div>
                      )}
                      
                      {update.estimatedResolution && (
                        <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                          Est. Resolution: {update.estimatedResolution}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Smart Routing */}
              <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-6">
                <h4 className="text-lg font-semibold text-green-800 dark:text-green-300 mb-4 flex items-center">
                  <Target className="w-5 h-5 mr-2" />
                  Smart Routing Recommendations
                </h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="bg-white dark:bg-gray-700 rounded-lg p-4">
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                        <Zap className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h5 className="font-medium text-gray-900 dark:text-white">
                          Fastest Route
                        </h5>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Time-optimized
                        </p>
                      </div>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300 text-sm mb-3">
                      {transportData.smartRouting.fastestRoute}
                    </p>
                    <Button size="sm" variant="outline" className="w-full">
                      <Navigation className="w-4 h-4 mr-2" />
                      Get Directions
                    </Button>
                  </div>
                  
                  <div className="bg-white dark:bg-gray-700 rounded-lg p-4">
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
                        <DollarSign className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h5 className="font-medium text-gray-900 dark:text-white">
                          Cheapest Route
                        </h5>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Budget-friendly
                        </p>
                      </div>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300 text-sm mb-3">
                      {transportData.smartRouting.cheapestRoute}
                    </p>
                    <Button size="sm" variant="outline" className="w-full">
                      <Navigation className="w-4 h-4 mr-2" />
                      Get Directions
                    </Button>
                  </div>
                  
                  <div className="bg-white dark:bg-gray-700 rounded-lg p-4">
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center">
                        <Camera className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h5 className="font-medium text-gray-900 dark:text-white">
                          Most Scenic
                        </h5>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Best views
                        </p>
                      </div>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300 text-sm mb-3">
                      {transportData.smartRouting.mostScenic}
                    </p>
                    <Button size="sm" variant="outline" className="w-full">
                      <Navigation className="w-4 h-4 mr-2" />
                      Get Directions
                    </Button>
                  </div>
                </div>
              </div>

              {/* Route Options */}
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Optimized Route Options
                </h4>
                
                {transportData.routes.map((route, routeIndex) => (
                  <div key={routeIndex} className="bg-white dark:bg-gray-700 rounded-xl p-6 shadow-sm">
                    <h5 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                      <MapPin className="w-5 h-5 mr-2 text-red-500" />
                      {route.from} → {route.to}
                      <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">
                        ({route.distance})
                      </span>
                    </h5>
                    
                    <div className="space-y-4">
                      {route.options.map((option, optionIndex) => {
                        // Determine the icon based on the method
                        let TransportIcon;
                        if (option.method.toLowerCase().includes('train')) TransportIcon = Train;
                        else if (option.method.toLowerCase().includes('bus')) TransportIcon = Bus;
                        else if (option.method.toLowerCase().includes('taxi') || option.method.toLowerCase().includes('ride')) TransportIcon = Car;
                        else if (option.method.toLowerCase().includes('bike')) TransportIcon = Bike;
                        else if (option.method.toLowerCase().includes('walk')) TransportIcon = Walking;
                        else if (option.method.toLowerCase().includes('plane')) TransportIcon = Plane;
                        else if (option.method.toLowerCase().includes('boat') || option.method.toLowerCase().includes('ferry')) TransportIcon = Ship;
                        else TransportIcon = Navigation;
                        
                        return (
                          <div key={optionIndex} className="bg-gray-50 dark:bg-gray-600 rounded-lg p-4 hover:shadow-md transition-shadow duration-200">
                            <div className="flex items-center justify-between mb-3">
                              <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                                  <TransportIcon className="w-5 h-5 text-white" />
                                </div>
                                <div>
                                  <h6 className="font-medium text-gray-900 dark:text-white">
                                    {option.method}
                                  </h6>
                                  <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-300">
                                    <span>{option.duration}</span>
                                    <span>{option.cost}</span>
                                    {option.accessibility && (
                                      <span className="flex items-center">
                                        <Accessibility className="w-4 h-4 mr-1" />
                                        Accessible
                                      </span>
                                    )}
                                  </div>
                                </div>
                              </div>
                              
                              <div className="text-right">
                                {option.realTimeDelay && (
                                  <div className="text-sm font-medium text-green-600 dark:text-green-400">
                                    {option.realTimeDelay}
                                  </div>
                                )}
                                <div className={`text-xs px-2 py-1 rounded-full ${
                                  option.crowdLevel === 'Low' 
                                    ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                                    : option.crowdLevel === 'Medium'
                                    ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
                                    : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                                }`}>
                                  {option.crowdLevel} crowd
                                </div>
                              </div>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
                              <div>
                                <h6 className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                                  Frequency:
                                </h6>
                                <p className="text-sm text-gray-600 dark:text-gray-300">
                                  {option.frequency}
                                </p>
                              </div>
                              <div>
                                <h6 className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                                  Operating Hours:
                                </h6>
                                <p className="text-sm text-gray-600 dark:text-gray-300">
                                  {option.operatingHours}
                                </p>
                              </div>
                              <div>
                                <h6 className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                                  Booking App:
                                </h6>
                                <p className="text-sm text-gray-600 dark:text-gray-300">
                                  {option.bookingApp}
                                </p>
                              </div>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
                              <div>
                                <h6 className="text-xs font-medium text-green-700 dark:text-green-300 mb-1">
                                  Pros:
                                </h6>
                                <ul className="space-y-1">
                                  {option.pros.map((pro, idx) => (
                                    <li key={idx} className="text-xs text-gray-600 dark:text-gray-300 flex items-start">
                                      <div className="w-1 h-1 bg-green-500 rounded-full mt-1.5 mr-1.5 flex-shrink-0" />
                                      {pro}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                              <div>
                                <h6 className="text-xs font-medium text-red-700 dark:text-red-300 mb-1">
                                  Cons:
                                </h6>
                                <ul className="space-y-1">
                                  {option.cons.map((con, idx) => (
                                    <li key={idx} className="text-xs text-gray-600 dark:text-gray-300 flex items-start">
                                      <div className="w-1 h-1 bg-red-500 rounded-full mt-1.5 mr-1.5 flex-shrink-0" />
                                      {con}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                              <div>
                                <h6 className="text-xs font-medium text-blue-700 dark:text-blue-300 mb-1">
                                  Tips:
                                </h6>
                                <ul className="space-y-1">
                                  {option.tips.map((tip, idx) => (
                                    <li key={idx} className="text-xs text-gray-600 dark:text-gray-300 flex items-start">
                                      <div className="w-1 h-1 bg-blue-500 rounded-full mt-1.5 mr-1.5 flex-shrink-0" />
                                      {tip}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                            
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-gray-600 dark:text-gray-300">
                                Book via: {option.bookingApp}
                              </span>
                              <Button size="sm" variant="outline">
                                Get Directions
                              </Button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>

              {/* Cost Comparison */}
              <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-6">
                <h4 className="text-lg font-semibold text-green-800 dark:text-green-300 mb-4 flex items-center">
                  <DollarSign className="w-5 h-5 mr-2" />
                  Transportation Cost Comparison
                </h4>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <h5 className="font-medium text-green-700 dark:text-green-300 mb-3">
                      Daily Costs:
                    </h5>
                    <div className="space-y-2">
                      {transportData.costComparison.daily.map((item, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-white dark:bg-gray-700 rounded-lg">
                          <span className="text-gray-900 dark:text-white">{item.method}</span>
                          <div className="flex items-center">
                            <span className="font-semibold text-green-600 dark:text-green-400 mr-2">
                              ${item.cost}
                            </span>
                            <div className="w-16 bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                              <div 
                                className="bg-green-500 h-2 rounded-full" 
                                style={{ width: `${item.efficiency}%` }}
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h5 className="font-medium text-green-700 dark:text-green-300 mb-3">
                      Weekly Costs:
                    </h5>
                    <div className="space-y-2">
                      {transportData.costComparison.weekly.map((item, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-white dark:bg-gray-700 rounded-lg">
                          <span className="text-gray-900 dark:text-white">{item.method}</span>
                          <div className="flex items-center">
                            <span className="font-semibold text-green-600 dark:text-green-400">
                              ${item.cost}
                            </span>
                            {item.savings > 0 && (
                              <span className="ml-2 text-xs px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-full">
                                Save ${item.savings}
                              </span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h5 className="font-medium text-green-700 dark:text-green-300 mb-3">
                      Monthly Passes:
                    </h5>
                    <div className="space-y-2">
                      {transportData.costComparison.monthly.map((item, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-white dark:bg-gray-700 rounded-lg">
                          <span className="text-gray-900 dark:text-white">{item.method}</span>
                          <div className="flex items-center">
                            <span className="font-semibold text-green-600 dark:text-green-400">
                              ${item.cost}
                            </span>
                            {item.unlimited && (
                              <span className="ml-2 text-xs px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full">
                                Unlimited
                              </span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Transportation Apps */}
              <div className="bg-white dark:bg-gray-700 rounded-xl p-6 shadow-sm">
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                  <Smartphone className="w-5 h-5 mr-2" />
                  Essential Transportation Apps
                </h4>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {transportData.apps.map((app, index) => (
                    <div key={index} className="bg-gray-50 dark:bg-gray-600 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <h5 className="font-medium text-gray-900 dark:text-white">
                          {app.name}
                        </h5>
                        <div className="flex items-center">
                          <Star className="w-4 h-4 text-yellow-500 fill-current mr-1" />
                          <span className="text-sm">{app.rating}</span>
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap gap-1 mb-3">
                        {app.platform.map((platform, idx) => (
                          <span key={idx} className="px-2 py-1 bg-gray-200 dark:bg-gray-500 text-gray-700 dark:text-gray-200 text-xs rounded-full">
                            {platform}
                          </span>
                        ))}
                      </div>
                      
                      <div>
                        <h6 className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Features:
                        </h6>
                        <ul className="space-y-1">
                          {app.features.map((feature, idx) => (
                            <li key={idx} className="text-xs text-gray-600 dark:text-gray-300 flex items-start">
                              <div className="w-1 h-1 bg-blue-500 rounded-full mt-1.5 mr-1.5 flex-shrink-0" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="mt-3 flex items-center justify-between">
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          Price: {app.price}
                        </span>
                        <Button size="sm" variant="outline">
                          <Download className="w-3 h-3 mr-1" />
                          Download
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* Safety & Security Tab */}
          {activeTab === 'safety' && safetyData && (
            <motion.div
              key="safety"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              {/* Current Alerts */}
              <div className="bg-red-50 dark:bg-red-900/20 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-red-800 dark:text-red-300 mb-4 flex items-center">
                  <AlertTriangle className="w-5 h-5 mr-2" />
                  Current Safety Alerts
                </h3>
                
                <div className="space-y-4">
                  {safetyData.currentAlerts.map((alert, index) => (
                    <div key={index} className="bg-white dark:bg-gray-700 rounded-lg p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h4 className="font-medium text-gray-900 dark:text-white mb-1">
                            {alert.type}
                          </h4>
                          <p className="text-gray-600 dark:text-gray-300 text-sm">
                            {alert.description}
                          </p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getSafetyColor(alert.level)}`}>
                          {alert.level} Risk
                        </span>
                      </div>
                      
                      <div className="space-y-2">
                        <div>
                          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            Affected Areas:
                          </span>
                          <div className="flex flex-wrap gap-2 mt-1">
                            {alert.areas.map((area, idx) => (
                              <span key={idx} className="px-2 py-1 bg-gray-100 dark:bg-gray-600 text-gray-700 dark:text-gray-300 text-xs rounded">
                                {area}
                              </span>
                            ))}
                          </div>
                        </div>
                        
                        <div>
                          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            Recommendations:
                          </span>
                          <ul className="mt-1 space-y-1">
                            {alert.recommendations.map((rec, idx) => (
                              <li key={idx} className="text-sm text-gray-600 dark:text-gray-300 flex items-start">
                                <div className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2 mr-2 flex-shrink-0" />
                                <span>{rec}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                      
                      <div className="mt-3 text-xs text-gray-500 dark:text-gray-400 flex justify-between">
                        <span>Source: {alert.source}</span>
                        <span>Updated: {new Date(alert.lastUpdated).toLocaleString()}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Neighborhood Safety Map */}
              <div className="bg-white dark:bg-gray-700 rounded-xl p-6 shadow-sm">
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                  <MapPin className="w-5 h-5 mr-2" />
                  Neighborhood Safety Guide
                </h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {safetyData.neighborhoods.map((neighborhood, index) => (
                    <div key={index} className="bg-gray-50 dark:bg-gray-600 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <h5 className="font-medium text-gray-900 dark:text-white">
                          {neighborhood.name}
                        </h5>
                        <div className="flex items-center">
                          <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{
                            backgroundColor: `rgba(${255 - neighborhood.safetyRating * 25}, ${neighborhood.safetyRating * 25}, 0, 0.2)`,
                            color: `rgb(${255 - neighborhood.safetyRating * 25}, ${neighborhood.safetyRating * 25}, 0)`
                          }}>
                            <span className="text-sm font-bold">{neighborhood.safetyRating}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-2 mb-3">
                        <div className="flex flex-col items-center p-2 rounded-lg bg-white dark:bg-gray-700">
                          <span className="text-xs text-gray-500 dark:text-gray-400">Daytime</span>
                          <span className={`text-sm font-medium ${
                            neighborhood.dayTime === 'Safe' 
                              ? 'text-green-600 dark:text-green-400' 
                              : neighborhood.dayTime === 'Caution'
                              ? 'text-yellow-600 dark:text-yellow-400'
                              : 'text-red-600 dark:text-red-400'
                          }`}>
                            {neighborhood.dayTime}
                          </span>
                        </div>
                        <div className="flex flex-col items-center p-2 rounded-lg bg-white dark:bg-gray-700">
                          <span className="text-xs text-gray-500 dark:text-gray-400">Nighttime</span>
                          <span className={`text-sm font-medium ${
                            neighborhood.nightTime === 'Safe' 
                              ? 'text-green-600 dark:text-green-400' 
                              : neighborhood.nightTime === 'Caution'
                              ? 'text-yellow-600 dark:text-yellow-400'
                              : 'text-red-600 dark:text-red-400'
                          }`}>
                            {neighborhood.nightTime}
                          </span>
                        </div>
                      </div>
                      
                      <div className="mb-3">
                        <h6 className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Common Issues:
                        </h6>
                        <ul className="space-y-1">
                          {neighborhood.commonIssues.map((issue, idx) => (
                            <li key={idx} className="text-xs text-gray-600 dark:text-gray-300 flex items-start">
                              <div className="w-1 h-1 bg-red-500 rounded-full mt-1.5 mr-1.5 flex-shrink-0" />
                              {issue}
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="mb-3">
                        <h6 className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Safety Tips:
                        </h6>
                        <ul className="space-y-1">
                          {neighborhood.tips.map((tip, idx) => (
                            <li key={idx} className="text-xs text-gray-600 dark:text-gray-300 flex items-start">
                              <div className="w-1 h-1 bg-green-500 rounded-full mt-1.5 mr-1.5 flex-shrink-0" />
                              {tip}
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div>
                          <span className="font-medium text-gray-700 dark:text-gray-300">Police:</span>
                          <p className="text-gray-600 dark:text-gray-400">{neighborhood.policeStations.join(', ')}</p>
                        </div>
                        <div>
                          <span className="font-medium text-gray-700 dark:text-gray-300">Hospitals:</span>
                          <p className="text-gray-600 dark:text-gray-400">{neighborhood.hospitals.join(', ')}</p>
                        </div>
                      </div>
                      
                      {neighborhood.touristPolice && (
                        <div className="mt-2 text-xs text-green-600 dark:text-green-400">
                          ✓ Tourist Police Available
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Embassy Information */}
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6">
                <h4 className="text-lg font-semibold text-blue-800 dark:text-blue-300 mb-4 flex items-center">
                  <Flag className="w-5 h-5 mr-2" />
                  Embassy/Consulate Information
                </h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white dark:bg-gray-700 rounded-lg p-4">
                    <h5 className="font-medium text-gray-900 dark:text-white mb-3">
                      Main Embassy
                    </h5>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-start">
                        <MapPin className="w-4 h-4 text-gray-400 mt-0.5 mr-2 flex-shrink-0" />
                        <span className="text-gray-600 dark:text-gray-300">{safetyData.embassy.address}</span>
                      </div>
                      <div className="flex items-start">
                        <Phone className="w-4 h-4 text-gray-400 mt-0.5 mr-2 flex-shrink-0" />
                        <span className="text-gray-600 dark:text-gray-300">{safetyData.embassy.phone}</span>
                      </div>
                      <div className="flex items-start">
                        <Mail className="w-4 h-4 text-gray-400 mt-0.5 mr-2 flex-shrink-0" />
                        <span className="text-gray-600 dark:text-gray-300">{safetyData.embassy.email}</span>
                      </div>
                      <div className="flex items-start">
                        <Clock className="w-4 h-4 text-gray-400 mt-0.5 mr-2 flex-shrink-0" />
                        <span className="text-gray-600 dark:text-gray-300">{safetyData.embassy.hours}</span>
                      </div>
                      <div className="flex items-start">
                        <Globe className="w-4 h-4 text-gray-400 mt-0.5 mr-2 flex-shrink-0" />
                        <span className="text-gray-600 dark:text-gray-300">{safetyData.embassy.website}</span>
                      </div>
                      <div className="flex items-start">
                        <Phone className="w-4 h-4 text-red-500 mt-0.5 mr-2 flex-shrink-0" />
                        <span className="text-red-600 dark:text-red-400 font-medium">
                          Emergency: {safetyData.embassy.emergencyNumber}
                        </span>
                      </div>
                    </div>
                    
                    <div className="mt-4">
                      <h6 className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Services:
                      </h6>
                      <div className="flex flex-wrap gap-2">
                        {safetyData.embassy.services.map((service, idx) => (
                          <span key={idx} className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs rounded-full">
                            {service}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h5 className="font-medium text-gray-900 dark:text-white mb-3">
                      Consulates
                    </h5>
                    <div className="space-y-3">
                      {safetyData.embassy.consulates.map((consulate, idx) => (
                        <div key={idx} className="bg-white dark:bg-gray-700 rounded-lg p-3">
                          <h6 className="font-medium text-gray-900 dark:text-white mb-1">
                            {consulate.city}
                          </h6>
                          <div className="text-sm text-gray-600 dark:text-gray-300 mb-1">
                            {consulate.address}
                          </div>
                          <div className="text-sm text-gray-600 dark:text-gray-300">
                            {consulate.phone}
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="mt-4 p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                      <h6 className="text-sm font-medium text-blue-800 dark:text-blue-300 mb-1">
                        Pro Tip:
                      </h6>
                      <p className="text-xs text-blue-700 dark:text-blue-200">
                        Register your trip with your embassy before traveling for emergency notifications and assistance.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Health Information */}
              <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-6">
                <h4 className="text-lg font-semibold text-green-800 dark:text-green-300 mb-4">
                  Health & Medical Information
                </h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h5 className="font-medium text-green-700 dark:text-green-300 mb-3">
                      Recommended Vaccinations:
                    </h5>
                    <div className="space-y-2">
                      {safetyData.healthInfo.vaccinations.map((vaccine, idx) => (
                        <div key={idx} className="flex items-center justify-between p-2 bg-white dark:bg-gray-700 rounded-lg">
                          <span className="text-gray-900 dark:text-white">{vaccine.name}</span>
                          <div className="flex items-center space-x-2">
                            {vaccine.required && (
                              <span className="px-2 py-1 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 text-xs rounded-full">
                                Required
                              </span>
                            )}
                            {vaccine.recommended && (
                              <span className="px-2 py-1 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300 text-xs rounded-full">
                                Recommended
                              </span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <h5 className="font-medium text-green-700 dark:text-green-300 mt-4 mb-3">
                      Common Health Concerns:
                    </h5>
                    <div className="space-y-1">
                      {safetyData.healthInfo.commonIllnesses.map((illness, idx) => (
                        <div key={idx} className="flex items-start space-x-2">
                          <div className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2 flex-shrink-0" />
                          <span className="text-sm text-gray-600 dark:text-gray-300">{illness}</span>
                        </div>
                      ))}
                    </div>
                    
                    <div className="mt-4 p-3 bg-green-100 dark:bg-green-900/30 rounded-lg">
                      <h6 className="text-sm font-medium text-green-800 dark:text-green-300 mb-1">
                        Water Safety:
                      </h6>
                      <p className="text-sm text-green-700 dark:text-green-200">
                        {safetyData.healthInfo.waterSafety}
                      </p>
                    </div>
                  </div>
                  
                  <div>
                    <h5 className="font-medium text-green-700 dark:text-green-300 mb-3">
                      Medical Facilities:
                    </h5>
                    <div className="space-y-3 max-h-60 overflow-y-auto pr-2">
                      {safetyData.healthInfo.medicalFacilities.map((facility, idx) => (
                        <div key={idx} className="bg-white dark:bg-gray-700 rounded-lg p-3">
                          <h6 className="font-medium text-gray-900 dark:text-white mb-1">
                            {facility.name}
                            {facility.englishSpeaking && (
                              <span className="ml-2 text-xs px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full">
                                English Speaking
                              </span>
                            )}
                          </h6>
                          <div className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                            {facility.type}
                          </div>
                          <div className="text-sm text-gray-600 dark:text-gray-300 mb-1">
                            {facility.address}
                          </div>
                          <div className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                            {facility.phone}
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {facility.specialties.slice(0, 3).map((specialty, i) => (
                              <span key={i} className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-xs rounded-full">
                                {specialty}
                              </span>
                            ))}
                            {facility.specialties.length > 3 && (
                              <span className="px-2 py-1 bg-gray-100 dark:bg-gray-600 text-gray-700 dark:text-gray-300 text-xs rounded-full">
                                +{facility.specialties.length - 3} more
                              </span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <h5 className="font-medium text-green-700 dark:text-green-300 mt-4 mb-3">
                      24-Hour Pharmacies:
                    </h5>
                    <div className="space-y-2">
                      {safetyData.healthInfo.pharmacies
                        .filter(pharmacy => pharmacy.hours.includes('24'))
                        .map((pharmacy, idx) => (
                          <div key={idx} className="flex items-start space-x-2">
                            <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                            <div>
                              <span className="text-sm text-gray-900 dark:text-white">{pharmacy.name}</span>
                              <div className="text-xs text-gray-500 dark:text-gray-400">{pharmacy.address}</div>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Common Scams */}
              <div className="bg-red-50 dark:bg-red-900/20 rounded-xl p-6">
                <h4 className="text-lg font-semibold text-red-800 dark:text-red-300 mb-4 flex items-center">
                  <AlertTriangle className="w-5 h-5 mr-2" />
                  Common Scams to Avoid
                </h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {safetyData.scams.map((scam, index) => (
                    <div key={index} className="bg-white dark:bg-gray-700 rounded-lg p-4 border-l-4 border-red-500">
                      <h5 className="font-medium text-gray-900 dark:text-white mb-2">
                        {scam.type}
                      </h5>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                        {scam.description}
                      </p>
                      
                      <div className="mb-3">
                        <h6 className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                          How to Prevent:
                        </h6>
                        <ul className="space-y-1">
                          {scam.prevention.map((tip, idx) => (
                            <li key={idx} className="text-xs text-gray-600 dark:text-gray-300 flex items-start">
                              <div className="w-1 h-1 bg-green-500 rounded-full mt-1.5 mr-1.5 flex-shrink-0" />
                              {tip}
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="mb-2">
                        <h6 className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                          If It Happens:
                        </h6>
                        <p className="text-xs text-gray-600 dark:text-gray-300">
                          {scam.response}
                        </p>
                      </div>
                      
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        Common locations: {scam.commonLocations.join(', ')}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Emergency Contacts Card */}
              <div className="bg-white dark:bg-gray-700 rounded-xl p-6 shadow-sm border-2 border-red-500">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-lg font-semibold text-red-600 dark:text-red-400 flex items-center">
                    <Phone className="w-5 h-5 mr-2" />
                    Emergency Contacts
                  </h4>
                  <Button size="sm" variant="outline">
                    <Download className="w-4 h-4 mr-2" />
                    Save Offline
                  </Button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {safetyData.healthInfo.emergencyNumbers?.slice(0, 4).map((emergency, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                      <span className="text-gray-900 dark:text-white">{emergency.service}</span>
                      <span className="font-bold text-red-600 dark:text-red-400 text-lg">
                        {emergency.number}
                      </span>
                    </div>
                  )) || (
                    <>
                      <div className="flex items-center justify-between p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                        <span className="text-gray-900 dark:text-white">Police</span>
                        <span className="font-bold text-red-600 dark:text-red-400 text-lg">
                          100
                        </span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                        <span className="text-gray-900 dark:text-white">Ambulance</span>
                        <span className="font-bold text-red-600 dark:text-red-400 text-lg">
                          102
                        </span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                        <span className="text-gray-900 dark:text-white">Fire</span>
                        <span className="font-bold text-red-600 dark:text-red-400 text-lg">
                          101
                        </span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                        <span className="text-gray-900 dark:text-white">Tourist Police</span>
                        <span className="font-bold text-red-600 dark:text-red-400 text-lg">
                          1363
                        </span>
                      </div>
                    </>
                  )}
                </div>
                
                <div className="mt-4 p-3 bg-red-100 dark:bg-red-900/30 rounded-lg">
                  <p className="text-sm text-red-700 dark:text-red-300">
                    <strong>In case of emergency:</strong> State your name, location, and nature of emergency clearly. 
                    If possible, have someone who speaks the local language assist you.
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          {/* Accessibility Tab */}
          {activeTab === 'accessibility' && accessibilityInfo && (
            <motion.div
              key="accessibility"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              {/* Transportation Accessibility */}
              <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-indigo-800 dark:text-indigo-300 mb-4 flex items-center">
                  <Navigation className="w-5 h-5 mr-2" />
                  Transportation Accessibility
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium text-indigo-700 dark:text-indigo-300 mb-3">
                      Wheelchair Accessible Options:
                    </h4>
                    <ul className="space-y-2">
                      {accessibilityInfo.transportation.wheelchairAccessible.map((option, idx) => (
                        <li key={idx} className="flex items-start space-x-2">
                          <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-600 dark:text-gray-300">{option}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <h4 className="font-medium text-indigo-700 dark:text-indigo-300 mt-4 mb-3">
                      Accessibility Features:
                    </h4>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="flex items-center space-x-2 p-2 bg-white dark:bg-gray-700 rounded-lg">
                        <div className={`w-4 h-4 rounded-full ${accessibilityInfo.transportation.audioAnnouncements ? 'bg-green-500' : 'bg-red-500'}`} />
                        <span className="text-sm text-gray-600 dark:text-gray-300">Audio Announcements</span>
                      </div>
                      <div className="flex items-center space-x-2 p-2 bg-white dark:bg-gray-700 rounded-lg">
                        <div className={`w-4 h-4 rounded-full ${accessibilityInfo.transportation.visualAids ? 'bg-green-500' : 'bg-red-500'}`} />
                        <span className="text-sm text-gray-600 dark:text-gray-300">Visual Aids</span>
                      </div>
                      <div className="flex items-center space-x-2 p-2 bg-white dark:bg-gray-700 rounded-lg">
                        <div className={`w-4 h-4 rounded-full ${accessibilityInfo.transportation.assistanceAvailable ? 'bg-green-500' : 'bg-red-500'}`} />
                        <span className="text-sm text-gray-600 dark:text-gray-300">Staff Assistance</span>
                      </div>
                      <div className="flex items-center space-x-2 p-2 bg-white dark:bg-gray-700 rounded-lg">
                        <div className={`w-4 h-4 rounded-full ${accessibilityInfo.transportation.tactilePaving ? 'bg-green-500' : 'bg-red-500'}`} />
                        <span className="text-sm text-gray-600 dark:text-gray-300">Tactile Paving</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-indigo-700 dark:text-indigo-300 mb-3">
                      Elevator & Ramp Availability:
                    </h4>
                    <div className="space-y-2">
                      <div className="p-3 bg-white dark:bg-gray-700 rounded-lg">
                        <h5 className="text-sm font-medium text-gray-900 dark:text-white mb-1">
                          Elevators:
                        </h5>
                        <ul className="space-y-1">
                          {accessibilityInfo.transportation.elevators.map((location, idx) => (
                            <li key={idx} className="text-sm text-gray-600 dark:text-gray-300 flex items-start">
                              <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full mt-2 mr-2 flex-shrink-0" />
                              {location}
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="p-3 bg-white dark:bg-gray-700 rounded-lg">
                        <h5 className="text-sm font-medium text-gray-900 dark:text-white mb-1">
                          Ramps:
                        </h5>
                        <ul className="space-y-1">
                          {accessibilityInfo.transportation.ramps.map((location, idx) => (
                            <li key={idx} className="text-sm text-gray-600 dark:text-gray-300 flex items-start">
                              <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full mt-2 mr-2 flex-shrink-0" />
                              {location}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-4 p-3 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg">
                  <h5 className="font-medium text-indigo-800 dark:text-indigo-300 text-sm mb-2">
                    City Accessibility Features:
                  </h5>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h6 className="text-xs font-medium text-indigo-700 dark:text-indigo-300 mb-1">
                        Accessible Routes:
                      </h6>
                      <ul className="space-y-1">
                        {accessibilityInfo.cityFeatures.accessibleRoutes.slice(0, 3).map((route, idx) => (
                          <li key={idx} className="text-xs text-gray-600 dark:text-gray-300 flex items-start">
                            <div className="w-1 h-1 bg-indigo-500 rounded-full mt-1.5 mr-1.5 flex-shrink-0" />
                            {route}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h6 className="text-xs font-medium text-indigo-700 dark:text-indigo-300 mb-1">
                        City Features:
                      </h6>
                      <div className="space-y-1">
                        <div className="flex items-center">
                          <div className={`w-3 h-3 rounded-full ${accessibilityInfo.cityFeatures.audioSignals ? 'bg-green-500' : 'bg-red-500'} mr-2`} />
                          <span className="text-xs text-gray-600 dark:text-gray-300">Audio Signals at Crossings</span>
                        </div>
                        <div className="flex items-center">
                          <div className={`w-3 h-3 rounded-full ${accessibilityInfo.cityFeatures.lowFloorBuses ? 'bg-green-500' : 'bg-red-500'} mr-2`} />
                          <span className="text-xs text-gray-600 dark:text-gray-300">Low-Floor Buses</span>
                        </div>
                        <div className="flex items-center">
                          <div className={`w-3 h-3 rounded-full ${accessibilityInfo.cityFeatures.accessibleTaxis ? 'bg-green-500' : 'bg-red-500'} mr-2`} />
                          <span className="text-xs text-gray-600 dark:text-gray-300">Accessible Taxis Available</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Attraction Accessibility */}
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Attraction Accessibility Guide
                </h4>
                
                <div className="space-y-4">
                  {accessibilityInfo.attractions.map((attraction, index) => (
                    <div key={index} className="bg-white dark:bg-gray-700 rounded-xl p-6 shadow-sm">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h5 className="font-medium text-gray-900 dark:text-white mb-1">
                            {attraction.name}
                          </h5>
                          <div className="flex items-center space-x-2">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getAccessibilityColor(attraction.wheelchairAccess)}`}>
                              {attraction.wheelchairAccess} Wheelchair Access
                            </span>
                            {attraction.accessibleParking && (
                              <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs rounded-full">
                                Accessible Parking
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          {attraction.guideDogs && (
                            <div className="p-1 bg-green-100 dark:bg-green-900/30 rounded-full">
                              <span className="sr-only">Guide Dogs Welcome</span>
                              <Eye className="w-4 h-4 text-green-700 dark:text-green-300" />
                            </div>
                          )}
                          {attraction.brailleInfo && (
                            <div className="p-1 bg-purple-100 dark:bg-purple-900/30 rounded-full">
                              <span className="sr-only">Braille Information</span>
                              <Languages className="w-4 h-4 text-purple-700 dark:text-purple-300" />
                            </div>
                          )}
                          {attraction.signLanguage && (
                            <div className="p-1 bg-blue-100 dark:bg-blue-900/30 rounded-full">
                              <span className="sr-only">Sign Language Tours</span>
                              <MessageCircle className="w-4 h-4 text-blue-700 dark:text-blue-300" />
                            </div>
                          )}
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <h6 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Visual Impairment Accommodations:
                          </h6>
                          <ul className="space-y-1">
                            {attraction.visualImpairment.map((accommodation, idx) => (
                              <li key={idx} className="text-sm text-gray-600 dark:text-gray-300 flex items-start">
                                <div className="w-1.5 h-1.5 bg-purple-500 rounded-full mt-2 mr-2 flex-shrink-0" />
                                {accommodation}
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        <div>
                          <h6 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Hearing Impairment Accommodations:
                          </h6>
                          <ul className="space-y-1">
                            {attraction.hearingImpairment.map((accommodation, idx) => (
                              <li key={idx} className="text-sm text-gray-600 dark:text-gray-300 flex items-start">
                                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 mr-2 flex-shrink-0" />
                                {accommodation}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <h6 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Mobility Assistance:
                          </h6>
                          <ul className="space-y-1">
                            {attraction.mobilityAssistance.map((assistance, idx) => (
                              <li key={idx} className="text-sm text-gray-600 dark:text-gray-300 flex items-start">
                                <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 mr-2 flex-shrink-0" />
                                {assistance}
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        <div>
                          <h6 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Special Services:
                          </h6>
                          <ul className="space-y-1">
                            {attraction.specialServices.map((service, idx) => (
                              <li key={idx} className="text-sm text-gray-600 dark:text-gray-300 flex items-start">
                                <div className="w-1.5 h-1.5 bg-orange-500 rounded-full mt-2 mr-2 flex-shrink-0" />
                                {service}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Accommodation Accessibility */}
              <div className="bg-purple-50 dark:bg-purple-900/20 rounded-xl p-6">
                <h4 className="text-lg font-semibold text-purple-800 dark:text-purple-300 mb-4 flex items-center">
                  <Bed className="w-5 h-5 mr-2" />
                  Accommodation Accessibility
                </h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h5 className="font-medium text-purple-700 dark:text-purple-300 mb-3">
                      Accessible Room Features:
                    </h5>
                    <ul className="space-y-2">
                      {accessibilityInfo.accommodation.accessibleRooms.map((feature, idx) => (
                        <li key={idx} className="flex items-start space-x-2">
                          <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-600 dark:text-gray-300">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h5 className="font-medium text-purple-700 dark:text-purple-300 mb-3">
                      Assistive Devices Available:
                    </h5>
                    <ul className="space-y-2">
                      {accessibilityInfo.accommodation.assistiveDevices.map((device, idx) => (
                        <li key={idx} className="flex items-start space-x-2">
                          <div className="w-1.5 h-1.5 bg-purple-500 rounded-full mt-2 flex-shrink-0" />
                          <span className="text-gray-600 dark:text-gray-300">{device}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-3 bg-white dark:bg-gray-700 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h5 className="font-medium text-gray-900 dark:text-white">
                        Service Animals
                      </h5>
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                        accessibilityInfo.accommodation.serviceAnimals 
                          ? 'bg-green-100 dark:bg-green-900/30' 
                          : 'bg-red-100 dark:bg-red-900/30'
                      }`}>
                        {accessibilityInfo.accommodation.serviceAnimals ? (
                          <Check className="w-4 h-4 text-green-700 dark:text-green-300" />
                        ) : (
                          <X className="w-4 h-4 text-red-700 dark:text-red-300" />
                        )}
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      {accessibilityInfo.accommodation.serviceAnimals 
                        ? 'Service animals are welcome at most accommodations' 
                        : 'Service animals may not be accepted at all locations'}
                    </p>
                  </div>
                  
                  <div className="p-3 bg-white dark:bg-gray-700 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h5 className="font-medium text-gray-900 dark:text-white">
                        Special Diets
                      </h5>
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                        accessibilityInfo.accommodation.specialDiets 
                          ? 'bg-green-100 dark:bg-green-900/30' 
                          : 'bg-red-100 dark:bg-red-900/30'
                      }`}>
                        {accessibilityInfo.accommodation.specialDiets ? (
                          <Check className="w-4 h-4 text-green-700 dark:text-green-300" />
                        ) : (
                          <X className="w-4 h-4 text-red-700 dark:text-red-300" />
                        )}
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      {accessibilityInfo.accommodation.specialDiets 
                        ? 'Special dietary needs can be accommodated with advance notice' 
                        : 'Special dietary accommodations may be limited'}
                    </p>
                  </div>
                  
                  <div className="p-3 bg-white dark:bg-gray-700 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h5 className="font-medium text-gray-900 dark:text-white">
                        Accessible Pools
                      </h5>
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                        accessibilityInfo.accommodation.accessiblePools 
                          ? 'bg-green-100 dark:bg-green-900/30' 
                          : 'bg-red-100 dark:bg-red-900/30'
                      }`}>
                        {accessibilityInfo.accommodation.accessiblePools ? (
                          <Check className="w-4 h-4 text-green-700 dark:text-green-300" />
                        ) : (
                          <X className="w-4 h-4 text-red-700 dark:text-red-300" />
                        )}
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      {accessibilityInfo.accommodation.accessiblePools 
                        ? 'Many hotels offer pool lifts or zero-entry pools' 
                        : 'Accessible pool features may be limited'}
                    </p>
                  </div>
                </div>
                
                <div className="mt-4 p-3 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                  <h5 className="font-medium text-purple-800 dark:text-purple-300 text-sm mb-2">
                    Emergency Procedures:
                  </h5>
                  <ul className="space-y-1">
                    {accessibilityInfo.accommodation.emergencyProcedures.map((procedure, idx) => (
                      <li key={idx} className="text-sm text-purple-700 dark:text-purple-200 flex items-start">
                        <div className="w-1.5 h-1.5 bg-purple-500 rounded-full mt-2 mr-2 flex-shrink-0" />
                        {procedure}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Local Resources */}
              <div className="bg-white dark:bg-gray-700 rounded-xl p-6 shadow-sm">
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                  <Globe className="w-5 h-5 mr-2" />
                  Local Accessibility Resources
                </h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h5 className="font-medium text-gray-900 dark:text-white mb-3">
                      Local Organizations:
                    </h5>
                    <div className="space-y-3">
                      {accessibilityInfo.resources.localOrganizations.map((org, idx) => (
                        <div key={idx} className="p-3 bg-gray-50 dark:bg-gray-600 rounded-lg">
                          <h6 className="font-medium text-gray-900 dark:text-white mb-1">
                            {org.name}
                          </h6>
                          <div className="flex flex-wrap gap-1 mb-2">
                            {org.services.map((service, i) => (
                              <span key={i} className="px-2 py-1 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 text-xs rounded-full">
                                {service}
                              </span>
                            ))}
                          </div>
                          <div className="text-sm text-gray-600 dark:text-gray-300">
                            Contact: {org.contact}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h5 className="font-medium text-gray-900 dark:text-white mb-3">
                      Equipment Rental:
                    </h5>
                    <div className="space-y-3">
                      {accessibilityInfo.resources.equipmentRental.map((rental, idx) => (
                        <div key={idx} className="p-3 bg-gray-50 dark:bg-gray-600 rounded-lg">
                          <h6 className="font-medium text-gray-900 dark:text-white mb-1">
                            {rental.item}
                          </h6>
                          <div className="grid grid-cols-2 gap-2 text-sm">
                            <div>
                              <span className="text-gray-500 dark:text-gray-400">Provider:</span>
                              <div className="text-gray-700 dark:text-gray-300">{rental.provider}</div>
                            </div>
                            <div>
                              <span className="text-gray-500 dark:text-gray-400">Cost:</span>
                              <div className="text-gray-700 dark:text-gray-300">{rental.cost}</div>
                            </div>
                          </div>
                          <div className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                            Booking: {rental.booking}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="mt-6">
                  <h5 className="font-medium text-gray-900 dark:text-white mb-3">
                    Recommended Accessibility Apps:
                  </h5>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {accessibilityInfo.resources.accessibilityApps.map((app, idx) => (
                      <div key={idx} className="flex items-center space-x-2 p-2 bg-gray-50 dark:bg-gray-600 rounded-lg">
                        <Smartphone className="w-4 h-4 text-indigo-500" />
                        <span className="text-sm text-gray-700 dark:text-gray-300">{app}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}