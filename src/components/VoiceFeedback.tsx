import React, { useEffect, useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { ColorResult } from '../types';
import { getNearestColorName } from '../utils/colorUtils';

interface VoiceFeedbackProps {
  colors: ColorResult;
}

const VoiceFeedback: React.FC<VoiceFeedbackProps> = ({ colors }) => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [muted, setMuted] = useState(false);
  
  const speakColor = () => {
    if (muted || !colors || !window.speechSynthesis) return;
    
    // Get the color name
    const colorName = getNearestColorName(colors.dominant.hex);
    
    // Create and configure utterance
    const utterance = new SpeechSynthesisUtterance();
    utterance.text = `The dominant color is ${colorName}`;
    utterance.rate = 1;
    utterance.pitch = 1;
    utterance.volume = 1;
    
    // Handle events
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    
    // Speak
    window.speechSynthesis.cancel(); // Cancel any ongoing speech
    window.speechSynthesis.speak(utterance);
  };
  
  useEffect(() => {
    if (colors && !muted) {
      speakColor();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [colors, muted]);
  
  const toggleMute = () => {
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
    setMuted(!muted);
  };
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Voice Feedback</h2>
        <button 
          onClick={toggleMute}
          className="p-2 rounded-full hover:bg-gray-100 transition-colors"
          title={muted ? 'Unmute' : 'Mute'}
        >
          {muted ? (
            <VolumeX className="h-6 w-6 text-gray-500" />
          ) : (
            <Volume2 className="h-6 w-6 text-indigo-600" />
          )}
        </button>
      </div>
      
      <div className="mt-4">
        {isSpeaking ? (
          <div className="flex items-center">
            <div className="relative h-4 w-4 mr-3">
              <span className="absolute animate-ping inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-4 w-4 bg-indigo-600"></span>
            </div>
            <p>Speaking...</p>
          </div>
        ) : (
          <div className="flex flex-col">
            <p className="text-gray-700">
              {muted 
                ? "Voice feedback is muted" 
                : "Click the play button to hear the color description"}
            </p>
            
            {!muted && (
              <button 
                onClick={speakColor}
                className="mt-3 flex items-center justify-center py-2 px-4 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition-colors w-fit"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                </svg>
                Play Color
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default VoiceFeedback;