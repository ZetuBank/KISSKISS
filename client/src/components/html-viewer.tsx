import React from 'react';
import { ArrowLeft, Home } from 'lucide-react';

interface HtmlViewerProps {
  content: string;
  title: string;
  onBack: () => void;
}

export function HtmlViewer({ content, title, onBack }: HtmlViewerProps) {
  return (
    <div className="p-6">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700">
          <div 
            className="prose prose-lg max-w-none dark:prose-invert p-8"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </div>
      </div>
      
      {/* Back to Home Button */}
      <button 
        onClick={onBack}
        className="fixed bottom-6 right-6 bg-[var(--theme-primary,#6366F1)] text-white p-4 rounded-full shadow-lg hover:opacity-90 transition-opacity z-30"
        data-testid="button-back-home"
      >
        <Home className="w-6 h-6" />
      </button>
    </div>
  );
}
