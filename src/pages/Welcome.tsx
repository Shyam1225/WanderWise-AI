import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Compass, Plane, MapPin, Globe, Camera, Mountain, 
  Utensils, Building, Heart, Sparkles, ArrowRight, 
  Calendar, Users, Star, Sun, Cloud, Umbrella
} from 'lucide-react';
import { Button } from '../components/ui/Button';

export function Welcome() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    // Set loaded after initial animation
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 1000);
    
    // Auto-advance slides
    const slideInterval = setInterval(() => {
      if (isLoaded) {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
      }
    }, 5000);
    
    return () => {
      clearTimeout(timer);
      clearInterval(slideInterval);
    };
  }, [isLoaded]);
  
  const slides = [
    {
      title: "Discover Your Perfect Journey",
      description: "AI-powered travel planning that transforms hours of research into minutes of conversation",
      image: "https://images.pexels.com/photos/346885/pexels-photo-346885.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&dpr=2",
      color: "from-blue-500 to-purple-500"
    },
    {
      title: "Explore Hidden Gems",
      description: "Uncover local secrets and off-the-beaten-path experiences tailored to your interests",
      image: "https://images.pexels.com/photos/2387873/pexels-photo-2387873.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&dpr=2",
      color: "from-green-500 to-teal-500"
    },
    {
      title: "Cultural Immersion",
      description: "Dive deep into local traditions, cuisine, and authentic experiences with cultural intelligence",
      image: "https://images.pexels.com/photos/3278215/pexels-photo-3278215.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&dpr=2",
      color: "from-orange-500 to-red-500"
    }
  ];
  
  const floatingIcons = [
    { icon: Plane, delay: 0, duration: 8, size: 'w-16 h-16' },
    { icon: Compass, delay: 1, duration: 6, size: 'w-12 h-12' },
    { icon: Globe, delay: 2, duration: 7, size: 'w-14 h-14' },
    { icon: MapPin, delay: 3, duration: 5, size: 'w-10 h-10' },
    { icon: Camera, delay: 4, duration: 9, size: 'w-12 h-12' },
    { icon: Mountain, delay: 5, duration: 8, size: 'w-14 h-14' },
    { icon: Utensils, delay: 6, duration: 7, size: 'w-10 h-10' },
    { icon: Building, delay: 7, duration: 6, size: 'w-12 h-12' },
    { icon: Sun, delay: 8, duration: 9, size: 'w-16 h-16' },
    { icon: Cloud, delay: 9, duration: 7, size: 'w-14 h-14' },
    { icon: Umbrella, delay: 10, duration: 8, size: 'w-10 h-10' },
  ];
  
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
      icon: Calendar,
      title: '3-Minute Setup',
      description: 'Transform hours of research into a quick conversation with our intelligent travel assistant.',
    },
    {
      icon: Users,
      title: 'Group Planning',
      description: 'Coordinate trips with friends and family effortlessly with collaborative planning tools.',
    },
  ];
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {floatingIcons.map((item, index) => (
          <motion.div
            key={index}
            className={`absolute text-primary-200 dark:text-gray-700 opacity-30 ${item.size}`}
            initial={{ 
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              opacity: 0,
              scale: 0.5
            }}
            animate={{
              x: [
                Math.random() * window.innerWidth,
                Math.random() * window.innerWidth,
                Math.random() * window.innerWidth
              ],
              y: [
                Math.random() * window.innerHeight,
                Math.random() * window.innerHeight,
                Math.random() * window.innerHeight
              ],
              opacity: [0.2, 0.3, 0.2],
              scale: [0.5, 0.7, 0.5],
              rotate: [0, 180, 360]
            }}
            transition={{
              duration: item.duration,
              repeat: Infinity,
              delay: item.delay,
              ease: "easeInOut"
            }}
          >
            <item.icon />
          </motion.div>
        ))}
      </div>
      
      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 py-24 flex flex-col items-center justify-center min-h-screen">
        {/* Logo Animation */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ 
            type: "spring", 
            stiffness: 260, 
            damping: 20,
            duration: 1 
          }}
          className="mb-8"
        >
          <div className="w-24 h-24 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center shadow-lg">
            <Compass className="w-12 h-12 text-white" />
          </div>
        </motion.div>
        
        {/* Title Animation */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-5xl md:text-7xl font-display font-bold text-center mb-6"
        >
          <span className="bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
            WanderWise AI
          </span>
        </motion.h1>
        
        {/* Tagline Animation */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 text-center max-w-3xl mb-12"
        >
          Your AI-powered travel companion that understands every culture, knows every hidden gem, 
          and plans like a world-traveled friend.
        </motion.p>
        
        {/* Slider */}
        <div className="w-full max-w-5xl mb-16 relative">
          <div className="relative h-[400px] md:h-[500px] rounded-3xl overflow-hidden shadow-2xl">
            <AnimatePresence mode="wait">
              {slides.map((slide, index) => (
                currentSlide === index && (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1 }}
                    className="absolute inset-0"
                  >
                    {/* Background Image with Gradient Overlay */}
                    <div className="absolute inset-0">
                      <div 
                        className="w-full h-full bg-cover bg-center"
                        style={{ backgroundImage: `url(${slide.image})` }}
                      />
                      <div className={`absolute inset-0 bg-gradient-to-r ${slide.color} opacity-60`} />
                    </div>
                    
                    {/* Content */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-8">
                      <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.8 }}
                        className="text-4xl md:text-5xl font-display font-bold text-center mb-6"
                      >
                        {slide.title}
                      </motion.h2>
                      <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 0.8 }}
                        className="text-xl text-center max-w-2xl"
                      >
                        {slide.description}
                      </motion.p>
                    </div>
                  </motion.div>
                )
              ))}
            </AnimatePresence>
            
            {/* Slide Indicators */}
            <div className="absolute bottom-6 left-0 right-0 flex justify-center space-x-2">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    currentSlide === index 
                      ? 'bg-white w-8' 
                      : 'bg-white/50 hover:bg-white/80'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
        
        {/* Features */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16"
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1 + index * 0.1, duration: 0.6 }}
              className="group"
            >
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 group-hover:-translate-y-2 h-full">
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
        </motion.div>
        
        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link to="/trip-planner">
            <Button size="lg" className="min-w-[200px]">
              Start Planning
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
          <Link to="/about">
            <Button variant="outline" size="lg" className="min-w-[200px]">
              Learn More
            </Button>
          </Link>
        </motion.div>
        
        {/* Testimonial */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.7, duration: 0.8 }}
          className="mt-16 max-w-2xl text-center"
        >
          <div className="flex justify-center mb-4">
            {[1, 2, 3, 4, 5].map((_, i) => (
              <Star key={i} className="w-6 h-6 text-yellow-500 fill-current" />
            ))}
          </div>
          <p className="text-xl text-gray-600 dark:text-gray-300 italic mb-4">
            "WanderWise AI planned my entire Southeast Asia trip in just 5 minutes. The recommendations were spot-on and saved me weeks of research!"
          </p>
          <div className="flex items-center justify-center">
            <img
              src="https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2"
              alt="Sarah Chen"
              className="w-12 h-12 rounded-full object-cover mr-4"
            />
            <div className="text-left">
              <p className="font-semibold text-gray-900 dark:text-white">Sarah Chen</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Digital Nomad</p>
            </div>
          </div>
        </motion.div>
        
        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 0.8 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <div className="w-6 h-10 border-2 border-gray-400 dark:border-gray-600 rounded-full flex justify-center">
            <motion.div
              animate={{
                y: [0, 12, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: "reverse",
              }}
              className="w-1 h-3 bg-gray-400 dark:bg-gray-600 rounded-full mt-2"
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
}