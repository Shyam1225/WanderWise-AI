import React from 'react';
import { EnhancedTripResults } from './EnhancedTripResults';

interface TripResultsProps {
  itinerary: string;
  isLoading: boolean;
  error: string | null;
  progress: number;
  currentMessage: string;
  retryCount: number;
  onRegenerate: () => void;
  onSave: () => void;
  onShare: () => void;
  onCancel: () => void;
  formData: any;
}

export function TripResults(props: TripResultsProps) {
  return <EnhancedTripResults {...props} />;
}