import React, { useState, useCallback, useRef } from 'react';
import { geminiAPI, type TravelFormData } from '../services/geminiAPI';

interface UseGeminiAPIReturn {
  generateItinerary: (formData: TravelFormData) => Promise<void>;
  getCulturalInsights: (destination: string) => Promise<void>;
  getRestaurantRecommendations: (destination: string, budget: number, dietaryRestrictions: string) => Promise<void>;
  getLocalPhrases: (destination: string) => Promise<void>;
  isLoading: boolean;
  error: string | null;
  response: string | null;
  progress: number;
  currentMessage: string;
  retryCount: number;
  clearResponse: () => void;
  clearError: () => void;
  cancelRequest: () => void;
}

const RETRY_DELAYS = [1000, 2000, 4000]; // Progressive delays
const MAX_RETRIES = 3;

const PROGRESS_MESSAGES = [
  'Analyzing your travel preferences...',
  'Consulting local experts worldwide...',
  'Finding hidden gems and local favorites...',
  'Discovering authentic dining experiences...',
  'Researching cultural attractions...',
  'Planning adventure activities...',
  'Identifying Instagram-worthy spots...',
  'Crafting your perfect itinerary...',
  'Adding final touches...',
  'Almost ready!'
];

export function useGeminiAPI(): UseGeminiAPIReturn {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [response, setResponse] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const [currentMessage, setCurrentMessage] = useState('');
  const [retryCount, setRetryCount] = useState(0);
  
  const abortControllerRef = useRef<AbortController | null>(null);
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const messageIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const clearResponse = useCallback(() => {
    setResponse(null);
  }, []);

  const clearError = useCallback(() => {
    setError(null);
    setRetryCount(0);
  }, []);

  const cancelRequest = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
      progressIntervalRef.current = null;
    }
    if (messageIntervalRef.current) {
      clearInterval(messageIntervalRef.current);
      messageIntervalRef.current = null;
    }
    setIsLoading(false);
    setProgress(0);
    setCurrentMessage('');
  }, []);

  const simulateProgress = useCallback((duration: number = 30000) => {
    setProgress(0);
    let messageIndex = 0;
    
    // Update progress
    const startTime = Date.now();
    const progressInterval = 100; // Update every 100ms
    
    progressIntervalRef.current = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progressPercent = Math.min((elapsed / duration) * 95, 95); // Cap at 95% until completion
      setProgress(progressPercent);
      
      if (progressPercent >= 95) {
        if (progressIntervalRef.current) {
          clearInterval(progressIntervalRef.current);
          progressIntervalRef.current = null;
        }
      }
    }, progressInterval);

    // Update messages
    setCurrentMessage(PROGRESS_MESSAGES[0]);
    messageIntervalRef.current = setInterval(() => {
      messageIndex = (messageIndex + 1) % PROGRESS_MESSAGES.length;
      setCurrentMessage(PROGRESS_MESSAGES[messageIndex]);
    }, 3000);
  }, []);

  const validateResponse = (response: string): boolean => {
    if (!response || response.trim().length < 200) {
      return false;
    }
    
    // Check for common AI response patterns that indicate a proper itinerary
    const hasItineraryMarkers = /day\s*\d+|itinerary|schedule|activities|recommendations|morning|afternoon|evening/i.test(response);
    const hasMinimumContent = response.length > 500;
    
    return hasItineraryMarkers && hasMinimumContent;
  };

  const handleRequestWithRetry = useCallback(async (
    requestFn: () => Promise<string>,
    requestType: string = 'request'
  ) => {
    setIsLoading(true);
    setError(null);
    setResponse(null);
    setProgress(0);
    setCurrentMessage(`Starting ${requestType}...`);

    // Create abort controller for this request
    abortControllerRef.current = new AbortController();
    
    // Start progress simulation
    simulateProgress(60000); // Increased duration for longer responses

    let lastError: Error | null = null;
    
    for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
      try {
        setRetryCount(attempt);
        
        if (attempt > 0) {
          setCurrentMessage(`Retrying... (Attempt ${attempt + 1})`);
          // Wait before retry with progressive delay
          await new Promise(resolve => setTimeout(resolve, RETRY_DELAYS[attempt - 1] || 4000));
        }

        setCurrentMessage(`Processing your ${requestType}...`);
        
        const result = await requestFn();
        
        // Validate response
        if (!validateResponse(result)) {
          throw new Error('Received incomplete or invalid response. Please try again with more specific details.');
        }

        // Success!
        setProgress(100);
        setCurrentMessage('Complete!');
        setResponse(result);
        setRetryCount(0);
        
        // Clear intervals
        if (progressIntervalRef.current) {
          clearInterval(progressIntervalRef.current);
          progressIntervalRef.current = null;
        }
        if (messageIntervalRef.current) {
          clearInterval(messageIntervalRef.current);
          messageIntervalRef.current = null;
        }
        
        setIsLoading(false);
        return;
        
      } catch (err) {
        lastError = err instanceof Error ? err : new Error('Unknown error occurred');
        console.error(`${requestType} attempt ${attempt + 1} failed:`, lastError);
        
        // If this was an abort, don't retry
        if (lastError.name === 'AbortError' || lastError.message.includes('cancelled')) {
          setIsLoading(false);
          return;
        }
        
        // If we've exhausted retries, break
        if (attempt === MAX_RETRIES) {
          break;
        }
        
        // Update progress to show retry
        setProgress(20 + (attempt * 20));
      }
    }

    // All retries failed
    const finalError = lastError || new Error('Request failed after multiple attempts');
    setError(finalError.message);
    setCurrentMessage('Failed to generate response');
    setProgress(0);
    setIsLoading(false);
    
    // Clear intervals
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
      progressIntervalRef.current = null;
    }
    if (messageIntervalRef.current) {
      clearInterval(messageIntervalRef.current);
      messageIntervalRef.current = null;
    }
  }, [simulateProgress]);

  const generateItinerary = useCallback(async (formData: TravelFormData) => {
    await handleRequestWithRetry(
      () => geminiAPI.generateItinerary(formData, abortControllerRef.current?.signal),
      'itinerary generation'
    );
  }, [handleRequestWithRetry]);

  const getCulturalInsights = useCallback(async (destination: string) => {
    await handleRequestWithRetry(
      () => geminiAPI.getCulturalInsights(destination, abortControllerRef.current?.signal),
      'cultural insights'
    );
  }, [handleRequestWithRetry]);

  const getRestaurantRecommendations = useCallback(async (
    destination: string, 
    budget: number, 
    dietaryRestrictions: string
  ) => {
    await handleRequestWithRetry(
      () => geminiAPI.getRestaurantRecommendations(destination, budget, dietaryRestrictions, abortControllerRef.current?.signal),
      'restaurant recommendations'
    );
  }, [handleRequestWithRetry]);

  const getLocalPhrases = useCallback(async (destination: string) => {
    await handleRequestWithRetry(
      () => geminiAPI.getLocalPhrases(destination, abortControllerRef.current?.signal),
      'local phrases'
    );
  }, [handleRequestWithRetry]);

  // Cleanup on unmount
  React.useEffect(() => {
    return () => {
      cancelRequest();
    };
  }, [cancelRequest]);

  return {
    generateItinerary,
    getCulturalInsights,
    getRestaurantRecommendations,
    getLocalPhrases,
    isLoading: isLoading && !error,
    error,
    response,
    progress,
    currentMessage,
    retryCount,
    clearResponse,
    clearError,
    cancelRequest,
  };
}