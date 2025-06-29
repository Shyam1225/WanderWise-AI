import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  MapPin, Globe, Compass, Info, X, 
  ChevronRight, ChevronLeft, Camera, 
  Volume2, VolumeX, Maximize, Minimize, 
  Play, Pause, RotateCcw, Loader,
  Map as MapIcon, ArrowLeft, Plane, Bed, Utensils
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import { VirtualTravelExperience } from '../components/virtual/VirtualTravelExperience';

// List of available virtual travel locations
const availableLocations = [
  {
    id: 'delhi',
    name: 'Delhi, India',
    description: 'Experience the vibrant streets and historic monuments of India\'s capital city.',
    image: 'https://images.pexels.com/photos/1007426/pexels-photo-1007426.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=2',
    arrivalInfo: {
      airport: 'Indira Gandhi International Airport (DEL)',
      flightTime: '14-16 hours from US East Coast',
      visa: 'e-Visa available for most nationalities',
      transportation: 'Airport Metro Express or prepaid taxi to city center'
    },
    hotels: [
      { name: 'The Imperial New Delhi', category: 'Luxury', area: 'Connaught Place', price: '$$$' },
      { name: 'Taj Palace', category: 'Luxury', area: 'Diplomatic Enclave', price: '$$$' },
      { name: 'Leela Palace', category: 'Luxury', area: 'Diplomatic Enclave', price: '$$$' },
      { name: 'The Claridges', category: 'Mid-range', area: 'Lutyens Delhi', price: '$$' },
      { name: 'Bloomrooms', category: 'Budget', area: 'New Delhi Railway Station', price: '$' }
    ],
    firstDayPlan: [
      { time: '9:00 AM', activity: 'Arrive at Indira Gandhi International Airport', icon: Plane },
      { time: '10:30 AM', activity: 'Check-in at hotel and freshen up', icon: Bed },
      { time: '1:00 PM', activity: 'Lunch at Karim\'s in Old Delhi for authentic Mughlai cuisine', icon: Utensils },
      { time: '3:00 PM', activity: 'Visit Red Fort to begin your Delhi exploration', icon: MapPin },
      { time: '6:00 PM', activity: 'Evening walk around Connaught Place', icon: MapPin },
      { time: '8:00 PM', activity: 'Dinner at Bukhara for North Indian specialties', icon: Utensils }
    ],
    landmarks: [
      { name: 'Red Fort', description: 'Historic fort built by Mughal Emperor Shah Jahan in the 17th century. This massive red sandstone structure served as the main residence of the emperors of the Mughal dynasty for nearly 200 years. The fort complex houses museums, marble palaces, audience halls, and ornate gardens. The sound and light show in the evening brings the fort\'s history to life.' },
      { name: 'India Gate', description: 'War memorial dedicated to soldiers of British Indian Army who died during the First World War. This 42-meter-high stone arch stands at the center of New Delhi and was designed by Sir Edwin Lutyens. The eternal flame burns beneath the arch to commemorate the Indian soldiers who lost their lives. The surrounding gardens are perfect for an evening stroll among locals.' },
      { name: 'Qutub Minar', description: 'UNESCO World Heritage Site and the tallest brick minaret in the world. This 73-meter tall tower was built in 1193 by Qutab-ud-din Aibak immediately after the defeat of Delhi\'s last Hindu kingdom. The complex includes ancient Hindu and Jain temples with intricate carvings, and the famous Iron Pillar that has resisted corrosion for over 1,600 years.' },
      { name: 'Humayun\'s Tomb', description: 'Tomb of the Mughal Emperor Humayun, built in 1570. This magnificent garden tomb is the first substantial example of Mughal architecture in India and inspired several major architectural innovations, culminating in the construction of the Taj Mahal. The symmetrical gardens, water channels, and the red sandstone and marble building create a serene atmosphere away from Delhi\'s hustle.' }
    ]
  },
  {
    id: 'jaipur',
    name: 'Jaipur, India',
    description: 'Explore the Pink City with its stunning palaces and vibrant markets.',
    image: 'https://images.pexels.com/photos/3581364/pexels-photo-3581364.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=2',
    arrivalInfo: {
      airport: 'Jaipur International Airport (JAI)',
      flightTime: '1 hour from Delhi, 16-18 hours from US with connection',
      visa: 'e-Visa available for most nationalities',
      transportation: 'Prepaid taxi or airport bus to city center'
    },
    hotels: [
      { name: 'Rambagh Palace', category: 'Luxury', area: 'Bhawani Singh Road', price: '$$$' },
      { name: 'Taj Jai Mahal Palace', category: 'Luxury', area: 'Civil Lines', price: '$$$' },
      { name: 'ITC Rajputana', category: 'Luxury', area: 'Palace Road', price: '$$$' },
      { name: 'Jas Vilas', category: 'Mid-range', area: 'Sawai Ram Singh Road', price: '$$' },
      { name: 'Zostel Jaipur', category: 'Budget', area: 'Hathroi Fort', price: '$' }
    ],
    firstDayPlan: [
      { time: '9:00 AM', activity: 'Arrive at Jaipur International Airport', icon: Plane },
      { time: '10:30 AM', activity: 'Check-in at hotel and freshen up', icon: Bed },
      { time: '1:00 PM', activity: 'Lunch at Suvarna Mahal for royal Rajasthani cuisine', icon: Utensils },
      { time: '3:00 PM', activity: 'Visit Hawa Mahal (Palace of Winds)', icon: MapPin },
      { time: '5:00 PM', activity: 'Explore the colorful bazaars of the old city', icon: MapPin },
      { time: '8:00 PM', activity: 'Dinner at Chokhi Dhani for authentic village experience', icon: Utensils }
    ],
    landmarks: [
      { name: 'Hawa Mahal', description: 'Palace of Winds with its unique honeycomb facade featuring 953 small windows. Built in 1799 by Maharaja Sawai Pratap Singh, it allowed royal ladies to observe street festivals while remaining unseen. The five-story palace is constructed of red and pink sandstone, and the intricate latticework keeps the interior cool even in summer. The view of the city from the top floors is spectacular.' },
      { name: 'Amber Fort', description: 'Majestic fort overlooking Maota Lake, built in 1592 by Raja Man Singh I. This extensive palace complex blends Hindu and Rajput elements with its large ramparts, series of gates and cobbled paths. The Sheesh Mahal (Mirror Palace) is a highlight with its intricate mirror work. Visitors can ride elephants up to the fort entrance for an authentic royal experience.' },
      { name: 'City Palace', description: 'Royal residence with museums and gardens in the heart of Jaipur. Built between 1729 and 1732 by Sawai Jai Singh II, it continues to be home to the former royal family. The complex includes the Chandra Mahal, Mubarak Mahal, and various courtyards and buildings. The museum displays royal costumes, weapons, and artwork that showcase Jaipur\'s rich cultural heritage.' },
      { name: 'Jantar Mantar', description: 'UNESCO World Heritage Site with 19 astronomical instruments built by Sawai Jai Singh II. Completed in 1734, it features the world\'s largest stone sundial and can measure time with an accuracy of 2 seconds. The observatory demonstrates the king\'s fascination with astronomy and includes instruments to track stars, predict eclipses, and measure celestial altitudes and azimuths.' }
    ]
  },
  {
    id: 'agra',
    name: 'Agra, India',
    description: 'Visit the city of the Taj Mahal and other Mughal architectural wonders.',
    image: 'https://images.pexels.com/photos/1603650/pexels-photo-1603650.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=2',
    arrivalInfo: {
      airport: 'Agra Airport (AGR) or Delhi International Airport (DEL)',
      flightTime: '3.5 hours by train from Delhi, 16-18 hours from US with connection',
      visa: 'e-Visa available for most nationalities',
      transportation: 'Train from Delhi (Gatimaan Express) or taxi from local airport'
    },
    hotels: [
      { name: 'The Oberoi Amarvilas', category: 'Luxury', area: 'Taj East Gate Road', price: '$$$' },
      { name: 'ITC Mughal', category: 'Luxury', area: 'Fatehabad Road', price: '$$$' },
      { name: 'Taj Hotel & Convention Centre', category: 'Luxury', area: 'Fatehabad Road', price: '$$$' },
      { name: 'Crystal Sarovar Premiere', category: 'Mid-range', area: 'Fatehabad Road', price: '$$' },
      { name: 'Hotel Taj Resorts', category: 'Budget', area: 'Taj Ganj', price: '$' }
    ],
    firstDayPlan: [
      { time: '6:00 AM', activity: 'Depart Delhi on Gatimaan Express train', icon: Plane },
      { time: '8:30 AM', activity: 'Arrive at Agra Cantt Railway Station', icon: MapPin },
      { time: '9:30 AM', activity: 'Check-in at hotel and freshen up', icon: Bed },
      { time: '11:00 AM', activity: 'Visit Taj Mahal (best lighting in morning)', icon: MapPin },
      { time: '2:00 PM', activity: 'Lunch at Peshawri for North Indian cuisine', icon: Utensils },
      { time: '4:00 PM', activity: 'Explore Agra Fort', icon: MapPin },
      { time: '7:00 PM', activity: 'Dinner at Esphahan for Mughlai specialties', icon: Utensils }
    ],
    landmarks: [
      { name: 'Taj Mahal', description: 'UNESCO World Heritage Site and one of the New Seven Wonders of the World. Built by Emperor Shah Jahan between 1631 and 1648 in memory of his wife Mumtaz Mahal, this ivory-white marble mausoleum is a symbol of eternal love. The perfect symmetry, the intricate inlay work, and the beautiful gardens make it one of the most visited monuments in the world. The Taj appears to change color throughout the day, from a soft pink at sunrise to brilliant white at noon and a warm amber at sunset.' },
      { name: 'Agra Fort', description: 'UNESCO World Heritage Site and historical fort that served as the main residence of the emperors of the Mughal Dynasty. Built primarily by Emperor Akbar in 1565, this red sandstone fort was later enhanced with white marble structures by Shah Jahan. The fort complex includes palaces, audience halls, and mosques. From the fort, you can enjoy a distant view of the Taj Mahal, where Shah Jahan was imprisoned by his son and spent his final years gazing at his masterpiece.' },
      { name: 'Fatehpur Sikri', description: 'Ancient city built by Emperor Akbar in 1569 and served as the capital of the Mughal Empire for 14 years. This UNESCO World Heritage site is a remarkable blend of Hindu and Muslim architectural elements. The complex includes the Jama Masjid, Buland Darwaza (the tallest gateway in the world), and the tomb of Sufi saint Salim Chishti. The city was abandoned due to water shortages, leaving behind a perfectly preserved 16th-century Mughal royal complex.' },
      { name: 'Itimad-ud-Daulah', description: 'Tomb known as the "Baby Taj" built between 1622 and 1628 by Nur Jahan for her father. This exquisite marble tomb is considered a draft of the Taj Mahal and represents a transition from red sandstone to white marble. The tomb features delicate marble latticework and pietra dura inlay work with semi-precious stones. Located on the eastern bank of the Yamuna River, it offers a peaceful retreat from the crowds at the more famous monuments.' }
    ]
  },
  {
    id: 'mumbai',
    name: 'Mumbai, India',
    description: 'Discover the bustling metropolis and financial capital of India.',
    image: 'https://images.pexels.com/photos/2409953/pexels-photo-2409953.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=2',
    arrivalInfo: {
      airport: 'Chhatrapati Shivaji Maharaj International Airport (BOM)',
      flightTime: '2 hours from Delhi, 16-18 hours from US',
      visa: 'e-Visa available for most nationalities',
      transportation: 'Prepaid taxi, Uber/Ola, or Airport Express Metro'
    },
    hotels: [
      { name: 'The Taj Mahal Palace', category: 'Luxury', area: 'Colaba', price: '$$$' },
      { name: 'The Oberoi Mumbai', category: 'Luxury', area: 'Nariman Point', price: '$$$' },
      { name: 'Trident Nariman Point', category: 'Luxury', area: 'Nariman Point', price: '$$$' },
      { name: 'Residency Hotel Fort', category: 'Mid-range', area: 'Fort', price: '$$' },
      { name: 'Backpacker Panda Colaba', category: 'Budget', area: 'Colaba', price: '$' }
    ],
    firstDayPlan: [
      { time: '9:00 AM', activity: 'Arrive at Chhatrapati Shivaji Maharaj International Airport', icon: Plane },
      { time: '11:00 AM', activity: 'Check-in at hotel and freshen up', icon: Bed },
      { time: '1:00 PM', activity: 'Lunch at Leopold Cafe, a Mumbai institution', icon: Utensils },
      { time: '3:00 PM', activity: 'Visit Gateway of India and surrounding Colaba area', icon: MapPin },
      { time: '6:00 PM', activity: 'Evening stroll along Marine Drive', icon: MapPin },
      { time: '8:00 PM', activity: 'Dinner at Trishna for famous butter garlic crab', icon: Utensils }
    ],
    landmarks: [
      { name: 'Gateway of India', description: 'Iconic monument overlooking the Arabian Sea, built during the British Raj to commemorate the visit of King George V and Queen Mary in 1911. This basalt arch combines Hindu and Muslim architectural styles. The Gateway has witnessed many historical events, including the departure of the last British troops from India in 1948. Today, it\'s a popular gathering place for locals and tourists alike, and the starting point for boat trips to Elephanta Caves.' },
      { name: 'Marine Drive', description: 'Scenic 3.6-kilometer-long boulevard along the coastline that offers stunning views of the Arabian Sea. Also known as the Queen\'s Necklace due to its curved shape that resembles a string of pearls when viewed at night. This is where Mumbai comes to unwind - joggers in the morning, families in the evening, and couples at night. The promenade is lined with art deco buildings on one side and the vast Arabian Sea on the other.' },
      { name: 'Chhatrapati Shivaji Terminus', description: 'UNESCO World Heritage Site and historic railway station built in 1888. This Victorian Gothic Revival style building designed by British architect F.W. Stevens serves as the headquarters of the Central Railways. The station is a remarkable example of the meeting of two cultures, as British architects worked with Indian craftsmen to include Indian architectural tradition and decorative elements. Despite being a busy railway station, the building is an architectural marvel worth visiting.' },
      { name: 'Elephanta Caves', description: 'Ancient cave temples dedicated to Lord Shiva, located on Elephanta Island. These rock-cut caves dating back to the 5th-8th centuries CE contain large sculptures representing various manifestations of Shiva. The main cave contains a 6-meter high three-headed sculpture representing Shiva as the creator, preserver, and destroyer. The island is reached by an hour-long ferry ride from the Gateway of India, making it a perfect day trip from Mumbai.' }
    ]
  },
  {
    id: 'udaipur',
    name: 'Udaipur, India',
    description: 'Experience the romantic city of lakes and palaces in Rajasthan.',
    image: 'https://images.pexels.com/photos/3522880/pexels-photo-3522880.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=2',
    arrivalInfo: {
      airport: 'Maharana Pratap Airport (UDR)',
      flightTime: '1.5 hours from Delhi, 17-19 hours from US with connection',
      visa: 'e-Visa available for most nationalities',
      transportation: 'Prepaid taxi from airport to city center (30 minutes)'
    },
    hotels: [
      { name: 'Taj Lake Palace', category: 'Luxury', area: 'Lake Pichola', price: '$$$' },
      { name: 'The Oberoi Udaivilas', category: 'Luxury', area: 'Lake Pichola', price: '$$$' },
      { name: 'Leela Palace Udaipur', category: 'Luxury', area: 'Lake Pichola', price: '$$$' },
      { name: 'Madri Haveli', category: 'Mid-range', area: 'Old City', price: '$$' },
      { name: 'Zostel Udaipur', category: 'Budget', area: 'Near Gangaur Ghat', price: '$' }
    ],
    firstDayPlan: [
      { time: '10:00 AM', activity: 'Arrive at Maharana Pratap Airport', icon: Plane },
      { time: '11:30 AM', activity: 'Check-in at hotel and freshen up', icon: Bed },
      { time: '1:30 PM', activity: 'Lunch at Ambrai for lakeside dining with palace views', icon: Utensils },
      { time: '3:30 PM', activity: 'Visit City Palace complex', icon: MapPin },
      { time: '6:00 PM', activity: 'Sunset boat ride on Lake Pichola', icon: MapPin },
      { time: '8:00 PM', activity: 'Dinner at Tribute Restaurant for Rajasthani cuisine', icon: Utensils }
    ],
    landmarks: [
      { name: 'City Palace', description: 'Majestic palace complex on the banks of Lake Pichola built over a period of nearly 400 years. Started by Maharana Udai Singh II in 1553, this architectural marvel is a fusion of Rajasthani and Mughal styles. The palace complex consists of 11 smaller palaces, courtyards, pavilions, and gardens. The museum inside displays royal artifacts, while the views of the lake and the city from the palace towers are breathtaking. The intricate mirrorwork, inlays, and colorful glass windows showcase the artistic heritage of Mewar.' },
      { name: 'Lake Pichola', description: 'Artificial freshwater lake created in 1362 AD by a local tribesman. This picturesque lake is surrounded by hills, palaces, temples, and bathing ghats, offering stunning views especially at sunset. A boat ride on Lake Pichola is a must-do activity, providing unique perspectives of the City Palace, Lake Palace, and Jag Mandir. The lake has inspired countless artists, photographers, and filmmakers, including scenes from the James Bond film "Octopussy" which was filmed here.' },
      { name: 'Jag Mandir', description: 'Palace built on an island in Lake Pichola by Maharana Karan Singh in 1620. This three-storied palace features a row of marble elephants and a beautiful garden courtyard. The palace served as a refuge for Prince Khurram (later Emperor Shah Jahan) when he rebelled against his father. Some historians believe that Shah Jahan\'s stay here inspired certain elements of the Taj Mahal. Today, the palace houses a restaurant and is accessible by boat from the City Palace.' },
      { name: 'Sajjangarh Palace', description: 'Monsoon Palace offering panoramic views of the city, built by Maharana Sajjan Singh in 1884. Perched on Bansdara hill, this white marble palace was originally constructed to watch monsoon clouds. The palace was also used as a hunting lodge by the royal family. The journey to the palace through the Sajjangarh Wildlife Sanctuary adds to the experience. The sunset views from here are particularly spectacular, with the city, lakes, and surrounding Aravalli hills bathed in golden light.' }
    ]
  },
  {
    id: 'tokyo',
    name: 'Tokyo, Japan',
    description: 'Explore the ultramodern metropolis with traditional temples and gardens.',
    image: 'https://images.pexels.com/photos/2506923/pexels-photo-2506923.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=2',
    arrivalInfo: {
      airport: 'Narita International Airport (NRT) or Haneda Airport (HND)',
      flightTime: '14-16 hours from US, 7-8 hours from India',
      visa: 'Required for most nationalities, visa waiver for some countries',
      transportation: 'Narita Express train, Airport Limousine Bus, or taxi'
    },
    hotels: [
      { name: 'Park Hyatt Tokyo', category: 'Luxury', area: 'Shinjuku', price: '$$$' },
      { name: 'The Ritz-Carlton Tokyo', category: 'Luxury', area: 'Roppongi', price: '$$$' },
      { name: 'Cerulean Tower Tokyu Hotel', category: 'Luxury', area: 'Shibuya', price: '$$$' },
      { name: 'Citadines Central Shinjuku Tokyo', category: 'Mid-range', area: 'Shinjuku', price: '$$' },
      { name: 'UNPLAN Kagurazaka', category: 'Budget', area: 'Shinjuku', price: '$' }
    ],
    firstDayPlan: [
      { time: '2:00 PM', activity: 'Arrive at Narita International Airport', icon: Plane },
      { time: '4:00 PM', activity: 'Check-in at hotel and freshen up', icon: Bed },
      { time: '6:00 PM', activity: 'Evening visit to Shibuya Crossing and surrounding area', icon: MapPin },
      { time: '8:00 PM', activity: 'Dinner at an izakaya (Japanese pub) for authentic experience', icon: Utensils },
      { time: '10:00 PM', activity: 'Night views from Tokyo Metropolitan Government Building observatory', icon: MapPin }
    ],
    landmarks: [
      { name: 'Tokyo Tower', description: 'Communications and observation tower inspired by the Eiffel Tower, standing at 333 meters tall. Built in 1958, it offers panoramic views of the city and serves as a symbol of Japan\'s post-war rebirth. The main observatory at 150 meters and the special observatory at 250 meters provide spectacular views of Tokyo and, on clear days, Mount Fuji. The tower is beautifully illuminated at night, changing colors for special occasions and seasons. The foot town at the base houses museums, restaurants, and shops.' },
      { name: 'Shibuya Crossing', description: 'Famous scramble crossing and shopping district where up to 3,000 people cross at once. This iconic intersection surrounded by giant video screens and neon lights has become a symbol of modern Tokyo. When the traffic lights turn red, pedestrians surge into the intersection from all directions, creating a thrilling spectacle. The area around the crossing is a major shopping and entertainment district, home to department stores, fashion boutiques, and the famous Hachiko statue, a popular meeting point.' },
      { name: 'Senso-ji Temple', description: 'Ancient Buddhist temple in Asakusa, completed in 645 AD. Tokyo\'s oldest temple features a massive paper lantern at the Kaminarimon Gate and a shopping street called Nakamise-dori leading to the main hall. The temple is dedicated to Kannon, the goddess of mercy. Visitors typically follow the tradition of wafting incense smoke over themselves for healing and purification before approaching the main hall. The five-story pagoda and the Asakusa Shrine within the complex are also significant attractions.' },
      { name: 'Meiji Shrine', description: 'Shinto shrine dedicated to Emperor Meiji and Empress Shoken, completed in 1920. Set in a 170-acre forest in the heart of Tokyo, this serene shrine complex features massive torii gates and beautiful gardens. The Meiji Emperor is credited with opening Japan to the West and modernizing the country. The surrounding forest, consisting of 120,000 trees donated from all over Japan, creates a peaceful oasis in the bustling city. The Inner Garden features seasonal flowers and a well-known iris garden that blooms in June.' }
    ]
  }
];

