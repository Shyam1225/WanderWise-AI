import axios from 'axios';

interface GeminiResponse {
  candidates: Array<{
    content: {
      parts: Array<{
        text: string;
      }>;
    };
  }>;
}

interface TravelFormData {
  origin: string;
  destination: string;
  departureDate: string;
  returnDate: string;
  groupSize: number;
  interests: string[];
  budget: number;
  travelStyle: string;
  specialRequirements: string;
  accommodation: string;
  dietaryRestrictions: string;
  accessibilityNeeds: string;
  languagePreferences?: string[];
  transportationType?: 'flight' | 'train' | 'bus' | 'car' | 'any';
}

class GeminiAPIService {
  private apiKey: string;
  private baseURL: string = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent';
  private requestTimeout: number = 60000; // 60 seconds

  constructor() {
    this.apiKey = import.meta.env.VITE_GEMINI_API_KEY || '';
    console.log('Gemini API Key loaded:', this.apiKey ? 'Yes' : 'No');
  }

  private async makeRequest(prompt: string, signal?: AbortSignal): Promise<string> {
    if (!this.apiKey) {
      throw new Error('Gemini API key is required. Please check your environment configuration.');
    }

    console.log('Making request to Gemini API...');

    try {
      const requestBody = {
        contents: [{
          parts: [{
            text: prompt
          }]
        }],
        generationConfig: {
          temperature: 0.8,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 8192, // Increased token limit for longer responses
          candidateCount: 1,
        },
        safetySettings: [
          {
            category: "HARM_CATEGORY_HARASSMENT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_HATE_SPEECH",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_DANGEROUS_CONTENT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          }
        ]
      };

      const timeoutController = new AbortController();
      const timeoutId = setTimeout(() => {
        console.log('Request timeout reached');
        timeoutController.abort();
      }, this.requestTimeout);

      const requestSignal = signal || timeoutController.signal;

      const response = await fetch(`${this.baseURL}?key=${this.apiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
        signal: requestSignal,
      });

      clearTimeout(timeoutId);
      console.log('Response received, status:', response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('API Error Response:', errorText);
        
        let errorMessage = `Gemini API error: ${response.status}`;
        try {
          const errorData = JSON.parse(errorText);
          errorMessage += ` - ${errorData.error?.message || 'Unknown error'}`;
        } catch {
          errorMessage += ` - ${errorText}`;
        }
        
        throw new Error(errorMessage);
      }

      const data: GeminiResponse = await response.json();
      console.log('API Response parsed successfully');
      
      if (!data.candidates || data.candidates.length === 0) {
        throw new Error('No response generated from Gemini API. The content may have been filtered for safety reasons.');
      }

      const result = data.candidates[0].content.parts[0].text;
      console.log('Generated text length:', result.length);
      
      if (result.length < 500) {
        throw new Error('Generated response is too short. Please try again with more specific details.');
      }

      return result;
    } catch (error) {
      console.error('Gemini API request failed:', error);
      
      if (error instanceof Error) {
        if (error.name === 'AbortError') {
          throw new Error('Request was cancelled or timed out');
        }
        if (error.message.includes('fetch') || error.message.includes('network')) {
          throw new Error('Network error: Unable to connect to the AI service. Please check your internet connection and try again.');
        }
        if (error.message.includes('timeout')) {
          throw new Error('Request timeout: The AI service is taking too long to respond. Please try again.');
        }
      }
      
      throw error;
    }
  }

  async generateItinerary(formData: TravelFormData, signal?: AbortSignal): Promise<string> {
    const prompt = this.createUltraDetailedItineraryPrompt(formData);
    return await this.makeRequest(prompt, signal);
  }

  async getCulturalInsights(destination: string, signal?: AbortSignal): Promise<string> {
    const prompt = this.createCulturalInsightsPrompt(destination);
    return await this.makeRequest(prompt, signal);
  }

  async getRestaurantRecommendations(destination: string, budget: number, dietaryRestrictions: string, signal?: AbortSignal): Promise<string> {
    const prompt = this.createRestaurantPrompt(destination, budget, dietaryRestrictions);
    return await this.makeRequest(prompt, signal);
  }

  async getLocalPhrases(destination: string, signal?: AbortSignal): Promise<string> {
    const prompt = this.createLanguagePhrasesPrompt(destination);
    return await this.makeRequest(prompt, signal);
  }

  private createUltraDetailedItineraryPrompt(formData: TravelFormData): string {
    const tripDuration = this.calculateTripDuration(formData.departureDate, formData.returnDate);
    const budgetRange = this.getBudgetRange(formData.budget);
    
    // Determine if this is a multi-city trip based on destination and duration
    const isMultiCity = tripDuration >= 7 && this.shouldSuggestMultiCity(formData.destination);
    const cities = isMultiCity ? this.suggestCitiesForDestination(formData.destination, tripDuration) : [formData.destination];
    
    // Transportation details
    const transportationDetails = this.getTransportationDetails(formData);
    
    // Get destination-specific information
    const destinationInfo = this.getDestinationSpecificInfo(formData.destination);
    
    return `You are WanderWise AI, the world's most comprehensive travel planning expert. Create an ULTRA-DETAILED, minute-by-minute ${tripDuration}-day itinerary for a trip from ${formData.origin} to ${formData.destination} that includes EVERYTHING a traveler needs from arrival to departure.

**TRAVELER PROFILE:**
🛫 Origin: ${formData.origin}
🎯 Destination: ${formData.destination}
🚗 Transportation: ${formData.transportationType || 'Flight'}
📅 Duration: ${tripDuration} days (${formData.departureDate} to ${formData.returnDate})
👥 Group: ${formData.groupSize} ${formData.groupSize === 1 ? 'traveler' : 'travelers'}
💰 Budget: ${budgetRange} per day
🎨 Style: ${formData.travelStyle}
❤️ Interests: ${formData.interests.join(', ')}
🏨 Accommodation: ${formData.accommodation || 'Mid-range hotels'}
🍽️ Dietary: ${formData.dietaryRestrictions || 'No restrictions'}
♿ Accessibility: ${formData.accessibilityNeeds || 'Standard access'}
📝 Special: ${formData.specialRequirements || 'None'}

${transportationDetails}

${destinationInfo}

${isMultiCity ? `**MULTI-CITY ITINERARY:**
This is a multi-city trip covering the following cities in ${formData.destination}:
${cities.map((city, index) => `${index + 1}. ${city}`).join('\n')}

Please provide a logical route between these cities with appropriate transportation recommendations (flights, trains, buses, etc.) between each city. Include travel time, approximate costs, and booking tips for intercity transportation.` : ''}

**COMPREHENSIVE DAILY STRUCTURE REQUIRED:**

For EACH DAY, provide this EXACT detailed format:

## 🌅 DAY ${tripDuration > 1 ? 'X' : '1'}: [SPECIFIC THEME - e.g., "Historic Mumbai & Colonial Heritage"]

### 📍 **ACCOMMODATION & MORNING ROUTINE**
**6:00-7:30 AM: Wake Up & Hotel Preparation**
- Hotel: [Specific hotel name and area]
- Morning routine and preparation tips
- Weather check and clothing recommendations
- Essential items to pack for the day

**7:30-8:30 AM: BREAKFAST**
- **Location:** [Specific restaurant/cafe name with exact address]
- **Specialties:** [3-4 specific dishes to try]
- **Cost:** $X per person
- **Cultural Context:** [Why this place is special]
- **Ordering Tips:** [How to order, local customs]
- **Dietary Options:** [Specific options for restrictions]

### 🌄 **MORNING EXPLORATION (8:30 AM - 12:30 PM)**

**8:30-9:00 AM: TRANSPORTATION TO FIRST LOCATION**
- **From:** Hotel/breakfast location
- **To:** [Specific landmark/attraction with address]
- **Method:** [Walking/taxi/metro with specific route]
- **Cost:** $X
- **Duration:** X minutes
- **Tips:** [Local transportation advice]

**9:00-11:00 AM: MAJOR ATTRACTION #1**
- **Location:** [Exact name and address]
- **What to See:** [Detailed description of 5-7 specific things]
- **Entry Fee:** $X
- **Best Photo Spots:** [3-4 specific locations within the site]
- **Cultural Significance:** [Historical/cultural importance]
- **Insider Tips:** [Best time to visit specific areas, crowd avoidance]
- **Must-Do Activities:** [Specific experiences within the location]
- **Local Guide:** [Availability, cost, recommended or not]

**11:00-11:15 AM: TRANSPORTATION**
- **Route:** [Specific path with landmarks]
- **Method:** [Walking route with street names OR transport details]
- **Duration:** 15 minutes
- **What to See En Route:** [Interesting sights along the way]

**11:15 AM-12:30 PM: CULTURAL EXPERIENCE #2**
- **Location:** [Specific place with address]
- **Activity:** [Detailed description of what to do]
- **Cost:** $X
- **Duration:** 1 hour 15 minutes
- **What to Expect:** [Step-by-step experience description]
- **Local Interactions:** [How to engage with locals respectfully]
- **Shopping Opportunities:** [Specific items and fair prices]
- **Photography:** [What's allowed, best angles]

### 🍽️ **LUNCH & AFTERNOON (12:30 PM - 6:00 PM)**

**12:30-1:45 PM: AUTHENTIC LUNCH EXPERIENCE**
- **Restaurant:** [Specific name and exact address]
- **Cuisine Type:** [Local/regional specialty]
- **Signature Dishes:** [3-4 must-try dishes with descriptions]
- **Cost:** $X per person
- **Atmosphere:** [Description of setting and ambiance]
- **Ordering Process:** [How to order, menu navigation]
- **Cultural Etiquette:** [Dining customs and manners]
- **Payment:** [Accepted methods, tipping customs]

**1:45-2:00 PM: POST-LUNCH TRANSITION**
- **Activity:** [Rest/walk/preparation for afternoon]
- **Location:** [Where to go next]
- **Transportation:** [Method and route]

**2:00-4:00 PM: NEIGHBORHOOD EXPLORATION**
- **Area:** [Specific neighborhood/district name]
- **Walking Route:** [Detailed street-by-street path]
- **Points of Interest:** [5-7 specific places to stop]
  1. [Location 1]: [What to see/do, time to spend]
  2. [Location 2]: [What to see/do, time to spend]
  3. [Location 3]: [What to see/do, time to spend]
  4. [Location 4]: [What to see/do, time to spend]
  5. [Location 5]: [What to see/do, time to spend]
- **Local Life:** [What daily life to observe]
- **Street Food:** [Safe options to try, costs]
- **Shopping:** [Local markets, unique items, bargaining tips]

**4:00-4:15 PM: COFFEE/TEA BREAK**
- **Location:** [Specific cafe/tea house with address]
- **Local Beverage:** [Traditional drink to try]
- **Cost:** $X
- **Cultural Experience:** [How locals take breaks]

**4:15-6:00 PM: MAJOR ATTRACTION #3**
- **Location:** [Specific landmark with full details]
- **Activities:** [Comprehensive list of things to do]
- **Best Time:** [Why this timing is optimal]
- **Ticket Information:** [Where to buy, costs, skip-the-line options]
- **Guided vs Self-Guided:** [Recommendations with pros/cons]
- **Hidden Spots:** [Lesser-known areas within the attraction]
- **Sunset Views:** [If applicable, best viewing spots]

### 🌆 **EVENING & DINNER (6:00 PM - 10:00 PM)**

**6:00-7:00 PM: RETURN TO HOTEL & FRESHEN UP**
- **Transportation:** [Route back to hotel]
- **Rest Time:** [Preparation for evening]
- **Clothing Change:** [Recommendations for evening attire]

**7:00-7:30 PM: PRE-DINNER ACTIVITY**
- **Location:** [Specific place near dinner location]
- **Activity:** [Aperitif, local market, scenic walk]
- **Cultural Experience:** [Local evening customs]

**7:30-9:30 PM: DINNER EXPERIENCE**
- **Restaurant:** [Specific upscale/traditional restaurant]
- **Reservation:** [Required or walk-in, how to book]
- **Dress Code:** [Specific requirements]
- **Menu Highlights:** [5-6 dishes with detailed descriptions]
- **Wine/Beverage Pairing:** [Local drinks to complement meal]
- **Cost:** $X per person
- **Service Style:** [What to expect from service]
- **Cultural Dining:** [Local dinner customs and timing]

**9:30-10:00 PM: EVENING STROLL/NIGHTLIFE**
- **Activity:** [Specific evening activity]
- **Location:** [Where to go for evening entertainment]
- **Options:** [Multiple choices based on energy level]
  - **Relaxed:** [Quiet evening walk, specific route]
  - **Moderate:** [Local bar/cafe, specific recommendations]
  - **Active:** [Night market, cultural performance, specific venues]
- **Safety:** [Evening safety tips and areas to avoid]
- **Transportation Back:** [How to return to hotel safely]

### 💰 **DAILY BUDGET BREAKDOWN**
- **Accommodation:** $X (per person)
- **Breakfast:** $X
- **Morning Attractions:** $X
- **Lunch:** $X
- **Afternoon Activities:** $X
- **Coffee/Snacks:** $X
- **Dinner:** $X
- **Transportation:** $X
- **Miscellaneous/Shopping:** $X
- **TOTAL DAY COST:** $X per person

### 🎯 **DAY HIGHLIGHTS & ACHIEVEMENTS**
- [Specific cultural experiences gained]
- [Local foods tried]
- [Historical sites visited]
- [Local interactions experienced]
- [Photos/memories created]

### 📱 **ESSENTIAL APPS & CONTACTS FOR TODAY**
- **Transportation:** [Specific local apps]
- **Translation:** [Useful phrases for today's activities]
- **Emergency Contacts:** [Local numbers]
- **Restaurant Reservations:** [Contact information]

### 🌤️ **WEATHER CONSIDERATIONS**
- **Expected Weather:** [Specific forecast]
- **Clothing Recommendations:** [What to wear]
- **Backup Plans:** [Indoor alternatives if weather changes]

---

**REPEAT THIS EXACT DETAILED FORMAT FOR ALL ${tripDuration} DAYS**

Each day should be completely different with:
- Different neighborhoods/areas of the city
- Varied restaurant types and cuisines
- Mix of tourist attractions and local experiences
- Different transportation methods
- Varied activity types (cultural, adventure, relaxation, food)
- Progressive difficulty (easier first day, more adventurous later)

${isMultiCity ? `**INTERCITY TRAVEL DAYS:**
When traveling between cities, provide:
- Detailed checkout procedures and timings
- Transportation options to the airport/train station/bus terminal
- Specific flight/train/bus recommendations with timings and prices
- Tips for the journey (what to pack accessible, food options, etc.)
- Arrival procedures in the new city
- Transportation to the new accommodation
- Brief evening activity in the new city after arrival` : ''}

**FINAL REQUIREMENTS:**
- Include specific addresses for EVERY location
- Provide exact costs in local currency AND USD
- Give detailed cultural context for each experience
- Include backup options for weather/closures
- Provide safety tips specific to each area
- Include local etiquette for each type of activity
- Give specific timing to avoid crowds
- Include local transportation apps and payment methods
- Provide emergency contacts and hospital locations
- Include essential phrases for each day's activities

**IMPORTANT: YOU MUST GENERATE A COMPLETE ITINERARY FOR ALL ${tripDuration} DAYS, NOT JUST THE FIRST 3 DAYS. THE ENTIRE TRIP FROM ${formData.departureDate} TO ${formData.returnDate} MUST BE COVERED IN DETAIL.**

Create an itinerary so detailed that a traveler could follow it minute-by-minute and have an absolutely incredible, authentic experience without any additional research needed!`
  }

  private getDestinationSpecificInfo(destination: string): string {
    const destinationLower = destination.toLowerCase();
    
    // Mumbai
    if (destinationLower.includes('mumbai')) {
      return `**DESTINATION-SPECIFIC INFORMATION: MUMBAI**
- **Top Attractions:** Gateway of India, Marine Drive, Elephanta Caves, Chhatrapati Shivaji Terminus, Haji Ali Dargah
- **Local Cuisine:** Vada Pav, Pav Bhaji, Bombay Sandwich, Bhel Puri, Butter Chicken
- **Cultural Experiences:** Bollywood tours, Dharavi slum tours, Dhobi Ghat, local markets
- **Transportation:** Local trains, BEST buses, auto-rickshaws, taxis, Uber/Ola
- **Weather Considerations:** Avoid monsoon season (June-September), best time to visit is November-February
- **Safety Tips:** Be cautious in crowded areas, use official taxis, avoid displaying valuables
- **Local Etiquette:** Remove shoes before entering temples, dress modestly at religious sites`;
    }
    
    // Delhi
    if (destinationLower.includes('delhi')) {
      return `**DESTINATION-SPECIFIC INFORMATION: DELHI**
- **Top Attractions:** Red Fort, India Gate, Qutub Minar, Humayun's Tomb, Jama Masjid, Lotus Temple
- **Local Cuisine:** Butter Chicken, Chole Bhature, Paratha, Chaat, Kebabs, Daulat ki Chaat
- **Cultural Experiences:** Old Delhi food walks, Chandni Chowk markets, Akshardham Temple light show
- **Transportation:** Delhi Metro, auto-rickshaws, cycle-rickshaws, buses, Uber/Ola
- **Weather Considerations:** Best time to visit is October-March, avoid extreme summer (April-June)
- **Safety Tips:** Be cautious with street food hygiene, use prepaid taxis, avoid isolated areas at night
- **Local Etiquette:** Dress conservatively, remove shoes at religious sites, use right hand for eating`;
    }
    
    // Jaipur
    if (destinationLower.includes('jaipur')) {
      return `**DESTINATION-SPECIFIC INFORMATION: JAIPUR**
- **Top Attractions:** Amber Fort, Hawa Mahal, City Palace, Jantar Mantar, Jal Mahal, Albert Hall Museum
- **Local Cuisine:** Dal Baati Churma, Pyaaz Kachori, Ghewar, Laal Maas, Gatte ki Sabzi
- **Cultural Experiences:** Block printing workshops, puppet shows, traditional Rajasthani dance
- **Transportation:** Auto-rickshaws, cycle-rickshaws, local buses, Uber/Ola
- **Weather Considerations:** Best time to visit is October-March, avoid summer (April-June)
- **Safety Tips:** Beware of scams targeting tourists, use official guides at major attractions
- **Local Etiquette:** Dress modestly, remove shoes at temples, ask before taking photos of locals`;
    }
    
    // Agra
    if (destinationLower.includes('agra')) {
      return `**DESTINATION-SPECIFIC INFORMATION: AGRA**
- **Top Attractions:** Taj Mahal, Agra Fort, Fatehpur Sikri, Itimad-ud-Daulah, Mehtab Bagh
- **Local Cuisine:** Petha, Bedai with Jalebi, Mughlai cuisine, Dalmoth
- **Cultural Experiences:** Taj Mahal at sunrise/sunset, marble inlay workshops, Mughal heritage walks
- **Transportation:** Auto-rickshaws, cycle-rickshaws, tongas (horse carriages), Uber/Ola
- **Weather Considerations:** Best time to visit is October-March, avoid summer (April-June)
- **Safety Tips:** Beware of unofficial guides, use prepaid taxis, watch for pickpockets in crowded areas
- **Local Etiquette:** Dress modestly at the Taj Mahal, remove shoes where required, respect quiet zones`;
    }
    
    // Tokyo
    if (destinationLower.includes('tokyo')) {
      return `**DESTINATION-SPECIFIC INFORMATION: TOKYO**
- **Top Attractions:** Tokyo Tower, Shibuya Crossing, Senso-ji Temple, Meiji Shrine, Tokyo Skytree
- **Local Cuisine:** Sushi, Ramen, Tempura, Yakitori, Tonkatsu, Japanese curry
- **Cultural Experiences:** Tea ceremonies, sumo tournaments, robot restaurants, anime districts
- **Transportation:** Tokyo Metro, JR lines, buses, taxis (expensive)
- **Weather Considerations:** Best times to visit are spring (March-May) and fall (September-November)
- **Safety Tips:** Tokyo is very safe, but be aware of rush hour crowds on trains
- **Local Etiquette:** No tipping, bow when greeting, remove shoes indoors, don't eat while walking`;
    }
    
    // Paris
    if (destinationLower.includes('paris')) {
      return `**DESTINATION-SPECIFIC INFORMATION: PARIS**
- **Top Attractions:** Eiffel Tower, Louvre Museum, Notre-Dame Cathedral, Arc de Triomphe, Montmartre
- **Local Cuisine:** Croissants, Baguettes, Escargot, Coq au Vin, Crème Brûlée, Macarons
- **Cultural Experiences:** Seine River cruises, wine tastings, perfume workshops, fashion walks
- **Transportation:** Paris Metro, RER trains, buses, Vélib' bike sharing
- **Weather Considerations:** Best times to visit are April-June and September-October
- **Safety Tips:** Beware of pickpockets near tourist attractions, validate metro tickets
- **Local Etiquette:** Greet with "Bonjour" before asking questions, dress smartly, don't speak loudly`;
    }
    
    // New York
    if (destinationLower.includes('new york') || destinationLower.includes('nyc')) {
      return `**DESTINATION-SPECIFIC INFORMATION: NEW YORK CITY**
- **Top Attractions:** Statue of Liberty, Empire State Building, Central Park, Times Square, Brooklyn Bridge
- **Local Cuisine:** New York pizza, bagels, pastrami sandwiches, cheesecake, hot dogs
- **Cultural Experiences:** Broadway shows, museum visits, neighborhood food tours, ferry rides
- **Transportation:** Subway, buses, taxis, Uber/Lyft, Citi Bike
- **Weather Considerations:** Best times to visit are April-June and September-November
- **Safety Tips:** Stay aware in crowded areas, use licensed taxis or rideshares, avoid empty subway cars
- **Local Etiquette:** Walk quickly on sidewalks, stand to the right on escalators, tip 15-20% at restaurants`;
    }
    
    // London
    if (destinationLower.includes('london')) {
      return `**DESTINATION-SPECIFIC INFORMATION: LONDON**
- **Top Attractions:** Tower of London, British Museum, Buckingham Palace, London Eye, Westminster Abbey
- **Local Cuisine:** Fish and chips, full English breakfast, Sunday roast, afternoon tea, curry
- **Cultural Experiences:** West End shows, changing of the guard, markets, river Thames cruises
- **Transportation:** London Underground (Tube), buses, black cabs, Santander Cycles
- **Weather Considerations:** Weather is unpredictable year-round, always carry an umbrella
- **Safety Tips:** London is generally safe, but be cautious in crowded tourist areas
- **Local Etiquette:** Stand on the right on escalators, queue politely, avoid loud conversations on public transport`;
    }
    
    // Rome
    if (destinationLower.includes('rome')) {
      return `**DESTINATION-SPECIFIC INFORMATION: ROME**
- **Top Attractions:** Colosseum, Vatican City, Roman Forum, Trevi Fountain, Pantheon
- **Local Cuisine:** Pasta Carbonara, Cacio e Pepe, Supplì, Roman-style pizza, gelato
- **Cultural Experiences:** Gladiator school, cooking classes, Vespa tours, wine tastings
- **Transportation:** Metro, buses, trams, taxis
- **Weather Considerations:** Best times to visit are April-June and September-October
- **Safety Tips:** Watch for pickpockets near tourist sites, validate public transport tickets
- **Local Etiquette:** Dress modestly when visiting churches, don't eat near monuments, greet with "Buongiorno"`;
    }
    
    // Bangkok
    if (destinationLower.includes('bangkok')) {
      return `**DESTINATION-SPECIFIC INFORMATION: BANGKOK**
- **Top Attractions:** Grand Palace, Wat Arun, Chatuchak Market, Wat Pho, Chao Phraya River
- **Local Cuisine:** Pad Thai, Tom Yum Goong, Green Curry, Mango Sticky Rice, Street food
- **Cultural Experiences:** Thai cooking classes, Muay Thai shows, longtail boat tours, floating markets
- **Transportation:** BTS Skytrain, MRT subway, tuk-tuks, taxis, river boats
- **Weather Considerations:** Best time to visit is November-February (cool and dry season)
- **Safety Tips:** Use metered taxis, beware of scams targeting tourists, drink bottled water
- **Local Etiquette:** Dress modestly at temples, remove shoes before entering, never touch someone's head`;
    }
    
    // Default for other destinations
    return `**DESTINATION-SPECIFIC INFORMATION**
Please research and include authentic local attractions, cuisine, cultural experiences, and practical information specific to ${destination}. Focus on providing genuine local experiences rather than generic tourist activities.`;
  }

  private getTransportationDetails(formData: TravelFormData): string {
    if (!formData.transportationType || formData.transportationType === 'any') {
      return `**TRANSPORTATION DETAILS:**
Please include recommendations for the best way to travel from ${formData.origin} to ${formData.destination}, considering cost, convenience, and travel time. Include specific flight options, train routes, or driving directions as appropriate.`;
    }

    switch (formData.transportationType) {
      case 'flight':
        return `**FLIGHT DETAILS:**
Please include detailed flight recommendations from ${formData.origin} to ${formData.destination}, including:
- Suggested airlines and flight numbers
- Typical departure and arrival times
- Estimated costs (economy, premium economy, business class)
- Airport transfer options at both origin and destination
- Luggage allowances and restrictions
- Check-in procedures and timing
- Airport amenities and lounges
- Tips for a comfortable flight experience`;

      case 'train':
        return `**TRAIN JOURNEY DETAILS:**
Please include detailed train travel recommendations from ${formData.origin} to ${formData.destination}, including:
- Major train stations and routes
- Train operators and classes available
- Typical journey duration and frequency
- Estimated costs for different classes
- Booking procedures and platforms
- Station facilities and services
- Luggage allowances
- Tips for a comfortable train journey`;

      case 'bus':
        return `**BUS JOURNEY DETAILS:**
Please include detailed bus travel recommendations from ${formData.origin} to ${formData.destination}, including:
- Major bus operators and routes
- Bus stations and terminals
- Typical journey duration and frequency
- Estimated costs and ticket classes
- Booking procedures and platforms
- Onboard amenities
- Luggage allowances
- Tips for a comfortable bus journey`;

      case 'car':
        return `**DRIVING DETAILS:**
Please include detailed driving recommendations from ${formData.origin} to ${formData.destination}, including:
- Recommended route options
- Total distance and driving time
- Road conditions and quality
- Border crossings if applicable
- Toll roads and costs
- Rest stops and points of interest along the way
- Fuel costs and availability
- Parking options at the destination
- Car rental recommendations if needed
- Local driving laws and customs to be aware of`;

      default:
        return '';
    }
  }

  private createCulturalInsightsPrompt(destination: string): string {
    return `Provide essential cultural insights and etiquette tips for travelers visiting ${destination}.

Include:
- Greeting customs and social norms
- Dining etiquette and table manners
- Dress codes and appearance expectations
- Religious considerations and sacred sites
- Important cultural practices and traditions
- Do's and don'ts for respectful behavior
- Communication tips and language considerations
- Tipping customs and business practices

Keep the advice practical and respectful, helping travelers connect authentically with local culture.`;
  }

  private createRestaurantPrompt(destination: string, budget: number, dietaryRestrictions: string): string {
    const budgetRange = this.getBudgetRange(budget);
    
    return `Create a comprehensive dining guide for ${destination} with a ${budgetRange} budget.

Include:
- Must-try local dishes and specialties
- Restaurant recommendations by category (fine dining, local favorites, street food)
- Food markets and culinary experiences
- Budget breakdown for meals
- Safety tips for street food
${dietaryRestrictions ? `- Specific options for ${dietaryRestrictions} dietary restrictions` : ''}
- Essential food phrases in the local language
- Dining customs and etiquette

Focus on authentic experiences that showcase local culinary culture.`;
  }

  private createLanguagePhrasesPrompt(destination: string): string {
    return `Provide essential travel phrases for visitors to ${destination}.

Include:
- Basic greetings and politeness (hello, thank you, please, excuse me)
- Navigation and transportation phrases
- Dining and shopping essentials
- Emergency phrases
- Cultural and respectful expressions
- Pronunciation guides for each phrase
- Context for when to use formal vs informal language

Make the phrases practical for everyday travel situations.`;
  }

  private calculateTripDuration(departureDate: string, returnDate: string): number {
    const departure = new Date(departureDate);
    const returnD = new Date(returnDate);
    const diffTime = Math.abs(returnD.getTime() - departure.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }

  private getBudgetRange(budget: number): string {
    if (budget <= 75) return 'Budget ($50-100/day)';
    if (budget <= 175) return 'Comfort ($100-250/day)';
    if (budget <= 375) return 'Luxury ($250-500/day)';
    return 'Ultra-Luxury ($500+/day)';
  }

  private shouldSuggestMultiCity(destination: string): boolean {
    // Check if the destination is a country or large region that would benefit from a multi-city itinerary
    const largeDestinations = [
      'india', 'japan', 'china', 'usa', 'united states', 'australia', 'france', 'italy', 'spain', 
      'germany', 'uk', 'united kingdom', 'thailand', 'vietnam', 'indonesia', 'brazil', 'mexico',
      'canada', 'south africa', 'morocco', 'turkey', 'greece', 'europe', 'southeast asia', 
      'south america', 'central america', 'scandinavia', 'middle east'
    ];
    
    return largeDestinations.some(dest => 
      destination.toLowerCase().includes(dest) || 
      dest.includes(destination.toLowerCase())
    );
  }

  private suggestCitiesForDestination(destination: string, duration: number): string[] {
    // Suggest appropriate cities based on the destination and trip duration
    const destinationLower = destination.toLowerCase();
    
    // India
    if (destinationLower.includes('india')) {
      if (duration <= 7) {
        return ['Delhi', 'Agra', 'Jaipur']; // Golden Triangle
      } else if (duration <= 10) {
        return ['Delhi', 'Agra', 'Jaipur', 'Udaipur'];
      } else if (duration <= 14) {
        return ['Delhi', 'Agra', 'Jaipur', 'Udaipur', 'Mumbai'];
      } else {
        return ['Delhi', 'Agra', 'Jaipur', 'Udaipur', 'Mumbai', 'Varanasi', 'Goa'];
      }
    }
    
    // Japan
    else if (destinationLower.includes('japan')) {
      if (duration <= 7) {
        return ['Tokyo', 'Kyoto'];
      } else if (duration <= 10) {
        return ['Tokyo', 'Kyoto', 'Osaka'];
      } else if (duration <= 14) {
        return ['Tokyo', 'Hakone', 'Kyoto', 'Osaka', 'Hiroshima'];
      } else {
        return ['Tokyo', 'Hakone', 'Kyoto', 'Osaka', 'Hiroshima', 'Kanazawa', 'Sapporo'];
      }
    }
    
    // Italy
    else if (destinationLower.includes('italy')) {
      if (duration <= 7) {
        return ['Rome', 'Florence', 'Venice'];
      } else if (duration <= 10) {
        return ['Rome', 'Florence', 'Venice', 'Amalfi Coast'];
      } else if (duration <= 14) {
        return ['Rome', 'Florence', 'Venice', 'Amalfi Coast', 'Milan'];
      } else {
        return ['Rome', 'Florence', 'Venice', 'Amalfi Coast', 'Milan', 'Sicily'];
      }
    }
    
    // Default for other countries - return just the destination
    return [destination];
  }
}

export const geminiAPI = new GeminiAPIService();
export type { TravelFormData };