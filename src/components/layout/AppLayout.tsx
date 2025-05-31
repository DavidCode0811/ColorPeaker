import React, { ReactNode } from 'react';
import Header from './Header';

interface AppLayoutProps {
  children: ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-5xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <Header />
        <main>{children}</main>
      </div>
    </div>
  );
};

export default AppLayout;