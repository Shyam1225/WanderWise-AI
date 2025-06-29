import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, ArrowLeft, Compass, MapPin } from 'lucide-react';
import { Button } from '../components/ui/Button';

export function NotFound() {
  return (
    <div className="min-h-screen pt-16 bg-white dark:bg-gray-900 flex items-center justify-center">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-8"
        >
          {/* 404 Animation */}
          <div className="relative">
            <motion.div
              animate={{ 
                rotate: [0, 10, -10, 0],
                scale: [1, 1.05, 1]
              }}
              transition={{ 
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="text-8xl sm:text-9xl font-bold text-gray-200 dark:text-gray-700 select-none"
            >
              404
            </motion.div>
            
            {/* Floating Icons */}
            <motion.div
              animate={{ 
                y: [-10, 10, -10],
                rotate: [0, 5, -5, 0]
              }}
              transition={{ 
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute top-4 left-8 text-primary-400"
            >
              <Compass className="w-8 h-8" />
            </motion.div>
            
            <motion.div
              animate={{ 
                y: [10, -10, 10],
                rotate: [0, -5, 5, 0]
              }}
              transition={{ 
                duration: 3.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5
              }}
              className="absolute top-8 right-12 text-secondary-400"
            >
              <MapPin className="w-6 h-6" />
            </motion.div>
          </div>

          {/* Content */}
          <div className="space-y-6">
            <h1 className="text-3xl sm:text-4xl font-display font-bold text-gray-900 dark:text-white">
              Oops! You've wandered off the map
            </h1>
            
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-lg mx-auto leading-relaxed">
              The page you're looking for doesn't exist. It might have been moved, deleted, 
              or you entered the wrong URL.
            </p>
          </div>

          {/* Suggestions */}
          <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-8 text-left">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 text-center">
              Here's what you can do:
            </h2>
            <ul className="space-y-3 text-gray-600 dark:text-gray-300">
              <li className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-primary-500 rounded-full flex-shrink-0" />
                <span>Check the URL for any typos</span>
              </li>
              <li className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-primary-500 rounded-full flex-shrink-0" />
                <span>Go back to the previous page</span>
              </li>
              <li className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-primary-500 rounded-full flex-shrink-0" />
                <span>Visit our homepage to start fresh</span>
              </li>
              <li className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-primary-500 rounded-full flex-shrink-0" />
                <span>Use our trip planner to find your next adventure</span>
              </li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/">
              <Button size="lg" className="min-w-[200px]">
                <Home className="w-5 h-5 mr-2" />
                Go Home
              </Button>
            </Link>
            
            <Button 
              variant="outline" 
              size="lg" 
              onClick={() => window.history.back()}
              className="min-w-[200px]"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Go Back
            </Button>
          </div>

          {/* Popular Links */}
          <div className="pt-8 border-t border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Popular Pages
            </h3>
            <div className="flex flex-wrap gap-3 justify-center">
              {[
                { name: 'Trip Planner', href: '/trip-planner' },
                { name: 'Destinations', href: '/destinations' },
                { name: 'Travel Guides', href: '/travel-guides' },
                { name: 'About Us', href: '/about' },
                { name: 'Contact', href: '/contact' },
              ].map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className="px-4 py-2 bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 rounded-lg border border-gray-200 dark:border-gray-600 hover:border-primary-300 dark:hover:border-primary-600 transition-colors duration-200"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Fun Message */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.6 }}
            className="text-sm text-gray-500 dark:text-gray-400"
          >
            💡 Fun fact: Even the best explorers sometimes take wrong turns. 
            That's how the greatest discoveries are made!
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}