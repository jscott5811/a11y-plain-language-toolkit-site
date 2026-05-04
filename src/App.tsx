import { useState, useEffect } from 'react';
import ToolkitOverview from './components/ToolkitOverview';
import TranslationSandbox from './components/TranslationSandbox';
import A11yChecker from './components/A11yChecker';
import PromptBuilder from './components/PromptBuilder';
import InclusiveSkills from './components/InclusiveSkills';
import InclusiveTools from './components/InclusiveTools';
import { Eye, FileText, CheckSquare, Sparkles, Sun, Moon, Book, Wrench } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'overview' | 'sandbox' | 'checker' | 'prompt' | 'skills' | 'tools'>('overview');
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Determine initial theme
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialDarkMode = savedTheme === 'dark' || (!savedTheme && systemPrefersDark);
    
    setIsDarkMode(initialDarkMode);
  }, []);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  const tabs = [
    {
      id: 'overview',
      label: 'Guidelines & Overview',
      icon: Eye,
      desc: 'Style guide, Do\'s/Don\'ts & typography definitions'
    },
    {
      id: 'tools',
      label: 'Inclusive Toolkit',
      icon: Wrench,
      desc: 'Audit, Visual, ARIA & Protocol generators'
    },
    {
      id: 'sandbox',
      label: 'Translation Sandbox',
      icon: Sparkles,
      desc: 'Translate original text to Plain or Easy Read'
    },
    {
      id: 'checker',
      label: 'Readability Checker',
      icon: CheckSquare,
      desc: 'Verify word counts, jargon, sentence lengths'
    },
    {
      id: 'prompt',
      label: 'Prompt Builder',
      icon: FileText,
      desc: 'Generate custom AI system prompts'
    },
    {
      id: 'skills',
      label: 'Skills Library',
      icon: Book,
      desc: '50+ specialized accessibility commands'
    }
  ] as const;

  return (
    <div className="min-h-screen bg-[#F7F5F2] dark:bg-[#0f1113] font-sans antialiased text-[#1A1C1E] dark:text-[#E2E8F0] flex flex-col justify-between transition-colors duration-300">
      {/* Navigation Header */}
      <div>
        <header className="bg-white dark:bg-[#1A1C1E] border-b border-[#1A1C1E]/10 dark:border-white/10 select-none">
          <div className="max-w-6xl mx-auto px-6 py-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center space-x-3.5">
              <div className="p-3 bg-[#1A1C1E] dark:bg-white text-white dark:text-[#1A1C1E] rounded-xl shadow-md">
                <Eye className="h-7 w-7" />
              </div>
              <div>
                <h1 className="text-2xl font-black tracking-tight text-[#1A1C1E] dark:text-white">
                  A11y & Plain Language Toolkit
                </h1>
                <p className="text-sm font-medium text-[#1A1C1E]/60 dark:text-white/60">
                  Converting complex writing into accessible reader-first formats
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-2 mr-2">
                <button
                  onClick={() => setIsDarkMode(prev => !prev)}
                  className="p-2.5 rounded-xl border-2 border-gray-200/80 dark:border-white/10 bg-white dark:bg-white/5 hover:border-gray-300 dark:hover:border-white/20 transition-all text-[#1A1C1E] dark:text-white"
                  title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
                >
                  {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                </button>
              </div>
              <span className="text-xs font-bold bg-[#1A1C1E]/5 dark:bg-white/10 text-[#1A1C1E] dark:text-white border border-[#1A1C1E]/15 dark:border-white/15 rounded-full px-3 py-1 uppercase tracking-wide">
                Version Alpha
              </span>
              <span className="text-xs font-bold bg-amber-50 dark:bg-amber-900/20 text-amber-900 dark:text-amber-400 border border-amber-200/60 dark:border-amber-700/60 rounded-full px-3 py-1 uppercase tracking-wide">
                WCAG 2.2 Ready
              </span>
            </div>
          </div>
        </header>

        {/* Dynamic Tab Switchers */}
        <div className="max-w-6xl mx-auto px-6 py-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`p-4 rounded-xl border-2 text-left transition-all flex items-start gap-4 hover:shadow-sm ${
                    isActive
                      ? 'bg-white dark:bg-[#1A1C1E] border-[#1A1C1E] dark:border-white ring-4 ring-[#1A1C1E]/5 dark:ring-white/5'
                      : 'bg-[#F7F5F2] dark:bg-[#1A1C1E]/40 border-gray-200/80 dark:border-white/5 hover:bg-white dark:hover:bg-[#1A1C1E]/60 hover:border-gray-300 dark:hover:border-white/20'
                  }`}
                >
                  <div
                    className={`p-2.5 rounded-lg border transition-all ${
                      isActive
                        ? 'bg-[#1A1C1E] dark:bg-white text-white dark:text-[#1A1C1E] border-[#1A1C1E] dark:border-white'
                        : 'bg-white dark:bg-black/20 border-gray-200 dark:border-white/10 text-[#1A1C1E]/60 dark:text-white/40'
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3
                      className={`font-bold text-sm select-none ${
                        isActive ? 'text-[#1A1C1E] dark:text-white' : 'text-[#1A1C1E]/80 dark:text-white/80'
                      }`}
                    >
                      {tab.label}
                    </h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400 font-medium mt-1 select-none">
                      {tab.desc}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Tab Panel */}
          <main className="mt-10 mb-16 bg-white/50 dark:bg-black/20 rounded-2xl p-0 md:p-4">
            {activeTab === 'overview' && <ToolkitOverview />}
            {activeTab === 'tools' && <InclusiveTools />}
            {activeTab === 'sandbox' && <TranslationSandbox />}
            {activeTab === 'checker' && <A11yChecker />}
            {activeTab === 'prompt' && <PromptBuilder />}
            {activeTab === 'skills' && <InclusiveSkills />}
          </main>
        </div>
      </div>

      {/* Accessible Soft Footer */}
      <footer className="border-t border-[#1A1C1E]/10 dark:border-white/10 bg-white dark:bg-[#1A1C1E] py-6">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-semibold text-[#1A1C1E]/60 dark:text-white/60">
          <p>© 2026 Accessibility and Plain Language Prompt Toolkit. Open Source & Reader Centered.</p>
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5 select-none text-[#1A1C1E]/80 dark:text-white/80">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span> Open Sans Font Active
            </span>
            <span className="select-none text-[#1A1C1E]/80 dark:text-white/80">High Contrast Target: Level AA/AAA</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
