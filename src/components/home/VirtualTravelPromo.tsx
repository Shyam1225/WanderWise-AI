import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Globe, MapPin, Compass } from 'lucide-react';
import { Button } from '../ui/Button';

export function VirtualTravelPromo() {
  return (
    <section className="py-16 bg-gradient-to-r from-primary-50 to-secondary-50 dark:from-gray-800 dark:to-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="space-y-6">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-xl flex items-center justify-center">
                  <Globe className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-3xl font-display font-bold text-gray-900 dark:text-white">
                  Virtual Travel Experience
                </h2>
              </div>
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                Explore destinations in immersive 360° views before planning your actual trip. 
                Walk through famous landmarks, experience local streets, and get a feel for your next adventure.
              </p>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-white dark:bg-gray-700 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <MapPin className="w-3 h-3 text-primary-500" />
                  </div>
                  <p className="text-gray-600 dark:text-gray-300">
                    Visit iconic landmarks in Delhi, Jaipur, Agra, Mumbai, and more
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-white dark:bg-gray-700 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Compass className="w-3 h-3 text-primary-500" />
                  </div>
                  <p className="text-gray-600 dark:text-gray-300">
                    Navigate through real streets and explore cities from any angle
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-white dark:bg-gray-700 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Globe className="w-3 h-3 text-primary-500" />
                  </div>
                  <p className="text-gray-600 dark:text-gray-300">
                    Learn about cultural and historical significance of each location
                  </p>
                </div>
              </div>
              <div className="pt-4">
                <Link to="/virtual-travel">
                  <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                    Start Virtual Tour
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-video">
              <img
                src="https://images.pexels.com/photos/3581364/pexels-photo-3581364.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=2"
                alt="Virtual Travel Experience"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-6">
                <h3 className="text-2xl font-bold text-white mb-2">Explore Jaipur</h3>
                <p className="text-white/90">Experience the Pink City in immersive 360°</p>
              </div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-4 flex flex-col items-center justify-center">
              <Globe className="w-10 h-10 text-blue-600 mb-2" />
              <span className="text-sm font-semibold text-gray-900 dark:text-white text-center">
                360° Virtual Experience
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}