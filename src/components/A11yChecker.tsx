import { useState } from 'react';
import { analyzeText, JARGON_MAP } from '../utils/simplifier';
import { AlertTriangle, CheckCircle, FileText, BookOpen } from 'lucide-react';

export default function A11yChecker() {
  const [text, setText] = useState(
    "To facilitate high contrast and readable text, we endeavor to utilize standard fonts like Open Sans. Subsequent to reading this, you are requested to check the full documentation and implement any additional modifications as required by local parameters. Retaining optimal accessibility is mandatory."
  );

  const stats = analyzeText(text);

  // Divide input text into distinct sentences to check sentence lengths individually
  const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-[#1A1C1E] dark:text-white">Accessibility & Readability Checker</h2>
        <p className="text-[#1A1C1E]/70 dark:text-white/70 text-sm mt-1">
          Validate your markdown or plain text to ensure it adheres to line lengths, word counts, and direct active wording.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Input Text Box */}
        <div className="lg:col-span-2 bg-white dark:bg-[#1A1C1E] border border-[#1A1C1E]/10 dark:border-white/10 rounded-xl p-6 flex flex-col justify-between h-full shadow-sm">
          <div>
            <label className="block text-sm font-bold text-[#1A1C1E] dark:text-white mb-3 flex items-center gap-2">
              📝 Evaluation Input
            </label>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="w-full h-80 p-4 border border-[#1A1C1E]/15 dark:border-white/10 rounded-xl bg-[#F7F5F2]/20 dark:bg-black/20 font-sans focus:outline-none focus:ring-2 focus:ring-[#1A1C1E]/40 dark:focus:ring-white/40 text-base leading-relaxed resize-none text-[#1A1C1E] dark:text-white transition-all"
              placeholder="Paste any markdown or text to run automated accessibility checks..."
            />
          </div>

          <p className="text-xs text-gray-500 dark:text-gray-400 mt-3 font-medium">
            * Uses 18 words per sentence as the upper limit for Plain Language, and 12 words for Easy Read.
          </p>
        </div>

        {/* Dynamic Summary Panel */}
        <div className="space-y-6">
          {/* Flesch Score/Grade Card */}
          <div className="bg-white dark:bg-[#1A1C1E] border border-[#1A1C1E]/10 dark:border-white/10 rounded-xl p-6 shadow-sm">
            <h3 className="font-bold text-[#1A1C1E] dark:text-white text-sm uppercase tracking-wide flex items-center gap-2 mb-4">
              <FileText className="h-4 w-4 text-[#1A1C1E] dark:text-white" /> Comprehension Level
            </h3>
            <div className="flex items-baseline justify-between mb-2">
              <span className="text-sm font-medium text-[#1A1C1E]/80 dark:text-white/80">Estimated Level:</span>
              <span className="text-lg font-extrabold text-[#1A1C1E] dark:text-white bg-[#1A1C1E]/5 dark:bg-white/10 px-2.5 py-0.5 rounded">
                {stats.gradeLevel}
              </span>
            </div>
            <div className="flex items-baseline justify-between">
              <span className="text-sm font-medium text-[#1A1C1E]/80 dark:text-white/80">Flesch Reading Ease:</span>
              <span className="text-lg font-extrabold text-[#1A1C1E] dark:text-white">
                {stats.fleschScore}/100
              </span>
            </div>
            <div className="w-full bg-gray-100 dark:bg-white/10 h-2.5 rounded-full mt-4 overflow-hidden">
              <div 
                className="bg-[#1A1C1E] dark:bg-white h-2.5 transition-all duration-500" 
                style={{ width: `${stats.fleschScore}%` }}
              />
            </div>
          </div>

          {/* Core Word stats */}
          <div className="bg-white dark:bg-[#1A1C1E] border border-[#1A1C1E]/10 dark:border-white/10 rounded-xl p-6 shadow-sm">
            <h3 className="font-bold text-[#1A1C1E] dark:text-white text-sm uppercase tracking-wide flex items-center gap-2 mb-4">
              <BookOpen className="h-4 w-4 text-[#1A1C1E] dark:text-white" /> Writing Metrics
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-[#F7F5F2]/50 dark:bg-white/5 p-3.5 rounded-lg border border-gray-100 dark:border-white/10 flex flex-col justify-between">
                <span className="text-xs font-semibold text-[#1A1C1E]/60 dark:text-white/60 uppercase">Total Words</span>
                <span className="text-2xl font-bold text-[#1A1C1E] dark:text-white mt-1">{stats.wordCount}</span>
              </div>
              <div className="bg-[#F7F5F2]/50 dark:bg-white/5 p-3.5 rounded-lg border border-gray-100 dark:border-white/10 flex flex-col justify-between">
                <span className="text-xs font-semibold text-[#1A1C1E]/60 dark:text-white/60 uppercase">Avg Words/Sent</span>
                <span className="text-2xl font-bold text-[#1A1C1E] dark:text-white mt-1">{stats.avgSentenceLength}</span>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-100 dark:border-white/10 space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Total Sentences</span>
                <span className="font-bold text-[#1A1C1E] dark:text-white">{stats.sentenceCount}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Sentences &gt; 18 words</span>
                <span className={`font-bold ${stats.longSentences > 0 ? 'text-amber-600 dark:text-amber-400' : 'text-green-600 dark:text-green-400'}`}>
                  {stats.longSentences}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Break Down of Details: Specific Suggestions & Errors */}
      <div className="grid md:grid-cols-2 gap-8">
        {/* Jargon Words Found */}
        <div className="bg-white dark:bg-[#1A1C1E] border border-[#1A1C1E]/10 dark:border-white/10 rounded-xl p-6 shadow-sm">
          <h3 className="font-bold text-[#1A1C1E] dark:text-white text-lg flex items-center gap-2 mb-4">
            🔍 Detected Jargon Terms ({stats.hardWordsFound.length})
          </h3>
          {stats.hardWordsFound.length === 0 ? (
            <div className="flex items-center gap-2 text-green-700 dark:text-green-400 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 p-4 rounded-xl">
              <CheckCircle className="h-5 w-5 flex-shrink-0" />
              <p className="text-sm font-medium">Excellent work! No complex jargon words found.</p>
            </div>
          ) : (
            <div className="space-y-3 overflow-y-auto max-h-64 pr-2">
              <p className="text-xs text-gray-500 dark:text-gray-400 font-medium mb-3">
                Replace these complex words with direct and friendly equivalents.
              </p>
              {stats.hardWordsFound.map((hw, idx) => (
                <div key={idx} className="flex items-center justify-between p-3.5 bg-amber-50/40 dark:bg-amber-900/20 border border-amber-200/50 dark:border-amber-800/50 rounded-xl">
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-[#1A1C1E] dark:text-white capitalize">{hw}</span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">Complex Jargon Word</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-400 font-medium select-none">→ Replace with →</span>
                    <span className="text-sm font-bold text-green-700 dark:text-green-400 bg-green-100 dark:bg-green-900/40 px-2 py-0.5 border border-green-200 dark:border-green-800 rounded">
                      {JARGON_MAP[hw]}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Sentence Level Breakdown */}
        <div className="bg-white dark:bg-[#1A1C1E] border border-[#1A1C1E]/10 dark:border-white/10 rounded-xl p-6 flex flex-col justify-between shadow-sm">
          <div>
            <h3 className="font-bold text-[#1A1C1E] dark:text-white text-lg flex items-center gap-2 mb-4">
              📏 Sentence Length Breakdown
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 font-medium mb-4">
              Every sentence in your content. Avoid exceeding the 18-word limit.
            </p>
            <div className="space-y-3 max-h-60 overflow-y-auto pr-2">
              {sentences.map((sent, idx) => {
                const wordsInSent = sent.trim().split(/\s+/).length;
                const isTooLong = wordsInSent > 18;

                return (
                  <div
                    key={idx}
                    className={`p-3 rounded-xl border text-sm leading-relaxed flex flex-col gap-1.5 transition-all ${
                      isTooLong
                        ? 'border-amber-300 dark:border-amber-700 bg-amber-50/50 dark:bg-amber-900/10 text-[#1A1C1E] dark:text-white/90 shadow-sm'
                        : 'border-green-100 dark:border-green-900/30 bg-green-50/30 dark:bg-green-900/5 text-[#1A1C1E]/90 dark:text-white/80'
                    }`}
                  >
                    <div className="flex justify-between items-center select-none">
                      <span className="text-xs font-bold text-gray-400 dark:text-gray-500">Sentence {idx + 1}</span>
                      <span
                        className={`text-xs font-bold px-2 py-0.5 rounded border ${
                          isTooLong
                            ? 'bg-amber-100 dark:bg-amber-900/40 text-amber-900 dark:text-amber-400 border-amber-200 dark:border-amber-700/50'
                            : 'bg-green-100 dark:bg-green-900/40 text-green-900 dark:text-green-400 border-green-200 dark:border-green-800/50'
                        }`}
                      >
                        {wordsInSent} {wordsInSent === 1 ? 'word' : 'words'}
                      </span>
                    </div>
                    <p className="font-medium">{sent.trim()}.</p>
                    {isTooLong && (
                      <div className="flex items-center gap-1.5 text-xs text-amber-800 dark:text-amber-400 font-bold mt-1">
                        <AlertTriangle className="h-3.5 w-3.5" /> Consider breaking into two distinct sentences.
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
