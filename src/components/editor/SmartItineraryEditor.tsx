import React, { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Edit3, Save, Undo, Redo, Plus, Trash2, Clock, DollarSign,
  Users, MessageCircle, ThumbsUp, ThumbsDown, Share2, Copy,
  AlertTriangle, CheckCircle, Lightbulb, Cloud, Sun, MapPin,
  GripVertical, Calendar, Camera, Utensils, Building, Mountain,
  Navigation, Settings, Filter, Search, Download, Upload
} from 'lucide-react';
import { Button } from '../ui/Button';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

interface Activity {
  id: string;
  time: string;
  title: string;
  description: string;
  location: string;
  duration: number; // in minutes
  cost: number;
  category: 'culture' | 'food' | 'adventure' | 'relaxation' | 'sightseeing';
  difficulty: 'Easy' | 'Moderate' | 'Hard';
  notes: string;
  personalComments: string[];
  collaboratorComments: Array<{
    id: string;
    user: string;
    comment: string;
    timestamp: string;
    votes: number;
  }>;
  alternatives: Array<{
    id: string;
    title: string;
    reason: string;
    cost: number;
    duration: number;
  }>;
  weatherDependent: boolean;
  crowdLevel: 'Low' | 'Medium' | 'High';
}

interface DayPlan {
  id: string;
  date: string;
  theme: string;
  activities: Activity[];
  totalCost: number;
  totalDuration: number;
  conflicts: string[];
}

interface SmartItineraryEditorProps {
  initialItinerary: DayPlan[];
  budget: number;
  groupSize: number;
  onSave: (itinerary: DayPlan[]) => void;
  collaborators: Array<{
    id: string;
    name: string;
    avatar: string;
    isOnline: boolean;
  }>;
}

