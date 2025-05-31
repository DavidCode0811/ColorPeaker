import React, { useState } from 'react';
import { CheckCircle2 } from 'lucide-react';
import { ColorResult } from '../types';
import { contrastColor } from '../utils/colorUtils';

interface ColorDisplayProps {
  colors: ColorResult;
}

const ColorDisplay: React.FC<ColorDisplayProps> = ({ colors }) => {
  const [copiedColor, setCopiedColor] = useState<string | null>(null);
  
  const copyToClipboard = (hex: string) => {
    navigator.clipboard.writeText(hex);
    setCopiedColor(hex);
    setTimeout(() => setCopiedColor(null), 2000);
  };
  
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 mb-8">
      <div className="p-6">
        <h2 className="text-xl font-semibold mb-4">Detected Colors</h2>
        
        {/* Main color */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-medium text-gray-700">Dominant Color</h3>
          </div>
          <div 
            className="h-24 rounded-lg relative mb-2 flex items-center justify-center cursor-pointer transition-transform hover:scale-[1.02] active:scale-[0.98]"
            style={{ backgroundColor: colors.dominant.hex }}
            onClick={() => copyToClipboard(colors.dominant.hex)}
          >
            <span 
              className="font-mono text-lg"
              style={{ color: contrastColor(colors.dominant.hex) }}
            >
              {colors.dominant.hex.toUpperCase()}
              {copiedColor === colors.dominant.hex && (
                <CheckCircle2 className="ml-2 inline-block h-5 w-5" />
              )}
            </span>
          </div>
          <div className="text-sm text-gray-500">
            <span className="font-medium">RGB:</span> {colors.dominant.rgb}
          </div>
        </div>
        
        {/* Palette */}
        <div>
          <h3 className="font-medium text-gray-700 mb-2">Color Palette</h3>
          <div className="grid grid-cols-4 gap-2">
            {colors.palette.map((color, index) => (
              <div 
                key={index}
                className="aspect-square rounded-md cursor-pointer transition-transform hover:scale-110"
                style={{ backgroundColor: color.hex }}
                onClick={() => copyToClipboard(color.hex)}
                title={`${color.hex} (Click to copy)`}
              >
                {copiedColor === color.hex && (
                  <div className="h-full w-full flex items-center justify-center">
                    <CheckCircle2 
                      className="h-6 w-6" 
                      style={{ color: contrastColor(color.hex) }}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ColorDisplay;