import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Globe, Users, MessageCircle, CreditCard, Calendar, Shield,
  Volume2, Download, Bookmark, AlertTriangle, Phone, MapPin,
  Camera, Shirt, HandHeart, DollarSign, Clock, Info,
  ChevronDown, ChevronUp, Play, Pause, Copy, Check
} from 'lucide-react';
import { Button } from '../ui/Button';

interface CulturalData {
  destination: string;
  dosAndDonts: {
    dos: string[];
    donts: string[];
    religious: string[];
    photography: string[];
    dressCodes: Array<{
      situation: string;
      requirements: string;
      tips: string;
    }>;
  };
  communication: {
    essentialPhrases: Array<{
      english: string;
      local: string;
      pronunciation: string;
      context: string;
    }>;
    greetings: Array<{
      situation: string;
      phrase: string;
      pronunciation: string;
      response: string;
    }>;
    emergency: Array<{
      situation: string;
      phrase: string;
      number: string;
    }>;
    nonVerbal: string[];
  };
  payment: {
    currency: string;
    exchangeTips: string[];
    tipping: Array<{
      service: string;
      amount: string;
      notes: string;
    }>;
    bargaining: {
      appropriate: string[];
      strategies: string[];
      phrases: string[];
    };
    scams: Array<{
      type: string;
      description: string;
      prevention: string;
    }>;
  };
  calendar: {
    holidays: Array<{
      date: string;
      name: string;
      significance: string;
      impact: string;
    }>;
    businessHours: {
      general: string;
      restaurants: string;
      shops: string;
      attractions: string;
    };
    seasonalCustoms: Array<{
      season: string;
      customs: string[];
      considerations: string[];
    }>;
  };
  safety: {
    emergencyNumbers: Array<{
      service: string;
      number: string;
      notes: string;
    }>;
    embassy: {
      address: string;
      phone: string;
      email: string;
      hours: string;
    };
    commonConcerns: Array<{
      concern: string;
      prevention: string[];
      response: string;
    }>;
    healthTips: string[];
  };
}

interface CulturalIntelligencePanelProps {
  destination: string;
  culturalData: CulturalData;
}

