import axios from 'axios';

interface WeatherForecast {
  date: string;
  temperature: {
    min: number;
    max: number;
    current?: number;
  };
  condition: string;
  icon: string;
  humidity: number;
  windSpeed: number;
  precipitation: number;
  sunrise: string;
  sunset: string;
}

interface WeatherResponse {
  location: {
    name: string;
    region: string;
    country: string;
    lat: number;
    lon: number;
    localtime: string;
  };
  current: {
    temp_c: number;
    temp_f: number;
    condition: {
      text: string;
      icon: string;
      code: number;
    };
    humidity: number;
    wind_kph: number;
    precip_mm: number;
    feelslike_c: number;
    feelslike_f: number;
    uv: number;
  };
  forecast: {
    forecastday: Array<{
      date: string;
      day: {
        maxtemp_c: number;
        mintemp_c: number;
        avgtemp_c: number;
        maxtemp_f: number;
        mintemp_f: number;
        avgtemp_f: number;
        condition: {
          text: string;
          icon: string;
          code: number;
        };
        daily_chance_of_rain: number;
        totalprecip_mm: number;
        avghumidity: number;
        maxwind_kph: number;
      };
      astro: {
        sunrise: string;
        sunset: string;
      };
      hour: Array<{
        time: string;
        temp_c: number;
        temp_f: number;
        condition: {
          text: string;
          icon: string;
          code: number;
        };
        chance_of_rain: number;
      }>;
    }>;
  };
}

export class WeatherService {
  private apiKey: string;
  private baseUrl: string;
  private cache: Map<string, { data: WeatherResponse; timestamp: number }>;
  private cacheDuration: number = 3600000; // 1 hour in milliseconds

  constructor() {
    // Load API key from environment variables
    this.apiKey = import.meta.env.VITE_WEATHER_API_KEY || '';
    this.baseUrl = 'https://api.weatherapi.com/v1';
    this.cache = new Map();
    
    // Check if API key is a placeholder or invalid
    if (this.apiKey === 'your_weather_api_key_here' || 
        this.apiKey === 'your_production_weather_api_key_here') {
      console.warn('Weather API key is a placeholder. Using fallback weather data.');
      this.apiKey = '';
    }
    
    console.log('Weather API Key available:', !!this.apiKey);
  }

  async getWeatherForecast(location: string, days: number = 7): Promise<WeatherForecast[]> {
    try {
      // If no API key is available, return fallback data immediately
      if (!this.apiKey) {
        console.warn('No valid weather API key found. Using fallback weather data.');
        return this.getFallbackWeatherData(location, days);
      }

      const cacheKey = `${location}_${days}`;
      const now = Date.now();
      const cachedData = this.cache.get(cacheKey);

      // Use cached data if available and not expired
      if (cachedData && now - cachedData.timestamp < this.cacheDuration) {
        console.log('Using cached weather data for', location);
        return this.formatWeatherData(cachedData.data);
      }

      // Fetch new data
      console.log('Fetching weather data for', location);
      const response = await axios.get<WeatherResponse>(`${this.baseUrl}/forecast.json`, {
        params: {
          key: this.apiKey,
          q: location,
          days: days,
          aqi: 'no',
          alerts: 'no'
        }
      });

      // Cache the response
      this.cache.set(cacheKey, { data: response.data, timestamp: now });
      console.log('Weather data fetched and cached');

      return this.formatWeatherData(response.data);
    } catch (error) {
      console.error('Weather API error:', error);
      return this.getFallbackWeatherData(location, days);
    }
  }

  async getCurrentWeather(location: string): Promise<WeatherForecast> {
    try {
      // If no API key is available, return fallback data immediately
      if (!this.apiKey) {
        console.warn('No valid weather API key found. Using fallback weather data.');
        return this.getFallbackWeatherData(location, 1)[0];
      }

      const cacheKey = `current_${location}`;
      const now = Date.now();
      const cachedData = this.cache.get(cacheKey);

      // Use cached data if available and not expired
      if (cachedData && now - cachedData.timestamp < this.cacheDuration) {
        const forecasts = this.formatWeatherData(cachedData.data);
        return forecasts[0];
      }

      // Fetch new data
      const response = await axios.get<WeatherResponse>(`${this.baseUrl}/forecast.json`, {
        params: {
          key: this.apiKey,
          q: location,
          days: 1,
          aqi: 'no',
          alerts: 'no'
        }
      });

      // Cache the response
      this.cache.set(cacheKey, { data: response.data, timestamp: now });

      const forecasts = this.formatWeatherData(response.data);
      return forecasts[0];
    } catch (error) {
      console.error('Weather API error:', error);
      return this.getFallbackWeatherData(location, 1)[0];
    }
  }

