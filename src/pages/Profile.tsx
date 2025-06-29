import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Phone, MapPin, Calendar, Camera, Edit, Save, X, Globe, Heart, Star } from 'lucide-react';
import { Button } from '../components/ui/Button';

export function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: 'Sarah Chen',
    email: 'sarah.chen@email.com',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    bio: 'Digital nomad and travel enthusiast. Love exploring new cultures and hidden gems around the world.',
    joinDate: '2023-06-15',
    avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&dpr=2',
    preferences: {
      travelStyle: 'Adventure',
      budget: 'Comfort',
      interests: ['Culture', 'Food', 'Photography', 'Nature'],
      languages: ['English', 'Spanish', 'Mandarin'],
    },
    stats: {
      tripsPlanned: 12,
      countriesVisited: 23,
      totalDays: 156,
      favoriteDestination: 'Tokyo, Japan',
    },
  });

  const handleSave = () => {
    setIsEditing(false);
    // Here you would typically save to backend
  };

  const handleCancel = () => {
    setIsEditing(false);
    // Reset form data if needed
  };

  const travelStyles = ['Backpacker', 'Budget', 'Comfort', 'Luxury'];
  const budgetRanges = ['Budget', 'Comfort', 'Luxury', 'Ultra-Luxury'];
  const availableInterests = ['Culture', 'Adventure', 'Food', 'History', 'Nature', 'Photography', 'Art', 'Nightlife', 'Shopping', 'Relaxation'];

  return (
    <div className="min-h-screen pt-16 bg-white dark:bg-gray-900">
      {/* Header */}
      <section className="py-16 bg-gradient-to-r from-primary-50 to-secondary-50 dark:from-gray-800 dark:to-gray-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="relative inline-block mb-6">
              <img
                src={profileData.avatar}
                alt={profileData.name}
                className="w-32 h-32 rounded-full object-cover shadow-lg"
              />
              <button className="absolute bottom-2 right-2 w-10 h-10 bg-primary-500 rounded-full flex items-center justify-center text-white hover:bg-primary-600 transition-colors duration-200">
                <Camera className="w-5 h-5" />
              </button>
            </div>
            
            <h1 className="text-3xl font-display font-bold text-gray-900 dark:text-white mb-2">
              {profileData.name}
            </h1>
            
            <div className="flex items-center justify-center space-x-4 text-gray-600 dark:text-gray-300 mb-4">
              <div className="flex items-center">
                <MapPin className="w-4 h-4 mr-1" />
                <span>{profileData.location}</span>
              </div>
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-1" />
                <span>Joined {new Date(profileData.joinDate).toLocaleDateString()}</span>
              </div>
            </div>
            
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              {profileData.bio}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-8 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { label: 'Trips Planned', value: profileData.stats.tripsPlanned, icon: Globe },
              { label: 'Countries Visited', value: profileData.stats.countriesVisited, icon: MapPin },
              { label: 'Travel Days', value: profileData.stats.totalDays, icon: Calendar },
              { label: 'Favorite Destination', value: profileData.stats.favoriteDestination, icon: Heart, isText: true },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="w-12 h-12 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                  {stat.isText ? stat.value.split(',')[0] : stat.value}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-300">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Profile Details */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-display font-bold text-gray-900 dark:text-white">
                Profile Information
              </h2>
              {!isEditing ? (
                <Button onClick={() => setIsEditing(true)} variant="outline">
                  <Edit className="w-4 h-4 mr-2" />
                  Edit Profile
                </Button>
              ) : (
                <div className="flex space-x-3">
                  <Button onClick={handleSave} size="sm">
                    <Save className="w-4 h-4 mr-2" />
                    Save
                  </Button>
                  <Button onClick={handleCancel} variant="outline" size="sm">
                    <X className="w-4 h-4 mr-2" />
                    Cancel
                  </Button>
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Personal Information */}
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Personal Information
                </h3>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Full Name
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={profileData.name}
                      onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                      className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 text-gray-900 dark:text-white"
                    />
                  ) : (
                    <div className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-xl">
                      <User className="w-5 h-5 text-gray-400" />
                      <span className="text-gray-900 dark:text-white">{profileData.name}</span>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Email
                  </label>
                  {isEditing ? (
                    <input
                      type="email"
                      value={profileData.email}
                      onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                      className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 text-gray-900 dark:text-white"
                    />
                  ) : (
                    <div className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-xl">
                      <Mail className="w-5 h-5 text-gray-400" />
                      <span className="text-gray-900 dark:text-white">{profileData.email}</span>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Phone
                  </label>
                  {isEditing ? (
                    <input
                      type="tel"
                      value={profileData.phone}
                      onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                      className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 text-gray-900 dark:text-white"
                    />
                  ) : (
                    <div className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-xl">
                      <Phone className="w-5 h-5 text-gray-400" />
                      <span className="text-gray-900 dark:text-white">{profileData.phone}</span>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Bio
                  </label>
                  {isEditing ? (
                    <textarea
                      value={profileData.bio}
                      onChange={(e) => setProfileData({...profileData, bio: e.target.value})}
                      rows={4}
                      className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 text-gray-900 dark:text-white resize-none"
                    />
                  ) : (
                    <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-xl">
                      <span className="text-gray-900 dark:text-white">{profileData.bio}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Travel Preferences */}
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Travel Preferences
                </h3>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Travel Style
                  </label>
                  {isEditing ? (
                    <select
                      value={profileData.preferences.travelStyle}
                      onChange={(e) => setProfileData({
                        ...profileData,
                        preferences: {...profileData.preferences, travelStyle: e.target.value}
                      })}
                      className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 text-gray-900 dark:text-white"
                    >
                      {travelStyles.map(style => (
                        <option key={style} value={style}>{style}</option>
                      ))}
                    </select>
                  ) : (
                    <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-xl">
                      <span className="text-gray-900 dark:text-white">{profileData.preferences.travelStyle}</span>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Budget Range
                  </label>
                  {isEditing ? (
                    <select
                      value={profileData.preferences.budget}
                      onChange={(e) => setProfileData({
                        ...profileData,
                        preferences: {...profileData.preferences, budget: e.target.value}
                      })}
                      className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 text-gray-900 dark:text-white"
                    >
                      {budgetRanges.map(budget => (
                        <option key={budget} value={budget}>{budget}</option>
                      ))}
                    </select>
                  ) : (
                    <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-xl">
                      <span className="text-gray-900 dark:text-white">{profileData.preferences.budget}</span>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Interests
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {profileData.preferences.interests.map((interest, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 text-sm rounded-full"
                      >
                        {interest}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Languages
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {profileData.preferences.languages.map((language, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-secondary-100 dark:bg-secondary-900/30 text-secondary-600 dark:text-secondary-400 text-sm rounded-full"
                      >
                        {language}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}