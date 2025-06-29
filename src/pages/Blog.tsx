import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, User, Clock, ArrowRight } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { Button } from '../components/ui/Button';

export function Blog() {
  const { category } = useParams();
  
  const featuredPost = {
    id: 1,
    title: 'The Future of AI-Powered Travel Planning',
    excerpt: 'Discover how artificial intelligence is revolutionizing the way we plan and experience travel, making every journey more personalized and memorable.',
    author: 'Sarah Chen',
    authorImage: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
    publishDate: '2024-01-20',
    readTime: '8 min read',
    image: 'https://images.pexels.com/photos/1051075/pexels-photo-1051075.jpeg?auto=compress&cs=tinysrgb&w=1200&h=630&dpr=2',
    category: 'Technology',
    slug: 'future-of-ai-travel-planning',
  };

  const posts = [
    {
      id: 2,
      title: 'Hidden Gems of Southeast Asia',
      excerpt: 'Explore off-the-beaten-path destinations that showcase the authentic beauty and culture of Southeast Asia.',
      author: 'Marcus Rodriguez',
      authorImage: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
      publishDate: '2024-01-18',
      readTime: '12 min read',
      image: 'https://images.pexels.com/photos/1371360/pexels-photo-1371360.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=2',
      category: 'Destinations',
      slug: 'hidden-gems-southeast-asia',
    },
    {
      id: 3,
      title: 'Sustainable Travel: A Complete Guide',
      excerpt: 'Learn how to minimize your environmental impact while maximizing your travel experiences.',
      author: 'Elena Kowalski',
      authorImage: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
      publishDate: '2024-01-15',
      readTime: '10 min read',
      image: 'https://images.pexels.com/photos/346885/pexels-photo-346885.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=2',
      category: 'Sustainability',
      slug: 'sustainable-travel-guide',
    },
    {
      id: 4,
      title: 'Budget Travel Hacks for 2024',
      excerpt: 'Discover insider tips and tricks to travel more while spending less, without compromising on experiences.',
      author: 'Carlos Mendoza',
      authorImage: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
      publishDate: '2024-01-12',
      readTime: '15 min read',
      image: 'https://images.pexels.com/photos/2356045/pexels-photo-2356045.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=2',
      category: 'Budget Travel',
      slug: 'budget-travel-hacks-2024',
    },
    {
      id: 5,
      title: 'Digital Nomad Destinations 2024',
      excerpt: 'The best cities for remote workers seeking adventure, community, and reliable internet.',
      author: 'Alex Thompson',
      authorImage: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
      publishDate: '2024-01-10',
      readTime: '11 min read',
      image: 'https://images.pexels.com/photos/1181519/pexels-photo-1181519.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=2',
      category: 'Digital Nomad',
      slug: 'digital-nomad-destinations-2024',
    },
    {
      id: 6,
      title: 'Cultural Etiquette Around the World',
      excerpt: 'Navigate different cultures with confidence and respect with our comprehensive etiquette guide.',
      author: 'Dr. Lisa Park',
      authorImage: 'https://images.pexels.com/photos/1181519/pexels-photo-1181519.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
      publishDate: '2024-01-08',
      readTime: '9 min read',
      image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=2',
      category: 'Culture',
      slug: 'cultural-etiquette-guide',
    },
  ];

  const categories = ['All', 'Technology', 'Destinations', 'Sustainability', 'Budget Travel', 'Digital Nomad', 'Culture'];
  
  // Filter posts by category if provided
  const filteredPosts = category 
    ? posts.filter(post => post.category.toLowerCase() === category.toLowerCase())
    : posts;

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
              Travel Stories & Insights
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Discover inspiring travel stories, expert tips, and the latest trends in AI-powered 
              travel planning from our community of explorers.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Featured Post */}
      <section className="py-16 -mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Link to={`/blog/${featuredPost.slug}`}>
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 group">
                <div className="md:flex">
                  <div className="md:w-1/2">
                    <img
                      src={featuredPost.image}
                      alt={featuredPost.title}
                      className="w-full h-64 md:h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="md:w-1/2 p-8 md:p-12">
                    <div className="flex items-center space-x-3 mb-4">
                      <span className="px-3 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 text-sm font-medium rounded-full">
                        Featured
                      </span>
                      <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-sm font-medium rounded-full">
                        {featuredPost.category}
                      </span>
                    </div>
                    
                    <h2 className="text-3xl font-display font-bold text-gray-900 dark:text-white mb-4 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-200">
                      {featuredPost.title}
                    </h2>
                    
                    <p className="text-gray-600 dark:text-gray-300 text-lg mb-6 leading-relaxed">
                      {featuredPost.excerpt}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <img
                          src={featuredPost.authorImage}
                          alt={featuredPost.author}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">
                            {featuredPost.author}
                          </p>
                          <div className="flex items-center space-x-3 text-sm text-gray-500 dark:text-gray-400">
                            <span>{new Date(featuredPost.publishDate).toLocaleDateString()}</span>
                            <span>•</span>
                            <span>{featuredPost.readTime}</span>
                          </div>
                        </div>
                      </div>
                      
                      <Button variant="outline" size="sm">
                        Read More
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((cat) => (
              <Link
                key={cat}
                to={cat === 'All' ? '/blog' : `/blog/category/${cat.toLowerCase().replace(' ', '-')}`}
                className={`px-4 py-2 bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-primary-50 dark:hover:bg-primary-900/20 hover:text-primary-600 dark:hover:text-primary-400 rounded-full border border-gray-200 dark:border-gray-600 transition-colors duration-200 ${
                  (cat === 'All' && !category) || 
                  (category && cat.toLowerCase() === category.toLowerCase()) 
                    ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 border-primary-300 dark:border-primary-700'
                    : ''
                }`}
              >
                {cat}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post, index) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group"
              >
                <Link to={`/blog/${post.slug}`}>
                  <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 group-hover:-translate-y-2 overflow-hidden">
                    <div className="relative">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm text-gray-600 dark:text-gray-300 text-sm font-medium rounded-full">
                          {post.category}
                        </span>
                      </div>
                    </div>
                    
                    <div className="p-6">
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-200">
                        {post.title}
                      </h3>
                      
                      <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-3">
                        {post.excerpt}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <img
                            src={post.authorImage}
                            alt={post.author}
                            className="w-8 h-8 rounded-full object-cover"
                          />
                          <div>
                            <p className="text-sm font-medium text-gray-900 dark:text-white">
                              {post.author}
                            </p>
                            <div className="flex items-center space-x-2 text-xs text-gray-500 dark:text-gray-400">
                              <Calendar className="w-3 h-3" />
                              <span>{new Date(post.publishDate).toLocaleDateString()}</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                          <Clock className="w-3 h-3 mr-1" />
                          <span>{post.readTime}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
          
          {filteredPosts.length === 0 && (
            <div className="text-center py-16">
              <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                No posts found
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                No blog posts match the selected category.
              </p>
              <Link to="/blog">
                <Button>
                  View All Posts
                </Button>
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-16 bg-gradient-to-r from-primary-600 to-secondary-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-display font-bold text-white mb-4">
              Stay Updated with Travel Insights
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Get the latest travel tips, destination guides, and AI travel innovations 
              delivered to your inbox every week.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-xl border-0 focus:outline-none focus:ring-2 focus:ring-white/50 text-gray-900"
              />
              <Button variant="secondary" className="bg-white text-primary-600 hover:bg-gray-50">
                Subscribe
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}