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
  mustVisitPlaces?: string;
}

// Alias for TravelFormData to match the provided code
type TravelPreferences = TravelFormData;

// Gemini REST API endpoint (v1beta)
const GEMINI_CHAT_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent";
const GOOGLE_API_KEY = "AIzaSyB2h-YL3jBQpoKqFJeaTBdam1t3W3bGGSY";

class GeminiAPIService {
  private apiKey: string;
  private baseURL: string = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent';
  private requestTimeout: number = 60000; // 60 seconds

  constructor() {
    this.apiKey = import.meta.env.VITE_GEMINI_API_KEY || GOOGLE_API_KEY;
    console.log('Gemini API Key loaded:', this.apiKey ? 'Yes' : 'No');
  }

  private buildTravelPrompt(preferences: TravelPreferences): string {
    const duration = this.calculateDuration(preferences.departureDate, preferences.returnDate);

    return `You are WanderWise AI, the world's most knowledgeable travel expert with deep cultural insights and local expertise. Create an exceptional ${duration}-day travel itinerary for ${preferences.destination}.

TRAVELER PROFILE:
- Origin: ${preferences.origin}
- Destination: ${preferences.destination}
- Duration: ${duration} days (${preferences.departureDate} to ${preferences.returnDate})
- Interests: ${preferences.interests.join(', ')}
- Budget: $${preferences.budget} per day
- Travel Style: ${preferences.travelStyle}
- Group Size: ${preferences.groupSize}
- Transportation: ${preferences.transportationType || 'Any'}
- Special Requirements: ${preferences.specialRequirements || 'None'}
- Accommodation: ${preferences.accommodation || 'Standard'}
- Dietary Restrictions: ${preferences.dietaryRestrictions || 'None'}
- Accessibility Needs: ${preferences.accessibilityNeeds || 'None'}
${preferences.mustVisitPlaces ? `- Must-Visit Places: ${preferences.mustVisitPlaces}` : ''}

CRITICAL FORMATTING REQUIREMENTS:
1. You MUST respond with ONLY valid JSON - no markdown, no code blocks, no additional text
2. The JSON must be complete and parseable 
3. Do NOT use comments in the JSON
4. Do NOT truncate or use "..." anywhere in the response
5. Every day from 1 to ${duration} must be fully detailed

REQUIREMENTS:
Create a detailed day-by-day itinerary with:
1. 3-4 daily activities (with specific times, costs, and descriptions)
2. 2-3 restaurants per day (dishes, price range, description)
3. Transportation details (methods, costs, tips)
4. Cultural insights (customs, etiquette, dress)
5. Budget breakdown

CRITICAL INSTRUCTION: YOU MUST PROVIDE A DETAILED PLAN FOR EACH OF THE ${duration} DAYS OF THE TRIP. DO NOT STOP AFTER 3 DAYS.

Format ONLY as JSON matching:
{
  "destination": "${preferences.destination}",
  "duration": ${duration},
  "totalBudget": calculated_total,
  "days": [
    {
      "day": 1,
      "date": "YYYY-MM-DD",
      "activities": [
        {
          "name": "Activity Name",
          "description": "...",
          "time": "HH:MM AM/PM",
          "duration": "X hours",
          "cost": 25,
          "category": "Culture/Adventure/Food",
          "location": "...",
          "tips": [".."]
        }
      ],
      "restaurants": [
        {
          "name": "...",
          "cuisine": "...",
          "priceRange": "$10-25",
          "description": "...",
          "mustTryDishes": [".."],
          "location": "..."
        }
      ],
      "transportation": [
        {
          "from": "...",
          "to": "...",
          "method": "...",
          "cost": 5,
          "duration": "20 minutes",
          "tips": [".."]
        }
      ],
      "dailyBudget": 100
    }
  ],
  "culturalInsights": [
    {
      "category": "...",
      "title": "...",
      "description": "...",
      "importance": "high/medium/low",
      "tips": [".."]
    }
  ]
}

REMINDER: THIS IS A ${duration}-DAY TRIP. YOU MUST PROVIDE A COMPLETE ITINERARY FOR ALL ${duration} DAYS.

FINAL CHECK: ENSURE YOUR RESPONSE INCLUDES DETAILED PLANS FOR DAY 1 THROUGH DAY ${duration}. DO NOT ABBREVIATE OR SUMMARIZE LATER DAYS.

Respond ONLY with JSON.`;
  }

  private calculateDuration(startDate: string, endDate: string): number {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  }

  private getBudgetRange(budget: number): string {
    if (budget <= 75) return 'Budget ($50-100/day)';
    if (budget <= 175) return 'Comfort ($100-250/day)';
    if (budget <= 375) return 'Luxury ($250-500/day)';
    return 'Ultra-Luxury ($500+/day)';
  }

