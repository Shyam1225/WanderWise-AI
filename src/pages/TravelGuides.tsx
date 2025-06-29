import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Book, Clock, User, Star, Search, Filter, Calendar, MapPin, ArrowLeft } from 'lucide-react';
import { Button } from '../components/ui/Button';

export function TravelGuides() {
  const { slug } = useParams();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Guides' },
    { id: 'planning', name: 'Trip Planning' },
    { id: 'culture', name: 'Culture & Etiquette' },
    { id: 'food', name: 'Food & Dining' },
    { id: 'safety', name: 'Safety & Health' },
    { id: 'budget', name: 'Budget Travel' },
    { id: 'photography', name: 'Photography' },
  ];

  const guides = [
    {
      id: 1,
      title: 'The Ultimate Guide to Solo Travel in Southeast Asia',
      category: 'planning',
      author: 'Sarah Chen',
      authorImage: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
      readTime: '12 min read',
      publishDate: '2024-01-15',
      image: 'https://images.pexels.com/photos/1371360/pexels-photo-1371360.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=2',
      excerpt: 'Everything you need to know about traveling solo through Thailand, Vietnam, Cambodia, and more. From safety tips to budget planning.',
      rating: 4.8,
      views: 15420,
      tags: ['Solo Travel', 'Southeast Asia', 'Budget', 'Safety'],
      slug: 'solo-travel-southeast-asia',
      content: `
        <h2>Introduction</h2>
        <p>Solo travel in Southeast Asia offers an unparalleled opportunity for self-discovery, adventure, and cultural immersion. This comprehensive guide will help you navigate the diverse countries of this region with confidence, whether you're a first-time solo traveler or a seasoned explorer looking to deepen your understanding of this fascinating part of the world.</p>
        
        <h2>Getting Started</h2>
        <p>Before embarking on your Southeast Asian adventure, it's essential to prepare properly. Research visa requirements for each country you plan to visit, as they vary significantly. Thailand offers visa-free entry for many nationalities for up to 30 days, while Vietnam requires a visa or pre-approval letter for most visitors. Cambodia and Laos offer visas on arrival, but it's always best to check the latest requirements before traveling.</p>
        
        <p>When it comes to packing, less is more. The region's tropical climate means lightweight, breathable clothing is essential. Pack modest attire for temple visits (covering shoulders and knees), comfortable walking shoes, and a light rain jacket for unexpected showers. Don't forget insect repellent, sunscreen, and a basic first-aid kit.</p>
        
        <h2>Essential Tips</h2>
        <p>As a solo traveler in Southeast Asia, your safety should be a priority. While the region is generally safe for tourists, it's important to stay vigilant, especially in crowded areas and tourist hotspots where petty theft can occur. Keep your valuables secure, avoid walking alone late at night in unfamiliar areas, and trust your instincts.</p>
        
        <p>Communication can sometimes be challenging, but learning a few basic phrases in the local language goes a long way. English is widely spoken in tourist areas, particularly in Singapore, Malaysia, and the Philippines, but less so in rural areas of Vietnam, Laos, and Cambodia.</p>
        
        <p>Budget-wise, Southeast Asia remains one of the most affordable regions for travelers. You can comfortably travel on $30-50 per day, including accommodation, food, and local transportation. Street food is not only delicious but also incredibly cheap, often costing just $1-3 per meal.</p>
        
        <h2>Detailed Guide</h2>
        <p>Thailand is often the gateway to Southeast Asia for many travelers, and for good reason. Bangkok's vibrant street life, Chiang Mai's cultural richness, and the southern islands' paradise-like beaches offer diverse experiences. Don't miss the Sunday Walking Street Market in Chiang Mai, where you can sample local delicacies and purchase handcrafted souvenirs.</p>
        
        <p>Vietnam presents a fascinating blend of natural beauty and complex history. The country's north-to-south geography makes it ideal for a linear travel route. Start in Hanoi, exploring the Old Quarter's narrow streets and sampling the world-famous pho. Continue to Halong Bay for breathtaking limestone karsts rising from emerald waters. Central Vietnam offers the historic town of Hoi An with its lantern-lit streets and excellent tailoring services. Conclude your journey in Ho Chi Minh City, where French colonial architecture stands alongside modern skyscrapers.</p>
        
        <p>Cambodia's Angkor Wat is a must-visit, but allow at least three days to explore the vast temple complex properly. Rise early to catch the sunrise over the main temple – a truly magical experience. Beyond Angkor, Cambodia offers the sobering Killing Fields near Phnom Penh, providing important historical context, and the laid-back riverside town of Kampot, famous for its pepper plantations.</p>
        
        <blockquote>
        The world is a book and those who do not travel read only one page.
        — St. Augustine
        </blockquote>
        
        <h2>Practical Information</h2>
        <p>Transportation in Southeast Asia is an adventure in itself. Overnight buses are an economical way to cover long distances, though comfort levels vary dramatically. For shorter journeys, motorbike taxis and tuk-tuks offer convenient and affordable options. When crossing borders overland, be wary of scams and always use official border crossings.</p>
        
        <p>Accommodation options range from basic hostels (starting at $5-10 per night) to mid-range hotels ($20-40) and luxury resorts. Booking platforms like Hostelworld and Agoda are popular in the region, but don't be afraid to negotiate prices directly, especially during off-peak seasons.</p>
        
        <p>Solo female travelers should take additional precautions, such as avoiding isolated areas after dark and dressing modestly to respect local customs. That said, Southeast Asia is generally welcoming and safe for women traveling alone, and you'll likely meet other solo female travelers along the way.</p>
        
        <h2>Conclusion</h2>
        <p>Solo travel in Southeast Asia is a rewarding experience that will challenge and change you. Embrace the unexpected, be open to new experiences, and don't be afraid to adjust your plans as you go. The connections you make with locals and fellow travelers will often become the most treasured memories of your journey.</p>
        
        <p>Remember that the best travel experiences often happen when things don't go according to plan. Stay flexible, maintain a positive attitude, and immerse yourself in the rich tapestry of cultures that make Southeast Asia such a captivating destination for solo adventurers.</p>
      `
    },
    {
      id: 2,
      title: 'European Train Travel: A Complete Guide',
      category: 'planning',
      author: 'Marcus Rodriguez',
      authorImage: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
      readTime: '15 min read',
      publishDate: '2024-01-10',
      image: 'https://images.pexels.com/photos/386009/pexels-photo-386009.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=2',
      excerpt: 'Master the art of train travel across Europe with our comprehensive guide to routes, passes, and booking strategies.',
      rating: 4.9,
      views: 23150,
      tags: ['Europe', 'Train Travel', 'Transportation', 'Planning'],
      slug: 'european-train-travel',
      content: `
        <h2>Introduction</h2>
        <p>Train travel in Europe offers an unparalleled combination of comfort, convenience, and scenic beauty. Unlike the stress of airports or the limitations of road trips, European trains connect city centers with minimal hassle, allowing you to experience the changing landscapes and cultures at a leisurely pace. This comprehensive guide will help you navigate Europe's extensive rail network like a seasoned traveler.</p>
        
        <h2>Understanding European Rail Networks</h2>
        <p>Europe boasts one of the world's most developed rail systems, with high-speed trains connecting major cities and regional services reaching smaller towns and villages. Key high-speed networks include France's TGV, Germany's ICE, Italy's Frecciarossa, and Spain's AVE, which can reach speeds of up to 320 km/h (200 mph), making train travel competitive with flying for many routes.</p>
        
        <p>The European rail network operates on a hub-and-spoke model, with major cities serving as connection points. Paris, Munich, Zurich, and Milan are particularly important hubs where multiple international routes converge. Understanding this structure helps when planning multi-country itineraries.</p>
        
        <h2>Rail Passes vs. Point-to-Point Tickets</h2>
        <p>One of the first decisions to make when planning European train travel is whether to purchase a rail pass or individual tickets. Eurail passes (for non-European residents) and Interrail passes (for European residents) offer flexible travel across multiple countries for a fixed price.</p>
        
        <p>Rail passes make economic sense if you plan to take multiple long-distance or high-speed journeys, particularly in more expensive countries like Switzerland, Germany, and France. However, for limited travel or in Eastern European countries where train tickets are already inexpensive, point-to-point tickets often prove more economical.</p>
        
        <p>When considering a rail pass, calculate the approximate cost of your planned journeys using ticket booking sites, then compare with the pass price. Remember that even with a pass, some high-speed and overnight trains require reservations for an additional fee.</p>
        
        <h2>Booking Strategies</h2>
        <p>For point-to-point tickets, booking early can save you significant money. Most European rail operators release tickets 90-120 days in advance, with limited early-bird fares that can be 50-70% cheaper than last-minute prices. Websites like Trainline, Rail Europe, and national rail operator sites (SNCF Connect, Deutsche Bahn, Trenitalia) are excellent booking resources.</p>
        
        <p>When booking connections, allow at least 30 minutes for transfers within the same station and 1-2 hours if changing stations within a city. Some booking systems automatically include sufficient transfer times, but it's always wise to double-check.</p>
        
        <blockquote>
        Travel isn't always comfortable. Sometimes it hurts, it even breaks your heart. But that's okay. The journey changes you; it should change you.
        — Anthony Bourdain
        </blockquote>
        
        <h2>Classes and Comfort</h2>
        <p>European trains typically offer first and second class carriages. Second class is comfortable and significantly cheaper, making it the preferred option for most travelers. First class offers wider seats, more legroom, and sometimes complimentary refreshments or Wi-Fi, which might be worth the upgrade on longer journeys.</p>
        
        <p>For overnight trips, options range from regular seats (not recommended for good sleep) to couchettes (shared compartments with 4-6 bunks) to private sleeper cabins. The latter provides the best rest but comes at a premium price.</p>
        
        <h2>Scenic Routes</h2>
        <p>While high-speed trains efficiently connect major cities, some of Europe's most memorable rail journeys are on slower regional lines that prioritize scenery over speed. The Bernina Express through the Swiss Alps, Norway's Bergen Railway, Scotland's West Highland Line, and the Flåm Railway offer breathtaking views that can't be experienced any other way.</p>
        
        <p>For these scenic routes, consider splurging on panoramic carriages when available, and always try to travel during daylight hours to fully appreciate the landscapes.</p>
        
        <h2>Practical Tips</h2>
        <p>Always validate your ticket before boarding if required (particularly in Italy, France, and Eastern Europe) using the small machines at platform entrances. Failure to do so can result in fines even with a valid ticket.</p>
        
        <p>Pack light and use luggage that's easy to lift and store. Unlike airports, most train stations don't offer luggage carts, and you'll need to carry your bags up and down stairs in many older stations.</p>
        
        <p>Download essential apps like DB Navigator (which shows schedules for most European trains), Trainline, or national rail operator apps. Many offer real-time updates on platform changes or delays.</p>
        
        <p>Consider purchasing travel insurance that covers train delays and cancellations, particularly if you have tight connections or non-refundable accommodations.</p>
        
        <h2>Conclusion</h2>
        <p>Train travel remains one of the most civilized and sustainable ways to explore Europe. It allows you to arrive in city centers refreshed and ready to explore, witness stunning landscapes from comfort, and experience the changing cultures gradually rather than abruptly.</p>
        
        <p>Whether you're planning a dedicated rail journey or incorporating trains into a broader European adventure, understanding the systems and planning ahead will ensure a smooth and enjoyable experience. With this guide in hand, you're ready to join the ranks of savvy travelers who consider the journey itself a highlight of their European adventure.</p>
      `
    },
    {
      id: 3,
      title: 'Japanese Dining Etiquette: Do\'s and Don\'ts',
      category: 'culture',
      author: 'Elena Kowalski',
      authorImage: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
      readTime: '8 min read',
      publishDate: '2024-01-08',
      image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=2',
      excerpt: 'Navigate Japanese dining culture with confidence. Learn proper chopstick etiquette, ordering customs, and table manners.',
      rating: 4.7,
      views: 18930,
      tags: ['Japan', 'Culture', 'Food', 'Etiquette'],
      slug: 'japanese-dining-etiquette',
      content: `
        <h2>Introduction</h2>
        <p>Japanese dining etiquette might seem intimidating at first, but understanding the basics will enhance your culinary experiences in Japan and show respect for the local culture. This guide covers essential do's and don'ts that will help you navigate everything from casual izakayas to formal kaiseki restaurants with confidence and courtesy.</p>
        
        <h2>Before the Meal</h2>
        <p>When entering a restaurant in Japan, you'll often be greeted with "Irasshaimase!" (Welcome!). There's no need to respond; a simple nod is sufficient. Many traditional establishments will ask you to remove your shoes, so wear socks without holes and shoes that are easy to slip on and off.</p>
        
        <p>If you're provided with an oshibori (wet towel), use it to clean your hands before eating, not your face or neck. This cleansing ritual is an important first step in the Japanese dining experience.</p>
        
        <p>When ordering, pointing to menu items or pictures is perfectly acceptable. Many restaurants have plastic food displays or picture menus to help with this. If you have dietary restrictions, it's helpful to have these written in Japanese, as English comprehension varies widely.</p>
        
        <h2>Chopstick Etiquette</h2>
        <p>Proper chopstick use is perhaps the most visible aspect of Japanese dining etiquette. Hold your chopsticks about one-third of the way from the top, using your thumb, index, and middle fingers. The bottom chopstick should remain stationary while the top one moves.</p>
        
        <p>Never stick your chopsticks vertically into a bowl of rice, as this resembles funeral incense and is considered extremely inauspicious. Similarly, avoid passing food directly from your chopsticks to someone else's, as this mimics a funeral ritual where cremated bones are passed between family members.</p>
        
        <p>When not using your chopsticks, place them on the chopstick rest (hashioki) or across your plate or bowl. If neither option is available, you can place them together on the table with the tips pointing left.</p>
        
        <p>Using chopsticks to spear food, pointing with them, or waving them around while talking are all considered poor manners. Similarly, rubbing chopsticks together (to remove splinters) suggests that you think the restaurant has provided poor quality utensils.</p>
        
        <h2>During the Meal</h2>
        <p>Before eating, it's customary to say "Itadakimasu" (I humbly receive). This expresses gratitude for everyone involved in preparing the meal, from farmers to cooks.</p>
        
        <p>In Japan, slurping noodles is not only acceptable but often encouraged, as it shows appreciation and helps cool hot noodles as you eat them. However, slurping other foods or making loud noises while eating rice is not appropriate.</p>
        
        <p>When eating rice, hold the bowl in your non-dominant hand, close to your mouth, rather than bending down to the table. For soup, you can drink directly from the bowl for the broth and use chopsticks for solid ingredients.</p>
        
        <blockquote>
        In Japan, food is never just food; it's a complete sensory experience that engages all five senses and connects you to centuries of tradition.
        — Elena Kowalski
        </blockquote>
        
        <h2>Drinking Etiquette</h2>
        <p>Pouring drinks for others is an important social custom in Japan. Never pour your own drink first; instead, serve others and they will reciprocate. Hold the bottle with both hands when pouring, and similarly, use both hands to hold your glass when someone is pouring for you.</p>
        
        <p>When toasting, the common expression is "Kanpai!" Hold your glass at a slightly lower position than someone senior to you as a sign of respect. It's considered polite to ensure that no one's glass is empty, so be attentive to your companions' drinks.</p>
        
        <p>If you don't wish to drink alcohol, it's perfectly acceptable to ask for non-alcoholic options. Simply having a drink in your glass for toasting purposes is sufficient; you don't need to consume it.</p>
        
        <h2>Paying and Tipping</h2>
        <p>In Japan, the bill is typically placed on the table or brought to you in a small tray or folder. Take this to the cashier to pay; paying at the table is uncommon except in high-end establishments. Many smaller restaurants and shops are cash-only, so it's wise to carry sufficient yen.</p>
        
        <p>Tipping is not customary in Japan and can even cause confusion or discomfort. The price you're quoted includes service, and Japanese service professionals take pride in doing their job well without additional incentives. If you attempt to leave a tip, it may be politely refused or returned to you.</p>
        
        <p>Instead of tipping, show your appreciation with a sincere "Gochisousama deshita" (Thank you for the meal) when leaving.</p>
        
        <h2>Special Dining Situations</h2>
        <p>At izakayas (Japanese pubs), food is typically shared family-style. Use the serving utensils provided to transfer food to your own plate before eating. If no serving utensils are available, you can use the opposite end of your chopsticks (the end that hasn't been in your mouth) to serve yourself.</p>
        
        <p>For sushi, it's acceptable to eat with your hands or chopsticks. When using soy sauce, pour a small amount into your dish and dip the fish side (not the rice) briefly – the rice would absorb too much sauce and fall apart. Apply wasabi directly to the sushi rather than mixing it into your soy sauce, which is considered improper in high-end sushi restaurants.</p>
        
        <p>During a traditional multi-course kaiseki meal, dishes are served in a specific order to highlight seasonal ingredients. Wait for the host or server to explain each dish before eating, and pace yourself, as these meals can include 10-15 courses.</p>
        
        <h2>Conclusion</h2>
        <p>Japanese dining etiquette may seem complex, but the underlying principles are straightforward: show respect for the food, the establishment, and your dining companions. Japanese people generally don't expect foreigners to know all the rules and will appreciate your efforts to observe basic customs.</p>
        
        <p>Remember that the goal of these traditions is to create a harmonious dining experience where everyone feels comfortable. By familiarizing yourself with these guidelines, you'll not only show respect for Japanese culture but also enhance your own appreciation of one of the world's most refined culinary traditions.</p>
      `
    },
    {
      id: 4,
      title: 'Budget Backpacking Through South America',
      category: 'budget',
      author: 'Carlos Mendoza',
      authorImage: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
      readTime: '20 min read',
      publishDate: '2024-01-05',
      image: 'https://images.pexels.com/photos/2356045/pexels-photo-2356045.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=2',
      excerpt: 'Explore South America on a shoestring budget. Tips for cheap accommodation, transportation, and unforgettable experiences.',
      rating: 4.6,
      views: 12780,
      tags: ['South America', 'Budget', 'Backpacking', 'Adventure'],
      slug: 'budget-backpacking-south-america',
      content: `
        <h2>Introduction</h2>
        <p>South America is a backpacker's dream: diverse landscapes ranging from the Amazon rainforest to Andean peaks, vibrant cultures with rich indigenous heritage, and a well-established backpacker trail that makes independent travel accessible yet adventurous. Best of all, many countries in South America offer incredible experiences at a fraction of the cost you'd pay in Europe or North America.</p>
        
        <p>This comprehensive guide will help you navigate South America on a shoestring budget, focusing on practical advice for accommodation, transportation, food, activities, and country-specific tips. With careful planning and local knowledge, you can experience the wonders of this continent for as little as $30-50 per day.</p>
        
        <h2>Planning Your Route</h2>
        <p>South America is vast, and trying to see everything in one trip is impossible. A common backpacking route begins in Colombia, heading south through Ecuador, Peru, Bolivia, and ending in Argentina or Chile. This "Gringo Trail" follows the Andes and hits many major attractions while offering relatively straightforward transportation connections.</p>
        
        <p>Consider the seasons when planning: the continent spans multiple climate zones, and while Peru might be dry and pleasant, southern Argentina could be in the depths of winter. Generally, shoulder seasons (April-June and September-November) offer good weather and fewer tourists across most of the continent.</p>
        
        <p>For a 3-month trip, focus on 3-4 countries rather than rushing through all 12. This allows deeper cultural immersion and reduces transportation costs, which can add up quickly when covering long distances.</p>
        
        <h2>Budget Accommodation</h2>
        <p>Hostels remain the backbone of budget accommodation in South America, with dorm beds ranging from $8-15 in Bolivia and Peru to $15-25 in more expensive countries like Chile and Argentina. Most hostels offer free Wi-Fi, communal kitchens, and are excellent places to meet fellow travelers and find companions for excursions.</p>
        
        <p>For longer stays, consider volunteering through platforms like Worldpackers or Workaway, where you exchange a few hours of work daily for free accommodation and sometimes meals. Popular opportunities include hostel work, teaching English, and farm stays.</p>
        
        <p>In rural areas, homestays offer cultural immersion and often cost less than hostels. In the Sacred Valley of Peru, for example, family homestays can cost as little as $10-15 per night including home-cooked meals.</p>
        
        <p>For those traveling as a pair or group, Airbnb can sometimes be more economical than hostels, especially in major cities like Buenos Aires or Medellín, where private apartments start around $20-30 per night.</p>
        
        <blockquote>
        The real voyage of discovery consists not in seeking new landscapes, but in having new eyes.
        — Marcel Proust
        </blockquote>
        
        <h2>Transportation on a Budget</h2>
        <p>Long-distance buses are the primary mode of transportation for backpackers in South America. While distances can be vast, buses are generally comfortable and affordable. In Peru and Ecuador, expect to pay $1-2 per hour of travel for standard buses and $3-4 per hour for luxury services with reclining seats.</p>
        
        <p>Night buses save on accommodation costs but choose reputable companies and secure your valuables. In countries like Chile and Argentina, companies like Andesmar and Cruz del Sur offer excellent service with seats that recline to 160-180 degrees.</p>
        
        <p>For shorter distances, colectivos (shared vans) and local buses are incredibly cheap, often costing less than $1 for city trips. These rarely appear on apps or booking sites – ask locally for the best information.</p>
        
        <p>Flights are worth considering for particularly long distances, especially in Brazil where bus journeys can take days. Budget airlines like GOL, LATAM, and Sky Airline occasionally offer promotions that compete with bus prices for long routes.</p>
        
        <h2>Eating on a Shoestring</h2>
        <p>Food markets and street food provide the most economical and authentic dining experiences. In Bolivia, a complete almuerzo (set lunch) costs $2-3, while in Peru, market meals start around $3-4. Even in more expensive countries like Chile, set lunches rarely exceed $7-8.</p>
        
        <p>Cooking in hostel kitchens can further reduce costs, especially when sharing ingredients with fellow travelers. Local markets offer fresh produce at a fraction of supermarket prices.</p>
        
        <p>Each country has budget-friendly specialties worth seeking out: Colombia's bandeja paisa, Ecuador's encebollado, Peru's ceviche from market stalls (much cheaper than restaurants), Bolivia's salteñas, and Argentina's empanadas.</p>
        
        <p>For drinking water, invest in a good filter bottle like LifeStraw or SteriPen. This saves money and reduces plastic waste in regions where tap water isn't potable.</p>
        
        <h2>Budget-Friendly Activities</h2>
        <p>Many of South America's greatest experiences cost little or nothing: hiking in Patagonia's national parks, exploring colonial architecture in Cartagena or Quito, or relaxing on Brazil's countless beaches.</p>
        
        <p>Free walking tours operate in most major cities – while tips are expected, they're still more affordable than private guides and provide excellent orientation and local insights.</p>
        
        <p>For paid attractions, student cards (even expired ones) can often secure discounts. Additionally, many museums offer free entry on specific days of the week – research these opportunities in advance.</p>
        
        <p>When it comes to iconic but expensive experiences like Machu Picchu or the Galapagos Islands, consider alternative approaches. The Salkantay Trek to Machu Picchu costs about half the price of the classic Inca Trail, while land-based exploration of the Galapagos can be significantly cheaper than cruises.</p>
        
        <h2>Country-Specific Budget Tips</h2>
        <p>Bolivia is South America's budget champion. La Paz offers incredible value with $10 hostel dorms, $2 set lunches, and the famous Death Road mountain biking adventure for under $50.</p>
        
        <p>Colombia provides excellent value, particularly in regions like the Coffee Triangle where small-town accommodation starts at $10-15 and activities like coffee farm tours cost $5-10.</p>
        
        <p>Peru has reasonable prices outside of major tourist areas. While Cusco can be pricey, nearby Sacred Valley towns like Ollantaytambo offer similar beauty at lower costs.</p>
        
        <p>Argentina and Chile are more expensive but have excellent transportation infrastructure and free natural attractions. Argentina's fluctuating currency means exchanging dollars at the "blue rate" can significantly increase your purchasing power.</p>
        
        <p>Brazil's size makes it challenging for budget travelers, but focusing on specific regions rather than trying to cover the entire country helps manage costs.</p>
        
        <h2>Safety Considerations</h2>
        <p>While budget travel requires some compromises, safety shouldn't be one of them. Spend extra for secure night buses on long routes, particularly in areas with safety concerns. Similarly, while ultra-budget accommodation exists, ensure basic security measures are in place.</p>
        
        <p>Travel insurance is non-negotiable, even for budget travelers. Medical evacuation from remote areas can cost tens of thousands of dollars without insurance.</p>
        
        <p>Keep a emergency fund separate from your main budget – around $300-500 is recommended. This ensures you're not forced into potentially unsafe situations due to financial constraints.</p>
        
        <h2>Conclusion</h2>
        <p>Backpacking through South America on a budget isn't just about saving money – it often leads to more authentic experiences and deeper connections with local cultures. By staying in locally-owned hostels, eating at markets, and using public transportation, you'll gain insights into daily life that luxury travelers might miss entirely.</p>
        
        <p>With careful planning, flexibility, and the tips outlined in this guide, you can experience the incredible diversity of South America without breaking the bank. The memories you'll create – from watching the sunrise over Machu Picchu to dancing salsa in Colombian clubs or witnessing the vast salt flats of Bolivia – will be worth far more than what you spend.</p>
      `
    },
    {
      id: 5,
      title: 'Travel Photography: Capturing the Perfect Shot',
      category: 'photography',
      author: 'Alex Thompson',
      authorImage: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
      readTime: '18 min read',
      publishDate: '2024-01-03',
      image: 'https://images.pexels.com/photos/1051075/pexels-photo-1051075.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=2',
      excerpt: 'Master travel photography with expert tips on composition, lighting, and equipment. Turn your trips into stunning visual stories.',
      rating: 4.8,
      views: 21340,
      tags: ['Photography', 'Tips', 'Equipment', 'Composition'],
      slug: 'travel-photography-guide',
      content: `
        <h2>Introduction</h2>
        <p>Travel photography is about capturing the essence of a place – its people, landscapes, culture, and spirit. More than just pretty pictures, great travel photos tell stories, evoke emotions, and transport viewers to distant lands. Whether you're shooting with a professional camera or the latest smartphone, this guide will help you elevate your travel photography from casual snapshots to compelling visual narratives.</p>
        
        <h2>Essential Equipment</h2>
        <p>While professional photographers often travel with multiple camera bodies and lenses, you don't need expensive gear to take remarkable travel photos. A versatile mirrorless camera with a 24-70mm equivalent lens makes an excellent all-purpose travel setup, balancing quality with portability.</p>
        
        <p>For smartphone photographers, consider adding a few accessories: a clip-on wide-angle lens for landscapes and architecture, a small tripod for low-light situations, and perhaps a gimbal for smooth video footage. Regardless of your camera choice, always pack spare batteries, memory cards, and a reliable backup solution.</p>
        
        <p>A lightweight, weatherproof camera bag is essential for protecting your equipment while remaining comfortable during long days of exploration. Look for designs that don't scream "expensive camera inside" to avoid unwanted attention in crowded areas.</p>
        
        <h2>Mastering Light</h2>
        <p>Understanding light is fundamental to photography, and when traveling, you'll encounter diverse lighting conditions that present both challenges and opportunities. The "golden hours" – the period shortly after sunrise and before sunset – offer warm, directional light that adds dimension and mood to landscapes and architecture.</p>
        
        <p>Harsh midday sun creates strong shadows and contrast, which can be challenging but also dramatic when used intentionally. Look for patterns created by light and shadow, or seek out covered markets, narrow streets, and indoor locations during these hours.</p>
        
        <p>Overcast days provide soft, diffused light that's ideal for portraits, colorful urban scenes, and forest photography. Rather than being disappointed by cloudy weather, recognize it as perfect for certain subjects.</p>
        
        <p>Night photography in cities offers opportunities to capture vibrant street scenes, illuminated landmarks, and light trails from traffic. A small tripod or the ability to stabilize your camera on a solid surface is essential for these low-light situations.</p>
        
        <h2>Composition Techniques</h2>
        <p>While the rule of thirds provides a useful starting point for composition, travel photography often benefits from more dynamic approaches. Leading lines – roads, rivers, or architectural elements that draw the viewer's eye through the frame – create depth and guide attention to your subject.</p>
        
        <p>Framing your main subject within natural elements like doorways, arches, or foliage adds context and dimension. This technique is particularly effective in places with distinctive architecture, such as Morocco's ornate doorways or Japan's torii gates.</p>
        
        <p>Including a human element – whether a portrait or a distant figure – adds scale and emotional connection to landscape photos. It transforms an impersonal scene into a story and helps viewers imagine themselves in that location.</p>
        
        <blockquote>
        Photography is the story I fail to put into words.
        — Destin Sparks
        </blockquote>
        
        <h2>Capturing Culture</h2>
        <p>Cultural photography requires sensitivity, respect, and often patience. Before photographing individuals, learn about local attitudes toward photography. In some cultures, a friendly conversation before asking permission is expected, while in others, offering small compensation may be appropriate.</p>
        
        <p>Learn a few phrases in the local language – "May I take your photo?" and "Thank you" at minimum. This simple courtesy can transform potential tension into a positive exchange.</p>
        
        <p>Markets, festivals, and religious ceremonies offer rich photographic opportunities but require particular respect. Observe first, shoot later, and always follow any rules about photography. If photography is restricted, respect these limitations – no photo is worth disrespecting sacred spaces or customs.</p>
        
        <p>Look beyond the obvious cultural icons to capture authentic daily life: laundry hanging between buildings, elders playing board games in the park, or children walking to school. These scenes often reveal more about a culture than famous landmarks.</p>
        
        <h2>Landscape Photography</h2>
        <p>Successful landscape photography begins with research and planning. Apps like PhotoPills or The Photographer's Ephemeris help predict exactly where and when the sun will rise or set, allowing you to plan your shoot around optimal lighting conditions.</p>
        
        <p>While wide-angle lenses are traditional for landscapes, don't overlook the power of telephoto lenses to isolate interesting features and compress perspective. This approach is particularly effective in mountainous regions, where a telephoto lens can emphasize the layered ridges fading into the distance.</p>
        
        <p>Filters remain valuable tools even in the digital age. A polarizing filter reduces reflections and enhances colors, particularly useful for photographing water and improving sky contrast. Neutral density filters allow for long exposures even in daylight, creating smooth, misty effects in moving water or clouds.</p>
        
        <p>Including foreground elements – rocks, flowers, or textured sand – adds depth to landscape compositions and creates a more immersive viewing experience. This three-dimensional approach helps convey the feeling of actually standing in that location.</p>
        
        <h2>Street Photography</h2>
        <p>Street photography captures the essence of a destination through its urban life, architecture, and public spaces. In busy areas, the "zone focusing" technique (pre-focusing your camera to a specific distance) allows you to shoot quickly without waiting for autofocus, perfect for fleeting moments.</p>
        
        <p>Patience and observation are key – find an interesting background or light pattern, then wait for the right subject to enter the frame. This methodical approach often yields more compelling results than constantly moving and shooting.</p>
        
        <p>Markets, transportation hubs, and public squares offer condensed cultural experiences ideal for street photography. These locations provide natural opportunities to observe interactions, commerce, and daily routines that define local life.</p>
        
        <h2>Post-Processing</h2>
        <p>Even the best travel photos typically benefit from some post-processing. Basic adjustments to exposure, contrast, and color balance can transform a good image into a great one. Software like Adobe Lightroom, Capture One, or even free alternatives like Darktable provide powerful editing capabilities.</p>
        
        <p>Develop a consistent editing style that enhances rather than distorts reality. While creative interpretation has its place, travel photography generally aims to represent destinations authentically. Dramatic over-editing can undermine the credibility of your images as travel documents.</p>
        
        <p>Organize your photos methodically during or immediately after your trip. Keyword tagging, location data, and thoughtful file organization will save countless hours when searching for specific images later.</p>
        
        <h2>Ethical Considerations</h2>
        <p>Responsible travel photography respects both people and places. Before posting images online, consider the potential impact on both your subjects and the destination. Photos of sensitive locations or vulnerable populations require particular thoughtfulness.</p>
        
        <p>Be mindful of perpetuating stereotypes or presenting a one-dimensional view of a culture. Seek to photograph the complexity and nuance of places rather than just the exotic or picturesque elements that confirm preconceptions.</p>
        
        <p>Consider how you can give back to the communities you photograph. This might mean sharing prints with subjects, supporting local photography initiatives, or using your images to raise awareness about issues affecting the regions you visit.</p>
        
        <h2>Conclusion</h2>
        <p>Great travel photography goes beyond technical perfection to capture the feeling of being in a place. It combines preparation with spontaneity, respect with curiosity, and technical skill with creative vision.</p>
        
        <p>As you develop your travel photography, focus not just on creating beautiful images but on telling authentic stories about the places you visit and the people you meet. The most meaningful travel photos don't just show what a destination looks like – they convey what it feels like to be there.</p>
        
        <p>Remember that sometimes the best photographs come when you put the camera down for a while, fully experience a place, and then shoot with renewed perspective and connection. The goal isn't just to take pictures of your travels, but to truly see the world more deeply through your photographic practice.</p>
      `
    },
    {
      id: 6,
      title: 'Staying Safe While Traveling: Essential Tips',
      category: 'safety',
      author: 'Dr. Lisa Park',
      authorImage: 'https://images.pexels.com/photos/1181519/pexels-photo-1181519.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
      readTime: '14 min read',
      publishDate: '2024-01-01',
      image: 'https://images.pexels.com/photos/346885/pexels-photo-346885.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=2',
      excerpt: 'Comprehensive safety guide covering health precautions, emergency preparedness, and common travel scams to avoid.',
      rating: 4.9,
      views: 28560,
      tags: ['Safety', 'Health', 'Emergency', 'Scams'],
      slug: 'travel-safety-guide',
      content: `
        <h2>Introduction</h2>
        <p>Travel broadens our horizons and creates lasting memories, but it also presents unique safety and health challenges. Whether you're a seasoned globetrotter or planning your first international trip, this comprehensive guide will help you prepare for and respond to common travel risks, from minor health issues to emergency situations.</p>
        
        <p>While no guide can eliminate all travel risks, proper preparation significantly increases your chances of having a safe, healthy, and enjoyable journey. The goal isn't to make you paranoid but to empower you with knowledge that allows you to travel confidently and responsibly.</p>
        
        <h2>Pre-Trip Preparation</h2>
        <p>Safety begins long before you board your flight. Research your destination thoroughly, focusing on current safety conditions, health risks, local laws, and cultural norms that might affect your security. Government travel advisories, while sometimes overly cautious, provide valuable baseline information about potential risks.</p>
        
        <p>Health preparation is crucial. Schedule a travel medicine consultation 4-8 weeks before departure, as some vaccines require multiple doses or time to become effective. Beyond routine vaccinations, you may need destination-specific protection against diseases like yellow fever, typhoid, or Japanese encephalitis.</p>
        
        <p>Prepare a comprehensive travel health kit including prescription medications (in original containers with doctor's notes), over-the-counter remedies for common issues like diarrhea and motion sickness, first aid supplies, and preventive items like insect repellent and sunscreen.</p>
        
        <p>Travel insurance is non-negotiable. Choose a policy with robust medical coverage (at least $100,000), emergency evacuation (at least $500,000), and coverage for your specific activities – standard policies often exclude adventure sports, high-altitude trekking, or scuba diving.</p>
        
        <h2>Document Security</h2>
        <p>Create digital and physical copies of essential documents: passport, visa, insurance policy, prescriptions, credit cards, and emergency contacts. Store digital copies in encrypted cloud storage and email, and keep physical copies separate from the originals.</p>
        
        <p>Register your trip with your country's foreign ministry if this service is available. Programs like the U.S. State Department's STEP (Smart Traveler Enrollment Program) allow embassies to contact you during emergencies and help family reach you if needed.</p>
        
        <p>Carry minimal identification and payment methods when exploring. Leave your passport secured in your accommodation's safe when possible, carrying only a photocopy and a secondary form of ID. Similarly, carry only the cash and cards needed for the day.</p>
        
        <blockquote>
        To travel is to take a journey into yourself.
        — Danny Kaye
        </blockquote>
        
        <h2>Accommodation Safety</h2>
        <p>Research accommodations thoroughly, focusing on both location safety and property security. Review recent guest feedback, particularly comments about neighborhood safety and security issues. In unfamiliar cities, paying slightly more for centrally located accommodation often enhances safety.</p>
        
        <p>Upon arrival, identify emergency exits and fire safety equipment. Check that doors and windows lock properly, and use additional security devices like doorstops or portable door alarms for added protection, particularly in budget accommodations.</p>
        
        <p>Avoid rooms with easy ground-floor access when possible. If you must accept such a room, ensure all windows have functioning locks and request a room change if security seems inadequate.</p>
        
        <h2>Transportation Safety</h2>
        <p>Research transportation options before arrival, identifying reputable taxi companies, ride-sharing services, or public transportation routes. When using taxis, choose official vehicles from designated stands or use hotel-arranged services rather than hailing unknown vehicles on the street.</p>
        
        <p>For long-distance travel, choose higher-quality bus, train, or airline options when available, particularly for overnight journeys. The slightly higher cost typically provides significantly better safety standards.</p>
        
        <p>If renting vehicles, inspect them thoroughly before accepting, ensure you understand local driving regulations, and consider whether driving conditions match your experience level. In many countries, hiring a local driver may be safer and less stressful than self-driving.</p>
        
        <h2>Common Scams and How to Avoid Them</h2>
        <p>Familiarize yourself with destination-specific scams before arrival. Common global scams include taxi overcharging, fake police officers requesting to "check" your wallet, friendship bracelets that become high-pressure sales, and various distraction techniques used by pickpockets.</p>
        
        <p>Maintain a healthy skepticism toward overly friendly strangers, particularly those who approach you with unsolicited help or extraordinary offers. While most interactions are genuine, take time to evaluate situations before sharing personal information or accepting invitations.</p>
        
        <p>Be especially vigilant in transportation hubs, tourist attractions, and crowded markets – prime locations for opportunistic scams and theft. Keep valuables in front-facing, slash-proof bags, and be aware of your surroundings, particularly when using ATMs or handling money.</p>
        
        <h2>Digital Security</h2>
        <p>Public Wi-Fi networks present significant security risks. Use a reputable VPN (Virtual Private Network) when connecting to public networks to encrypt your data and protect sensitive information like banking credentials.</p>
        
        <p>Enable two-factor authentication for important accounts, particularly email, banking, and social media. This provides an additional security layer if your passwords are compromised.</p>
        
        <p>Be cautious about sharing real-time location information on social media, as this advertises your absence from home and your current location to potential criminals. Consider posting about experiences after leaving a location rather than in real-time.</p>
        
        <h2>Health Emergencies</h2>
        <p>Research healthcare options at your destination before departure. Identify the nearest hospitals with international standards, English-speaking staff, or tourist-oriented services. Your country's embassy or insurance provider can often recommend appropriate facilities.</p>
        
        <p>For managing pre-existing conditions while traveling, carry a translated medical summary including your diagnosis, treatment plan, and medication details. Learn the generic names of your medications, as brand names vary internationally.</p>
        
        <p>Understand how to access emergency services at your destination – the equivalent of 911 varies by country. Save these numbers in your phone and write them down in case your phone is lost or damaged.</p>
        
        <h2>Natural Disasters and Political Unrest</h2>
        <p>Research destination-specific risks before travel. If visiting areas prone to earthquakes, hurricanes, or flooding, learn basic safety protocols and identify shelter locations. Similarly, understand the political climate and potential for civil unrest.</p>
        
        <p>Establish communication plans with family or friends at home, including regular check-ins and procedures if you miss a scheduled contact. Identify multiple communication methods in case primary channels become unavailable.</p>
        
        <p>Follow local authority instructions during emergencies. Register for emergency alerts from your country's embassy and monitor reliable news sources for developing situations.</p>
        
        <h2>Solo Traveler Safety</h2>
        <p>Solo travelers should take additional precautions while still enjoying the unique benefits of independent travel. Share detailed itineraries with trusted contacts, including accommodation addresses and transportation plans. Establish regular check-in protocols and emergency procedures.</p>
        
        <p>Project confidence even when uncertain. If lost, step into a shop or restaurant to consult maps rather than standing vulnerably on the street. Trust your instincts – if a situation feels wrong, remove yourself promptly without worrying about appearing rude.</p>
        
        <p>Build a network as you travel by connecting with other travelers, expatriate communities, or through group activities. These connections provide both safety in numbers and local knowledge.</p>
        
        <h2>Conclusion</h2>
        <p>Travel safety is about preparation, awareness, and balanced risk assessment rather than fear or paranoia. Most travelers encounter no serious problems, and with proper preparation, you can significantly reduce your vulnerability to those that do occur.</p>
        
        <p>Remember that safety practices should enhance rather than detract from your travel experience. The peace of mind that comes from being prepared allows you to immerse yourself more fully in the joy of discovery and cultural exchange that makes travel so valuable.</p>
        
        <p>By incorporating these safety practices into your travel routine, you'll develop habits that become second nature, allowing you to focus on creating meaningful experiences while minimizing risks to your health, security, and wellbeing.</p>
      `
    },
  ];

  // If slug is provided, show the specific guide
  if (slug) {
    const guide = guides.find(g => g.slug === slug);
    
    if (!guide) {
      return (
        <div className="min-h-screen pt-16 bg-white dark:bg-gray-900 flex items-center justify-center">
          <div className="text-center">
            <Book className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Guide not found
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              The guide you're looking for doesn't exist or has been moved.
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
        {/* Back Button */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Link to="/travel-guides">
            <Button variant="outline" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Travel Guides
            </Button>
          </Link>
        </div>

        {/* Guide Header */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="relative rounded-2xl overflow-hidden shadow-2xl"
          >
            <img
              src={guide.image}
              alt={guide.title}
              className="w-full h-96 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-8 left-8 right-8">
              <span className="inline-block px-3 py-1 bg-primary-500 text-white text-sm font-medium rounded-full mb-4">
                {categories.find(cat => cat.id === guide.category)?.name}
              </span>
              <h1 className="text-4xl sm:text-5xl font-display font-bold text-white mb-4">
                {guide.title}
              </h1>
            </div>
          </motion.div>
        </div>

        {/* Guide Content */}
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
                    src={guide.authorImage}
                    alt={guide.author}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">
                      {guide.author}
                    </p>
                    <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        <span>{new Date(guide.publishDate).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        <span>{guide.readTime}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-1">
                  <Star className="w-5 h-5 text-yellow-500 fill-current" />
                  <span className="font-medium text-gray-900 dark:text-white">{guide.rating}</span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">({guide.views} views)</span>
                </div>
              </motion.div>

              {/* Article Body */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="prose prose-lg max-w-none dark:prose-invert prose-headings:text-gray-900 dark:prose-headings:text-white prose-p:text-gray-700 dark:prose-p:text-gray-300"
                dangerouslySetInnerHTML={{ __html: guide.content }}
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
                  {guide.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-sm rounded-full hover:bg-primary-100 dark:hover:bg-primary-900/30 hover:text-primary-600 dark:hover:text-primary-400 cursor-pointer transition-colors duration-200"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-8">
                {/* Related Guides */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6"
                >
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Related Guides
                  </h3>
                  <div className="space-y-4">
                    {guides
                      .filter(g => g.slug !== slug && (g.category === guide.category || g.tags.some(t => guide.tags.includes(t))))
                      .slice(0, 3)
                      .map((relatedGuide) => (
                        <Link
                          key={relatedGuide.id}
                          to={`/travel-guides/${relatedGuide.slug}`}
                          className="block group"
                        >
                          <div className="flex space-x-3">
                            <img
                              src={relatedGuide.image}
                              alt={relatedGuide.title}
                              className="w-16 h-16 rounded-lg object-cover group-hover:scale-105 transition-transform duration-200"
                            />
                            <div className="flex-1">
                              <h4 className="text-sm font-medium text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-200 line-clamp-2">
                                {relatedGuide.title}
                              </h4>
                              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                {relatedGuide.readTime}
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
                    Get Travel Tips
                  </h3>
                  <p className="text-white/90 text-sm mb-4">
                    Subscribe to receive our latest travel guides and tips.
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

  const filteredGuides = guides.filter(guide => {
    const matchesSearch = guide.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         guide.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         guide.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || guide.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

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
              Travel Guides & Tips
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Expert advice, insider tips, and comprehensive guides to help you travel smarter, 
              safer, and with more confidence around the world.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Search and Filters */}
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
                  placeholder="Search guides and tips..."
                  className="w-full pl-10 pr-4 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 text-gray-900 dark:text-white"
                />
              </div>
            </div>

            {/* Category Filter */}
            <div className="lg:w-64">
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
          </div>
        </div>
      </section>

      {/* Guides Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {filteredGuides.map((guide, index) => (
              <motion.article
                key={guide.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group cursor-pointer"
              >
                <Link to={`/travel-guides/${guide.slug}`}>
                  <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 group-hover:-translate-y-2 overflow-hidden">
                    <div className="md:flex">
                      <div className="md:w-1/3">
                        <img
                          src={guide.image}
                          alt={guide.title}
                          className="w-full h-48 md:h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      
                      <div className="md:w-2/3 p-6">
                        <div className="flex items-center justify-between mb-3">
                          <span className="px-3 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 text-sm font-medium rounded-full">
                            {categories.find(cat => cat.id === guide.category)?.name}
                          </span>
                          <div className="flex items-center space-x-1">
                            <Star className="w-4 h-4 text-yellow-500 fill-current" />
                            <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                              {guide.rating}
                            </span>
                          </div>
                        </div>
                        
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-200">
                          {guide.title}
                        </h2>
                        
                        <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                          {guide.excerpt}
                        </p>
                        
                        <div className="flex items-center space-x-4 mb-4">
                          <div className="flex items-center space-x-2">
                            <img
                              src={guide.authorImage}
                              alt={guide.author}
                              className="w-6 h-6 rounded-full object-cover"
                            />
                            <span className="text-sm text-gray-600 dark:text-gray-300">
                              {guide.author}
                            </span>
                          </div>
                          
                          <div className="flex items-center space-x-1 text-sm text-gray-500 dark:text-gray-400">
                            <Clock className="w-4 h-4" />
                            <span>{guide.readTime}</span>
                          </div>
                          
                          <div className="flex items-center space-x-1 text-sm text-gray-500 dark:text-gray-400">
                            <Calendar className="w-4 h-4" />
                            <span>{new Date(guide.publishDate).toLocaleDateString()}</span>
                          </div>
                        </div>
                        
                        <div className="flex flex-wrap gap-2 mb-4">
                          {guide.tags.slice(0, 3).map((tag, idx) => (
                            <span
                              key={idx}
                              className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs rounded-full"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-500 dark:text-gray-400">
                            {guide.views.toLocaleString()} views
                          </span>
                          <Button size="sm" variant="outline">
                            Read Guide
                          </Button>
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
              <Book className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                No guides found
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Try adjusting your search criteria or browse all guides.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}