  private formatWeatherData(data: WeatherResponse): WeatherForecast[] {
    return data.forecast.forecastday.map(day => ({
      date: day.date,
      temperature: {
        min: day.day.mintemp_c,
        max: day.day.maxtemp_c,
        current: data.current.temp_c
      },
      condition: day.day.condition.text,
      icon: day.day.condition.icon,
      humidity: day.day.avghumidity,
      windSpeed: day.day.maxwind_kph,
      precipitation: day.day.totalprecip_mm,
      sunrise: day.astro.sunrise,
      sunset: day.astro.sunset
    }));
  }

  private getFallbackWeatherData(location: string, days: number): WeatherForecast[] {
    console.log('Generating fallback weather data for', location);
    const result: WeatherForecast[] = [];
    const today = new Date();
    
    // Generate more realistic weather based on location
    const weatherPatterns = this.getLocationBasedWeatherPattern(location);
    
    for (let i = 0; i < days; i++) {
      const date = new Date(today);
      date.setDate(date.getDate() + i);
      
      // Get weather for this day with some randomness but following the pattern
      const dayWeather = this.generateDayWeather(date, weatherPatterns);
      
      result.push({
        date: date.toISOString().split('T')[0],
        temperature: {
          min: dayWeather.minTemp,
          max: dayWeather.maxTemp
        },
        condition: dayWeather.condition,
        icon: '//cdn.weatherapi.com/weather/64x64/day/116.png',
        humidity: dayWeather.humidity,
        windSpeed: dayWeather.windSpeed,
        precipitation: dayWeather.precipitation,
        sunrise: '06:30 AM',
        sunset: '06:30 PM'
      });
    }
    
    return result;
  }

  private getLocationBasedWeatherPattern(location: string): any {
    // Simplified weather patterns based on location
    const locationLower = location.toLowerCase();
    
    // India patterns
    if (locationLower.includes('mumbai') || locationLower.includes('goa')) {
      return {
        tempRange: { min: 24, max: 34 },
        humidity: { min: 65, max: 85 },
        conditions: ['Sunny', 'Partly cloudy', 'Humid'],
        rainChance: 0.2,
        windRange: { min: 5, max: 15 }
      };
    }
    
    if (locationLower.includes('delhi') || locationLower.includes('jaipur')) {
      return {
        tempRange: { min: 20, max: 38 },
        humidity: { min: 30, max: 50 },
        conditions: ['Sunny', 'Clear', 'Hazy'],
        rainChance: 0.1,
        windRange: { min: 3, max: 12 }
      };
    }
    
    if (locationLower.includes('udaipur')) {
      return {
        tempRange: { min: 18, max: 35 },
        humidity: { min: 35, max: 55 },
        conditions: ['Sunny', 'Clear', 'Partly cloudy'],
        rainChance: 0.15,
        windRange: { min: 4, max: 10 }
      };
    }
    
    // Japan patterns
    if (locationLower.includes('tokyo') || locationLower.includes('japan')) {
      return {
        tempRange: { min: 15, max: 28 },
        humidity: { min: 50, max: 70 },
        conditions: ['Partly cloudy', 'Cloudy', 'Light rain'],
        rainChance: 0.4,
        windRange: { min: 5, max: 15 }
      };
    }
    
    // Europe patterns
    if (locationLower.includes('paris') || locationLower.includes('france')) {
      return {
        tempRange: { min: 10, max: 25 },
        humidity: { min: 60, max: 80 },
        conditions: ['Partly cloudy', 'Cloudy', 'Light rain'],
        rainChance: 0.35,
        windRange: { min: 8, max: 20 }
      };
    }
    
    // Default pattern
    return {
      tempRange: { min: 15, max: 30 },
      humidity: { min: 50, max: 70 },
      conditions: ['Sunny', 'Partly cloudy', 'Cloudy', 'Light rain'],
      rainChance: 0.25,
      windRange: { min: 5, max: 15 }
    };
  }

  private generateDayWeather(date: Date, pattern: any): any {
    // Generate somewhat realistic weather based on pattern
    const random = Math.random();
    const isRainy = random < pattern.rainChance;
    
    // Temperature with some daily variation but following the pattern
    const dayVariation = Math.sin(date.getDate() * 0.5) * 3; // Adds a sine wave variation
    
    const minTemp = Math.round(pattern.tempRange.min + dayVariation);
    const maxTemp = Math.round(pattern.tempRange.max + dayVariation);
    
    // Humidity
    const humidity = Math.round(pattern.humidity.min + 
      (pattern.humidity.max - pattern.humidity.min) * Math.random());
    
    // Wind speed
    const windSpeed = Math.round(pattern.windRange.min + 
      (pattern.windRange.max - pattern.windRange.min) * Math.random());
    
    // Condition
    let condition;
    if (isRainy) {
      condition = 'Light rain';
      // Higher chance of heavier rain if humidity is high
      if (humidity > pattern.humidity.min + 15 && Math.random() > 0.7) {
        condition = 'Moderate rain';
      }
    } else {
      // Pick from non-rainy conditions
      const dryConditions = pattern.conditions.filter((c: string) => !c.toLowerCase().includes('rain'));
      condition = dryConditions[Math.floor(Math.random() * dryConditions.length)];
    }
    
    // Precipitation
    const precipitation = isRainy ? Math.random() * 8 + 1 : Math.random() * 0.5;
    
    return {
      minTemp,
      maxTemp,
      condition,
      humidity,
      windSpeed,
      precipitation: parseFloat(precipitation.toFixed(1))
    };
  }

