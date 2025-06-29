import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart, PieChart, TrendingUp, Map, Users, 
  Calendar, Clock, DollarSign, Star, Target, 
  Activity, Zap, Compass, Heart, Building, Utensils, 
  Camera, Mountain, Waves, Download, Share2
} from 'lucide-react';
import { Button } from '../ui/Button';

interface AnalyticsInsightsProps {
  userId?: string;
  tripId?: string;
  startDate?: string;
  endDate?: string;
}

export function AnalyticsInsights({ 
  userId, 
  tripId, 
  startDate, 
  endDate 
}: AnalyticsInsightsProps) {
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d' | '1y'>('30d');
  const [activeTab, setActiveTab] = useState<'overview' | 'destinations' | 'activities' | 'budget'>('overview');

  // Mock analytics data
  const analyticsData = {
    overview: {
      totalTrips: 12,
      totalDestinations: 23,
      totalDays: 156,
      averageTripDuration: 13,
      averageBudget: 2450,
      tripCompletionRate: 85,
      tripSatisfactionRate: 92,
      mostVisitedRegion: 'Europe',
      mostCommonTripType: 'Cultural Exploration',
      planningTimeReduction: 78
    },
    destinations: {
      topDestinations: [
        { name: 'Paris, France', count: 3, satisfaction: 95 },
        { name: 'Tokyo, Japan', count: 2, satisfaction: 98 },
        { name: 'Barcelona, Spain', count: 2, satisfaction: 90 },
        { name: 'New York, USA', count: 1, satisfaction: 85 },
        { name: 'Bali, Indonesia', count: 1, satisfaction: 97 }
      ],
      regionDistribution: [
        { region: 'Europe', percentage: 45 },
        { region: 'Asia', percentage: 30 },
        { region: 'North America', percentage: 15 },
        { region: 'Oceania', percentage: 5 },
        { region: 'Africa', percentage: 5 }
      ],
      seasonalTrends: [
        { month: 'Jan', trips: 0 },
        { month: 'Feb', trips: 1 },
        { month: 'Mar', trips: 2 },
        { month: 'Apr', trips: 1 },
        { month: 'May', trips: 3 },
        { month: 'Jun', trips: 2 },
        { month: 'Jul', trips: 1 },
        { month: 'Aug', trips: 0 },
        { month: 'Sep', trips: 1 },
        { month: 'Oct', trips: 0 },
        { month: 'Nov', trips: 0 },
        { month: 'Dec', trips: 1 }
      ],
      climatePreferences: {
        warm: 65,
        moderate: 25,
        cold: 10
      }
    },
    activities: {
      categoryBreakdown: [
        { category: 'Cultural', percentage: 35, icon: Building },
        { category: 'Food & Dining', percentage: 25, icon: Utensils },
        { category: 'Sightseeing', percentage: 20, icon: Camera },
        { category: 'Adventure', percentage: 10, icon: Mountain },
        { category: 'Relaxation', percentage: 10, icon: Waves }
      ],
      popularActivities: [
        { name: 'Museum Visits', count: 28, satisfaction: 90 },
        { name: 'Local Food Tours', count: 22, satisfaction: 95 },
        { name: 'Historic Sites', count: 18, satisfaction: 88 },
        { name: 'Walking Tours', count: 15, satisfaction: 85 },
        { name: 'Cultural Performances', count: 12, satisfaction: 92 }
      ],
      activityDuration: {
        'Less than 2 hours': 30,
        '2-4 hours': 45,
        '4-8 hours': 20,
        'Full day': 5
      },
      timeOfDay: {
        Morning: 35,
        Afternoon: 40,
        Evening: 25
      }
    },
    budget: {
      averageDailySpend: 185,
      budgetBreakdown: [
        { category: 'Accommodation', percentage: 40, amount: 980 },
        { category: 'Food & Dining', percentage: 25, amount: 612 },
        { category: 'Activities', percentage: 20, amount: 490 },
        { category: 'Transportation', percentage: 10, amount: 245 },
        { category: 'Shopping', percentage: 5, amount: 123 }
      ],
      budgetAccuracy: 92,
      savingsOpportunities: [
        { category: 'Accommodation', potential: 150, strategy: 'Book 3+ months in advance' },
        { category: 'Activities', potential: 75, strategy: 'Use city passes for multiple attractions' },
        { category: 'Transportation', potential: 50, strategy: 'Use weekly transit passes' }
      ],
      spendingTrends: [
        { month: 'Jan', amount: 0 },
        { month: 'Feb', amount: 2100 },
        { month: 'Mar', amount: 4500 },
        { month: 'Apr', amount: 2300 },
        { month: 'May', amount: 6800 },
        { month: 'Jun', amount: 4200 },
        { month: 'Jul', amount: 2100 },
        { month: 'Aug', amount: 0 },
        { month: 'Sep', amount: 1900 },
        { month: 'Oct', amount: 0 },
        { month: 'Nov', amount: 0 },
        { month: 'Dec', amount: 2400 }
      ]
    }
  };

  const timeRangeOptions = [
    { value: '7d', label: 'Last 7 Days' },
    { value: '30d', label: 'Last 30 Days' },
    { value: '90d', label: 'Last 90 Days' },
    { value: '1y', label: 'Last Year' }
  ];

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart },
    { id: 'destinations', label: 'Destinations', icon: Map },
    { id: 'activities', label: 'Activities', icon: Activity },
    { id: 'budget', label: 'Budget', icon: DollarSign }
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary-500 to-secondary-500 p-6 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
              <TrendingUp className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">Travel Analytics</h2>
              <p className="text-white/90">Insights and trends from your travel history</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value as any)}
              className="px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-white/50"
            >
              {timeRangeOptions.map((option) => (
                <option key={option.value} value={option.value} className="text-gray-900">
                  {option.label}
                </option>
              ))}
            </select>
            
            <Button
              variant="outline"
              className="border-white/30 text-white hover:bg-white/10"
            >
              <Download className="w-4 h-4 mr-2" />
              Export
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
                  ? 'border-primary-500 text-primary-600 dark:text-primary-400'
                  : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { label: 'Total Trips', value: analyticsData.overview.totalTrips, icon: Compass, color: 'bg-blue-500' },
                { label: 'Destinations Visited', value: analyticsData.overview.totalDestinations, icon: Map, color: 'bg-green-500' },
                { label: 'Travel Days', value: analyticsData.overview.totalDays, icon: Calendar, color: 'bg-purple-500' },
                { label: 'Avg. Trip Duration', value: `${analyticsData.overview.averageTripDuration} days`, icon: Clock, color: 'bg-orange-500' }
              ].map((metric, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="bg-white dark:bg-gray-700 rounded-xl p-6 shadow-sm"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 ${metric.color} rounded-lg flex items-center justify-center`}>
                      <metric.icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="text-3xl font-bold text-gray-900 dark:text-white">
                      {metric.value}
                    </div>
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {metric.label}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Performance Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { 
                  label: 'Trip Completion Rate', 
                  value: `${analyticsData.overview.tripCompletionRate}%`, 
                  description: 'Percentage of planned activities completed',
                  icon: Target,
                  color: 'from-green-500 to-emerald-500'
                },
                { 
                  label: 'Satisfaction Rate', 
                  value: `${analyticsData.overview.tripSatisfactionRate}%`, 
                  description: 'Based on post-trip feedback',
                  icon: Star,
                  color: 'from-yellow-500 to-amber-500'
                },
                { 
                  label: 'Planning Time Saved', 
                  value: `${analyticsData.overview.planningTimeReduction}%`, 
                  description: 'Compared to manual planning',
                  icon: Zap,
                  color: 'from-purple-500 to-indigo-500'
                }
              ].map((metric, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                  className="bg-white dark:bg-gray-700 rounded-xl p-6 shadow-sm"
                >
                  <div className="flex items-center space-x-3 mb-3">
                    <div className={`w-10 h-10 bg-gradient-to-r ${metric.color} rounded-lg flex items-center justify-center`}>
                      <metric.icon className="w-5 h-5 text-white" />
                    </div>
                    <div className="font-semibold text-gray-900 dark:text-white">
                      {metric.label}
                    </div>
                  </div>
                  <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                    {metric.value}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {metric.description}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Travel Preferences */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.7 }}
              className="bg-white dark:bg-gray-700 rounded-xl p-6 shadow-sm"
            >
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Your Travel Preferences
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-3">
                    Most Visited Region
                  </h4>
                  <div className="flex items-center space-x-3">
                    <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                      <Map className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <div className="text-xl font-bold text-gray-900 dark:text-white">
                        {analyticsData.overview.mostVisitedRegion}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        45% of your trips
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-3">
                    Preferred Trip Type
                  </h4>
                  <div className="flex items-center space-x-3">
                    <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
                      <Building className="w-8 h-8 text-purple-600 dark:text-purple-400" />
                    </div>
                    <div>
                      <div className="text-xl font-bold text-gray-900 dark:text-white">
                        {analyticsData.overview.mostCommonTripType}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        Based on activity preferences
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Activity Preferences */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.8 }}
              className="bg-white dark:bg-gray-700 rounded-xl p-6 shadow-sm"
            >
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Activity Preferences
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                {analyticsData.activities.categoryBreakdown.map((category, index) => (
                  <div key={index} className="text-center">
                    <div className="w-16 h-16 mx-auto mb-2 relative">
                      <svg className="w-full h-full" viewBox="0 0 36 36">
                        <circle cx="18" cy="18" r="15.91549430918954" fill="transparent" stroke="#e9ecef" strokeWidth="3"></circle>
                        <circle
                          cx="18"
                          cy="18"
                          r="15.91549430918954"
                          fill="transparent"
                          stroke="currentColor"
                          strokeWidth="3"
                          strokeDasharray={`${category.percentage} ${100 - category.percentage}`}
                          strokeDashoffset="25"
                          className={`${
                            index === 0 ? 'text-purple-500' :
                            index === 1 ? 'text-orange-500' :
                            index === 2 ? 'text-pink-500' :
                            index === 3 ? 'text-green-500' :
                            'text-blue-500'
                          }`}
                        ></circle>
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <category.icon className="w-6 h-6 text-gray-700 dark:text-gray-300" />
                      </div>
                    </div>
                    <div className="font-medium text-gray-900 dark:text-white">
                      {category.percentage}%
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      {category.category}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        )}

        {/* Destinations Tab */}
        {activeTab === 'destinations' && (
          <div className="space-y-6">
            {/* Top Destinations */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Top Destinations
              </h3>
              <div className="bg-white dark:bg-gray-700 rounded-xl p-6 shadow-sm">
                <div className="space-y-4">
                  {analyticsData.destinations.topDestinations.map((destination, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-gray-100 dark:bg-gray-600 rounded-full flex items-center justify-center text-sm font-medium text-gray-700 dark:text-gray-300">
                          {index + 1}
                        </div>
                        <span className="font-medium text-gray-900 dark:text-white">
                          {destination.name}
                        </span>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {destination.count} {destination.count === 1 ? 'visit' : 'visits'}
                        </div>
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 text-yellow-500 fill-current" />
                          <span className="text-sm font-medium text-gray-900 dark:text-white">
                            {destination.satisfaction}%
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Region Distribution */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Region Distribution
              </h3>
              <div className="bg-white dark:bg-gray-700 rounded-xl p-6 shadow-sm">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    {/* Pie chart would go here in a real implementation */}
                    <div className="w-48 h-48 mx-auto relative">
                      <PieChart className="w-full h-full text-gray-300 dark:text-gray-600" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-lg font-semibold text-gray-900 dark:text-white">
                          5 Regions
                        </span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="space-y-3">
                      {analyticsData.destinations.regionDistribution.map((region, index) => (
                        <div key={index}>
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                              {region.region}
                            </span>
                            <span className="text-sm font-medium text-gray-900 dark:text-white">
                              {region.percentage}%
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                            <div
                              className={`h-2 rounded-full ${
                                index === 0 ? 'bg-blue-500' :
                                index === 1 ? 'bg-green-500' :
                                index === 2 ? 'bg-yellow-500' :
                                index === 3 ? 'bg-purple-500' :
                                'bg-red-500'
                              }`}
                              style={{ width: `${region.percentage}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Seasonal Trends */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Seasonal Travel Patterns
              </h3>
              <div className="bg-white dark:bg-gray-700 rounded-xl p-6 shadow-sm">
                <div className="h-64">
                  {/* Bar chart would go here in a real implementation */}
                  <div className="flex items-end h-48 space-x-2">
                    {analyticsData.destinations.seasonalTrends.map((month, index) => (
                      <div key={index} className="flex-1 flex flex-col items-center">
                        <div 
                          className="w-full bg-primary-500 rounded-t"
                          style={{ height: `${month.trips * 30}px` }}
                        />
                        <div className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                          {month.month}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <h4 className="font-medium text-blue-700 dark:text-blue-300 mb-2">
                    Insight
                  </h4>
                  <p className="text-sm text-blue-600 dark:text-blue-400">
                    You tend to travel most frequently in May, with 3 trips recorded. Consider booking your next May trip early to secure better rates.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Activities Tab */}
        {activeTab === 'activities' && (
          <div className="space-y-6">
            {/* Category Breakdown */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Activity Category Breakdown
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                {analyticsData.activities.categoryBreakdown.map((category, index) => (
                  <div
                    key={index}
                    className="bg-white dark:bg-gray-700 rounded-xl p-4 text-center shadow-sm"
                  >
                    <div className={`w-12 h-12 mx-auto mb-3 rounded-full flex items-center justify-center ${
                      index === 0 ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400' :
                      index === 1 ? 'bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400' :
                      index === 2 ? 'bg-pink-100 dark:bg-pink-900/30 text-pink-600 dark:text-pink-400' :
                      index === 3 ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400' :
                      'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                    }`}>
                      <category.icon className="w-6 h-6" />
                    </div>
                    <div className="text-lg font-bold text-gray-900 dark:text-white">
                      {category.percentage}%
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {category.category}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Popular Activities */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Most Popular Activities
              </h3>
              <div className="bg-white dark:bg-gray-700 rounded-xl p-6 shadow-sm">
                <div className="space-y-4">
                  {analyticsData.activities.popularActivities.map((activity, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-gray-100 dark:bg-gray-600 rounded-full flex items-center justify-center text-sm font-medium text-gray-700 dark:text-gray-300">
                          {index + 1}
                        </div>
                        <span className="font-medium text-gray-900 dark:text-white">
                          {activity.name}
                        </span>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {activity.count} times
                        </div>
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 text-yellow-500 fill-current" />
                          <span className="text-sm font-medium text-gray-900 dark:text-white">
                            {activity.satisfaction}%
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Activity Patterns */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Activity Duration
                </h3>
                <div className="bg-white dark:bg-gray-700 rounded-xl p-6 shadow-sm h-full">
                  <div className="space-y-4">
                    {Object.entries(analyticsData.activities.activityDuration).map(([duration, percentage], index) => (
                      <div key={index}>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            {duration}
                          </span>
                          <span className="text-sm font-medium text-gray-900 dark:text-white">
                            {percentage}%
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                          <div
                            className="h-2 rounded-full bg-primary-500"
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Preferred Time of Day
                </h3>
                <div className="bg-white dark:bg-gray-700 rounded-xl p-6 shadow-sm h-full">
                  <div className="space-y-4">
                    {Object.entries(analyticsData.activities.timeOfDay).map(([timeOfDay, percentage], index) => (
                      <div key={index}>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            {timeOfDay}
                          </span>
                          <span className="text-sm font-medium text-gray-900 dark:text-white">
                            {percentage}%
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full ${
                              index === 0 ? 'bg-yellow-500' :
                              index === 1 ? 'bg-orange-500' :
                              'bg-blue-500'
                            }`}
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Budget Tab */}
        {activeTab === 'budget' && (
          <div className="space-y-6">
            {/* Budget Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { 
                  label: 'Average Daily Spend', 
                  value: `$${analyticsData.budget.averageDailySpend}`, 
                  icon: DollarSign,
                  color: 'bg-green-500'
                },
                { 
                  label: 'Budget Accuracy', 
                  value: `${analyticsData.budget.budgetAccuracy}%`, 
                  icon: Target,
                  color: 'bg-blue-500'
                },
                { 
                  label: 'Total Travel Spend', 
                  value: `$${analyticsData.budget.budgetBreakdown.reduce((sum, item) => sum + item.amount, 0)}`, 
                  icon: DollarSign,
                  color: 'bg-purple-500'
                }
              ].map((metric, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="bg-white dark:bg-gray-700 rounded-xl p-6 shadow-sm"
                >
                  <div className="flex items-center space-x-3 mb-3">
                    <div className={`w-10 h-10 ${metric.color} rounded-lg flex items-center justify-center`}>
                      <metric.icon className="w-5 h-5 text-white" />
                    </div>
                    <div className="font-semibold text-gray-900 dark:text-white">
                      {metric.label}
                    </div>
                  </div>
                  <div className="text-3xl font-bold text-gray-900 dark:text-white">
                    {metric.value}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Budget Breakdown */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Budget Breakdown
              </h3>
              <div className="bg-white dark:bg-gray-700 rounded-xl p-6 shadow-sm">
                <div className="space-y-4">
                  {analyticsData.budget.budgetBreakdown.map((category, index) => (
                    <div key={index}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          {category.category}
                        </span>
                        <div className="flex items-center space-x-3">
                          <span className="text-sm font-medium text-gray-900 dark:text-white">
                            ${category.amount}
                          </span>
                          <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                            {category.percentage}%
                          </span>
                        </div>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${
                            index === 0 ? 'bg-blue-500' :
                            index === 1 ? 'bg-green-500' :
                            index === 2 ? 'bg-purple-500' :
                            index === 3 ? 'bg-yellow-500' :
                            'bg-red-500'
                          }`}
                          style={{ width: `${category.percentage}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Savings Opportunities */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Savings Opportunities
              </h3>
              <div className="bg-white dark:bg-gray-700 rounded-xl p-6 shadow-sm">
                <div className="space-y-4">
                  {analyticsData.budget.savingsOpportunities.map((opportunity, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                      <div>
                        <div className="font-medium text-gray-900 dark:text-white">
                          {opportunity.category}
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-300">
                          {opportunity.strategy}
                        </div>
                      </div>
                      <div className="text-lg font-bold text-green-600 dark:text-green-400">
                        -${opportunity.potential}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Spending Trends */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Spending Trends
              </h3>
              <div className="bg-white dark:bg-gray-700 rounded-xl p-6 shadow-sm">
                <div className="h-64">
                  {/* Line chart would go here in a real implementation */}
                  <div className="flex items-end h-48 space-x-2">
                    {analyticsData.budget.spendingTrends.map((month, index) => (
                      <div key={index} className="flex-1 flex flex-col items-center">
                        <div 
                          className="w-full bg-primary-500 rounded-t"
                          style={{ height: `${month.amount / 100}px` }}
                        />
                        <div className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                          {month.month}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <h4 className="font-medium text-blue-700 dark:text-blue-300 mb-2">
                    Insight
                  </h4>
                  <p className="text-sm text-blue-600 dark:text-blue-400">
                    Your highest spending month was May with $6,800. Consider setting a budget alert for your next May trip to help manage expenses.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 flex justify-between">
        <div className="text-sm text-gray-500 dark:text-gray-400">
          Data updated: {new Date().toLocaleDateString()}
        </div>
        <div className="flex space-x-3">
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
          <Button variant="outline" size="sm">
            <Share2 className="w-4 h-4 mr-2" />
            Share Insights
          </Button>
        </div>
      </div>
    </div>
  );
}