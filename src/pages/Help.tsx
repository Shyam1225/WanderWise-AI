import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, ChevronDown, ChevronUp, MessageCircle, Mail, Phone, Book } from 'lucide-react';
import { Button } from '../components/ui/Button';

export function Help() {
  const [searchTerm, setSearchTerm] = useState('');
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const categories = [
    {
      title: 'Getting Started',
      icon: Book,
      faqs: [
        {
          question: 'How do I create my first trip with WanderWise AI?',
          answer: 'Simply go to our Trip Planner, fill out your preferences including destination, dates, budget, and interests. Our AI will generate a personalized itinerary in minutes.',
        },
        {
          question: 'What information do I need to provide for trip planning?',
          answer: 'You\'ll need your destination, travel dates, group size, budget range, travel style, and interests. Optional information like dietary restrictions and accessibility needs helps us create even better recommendations.',
        },
        {
          question: 'How accurate are the AI-generated itineraries?',
          answer: 'Our AI uses real-time data and expert knowledge to create highly accurate itineraries. However, we always recommend verifying opening hours, prices, and availability before your trip.',
        },
      ],
    },
    {
      title: 'Account & Billing',
      icon: MessageCircle,
      faqs: [
        {
          question: 'How do I upgrade my account?',
          answer: 'Visit the Pricing page and select your preferred plan. You can upgrade at any time, and the changes will take effect immediately.',
        },
        {
          question: 'Can I cancel my subscription anytime?',
          answer: 'Yes, you can cancel your subscription at any time from your account settings. Your access will continue until the end of your current billing period.',
        },
        {
          question: 'Do you offer refunds?',
          answer: 'We offer a 30-day money-back guarantee for all paid plans. Contact our support team if you\'re not satisfied with your experience.',
        },
      ],
    },
    {
      title: 'Trip Planning',
      icon: Mail,
      faqs: [
        {
          question: 'Can I modify the AI-generated itinerary?',
          answer: 'Absolutely! All itineraries are fully customizable. You can add, remove, or modify any suggestions to match your preferences perfectly.',
        },
        {
          question: 'How does the AI choose recommendations?',
          answer: 'Our AI considers your preferences, budget, travel style, local weather, cultural events, and real-time conditions to suggest the best experiences for your trip.',
        },
        {
          question: 'Can I plan trips for groups?',
          answer: 'Yes! Our group planning tools allow you to collaborate with travel companions, share itineraries, and accommodate different preferences within your group.',
        },
      ],
    },
    {
      title: 'Technical Support',
      icon: Phone,
      faqs: [
        {
          question: 'The app is not working properly. What should I do?',
          answer: 'Try refreshing the page or clearing your browser cache. If the problem persists, contact our support team with details about your device and browser.',
        },
        {
          question: 'How do I reset my password?',
          answer: 'Click the "Forgot Password" link on the login page and follow the instructions sent to your email address.',
        },
        {
          question: 'Can I access my trips offline?',
          answer: 'Premium subscribers can download their itineraries for offline access. This includes maps, contact information, and essential details.',
        },
      ],
    },
  ];

  const filteredCategories = categories.map(category => ({
    ...category,
    faqs: category.faqs.filter(faq =>
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
    ),
  })).filter(category => category.faqs.length > 0);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="min-h-screen pt-16 bg-white dark:bg-gray-900">
      {/* Hero Section */}
      <section className="py-24 bg-gradient-to-r from-primary-50 to-secondary-50 dark:from-gray-800 dark:to-gray-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl sm:text-5xl font-display font-bold text-gray-900 dark:text-white mb-6">
              How can we help you?
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              Find answers to common questions or get in touch with our support team.
            </p>
            
            {/* Search */}
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search for help articles..."
                className="w-full pl-12 pr-4 py-4 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 text-gray-900 dark:text-white text-lg"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="py-16 -mt-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: MessageCircle,
                title: 'Live Chat',
                description: 'Get instant help from our AI assistant',
                action: 'Start Chat',
                color: 'from-blue-500 to-cyan-500',
              },
              {
                icon: Mail,
                title: 'Email Support',
                description: 'Send us a detailed message',
                action: 'Send Email',
                color: 'from-green-500 to-emerald-500',
              },
              {
                icon: Phone,
                title: 'Phone Support',
                description: 'Speak with our team directly',
                action: 'Call Now',
                color: 'from-purple-500 to-pink-500',
              },
            ].map((action, index) => (
              <motion.div
                key={action.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 text-center"
              >
                <div className={`w-16 h-16 bg-gradient-to-r ${action.color} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                  <action.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {action.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {action.description}
                </p>
                <Button variant="outline" size="sm" className="w-full">
                  {action.action}
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Sections */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-display font-bold text-gray-900 dark:text-white mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Find quick answers to the most common questions about WanderWise AI.
            </p>
          </motion.div>

          <div className="space-y-8">
            {filteredCategories.map((category, categoryIndex) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
                viewport={{ once: true }}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden"
              >
                <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-xl flex items-center justify-center">
                      <category.icon className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                      {category.title}
                    </h3>
                  </div>
                </div>
                
                <div className="divide-y divide-gray-200 dark:divide-gray-700">
                  {category.faqs.map((faq, faqIndex) => {
                    const globalIndex = categoryIndex * 100 + faqIndex;
                    return (
                      <div key={faqIndex}>
                        <button
                          onClick={() => toggleFaq(globalIndex)}
                          className="w-full px-6 py-4 text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
                        >
                          <div className="flex items-center justify-between">
                            <h4 className="text-lg font-medium text-gray-900 dark:text-white pr-4">
                              {faq.question}
                            </h4>
                            {openFaq === globalIndex ? (
                              <ChevronUp className="w-5 h-5 text-gray-400 flex-shrink-0" />
                            ) : (
                              <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />
                            )}
                          </div>
                        </button>
                        
                        {openFaq === globalIndex && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="px-6 pb-4"
                          >
                            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                              {faq.answer}
                            </p>
                          </motion.div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            ))}
          </div>

          {filteredCategories.length === 0 && searchTerm && (
            <div className="text-center py-12">
              <Search className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                No results found
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                We couldn't find any help articles matching "{searchTerm}". Try different keywords or contact our support team.
              </p>
              <Button>Contact Support</Button>
            </div>
          )}
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 bg-gradient-to-r from-primary-600 to-secondary-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-display font-bold text-white mb-4">
              Still need help?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Our support team is here to help you make the most of your WanderWise AI experience.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="secondary" size="lg" className="bg-white text-primary-600 hover:bg-gray-50">
                Contact Support
              </Button>
              <Button variant="outline" size="lg" className="border-white/30 text-white hover:bg-white/10">
                Schedule a Call
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}