import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, User, Clock, ArrowLeft, Share2, Bookmark, Heart } from 'lucide-react';
import { Button } from '../components/ui/Button';

export function BlogPost() {
  const { slug } = useParams();

  // Mock blog posts data - in a real app, you'd fetch this based on the slug
  const posts = [
    {
      slug: 'future-of-ai-travel-planning',
      title: 'The Future of AI-Powered Travel Planning',
      content: `
        <p>Artificial Intelligence is revolutionizing every aspect of our lives, and travel planning is no exception. As we step into 2024, AI-powered travel planning tools are becoming more sophisticated, personalized, and intuitive than ever before.</p>

        <h2>The Evolution of Travel Planning</h2>
        <p>Gone are the days of spending countless hours researching destinations, comparing prices, and creating itineraries from scratch. Modern AI systems can analyze vast amounts of data in seconds, considering factors like your personal preferences, budget constraints, travel history, and even real-time conditions at your destination.</p>

        <h2>How AI Understands Your Travel Style</h2>
        <p>Today's AI travel assistants don't just book flights and hotels. They learn from your behavior, preferences, and feedback to create increasingly personalized recommendations. Whether you're a budget backpacker, a luxury traveler, or somewhere in between, AI can adapt to your unique style.</p>

        <blockquote>
          "The best travel experiences happen when technology understands not just where you want to go, but who you are as a traveler." - Sarah Chen, Travel Technology Expert
        </blockquote>

        <h2>Real-Time Adaptability</h2>
        <p>One of the most exciting developments in AI travel planning is real-time adaptability. Modern systems can adjust your itinerary on the fly based on weather conditions, local events, crowd levels, and even your mood or energy levels throughout the trip.</p>

        <h2>The Human Touch in AI Travel</h2>
        <p>While AI handles the heavy lifting of data analysis and optimization, the best AI travel tools still maintain the human element that makes travel special. They understand that travel is about experiences, emotions, and connections – not just logistics.</p>

        <h2>Looking Ahead</h2>
        <p>As we look to the future, AI travel planning will become even more integrated into our daily lives. Imagine AI assistants that can predict your travel needs before you even know them, or systems that can create perfect itineraries based on nothing more than a photo that inspired you.</p>

        <p>The future of travel planning is here, and it's more exciting than we ever imagined.</p>
      `,
      author: 'Sarah Chen',
      authorImage: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
      authorBio: 'Sarah is a travel technology expert and digital nomad who has visited over 50 countries. She specializes in AI applications in the travel industry.',
      publishDate: '2024-01-20',
      readTime: '8 min read',
      image: 'https://images.pexels.com/photos/1051075/pexels-photo-1051075.jpeg?auto=compress&cs=tinysrgb&w=1200&h=600&dpr=2',
      category: 'Technology',
      tags: ['AI', 'Travel Technology', 'Future of Travel', 'Personalization'],
      likes: 142,
      shares: 38,
    },
    {
      slug: 'hidden-gems-southeast-asia',
      title: 'Hidden Gems of Southeast Asia',
      content: `
        <p>Southeast Asia is home to some of the world's most popular tourist destinations, but beyond the well-trodden paths lie countless hidden gems waiting to be discovered. This guide will take you off the beaten track to experience the authentic beauty and culture of this diverse region.</p>

        <h2>Beyond the Tourist Trails</h2>
        <p>While places like Bangkok, Bali, and Angkor Wat deservedly attract millions of visitors each year, the true magic of Southeast Asia often lies in its lesser-known destinations. From remote islands to mountain villages, these places offer authentic experiences without the crowds.</p>

        <h2>Vietnam's Hidden Corners</h2>
        <p>Skip the busy streets of Hanoi and head to Mai Chau, a peaceful valley surrounded by lush rice paddies and limestone mountains. Stay in a traditional stilt house, cycle through rice fields, and experience the hospitality of the White Thai ethnic minority.</p>

        <blockquote>
          "The real voyage of discovery consists not in seeking new landscapes, but in having new eyes." - Marcel Proust
        </blockquote>

        <h2>Secret Islands of Thailand</h2>
        <p>While Phuket and Koh Samui draw the crowds, islands like Koh Yao Noi remain relatively untouched. Here, you'll find pristine beaches, rubber plantations, and a slow pace of life that recalls Thailand of decades past.</p>

        <h2>Laos: The Land Time Forgot</h2>
        <p>The 4000 Islands region (Si Phan Don) in southern Laos offers a glimpse into a way of life that has remained largely unchanged for centuries. Spend your days cycling between villages, spotting rare Irrawaddy dolphins, and watching spectacular sunsets over the Mekong River.</p>

        <h2>Responsible Travel</h2>
        <p>As you explore these hidden gems, remember that they remain unspoiled precisely because they haven't experienced mass tourism. Travel respectfully, support local businesses, and consider the environmental impact of your visit.</p>

        <p>The true beauty of Southeast Asia awaits those willing to venture beyond the guidebook recommendations.</p>
      `,
      author: 'Marcus Rodriguez',
      authorImage: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
      authorBio: 'Marcus is a travel writer and photographer who specializes in off-the-beaten-path destinations throughout Asia. He has lived in Thailand for over 5 years.',
      publishDate: '2024-01-18',
      readTime: '12 min read',
      image: 'https://images.pexels.com/photos/1371360/pexels-photo-1371360.jpeg?auto=compress&cs=tinysrgb&w=1200&h=600&dpr=2',
      category: 'Destinations',
      tags: ['Southeast Asia', 'Hidden Gems', 'Off the Beaten Path', 'Adventure Travel'],
      likes: 98,
      shares: 45,
    },
  ];

  const post = posts.find(p => p.slug === slug);

  if (!post) {
    return (
      <div className="min-h-screen pt-16 bg-white dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            Blog post not found
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            The article you're looking for doesn't exist or has been moved.
          </p>
          <Link to="/blog">
            <Button>
              Browse All Articles
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const relatedPosts = posts.filter(p => p.slug !== slug).slice(0, 3);

  return (
    <div className="min-h-screen pt-16" style={{ backgroundColor: 'rgb(38, 64, 119)', color: 'white' }}>
      {/* Back Button */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link to="/blog">
          <Button variant="outline" size="sm">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Blog
          </Button>
        </Link>
      </div>

      {/* Hero Image */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="relative rounded-2xl overflow-hidden shadow-2xl"
        >
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-96 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          <div className="absolute bottom-8 left-8 right-8">
            <span className="inline-block px-3 py-1 bg-primary-500 text-white text-sm font-medium rounded-full mb-4">
              {post.category}
            </span>
            <h1 className="text-4xl sm:text-5xl font-display font-bold text-white mb-4">
              {post.title}
            </h1>
          </div>
        </motion.div>
      </div>

      {/* Article Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Article Meta */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex items-center justify-between mb-8 pb-8 border-b border-gray-200 dark:border-gray-700"
            >
              <div className="flex items-center space-x-4">
                <img
                  src={post.authorImage}
                  alt={post.author}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">
                    {post.author}
                  </p>
                  <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      <span>{new Date(post.publishDate).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <button className="flex items-center space-x-1 px-3 py-2 text-gray-600 dark:text-gray-300 hover:text-red-500 dark:hover:text-red-400 transition-colors duration-200">
                  <Heart className="w-5 h-5" />
                  <span>{post.likes}</span>
                </button>
                <button className="flex items-center space-x-1 px-3 py-2 text-gray-600 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400 transition-colors duration-200">
                  <Share2 className="w-5 h-5" />
                  <span>{post.shares}</span>
                </button>
                <button className="p-2 text-gray-600 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400 transition-colors duration-200">
                  <Bookmark className="w-5 h-5" />
                </button>
              </div>
            </motion.div>

            {/* Article Body */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="prose prose-lg max-w-none dark:prose-invert prose-primary"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {/* Tags */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700"
            >
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Tags
              </h3>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag, index) => (
                  <Link
                    key={index}
                    to={`/blog/tag/${tag.toLowerCase().replace(/\s+/g, '-')}`}
                    className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-sm rounded-full hover:bg-primary-100 dark:hover:bg-primary-900/30 hover:text-primary-600 dark:hover:text-primary-400 cursor-pointer transition-colors duration-200"
                  >
                    #{tag}
                  </Link>
                ))}
              </div>
            </motion.div>

            {/* Author Bio */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mt-12 p-6 bg-gray-50 dark:bg-gray-800 rounded-2xl"
            >
              <div className="flex items-start space-x-4">
                <img
                  src={post.authorImage}
                  alt={post.author}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    About {post.author}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    {post.authorBio}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-8">
              {/* Related Posts */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6"
              >
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Related Posts
                </h3>
                <div className="space-y-4">
                  {relatedPosts.map((relatedPost, index) => (
                    <Link
                      key={index}
                      to={`/blog/${relatedPost.slug}`}
                      className="block group"
                    >
                      <div className="flex space-x-3">
                        <img
                          src={relatedPost.image}
                          alt={relatedPost.title}
                          className="w-16 h-16 rounded-lg object-cover group-hover:scale-105 transition-transform duration-200"
                        />
                        <div className="flex-1">
                          <h4 className="text-sm font-medium text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-200 line-clamp-2">
                            {relatedPost.title}
                          </h4>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                            {relatedPost.readTime}
                          </p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </motion.div>

              {/* Newsletter Signup */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="bg-gradient-to-r from-primary-500 to-secondary-500 rounded-2xl p-6 text-white"
              >
                <h3 className="text-lg font-semibold mb-2">
                  Stay Updated
                </h3>
                <p className="text-white/90 text-sm mb-4">
                  Get the latest travel insights delivered to your inbox.
                </p>
                <div className="space-y-3">
                  <input
                    type="email"
                    placeholder="Your email"
                    className="w-full px-3 py-2 rounded-lg text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-white/50"
                  />
                  <Button size="sm" variant="secondary" className="w-full bg-white text-primary-600 hover:bg-gray-50">
                    Subscribe
                  </Button>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Spacer */}
      <div className="py-16" />
    </div>
  );
}