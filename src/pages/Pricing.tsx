import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Star, Zap, Crown, Sparkles } from 'lucide-react';
import { Button } from '../components/ui/Button';

export function Pricing() {
  const [isAnnual, setIsAnnual] = useState(false);

  const plans = [
    {
      name: 'Explorer',
      icon: Star,
      description: 'Perfect for occasional travelers',
      monthlyPrice: 0,
      annualPrice: 0,
      features: [
        '3 AI-generated itineraries per month',
        'Basic destination recommendations',
        'Standard travel guides',
        'Community support',
        'Mobile app access',
      ],
      limitations: [
        'Limited customization options',
        'No priority support',
        'Basic cultural insights',
      ],
      popular: false,
      cta: 'Get Started Free',
    },
    {
      name: 'Wanderer',
      icon: Zap,
      description: 'For regular travelers who want more',
      monthlyPrice: 19,
      annualPrice: 190,
      features: [
        'Unlimited AI-generated itineraries',
        'Advanced personalization',
        'Detailed cultural insights',
        'Restaurant recommendations',
        'Local phrase guides',
        'Priority email support',
        'Trip collaboration tools',
        'Offline access',
      ],
      limitations: [],
      popular: true,
      cta: 'Start Free Trial',
    },
    {
      name: 'Globetrotter',
      icon: Crown,
      description: 'For travel enthusiasts and professionals',
      monthlyPrice: 49,
      annualPrice: 490,
      features: [
        'Everything in Wanderer',
        'Real-time travel updates',
        'Concierge support (24/7)',
        'Custom travel preferences',
        'Group planning tools',
        'Travel expense tracking',
        'API access for travel agencies',
        'White-label solutions',
        'Advanced analytics',
      ],
      limitations: [],
      popular: false,
      cta: 'Contact Sales',
    },
  ];

  const faqs = [
    {
      question: 'How does the AI trip planning work?',
      answer: 'Our AI analyzes your preferences, travel style, budget, and interests to create personalized itineraries. It considers factors like local culture, weather, events, and your personal travel history to suggest the best experiences.',
    },
    {
      question: 'Can I modify the AI-generated itineraries?',
      answer: 'Absolutely! All itineraries are fully customizable. You can add, remove, or modify any suggestions to match your preferences perfectly.',
    },
    {
      question: 'What\'s included in the free plan?',
      answer: 'The Explorer plan includes 3 AI-generated itineraries per month, basic destination recommendations, standard travel guides, and community support.',
    },
    {
      question: 'Is there a free trial for paid plans?',
      answer: 'Yes! We offer a 14-day free trial for the Wanderer plan, so you can experience all the premium features before committing.',
    },
    {
      question: 'Can I cancel my subscription anytime?',
      answer: 'Yes, you can cancel your subscription at any time. Your access will continue until the end of your current billing period.',
    },
    {
      question: 'Do you offer refunds?',
      answer: 'We offer a 30-day money-back guarantee for all paid plans. If you\'re not satisfied, contact us for a full refund.',
    },
  ];

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
              Choose Your Adventure Plan
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed mb-8">
              From casual explorers to seasoned globetrotters, we have the perfect plan 
              to fuel your wanderlust and make every journey extraordinary.
            </p>
            
            {/* Billing Toggle */}
            <div className="flex items-center justify-center space-x-4 mb-12">
              <span className={`text-sm font-medium ${!isAnnual ? 'text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-400'}`}>
                Monthly
              </span>
              <button
                onClick={() => setIsAnnual(!isAnnual)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ${
                  isAnnual ? 'bg-primary-600' : 'bg-gray-300 dark:bg-gray-600'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
                    isAnnual ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
              <span className={`text-sm font-medium ${isAnnual ? 'text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-400'}`}>
                Annual
              </span>
              {isAnnual && (
                <span className="ml-2 px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 text-xs font-medium rounded-full">
                  Save 17%
                </span>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-16 -mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`relative bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden ${
                  plan.popular ? 'ring-2 ring-primary-500 scale-105' : ''
                }`}
              >
                {plan.popular && (
                  <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-primary-500 to-secondary-500 text-white text-center py-2 text-sm font-medium">
                    Most Popular
                  </div>
                )}
                
                <div className={`p-8 ${plan.popular ? 'pt-12' : ''}`}>
                  <div className="flex items-center space-x-3 mb-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                      plan.popular 
                        ? 'bg-gradient-to-r from-primary-500 to-secondary-500' 
                        : 'bg-gray-100 dark:bg-gray-700'
                    }`}>
                      <plan.icon className={`w-6 h-6 ${plan.popular ? 'text-white' : 'text-gray-600 dark:text-gray-300'}`} />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                        {plan.name}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 text-sm">
                        {plan.description}
                      </p>
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <div className="flex items-baseline space-x-2">
                      <span className="text-4xl font-bold text-gray-900 dark:text-white">
                        ${isAnnual ? plan.annualPrice : plan.monthlyPrice}
                      </span>
                      <span className="text-gray-600 dark:text-gray-300">
                        {plan.monthlyPrice === 0 ? '' : isAnnual ? '/year' : '/month'}
                      </span>
                    </div>
                    {isAnnual && plan.monthlyPrice > 0 && (
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        ${Math.round(plan.annualPrice / 12)}/month billed annually
                      </p>
                    )}
                  </div>
                  
                  <Button 
                    className={`w-full mb-6 ${plan.popular ? '' : 'variant-outline'}`}
                    variant={plan.popular ? 'primary' : 'outline'}
                  >
                    {plan.cta}
                  </Button>
                  
                  <div className="space-y-3">
                    <h4 className="font-semibold text-gray-900 dark:text-white">
                      What's included:
                    </h4>
                    <ul className="space-y-2">
                      {plan.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start space-x-3">
                          <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-600 dark:text-gray-300 text-sm">
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Comparison */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-display font-bold text-gray-900 dark:text-white mb-4">
              Why Choose WanderWise AI?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Experience the future of travel planning with features designed to make every journey unforgettable.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Sparkles,
                title: 'AI-Powered Intelligence',
                description: 'Advanced algorithms that learn your preferences and create personalized experiences.',
              },
              {
                icon: Star,
                title: 'Expert Curation',
                description: 'Handpicked recommendations from local experts and seasoned travelers worldwide.',
              },
              {
                icon: Zap,
                title: 'Real-Time Updates',
                description: 'Live information about weather, events, and local conditions for your destinations.',
              },
              {
                icon: Crown,
                title: 'Premium Support',
                description: '24/7 concierge service to help you with any travel questions or emergencies.',
              },
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
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
              Everything you need to know about WanderWise AI
            </p>
          </motion.div>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg"
              >
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  {faq.question}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {faq.answer}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-primary-600 to-secondary-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-display font-bold text-white mb-4">
              Ready to Start Your Adventure?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Join thousands of travelers who've discovered the magic of AI-powered trip planning.
            </p>
            <Button size="lg" variant="secondary" className="bg-white text-primary-600 hover:bg-gray-50">
              Start Your Free Trial
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}