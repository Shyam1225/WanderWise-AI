import React, { createContext, useContext, useReducer, ReactNode, useEffect } from 'react';

interface TravelState {
  currentTrip: any | null;
  savedTrips: any[];
  preferences: {
    theme: 'light' | 'dark';
    currency: string;
    language: string;
  };
  isLoading: boolean;
  user: {
    isLoggedIn: boolean;
    id?: string;
    name?: string;
    email?: string;
    avatar?: string;
    plan?: 'free' | 'wanderer' | 'globetrotter';
  };
  analytics: {
    pageViews: Record<string, number>;
    featureUsage: Record<string, number>;
    searchHistory: string[];
    lastActive: string;
  };
  notifications: {
    unread: number;
    items: Array<{
      id: string;
      type: 'trip' | 'system' | 'promo';
      title: string;
      message: string;
      date: string;
      read: boolean;
    }>;
  };
}

type TravelAction = 
  | { type: 'SET_CURRENT_TRIP'; payload: any }
  | { type: 'ADD_SAVED_TRIP'; payload: any }
  | { type: 'TOGGLE_THEME' }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'UPDATE_PREFERENCES'; payload: Partial<TravelState['preferences']> }
  | { type: 'LOG_IN'; payload: Partial<TravelState['user']> }
  | { type: 'LOG_OUT' }
  | { type: 'TRACK_PAGE_VIEW'; payload: string }
  | { type: 'TRACK_FEATURE_USAGE'; payload: string }
  | { type: 'ADD_SEARCH_HISTORY'; payload: string }
  | { type: 'CLEAR_SEARCH_HISTORY' }
  | { type: 'ADD_NOTIFICATION'; payload: Omit<TravelState['notifications']['items'][0], 'id' | 'read' | 'date'> }
  | { type: 'MARK_NOTIFICATION_READ'; payload: string }
  | { type: 'CLEAR_ALL_NOTIFICATIONS' };

// Get theme from localStorage or system preference
const getInitialTheme = (): 'light' | 'dark' => {
  if (typeof window !== 'undefined') {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light' || savedTheme === 'dark') {
      return savedTheme;
    }
    
    // Check system preference
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
  }
  
  return 'light';
};

const initialState: TravelState = {
  currentTrip: null,
  savedTrips: [],
  preferences: {
    theme: getInitialTheme(),
    currency: 'USD',
    language: 'en',
  },
  isLoading: false,
  user: {
    isLoggedIn: false
  },
  analytics: {
    pageViews: {},
    featureUsage: {},
    searchHistory: [],
    lastActive: new Date().toISOString()
  },
  notifications: {
    unread: 0,
    items: []
  }
};

function travelReducer(state: TravelState, action: TravelAction): TravelState {
  switch (action.type) {
    case 'SET_CURRENT_TRIP':
      return { ...state, currentTrip: action.payload };
      
    case 'ADD_SAVED_TRIP':
      return { ...state, savedTrips: [...state.savedTrips, action.payload] };
      
    case 'TOGGLE_THEME':
      const newTheme = state.preferences.theme === 'light' ? 'dark' : 'light';
      // Save to localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('theme', newTheme);
      }
      return {
        ...state,
        preferences: {
          ...state.preferences,
          theme: newTheme,
        },
      };
      
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
      
    case 'UPDATE_PREFERENCES':
      const updatedPreferences = { ...state.preferences, ...action.payload };
      
      // Save theme to localStorage if it changed
      if (action.payload.theme && action.payload.theme !== state.preferences.theme) {
        localStorage.setItem('theme', action.payload.theme);
      }
      
      return {
        ...state,
        preferences: updatedPreferences,
      };
      
    case 'LOG_IN':
      return {
        ...state,
        user: {
          ...state.user,
          isLoggedIn: true,
          ...action.payload
        }
      };
      
    case 'LOG_OUT':
      return {
        ...state,
        user: {
          isLoggedIn: false
        }
      };
      
    case 'TRACK_PAGE_VIEW':
      return {
        ...state,
        analytics: {
          ...state.analytics,
          pageViews: {
            ...state.analytics.pageViews,
            [action.payload]: (state.analytics.pageViews[action.payload] || 0) + 1
          },
          lastActive: new Date().toISOString()
        }
      };
      
    case 'TRACK_FEATURE_USAGE':
      return {
        ...state,
        analytics: {
          ...state.analytics,
          featureUsage: {
            ...state.analytics.featureUsage,
            [action.payload]: (state.analytics.featureUsage[action.payload] || 0) + 1
          },
          lastActive: new Date().toISOString()
        }
      };
      
    case 'ADD_SEARCH_HISTORY':
      return {
        ...state,
        analytics: {
          ...state.analytics,
          searchHistory: [
            action.payload,
            ...state.analytics.searchHistory.filter(term => term !== action.payload).slice(0, 9)
          ]
        }
      };
      
    case 'CLEAR_SEARCH_HISTORY':
      return {
        ...state,
        analytics: {
          ...state.analytics,
          searchHistory: []
        }
      };
      
    case 'ADD_NOTIFICATION':
      const newNotification = {
        id: `notif_${Date.now()}`,
        ...action.payload,
        date: new Date().toISOString(),
        read: false
      };
      return {
        ...state,
        notifications: {
          unread: state.notifications.unread + 1,
          items: [newNotification, ...state.notifications.items]
        }
      };
      
    case 'MARK_NOTIFICATION_READ':
      const updatedItems = state.notifications.items.map(item => 
        item.id === action.payload ? { ...item, read: true } : item
      );
      const unreadCount = updatedItems.filter(item => !item.read).length;
      return {
        ...state,
        notifications: {
          unread: unreadCount,
          items: updatedItems
        }
      };
      
    case 'CLEAR_ALL_NOTIFICATIONS':
      return {
        ...state,
        notifications: {
          unread: 0,
          items: []
        }
      };
      
    default:
      return state;
  }
}

const TravelContext = createContext<{
  state: TravelState;
  dispatch: React.Dispatch<TravelAction>;
} | null>(null);

export function TravelProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(travelReducer, initialState);

  // Apply theme to document when it changes
  useEffect(() => {
    if (state.preferences.theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [state.preferences.theme]);

  // Track page views
  useEffect(() => {
    const trackPageView = () => {
      const path = window.location.pathname;
      dispatch({ type: 'TRACK_PAGE_VIEW', payload: path });
    };

    // Track initial page view
    trackPageView();

    // Set up listener for route changes
    const handleRouteChange = () => {
      trackPageView();
    };

    // Clean up
    return () => {
      // Remove event listener if needed
    };
  }, []);

  return (
    <TravelContext.Provider value={{ state, dispatch }}>
      {children}
    </TravelContext.Provider>
  );
}

export function useTravelContext() {
  const context = useContext(TravelContext);
  if (!context) {
    throw new Error('useTravelContext must be used within a TravelProvider');
  }
  return context;
}