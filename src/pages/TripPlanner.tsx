import React from 'react';
import { motion } from 'framer-motion';
import { TravelForm } from '../components/forms/TravelForm';

export function TripPlanner() {
  return (
    <div className="min-h-screen pt-16 bg-gradient-to-br from-primary-50 via-white to-secondary-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl sm:text-5xl font-display font-bold text-gray-900 dark:text-white mb-4">
            AI Trip Planner
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Tell us about your dream trip and let our AI create the perfect itinerary for you. 
            Transform 20 hours of research into 3 minutes of intelligent conversation.
          </p>
        </motion.div>

        <TravelForm />
      </div>
    </div>
  );
}