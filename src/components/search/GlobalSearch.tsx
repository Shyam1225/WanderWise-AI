import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, X, MapPin, Calendar, Users, Star, 
  Compass, Clock, Heart, Bookmark, History, 
  TrendingUp, Filter, ChevronDown, ChevronUp
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../ui/Button';

interface SearchResult {
  id: string;
  type: 'destination' | 'guide' | 'trip' | 'blog';
  title: string;
  description: string;
  image?: string;
  url: string;
  rating?: number;
  date?: string;
  tags?: string[];
  popularity?: number;
}

interface GlobalSearchProps {
  onClose?: () => void;
}

export function GlobalSearch({ onClose }: GlobalSearchProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [activeFilters, setActiveFilters] = useState({
    destinations: true,
    guides: true,
    trips: true,
    blog: true
  });
  const [sortBy, setSortBy] = useState<'relevance' | 'rating' | 'date'>('relevance');
  
  const searchInputRef = useRef<HTMLInputElement>(null);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Load recent searches from localStorage
    const savedSearches = localStorage.getItem('recentSearches');
    if (savedSearches) {
      setRecentSearches(JSON.parse(savedSearches));
    }
    
    // Focus search input on mount
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
    
    // Add event listener to close search on outside click
    const handleClickOutside = (event: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        onClose?.();
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  useEffect(() => {
    // Debounced search
    if (searchTerm.trim().length < 2) {
      setResults([]);
      return;
    }
    
    const timer = setTimeout(() => {
      performSearch(searchTerm);
    }, 300);
    
    return () => clearTimeout(timer);
  }, [searchTerm, activeFilters, sortBy]);

  const performSearch = async (term: string) => {
    setIsLoading(true);
    
    try {
      // In a real app, this would be an API call
      // For demo, we'll use mock data
      await new Promise(resolve => setTimeout(resolve, 500)); // Simulate network delay
      
      const mockResults: SearchResult[] = [
        {
          id: '1',
          type: 'destination',
          title: 'Paris, France',
          description: 'The City of Light offers unparalleled romance, world-class museums, and exquisite cuisine.',
          image: 'https://images.pexels.com/photos/338515/pexels-photo-338515.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=2',
          url: '/destinations/paris',
          rating: 4.8,
          tags: ['Europe', 'City', 'Culture', 'Food'],
          popularity: 95
        },
        {
          id: '2',
          type: 'destination',
          title: 'Tokyo, Japan',
          description: 'A fascinating blend of ultra-modern technology and ancient traditions.',
          image: 'https://images.pexels.com/photos/2506923/pexels-photo-2506923.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=2',
          url: '/destinations/tokyo',
          rating: 4.9,
          tags: ['Asia', 'City', 'Culture', 'Food'],
          popularity: 92
        },
        {
          id: '3',
          type: 'guide',
          title: 'The Ultimate Guide to Solo Travel in Southeast Asia',
          description: 'Everything you need to know about traveling solo through Thailand, Vietnam, Cambodia, and more.',
          image: 'https://images.pexels.com/photos/1371360/pexels-photo-1371360.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=2',
          url: '/travel-guides/solo-southeast-asia',
          date: '2024-01-15',
          tags: ['Solo Travel', 'Southeast Asia', 'Budget', 'Safety'],
          popularity: 87
        },
        {
          id: '4',
          type: 'trip',
          title: 'European Adventure',
          description: 'Paris, Rome, Barcelona - 14 days of European exploration',
          image: 'https://images.pexels.com/photos/338515/pexels-photo-338515.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=2',
          url: '/my-trips/1',
          date: '2024-06-15',
          tags: ['Europe', 'Multi-city', 'Culture'],
          popularity: 75
        },
        {
          id: '5',
          type: 'blog',
          title: 'The Future of AI-Powered Travel Planning',
          description: 'Discover how artificial intelligence is revolutionizing the way we plan and experience travel.',
          image: 'https://images.pexels.com/photos/1051075/pexels-photo-1051075.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=2',
          url: '/blog/future-of-ai-travel-planning',
          date: '2024-01-20',
          tags: ['AI', 'Technology', 'Future of Travel'],
          popularity: 82
        }
      ];
      
      // Filter results based on search term and active filters
      const filteredResults = mockResults.filter(result => {
        const matchesTerm = 
          result.title.toLowerCase().includes(term.toLowerCase()) ||
          result.description.toLowerCase().includes(term.toLowerCase()) ||
          result.tags?.some(tag => tag.toLowerCase().includes(term.toLowerCase()));
        
        const matchesFilter = 
          (result.type === 'destination' && activeFilters.destinations) ||
          (result.type === 'guide' && activeFilters.guides) ||
          (result.type === 'trip' && activeFilters.trips) ||
          (result.type === 'blog' && activeFilters.blog);
        
        return matchesTerm && matchesFilter;
      });
      
      // Sort results
      const sortedResults = [...filteredResults].sort((a, b) => {
        if (sortBy === 'rating') {
          return (b.rating || 0) - (a.rating || 0);
        } else if (sortBy === 'date') {
          return new Date(b.date || '').getTime() - new Date(a.date || '').getTime();
        } else {
          // Default sort by relevance (popularity)
          return (b.popularity || 0) - (a.popularity || 0);
        }
      });
      
      setResults(sortedResults);
      
      // Save search term to recent searches
      if (term.trim() && !recentSearches.includes(term.trim())) {
        const updatedSearches = [term.trim(), ...recentSearches.slice(0, 4)];
        setRecentSearches(updatedSearches);
        localStorage.setItem('recentSearches', JSON.stringify(updatedSearches));
      }
    } catch (error) {
      console.error('Search failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const clearSearch = () => {
    setSearchTerm('');
    setResults([]);
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      performSearch(searchTerm);
    }
  };

  const clearRecentSearches = () => {
    setRecentSearches([]);
    localStorage.removeItem('recentSearches');
  };

  const getResultIcon = (type: string) => {
    switch (type) {
      case 'destination': return MapPin;
      case 'guide': return Compass;
      case 'trip': return Calendar;
      case 'blog': return Star;
      default: return Search;
    }
  };

  const getResultTypeLabel = (type: string) => {
    switch (type) {
      case 'destination': return 'Destination';
      case 'guide': return 'Travel Guide';
      case 'trip': return 'Trip Plan';
      case 'blog': return 'Blog Post';
      default: return 'Result';
    }
  };

  return (
    <div 
      ref={searchContainerRef}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
      >
        {/* Search Header */}
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <form onSubmit={handleSearchSubmit} className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              ref={searchInputRef}
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search destinations, guides, trips, and more..."
              className="w-full pl-12 pr-10 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 text-gray-900 dark:text-white"
            />
            {searchTerm && (
              <button
                type="button"
                onClick={clearSearch}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </form>
        </div>

        {/* Filters */}
        <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400"
              >
                <Filter className="w-4 h-4" />
                <span>Filters</span>
                {showFilters ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
              
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600 dark:text-gray-300">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="text-sm bg-transparent border-none focus:outline-none text-gray-600 dark:text-gray-300"
                >
                  <option value="relevance">Relevance</option>
                  <option value="rating">Rating</option>
                  <option value="date">Date</option>
                </select>
              </div>
            </div>
            
            <div className="text-sm text-gray-500 dark:text-gray-400">
              {results.length > 0 ? `${results.length} results` : ''}
            </div>
          </div>
          
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="pt-3"
              >
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setActiveFilters(prev => ({ ...prev, destinations: !prev.destinations }))}
                    className={`flex items-center space-x-1 px-3 py-1 rounded-full text-sm ${
                      activeFilters.destinations
                        ? 'bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-400'
                        : 'bg-gray-100 text-gray-600 dark:bg-gray-600 dark:text-gray-300'
                    }`}
                  >
                    <MapPin className="w-3 h-3" />
                    <span>Destinations</span>
                  </button>
                  
                  <button
                    onClick={() => setActiveFilters(prev => ({ ...prev, guides: !prev.guides }))}
                    className={`flex items-center space-x-1 px-3 py-1 rounded-full text-sm ${
                      activeFilters.guides
                        ? 'bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-400'
                        : 'bg-gray-100 text-gray-600 dark:bg-gray-600 dark:text-gray-300'
                    }`}
                  >
                    <Compass className="w-3 h-3" />
                    <span>Guides</span>
                  </button>
                  
                  <button
                    onClick={() => setActiveFilters(prev => ({ ...prev, trips: !prev.trips }))}
                    className={`flex items-center space-x-1 px-3 py-1 rounded-full text-sm ${
                      activeFilters.trips
                        ? 'bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-400'
                        : 'bg-gray-100 text-gray-600 dark:bg-gray-600 dark:text-gray-300'
                    }`}
                  >
                    <Calendar className="w-3 h-3" />
                    <span>Trips</span>
                  </button>
                  
                  <button
                    onClick={() => setActiveFilters(prev => ({ ...prev, blog: !prev.blog }))}
                    className={`flex items-center space-x-1 px-3 py-1 rounded-full text-sm ${
                      activeFilters.blog
                        ? 'bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-400'
                        : 'bg-gray-100 text-gray-600 dark:bg-gray-600 dark:text-gray-300'
                    }`}
                  >
                    <Star className="w-3 h-3" />
                    <span>Blog</span>
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Search Results */}
        <div className="overflow-y-auto max-h-[calc(90vh-140px)]">
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <div className="w-8 h-8 border-4 border-primary-500 border-t-transparent rounded-full animate-spin" />
            </div>
          ) : searchTerm.trim().length < 2 ? (
            <div className="p-6">
              {/* Recent Searches */}
              {recentSearches.length > 0 && (
                <div className="mb-8">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      Recent Searches
                    </h3>
                    <button
                      onClick={clearRecentSearches}
                      className="text-sm text-gray-500 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400"
                    >
                      Clear All
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {recentSearches.map((term, index) => (
                      <button
                        key={index}
                        onClick={() => setSearchTerm(term)}
                        className="flex items-center space-x-2 px-3 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                      >
                        <History className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                        <span>{term}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Popular Searches */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Popular Destinations
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { name: 'Paris, France', image: 'https://images.pexels.com/photos/338515/pexels-photo-338515.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=2' },
                    { name: 'Tokyo, Japan', image: 'https://images.pexels.com/photos/2506923/pexels-photo-2506923.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=2' },
                    { name: 'Bali, Indonesia', image: 'https://images.pexels.com/photos/2474690/pexels-photo-2474690.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=2' },
                    { name: 'New York, USA', image: 'https://images.pexels.com/photos/466685/pexels-photo-466685.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=2' }
                  ].map((destination, index) => (
                    <div
                      key={index}
                      onClick={() => setSearchTerm(destination.name)}
                      className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-xl cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600"
                    >
                      <img
                        src={destination.image}
                        alt={destination.name}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                      <span className="font-medium text-gray-900 dark:text-white">
                        {destination.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Trending Searches */}
              <div className="mt-8">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2 text-primary-500" />
                  Trending Searches
                </h3>
                <div className="flex flex-wrap gap-2">
                  {['Solo Travel', 'Budget Europe', 'Digital Nomad', 'Family Vacation', 'Sustainable Travel', 'Adventure Trips'].map((term, index) => (
                    <button
                      key={index}
                      onClick={() => setSearchTerm(term)}
                      className="px-3 py-1 bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-400 rounded-full text-sm hover:bg-primary-100 dark:hover:bg-primary-900/30"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : results.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12">
              <Search className="w-16 h-16 text-gray-300 dark:text-gray-600 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                No results found
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-center max-w-md">
                We couldn't find any matches for "{searchTerm}". Try different keywords or check your spelling.
              </p>
            </div>
          ) : (
            <div className="p-6 space-y-6">
              {results.map((result) => {
                const ResultIcon = getResultIcon(result.type);
                
                return (
                  <Link
                    key={result.id}
                    to={result.url}
                    onClick={onClose}
                    className="flex items-start space-x-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-200"
                  >
                    {result.image ? (
                      <img
                        src={result.image}
                        alt={result.title}
                        className="w-20 h-20 rounded-lg object-cover flex-shrink-0"
                      />
                    ) : (
                      <div className="w-20 h-20 bg-gray-200 dark:bg-gray-600 rounded-lg flex items-center justify-center flex-shrink-0">
                        <ResultIcon className="w-8 h-8 text-gray-400 dark:text-gray-500" />
                      </div>
                    )}
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="px-2 py-1 bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 text-xs rounded-full">
                          {getResultTypeLabel(result.type)}
                        </span>
                        {result.rating && (
                          <span className="flex items-center text-xs text-yellow-600 dark:text-yellow-400">
                            <Star className="w-3 h-3 fill-current mr-1" />
                            {result.rating}
                          </span>
                        )}
                        {result.date && (
                          <span className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                            <Clock className="w-3 h-3 mr-1" />
                            {new Date(result.date).toLocaleDateString()}
                          </span>
                        )}
                      </div>
                      
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1 truncate">
                        {result.title}
                      </h3>
                      
                      <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
                        {result.description}
                      </p>
                      
                      {result.tags && (
                        <div className="flex flex-wrap gap-1 mt-2">
                          {result.tags.map((tag, index) => (
                            <span
                              key={index}
                              className="px-2 py-0.5 bg-gray-100 dark:bg-gray-600 text-gray-600 dark:text-gray-300 text-xs rounded-full"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                    
                    <div className="flex flex-col space-y-2">
                      <button className="p-2 text-gray-400 hover:text-primary-600 dark:hover:text-primary-400">
                        <Heart className="w-5 h-5" />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-primary-600 dark:hover:text-primary-400">
                        <Bookmark className="w-5 h-5" />
                      </button>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 flex justify-end">
          <Button onClick={onClose} variant="outline">
            Close
          </Button>
        </div>
      </motion.div>
    </div>
  );
}