export function CulturalIntelligencePanel({ destination, culturalData }: CulturalIntelligencePanelProps) {
  const [activeTab, setActiveTab] = useState<'customs' | 'communication' | 'payment' | 'calendar' | 'safety'>('customs');
  const [playingPhrase, setPlayingPhrase] = useState<string | null>(null);
  const [copiedText, setCopiedText] = useState<string | null>(null);
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set());

  const tabs = [
    { id: 'customs', label: 'Cultural Customs', icon: Users },
    { id: 'communication', label: 'Communication', icon: MessageCircle },
    { id: 'payment', label: 'Payment & Money', icon: CreditCard },
    { id: 'calendar', label: 'Local Calendar', icon: Calendar },
    { id: 'safety', label: 'Safety & Emergency', icon: Shield },
  ];

  const playPronunciation = (text: string) => {
    if ('speechSynthesis' in window) {
      setPlayingPhrase(text);
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.8;
      utterance.onend = () => setPlayingPhrase(null);
      speechSynthesis.speak(utterance);
    }
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedText(text);
      setTimeout(() => setCopiedText(null), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const toggleSection = (sectionId: string) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(sectionId)) {
      newExpanded.delete(sectionId);
    } else {
      newExpanded.add(sectionId);
    }
    setExpandedSections(newExpanded);
  };

  const downloadCheatSheet = () => {
    // Implementation for downloading cultural cheat sheet
    console.log('Downloading cultural cheat sheet...');
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-6 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
              <Globe className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">Cultural Intelligence</h2>
              <p className="text-purple-100">{destination} - Essential Local Insights</p>
            </div>
          </div>
          
          <div className="flex space-x-3">
            <Button
              onClick={downloadCheatSheet}
              variant="outline"
              className="border-white/30 text-white hover:bg-white/10"
            >
              <Download className="w-4 h-4 mr-2" />
              Download Guide
            </Button>
            <Button
              variant="outline"
              className="border-white/30 text-white hover:bg-white/10"
            >
              <Bookmark className="w-4 h-4 mr-2" />
              Save Offline
            </Button>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-gray-200 dark:border-gray-700">
        <nav className="flex space-x-8 px-6 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center space-x-2 py-4 px-2 border-b-2 font-medium text-sm transition-colors duration-200 whitespace-nowrap ${
                activeTab === tab.id
                  ? 'border-purple-500 text-purple-600 dark:text-purple-400'
                  : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="p-6">
        <AnimatePresence mode="wait">
          {/* Cultural Customs Tab */}
          {activeTab === 'customs' && (
            <motion.div
              key="customs"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              {/* Do's and Don'ts */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-green-800 dark:text-green-300 mb-4 flex items-center">
                    <HandHeart className="w-5 h-5 mr-2" />
                    Cultural Do's
                  </h3>
                  <ul className="space-y-2">
                    {culturalData.dosAndDonts.dos.map((item, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                        <span className="text-green-700 dark:text-green-200 text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-red-50 dark:bg-red-900/20 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-red-800 dark:text-red-300 mb-4 flex items-center">
                    <AlertTriangle className="w-5 h-5 mr-2" />
                    Cultural Don'ts
                  </h3>
                  <ul className="space-y-2">
                    {culturalData.dosAndDonts.donts.map((item, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0" />
                        <span className="text-red-700 dark:text-red-200 text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Religious Sensitivities */}
              <div className="bg-purple-50 dark:bg-purple-900/20 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-purple-800 dark:text-purple-300 mb-4">
                  Religious & Cultural Sensitivities
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {culturalData.dosAndDonts.religious.map((item, index) => (
                    <div key={index} className="flex items-start space-x-2">
                      <Info className="w-4 h-4 text-purple-600 mt-0.5 flex-shrink-0" />
                      <span className="text-purple-700 dark:text-purple-200 text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Photography Guidelines */}
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-300 mb-4 flex items-center">
                  <Camera className="w-5 h-5 mr-2" />
                  Photography Etiquette
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {culturalData.dosAndDonts.photography.map((item, index) => (
                    <div key={index} className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                      <span className="text-blue-700 dark:text-blue-200 text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Dress Codes */}
              <div className="bg-amber-50 dark:bg-amber-900/20 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-amber-800 dark:text-amber-300 mb-4 flex items-center">
                  <Shirt className="w-5 h-5 mr-2" />
                  Dress Code Guidelines
                </h3>
                <div className="space-y-4">
                  {culturalData.dosAndDonts.dressCodes.map((dress, index) => (
                    <div key={index} className="border-l-4 border-amber-400 pl-4">
                      <h4 className="font-medium text-amber-800 dark:text-amber-300">{dress.situation}</h4>
                      <p className="text-amber-700 dark:text-amber-200 text-sm mt-1">{dress.requirements}</p>
                      <p className="text-amber-600 dark:text-amber-300 text-xs mt-1 italic">{dress.tips}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* Communication Tab */}
          {activeTab === 'communication' && (
            <motion.div
              key="communication"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              {/* Essential Phrases */}
              <div className="bg-white dark:bg-gray-700 rounded-xl p-6 border border-gray-200 dark:border-gray-600">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Essential Phrases
                </h3>
                <div className="space-y-3">
                  {culturalData.communication.essentialPhrases.map((phrase, index) => (
                    <div key={index} className="bg-gray-50 dark:bg-gray-600 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-gray-900 dark:text-white">{phrase.english}</span>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => playPronunciation(phrase.local)}
                            className="p-1 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                          >
                            {playingPhrase === phrase.local ? (
                              <Pause className="w-4 h-4" />
                            ) : (
                              <Play className="w-4 h-4" />
                            )}
                          </button>
                          <button
                            onClick={() => copyToClipboard(phrase.local)}
                            className="p-1 text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-300"
                          >
                            {copiedText === phrase.local ? (
                              <Check className="w-4 h-4 text-green-500" />
                            ) : (
                              <Copy className="w-4 h-4" />
                            )}
                          </button>
                        </div>
                      </div>
                      <div className="text-lg font-semibold text-blue-600 dark:text-blue-400 mb-1">
                        {phrase.local}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                        Pronunciation: {phrase.pronunciation}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400 italic">
                        {phrase.context}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Greetings */}
              <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-green-800 dark:text-green-300 mb-4">
                  Greetings & Social Interactions
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {culturalData.communication.greetings.map((greeting, index) => (
                    <div key={index} className="bg-white dark:bg-gray-700 rounded-lg p-4">
                      <h4 className="font-medium text-gray-900 dark:text-white mb-2">{greeting.situation}</h4>
                      <div className="space-y-1 text-sm">
                        <div><strong>Say:</strong> {greeting.phrase}</div>
                        <div><strong>Sounds like:</strong> {greeting.pronunciation}</div>
                        <div><strong>Response:</strong> {greeting.response}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Emergency Phrases */}
              <div className="bg-red-50 dark:bg-red-900/20 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-red-800 dark:text-red-300 mb-4 flex items-center">
                  <AlertTriangle className="w-5 h-5 mr-2" />
                  Emergency Phrases
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {culturalData.communication.emergency.map((emergency, index) => (
                    <div key={index} className="bg-white dark:bg-gray-700 rounded-lg p-4 border-l-4 border-red-500">
                      <h4 className="font-medium text-gray-900 dark:text-white">{emergency.situation}</h4>
                      <div className="text-lg font-semibold text-red-600 dark:text-red-400 mt-1">
                        {emergency.phrase}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                        Emergency Number: {emergency.number}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Non-Verbal Communication */}
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-300 mb-4">
                  Non-Verbal Communication Tips
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {culturalData.communication.nonVerbal.map((tip, index) => (
                    <div key={index} className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                      <span className="text-blue-700 dark:text-blue-200 text-sm">{tip}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* Payment Tab */}
          {activeTab === 'payment' && (
            <motion.div
              key="payment"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              {/* Currency & Exchange */}
              <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-green-800 dark:text-green-300 mb-4 flex items-center">
                  <DollarSign className="w-5 h-5 mr-2" />
                  Currency: {culturalData.payment.currency}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {culturalData.payment.exchangeTips.map((tip, index) => (
                    <div key={index} className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                      <span className="text-green-700 dark:text-green-200 text-sm">{tip}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tipping Guidelines */}
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-300 mb-4">
                  Tipping Guidelines
                </h3>
                <div className="space-y-3">
                  {culturalData.payment.tipping.map((tip, index) => (
                    <div key={index} className="bg-white dark:bg-gray-700 rounded-lg p-4 flex justify-between items-start">
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-white">{tip.service}</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{tip.notes}</p>
                      </div>
                      <span className="text-lg font-semibold text-blue-600 dark:text-blue-400 ml-4">
                        {tip.amount}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bargaining Culture */}
              <div className="bg-purple-50 dark:bg-purple-900/20 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-purple-800 dark:text-purple-300 mb-4">
                  Bargaining & Negotiation
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-purple-700 dark:text-purple-300 mb-2">Where Bargaining is Appropriate:</h4>
                    <div className="flex flex-wrap gap-2">
                      {culturalData.payment.bargaining.appropriate.map((place, index) => (
                        <span key={index} className="px-3 py-1 bg-purple-100 dark:bg-purple-800 text-purple-700 dark:text-purple-300 text-sm rounded-full">
                          {place}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-purple-700 dark:text-purple-300 mb-2">Bargaining Strategies:</h4>
                    <ul className="space-y-1">
                      {culturalData.payment.bargaining.strategies.map((strategy, index) => (
                        <li key={index} className="flex items-start space-x-2">
                          <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0" />
                          <span className="text-purple-700 dark:text-purple-200 text-sm">{strategy}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-medium text-purple-700 dark:text-purple-300 mb-2">Useful Phrases:</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {culturalData.payment.bargaining.phrases.map((phrase, index) => (
                        <div key={index} className="bg-white dark:bg-gray-700 rounded p-2 text-sm">
                          {phrase}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Common Scams */}
              <div className="bg-red-50 dark:bg-red-900/20 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-red-800 dark:text-red-300 mb-4 flex items-center">
                  <AlertTriangle className="w-5 h-5 mr-2" />
                  Common Scams to Avoid
                </h3>
                <div className="space-y-4">
                  {culturalData.payment.scams.map((scam, index) => (
                    <div key={index} className="bg-white dark:bg-gray-700 rounded-lg p-4 border-l-4 border-red-500">
                      <h4 className="font-medium text-gray-900 dark:text-white mb-2">{scam.type}</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">{scam.description}</p>
                      <p className="text-sm text-red-700 dark:text-red-300 font-medium">
                        Prevention: {scam.prevention}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* Calendar Tab */}
          {activeTab === 'calendar' && (
            <motion.div
              key="calendar"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              {/* Holidays & Festivals */}
              <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-yellow-800 dark:text-yellow-300 mb-4 flex items-center">
                  <Calendar className="w-5 h-5 mr-2" />
                  Holidays & Festivals During Your Visit
                </h3>
                <div className="space-y-4">
                  {culturalData.calendar.holidays.map((holiday, index) => (
                    <div key={index} className="bg-white dark:bg-gray-700 rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-medium text-gray-900 dark:text-white">{holiday.name}</h4>
                        <span className="text-sm text-gray-600 dark:text-gray-300">{holiday.date}</span>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">{holiday.significance}</p>
                      <p className="text-sm text-yellow-700 dark:text-yellow-300 font-medium">
                        Travel Impact: {holiday.impact}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Business Hours */}
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-300 mb-4 flex items-center">
                  <Clock className="w-5 h-5 mr-2" />
                  Typical Business Hours
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white dark:bg-gray-700 rounded-lg p-4">
                    <h4 className="font-medium text-gray-900 dark:text-white mb-2">General Business</h4>
                    <p className="text-blue-700 dark:text-blue-300">{culturalData.calendar.businessHours.general}</p>
                  </div>
                  <div className="bg-white dark:bg-gray-700 rounded-lg p-4">
                    <h4 className="font-medium text-gray-900 dark:text-white mb-2">Restaurants</h4>
                    <p className="text-blue-700 dark:text-blue-300">{culturalData.calendar.businessHours.restaurants}</p>
                  </div>
                  <div className="bg-white dark:bg-gray-700 rounded-lg p-4">
                    <h4 className="font-medium text-gray-900 dark:text-white mb-2">Shops & Markets</h4>
                    <p className="text-blue-700 dark:text-blue-300">{culturalData.calendar.businessHours.shops}</p>
                  </div>
                  <div className="bg-white dark:bg-gray-700 rounded-lg p-4">
                    <h4 className="font-medium text-gray-900 dark:text-white mb-2">Tourist Attractions</h4>
                    <p className="text-blue-700 dark:text-blue-300">{culturalData.calendar.businessHours.attractions}</p>
                  </div>
                </div>
              </div>

              {/* Seasonal Customs */}
              <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-green-800 dark:text-green-300 mb-4">
                  Seasonal Customs & Considerations
                </h3>
                <div className="space-y-4">
                  {culturalData.calendar.seasonalCustoms.map((season, index) => (
                    <div key={index} className="bg-white dark:bg-gray-700 rounded-lg p-4">
                      <h4 className="font-medium text-gray-900 dark:text-white mb-3">{season.season}</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <h5 className="text-sm font-medium text-green-700 dark:text-green-300 mb-2">Customs:</h5>
                          <ul className="space-y-1">
                            {season.customs.map((custom, idx) => (
                              <li key={idx} className="text-sm text-gray-600 dark:text-gray-300 flex items-start space-x-2">
                                <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                                <span>{custom}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h5 className="text-sm font-medium text-green-700 dark:text-green-300 mb-2">Considerations:</h5>
                          <ul className="space-y-1">
                            {season.considerations.map((consideration, idx) => (
                              <li key={idx} className="text-sm text-gray-600 dark:text-gray-300 flex items-start space-x-2">
                                <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                                <span>{consideration}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* Safety Tab */}
          {activeTab === 'safety' && (
            <motion.div
              key="safety"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              {/* Emergency Numbers */}
              <div className="bg-red-50 dark:bg-red-900/20 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-red-800 dark:text-red-300 mb-4 flex items-center">
                  <Phone className="w-5 h-5 mr-2" />
                  Emergency Contact Numbers
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {culturalData.safety.emergencyNumbers.map((emergency, index) => (
                    <div key={index} className="bg-white dark:bg-gray-700 rounded-lg p-4 border-l-4 border-red-500">
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-medium text-gray-900 dark:text-white">{emergency.service}</h4>
                        <span className="text-xl font-bold text-red-600 dark:text-red-400">{emergency.number}</span>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-300">{emergency.notes}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Embassy Information */}
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-300 mb-4 flex items-center">
                  <MapPin className="w-5 h-5 mr-2" />
                  Embassy/Consulate Information
                </h3>
                <div className="bg-white dark:bg-gray-700 rounded-lg p-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white mb-2">Contact Information</h4>
                      <div className="space-y-2 text-sm">
                        <div><strong>Phone:</strong> {culturalData.safety.embassy.phone}</div>
                        <div><strong>Email:</strong> {culturalData.safety.embassy.email}</div>
                        <div><strong>Hours:</strong> {culturalData.safety.embassy.hours}</div>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white mb-2">Address</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300">{culturalData.safety.embassy.address}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Common Safety Concerns */}
              <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-yellow-800 dark:text-yellow-300 mb-4 flex items-center">
                  <Shield className="w-5 h-5 mr-2" />
                  Common Safety Concerns
                </h3>
                <div className="space-y-4">
                  {culturalData.safety.commonConcerns.map((concern, index) => (
                    <div key={index} className="bg-white dark:bg-gray-700 rounded-lg p-4">
                      <h4 className="font-medium text-gray-900 dark:text-white mb-2">{concern.concern}</h4>
                      <div className="mb-3">
                        <h5 className="text-sm font-medium text-yellow-700 dark:text-yellow-300 mb-1">Prevention:</h5>
                        <ul className="space-y-1">
                          {concern.prevention.map((tip, idx) => (
                            <li key={idx} className="text-sm text-gray-600 dark:text-gray-300 flex items-start space-x-2">
                              <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full mt-2 flex-shrink-0" />
                              <span>{tip}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h5 className="text-sm font-medium text-yellow-700 dark:text-yellow-300 mb-1">If it happens:</h5>
                        <p className="text-sm text-gray-600 dark:text-gray-300">{concern.response}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Health Tips */}
              <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-green-800 dark:text-green-300 mb-4">
                  Health & Medical Considerations
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {culturalData.safety.healthTips.map((tip, index) => (
                    <div key={index} className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                      <span className="text-green-700 dark:text-green-200 text-sm">{tip}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}