  getWeatherIcon(condition: string): string {
    // Map condition to appropriate icon
    const conditionLower = condition.toLowerCase();
    
    if (conditionLower.includes('sunny') || conditionLower.includes('clear')) {
      return 'sun';
    } else if (conditionLower.includes('partly cloudy')) {
      return 'cloud-sun';
    } else if (conditionLower.includes('cloudy') || conditionLower.includes('overcast')) {
      return 'cloud';
    } else if (conditionLower.includes('rain') || conditionLower.includes('drizzle')) {
      return 'cloud-rain';
    } else if (conditionLower.includes('thunder') || conditionLower.includes('storm')) {
      return 'cloud-lightning';
    } else if (conditionLower.includes('snow') || conditionLower.includes('sleet')) {
      return 'cloud-snow';
    } else if (conditionLower.includes('mist') || conditionLower.includes('fog')) {
      return 'cloud-fog';
    } else {
      return 'cloud';
    }
  }

  getWeatherRecommendation(forecast: WeatherForecast): string {
    const condition = forecast.condition.toLowerCase();
    const temp = forecast.temperature.max;
    
    if (condition.includes('rain') || condition.includes('drizzle') || condition.includes('thunder')) {
      return 'Bring an umbrella and waterproof clothing. Consider indoor activities or have backup plans for outdoor activities.';
    } else if (condition.includes('snow')) {
      return 'Dress warmly with layers, waterproof boots, and gloves. Roads may be slippery, so take extra care when traveling.';
    } else if (temp > 30) {
      return 'Very hot day. Stay hydrated, wear light clothing and sunscreen, and seek shade during peak hours (11am-3pm).';
    } else if (temp > 25) {
      return 'Warm day. Light clothing, sunscreen, and a hat recommended. Stay hydrated and take breaks in the shade.';
    } else if (temp < 10) {
      return 'Cold day. Dress warmly with layers, a hat, and gloves. Consider warm drinks and indoor activities.';
    } else if (temp < 15) {
      return 'Cool day. A light jacket or sweater recommended, especially in the evening. Good for walking and outdoor activities.';
    } else {
      return 'Pleasant weather. Light layers recommended for temperature changes throughout the day. Perfect for most outdoor activities.';
    }
  }

  getActivityRecommendations(forecast: WeatherForecast): { recommended: string[]; avoid: string[] } {
    const condition = forecast.condition.toLowerCase();
    const temp = forecast.temperature.max;
    const precipitation = forecast.precipitation;
    const windSpeed = forecast.windSpeed;
    
    const recommended: string[] = [];
    const avoid: string[] = [];
    
    // Good weather activities
    if (condition.includes('sunny') || condition.includes('clear')) {
      recommended.push('Outdoor sightseeing', 'Parks and gardens', 'Walking tours');
      if (temp > 25) {
        recommended.push('Water activities', 'Beach visits');
      }
    }
    
    // Moderate weather
    if (condition.includes('partly cloudy') || condition.includes('cloudy')) {
      recommended.push('Museum visits', 'Shopping', 'City tours');
      if (temp > 20) {
        recommended.push('Outdoor cafes');
      }
    }
    
    // Bad weather
    if (condition.includes('rain') || condition.includes('drizzle')) {
      recommended.push('Museum visits', 'Indoor shopping', 'Cultural performances', 'Local cuisine exploration');
      avoid.push('Outdoor activities', 'Beach visits', 'Hiking');
    }
    
    if (condition.includes('thunder') || condition.includes('storm')) {
      recommended.push('Indoor activities only', 'Hotel amenities');
      avoid.push('All outdoor activities', 'Exposed areas');
    }
    
    // Temperature based
    if (temp > 30) {
      recommended.push('Air-conditioned venues', 'Water activities');
      avoid.push('Strenuous outdoor activities during midday');
    }
    
    if (temp < 10) {
      recommended.push('Indoor cultural activities', 'Warm cafes and restaurants');
      avoid.push('Extended outdoor activities without proper clothing');
    }
    
    // Wind based
    if (windSpeed > 30) {
      avoid.push('Boat tours', 'Open-air activities');
    }
    
    return { recommended, avoid };
  }
}

export const weatherService = new WeatherService();