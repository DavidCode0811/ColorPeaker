import React, { useCallback, useState } from 'react';
import { Upload } from 'lucide-react';

interface ImageUploaderProps {
  onUpload: (file: File) => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onUpload }) => {
  const [isDragging, setIsDragging] = useState(false);
  
  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);
  
  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);
  
  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type.startsWith('image/')) {
        onUpload(file);
      }
    }
  }, [onUpload]);
  
  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onUpload(e.target.files[0]);
    }
  }, [onUpload]);

  return (
    <div 
      className={`p-8 border-2 border-dashed rounded-lg transition-all duration-200 ${
        isDragging 
          ? 'border-indigo-500 bg-indigo-50' 
          : 'border-gray-300 bg-white hover:border-indigo-400 hover:bg-indigo-50/50'
      }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <div className="flex flex-col items-center justify-center py-12">
        <Upload className="w-16 h-16 text-indigo-500 mb-4" />
        
        <h2 className="text-xl font-semibold text-gray-700 mb-2">
          Upload an image
        </h2>
        
        <p className="text-gray-500 text-center mb-6">
          Drag and drop your image here, or click to browse
        </p>
        
        <label className="inline-flex items-center px-6 py-3 bg-indigo-600 text-white rounded-lg cursor-pointer hover:bg-indigo-700 transition-colors">
          Select Image
          <input 
            type="file" 
            className="hidden" 
            accept="image/*" 
            onChange={handleFileChange}
          />
        </label>
        
        <p className="mt-4 text-sm text-gray-500">
          Supported formats: JPG, PNG, GIF, WEBP
        </p>
      </div>
    </div>
  );
};

export default ImageUploader;