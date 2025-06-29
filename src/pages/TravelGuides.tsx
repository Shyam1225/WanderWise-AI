import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, MapPin, Calendar, Clock, Star, ChevronDown, ChevronUp, ArrowRight } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { Button } from '../components/ui/Button';

export function TravelGuides() {
  const { slug } = useParams();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedRegion, setSelectedRegion] = useState('all');
  const [showFilters, setShowFilters] = useState(false);

  const categories = [
    { id: 'all', name: 'All Categories' },
    { id: 'culture', name: 'Culture & History' },
    { id: 'adventure', name: 'Adventure & Outdoors' },
    { id: 'food', name: 'Food & Cuisine' },
    { id: 'budget', name: 'Budget Travel' },
    { id: 'luxury', name: 'Luxury Travel' },
  ];

  const regions = [
    { id: 'all', name: 'All Regions' },
    { id: 'asia', name: 'Asia' },
    { id: 'europe', name: 'Europe' },
    { id: 'americas', name: 'Americas' },
    { id: 'africa', name: 'Africa' },
    { id: 'oceania', name: 'Oceania' },
  ];

  const guides = [
    {
      id: 1,
      title: 'The Ultimate Guide to Tokyo',
      excerpt: 'Discover the perfect blend of tradition and innovation in Japan\'s vibrant capital.',
      image: 'https://images.pexels.com/photos/2506923/pexels-photo-2506923.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=2',
      author: 'Sarah Chen',
      date: '2024-01-15',
      readTime: '12 min read',
      category: 'culture',
      region: 'asia',
      rating: 4.8,
      slug: 'ultimate-guide-tokyo',
      content: `
        <h2>Exploring Tokyo: A Comprehensive Guide</h2>
        <p>Tokyo, Japan's busy capital, mixes the ultramodern and the traditional, from neon-lit skyscrapers to historic temples. The city's history can be appreciated in districts such as Asakusa and in many excellent museums, historic temples, and gardens.</p>
        
        <h3>When to Visit</h3>
        <p>The best times to visit Tokyo are spring (March to May) and fall (September to November). During these seasons, you'll find mild temperatures and beautiful cherry blossoms or autumn colors.</p>
        
        <h3>Getting Around</h3>
        <p>Tokyo's public transportation system is efficient and extensive. The subway and JR trains connect most parts of the city. Consider getting a Suica or Pasmo card for seamless travel.</p>
        
        <h3>Must-Visit Attractions</h3>
        <ul>
          <li>Senso-ji Temple in Asakusa</li>
          <li>Meiji Shrine</li>
          <li>Tokyo Skytree</li>
          <li>Shibuya Crossing</li>
          <li>Shinjuku Gyoen National Garden</li>
          <li>Tsukiji Outer Market</li>
        </ul>
        
        <h3>Food Experiences</h3>
        <p>Tokyo is a food lover's paradise. Don't miss trying authentic sushi, ramen, tempura, and yakitori. Visit Tsukiji for fresh seafood, explore department store food halls, and experience an izakaya (Japanese pub).</p>
        
        <h3>Shopping Districts</h3>
        <p>For shopping, explore Ginza for luxury brands, Shibuya and Harajuku for youth fashion, and Akihabara for electronics and anime merchandise.</p>
        
        <h3>Day Trips from Tokyo</h3>
        <p>Consider day trips to Kamakura, Nikko, or Hakone to experience more of Japan's natural beauty and historical sites.</p>
      `
    },
    {
      id: 2,
      title: 'Hidden Gems of Paris',
      excerpt: 'Look beyond the Eiffel Tower and discover the secret spots that locals love.',
      image: 'https://images.pexels.com/photos/338515/pexels-photo-338515.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=2',
      author: 'Marcus Thompson',
      date: '2024-01-10',
      readTime: '10 min read',
      category: 'culture',
      region: 'europe',
      rating: 4.7,
      slug: 'hidden-gems-paris',
      content: `
        <h2>Paris Beyond the Postcard</h2>
        <p>While the Eiffel Tower, Louvre, and Notre-Dame are must-sees for first-time visitors, Paris has countless hidden treasures waiting to be discovered by those willing to venture off the beaten path.</p>
        
        <h3>Lesser-Known Museums</h3>
        <p>Skip the crowds at the Louvre and explore the Musée de l'Orangerie, Musée Rodin, or the quirky Musée de la Chasse et de la Nature (Museum of Hunting and Nature).</p>
        
        <h3>Secret Passages</h3>
        <p>Explore the covered passages of Paris - 19th-century shopping arcades with beautiful glass roofs. Passage des Panoramas and Galerie Vivienne are particularly charming.</p>
        
        <h3>Local Neighborhoods</h3>
        <p>Wander through Belleville for street art and multicultural vibes, Canal Saint-Martin for hipster cafés, or Butte-aux-Cailles for a village-like atmosphere within the city.</p>
        
        <h3>Hidden Gardens</h3>
        <p>Find tranquility at Jardin du Palais Royal, Parc de Belleville with its stunning city views, or the elevated Coulée Verte René-Dumont (Paris' version of NYC's High Line).</p>
        
        <h3>Culinary Secrets</h3>
        <p>Discover local markets like Marché d'Aligre, small bistros in the 11th arrondissement, and artisanal food shops in the Rue Montorgueil area.</p>
        
        <h3>Unusual Experiences</h3>
        <p>Descend into the Paris Catacombs, take a movie tour of Montmartre, or enjoy a concert in the medieval Sainte-Chapelle surrounded by stunning stained glass.</p>
      `
    },
    {
      id: 3,
      title: 'Trekking the Inca Trail',
      excerpt: 'A comprehensive guide to preparing for and experiencing this iconic Peruvian adventure.',
      image: 'https://images.pexels.com/photos/2356045/pexels-photo-2356045.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=2',
      author: 'Elena Kowalski',
      date: '2024-01-05',
      readTime: '15 min read',
      category: 'adventure',
      region: 'americas',
      rating: 4.9,
      slug: 'trekking-inca-trail',
      content: `
        <h2>Conquering the Inca Trail to Machu Picchu</h2>
        <p>The Inca Trail is one of the world's most famous trekking routes, leading through stunning Andean landscapes to the magnificent Machu Picchu. This 26-mile (42 km) journey follows ancient pathways laid by the Inca civilization.</p>
        
        <h3>Planning and Permits</h3>
        <p>Permits are strictly limited and sell out months in advance. Book with an authorized tour operator at least 6 months before your planned trek. The trail is closed in February for maintenance.</p>
        
        <h3>Physical Preparation</h3>
        <p>The trek involves significant elevation changes, reaching 13,828 feet (4,215 meters) at Dead Woman's Pass. Begin cardio and strength training at least 3 months before your trek, focusing on leg strength and aerobic endurance.</p>
        
        <h3>Packing Essentials</h3>
        <ul>
          <li>Broken-in hiking boots</li>
          <li>Layered clothing for variable temperatures</li>
          <li>Rain gear (even in dry season)</li>
          <li>Trekking poles</li>
          <li>Headlamp</li>
          <li>Water purification</li>
          <li>First aid supplies</li>
          <li>Altitude sickness medication</li>
        </ul>
        
        <h3>The Route</h3>
        <p>The classic 4-day trek includes:</p>
        <ul>
          <li>Day 1: Moderate hiking through the Sacred Valley</li>
          <li>Day 2: The challenging climb to Dead Woman's Pass</li>
          <li>Day 3: Multiple archaeological sites and varied terrain</li>
          <li>Day 4: Pre-dawn hike to reach Machu Picchu for sunrise</li>
        </ul>
        
        <h3>Cultural Significance</h3>
        <p>Along the way, you'll encounter numerous Inca ruins and learn about the sophisticated civilization that built this remarkable network of trails connecting their vast empire.</p>
        
        <h3>Alternative Options</h3>
        <p>If permits are unavailable, consider the Salkantay Trek, Lares Trek, or Quarry Trail as alternatives that still culminate at Machu Picchu.</p>
      `
    },
    {
      id: 4,
      title: 'Street Food Safari: Bangkok',
      excerpt: 'Navigate the vibrant street food scene of Thailand\'s capital like a local foodie.',
      image: 'https://images.pexels.com/photos/2474690/pexels-photo-2474690.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=2',
      author: 'Carlos Mendoza',
      date: '2023-12-28',
      readTime: '8 min read',
      category: 'food',
      region: 'asia',
      rating: 4.6,
      slug: 'street-food-bangkok',
      content: `
        <h2>Bangkok: Street Food Paradise</h2>
        <p>Bangkok's street food scene is legendary, offering an incredible variety of flavors, textures, and aromas that represent the heart and soul of Thai cuisine.</p>
        
        <h3>Best Street Food Areas</h3>
        <ul>
          <li>Chinatown (Yaowarat) - The ultimate street food destination, especially after sunset</li>
          <li>Wang Lang Market - Authentic local experience across the river</li>
          <li>Sukhumvit Soi 38 - Upscale street food popular with expats</li>
          <li>Or Tor Kor Market - Premium fresh ingredients and prepared foods</li>
          <li>Ratchawat Market - Off the tourist trail with excellent northern Thai specialties</li>
        </ul>
        
        <h3>Must-Try Dishes</h3>
        <ul>
          <li>Pad Thai - Stir-fried rice noodles with egg, tofu, bean sprouts, and peanuts</li>
          <li>Som Tam - Spicy green papaya salad</li>
          <li>Moo Ping - Grilled pork skewers</li>
          <li>Khao Soi - Northern Thai curry noodle soup</li>
          <li>Mango Sticky Rice - Sweet coconut rice with fresh mango</li>
          <li>Boat Noodles - Intense, flavorful noodle soup served in small bowls</li>
        </ul>
        
        <h3>Food Safety Tips</h3>
        <p>Look for stalls with high turnover, where food is cooked fresh to order. Busy places with locals are usually safe bets. Carry hand sanitizer and be cautious with ice in drinks if you have a sensitive stomach.</p>
        
        <h3>Etiquette and Ordering</h3>
        <p>Point and smile works well if you don't speak Thai. Learn basic phrases like "pet noi" (a little spicy) or "mai pet" (not spicy). Street food is typically cash-only, so keep small bills handy.</p>
        
        <h3>Guided Food Tours</h3>
        <p>Consider a guided food tour for your first day to get oriented. Many excellent tours operate in different neighborhoods, combining food with cultural and historical insights.</p>
      `
    },
    {
      id: 5,
      title: 'Budget Travel in Europe',
      excerpt: 'How to experience the best of Europe without breaking the bank.',
      image: 'https://images.pexels.com/photos/1285625/pexels-photo-1285625.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=2',
      author: 'Alex Thompson',
      date: '2023-12-20',
      readTime: '14 min read',
      category: 'budget',
      region: 'europe',
      rating: 4.5,
      slug: 'budget-travel-europe',
      content: `
        <h2>Europe on a Budget: Making the Most of Your Euros</h2>
        <p>Traveling through Europe doesn't have to drain your savings. With strategic planning and insider knowledge, you can experience the rich culture, history, and beauty of Europe while keeping costs manageable.</p>
        
        <h3>Affordable Destinations</h3>
        <p>Consider these budget-friendly European destinations:</p>
        <ul>
          <li>Portugal - Stunning coastlines, historic cities, and excellent food at reasonable prices</li>
          <li>Eastern Europe - Countries like Poland, Hungary, and Romania offer incredible value</li>
          <li>Greece - Outside of Santorini and Mykonos, many Greek islands are surprisingly affordable</li>
          <li>Spain - Especially inland cities and northern regions</li>
          <li>Turkey - Straddling Europe and Asia with exceptional value for money</li>
        </ul>
        
        <h3>Transportation Hacks</h3>
        <ul>
          <li>Book flights 2-3 months in advance and be flexible with dates</li>
          <li>Consider budget airlines like Ryanair, EasyJet, and Wizz Air</li>
          <li>Explore rail passes like Eurail for extensive train travel</li>
          <li>Use ride-sharing services like BlaBlaCar for intercity travel</li>
          <li>In cities, buy multi-day public transportation passes</li>
        </ul>
        
        <h3>Accommodation Strategies</h3>
        <ul>
          <li>Hostels - Not just for students; many offer private rooms</li>
          <li>Guesthouses and B&Bs - Often cheaper than hotels with more character</li>
          <li>Apartment rentals - Economical for longer stays and groups</li>
          <li>House sitting - Free accommodation in exchange for watching someone's home</li>
          <li>University housing - Available during summer breaks in many cities</li>
        </ul>
        
        <h3>Eating Well for Less</h3>
        <ul>
          <li>Shop at local markets and prepare simple meals</li>
          <li>Seek out "menu del día" or fixed-price lunch specials</li>
          <li>Street food and takeaway options</li>
          <li>Picnic in parks with local specialties</li>
          <li>Drink tap water where safe (most of Western and Northern Europe)</li>
        </ul>
        
        <h3>Free and Low-Cost Experiences</h3>
        <ul>
          <li>Free walking tours (tip-based) in most major cities</li>
          <li>Museums with free entry days or hours</li>
          <li>Public parks, gardens, and architectural landmarks</li>
          <li>Hiking in accessible natural areas</li>
          <li>Local festivals and community events</li>
        </ul>
      `
    },
    {
      id: 6,
      title: 'Luxury Safari in Tanzania',
      excerpt: 'Experience the ultimate wildlife adventure with premium accommodations and services.',
      image: 'https://images.pexels.com/photos/259447/pexels-photo-259447.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=2',
      author: 'Dr. Lisa Park',
      date: '2023-12-15',
      readTime: '11 min read',
      category: 'luxury',
      region: 'africa',
      rating: 4.9,
      slug: 'luxury-safari-tanzania',
      content: `
        <h2>Tanzania: The Ultimate Luxury Safari Experience</h2>
        <p>Tanzania offers some of Africa's most spectacular wildlife viewing opportunities combined with world-class luxury accommodations. From the iconic Serengeti to the breathtaking Ngorongoro Crater, a luxury safari here represents the pinnacle of wildlife adventure.</p>
        
        <h3>When to Visit</h3>
        <p>The best wildlife viewing months are during the dry season from June to October. For the Great Migration in the Serengeti, visit between July and September for river crossings or February for calving season.</p>
        
        <h3>Luxury Lodges and Camps</h3>
        <p>Tanzania excels in luxury safari accommodations that blend seamlessly with the environment:</p>
        <ul>
          <li>Four Seasons Safari Lodge Serengeti - Opulent rooms with private plunge pools overlooking waterholes</li>
          <li>Singita Grumeti - Exclusive private reserve with multiple luxury lodges</li>
          <li>andBeyond Ngorongoro Crater Lodge - Sumptuous "Versailles meets Maasai" design on the crater rim</li>
          <li>Nomad Tanzania's Lamai Serengeti - Sophisticated design with panoramic views</li>
          <li>Roving Bushtops - Mobile luxury camp that follows the migration</li>
        </ul>
        
        <h3>Premium Safari Experiences</h3>
        <ul>
          <li>Private game drives with expert guides and trackers</li>
          <li>Hot air balloon safaris over the Serengeti at dawn</li>
          <li>Helicopter excursions to remote areas</li>
          <li>Walking safaris with armed rangers</li>
          <li>Sundowners in spectacular settings</li>
          <li>Bush dinners under the stars</li>
          <li>Cultural interactions with Maasai communities</li>
        </ul>
        
        <h3>Key Wildlife Areas</h3>
        <ul>
          <li>Serengeti National Park - Endless plains and the Great Migration</li>
          <li>Ngorongoro Crater - Natural wildlife enclosure with dense populations</li>
          <li>Tarangire National Park - Famous for elephants and baobab trees</li>
          <li>Lake Manyara - Tree-climbing lions and flamingo-filled lakes</li>
          <li>Selous Game Reserve - Vast wilderness with boat safaris</li>
          <li>Ruaha National Park - Remote and untouched with few visitors</li>
        </ul>
        
        <h3>Combining Your Safari</h3>
        <p>Complete your Tanzanian journey with:</p>
        <ul>
          <li>Beach extension to Zanzibar for white sand beaches and turquoise waters</li>
          <li>Climbing Mount Kilimanjaro, Africa's highest peak</li>
          <li>Visiting chimpanzees in Mahale Mountains or Gombe Stream</li>
        </ul>
      `
    },
  ];

  // Filter guides based on search term and selected filters
  const filteredGuides = guides.filter(guide => {
    const matchesSearch = guide.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         guide.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         guide.author.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === 'all' || guide.category === selectedCategory;
    const matchesRegion = selectedRegion === 'all' || guide.region === selectedRegion;
    
    return matchesSearch && matchesCategory && matchesRegion;
  });

  // If slug is provided, show the specific guide
  if (slug) {
    const guide = guides.find(g => g.slug === slug);
    
    if (!guide) {
      return (
        <div className="min-h-screen pt-16 bg-white dark:bg-gray-900 flex items-center justify-center">
          <div className="text-center">
            <MapPin className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Guide not found
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              The travel guide you're looking for doesn't exist or has been moved.
            </p>
            <Link to="/travel-guides">
              <Button>
                Browse All Guides
              </Button>
            </Link>
          </div>
        </div>
      );
    }
    
    return (
      <div className="min-h-screen pt-16 bg-white dark:bg-gray-900">
        {/* Guide Header */}
        <section className="py-16 bg-gradient-to-r from-primary-50 to-secondary-50 dark:from-gray-800 dark:to-gray-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Link to="/travel-guides" className="inline-flex items-center text-primary-600 dark:text-primary-400 mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
              Back to All Guides
            </Link>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center"
            >
              <div>
                <div className="flex items-center space-x-2 mb-4">
                  <span className="px-3 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 text-sm font-medium rounded-full">
                    {categories.find(c => c.id === guide.category)?.name}
                  </span>
                  <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-sm font-medium rounded-full">
                    {regions.find(r => r.id === guide.region)?.name}
                  </span>
                </div>
                
                <h1 className="text-3xl sm:text-4xl font-display font-bold text-gray-900 dark:text-white mb-4">
                  {guide.title}
                </h1>
                
                <div className="flex items-center space-x-4 text-gray-600 dark:text-gray-300 mb-6">
                  <div className="flex items-center">
                    <Star className="w-5 h-5 text-yellow-500 fill-current mr-1" />
                    <span>{guide.rating} rating</span>
                  </div>
                  
                  <div className="flex items-center">
                    <Clock className="w-5 h-5 mr-1" />
                    <span>{guide.readTime}</span>
                  </div>
                </div>
                
                <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                  {guide.excerpt}
                </p>
              </div>
              
              <div className="rounded-2xl overflow-hidden shadow-xl">
                <img
                  src={guide.image}
                  alt={guide.title}
                  className="w-full h-80 object-cover"
                />
              </div>
            </motion.div>
          </div>
        </section>
        
        {/* Guide Content */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
              <div className="flex items-center space-x-4 mb-8 pb-8 border-b border-gray-200 dark:border-gray-700">
                <img
                  src="https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2"
                  alt={guide.author}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">
                    {guide.author}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Published on {new Date(guide.date).toLocaleDateString()}
                  </p>
                </div>
              </div>
              
              <div 
                className="prose prose-lg max-w-none dark:prose-invert prose-headings:font-display prose-headings:font-bold prose-a:text-primary-600 dark:prose-a:text-primary-400"
                dangerouslySetInnerHTML={{ __html: guide.content }}
              />
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-primary-600 to-secondary-600">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-display font-bold text-white mb-4">
                Ready to Experience {guide.title.split(':')[0]}?
              </h2>
              <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                Let our AI travel planner create a personalized itinerary based on this guide.
              </p>
              <Link to="/trip-planner">
                <Button variant="secondary" size="lg" className="bg-white text-primary-600 hover:bg-gray-50">
                  Plan My Trip Now
                </Button>
              </Link>
            </motion.div>
          </div>
        </section>
      </div>
    );
  }

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
              Expert Travel Guides
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Discover in-depth guides written by travel experts and enhanced by AI to help you 
              plan the perfect trip with insider tips and local knowledge.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="py-8 bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search travel guides..."
                className="w-full pl-10 pr-4 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 text-gray-900 dark:text-white"
              />
            </div>

            {/* Filter Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center space-x-2 px-4 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
            >
              <Filter className="w-5 h-5" />
              <span>Filters</span>
              {showFilters ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
          </div>

          {/* Expanded Filters */}
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4"
            >
              {/* Categories */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Category
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-4 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 text-gray-900 dark:text-white"
                >
                  {categories.map(category => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Regions */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Region
                </label>
                <select
                  value={selectedRegion}
                  onChange={(e) => setSelectedRegion(e.target.value)}
                  className="w-full px-4 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 text-gray-900 dark:text-white"
                >
                  {regions.map(region => (
                    <option key={region.id} value={region.id}>
                      {region.name}
                    </option>
                  ))}
                </select>
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* Guides Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredGuides.map((guide, index) => (
              <motion.article
                key={guide.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group"
              >
                <Link to={`/travel-guides/${guide.slug}`}>
                  <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 group-hover:-translate-y-2 overflow-hidden">
                    <div className="relative">
                      <img
                        src={guide.image}
                        alt={guide.title}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm text-gray-600 dark:text-gray-300 text-sm font-medium rounded-full">
                          {categories.find(c => c.id === guide.category)?.name}
                        </span>
                      </div>
                      <div className="absolute top-4 right-4">
                        <span className="flex items-center space-x-1 px-3 py-1 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm text-gray-600 dark:text-gray-300 text-sm font-medium rounded-full">
                          <Star className="w-3 h-3 text-yellow-500 fill-current" />
                          <span>{guide.rating}</span>
                        </span>
                      </div>
                    </div>
                    
                    <div className="p-6">
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-200">
                        {guide.title}
                      </h3>
                      
                      <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-3">
                        {guide.excerpt}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3 text-sm text-gray-500 dark:text-gray-400">
                          <div className="flex items-center">
                            <MapPin className="w-4 h-4 mr-1" />
                            <span>{regions.find(r => r.id === guide.region)?.name}</span>
                          </div>
                          <div className="flex items-center">
                            <Clock className="w-4 h-4 mr-1" />
                            <span>{guide.readTime}</span>
                          </div>
                        </div>
                        
                        <div className="text-primary-600 dark:text-primary-400 group-hover:translate-x-1 transition-transform duration-200">
                          <ArrowRight className="w-5 h-5" />
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
          
          {filteredGuides.length === 0 && (
            <div className="text-center py-16">
              <MapPin className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                No guides found
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Try adjusting your search criteria or browse all guides.
              </p>
              <Button onClick={() => {
                setSearchTerm('');
                setSelectedCategory('all');
                setSelectedRegion('all');
              }}>
                View All Guides
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary-600 to-secondary-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-display font-bold text-white mb-4">
              Ready to Plan Your Next Adventure?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Use our AI-powered trip planner to create a personalized itinerary based on these guides.
            </p>
            <Link to="/trip-planner">
              <Button variant="secondary" size="lg" className="bg-white text-primary-600 hover:bg-gray-50">
                Start Planning Now
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}