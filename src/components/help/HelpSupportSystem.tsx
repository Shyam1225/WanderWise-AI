import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  HelpCircle, Search, MessageCircle, Mail, Phone, 
  ChevronDown, ChevronUp, X, ArrowRight, Play, 
  Lightbulb, CheckCircle, Info, AlertTriangle, 
  Video, FileText, Book, Compass, User, Settings
} from 'lucide-react';
import { Button } from '../ui/Button';

interface HelpSupportSystemProps {
  onClose: () => void;
  currentPage?: string;
}

export function HelpSupportSystem({ onClose, currentPage = 'home' }: HelpSupportSystemProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<'faq' | 'contact' | 'tutorials' | 'tour'>('faq');
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [showTourHighlight, setShowTourHighlight] = useState(false);
  const [activeTutorial, setActiveTutorial] = useState<string | null>(null);
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  
  const searchInputRef = useRef<HTMLInputElement>(null);

  const tabs = [
    { id: 'faq', label: 'FAQ', icon: HelpCircle },
    { id: 'contact', label: 'Contact Support', icon: MessageCircle },
    { id: 'tutorials', label: 'Tutorials & Guides', icon: Video },
    { id: 'tour', label: 'Interactive Tour', icon: Compass }
  ];

  const faqCategories = [
    {
      title: 'Getting Started',
      faqs: [
        {
          question: 'How does WanderWise AI create personalized itineraries?',
          answer: 'Our AI analyzes your preferences, travel style, budget, and interests to create customized recommendations. We consider factors like local culture, weather, events, and your personal travel history.'
        },
        {
          question: 'Is WanderWise AI free to use?',
          answer: 'We offer a free tier with basic trip planning features. Premium plans unlock advanced AI capabilities, unlimited itineraries, and priority support.'
        },
        {
          question: 'Can I modify the AI-generated itinerary?',
          answer: 'Absolutely! Our AI creates a starting point, but you have full control to modify, add, or remove any suggestions to match your preferences perfectly.'
        }
      ]
    },
    {
      title: 'Account & Billing',
      faqs: [
        {
          question: 'How do I upgrade my account?',
          answer: 'Visit the Pricing page and select your preferred plan. You can upgrade at any time, and the changes will take effect immediately.'
        },
        {
          question: 'Can I cancel my subscription anytime?',
          answer: 'Yes, you can cancel your subscription at any time from your account settings. Your access will continue until the end of your current billing period.'
        },
        {
          question: 'Do you offer refunds?',
          answer: 'We offer a 30-day money-back guarantee for all paid plans. Contact our support team if you\'re not satisfied with your experience.'
        }
      ]
    },
    {
      title: 'Trip Planning',
      faqs: [
        {
          question: 'How far in advance should I plan my trip?',
          answer: 'For best results, we recommend planning at least 2-3 months in advance for international trips and 1 month for domestic trips. This allows time for booking accommodations and activities at better rates.'
        },
        {
          question: 'Can I plan trips for groups?',
          answer: 'Yes! Our group planning tools allow you to collaborate with travel companions, share itineraries, and accommodate different preferences within your group.'
        },
        {
          question: 'How accurate are the budget estimates?',
          answer: 'Our budget estimates are based on current market rates and are generally accurate within 10-15%. Prices may vary based on seasonality, availability, and exchange rate fluctuations.'
        }
      ]
    }
  ];

  const tutorials = [
    {
      id: 'getting-started',
      title: 'Getting Started with WanderWise AI',
      duration: '3:45',
      thumbnail: 'https://images.pexels.com/photos/1051075/pexels-photo-1051075.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=2',
      description: 'Learn the basics of creating your first AI-powered travel itinerary.'
    },
    {
      id: 'advanced-planning',
      title: 'Advanced Trip Planning Features',
      duration: '5:20',
      thumbnail: 'https://images.pexels.com/photos/1051075/pexels-photo-1051075.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=2',
      description: 'Discover how to customize your itinerary, add special requirements, and optimize your travel plans.'
    },
    {
      id: 'collaboration',
      title: 'Collaborating with Travel Companions',
      duration: '4:10',
      thumbnail: 'https://images.pexels.com/photos/1051075/pexels-photo-1051075.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=2',
      description: 'Learn how to share and collaborate on trip planning with friends and family.'
    },
    {
      id: 'export-share',
      title: 'Exporting and Sharing Your Itinerary',
      duration: '2:55',
      thumbnail: 'https://images.pexels.com/photos/1051075/pexels-photo-1051075.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=2',
      description: 'Explore different ways to export, share, and access your travel plans on the go.'
    }
  ];

  const tourSteps = [
    {
      element: 'trip-planner',
      title: 'Trip Planner',
      description: 'Start your journey by entering your destination, dates, and preferences.',
      position: 'right'
    },
    {
      element: 'ai-suggestions',
      title: 'AI Suggestions',
      description: 'Get personalized recommendations based on your travel style and interests.',
      position: 'bottom'
    },
    {
      element: 'itinerary-editor',
      title: 'Itinerary Editor',
      description: 'Customize your trip by adding, removing, or rearranging activities.',
      position: 'left'
    },
    {
      element: 'export-options',
      title: 'Export Options',
      description: 'Save your itinerary in multiple formats or share with travel companions.',
      position: 'top'
    }
  ];

  const contextualHelp = {
    'trip-planner': {
      title: 'Trip Planner Help',
      tips: [
        'Enter your destination, travel dates, and group size to get started',
        'Select your interests to receive personalized recommendations',
        'Adjust your budget to see appropriate activity suggestions',
        'Add special requirements for customized planning'
      ]
    },
    'my-trips': {
      title: 'My Trips Help',
      tips: [
        'View all your saved and past trips',
        'Click on any trip to view or edit details',
        'Use filters to sort by date, destination, or status',
        'Share trips with travel companions via email or link'
      ]
    },
    'destinations': {
      title: 'Destinations Help',
      tips: [
        'Browse popular destinations by region or category',
        'Use the search bar to find specific locations',
        'Click on any destination to see detailed information',
        'Save favorites for quick access later'
      ]
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement search functionality
    console.log('Searching for:', searchTerm);
  };

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    setFormSubmitted(true);
    // Reset form after 3 seconds
    setTimeout(() => {
      setFormSubmitted(false);
      setContactForm({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    }, 3000);
  };

  const startTour = () => {
    setShowTourHighlight(true);
    // In a real implementation, this would trigger the tour
    console.log('Starting interactive tour...');
  };

  const getContextualHelp = () => {
    if (currentPage && contextualHelp[currentPage as keyof typeof contextualHelp]) {
      return contextualHelp[currentPage as keyof typeof contextualHelp];
    }
    return null;
  };

  const contextHelp = getContextualHelp();

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-primary-500 to-secondary-500 p-6 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <HelpCircle className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">Help & Support</h2>
                <p className="text-white/90">Find answers and get assistance</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/20 rounded-lg transition-colors duration-200"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <form onSubmit={handleSearchSubmit} className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              ref={searchInputRef}
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search for help articles..."
              className="w-full pl-12 pr-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 text-gray-900 dark:text-white"
            />
          </form>
        </div>

        <div className="flex h-[600px]">
          {/* Sidebar */}
          <div className="w-64 bg-gray-50 dark:bg-gray-700 border-r border-gray-200 dark:border-gray-600">
            <nav className="p-4 space-y-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors duration-200 ${
                    activeTab === tab.id
                      ? 'bg-primary-500 text-white'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  <tab.icon className="w-5 h-5" />
                  <span className="font-medium">{tab.label}</span>
                </button>
              ))}
            </nav>

            {/* Contextual Help */}
            {contextHelp && (
              <div className="p-4 mt-8">
                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
                  <h3 className="font-medium text-blue-700 dark:text-blue-300 mb-2 flex items-center">
                    <Lightbulb className="w-4 h-4 mr-2" />
                    {contextHelp.title}
                  </h3>
                  <ul className="space-y-2">
                    {contextHelp.tips.map((tip, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                        <span className="text-sm text-blue-600 dark:text-blue-400">{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {/* Quick Contact */}
            <div className="p-4 mt-4">
              <div className="p-4 bg-gray-100 dark:bg-gray-600 rounded-xl">
                <h3 className="font-medium text-gray-900 dark:text-white mb-2">
                  Need Immediate Help?
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                  Our support team is available 24/7 to assist you.
                </p>
                <Button
                  onClick={() => setActiveTab('contact')}
                  variant="outline"
                  size="sm"
                  className="w-full"
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Contact Support
                </Button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 overflow-y-auto">
            <AnimatePresence mode="wait">
              {/* FAQ Tab */}
              {activeTab === 'faq' && (
                <motion.div
                  key="faq"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="p-6 space-y-6"
                >
                  {faqCategories.map((category, categoryIndex) => (
                    <div key={categoryIndex}>
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                        {category.title}
                      </h3>
                      <div className="space-y-3">
                        {category.faqs.map((faq, faqIndex) => {
                          const index = categoryIndex * 100 + faqIndex;
                          return (
                            <div
                              key={faqIndex}
                              className="bg-gray-50 dark:bg-gray-700 rounded-xl overflow-hidden"
                            >
                              <button
                                onClick={() => toggleFaq(index)}
                                className="w-full flex items-center justify-between p-4 text-left"
                              >
                                <h4 className="font-medium text-gray-900 dark:text-white pr-8">
                                  {faq.question}
                                </h4>
                                {openFaq === index ? (
                                  <ChevronUp className="w-5 h-5 text-gray-400 flex-shrink-0" />
                                ) : (
                                  <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />
                                )}
                              </button>
                              
                              <AnimatePresence>
                                {openFaq === index && (
                                  <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="px-4 pb-4"
                                  >
                                    <p className="text-gray-600 dark:text-gray-300">
                                      {faq.answer}
                                    </p>
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ))}

                  {/* Still Need Help */}
                  <div className="bg-primary-50 dark:bg-primary-900/20 rounded-xl p-6 text-center">
                    <h3 className="text-lg font-semibold text-primary-700 dark:text-primary-300 mb-2">
                      Still Need Help?
                    </h3>
                    <p className="text-primary-600 dark:text-primary-400 mb-4">
                      Our support team is ready to assist you with any questions or issues.
                    </p>
                    <Button
                      onClick={() => setActiveTab('contact')}
                      variant="outline"
                      className="border-primary-300 text-primary-700 hover:bg-primary-100"
                    >
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Contact Support
                    </Button>
                  </div>
                </motion.div>
              )}

              {/* Contact Support Tab */}
              {activeTab === 'contact' && (
                <motion.div
                  key="contact"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="p-6 space-y-6"
                >
                  {/* Contact Options */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                    <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4 text-center">
                      <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-3">
                        <MessageCircle className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                      </div>
                      <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                        Live Chat
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                        Chat with our support team
                      </p>
                      <Button variant="outline" size="sm">
                        Start Chat
                      </Button>
                    </div>
                    
                    <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4 text-center">
                      <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-3">
                        <Mail className="w-6 h-6 text-green-600 dark:text-green-400" />
                      </div>
                      <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                        Email Support
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                        support@wanderwise.ai
                      </p>
                      <Button variant="outline" size="sm">
                        Send Email
                      </Button>
                    </div>
                    
                    <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4 text-center">
                      <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mx-auto mb-3">
                        <Phone className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                      </div>
                      <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                        Phone Support
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                        +1 (555) 123-4567
                      </p>
                      <Button variant="outline" size="sm">
                        Call Now
                      </Button>
                    </div>
                  </div>

                  {/* Contact Form */}
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                      Send us a Message
                    </h3>
                    
                    {formSubmitted ? (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-green-50 dark:bg-green-900/20 rounded-xl p-6 text-center"
                      >
                        <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
                        <h4 className="text-lg font-semibold text-green-800 dark:text-green-300 mb-2">
                          Message Sent Successfully
                        </h4>
                        <p className="text-green-700 dark:text-green-400">
                          Thank you for contacting us. We'll get back to you within 24 hours.
                        </p>
                      </motion.div>
                    ) : (
                      <form onSubmit={handleContactSubmit} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                              Your Name
                            </label>
                            <input
                              type="text"
                              value={contactForm.name}
                              onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                              required
                              className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 text-gray-900 dark:text-white"
                            />
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                              Email Address
                            </label>
                            <input
                              type="email"
                              value={contactForm.email}
                              onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                              required
                              className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 text-gray-900 dark:text-white"
                            />
                          </div>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Subject
                          </label>
                          <select
                            value={contactForm.subject}
                            onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                            required
                            className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 text-gray-900 dark:text-white"
                          >
                            <option value="">Select a subject</option>
                            <option value="general">General Inquiry</option>
                            <option value="technical">Technical Support</option>
                            <option value="billing">Billing Question</option>
                            <option value="feedback">Feedback</option>
                            <option value="feature">Feature Request</option>
                          </select>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Message
                          </label>
                          <textarea
                            value={contactForm.message}
                            onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                            required
                            rows={5}
                            className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 text-gray-900 dark:text-white resize-none"
                          />
                        </div>
                        
                        <Button type="submit" className="w-full">
                          Send Message
                        </Button>
                      </form>
                    )}
                  </div>
                </motion.div>
              )}

              {/* Tutorials Tab */}
              {activeTab === 'tutorials' && (
                <motion.div
                  key="tutorials"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="p-6 space-y-6"
                >
                  {activeTutorial ? (
                    <div>
                      <button
                        onClick={() => setActiveTutorial(null)}
                        className="flex items-center text-primary-600 dark:text-primary-400 mb-4"
                      >
                        <ChevronDown className="w-4 h-4 mr-1 rotate-90" />
                        Back to Tutorials
                      </button>
                      
                      <div className="bg-gray-50 dark:bg-gray-700 rounded-xl overflow-hidden">
                        <div className="aspect-video bg-gray-200 dark:bg-gray-600 relative">
                          <div className="absolute inset-0 flex items-center justify-center">
                            <Play className="w-16 h-16 text-white opacity-80" />
                          </div>
                          <img
                            src={tutorials.find(t => t.id === activeTutorial)?.thumbnail}
                            alt="Tutorial thumbnail"
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="p-6">
                          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                            {tutorials.find(t => t.id === activeTutorial)?.title}
                          </h3>
                          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-4">
                            <Clock className="w-4 h-4 mr-1" />
                            <span>{tutorials.find(t => t.id === activeTutorial)?.duration}</span>
                          </div>
                          <p className="text-gray-600 dark:text-gray-300 mb-6">
                            {tutorials.find(t => t.id === activeTutorial)?.description}
                          </p>
                          
                          <div className="space-y-4">
                            <h4 className="font-semibold text-gray-900 dark:text-white">
                              Tutorial Chapters
                            </h4>
                            <div className="space-y-2">
                              {['Introduction', 'Basic Setup', 'Key Features', 'Advanced Tips', 'Conclusion'].map((chapter, index) => (
                                <div
                                  key={index}
                                  className="flex items-center justify-between p-3 bg-white dark:bg-gray-600 rounded-lg"
                                >
                                  <div className="flex items-center space-x-3">
                                    <div className="w-6 h-6 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center text-xs font-medium text-primary-700 dark:text-primary-300">
                                      {index + 1}
                                    </div>
                                    <span className="font-medium text-gray-900 dark:text-white">
                                      {chapter}
                                    </span>
                                  </div>
                                  <button className="text-primary-600 dark:text-primary-400">
                                    <Play className="w-4 h-4" />
                                  </button>
                                </div>
                              ))}
                            </div>
                          </div>
                          
                          <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                            <h4 className="font-medium text-blue-700 dark:text-blue-300 mb-2 flex items-center">
                              <Info className="w-4 h-4 mr-2" />
                              Additional Resources
                            </h4>
                            <ul className="space-y-2">
                              <li className="flex items-center space-x-2 text-sm text-blue-600 dark:text-blue-400">
                                <FileText className="w-4 h-4" />
                                <span>Downloadable PDF Guide</span>
                              </li>
                              <li className="flex items-center space-x-2 text-sm text-blue-600 dark:text-blue-400">
                                <Book className="w-4 h-4" />
                                <span>Related Documentation</span>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <>
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                        Video Tutorials
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {tutorials.map((tutorial) => (
                          <div
                            key={tutorial.id}
                            onClick={() => setActiveTutorial(tutorial.id)}
                            className="bg-gray-50 dark:bg-gray-700 rounded-xl overflow-hidden cursor-pointer hover:shadow-md transition-shadow duration-200"
                          >
                            <div className="aspect-video bg-gray-200 dark:bg-gray-600 relative">
                              <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-12 h-12 bg-white/80 dark:bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center">
                                  <Play className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                                </div>
                              </div>
                              <img
                                src={tutorial.thumbnail}
                                alt={tutorial.title}
                                className="w-full h-full object-cover"
                              />
                              <div className="absolute bottom-2 right-2 px-2 py-1 bg-black/70 text-white text-xs rounded">
                                {tutorial.duration}
                              </div>
                            </div>
                            <div className="p-4">
                              <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                                {tutorial.title}
                              </h4>
                              <p className="text-sm text-gray-600 dark:text-gray-300">
                                {tutorial.description}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>

                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 mt-8">
                        Written Guides
                      </h3>
                      <div className="space-y-3">
                        {[
                          { title: 'Complete User Guide', icon: Book, description: 'Comprehensive documentation of all features' },
                          { title: 'Trip Planning Best Practices', icon: Lightbulb, description: 'Tips and tricks for creating the perfect itinerary' },
                          { title: 'Troubleshooting Common Issues', icon: Settings, description: 'Solutions to frequently encountered problems' },
                          { title: 'Account Management Guide', icon: User, description: 'How to manage your profile, subscription, and preferences' }
                        ].map((guide, index) => (
                          <div
                            key={index}
                            className="flex items-start space-x-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-200 cursor-pointer"
                          >
                            <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900/30 rounded-lg flex items-center justify-center">
                              <guide.icon className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                            </div>
                            <div>
                              <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                                {guide.title}
                              </h4>
                              <p className="text-sm text-gray-600 dark:text-gray-300">
                                {guide.description}
                              </p>
                            </div>
                            <ArrowRight className="w-5 h-5 text-gray-400 ml-auto" />
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                </motion.div>
              )}

              {/* Interactive Tour Tab */}
              {activeTab === 'tour' && (
                <motion.div
                  key="tour"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="p-6 space-y-6"
                >
                  <div className="bg-gradient-to-r from-primary-50 to-secondary-50 dark:from-primary-900/20 dark:to-secondary-900/20 rounded-xl p-6 text-center">
                    <Compass className="w-16 h-16 text-primary-500 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                      Interactive Product Tour
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-md mx-auto">
                      Take a guided tour of WanderWise AI and discover all the powerful features to enhance your travel planning.
                    </p>
                    <Button onClick={startTour}>
                      Start Tour
                    </Button>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                      Tour Highlights
                    </h3>
                    <div className="space-y-4">
                      {tourSteps.map((step, index) => (
                        <div
                          key={index}
                          className={`p-4 border-l-4 ${
                            showTourHighlight && index === 0
                              ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                              : 'border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700'
                          } rounded-r-xl`}
                        >
                          <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                            {index + 1}. {step.title}
                          </h4>
                          <p className="text-sm text-gray-600 dark:text-gray-300">
                            {step.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-xl p-4">
                    <div className="flex items-start space-x-3">
                      <AlertTriangle className="w-5 h-5 text-yellow-600 dark:text-yellow-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-yellow-800 dark:text-yellow-300 mb-1">
                          Note
                        </h4>
                        <p className="text-sm text-yellow-700 dark:text-yellow-400">
                          The interactive tour works best on desktop devices. Some features may be limited on mobile.
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </div>
  );
}