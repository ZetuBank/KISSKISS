import React from 'react';
import { Shield } from 'lucide-react';

export function Loader() {
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-[var(--theme-primary,#6366F1)] to-[var(--theme-secondary,#10B981)] flex items-center justify-center z-50">
      <div className="text-center text-white">
        <div className="mb-8">
          <h1 className="text-6xl font-bold mb-4 animate-pulse">KISS</h1>
          <p className="text-xl font-light opacity-90">Keep It Simple & Secure</p>
        </div>
        
        {/* Beautiful Unique Loader */}
        <div className="relative w-32 h-32 mx-auto mb-8">
          <div className="absolute inset-0 border-4 border-white/20 rounded-full"></div>
          <div className="absolute inset-0 border-4 border-transparent border-t-white rounded-full animate-spin"></div>
          <div className="absolute inset-2 border-4 border-white/20 rounded-full"></div>
          <div className="absolute inset-2 border-4 border-transparent border-r-white rounded-full animate-spin duration-2000"></div>
          <div className="absolute inset-4 border-4 border-white/20 rounded-full"></div>
          <div className="absolute inset-4 border-4 border-transparent border-b-white rounded-full animate-bounce duration-2000"></div>
          <div className="absolute inset-6 bg-white/10 rounded-full flex items-center justify-center">
            <Shield className="text-white text-2xl animate-pulse" />
          </div>
        </div>
        
        <div className="flex justify-center space-x-2">
          <div className="w-3 h-3 bg-white/70 rounded-full animate-bounce"></div>
          <div className="w-3 h-3 bg-white/70 rounded-full animate-bounce [animation-delay:0.1s]"></div>
          <div className="w-3 h-3 bg-white/70 rounded-full animate-bounce [animation-delay:0.2s]"></div>
        </div>
        
        <p className="mt-6 text-sm opacity-75">Securing your content experience...</p>
      </div>
    </div>
  );
}
