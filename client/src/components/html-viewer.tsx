import React from 'react';
import { ArrowLeft, Home } from 'lucide-react';

interface HtmlViewerProps {
  content: string;
  title: string;
  onBack: () => void;
}

export function HtmlViewer({ content, title, onBack }: HtmlViewerProps) {
  // Process content to make navigation buttons work
  const processedContent = React.useMemo(() => {
    let processed = content;
    
    // Replace all window.parent.loadHTMLContent calls with data attributes and click handlers
    processed = processed.replace(
      /onclick="window\.parent\.loadHTMLContent\('([^']+)'\)"/g,
      'data-load-content="$1" onclick="handleContentLoad(this)"'
    );
    
    // Replace window.parent.showWelcome calls
    processed = processed.replace(
      /onclick="window\.parent\.showWelcome\(\)"/g,
      'data-show-welcome="true" onclick="handleShowWelcome()"'
    );
    
    // Add navigation script
    processed += `
      <script>
        function handleContentLoad(element) {
          const contentId = element.getAttribute('data-load-content');
          if (contentId) {
            window.parent.postMessage({ type: 'loadContent', contentId: contentId }, '*');
          }
        }
        
        function handleShowWelcome() {
          window.parent.postMessage({ type: 'showWelcome' }, '*');
        }
        
        // Apply parent theme
        function syncTheme() {
          try {
            const parentDoc = window.parent.document;
            const parentTheme = parentDoc.documentElement.className;
            document.documentElement.className = parentTheme;
            
            // Copy theme variables
            const parentStyles = window.parent.getComputedStyle(parentDoc.documentElement);
            const root = document.documentElement.style;
            root.setProperty('--theme-primary', parentStyles.getPropertyValue('--theme-primary'));
            root.setProperty('--theme-secondary', parentStyles.getPropertyValue('--theme-secondary'));
          } catch (e) {
            console.log('Theme sync not available');
          }
        }
        
        // Sync theme on load and listen for changes
        document.addEventListener('DOMContentLoaded', syncTheme);
        window.addEventListener('message', function(event) {
          if (event.data.type === 'themeChange') {
            syncTheme();
          }
        });
      </script>
    `;
    
    return processed;
  }, [content]);

  React.useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data.type === 'loadContent') {
        window.dispatchEvent(new CustomEvent('loadHTMLContent', { detail: event.data.contentId }));
      } else if (event.data.type === 'showWelcome') {
        onBack();
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [onBack]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-2 md:p-4">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white dark:bg-slate-800 rounded-lg md:rounded-xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700">
          <div 
            className="prose prose-lg max-w-none dark:prose-invert p-4 md:p-8 html-content"
            dangerouslySetInnerHTML={{ __html: processedContent }}
          />
        </div>
      </div>
      
      {/* Back to Home Button */}
      <button 
        onClick={onBack}
        className="fixed bottom-4 right-4 md:bottom-6 md:right-6 bg-[var(--theme-primary,#6366F1)] text-white p-3 md:p-4 rounded-full shadow-lg hover:opacity-90 transition-opacity z-30 touch-manipulation"
        data-testid="button-back-home"
        style={{ minHeight: '44px', minWidth: '44px' }}
      >
        <Home className="w-5 h-5 md:w-6 md:h-6" />
      </button>
    </div>
  );
}
