import React from 'react';
import { 
  ChevronLeft, ChevronRight, Maximize, Minimize, 
  Volume2, VolumeX, Play, Pause, RotateCcw, Info, X 
} from 'lucide-react';

interface VirtualTravelControlsProps {
  isFullscreen: boolean;
  isMuted: boolean;
  isPaused: boolean;
  showInfo: boolean;
  onToggleFullscreen: () => void;
  onToggleMute: () => void;
  onTogglePause: () => void;
  onToggleInfo: () => void;
  onNextLandmark: () => void;
  onPrevLandmark: () => void;
  onReset: () => void;
  onExit: () => void;
}

export function VirtualTravelControls({
  isFullscreen,
  isMuted,
  isPaused,
  showInfo,
  onToggleFullscreen,
  onToggleMute,
  onTogglePause,
  onToggleInfo,
  onNextLandmark,
  onPrevLandmark,
  onReset,
  onExit
}: VirtualTravelControlsProps) {
  return (
    <>
      {/* Top Bar */}
      <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-center">
        <button 
          onClick={onExit}
          className="flex items-center space-x-2 text-white bg-black/50 backdrop-blur-sm px-4 py-2 rounded-lg"
        >
          <X className="w-5 h-5" />
          <span>Exit Tour</span>
        </button>
        
        <button 
          onClick={onToggleInfo}
          className="text-white bg-black/50 backdrop-blur-sm px-4 py-2 rounded-lg"
        >
          <Info className="w-5 h-5" />
          <span className="ml-2">{showInfo ? 'Hide Info' : 'Show Info'}</span>
        </button>
      </div>

      {/* Bottom Controls */}
      <div className="absolute bottom-0 left-0 right-0 p-4 flex justify-between items-center">
        <div className="flex space-x-4">
          <button 
            onClick={onToggleMute}
            className="text-white bg-black/50 hover:bg-black/70 backdrop-blur-sm p-3 rounded-full transition-colors"
          >
            {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
          </button>
          
          <button 
            onClick={onTogglePause}
            className="text-white bg-black/50 hover:bg-black/70 backdrop-blur-sm p-3 rounded-full transition-colors"
          >
            {isPaused ? <Play className="w-5 h-5" /> : <Pause className="w-5 h-5" />}
          </button>
          
          <button 
            onClick={onReset}
            className="text-white bg-black/50 hover:bg-black/70 backdrop-blur-sm p-3 rounded-full transition-colors"
          >
            <RotateCcw className="w-5 h-5" />
          </button>
        </div>
        
        <div className="flex space-x-4">
          <button 
            onClick={onPrevLandmark}
            className="text-white bg-black/50 hover:bg-black/70 backdrop-blur-sm p-3 rounded-full transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          
          <button 
            onClick={onNextLandmark}
            className="text-white bg-black/50 hover:bg-black/70 backdrop-blur-sm p-3 rounded-full transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
          
          <button 
            onClick={onToggleFullscreen}
            className="text-white bg-black/50 hover:bg-black/70 backdrop-blur-sm p-3 rounded-full transition-colors"
          >
            {isFullscreen ? <Minimize className="w-5 h-5" /> : <Maximize className="w-5 h-5" />}
          </button>
        </div>
      </div>
    </>
  );
}