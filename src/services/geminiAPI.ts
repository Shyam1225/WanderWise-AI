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

// Alias for TravelFormData to match the provided code
type TravelPreferences = TravelFormData;

class GeminiAPIService {
  private apiKey: string;
  private baseURL: string = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent';
  private requestTimeout: number = 60000; // 60 seconds

  constructor() {
    this.apiKey = import.meta.env.VITE_GEMINI_API_KEY || 'AIzaSyB2h-YL3jBQpoKqFJeaTBdam1t3W3bGGSY';
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

      // Try to extract and format JSON if the response contains it
      try {
        const jsonMatch = result.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          const jsonString = jsonMatch[0];
          // Parse and stringify to validate and format JSON
          const parsed = JSON.parse(jsonString);
          // Add metadata
          const enhanced = {
            ...parsed,
            id: `itinerary-${Date.now()}`,
            createdAt: new Date().toISOString(),
          };
          return JSON.stringify(enhanced, null, 2);
        }
      } catch (jsonError) {
        console.warn('Failed to parse JSON from response, returning raw text:', jsonError);
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