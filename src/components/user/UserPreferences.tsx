import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Settings, Moon, Sun, DollarSign, Globe, Bell, 
  Lock, User, Save, X, Check, Trash2, Download, 
  Upload, Eye, EyeOff, LogOut, Heart, Bookmark, 
  Clock, Calendar, MapPin, Languages, CreditCard
} from 'lucide-react';
import { Button } from '../ui/Button';
import { useTravelContext } from '../../context/TravelContext';

interface UserPreferencesProps {
  onClose: () => void;
}

export function UserPreferences({ onClose }: UserPreferencesProps) {
  const { state, dispatch } = useTravelContext();
  const [activeTab, setActiveTab] = useState<'general' | 'privacy' | 'account' | 'history'>('general');
  const [preferences, setPreferences] = useState({
    theme: state.preferences.theme,
    currency: state.preferences.currency,
    language: state.preferences.language,
    notifications: {
      email: true,
      push: true,
      marketing: false,
      tripReminders: true,
      priceAlerts: true
    },
    privacy: {
      shareData: false,
      locationTracking: true,
      searchHistory: true,
      personalizedRecommendations: true
    },
    accessibility: {
      highContrast: false,
      largeText: false,
      reducedMotion: false
    }
  });
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const tabs = [
    { id: 'general', label: 'General', icon: Settings },
    { id: 'privacy', label: 'Privacy & Data', icon: Lock },
    { id: 'account', label: 'Account', icon: User },
    { id: 'history', label: 'History & Saved', icon: Clock }
  ];

  const currencies = [
    { code: 'USD', symbol: '$', name: 'US Dollar' },
    { code: 'EUR', symbol: '€', name: 'Euro' },
    { code: 'GBP', symbol: '£', name: 'British Pound' },
    { code: 'JPY', symbol: '¥', name: 'Japanese Yen' },
    { code: 'AUD', symbol: 'A$', name: 'Australian Dollar' },
    { code: 'CAD', symbol: 'C$', name: 'Canadian Dollar' }
  ];

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'es', name: 'Spanish' },
    { code: 'fr', name: 'French' },
    { code: 'de', name: 'German' },
    { code: 'it', name: 'Italian' },
    { code: 'ja', name: 'Japanese' },
    { code: 'zh', name: 'Chinese' }
  ];

  const savedTrips = [
    {
      id: '1',
      title: 'European Adventure',
      destination: 'Paris, Rome, Barcelona',
      date: '2024-06-15',
      image: 'https://images.pexels.com/photos/338515/pexels-photo-338515.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=2'
    },
    {
      id: '2',
      title: 'Tokyo Discovery',
      destination: 'Tokyo, Kyoto, Osaka',
      date: '2024-03-10',
      image: 'https://images.pexels.com/photos/2506923/pexels-photo-2506923.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=2'
    }
  ];

  const favoriteDestinations = [
    {
      id: '1',
      name: 'Paris, France',
      image: 'https://images.pexels.com/photos/338515/pexels-photo-338515.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=2'
    },
    {
      id: '2',
      name: 'Bali, Indonesia',
      image: 'https://images.pexels.com/photos/2474690/pexels-photo-2474690.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=2'
    },
    {
      id: '3',
      name: 'Santorini, Greece',
      image: 'https://images.pexels.com/photos/1285625/pexels-photo-1285625.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=2'
    }
  ];

  const recentSearches = [
    'Paris vacation',
    'Budget travel Asia',
    'Family-friendly resorts',
    'Digital nomad destinations',
    'Sustainable travel'
  ];

  const handleSavePreferences = async () => {
    setIsSaving(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Update global state
      dispatch({ 
        type: 'UPDATE_PREFERENCES', 
        payload: {
          theme: preferences.theme,
          currency: preferences.currency,
          language: preferences.language
        }
      });
      
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (error) {
      console.error('Failed to save preferences:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const toggleTheme = () => {
    const newTheme = preferences.theme === 'light' ? 'dark' : 'light';
    setPreferences(prev => ({ ...prev, theme: newTheme }));
    dispatch({ type: 'TOGGLE_THEME' });
  };

  const clearSearchHistory = () => {
    // Implementation would clear search history
    console.log('Clearing search history...');
  };

  const exportUserData = () => {
    // Implementation would export user data
    console.log('Exporting user data...');
  };

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
                <Settings className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">User Preferences</h2>
                <p className="text-white/90">Customize your WanderWise experience</p>
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

            <div className="p-4 mt-8">
              <div className="p-4 bg-primary-50 dark:bg-primary-900/20 rounded-xl">
                <h3 className="font-medium text-primary-700 dark:text-primary-300 mb-2">
                  Pro Tip
                </h3>
                <p className="text-sm text-primary-600 dark:text-primary-400">
                  Customize your preferences to get personalized travel recommendations and a better experience.
                </p>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 overflow-y-auto">
            <AnimatePresence mode="wait">
              {/* General Preferences Tab */}
              {activeTab === 'general' && (
                <motion.div
                  key="general"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="p-6 space-y-6"
                >
                  {/* Theme */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                      Appearance
                    </h3>
                    <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
                      <div className="flex items-center space-x-3">
                        {preferences.theme === 'light' ? (
                          <Sun className="w-5 h-5 text-yellow-500" />
                        ) : (
                          <Moon className="w-5 h-5 text-blue-500" />
                        )}
                        <span className="text-gray-900 dark:text-white">
                          {preferences.theme === 'light' ? 'Light Mode' : 'Dark Mode'}
                        </span>
                      </div>
                      <button
                        onClick={toggleTheme}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ${
                          preferences.theme === 'dark' ? 'bg-primary-600' : 'bg-gray-300 dark:bg-gray-600'
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
                            preferences.theme === 'dark' ? 'translate-x-6' : 'translate-x-1'
                          }`}
                        />
                      </button>
                    </div>
                  </div>

                  {/* Currency */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                      Currency
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {currencies.map((currency) => (
                        <div
                          key={currency.code}
                          onClick={() => setPreferences(prev => ({ ...prev, currency: currency.code }))}
                          className={`flex items-center justify-between p-3 rounded-lg cursor-pointer ${
                            preferences.currency === currency.code
                              ? 'bg-primary-50 dark:bg-primary-900/20 border-2 border-primary-500'
                              : 'bg-gray-50 dark:bg-gray-700 border-2 border-transparent hover:border-gray-300 dark:hover:border-gray-600'
                          }`}
                        >
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-gray-200 dark:bg-gray-600 rounded-full flex items-center justify-center font-semibold">
                              {currency.symbol}
                            </div>
                            <div>
                              <div className="font-medium text-gray-900 dark:text-white">
                                {currency.code}
                              </div>
                              <div className="text-xs text-gray-500 dark:text-gray-400">
                                {currency.name}
                              </div>
                            </div>
                          </div>
                          {preferences.currency === currency.code && (
                            <Check className="w-5 h-5 text-primary-500" />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Language */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                      Language
                    </h3>
                    <select
                      value={preferences.language}
                      onChange={(e) => setPreferences(prev => ({ ...prev, language: e.target.value }))}
                      className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 text-gray-900 dark:text-white"
                    >
                      {languages.map((language) => (
                        <option key={language.code} value={language.code}>
                          {language.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Notifications */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                      Notifications
                    </h3>
                    <div className="space-y-3">
                      {[
                        { id: 'email', label: 'Email Notifications', description: 'Receive updates and alerts via email' },
                        { id: 'push', label: 'Push Notifications', description: 'Receive alerts on your device' },
                        { id: 'tripReminders', label: 'Trip Reminders', description: 'Get reminders about upcoming trips' },
                        { id: 'priceAlerts', label: 'Price Alerts', description: 'Be notified of price drops for saved destinations' },
                        { id: 'marketing', label: 'Marketing Communications', description: 'Receive news and special offers' }
                      ].map((notification) => (
                        <div key={notification.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                          <div>
                            <div className="font-medium text-gray-900 dark:text-white">
                              {notification.label}
                            </div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">
                              {notification.description}
                            </div>
                          </div>
                          <button
                            onClick={() => setPreferences(prev => ({
                              ...prev,
                              notifications: {
                                ...prev.notifications,
                                [notification.id]: !prev.notifications[notification.id as keyof typeof prev.notifications]
                              }
                            }))}
                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ${
                              preferences.notifications[notification.id as keyof typeof preferences.notifications]
                                ? 'bg-primary-600'
                                : 'bg-gray-300 dark:bg-gray-600'
                            }`}
                          >
                            <span
                              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
                                preferences.notifications[notification.id as keyof typeof preferences.notifications]
                                  ? 'translate-x-6'
                                  : 'translate-x-1'
                              }`}
                            />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Accessibility */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                      Accessibility
                    </h3>
                    <div className="space-y-3">
                      {[
                        { id: 'highContrast', label: 'High Contrast Mode', description: 'Increase contrast for better visibility' },
                        { id: 'largeText', label: 'Larger Text', description: 'Increase text size throughout the app' },
                        { id: 'reducedMotion', label: 'Reduced Motion', description: 'Minimize animations and transitions' }
                      ].map((feature) => (
                        <div key={feature.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                          <div>
                            <div className="font-medium text-gray-900 dark:text-white">
                              {feature.label}
                            </div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">
                              {feature.description}
                            </div>
                          </div>
                          <button
                            onClick={() => setPreferences(prev => ({
                              ...prev,
                              accessibility: {
                                ...prev.accessibility,
                                [feature.id]: !prev.accessibility[feature.id as keyof typeof prev.accessibility]
                              }
                            }))}
                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ${
                              preferences.accessibility[feature.id as keyof typeof preferences.accessibility]
                                ? 'bg-primary-600'
                                : 'bg-gray-300 dark:bg-gray-600'
                            }`}
                          >
                            <span
                              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
                                preferences.accessibility[feature.id as keyof typeof preferences.accessibility]
                                  ? 'translate-x-6'
                                  : 'translate-x-1'
                              }`}
                            />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Privacy & Data Tab */}
              {activeTab === 'privacy' && (
                <motion.div
                  key="privacy"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="p-6 space-y-6"
                >
                  {/* Privacy Settings */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                      Privacy Settings
                    </h3>
                    <div className="space-y-3">
                      {[
                        { id: 'shareData', label: 'Share Usage Data', description: 'Help us improve by sharing anonymous usage data' },
                        { id: 'locationTracking', label: 'Location Tracking', description: 'Allow location tracking for better recommendations' },
                        { id: 'searchHistory', label: 'Save Search History', description: 'Save your searches for faster access' },
                        { id: 'personalizedRecommendations', label: 'Personalized Recommendations', description: 'Receive tailored suggestions based on your preferences' }
                      ].map((setting) => (
                        <div key={setting.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                          <div>
                            <div className="font-medium text-gray-900 dark:text-white">
                              {setting.label}
                            </div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">
                              {setting.description}
                            </div>
                          </div>
                          <button
                            onClick={() => setPreferences(prev => ({
                              ...prev,
                              privacy: {
                                ...prev.privacy,
                                [setting.id]: !prev.privacy[setting.id as keyof typeof prev.privacy]
                              }
                            }))}
                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ${
                              preferences.privacy[setting.id as keyof typeof preferences.privacy]
                                ? 'bg-primary-600'
                                : 'bg-gray-300 dark:bg-gray-600'
                            }`}
                          >
                            <span
                              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
                                preferences.privacy[setting.id as keyof typeof preferences.privacy]
                                  ? 'translate-x-6'
                                  : 'translate-x-1'
                              }`}
                            />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Data Management */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                      Data Management
                    </h3>
                    <div className="space-y-3">
                      <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
                        <div className="flex items-center justify-between mb-3">
                          <div className="font-medium text-gray-900 dark:text-white">
                            Search History
                          </div>
                          <Button
                            onClick={clearSearchHistory}
                            variant="outline"
                            size="sm"
                          >
                            <Trash2 className="w-4 h-4 mr-2" />
                            Clear
                          </Button>
                        </div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Clear your search history and remove all saved searches.
                        </p>
                      </div>

                      <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
                        <div className="flex items-center justify-between mb-3">
                          <div className="font-medium text-gray-900 dark:text-white">
                            Export Your Data
                          </div>
                          <Button
                            onClick={exportUserData}
                            variant="outline"
                            size="sm"
                          >
                            <Download className="w-4 h-4 mr-2" />
                            Export
                          </Button>
                        </div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Download a copy of all your data including trips, preferences, and saved items.
                        </p>
                      </div>

                      <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-xl">
                        <div className="flex items-center justify-between mb-3">
                          <div className="font-medium text-red-700 dark:text-red-400">
                            Delete Account
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-red-300 text-red-700 hover:bg-red-100"
                          >
                            <Trash2 className="w-4 h-4 mr-2" />
                            Delete
                          </Button>
                        </div>
                        <p className="text-sm text-red-600 dark:text-red-300">
                          Permanently delete your account and all associated data. This action cannot be undone.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Privacy Policy */}
                  <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
                    <h3 className="font-medium text-blue-700 dark:text-blue-400 mb-2">
                      Privacy Policy
                    </h3>
                    <p className="text-sm text-blue-600 dark:text-blue-300 mb-3">
                      We take your privacy seriously. Read our full privacy policy to understand how we collect, use, and protect your data.
                    </p>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-blue-300 text-blue-700 hover:bg-blue-100"
                    >
                      View Privacy Policy
                    </Button>
                  </div>
                </motion.div>
              )}

              {/* Account Tab */}
              {activeTab === 'account' && (
                <motion.div
                  key="account"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="p-6 space-y-6"
                >
                  {/* Profile Information */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                      Profile Information
                    </h3>
                    <div className="flex items-center space-x-4 mb-6">
                      <div className="relative">
                        <img
                          src="https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2"
                          alt="Profile"
                          className="w-20 h-20 rounded-full object-cover"
                        />
                        <button className="absolute bottom-0 right-0 p-1 bg-primary-500 rounded-full text-white">
                          <Upload className="w-4 h-4" />
                        </button>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white">
                          Sarah Chen
                        </h4>
                        <p className="text-gray-500 dark:text-gray-400 text-sm">
                          sarah.chen@email.com
                        </p>
                        <p className="text-gray-500 dark:text-gray-400 text-sm">
                          Member since June 2023
                        </p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Full Name
                        </label>
                        <input
                          type="text"
                          defaultValue="Sarah Chen"
                          className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 text-gray-900 dark:text-white"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Email Address
                        </label>
                        <input
                          type="email"
                          defaultValue="sarah.chen@email.com"
                          className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 text-gray-900 dark:text-white"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          defaultValue="+1 (555) 123-4567"
                          className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 text-gray-900 dark:text-white"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Password */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                      Password
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Current Password
                        </label>
                        <div className="relative">
                          <input
                            type="password"
                            defaultValue="••••••••"
                            className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 text-gray-900 dark:text-white"
                          />
                          <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                            <Eye className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          New Password
                        </label>
                        <div className="relative">
                          <input
                            type="password"
                            placeholder="Enter new password"
                            className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 text-gray-900 dark:text-white"
                          />
                          <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                            <EyeOff className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Confirm New Password
                        </label>
                        <input
                          type="password"
                          placeholder="Confirm new password"
                          className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 text-gray-900 dark:text-white"
                        />
                      </div>
                      
                      <Button variant="outline" size="sm">
                        Update Password
                      </Button>
                    </div>
                  </div>

                  {/* Subscription */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                      Subscription
                    </h3>
                    <div className="p-4 bg-gradient-to-r from-primary-50 to-secondary-50 dark:from-primary-900/20 dark:to-secondary-900/20 rounded-xl">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <span className="px-3 py-1 bg-primary-500 text-white text-xs font-medium rounded-full">
                            Current Plan
                          </span>
                          <h4 className="text-lg font-semibold text-gray-900 dark:text-white mt-1">
                            Explorer (Free)
                          </h4>
                        </div>
                        <Button>
                          Upgrade
                        </Button>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                        You're currently on the free plan with limited features. Upgrade to unlock premium features.
                      </p>
                      <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                        <CreditCard className="w-4 h-4" />
                        <span>No payment method on file</span>
                      </div>
                    </div>
                  </div>

                  {/* Account Actions */}
                  <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                    <Button
                      variant="outline"
                      className="w-full justify-start text-red-600 border-red-300 hover:bg-red-50"
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Sign Out
                    </Button>
                  </div>
                </motion.div>
              )}

              {/* History & Saved Tab */}
              {activeTab === 'history' && (
                <motion.div
                  key="history"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="p-6 space-y-6"
                >
                  {/* Saved Trips */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                      Saved Trips
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {savedTrips.map((trip) => (
                        <div key={trip.id} className="bg-gray-50 dark:bg-gray-700 rounded-xl overflow-hidden">
                          <div className="relative h-32">
                            <img
                              src={trip.image}
                              alt={trip.title}
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute top-2 right-2">
                              <button className="p-1 bg-white/80 backdrop-blur-sm rounded-full text-red-500 hover:text-red-700">
                                <Heart className="w-4 h-4 fill-current" />
                              </button>
                            </div>
                          </div>
                          <div className="p-4">
                            <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                              {trip.title}
                            </h4>
                            <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400 mb-3">
                              <MapPin className="w-4 h-4" />
                              <span>{trip.destination}</span>
                            </div>
                            <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                              <Calendar className="w-4 h-4" />
                              <span>{new Date(trip.date).toLocaleDateString()}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Favorite Destinations */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                      Favorite Destinations
                    </h3>
                    <div className="flex space-x-4 overflow-x-auto pb-2">
                      {favoriteDestinations.map((destination) => (
                        <div key={destination.id} className="flex-shrink-0 w-40">
                          <div className="relative h-32 w-full rounded-lg overflow-hidden">
                            <img
                              src={destination.image}
                              alt={destination.name}
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                            <div className="absolute bottom-2 left-2 right-2">
                              <div className="text-white font-medium text-sm">
                                {destination.name}
                              </div>
                            </div>
                            <div className="absolute top-2 right-2">
                              <button className="p-1 bg-white/80 backdrop-blur-sm rounded-full text-red-500 hover:text-red-700">
                                <Heart className="w-4 h-4 fill-current" />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Recent Searches */}
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        Recent Searches
                      </h3>
                      <button
                        onClick={clearSearchHistory}
                        className="text-sm text-gray-500 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400"
                      >
                        Clear All
                      </button>
                    </div>
                    <div className="space-y-2">
                      {recentSearches.map((search, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
                        >
                          <div className="flex items-center space-x-3">
                            <Clock className="w-4 h-4 text-gray-400" />
                            <span className="text-gray-700 dark:text-gray-300">
                              {search}
                            </span>
                          </div>
                          <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Browsing History */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                      Browsing History
                    </h3>
                    <div className="space-y-2">
                      {[
                        { title: 'Paris, France', type: 'Destination', time: '2 hours ago' },
                        { title: 'The Ultimate Guide to Solo Travel', type: 'Guide', time: 'Yesterday' },
                        { title: 'Budget Travel Hacks for 2024', type: 'Blog', time: '3 days ago' }
                      ].map((item, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
                        >
                          <div>
                            <div className="font-medium text-gray-900 dark:text-white">
                              {item.title}
                            </div>
                            <div className="flex items-center space-x-2 text-xs text-gray-500 dark:text-gray-400">
                              <span>{item.type}</span>
                              <span>•</span>
                              <span>{item.time}</span>
                            </div>
                          </div>
                          <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 flex justify-between items-center">
          <div>
            {saveSuccess && (
              <span className="text-green-600 dark:text-green-400 flex items-center">
                <Check className="w-4 h-4 mr-1" />
                Preferences saved successfully
              </span>
            )}
          </div>
          <div className="flex space-x-3">
            <Button onClick={onClose} variant="outline">
              Cancel
            </Button>
            <Button
              onClick={handleSavePreferences}
              disabled={isSaving}
            >
              {isSaving ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  Save Preferences
                </>
              )}
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}