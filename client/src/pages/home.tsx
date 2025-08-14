import React, { useState, useEffect } from 'react';
import { Shield, BookOpen, Image, Settings, Check, Lock } from 'lucide-react';
import { useTheme } from '@/components/theme-provider';
import { themes } from '@/lib/themes';
import { Loader } from '@/components/loader';
import { HtmlViewer } from '@/components/html-viewer';
import { apiRequest } from '@/lib/queryClient';

export default function Home() {
  const { currentTheme, setTheme } = useTheme();
  const [isLoading, setIsLoading] = useState(true);
  const [currentContent, setCurrentContent] = useState<{ id: string; title: string; content: string } | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const loadHTMLContent = async (contentId: string) => {
    try {
      const response = await apiRequest('GET', `/api/html-content/${contentId}`);
      const data = await response.json();
      setCurrentContent(data);
    } catch (error) {
      console.error('Failed to load content:', error);
    }
  };

  const showWelcome = () => {
    setCurrentContent(null);
  };

  if (isLoading) {
    return <Loader />;
  }

  if (currentContent) {
    return (
      <HtmlViewer
        content={currentContent.content}
        title={currentContent.title}
        onBack={showWelcome}
      />
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors duration-300">
      {/* Theme Controls */}
      <div className="fixed top-6 right-6 z-40">
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-2 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-2">
            <select 
              value={currentTheme.id}
              onChange={(e) => setTheme(e.target.value)}
              className="bg-transparent text-sm font-medium text-gray-700 dark:text-gray-300 border-none outline-none cursor-pointer"
              data-testid="select-theme"
            >
              {themes.map(theme => (
                <option key={theme.id} value={theme.id}>
                  {theme.emoji} {theme.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* App Header */}
      <header className="bg-white dark:bg-slate-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-[var(--theme-primary,#6366F1)] to-[var(--theme-secondary,#10B981)] rounded-lg flex items-center justify-center">
                <Shield className="text-white w-5 h-5" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">KISS</h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">Secure HTML Viewer</p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
              <Lock className="w-4 h-4 text-green-500" />
              <span>Secure Mode Active</span>
            </div>
          </div>
        </div>
      </header>

      {/* Content Area */}
      <main className="p-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Welcome to KISS
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Your secure HTML content viewer. Navigate through your content safely without exposing direct URLs or compromising security.
            </p>
          </div>

          {/* Demo Navigation Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            <div 
              className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-shadow cursor-pointer"
              onClick={() => loadHTMLContent('sample-flipbook')}
              data-testid="card-flipbook"
            >
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="text-blue-600 dark:text-blue-400 w-8 h-8" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Interactive Flipbook</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">Experience embedded Heyzine flipbook content</p>
                <button className="bg-[var(--theme-primary,#6366F1)] text-white px-4 py-2 rounded-lg font-medium hover:opacity-90 transition-opacity">
                  View Content
                </button>
              </div>
            </div>

            <div 
              className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-shadow cursor-pointer"
              onClick={() => loadHTMLContent('media-gallery')}
              data-testid="card-gallery"
            >
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Image className="text-green-600 dark:text-green-400 w-8 h-8" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Media Gallery</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">View images and videos from external sources</p>
                <button className="bg-[var(--theme-secondary,#10B981)] text-white px-4 py-2 rounded-lg font-medium hover:opacity-90 transition-opacity">
                  View Gallery
                </button>
              </div>
            </div>

            <div 
              className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-shadow cursor-pointer"
              onClick={() => loadHTMLContent('interactive-demo')}
              data-testid="card-demo"
            >
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Settings className="text-purple-600 dark:text-purple-400 w-8 h-8" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Interactive Demo</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">Test interactive HTML components</p>
                <button className="bg-purple-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-purple-700 transition-colors">
                  Try Demo
                </button>
              </div>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white dark:bg-slate-800 rounded-xl p-8 border border-gray-200 dark:border-gray-700">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">🔐 Secure Viewing</h3>
              <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                <li className="flex items-center"><Check className="w-4 h-4 text-green-500 mr-2" /> No direct URL exposure</li>
                <li className="flex items-center"><Check className="w-4 h-4 text-green-500 mr-2" /> Protected content access</li>
                <li className="flex items-center"><Check className="w-4 h-4 text-green-500 mr-2" /> Safe external resource loading</li>
                <li className="flex items-center"><Check className="w-4 h-4 text-green-500 mr-2" /> Anti-manipulation measures</li>
              </ul>
            </div>
            
            <div className="bg-white dark:bg-slate-800 rounded-xl p-8 border border-gray-200 dark:border-gray-700">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">🎨 Customization</h3>
              <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                <li className="flex items-center"><Check className="w-4 h-4 text-green-500 mr-2" /> Multiple theme options</li>
                <li className="flex items-center"><Check className="w-4 h-4 text-green-500 mr-2" /> Dark/Light mode support</li>
                <li className="flex items-center"><Check className="w-4 h-4 text-green-500 mr-2" /> Responsive design</li>
                <li className="flex items-center"><Check className="w-4 h-4 text-green-500 mr-2" /> Persistent preferences</li>
              </ul>
            </div>
          </div>

          {/* Instructions */}
          <div className="bg-gradient-to-r from-[var(--theme-primary,#6366F1)]/10 to-[var(--theme-secondary,#10B981)]/10 rounded-xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">📋 How to Use</h3>
            <div className="grid md:grid-cols-2 gap-6 text-gray-700 dark:text-gray-300">
              <div>
                <h4 className="font-semibold mb-2">1. Replace Sample Content</h4>
                <p className="text-sm">Replace the sample HTML content with your own self-contained HTML files.</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">2. Navigation Setup</h4>
                <p className="text-sm">Ensure your HTML files use the appropriate navigation functions.</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">3. External Resources</h4>
                <p className="text-sm">Your Heyzine flipbooks and Glitch media will load seamlessly within the app.</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">4. Theme Customization</h4>
                <p className="text-sm">Users can switch themes using the controls in the top-right corner.</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
