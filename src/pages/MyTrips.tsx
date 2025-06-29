import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Users, DollarSign, Edit, Trash2, Share2, Download, Plus, Filter, Search } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Link, useParams } from 'react-router-dom';

export function MyTrips() {
  const { id } = useParams();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const trips = [
    {
      id: 1,
      title: 'European Adventure',
      destination: 'Paris, Rome, Barcelona',
      startDate: '2024-06-15',
      endDate: '2024-06-28',
      status: 'upcoming',
      travelers: 2,
      budget: 3500,
      image: 'https://images.pexels.com/photos/338515/pexels-photo-338515.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=2',
      createdAt: '2024-01-15',
      lastModified: '2024-01-20',
      slug: 'european-adventure'
    },
    {
      id: 2,
      title: 'Tokyo Discovery',
      destination: 'Tokyo, Kyoto, Osaka',
      startDate: '2024-03-10',
      endDate: '2024-03-20',
      status: 'completed',
      travelers: 1,
      budget: 2800,
      image: 'https://images.pexels.com/photos/2506923/pexels-photo-2506923.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=2',
      createdAt: '2024-01-05',
      lastModified: '2024-03-25',
      slug: 'tokyo-discovery'
    },
    {
      id: 3,
      title: 'Bali Retreat',
      destination: 'Ubud, Seminyak, Canggu',
      startDate: '2024-02-01',
      endDate: '2024-02-14',
      status: 'completed',
      travelers: 4,
      budget: 4200,
      image: 'https://images.pexels.com/photos/2474690/pexels-photo-2474690.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=2',
      createdAt: '2023-12-20',
      lastModified: '2024-02-20',
      slug: 'bali-retreat'
    },
    {
      id: 4,
      title: 'New York City Break',
      destination: 'Manhattan, Brooklyn',
      startDate: '2024-08-05',
      endDate: '2024-08-12',
      status: 'planning',
      travelers: 3,
      budget: 2100,
      image: 'https://images.pexels.com/photos/466685/pexels-photo-466685.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=2',
      createdAt: '2024-01-25',
      lastModified: '2024-01-25',
      slug: 'new-york-city-break'
    },
  ];

  const statusOptions = [
    { value: 'all', label: 'All Trips' },
    { value: 'planning', label: 'Planning' },
    { value: 'upcoming', label: 'Upcoming' },
    { value: 'completed', label: 'Completed' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'planning':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
      case 'upcoming':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400';
      case 'completed':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400';
    }
  };

  // If id is provided, show the specific trip
  if (id) {
    const trip = trips.find(t => t.id.toString() === id || t.slug === id);
    
    if (!trip) {
      return (
        <div className="min-h-screen pt-16 bg-white dark:bg-gray-900 flex items-center justify-center">
          <div className="text-center">
            <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Trip not found
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              The trip you're looking for doesn't exist or has been deleted.
            </p>
            <Link to="/my-trips">
              <Button>
                View All Trips
              </Button>
            </Link>
          </div>
        </div>
      );
    }
    
    return (
      <div className="min-h-screen pt-16 bg-white dark:bg-gray-900">
        {/* Trip Header */}
        <section className="py-16 bg-gradient-to-r from-primary-50 to-secondary-50 dark:from-gray-800 dark:to-gray-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Link to="/my-trips" className="inline-flex items-center text-primary-600 dark:text-primary-400 mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
              Back to All Trips
            </Link>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex flex-col lg:flex-row gap-8 items-center"
            >
              <div>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(trip.status)}`}>
                  {trip.status.charAt(0).toUpperCase() + trip.status.slice(1)}
                </span>
                
                <h1 className="text-3xl sm:text-4xl font-display font-bold text-gray-900 dark:text-white mt-4 mb-4">
                  {trip.title}
                </h1>
                
                <div className="flex flex-wrap items-center gap-4 text-gray-600 dark:text-gray-300 mb-6">
                  <div className="flex items-center">
                    <MapPin className="w-5 h-5 mr-1" />
                    <span>{trip.destination}</span>
                  </div>
                  
                  <div className="flex items-center">
                    <Calendar className="w-5 h-5 mr-1" />
                    <span>{new Date(trip.startDate).toLocaleDateString()} - {new Date(trip.endDate).toLocaleDateString()}</span>
                  </div>
                  
                  <div className="flex items-center">
                    <Users className="w-5 h-5 mr-1" />
                    <span>{trip.travelers} {trip.travelers === 1 ? 'traveler' : 'travelers'}</span>
                  </div>
                  
                  <div className="flex items-center">
                    <DollarSign className="w-5 h-5 mr-1" />
                    <span>${trip.budget.toLocaleString()}</span>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-3">
                  <Button>
                    <Edit className="w-4 h-4 mr-2" />
                    Edit Trip
                  </Button>
                  
                  <Button variant="outline">
                    <Share2 className="w-4 h-4 mr-2" />
                    Share
                  </Button>
                  
                  <Button variant="outline">
                    <Download className="w-4 h-4 mr-2" />
                    Export
                  </Button>
                </div>
              </div>
              
              <div className="lg:w-1/3 rounded-2xl overflow-hidden shadow-xl">
                <img
                  src={trip.image}
                  alt={trip.title}
                  className="w-full h-64 object-cover"
                />
              </div>
            </motion.div>
          </div>
        </section>
        
        {/* Trip Details */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
                Trip Details
              </h2>
              
              <div className="prose prose-lg max-w-none dark:prose-invert">
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl.
                </p>
                
                <h3>Itinerary</h3>
                <p>
                  Nullam quis risus eget urna mollis ornare vel eu leo. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nullam id dolor id nibh ultricies vehicula ut id elit.
                </p>
                
                <ul>
                  <li>Day 1: Arrival and city exploration</li>
                  <li>Day 2: Cultural landmarks and museums</li>
                  <li>Day 3: Local cuisine and markets</li>
                  <li>Day 4: Day trip to nearby attractions</li>
                  <li>Day 5: Relaxation and shopping</li>
                </ul>
                
                <h3>Accommodations</h3>
                <p>
                  Cras mattis consectetur purus sit amet fermentum. Donec ullamcorper nulla non metus auctor fringilla. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
                </p>
                
                <h3>Transportation</h3>
                <p>
                  Aenean lacinia bibendum nulla sed consectetur. Etiam porta sem malesuada magna mollis euismod. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  const filteredTrips = trips.filter(trip => {
    const matchesSearch = trip.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         trip.destination.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || trip.status === filterStatus;
    
    return matchesSearch && matchesStatus;
  });

  const calculateDuration = (startDate: string, endDate: string) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  return (
    <div className="min-h-screen pt-16 bg-white dark:bg-gray-900">
      {/* Header */}
      <section className="py-16 bg-gradient-to-r from-primary-50 to-secondary-50 dark:from-gray-800 dark:to-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col lg:flex-row items-center justify-between"
          >
            <div>
              <h1 className="text-4xl sm:text-5xl font-display font-bold text-gray-900 dark:text-white mb-4">
                My Trips
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300">
                Manage your travel plans and relive your adventures
              </p>
            </div>
            <div className="mt-8 lg:mt-0">
              <Link to="/trip-planner">
                <Button size="lg">
                  <Plus className="w-5 h-5 mr-2" />
                  Plan New Trip
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search your trips..."
                  className="w-full pl-10 pr-4 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 text-gray-900 dark:text-white"
                />
              </div>
            </div>

            {/* Status Filter */}
            <div className="lg:w-48">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="w-full px-4 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 text-gray-900 dark:text-white"
              >
                {statusOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Trips Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredTrips.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
              {filteredTrips.map((trip, index) => (
                <motion.div
                  key={trip.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="group"
                >
                  <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 group-hover:-translate-y-2 overflow-hidden">
                    <div className="relative">
                      <img
                        src={trip.image}
                        alt={trip.title}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-4 right-4">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(trip.status)}`}>
                          {trip.status.charAt(0).toUpperCase() + trip.status.slice(1)}
                        </span>
                      </div>
                    </div>
                    
                    <div className="p-6">
                      <Link to={`/my-trips/${trip.id}`}>
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                          {trip.title}
                        </h3>
                      </Link>
                      
                      <div className="space-y-3 mb-6">
                        <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                          <MapPin className="w-4 h-4 mr-2 flex-shrink-0" />
                          <span className="truncate">{trip.destination}</span>
                        </div>
                        
                        <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                          <Calendar className="w-4 h-4 mr-2 flex-shrink-0" />
                          <span>
                            {new Date(trip.startDate).toLocaleDateString()} - {new Date(trip.endDate).toLocaleDateString()}
                          </span>
                        </div>
                        
                        <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-300">
                          <div className="flex items-center">
                            <Users className="w-4 h-4 mr-2" />
                            <span>{trip.travelers} {trip.travelers === 1 ? 'traveler' : 'travelers'}</span>
                          </div>
                          
                          <div className="flex items-center">
                            <DollarSign className="w-4 h-4 mr-1" />
                            <span>${trip.budget.toLocaleString()}</span>
                          </div>
                        </div>
                        
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          {calculateDuration(trip.startDate, trip.endDate)} days • 
                          Last modified: {new Date(trip.lastModified).toLocaleDateString()}
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Link to={`/my-trips/${trip.id}`}>
                            <Button size="sm" variant="outline">
                              <Edit className="w-4 h-4 mr-1" />
                              Edit
                            </Button>
                          </Link>
                          
                          <button className="p-2 text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200">
                            <Share2 className="w-4 h-4" />
                          </button>
                          
                          <button className="p-2 text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200">
                            <Download className="w-4 h-4" />
                          </button>
                          
                          <button className="p-2 text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors duration-200">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <MapPin className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                {searchTerm || filterStatus !== 'all' ? 'No trips found' : 'No trips yet'}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                {searchTerm || filterStatus !== 'all' 
                  ? 'Try adjusting your search criteria or filters.'
                  : 'Start planning your first adventure with our AI-powered trip planner.'
                }
              </p>
              {!searchTerm && filterStatus === 'all' && (
                <Link to="/trip-planner">
                  <Button>
                    <Plus className="w-5 h-5 mr-2" />
                    Plan Your First Trip
                  </Button>
                </Link>
              )}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}