import React from 'react';
import { Palette } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="flex items-center justify-center mb-12">
      <div className="flex items-center space-x-3">
        <Palette className="h-8 w-8 text-indigo-600" />
        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-violet-500">
          ChromaVox
        </h1>
      </div>
    </header>
  );
};

export default Header;