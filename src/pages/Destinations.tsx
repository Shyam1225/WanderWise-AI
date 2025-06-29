import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Star, Clock, Users, Camera, Mountain, Utensils, Building, Search, Filter } from 'lucide-react';
import { Button } from '../components/ui/Button';

export function Destinations() {
  const { slug } = useParams();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRegion, setSelectedRegion] = useState(slug || 'all');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const regions = [
    { id: 'all', name: 'All Destinations' },
    { id: 'europe', name: 'Europe' },
    { id: 'asia', name: 'Asia' },
    { id: 'americas', name: 'Americas' },
    { id: 'africa', name: 'Africa' },
    { id: 'oceania', name: 'Oceania' },
  ];

  const categories = [
    { id: 'all', name: 'All Categories', icon: MapPin },
    { id: 'adventure', name: 'Adventure', icon: Mountain },
    { id: 'culture', name: 'Culture', icon: Building },
    { id: 'food', name: 'Food & Drink', icon: Utensils },
    { id: 'photography', name: 'Photography', icon: Camera },
  ];

  const destinations = [
    {
      id: 1,
      name: 'Paris, France',
      region: 'europe',
      category: 'culture',
      image: 'https://images.pexels.com/photos/338515/pexels-photo-338515.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=2',
      rating: 4.8,
      reviews: 2847,
      duration: '3-5 days',
      highlights: ['Eiffel Tower', 'Louvre Museum', 'Seine River', 'Montmartre'],
      description: 'The City of Light offers unparalleled romance, world-class museums, and exquisite cuisine.',
      bestTime: 'April-June, September-October',
      budget: '$150-300/day',
      slug: 'paris-france'
    },
    {
      id: 2,
      name: 'Tokyo, Japan',
      region: 'asia',
      category: 'culture',
      image: 'https://images.pexels.com/photos/2506923/pexels-photo-2506923.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=2',
      rating: 4.9,
      reviews: 3241,
      duration: '5-7 days',
      highlights: ['Shibuya Crossing', 'Senso-ji Temple', 'Tsukiji Market', 'Mount Fuji'],
      description: 'A fascinating blend of ultra-modern technology and ancient traditions.',
      bestTime: 'March-May, September-November',
      budget: '$120-250/day',
      slug: 'tokyo-japan'
    },
    {
      id: 3,
      name: 'Bali, Indonesia',
      region: 'asia',
      category: 'adventure',
      image: 'https://images.pexels.com/photos/2474690/pexels-photo-2474690.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=2',
      rating: 4.7,
      reviews: 1923,
      duration: '7-10 days',
      highlights: ['Ubud Rice Terraces', 'Tanah Lot Temple', 'Mount Batur', 'Seminyak Beach'],
      description: 'Tropical paradise with stunning beaches, ancient temples, and vibrant culture.',
      bestTime: 'April-October',
      budget: '$50-150/day',
      slug: 'bali-indonesia'
    },
    {
      id: 4,
      name: 'New York City, USA',
      region: 'americas',
      category: 'culture',
      image: 'https://images.pexels.com/photos/466685/pexels-photo-466685.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=2',
      rating: 4.6,
      reviews: 4156,
      duration: '4-6 days',
      highlights: ['Central Park', 'Times Square', 'Statue of Liberty', 'Brooklyn Bridge'],
      description: 'The city that never sleeps, offering world-class entertainment and dining.',
      bestTime: 'April-June, September-November',
      budget: '$200-400/day',
      slug: 'new-york-usa'
    },
    {
      id: 5,
      name: 'Santorini, Greece',
      region: 'europe',
      category: 'photography',
      image: 'https://images.pexels.com/photos/1285625/pexels-photo-1285625.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=2',
      rating: 4.8,
      reviews: 2134,
      duration: '3-5 days',
      highlights: ['Oia Sunset', 'Red Beach', 'Fira Town', 'Wine Tasting'],
      description: 'Iconic Greek island with stunning sunsets and white-washed buildings.',
      bestTime: 'April-October',
      budget: '$100-250/day',
      slug: 'santorini-greece'
    },
    {
      id: 6,
      name: 'Cape Town, South Africa',
      region: 'africa',
      category: 'adventure',
      image: 'https://images.pexels.com/photos/259447/pexels-photo-259447.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=2',
      rating: 4.7,
      reviews: 1567,
      duration: '5-7 days',
      highlights: ['Table Mountain', 'Cape Point', 'Robben Island', 'Wine Lands'],
      description: 'Stunning landscapes, rich history, and world-renowned wine regions.',
      bestTime: 'November-March',
      budget: '$80-180/day',
      slug: 'cape-town-south-africa'
    },
  ];

  // If slug is provided, show the specific destination
  if (slug) {
    const destination = destinations.find(d => d.slug === slug);
    
    if (!destination) {
      return (
        <div className="min-h-screen pt-16 bg-white dark:bg-gray-900 flex items-center justify-center">
          <div className="text-center">
            <MapPin className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Destination not found
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              The destination you're looking for doesn't exist or has been moved.
            </p>
            <Link to="/destinations">
              <Button>
                Browse All Destinations
              </Button>
            </Link>
          </div>
        </div>
      );
    }
    
    return (
      <div className="min-h-screen pt-16 bg-white dark:bg-gray-900">
        {/* Destination Header */}
        <section className="py-16 bg-gradient-to-r from-primary-50 to-secondary-50 dark:from-gray-800 dark:to-gray-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Link to="/destinations" className="inline-flex items-center text-primary-600 dark:text-primary-400 mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
              Back to All Destinations
            </Link>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center"
            >
              <div>
                <span className="px-3 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 text-sm font-medium rounded-full">
                  {regions.find(r => r.id === destination.region)?.name}
                </span>
                
                <h1 className="text-3xl sm:text-4xl font-display font-bold text-gray-900 dark:text-white mt-4 mb-4">
                  {destination.name}
                </h1>
                
                <div className="flex items-center space-x-4 text-gray-600 dark:text-gray-300 mb-6">
                  <div className="flex items-center">
                    <Star className="w-5 h-5 text-yellow-500 fill-current mr-1" />
                    <span>{destination.rating} ({destination.reviews} reviews)</span>
                  </div>
                  
                  <div className="flex items-center">
                    <Clock className="w-5 h-5 mr-1" />
                    <span>{destination.duration}</span>
                  </div>
                </div>
                
                <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                  {destination.description}
                </p>
              </div>
              
              <div className="rounded-2xl overflow-hidden shadow-xl">
                <img
                  src={destination.image}
                  alt={destination.name}
                  className="w-full h-80 object-cover"
                />
              </div>
            </motion.div>
          </div>
        </section>
        
        {/* Destination Details */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 mb-8">
                  <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
                    Highlights
                  </h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {destination.highlights.map((highlight, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <div className="w-8 h-8 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center text-primary-600 dark:text-primary-400">
                          {index + 1}
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900 dark:text-white">
                            {highlight}
                          </h3>
                          <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
                  <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
                    About {destination.name}
                  </h2>
                  
                  <div className="prose prose-lg max-w-none dark:prose-invert">
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl.
                    </p>
                    
                    <p>
                      Nullam quis risus eget urna mollis ornare vel eu leo. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nullam id dolor id nibh ultricies vehicula ut id elit.
                    </p>
                    
                    <h3>Local Culture</h3>
                    <p>
                      Cras mattis consectetur purus sit amet fermentum. Donec ullamcorper nulla non metus auctor fringilla. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus.
                    </p>
                    
                    <h3>Getting Around</h3>
                    <p>
                      Aenean lacinia bibendum nulla sed consectetur. Etiam porta sem malesuada magna mollis euismod. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-8">
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Quick Facts
                  </h3>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-300">Best Time to Visit</span>
                      <span className="font-medium text-gray-900 dark:text-white">{destination.bestTime}</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-300">Budget Range</span>
                      <span className="font-medium text-gray-900 dark:text-white">{destination.budget}</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-300">Language</span>
                      <span className="font-medium text-gray-900 dark:text-white">Local Language</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-300">Currency</span>
                      <span className="font-medium text-gray-900 dark:text-white">Local Currency</span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Plan Your Trip
                  </h3>
                  
                  <Link to="/trip-planner">
                    <Button className="w-full mb-4">
                      Create Itinerary
                    </Button>
                  </Link>
                  
                  <Link to={`/travel-guides?destination=${destination.name}`}>
                    <Button variant="outline" className="w-full">
                      View Travel Guides
                    </Button>
                  </Link>
                </div>
                
                <div className="bg-gradient-to-r from-primary-500 to-secondary-500 rounded-2xl p-6 text-white">
                  <h3 className="text-lg font-semibold mb-4">
                    Need Help?
                  </h3>
                  <p className="text-white/90 mb-4">
                    Our AI travel assistant can help you plan the perfect trip to {destination.name}.
                  </p>
                  <Link to="/contact">
                    <Button variant="secondary" className="w-full bg-white text-primary-600 hover:bg-gray-50">
                      Get Assistance
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  const filteredDestinations = destinations.filter(destination => {
    const matchesSearch = destination.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         destination.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRegion = selectedRegion === 'all' || destination.region === selectedRegion;
    const matchesCategory = selectedCategory === 'all' || destination.category === selectedCategory;
    
    return matchesSearch && matchesRegion && matchesCategory;
  });

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
              Discover Amazing Destinations
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Explore handpicked destinations around the world, each with unique experiences 
              and cultural treasures waiting to be discovered.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search destinations..."
                  className="w-full pl-10 pr-4 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 text-gray-900 dark:text-white"
                />
              </div>
            </div>

            {/* Region Filter */}
            <div className="lg:w-48">
              <select
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value)}
                className="w-full px-4 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 text-gray-900 dark:text-white"
              >
                {regions.map(region => (
                  <option key={region.id} value={region.id}>
                    {region.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Category Filter */}
            <div className="lg:w-48">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 text-gray-900 dark:text-white"
              >
                {categories.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Destinations Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredDestinations.map((destination, index) => (
              <motion.div
                key={destination.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group cursor-pointer"
              >
                <Link to={`/destinations/${destination.slug}`}>
                  <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 group-hover:-translate-y-2 overflow-hidden">
                    <div className="relative">
                      <img
                        src={destination.image}
                        alt={destination.name}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-4 right-4 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center space-x-1">
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        <span className="text-sm font-medium text-gray-900 dark:text-white">
                          {destination.rating}
                        </span>
                      </div>
                    </div>
                    
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                          {destination.name}
                        </h3>
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          {destination.reviews} reviews
                        </span>
                      </div>
                      
                      <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">
                        {destination.description}
                      </p>
                      
                      <div className="space-y-3 mb-4">
                        <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                          <Clock className="w-4 h-4 mr-2" />
                          <span>{destination.duration}</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                          <Users className="w-4 h-4 mr-2" />
                          <span>{destination.budget}</span>
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap gap-2 mb-4">
                        {destination.highlights.slice(0, 3).map((highlight, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-1 bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 text-xs rounded-full"
                          >
                            {highlight}
                          </span>
                        ))}
                        {destination.highlights.length > 3 && (
                          <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs rounded-full">
                            +{destination.highlights.length - 3} more
                          </span>
                        )}
                      </div>
                      
                      <Button className="w-full" size="sm">
                        Plan Trip to {destination.name.split(',')[0]}
                      </Button>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
          
          {filteredDestinations.length === 0 && (
            <div className="text-center py-16">
              <MapPin className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                No destinations found
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Try adjusting your search criteria or browse all destinations.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}