import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Globe, Clock, Users, Star, MapPin, Search, HelpCircle } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { GlobalSearch } from '../components/search/GlobalSearch';
import { HelpSupportSystem } from '../components/help/HelpSupportSystem';
import { SEOOptimization } from '../components/seo/SEOOptimization';
import { VirtualTravelPromo } from '../components/home/VirtualTravelPromo';

export function Home() {
  const [showSearch, setShowSearch] = useState(false);
  const [showHelpSystem, setShowHelpSystem] = useState(false);

  const features = [
    {
      icon: Sparkles,
      title: 'AI-Powered Planning',
      description: 'Our advanced AI understands your preferences and creates personalized itineraries in minutes.',
    },
    {
      icon: Globe,
      title: 'Global Destinations',
      description: 'Access insider knowledge for destinations worldwide, from hidden gems to popular hotspots.',
    },
    {
      icon: Clock,
      title: '3-Minute Setup',
      description: 'Transform hours of research into a quick conversation with our intelligent travel assistant.',
    },
    {
      icon: Users,
      title: 'Group Planning',
      description: 'Coordinate trips with friends and family effortlessly with collaborative planning tools.',
    },
  ];

  const testimonials = [
    {
      name: 'Sarah Chen',
      role: 'Digital Nomad',
      image: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
      rating: 5,
      text: 'WanderWise AI planned my entire Southeast Asia trip in just 5 minutes. The recommendations were spot-on and saved me weeks of research!',
    },
    {
      name: 'Marcus Rodriguez',
      role: 'Family Traveler',
      image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
      rating: 5,
      text: 'Planning a family vacation has never been easier. The AI understood our kids\' ages and interests perfectly.',
    },
    {
      name: 'Elena Kowalski',
      role: 'Solo Adventurer',
      image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
      rating: 5,
      text: 'The local insights and safety tips for solo female travelers were incredibly valuable. I felt confident exploring new places.',
    },
  ];

  // SEO data
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "WanderWise AI",
    "description": "AI-powered travel planning that transforms hours of research into minutes of conversation",
    "applicationCategory": "TravelApplication",
    "operatingSystem": "All",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "ratingCount": "1250"
    }
  };

  return (
    <div className="min-h-screen">
      <SEOOptimization
        title="WanderWise AI - Intelligent Travel Planning"
        description="Transform hours of travel research into minutes with AI-powered personalized itineraries, cultural insights, and local recommendations."
        ogImage="https://images.pexels.com/photos/346885/pexels-photo-346885.jpeg?auto=compress&cs=tinysrgb&w=1200&h=630&dpr=2"
        keywords={["travel planning", "AI travel", "personalized itinerary", "trip planner", "vacation planner"]}
        structuredData={structuredData}
      />

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 z-0">
          <div 
            className="w-full h-full bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('https://images.pexels.com/photos/346885/pexels-photo-346885.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&dpr=2')`
            }}
          />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-display font-bold text-white leading-tight">
                Transform{' '}
                <span className="bg-gradient-to-r from-primary-400 to-secondary-400 bg-clip-text text-transparent">
                  20 hours
                </span>{' '}
                of research into{' '}
                <span className="bg-gradient-to-r from-warm-400 to-primary-400 bg-clip-text text-transparent">
                  3 minutes
                </span>{' '}
                of conversation
              </h1>
              <p className="text-xl sm:text-2xl text-gray-200 max-w-3xl mx-auto leading-relaxed">
                Your AI-powered travel companion that understands every culture, knows every hidden gem, 
                and plans like a world-traveled friend.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
              <Link to="/trip-planner">
                <Button size="lg" className="min-w-[200px]">
                  Start Planning
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Button variant="outline" size="lg" className="min-w-[200px] bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20">
                Watch Demo
              </Button>
            </div>

            {/* Quick Action Buttons */}
            <div className="flex justify-center space-x-4 pt-8">
              <button
                onClick={() => setShowSearch(true)}
                className="p-3 bg-white/10 backdrop-blur-sm rounded-full text-white hover:bg-white/20 transition-colors duration-200"
                aria-label="Search"
              >
                <Search className="w-6 h-6" />
              </button>
              <button
                onClick={() => setShowHelpSystem(true)}
                className="p-3 bg-white/10 backdrop-blur-sm rounded-full text-white hover:bg-white/20 transition-colors duration-200"
                aria-label="Help and support"
              >
                <HelpCircle className="w-6 h-6" />
              </button>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <motion.div
              animate={{
                y: [0, 12, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: "reverse",
              }}
              className="w-1 h-3 bg-white/70 rounded-full mt-2"
            />
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-gray-900 dark:text-white mb-4">
              Why Choose WanderWise AI?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Experience the future of travel planning with intelligent recommendations, 
              personalized itineraries, and expert local insights.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group"
              >
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 group-hover:-translate-y-2">
                  <div className="w-12 h-12 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Virtual Travel Promo Section */}
      <VirtualTravelPromo />

      {/* Testimonials Section */}
      <section className="py-24 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-gray-900 dark:text-white mb-4">
              Loved by Travelers Worldwide
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Join thousands of happy travelers who've discovered the magic of AI-powered planning.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gray-50 dark:bg-gray-700 rounded-2xl p-6"
              >
                <div className="flex items-center mb-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">
                      {testimonial.name}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  "{testimonial.text}"
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-primary-600 to-secondary-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <h2 className="text-3xl sm:text-4xl font-display font-bold text-white">
                Ready to Start Your Adventure?
              </h2>
              <p className="text-xl text-white/90 max-w-2xl mx-auto">
                Join thousands of travelers who've discovered the future of trip planning. 
                Your perfect journey is just a conversation away.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/trip-planner">
                <Button size="lg" variant="secondary" className="min-w-[200px] bg-white text-primary-600 hover:bg-gray-50">
                  Start Planning Now
                  <MapPin className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Button variant="outline" size="lg" className="min-w-[200px] border-white/30 text-white hover:bg-white/10">
                Learn More
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Modals */}
      {showSearch && <GlobalSearch onClose={() => setShowSearch(false)} />}
      {showHelpSystem && <HelpSupportSystem onClose={() => setShowHelpSystem(false)} />}
    </div>
  );
}