  private cleanJsonResponse(responseText: string): string {
    console.log('Cleaning JSON response, length:', responseText.length);
    
    // Remove any markdown code blocks
    let cleaned = responseText.replace(/```json\s*/g, '').replace(/```\s*$/g, '').replace(/```/g, '');
    
    // Remove any text before the first opening brace
    const firstBrace = cleaned.indexOf('{');
    if (firstBrace > 0) {
      cleaned = cleaned.substring(firstBrace);
    }
    
    // Remove any text after the last closing brace
    const lastBrace = cleaned.lastIndexOf('}');
    if (lastBrace !== -1 && lastBrace < cleaned.length - 1) {
      cleaned = cleaned.substring(0, lastBrace + 1);
    }
    
    // Remove comments and extra whitespace
    cleaned = cleaned.replace(/\/\/.*$/gm, '');
    cleaned = cleaned.replace(/\/\*[\s\S]*?\*\//g, '');
    cleaned = cleaned.trim();
    
    return cleaned;
  }

  private validateJsonStructure(obj: any): boolean {
    if (!obj || typeof obj !== 'object') {
      return false;
    }
    
    const requiredFields = ['destination', 'duration', 'days'];
    for (const field of requiredFields) {
      if (!obj[field]) {
        return false;
      }
    }
    
    if (!Array.isArray(obj.days) || obj.days.length === 0) {
      return false;
    }
    
    return true;
  }

  private createFallbackItinerary(formData: TravelFormData): any {
    const duration = this.calculateDuration(formData.departureDate, formData.returnDate);
    
    const fallbackDays = [];
    const startDate = new Date(formData.departureDate);
    
    for (let i = 1; i <= duration; i++) {
      const currentDate = new Date(startDate);
      currentDate.setDate(startDate.getDate() + i - 1);
      
      fallbackDays.push({
        day: i,
        date: currentDate.toISOString().split('T')[0],
        activities: [
          {
            name: `Explore ${formData.destination} - Day ${i}`,
            description: `Discover the highlights and attractions of ${formData.destination}`,
            time: "9:00 AM",
            duration: "3 hours",
            cost: Math.floor(formData.budget * 0.3),
            category: "Sightseeing",
            location: `${formData.destination} City Center`,
            tips: ["Start early to avoid crowds", "Wear comfortable walking shoes"]
          },
          {
            name: "Local Cultural Experience",
            description: "Immerse yourself in the local culture with an authentic experience",
            time: "2:00 PM",
            duration: "2 hours",
            cost: Math.floor(formData.budget * 0.2),
            category: "Culture",
            location: `Cultural District, ${formData.destination}`,
            tips: ["Respect local customs", "Try to learn a few phrases in the local language"]
          }
        ],
        restaurants: [
          {
            name: "Local Cuisine Restaurant",
            cuisine: "Regional Specialties",
            priceRange: `$${Math.floor(formData.budget * 0.15)}-${Math.floor(formData.budget * 0.25)}`,
            description: "Authentic local dining experience with traditional dishes",
            mustTryDishes: ["Regional specialty", "Local dessert"],
            location: `Downtown ${formData.destination}`
          },
          {
            name: "Casual Dining Spot",
            cuisine: "International & Local",
            priceRange: `$${Math.floor(formData.budget * 0.1)}-${Math.floor(formData.budget * 0.2)}`,
            description: "Relaxed atmosphere with a variety of options",
            mustTryDishes: ["Chef's special", "Popular local dish"],
            location: `${formData.destination} Tourist Area`
          }
        ],
        transportation: [
          {
            from: "Hotel",
            to: "City Center",
            method: "Public Transportation",
            cost: Math.floor(formData.budget * 0.05),
            duration: "20 minutes",
            tips: ["Buy a day pass for better value"]
          }
        ],
        dailyBudget: formData.budget
      });
    }
    
    return {
      destination: formData.destination,
      duration: duration,
      totalBudget: formData.budget * duration,
      days: fallbackDays,
      culturalInsights: [
        {
          category: "Etiquette",
          title: "Basic Cultural Etiquette",
          description: `Important cultural norms and practices in ${formData.destination}`,
          importance: "high",
          tips: [
            "Research local customs before your trip",
            "Dress appropriately for religious sites",
            "Learn basic greetings in the local language"
          ]
        }
      ]
    };
  }

  async generateItinerary(formData: TravelFormData, signal?: AbortSignal): Promise<string> {
    if (!this.apiKey) {
      throw new Error('Gemini API key is required. Please check your environment configuration.');
    }

    console.log('Making request to Gemini API...');

    try {
      const prompt = this.buildTravelPrompt(formData);
      
      const requestBody = {
        contents: [{
          parts: [{
            text: prompt
          }]
        }],
        generationConfig: {
          temperature: 0.7,
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

      const resultText = data.candidates[0].content.parts[0].text;
      console.log('Generated text length:', resultText.length);
      
      if (resultText.length < 500) {
        throw new Error('Generated response is too short. Please try again with more specific details.');
      }

      // Try to extract and format JSON if the response contains it
      try {
        const cleanedJson = this.cleanJsonResponse(resultText);
        const parsed = JSON.parse(cleanedJson);
        
        if (!this.validateJsonStructure(parsed)) {
          console.warn('Invalid JSON structure, using fallback');
          const fallback = this.createFallbackItinerary(formData);
          return JSON.stringify(fallback, null, 2);
        }
        
        // Add metadata
        const enhanced = {
          ...parsed,
          id: `itinerary-${Date.now()}`,
          createdAt: new Date().toISOString(),
        };
        return JSON.stringify(enhanced, null, 2);
      } catch (jsonError) {
        console.warn('Failed to parse JSON from response:', jsonError);
        const fallback = this.createFallbackItinerary(formData);
        return JSON.stringify(fallback, null, 2);
      }

      return resultText;
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
      
      // If we get here, create a fallback itinerary
      const fallback = this.createFallbackItinerary(formData);
      return JSON.stringify(fallback, null, 2);
    }
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
          maxOutputTokens: 8192,
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

      if (!response.ok) {
        const errorText = await response.text();
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
      
      if (!data.candidates || data.candidates.length === 0) {
        throw new Error('No response generated from Gemini API.');
      }

      return data.candidates[0].content.parts[0].text;
    } catch (error) {
      console.error('Gemini API request failed:', error);
      throw error;
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
}

export const geminiAPI = new GeminiAPIService();
export type { TravelFormData };