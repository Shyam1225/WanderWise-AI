import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, MapPin, Calendar, Clock, Star, ChevronDown, ChevronUp, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';

export function TravelGuides() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedRegion, setSelectedRegion] = useState('all');
  const [showFilters, setShowFilters] = useState(false);

  const categories = [
    { id: 'all', name: 'All Categories' },
    { id: 'culture', name: 'Culture & History' },
    { id: 'adventure', name: 'Adventure & Outdoors' },
    { id: 'food', name: 'Food & Cuisine' },
    { id: 'budget', name: 'Budget Travel' },
    { id: 'luxury', name: 'Luxury Travel' },
  ];

  const regions = [
    { id: 'all', name: 'All Regions' },
    { id: 'asia', name: 'Asia' },
    { id: 'europe', name: 'Europe' },
    { id: 'americas', name: 'Americas' },
    { id: 'africa', name: 'Africa' },
    { id: 'oceania', name: 'Oceania' },
  ];

  const guides = [
    {
      id: 1,
      title: 'The Ultimate Guide to Tokyo',
      excerpt: 'Discover the perfect blend of tradition and innovation in Japan\'s vibrant capital.',
      image: 'https://images.pexels.com/photos/2506923/pexels-photo-2506923.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=2',
      author: 'Sarah Chen',
      date: '2024-01-15',
      readTime: '12 min read',
      category: 'culture',
      region: 'asia',
      rating: 4.8,
      slug: 'ultimate-guide-tokyo'
    },
    {
      id: 2,
      title: 'Hidden Gems of Paris',
      excerpt: 'Look beyond the Eiffel Tower and discover the secret spots that locals love.',
      image: 'https://images.pexels.com/photos/338515/pexels-photo-338515.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=2',
      author: 'Marcus Thompson',
      date: '2024-01-10',
      readTime: '10 min read',
      category: 'culture',
      region: 'europe',
      rating: 4.7,
      slug: 'hidden-gems-paris'
    },
    {
      id: 3,
      title: 'Trekking the Inca Trail',
      excerpt: 'A comprehensive guide to preparing for and experiencing this iconic Peruvian adventure.',
      image: 'https://images.pexels.com/photos/2356045/pexels-photo-2356045.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=2',
      author: 'Elena Kowalski',
      date: '2024-01-05',
      readTime: '15 min read',
      category: 'adventure',
      region: 'americas',
      rating: 4.9,
      slug: 'trekking-inca-trail'
    },
    {
      id: 4,
      title: 'Street Food Safari: Bangkok',
      excerpt: 'Navigate the vibrant street food scene of Thailand\'s capital like a local foodie.',
      image: 'https://images.pexels.com/photos/2474690/pexels-photo-2474690.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=2',
      author: 'Carlos Mendoza',
      date: '2023-12-28',
      readTime: '8 min read',
      category: 'food',
      region: 'asia',
      rating: 4.6,
      slug: 'street-food-bangkok'
    },
    {
      id: 5,
      title: 'Budget Travel in Europe',
      excerpt: 'How to experience the best of Europe without breaking the bank.',
      image: 'https://images.pexels.com/photos/1285625/pexels-photo-1285625.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=2',
      author: 'Alex Thompson',
      date: '2023-12-20',
      readTime: '14 min read',
      category: 'budget',
      region: 'europe',
      rating: 4.5,
      slug: 'budget-travel-europe'
    },
    {
      id: 6,
      title: 'Luxury Safari in Tanzania',
      excerpt: 'Experience the ultimate wildlife adventure with premium accommodations and services.',
      image: 'https://images.pexels.com/photos/259447/pexels-photo-259447.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=2',
      author: 'Dr. Lisa Park',
      date: '2023-12-15',
      readTime: '11 min read',
      category: 'luxury',
      region: 'africa',
      rating: 4.9,
      slug: 'luxury-safari-tanzania'
    },
  ];

  const filteredGuides = guides.filter(guide => {
    const matchesSearch = guide.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         guide.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || guide.category === selectedCategory;
    const matchesRegion = selectedRegion === 'all' || guide.region === selectedRegion;
    
    return matchesSearch && matchesCategory && matchesRegion;
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
              Expert Travel Guides
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Discover in-depth guides written by travel experts and enhanced by AI to help you 
              plan the perfect trip with insider tips and local knowledge.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="py-8 bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search travel guides..."
                className="w-full pl-10 pr-4 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 text-gray-900 dark:text-white"
              />
            </div>

            {/* Filter Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center space-x-2 px-4 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
            >
              <Filter className="w-5 h-5" />
              <span>Filters</span>
              {showFilters ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
          </div>

          {/* Expanded Filters */}
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4"
            >
              {/* Categories */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Category
                </label>
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

              {/* Regions */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Region
                </label>
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
            </motion.div>
          )}
        </div>
      </section>

      {/* Guides Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredGuides.map((guide, index) => (
              <motion.article
                key={guide.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group"
              >
                <Link to={`/travel-guides/${guide.slug}`}>
                  <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 group-hover:-translate-y-2 overflow-hidden">
                    <div className="relative">
                      <img
                        src={guide.image}
                        alt={guide.title}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm text-gray-600 dark:text-gray-300 text-sm font-medium rounded-full">
                          {categories.find(c => c.id === guide.category)?.name}
                        </span>
                      </div>
                      <div className="absolute top-4 right-4">
                        <span className="flex items-center space-x-1 px-3 py-1 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm text-gray-600 dark:text-gray-300 text-sm font-medium rounded-full">
                          <Star className="w-3 h-3 text-yellow-500 fill-current" />
                          <span>{guide.rating}</span>
                        </span>
                      </div>
                    </div>
                    
                    <div className="p-6">
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-200">
                        {guide.title}
                      </h3>
                      
                      <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-3">
                        {guide.excerpt}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3 text-sm text-gray-500 dark:text-gray-400">
                          <div className="flex items-center">
                            <MapPin className="w-4 h-4 mr-1" />
                            <span>{regions.find(r => r.id === guide.region)?.name}</span>
                          </div>
                          <div className="flex items-center">
                            <Clock className="w-4 h-4 mr-1" />
                            <span>{guide.readTime}</span>
                          </div>
                        </div>
                        
                        <div className="text-primary-600 dark:text-primary-400 group-hover:translate-x-1 transition-transform duration-200">
                          <ArrowRight className="w-5 h-5" />
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
          
          {filteredGuides.length === 0 && (
            <div className="text-center py-16">
              <MapPin className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                No guides found
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Try adjusting your search criteria or browse all guides.
              </p>
              <Button onClick={() => {
                setSearchTerm('');
                setSelectedCategory('all');
                setSelectedRegion('all');
              }}>
                View All Guides
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary-600 to-secondary-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-display font-bold text-white mb-4">
              Ready to Plan Your Next Adventure?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Use our AI-powered trip planner to create a personalized itinerary based on these guides.
            </p>
            <Link to="/trip-planner">
              <Button variant="secondary" size="lg" className="bg-white text-primary-600 hover:bg-gray-50">
                Start Planning Now
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}