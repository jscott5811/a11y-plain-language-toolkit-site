import { useState } from 'react';
import { EXAMPLES, convertToPlainLanguage, convertToEasyRead } from '../utils/simplifier';
import { Sparkles, Copy, FileText, CheckCircle, Eraser } from 'lucide-react';

export default function TranslationSandbox() {
  const [inputText, setInputText] = useState(EXAMPLES[0].original);
  const [plainOutput, setPlainOutput] = useState(EXAMPLES[0].plain);
  const [easyOutput, setEasyOutput] = useState(EXAMPLES[0].easy);
  const [copied, setCopied] = useState<string | null>(null);

  const loadExample = (ex: typeof EXAMPLES[0]) => {
    setInputText(ex.original);
    setPlainOutput(ex.plain);
    setEasyOutput(ex.easy);
  };

  const handleConvert = () => {
    if (!inputText.trim()) return;
    setPlainOutput(convertToPlainLanguage(inputText));
    setEasyOutput(convertToEasyRead(inputText));
  };

  const handleClear = () => {
    setInputText("");
    setPlainOutput("");
    setEasyOutput("");
  };

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="space-y-8">
      {/* Intro & Presets */}
      <div>
        <h2 className="text-2xl font-bold text-[#1A1C1E] dark:text-white">Translation Sandbox</h2>
        <p className="text-[#1A1C1E]/70 dark:text-white/70 text-sm mt-1 mb-4">
          Convert complex or technical text into Plain Language and Easy Read. Use preset examples below to explore the formatting rules.
        </p>

        <div className="flex flex-wrap gap-2 mb-6">
          {EXAMPLES.map((ex, idx) => (
            <button
              key={idx}
              onClick={() => loadExample(ex)}
              className="px-4 py-2 bg-white dark:bg-[#1A1C1E] text-[#1A1C1E] dark:text-white border border-[#1A1C1E]/20 dark:border-white/20 text-sm rounded-lg hover:bg-[#1A1C1E] dark:hover:bg-white hover:text-white dark:hover:text-[#1A1C1E] transition-all font-medium flex items-center gap-2"
            >
              <FileText className="h-4 w-4" /> {ex.title}
            </button>
          ))}
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Left Side: Input Text */}
        <div className="bg-white dark:bg-[#1A1C1E] border border-[#1A1C1E]/10 dark:border-white/10 rounded-xl p-6 flex flex-col justify-between h-full shadow-sm">
          <div>
            <div className="flex justify-between items-center mb-3">
              <label className="font-bold text-[#1A1C1E] dark:text-white text-sm flex items-center gap-2">
                ✍️ Complex Text (Original)
              </label>
              <button
                onClick={handleClear}
                className="text-gray-400 dark:text-gray-500 hover:text-red-500 dark:hover:text-red-400 text-xs font-semibold flex items-center gap-1 transition-colors"
                title="Clear input text"
              >
                <Eraser className="h-3.5 w-3.5" /> Clear
              </button>
            </div>

            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="w-full h-72 p-4 border border-[#1A1C1E]/15 dark:border-white/10 rounded-xl bg-[#F7F5F2]/20 dark:bg-black/20 font-sans focus:outline-none focus:ring-2 focus:ring-[#1A1C1E]/40 dark:focus:ring-white/40 text-base leading-relaxed resize-none text-[#1A1C1E] dark:text-white transition-all"
              placeholder="Paste or type your complex, jargon-heavy text here..."
            />
          </div>

          <div className="mt-4 flex gap-3">
            <button
              onClick={handleConvert}
              disabled={!inputText.trim()}
              className="flex-1 px-6 py-3.5 bg-[#1A1C1E] dark:bg-white text-white dark:text-[#1A1C1E] font-bold rounded-xl hover:bg-[#1A1C1E]/90 dark:hover:bg-white/90 transition duration-150 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg dark:shadow-white/5"
            >
              <Sparkles className="h-5 w-5" /> Translate Input
            </button>
          </div>
        </div>

        {/* Right Side: Translation Outputs */}
        <div className="space-y-6">
          {/* Plain Language Output */}
          <div className="bg-white dark:bg-[#1A1C1E] border border-[#1A1C1E]/10 dark:border-white/10 rounded-xl p-6 relative shadow-sm">
            <div className="flex justify-between items-center mb-2">
              <div>
                <span className="text-xs font-bold bg-[#1A1C1E]/10 dark:bg-white/10 text-[#1A1C1E] dark:text-white uppercase tracking-wide px-2 py-0.5 rounded">
                  Plain Language (6-8th Grade Target)
                </span>
                <h4 className="font-bold text-lg text-[#1A1C1E] dark:text-white mt-1">Converted Output</h4>
              </div>
              <button
                onClick={() => copyToClipboard(plainOutput, 'plain')}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 text-[#1A1C1E] dark:text-white font-medium text-xs rounded-lg transition-all"
              >
                {copied === 'plain' ? <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-500" /> : <Copy className="h-3.5 w-3.5" />}
                {copied === 'plain' ? 'Copied' : 'Copy'}
              </button>
            </div>

            <textarea
              value={plainOutput}
              onChange={(e) => setPlainOutput(e.target.value)}
              className="w-full min-h-[140px] p-3.5 border border-[#1A1C1E]/15 dark:border-white/10 rounded-xl text-[#1A1C1E] dark:text-white font-sans focus:outline-none focus:ring-2 focus:ring-[#1A1C1E]/40 dark:focus:ring-white/40 text-base leading-normal resize-none bg-transparent"
              placeholder="Plain language text will appear here..."
            />
            <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">
              Focuses on 12-18 words per sentence and active verbs.
            </p>
          </div>

          {/* Easy Read Output */}
          <div className="bg-white dark:bg-[#1A1C1E] border border-[#1A1C1E]/10 dark:border-white/10 rounded-xl p-6 relative shadow-sm">
            <div className="flex justify-between items-center mb-2">
              <div>
                <span className="text-xs font-bold bg-amber-100 dark:bg-amber-900/20 text-amber-900 dark:text-amber-400 border border-amber-300 dark:border-amber-700/50 uppercase tracking-wide px-2 py-0.5 rounded">
                  Easy Read (3-5th Grade Target)
                </span>
                <h4 className="font-bold text-lg text-[#1A1C1E] dark:text-white mt-1">Converted Output</h4>
              </div>
              <button
                onClick={() => copyToClipboard(easyOutput, 'easy')}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 text-[#1A1C1E] dark:text-white font-medium text-xs rounded-lg transition-all"
              >
                {copied === 'easy' ? <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-500" /> : <Copy className="h-3.5 w-3.5" />}
                {copied === 'easy' ? 'Copied' : 'Copy'}
              </button>
            </div>

            <textarea
              value={easyOutput}
              onChange={(e) => setEasyOutput(e.target.value)}
              className="w-full min-h-[160px] p-3.5 border border-[#1A1C1E]/15 dark:border-white/10 rounded-xl text-[#1A1C1E] dark:text-white font-sans focus:outline-none focus:ring-2 focus:ring-[#1A1C1E]/40 dark:focus:ring-white/40 text-lg leading-relaxed font-normal resize-none bg-transparent"
              placeholder="Easy read summary & glossary will appear here..."
              style={{ fontSize: '20px', lineHeight: '1.8' }}
            />
            <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">
              Limits to 5 short visual bullets per section. Adds glossary.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
