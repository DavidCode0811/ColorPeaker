import React, { useState } from 'react';
import ImageUploader from './ImageUploader';
import ColorDisplay from './ColorDisplay';
import VoiceFeedback from './VoiceFeedback';
import { detectColors } from '../utils/colorDetection';
import { ColorResult } from '../types';

const ColorDetector: React.FC = () => {
  const [image, setImage] = useState<string | null>(null);
  const [colors, setColors] = useState<ColorResult | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleImageUpload = async (file: File) => {
    try {
      setError(null);
      setIsProcessing(true);
      
      // Create image URL for preview
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
      
      // Process image to detect colors
      const detectedColors = await detectColors(file);
      setColors(detectedColors);
      
      setIsProcessing(false);
    } catch (err) {
      setIsProcessing(false);
      setError('Failed to process image. Please try again.');
      console.error(err);
    }
  };

  const resetState = () => {
    if (image) {
      URL.revokeObjectURL(image);
    }
    setImage(null);
    setColors(null);
    setError(null);
  };

  return (
    <div className="flex flex-col items-center">
      <div className="w-full max-w-2xl">
        {!image ? (
          <ImageUploader onUpload={handleImageUpload} />
        ) : (
          <div className="animate-fade-in">
            <div className="relative mb-6 rounded-lg overflow-hidden bg-white shadow-md">
              <img 
                src={image} 
                alt="Uploaded" 
                className="w-full h-auto object-contain max-h-[400px]" 
              />
              <button 
                onClick={resetState}
                className="absolute top-4 right-4 bg-white/80 backdrop-blur-sm p-2 rounded-full hover:bg-white transition-colors"
                aria-label="Upload new image"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>

            {isProcessing ? (
              <div className="flex flex-col items-center justify-center p-8 bg-white rounded-lg shadow-md">
                <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mb-4"></div>
                <p className="text-gray-600">Analyzing image colors...</p>
              </div>
            ) : colors ? (
              <>
                <ColorDisplay colors={colors} />
                <VoiceFeedback colors={colors} />
              </>
            ) : null}

            {error && (
              <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-md text-red-600">
                {error}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ColorDetector;