export function SmartItineraryEditor({ 
  initialItinerary, 
  budget, 
  groupSize, 
  onSave,
  collaborators 
}: SmartItineraryEditorProps) {
  const [itinerary, setItinerary] = useState<DayPlan[]>(initialItinerary);
  const [editingActivity, setEditingActivity] = useState<string | null>(null);
  const [selectedDay, setSelectedDay] = useState<string | null>(null);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [budgetAlert, setBudgetAlert] = useState(false);
  const [undoStack, setUndoStack] = useState<DayPlan[][]>([]);
  const [redoStack, setRedoStack] = useState<DayPlan[][]>([]);
  const [activeCollaborators, setActiveCollaborators] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [showBudgetBreakdown, setShowBudgetBreakdown] = useState(false);
  const [weatherAlerts, setWeatherAlerts] = useState<Array<{
    day: string;
    condition: string;
    impact: string;
  }>>([]);

  const editorRef = useRef<HTMLDivElement>(null);

  // Drag and Drop Handler
  const handleDragEnd = useCallback((result: any) => {
    if (!result.destination) return;

    const { source, destination, draggableId } = result;
    
    // Save current state for undo
    setUndoStack(prev => [...prev, itinerary]);
    setRedoStack([]);

    const newItinerary = [...itinerary];
    const sourceDay = newItinerary.find(day => day.id === source.droppableId);
    const destDay = newItinerary.find(day => day.id === destination.droppableId);

    if (!sourceDay || !destDay) return;

    // Remove activity from source
    const [movedActivity] = sourceDay.activities.splice(source.index, 1);
    
    // Add activity to destination
    destDay.activities.splice(destination.index, 0, movedActivity);

    // Update timing conflicts
    updateTimingConflicts(newItinerary);
    
    setItinerary(newItinerary);
  }, [itinerary]);

  // Update timing conflicts
  const updateTimingConflicts = (days: DayPlan[]) => {
    days.forEach(day => {
      day.conflicts = [];
      let currentTime = 0;
      
      day.activities.forEach((activity, index) => {
        const activityStart = parseTime(activity.time);
        const activityEnd = activityStart + activity.duration;
        
        if (index > 0 && activityStart < currentTime) {
          day.conflicts.push(`${activity.title} overlaps with previous activity`);
        }
        
        currentTime = activityEnd;
      });
    });
  };

  // Parse time string to minutes
  const parseTime = (timeStr: string): number => {
    const [hours, minutes] = timeStr.split(':').map(Number);
    return hours * 60 + minutes;
  };

  // Format minutes to time string
  const formatTime = (minutes: number): string => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
  };

  // Add new activity
  const addActivity = (dayId: string) => {
    const newActivity: Activity = {
      id: `activity-${Date.now()}`,
      time: '09:00',
      title: 'New Activity',
      description: 'Add description...',
      location: 'Location',
      duration: 120,
      cost: 0,
      category: 'sightseeing',
      difficulty: 'Easy',
      notes: '',
      personalComments: [],
      collaboratorComments: [],
      alternatives: [],
      weatherDependent: false,
      crowdLevel: 'Medium'
    };

    setUndoStack(prev => [...prev, itinerary]);
    setRedoStack([]);

    const newItinerary = itinerary.map(day => 
      day.id === dayId 
        ? { ...day, activities: [...day.activities, newActivity] }
        : day
    );
    
    setItinerary(newItinerary);
    setEditingActivity(newActivity.id);
  };

  // Delete activity
  const deleteActivity = (dayId: string, activityId: string) => {
    setUndoStack(prev => [...prev, itinerary]);
    setRedoStack([]);

    const newItinerary = itinerary.map(day => 
      day.id === dayId 
        ? { ...day, activities: day.activities.filter(a => a.id !== activityId) }
        : day
    );
    
    setItinerary(newItinerary);
  };

  // Update activity
  const updateActivity = (dayId: string, activityId: string, updates: Partial<Activity>) => {
    const newItinerary = itinerary.map(day => 
      day.id === dayId 
        ? {
            ...day,
            activities: day.activities.map(activity =>
              activity.id === activityId ? { ...activity, ...updates } : activity
            )
          }
        : day
    );
    
    setItinerary(newItinerary);
    updateTimingConflicts(newItinerary);
  };

  // Undo/Redo functions
  const undo = () => {
    if (undoStack.length > 0) {
      const previousState = undoStack[undoStack.length - 1];
      setRedoStack(prev => [...prev, itinerary]);
      setUndoStack(prev => prev.slice(0, -1));
      setItinerary(previousState);
    }
  };

  const redo = () => {
    if (redoStack.length > 0) {
      const nextState = redoStack[redoStack.length - 1];
      setUndoStack(prev => [...prev, itinerary]);
      setRedoStack(prev => prev.slice(0, -1));
      setItinerary(nextState);
    }
  };

  // Calculate total budget
  const totalBudget = itinerary.reduce((total, day) => 
    total + day.activities.reduce((dayTotal, activity) => dayTotal + activity.cost, 0), 0
  );

  // Budget per person
  const budgetPerPerson = totalBudget / groupSize;

  // Get category icon
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'culture': return Building;
      case 'food': return Utensils;
      case 'adventure': return Mountain;
      case 'relaxation': return Sun;
      case 'sightseeing': return Camera;
      default: return MapPin;
    }
  };

  // Get category color
  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'culture': return 'from-purple-500 to-indigo-500';
      case 'food': return 'from-orange-500 to-red-500';
      case 'adventure': return 'from-green-500 to-teal-500';
      case 'relaxation': return 'from-blue-500 to-cyan-500';
      case 'sightseeing': return 'from-pink-500 to-rose-500';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  return (
    <div className="bg-white dark:bg-gray-900 min-h-screen">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Left side - Editor controls */}
            <div className="flex items-center space-x-4">
              <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
                Smart Itinerary Editor
              </h1>
              
              <div className="flex items-center space-x-2">
                <Button
                  onClick={undo}
                  disabled={undoStack.length === 0}
                  variant="outline"
                  size="sm"
                >
                  <Undo className="w-4 h-4" />
                </Button>
                
                <Button
                  onClick={redo}
                  disabled={redoStack.length === 0}
                  variant="outline"
                  size="sm"
                >
                  <Redo className="w-4 h-4" />
                </Button>
                
                <Button
                  onClick={() => setShowSuggestions(!showSuggestions)}
                  variant="outline"
                  size="sm"
                >
                  <Lightbulb className="w-4 h-4 mr-2" />
                  Suggestions
                </Button>
              </div>
            </div>

            {/* Center - Search and filters */}
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search activities..."
                  className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
              
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                <option value="all">All Categories</option>
                <option value="culture">Culture</option>
                <option value="food">Food</option>
                <option value="adventure">Adventure</option>
                <option value="relaxation">Relaxation</option>
                <option value="sightseeing">Sightseeing</option>
              </select>
            </div>

            {/* Right side - Collaborators and actions */}
            <div className="flex items-center space-x-4">
              {/* Active collaborators */}
              <div className="flex items-center space-x-2">
                {collaborators.slice(0, 3).map((collaborator) => (
                  <div key={collaborator.id} className="relative">
                    <img
                      src={collaborator.avatar}
                      alt={collaborator.name}
                      className="w-8 h-8 rounded-full border-2 border-white dark:border-gray-700"
                    />
                    {collaborator.isOnline && (
                      <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-gray-700" />
                    )}
                  </div>
                ))}
                {collaborators.length > 3 && (
                  <div className="w-8 h-8 bg-gray-200 dark:bg-gray-600 rounded-full flex items-center justify-center text-xs font-medium text-gray-600 dark:text-gray-300">
                    +{collaborators.length - 3}
                  </div>
                )}
              </div>

              <Button
                onClick={() => setShowBudgetBreakdown(!showBudgetBreakdown)}
                variant="outline"
                size="sm"
                className={budgetPerPerson > budget ? 'border-red-500 text-red-600' : ''}
              >
                <DollarSign className="w-4 h-4 mr-2" />
                ${budgetPerPerson.toFixed(0)}
              </Button>

              <Button
                onClick={() => onSave(itinerary)}
                size="sm"
              >
                <Save className="w-4 h-4 mr-2" />
                Save
              </Button>

              <Button
                variant="outline"
                size="sm"
              >
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Budget Alert */}
      <AnimatePresence>
        {budgetPerPerson > budget && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="bg-red-50 dark:bg-red-900/20 border-b border-red-200 dark:border-red-800"
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
              <div className="flex items-center space-x-3">
                <AlertTriangle className="w-5 h-5 text-red-600 dark:text-red-400" />
                <span className="text-red-800 dark:text-red-200">
                  Budget exceeded by ${(budgetPerPerson - budget).toFixed(0)} per person. 
                  Consider removing or replacing some activities.
                </span>
                <Button
                  onClick={() => setShowSuggestions(true)}
                  size="sm"
                  variant="outline"
                  className="border-red-300 text-red-700 hover:bg-red-100"
                >
                  Get Suggestions
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Weather Alerts */}
      <AnimatePresence>
        {weatherAlerts.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="bg-yellow-50 dark:bg-yellow-900/20 border-b border-yellow-200 dark:border-yellow-800"
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
              <div className="flex items-center space-x-3">
                <Cloud className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
                <span className="text-yellow-800 dark:text-yellow-200">
                  Weather alerts for your trip. Some outdoor activities may need backup plans.
                </span>
                <Button
                  size="sm"
                  variant="outline"
                  className="border-yellow-300 text-yellow-700 hover:bg-yellow-100"
                >
                  View Alternatives
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Editor */}
          <div className="lg:col-span-3">
            <DragDropContext onDragEnd={handleDragEnd}>
              <div className="space-y-8">
                {itinerary.map((day, dayIndex) => (
                  <motion.div
                    key={day.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: dayIndex * 0.1 }}
                    className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden"
                  >
                    {/* Day Header */}
                    <div className="bg-gradient-to-r from-primary-500 to-secondary-500 p-6">
                      <div className="flex items-center justify-between text-white">
                        <div>
                          <h2 className="text-2xl font-bold">Day {dayIndex + 1}</h2>
                          <p className="text-white/90">{day.date} • {day.theme}</p>
                        </div>
                        <div className="flex items-center space-x-4">
                          <div className="text-right">
                            <div className="text-sm opacity-90">Daily Cost</div>
                            <div className="font-semibold">
                              ${day.activities.reduce((sum, a) => sum + a.cost, 0)}
                            </div>
                          </div>
                          <Button
                            onClick={() => addActivity(day.id)}
                            variant="outline"
                            size="sm"
                            className="border-white/30 text-white hover:bg-white/10"
                          >
                            <Plus className="w-4 h-4 mr-2" />
                            Add Activity
                          </Button>
                        </div>
                      </div>
                      
                      {/* Conflicts Warning */}
                      {day.conflicts.length > 0 && (
                        <div className="mt-4 p-3 bg-red-500/20 rounded-lg">
                          <div className="flex items-center space-x-2">
                            <AlertTriangle className="w-4 h-4 text-red-200" />
                            <span className="text-red-200 text-sm font-medium">
                              Timing Conflicts Detected
                            </span>
                          </div>
                          <ul className="mt-2 space-y-1">
                            {day.conflicts.map((conflict, index) => (
                              <li key={index} className="text-red-200 text-xs">
                                • {conflict}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>

                    {/* Activities */}
                    <Droppable droppableId={day.id}>
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.droppableProps}
                          className={`p-6 space-y-4 min-h-[200px] transition-colors duration-200 ${
                            snapshot.isDraggingOver ? 'bg-primary-50 dark:bg-primary-900/20' : ''
                          }`}
                        >
                          {day.activities.map((activity, activityIndex) => {
                            const CategoryIcon = getCategoryIcon(activity.category);
                            const isEditing = editingActivity === activity.id;
                            
                            return (
                              <Draggable
                                key={activity.id}
                                draggableId={activity.id}
                                index={activityIndex}
                              >
                                {(provided, snapshot) => (
                                  <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    className={`bg-gray-50 dark:bg-gray-700 rounded-xl p-4 transition-all duration-200 ${
                                      snapshot.isDragging ? 'shadow-2xl rotate-2 scale-105' : 'hover:shadow-md'
                                    }`}
                                  >
                                    <div className="flex items-start space-x-4">
                                      {/* Drag Handle */}
                                      <div
                                        {...provided.dragHandleProps}
                                        className="mt-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 cursor-grab active:cursor-grabbing"
                                      >
                                        <GripVertical className="w-5 h-5" />
                                      </div>

                                      {/* Activity Content */}
                                      <div className="flex-1">
                                        <div className="flex items-start justify-between mb-3">
                                          <div className="flex items-center space-x-3">
                                            <div className={`w-10 h-10 bg-gradient-to-r ${getCategoryColor(activity.category)} rounded-lg flex items-center justify-center`}>
                                              <CategoryIcon className="w-5 h-5 text-white" />
                                            </div>
                                            <div>
                                              {isEditing ? (
                                                <input
                                                  type="text"
                                                  value={activity.title}
                                                  onChange={(e) => updateActivity(day.id, activity.id, { title: e.target.value })}
                                                  className="text-lg font-semibold bg-transparent border-b border-primary-500 focus:outline-none text-gray-900 dark:text-white"
                                                  onBlur={() => setEditingActivity(null)}
                                                  onKeyPress={(e) => e.key === 'Enter' && setEditingActivity(null)}
                                                  autoFocus
                                                />
                                              ) : (
                                                <h3
                                                  className="text-lg font-semibold text-gray-900 dark:text-white cursor-pointer hover:text-primary-600 dark:hover:text-primary-400"
                                                  onClick={() => setEditingActivity(activity.id)}
                                                >
                                                  {activity.title}
                                                </h3>
                                              )}
                                              <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-300">
                                                <div className="flex items-center space-x-1">
                                                  <Clock className="w-4 h-4" />
                                                  <span>{activity.time}</span>
                                                </div>
                                                <div className="flex items-center space-x-1">
                                                  <DollarSign className="w-4 h-4" />
                                                  <span>${activity.cost}</span>
                                                </div>
                                                <span className="px-2 py-1 bg-gray-200 dark:bg-gray-600 rounded-full text-xs">
                                                  {activity.difficulty}
                                                </span>
                                              </div>
                                            </div>
                                          </div>

                                          {/* Activity Actions */}
                                          <div className="flex items-center space-x-2">
                                            <Button
                                              onClick={() => setEditingActivity(activity.id)}
                                              variant="ghost"
                                              size="sm"
                                            >
                                              <Edit3 className="w-4 h-4" />
                                            </Button>
                                            <Button
                                              onClick={() => deleteActivity(day.id, activity.id)}
                                              variant="ghost"
                                              size="sm"
                                              className="text-red-600 hover:text-red-800"
                                            >
                                              <Trash2 className="w-4 h-4" />
                                            </Button>
                                          </div>
                                        </div>

                                        {/* Activity Description */}
                                        <p className="text-gray-600 dark:text-gray-300 mb-3">
                                          {activity.description}
                                        </p>

                                        {/* Activity Details */}
                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3">
                                          <div>
                                            <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
                                              Time
                                            </label>
                                            <input
                                              type="time"
                                              value={activity.time}
                                              onChange={(e) => updateActivity(day.id, activity.id, { time: e.target.value })}
                                              className="w-full px-2 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-1 focus:ring-primary-500 bg-white dark:bg-gray-600 text-gray-900 dark:text-white"
                                            />
                                          </div>
                                          <div>
                                            <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
                                              Duration (min)
                                            </label>
                                            <input
                                              type="number"
                                              value={activity.duration}
                                              onChange={(e) => updateActivity(day.id, activity.id, { duration: parseInt(e.target.value) || 0 })}
                                              className="w-full px-2 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-1 focus:ring-primary-500 bg-white dark:bg-gray-600 text-gray-900 dark:text-white"
                                            />
                                          </div>
                                          <div>
                                            <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
                                              Cost ($)
                                            </label>
                                            <input
                                              type="number"
                                              value={activity.cost}
                                              onChange={(e) => updateActivity(day.id, activity.id, { cost: parseFloat(e.target.value) || 0 })}
                                              className="w-full px-2 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-1 focus:ring-primary-500 bg-white dark:bg-gray-600 text-gray-900 dark:text-white"
                                            />
                                          </div>
                                          <div>
                                            <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
                                              Category
                                            </label>
                                            <select
                                              value={activity.category}
                                              onChange={(e) => updateActivity(day.id, activity.id, { category: e.target.value as any })}
                                              className="w-full px-2 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-1 focus:ring-primary-500 bg-white dark:bg-gray-600 text-gray-900 dark:text-white"
                                            >
                                              <option value="culture">Culture</option>
                                              <option value="food">Food</option>
                                              <option value="adventure">Adventure</option>
                                              <option value="relaxation">Relaxation</option>
                                              <option value="sightseeing">Sightseeing</option>
                                            </select>
                                          </div>
                                        </div>

                                        {/* Personal Notes */}
                                        <div className="mb-3">
                                          <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
                                            Personal Notes
                                          </label>
                                          <textarea
                                            value={activity.notes}
                                            onChange={(e) => updateActivity(day.id, activity.id, { notes: e.target.value })}
                                            placeholder="Add your personal notes..."
                                            rows={2}
                                            className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-1 focus:ring-primary-500 bg-white dark:bg-gray-600 text-gray-900 dark:text-white resize-none"
                                          />
                                        </div>

                                        {/* Collaborator Comments */}
                                        {activity.collaboratorComments.length > 0 && (
                                          <div className="border-t border-gray-200 dark:border-gray-600 pt-3">
                                            <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                              Team Comments
                                            </h4>
                                            <div className="space-y-2">
                                              {activity.collaboratorComments.map((comment) => (
                                                <div key={comment.id} className="bg-white dark:bg-gray-600 rounded p-2">
                                                  <div className="flex items-center justify-between mb-1">
                                                    <span className="text-xs font-medium text-gray-600 dark:text-gray-300">
                                                      {comment.user}
                                                    </span>
                                                    <div className="flex items-center space-x-2">
                                                      <button className="text-green-600 hover:text-green-800">
                                                        <ThumbsUp className="w-3 h-3" />
                                                      </button>
                                                      <span className="text-xs text-gray-500">{comment.votes}</span>
                                                      <button className="text-red-600 hover:text-red-800">
                                                        <ThumbsDown className="w-3 h-3" />
                                                      </button>
                                                    </div>
                                                  </div>
                                                  <p className="text-xs text-gray-700 dark:text-gray-300">
                                                    {comment.comment}
                                                  </p>
                                                </div>
                                              ))}
                                            </div>
                                          </div>
                                        )}

                                        {/* Weather Warning */}
                                        {activity.weatherDependent && (
                                          <div className="flex items-center space-x-2 mt-2 p-2 bg-yellow-100 dark:bg-yellow-900/30 rounded">
                                            <Cloud className="w-4 h-4 text-yellow-600 dark:text-yellow-400" />
                                            <span className="text-xs text-yellow-700 dark:text-yellow-300">
                                              Weather dependent activity - backup plan recommended
                                            </span>
                                          </div>
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                )}
                              </Draggable>
                            );
                          })}
                          {provided.placeholder}
                          
                          {/* Empty state */}
                          {day.activities.length === 0 && (
                            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                              <Calendar className="w-12 h-12 mx-auto mb-4 opacity-50" />
                              <p>No activities planned for this day</p>
                              <Button
                                onClick={() => addActivity(day.id)}
                                variant="outline"
                                size="sm"
                                className="mt-4"
                              >
                                <Plus className="w-4 h-4 mr-2" />
                                Add First Activity
                              </Button>
                            </div>
                          )}
                        </div>
                      )}
                    </Droppable>
                  </motion.div>
                ))}
              </div>
            </DragDropContext>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Budget Tracker */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                <DollarSign className="w-5 h-5 mr-2" />
                Budget Tracker
              </h3>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 dark:text-gray-300">Total Budget:</span>
                  <span className="font-semibold text-gray-900 dark:text-white">
                    ${(budget * groupSize).toLocaleString()}
                  </span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 dark:text-gray-300">Current Cost:</span>
                  <span className={`font-semibold ${
                    totalBudget > budget * groupSize ? 'text-red-600' : 'text-green-600'
                  }`}>
                    ${totalBudget.toLocaleString()}
                  </span>
                </div>
                
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                  <div
                    className={`h-3 rounded-full transition-all duration-300 ${
                      totalBudget > budget * groupSize ? 'bg-red-500' : 'bg-green-500'
                    }`}
                    style={{ width: `${Math.min((totalBudget / (budget * groupSize)) * 100, 100)}%` }}
                  />
                </div>
                
                <div className="text-sm text-gray-600 dark:text-gray-300">
                  {totalBudget > budget * groupSize ? (
                    <span className="text-red-600">
                      Over budget by ${(totalBudget - budget * groupSize).toLocaleString()}
                    </span>
                  ) : (
                    <span className="text-green-600">
                      Under budget by ${(budget * groupSize - totalBudget).toLocaleString()}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Smart Suggestions */}
            <AnimatePresence>
              {showSuggestions && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg"
                >
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                    <Lightbulb className="w-5 h-5 mr-2 text-yellow-500" />
                    Smart Suggestions
                  </h3>
                  
                  <div className="space-y-3">
                    <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                      <h4 className="font-medium text-blue-800 dark:text-blue-300 text-sm mb-1">
                        Budget Optimization
                      </h4>
                      <p className="text-blue-700 dark:text-blue-200 text-xs">
                        Replace "Expensive Restaurant" with "Local Food Market" to save $45 per person
                      </p>
                      <Button size="sm" variant="outline" className="mt-2 text-xs">
                        Apply Suggestion
                      </Button>
                    </div>
                    
                    <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                      <h4 className="font-medium text-green-800 dark:text-green-300 text-sm mb-1">
                        Time Optimization
                      </h4>
                      <p className="text-green-700 dark:text-green-200 text-xs">
                        Visit Museum and Art Gallery together to save 30 minutes travel time
                      </p>
                      <Button size="sm" variant="outline" className="mt-2 text-xs">
                        Apply Suggestion
                      </Button>
                    </div>
                    
                    <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                      <h4 className="font-medium text-yellow-800 dark:text-yellow-300 text-sm mb-1">
                        Weather Backup
                      </h4>
                      <p className="text-yellow-700 dark:text-yellow-200 text-xs">
                        Rain expected on Day 2. Add indoor alternatives for outdoor activities
                      </p>
                      <Button size="sm" variant="outline" className="mt-2 text-xs">
                        Add Backups
                      </Button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Collaboration Panel */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                <Users className="w-5 h-5 mr-2" />
                Team Collaboration
              </h3>
              
              <div className="space-y-3">
                {collaborators.map((collaborator) => (
                  <div key={collaborator.id} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="relative">
                        <img
                          src={collaborator.avatar}
                          alt={collaborator.name}
                          className="w-8 h-8 rounded-full"
                        />
                        {collaborator.isOnline && (
                          <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-gray-800" />
                        )}
                      </div>
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        {collaborator.name}
                      </span>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      collaborator.isOnline 
                        ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                        : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400'
                    }`}>
                      {collaborator.isOnline ? 'Online' : 'Offline'}
                    </span>
                  </div>
                ))}
              </div>
              
              <Button variant="outline" size="sm" className="w-full mt-4">
                <MessageCircle className="w-4 h-4 mr-2" />
                Open Chat
              </Button>
            </div>

            {/* Quick Actions */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Quick Actions
              </h3>
              
              <div className="space-y-2">
                <Button variant="outline" size="sm" className="w-full justify-start">
                  <Download className="w-4 h-4 mr-2" />
                  Export PDF
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start">
                  <Upload className="w-4 h-4 mr-2" />
                  Import Activities
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start">
                  <Copy className="w-4 h-4 mr-2" />
                  Duplicate Day
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start">
                  <Settings className="w-4 h-4 mr-2" />
                  Preferences
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}