export function VirtualTravel() {
  const { location } = useParams();
  const [selectedLocation, setSelectedLocation] = useState<any>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [currentLandmark, setCurrentLandmark] = useState(0);
  const [showInfo, setShowInfo] = useState(true);
  const [viewMode, setViewMode] = useState<'street' | 'map'>('street');
  const [showArrivalInfo, setShowArrivalInfo] = useState(true);
  
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Find the selected location based on the URL parameter
    if (location) {
      const foundLocation = availableLocations.find(loc => loc.id === location);
      if (foundLocation) {
        setSelectedLocation(foundLocation);
      }
    }
    
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    
    return () => clearTimeout(timer);
  }, [location]);

  useEffect(() => {
    // Add fullscreen change event listener
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen().catch(err => {
        console.error(`Error attempting to enable fullscreen: ${err.message}`);
      });
    } else {
      document.exitFullscreen();
    }
  };

  const handleNextLandmark = () => {
    if (selectedLocation) {
      setCurrentLandmark((prev) => 
        prev === selectedLocation.landmarks.length - 1 ? 0 : prev + 1
      );
    }
  };

  const handlePrevLandmark = () => {
    if (selectedLocation) {
      setCurrentLandmark((prev) => 
        prev === 0 ? selectedLocation.landmarks.length - 1 : prev - 1
      );
    }
  };

  const toggleViewMode = () => {
    setViewMode(prev => prev === 'street' ? 'map' : 'street');
  };

  // If no location is selected, show the location selection screen
  if (!selectedLocation) {
    return (
      <div className="min-h-screen pt-16 bg-white dark:bg-gray-900">
        {/* Hero Section */}
        <section className="py-24 bg-gradient-to-r from-primary-50 to-secondary-50 dark:from-gray-800 dark:to-gray-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <h1 className="text-4xl sm:text-5xl font-display font-bold text-gray-900 dark:text-white mb-6">
                Virtual Travel Experience
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
                Explore destinations around the world in immersive 360° views before planning your actual trip.
                Walk through famous landmarks, experience local streets, and get a feel for your next adventure.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Location Selection */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-8 text-center">
              Choose a Destination to Explore
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {availableLocations.map((loc, index) => (
                <motion.div
                  key={loc.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="group"
                >
                  <Link to={`/virtual-travel/${loc.id}`}>
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 group-hover:-translate-y-2 overflow-hidden">
                      <div className="relative">
                        <img
                          src={loc.image}
                          alt={loc.name}
                          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute top-4 right-4 bg-primary-500 text-white text-xs font-medium px-2 py-1 rounded-full">
                          Virtual Tour
                        </div>
                      </div>
                      
                      <div className="p-6">
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                          {loc.name}
                        </h3>
                        
                        <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                          {loc.description}
                        </p>
                        
                        <div className="flex flex-wrap gap-2 mb-4">
                          {loc.landmarks.slice(0, 2).map((landmark, idx) => (
                            <span
                              key={idx}
                              className="px-2 py-1 bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 text-xs rounded-full"
                            >
                              {landmark.name}
                            </span>
                          ))}
                          {loc.landmarks.length > 2 && (
                            <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs rounded-full">
                              +{loc.landmarks.length - 2} more
                            </span>
                          )}
                        </div>
                        
                        <Button className="w-full bg-blue-600 hover:bg-blue-700" size="sm">
                          Start Virtual Tour
                        </Button>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-gray-50 dark:bg-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-8 text-center">
              Experience Travel Like Never Before
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: 'Immersive 360° Views',
                  description: 'Explore real streets and landmarks with panoramic street view technology.',
                  icon: Globe
                },
                {
                  title: 'Cultural Insights',
                  description: 'Learn about local customs, history, and interesting facts as you explore.',
                  icon: Info
                },
                {
                  title: 'Plan Better Trips',
                  description: 'Get a feel for destinations before you visit, helping you make informed travel decisions.',
                  icon: Compass
                }
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                  className="bg-white dark:bg-gray-700 rounded-2xl p-6 shadow-lg"
                >
                  <div className="w-12 h-12 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-xl flex items-center justify-center mb-4">
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-16 bg-black">
      {/* Virtual Experience Container */}
      <div 
        ref={containerRef}
        className="relative w-full h-[calc(100vh-4rem)]"
      >
        {/* Loading Overlay */}
        {isLoading && (
          <div className="absolute inset-0 z-50 flex items-center justify-center bg-black">
            <div className="text-center">
              <Loader className="w-12 h-12 text-primary-500 animate-spin mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">
                Loading {selectedLocation.name}
              </h3>
              <p className="text-gray-400">
                Preparing your virtual experience...
              </p>
            </div>
          </div>
        )}

        {/* Arrival Information Overlay */}
        {showArrivalInfo && !isLoading && (
          <div className="absolute inset-0 z-40 bg-black/80 flex items-center justify-center">
            <div className="max-w-3xl w-full bg-white dark:bg-gray-800 rounded-2xl p-8 mx-4">
              <div className="flex justify-between items-start mb-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Welcome to {selectedLocation.name}
                </h2>
                <button 
                  onClick={() => setShowArrivalInfo(false)}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                    <Plane className="w-5 h-5 mr-2 text-blue-500" />
                    Arrival Information
                  </h3>
                  
                  <div className="space-y-3 text-gray-600 dark:text-gray-300">
                    <p><strong>Airport:</strong> {selectedLocation.arrivalInfo.airport}</p>
                    <p><strong>Flight Time:</strong> {selectedLocation.arrivalInfo.flightTime}</p>
                    <p><strong>Visa:</strong> {selectedLocation.arrivalInfo.visa}</p>
                    <p><strong>Transportation:</strong> {selectedLocation.arrivalInfo.transportation}</p>
                  </div>
                  
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mt-6 mb-4 flex items-center">
                    <Bed className="w-5 h-5 mr-2 text-blue-500" />
                    Recommended Hotels
                  </h3>
                  
                  <div className="space-y-2">
                    {selectedLocation.hotels.slice(0, 3).map((hotel, index) => (
                      <div key={index} className="flex justify-between">
                        <span>{hotel.name}</span>
                        <span className="text-gray-500 dark:text-gray-400">{hotel.price}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    First Day Itinerary
                  </h3>
                  
                  <div className="relative pl-8 border-l-2 border-blue-500 space-y-6">
                    {selectedLocation.firstDayPlan.map((item, index) => (
                      <div key={index} className="relative">
                        <div className="absolute -left-[41px] bg-blue-500 p-2 rounded-full">
                          <item.icon className="w-4 h-4 text-white" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-blue-600 dark:text-blue-400">{item.time}</p>
                          <p className="text-gray-700 dark:text-gray-300">{item.activity}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="mt-8 text-center">
                <Button 
                  onClick={() => setShowArrivalInfo(false)}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  Start Exploring {selectedLocation.name}
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Street View Experience */}
        <VirtualTravelExperience 
          location={selectedLocation} 
          currentLandmark={currentLandmark}
          isPaused={isPaused}
          isMuted={isMuted}
        />

        {/* Controls Overlay */}
        <div className={`absolute inset-0 pointer-events-none ${showInfo ? 'bg-black/30' : ''}`}>
          {/* Top Bar */}
          <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-center pointer-events-auto">
            <Link to="/virtual-travel" className="flex items-center space-x-2 text-white bg-black/50 backdrop-blur-sm px-4 py-2 rounded-lg">
              <X className="w-5 h-5" />
              <span>Exit Tour</span>
            </Link>
            
            <div className="text-white bg-black/50 backdrop-blur-sm px-4 py-2 rounded-lg">
              <h2 className="font-semibold">{selectedLocation.name}</h2>
            </div>
            
            <div className="flex space-x-2">
              <button 
                onClick={toggleViewMode}
                className="text-white bg-black/50 backdrop-blur-sm px-4 py-2 rounded-lg"
              >
                {viewMode === 'street' ? <MapIcon className="w-5 h-5" /> : <Camera className="w-5 h-5" />}
              </button>
              
              <button 
                onClick={() => setShowInfo(!showInfo)}
                className="text-white bg-black/50 backdrop-blur-sm px-4 py-2 rounded-lg"
              >
                {showInfo ? 'Hide Info' : 'Show Info'}
              </button>
            </div>
          </div>

          {/* Info Panel */}
          {showInfo && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute left-4 top-20 bottom-20 w-80 bg-black/70 backdrop-blur-sm rounded-xl p-6 pointer-events-auto overflow-y-auto"
            >
              <h3 className="text-xl font-semibold text-white mb-4">
                {selectedLocation.landmarks[currentLandmark].name}
              </h3>
              
              <p className="text-gray-200 mb-6">
                {selectedLocation.landmarks[currentLandmark].description}
              </p>
              
              <div className="space-y-4">
                <h4 className="font-medium text-white">Landmarks in {selectedLocation.name}</h4>
                <div className="space-y-2">
                  {selectedLocation.landmarks.map((landmark, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentLandmark(index)}
                      className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                        currentLandmark === index
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50'
                      }`}
                    >
                      {landmark.name}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="mt-8">
                <Link to={`/destinations/${selectedLocation.id}`}>
                  <Button className="w-full bg-blue-600 hover:bg-blue-700">
                    Plan Real Trip to {selectedLocation.name.split(',')[0]}
                  </Button>
                </Link>
              </div>
            </motion.div>
          )}

          {/* Bottom Controls */}
          <div className="absolute bottom-0 left-0 right-0 p-4 flex justify-between items-center pointer-events-auto">
            <div className="flex space-x-4">
              <button 
                onClick={() => setIsMuted(!isMuted)}
                className="text-white bg-black/50 hover:bg-black/70 backdrop-blur-sm p-3 rounded-full transition-colors"
              >
                {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
              </button>
              
              <button 
                onClick={() => setIsPaused(!isPaused)}
                className="text-white bg-black/50 hover:bg-black/70 backdrop-blur-sm p-3 rounded-full transition-colors"
              >
                {isPaused ? <Play className="w-5 h-5" /> : <Pause className="w-5 h-5" />}
              </button>
              
              <button 
                onClick={() => setCurrentLandmark(0)}
                className="text-white bg-black/50 hover:bg-black/70 backdrop-blur-sm p-3 rounded-full transition-colors"
              >
                <RotateCcw className="w-5 h-5" />
              </button>
            </div>
            
            <div className="flex space-x-4">
              <button 
                onClick={handlePrevLandmark}
                className="text-white bg-black/50 hover:bg-black/70 backdrop-blur-sm p-3 rounded-full transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              
              <button 
                onClick={handleNextLandmark}
                className="text-white bg-black/50 hover:bg-black/70 backdrop-blur-sm p-3 rounded-full transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
              
              <button 
                onClick={toggleFullscreen}
                className="text-white bg-black/50 hover:bg-black/70 backdrop-blur-sm p-3 rounded-full transition-colors"
              >
                {isFullscreen ? <Minimize className="w-5 h-5" /> : <Maximize className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}