import { useState } from 'react';
import { Sparkles, Copy, CheckCircle } from 'lucide-react';

export default function PromptBuilder() {
  const [level, setLevel] = useState<'plain' | 'easy'>('plain');
  const [includeGlossary, setIncludeGlossary] = useState(true);
  const [useAnchors, setUseAnchors] = useState(true);
  const [activeVoice, setActiveVoice] = useState(true);
  const [copied, setCopied] = useState(false);

  // Core system instructions built dynamically
  const generatePrompt = () => {
    let prompt = `# Role & Objective\n`;
    prompt += `You are an expert accessibility consultant specializing in translating complex text into `;
    prompt += level === 'plain' 
      ? `Plain Language formats (6th to 8th-grade reading level).\n\n` 
      : `Easy Read formats (3rd to 5th-grade reading level).\n\n`;

    prompt += `## Key Principles & Guidelines (from https://github.com/google-labs-code/design.md)\n`;
    prompt += `- Accessibility Standard: Every output must meet WCAG 2.2 AA/AAA standards.\n`;
    prompt += `- Reading level: ${level === 'plain' ? '6th to 8th grade' : '3rd to 5th grade'}\n`;
    prompt += `- Primary Color: #1A1C1E (Solid Navy/Black) for text and core elements.\n`;
    prompt += `- Background Color: #F7F5F2 (Warm Grey) for canvas and containers.\n`;
    prompt += `- Typography: Use Open Sans (Sans-serif) at 16px (1.5 line height) for Plain Language, or 20px (1.8 line height) for Easy Read.\n`;

    if (level === 'plain') {
      prompt += `- Sentences: Use plain language formatting, Use in each paragraph at least 5 to 7 sentences (12-18 words recommended).\n`;
      prompt += `- Voice: Always use Active Voice to show clearly who does what action.\n`;
      prompt += `- Flow: Put the main point of the message at the absolute beginning.\n`;
    } else {
      prompt += `- Layout: Limit content to five short paragraphs/lines per page.\n`;
      prompt += `- Flow: Put exactly one concrete idea on each line.\n`;
      prompt += `- Sentence structure: Avoid any compound phrases; keep words highly literal and avoid metaphors.\n`;
    }

    if (activeVoice) {
      prompt += `- Active Voice constraint: Never use passive voice. Use direct address ("you", "we") instead of "users" or "individuals".\n`;
    }

    if (useAnchors) {
      prompt += `- Visual Anchors: Include explicit markdown bullet points or simple descriptive emojis (ℹ️, 📖, ⚠️) to anchor important concepts visually.\n`;
    }

    if (includeGlossary) {
      prompt += `- Words to Know glossary: If the original text contains unavoidable jargon or complex terms, append a specific glossary definition to clarify meaning directly.\n`;
    }

    prompt += `\n## Inclusive Design Skills (Owl-Listener Framework)\n`;
    prompt += `You are also equipped with the following inclusive utility commands:\n`;
    prompt += `- /check-wcag: Run a technical audit against WCAG 2.2 Level AA/AAA standards.\n`;
    prompt += `- /fix-contrast: Recommend accessible color palettes and contrast ratios.\n`;
    prompt += `- /inclusive-labeling: Suggest ARIA labels and roles for UI components.\n`;
    prompt += `- /alt-text-gen: Create descriptive, equitable alt-text for complex image assets.\n`;
    prompt += `- /cognitive-load: Identify areas of information density and recommend structural simplification.\n`;
    prompt += `- /plain-language: Translate text into a 6th-8th grade reading level.\n`;
    prompt += `- /easy-read: Translate text into a 3rd-5th grade reading level with visual anchors.\n`;
    prompt += `- /inclusive-research: Suggest protocols for including people with disabilities in design testing.\n`;

    prompt += `\n## Output Format\n`;
    prompt += `Return ONLY the translated accessible text following these explicit rules. Do not add metadata, introductions, or extra commentary.`;

    return prompt;
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatePrompt());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-[#1A1C1E] dark:text-white">A11y Prompt Toolkit & System Instructions Builder</h2>
        <p className="text-[#1A1C1E]/70 dark:text-white/70 text-sm mt-1">
          Generate an optimized, standards-compliant prompt to pass into AI models for perfect Plain Language or Easy Read text creation.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Builder Options Panel */}
        <div className="bg-white dark:bg-[#1A1C1E] border border-[#1A1C1E]/10 dark:border-white/10 rounded-xl p-6 flex flex-col justify-between shadow-sm">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-[#1A1C1E] dark:text-white mb-3">
                1. Select Target Translation Format
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setLevel('plain')}
                  className={`p-4 rounded-xl border-2 transition-all text-left flex flex-col ${
                    level === 'plain'
                      ? 'border-[#1A1C1E] dark:border-white bg-[#1A1C1E]/5 dark:bg-white/10 text-[#1A1C1E] dark:text-white ring-2 ring-[#1A1C1E]/5 dark:ring-white/5'
                      : 'border-gray-200 dark:border-white/10 hover:border-gray-300 dark:hover:border-white/30 bg-transparent'
                  }`}
                >
                  <span className="font-bold text-base">Plain Language</span>
                  <span className="text-xs text-gray-500 dark:text-gray-400 mt-1">6th to 8th grade reading level for standard public understanding.</span>
                </button>
                <button
                  onClick={() => setLevel('easy')}
                  className={`p-4 rounded-xl border-2 transition-all text-left flex flex-col ${
                    level === 'easy'
                      ? 'border-amber-500 dark:border-amber-400 bg-amber-50/50 dark:bg-amber-900/20 text-[#1A1C1E] dark:text-white ring-2 ring-amber-500/10'
                      : 'border-gray-200 dark:border-white/10 hover:border-gray-300 dark:hover:border-white/30 bg-transparent'
                  }`}
                >
                  <span className="font-bold text-base">Easy Read</span>
                  <span className="text-xs text-gray-500 dark:text-gray-400 mt-1">3rd to 5th grade level. Literal, structured with one point per line.</span>
                </button>
              </div>
            </div>

            <hr className="border-gray-100 dark:border-white/10" />

            <div>
              <label className="block text-sm font-bold text-[#1A1C1E] dark:text-white mb-3">
                2. Style Constraints & Rules
              </label>
              <div className="space-y-3">
                <label className="flex items-center gap-3 cursor-pointer select-none border border-gray-100 dark:border-white/10 bg-[#F7F5F2]/50 dark:bg-white/5 p-3 rounded-lg hover:bg-[#F7F5F2] dark:hover:bg-white/10 transition-all">
                  <input
                    type="checkbox"
                    checked={activeVoice}
                    onChange={(e) => setActiveVoice(e.target.checked)}
                    className="w-4 h-4 rounded text-[#1A1C1E] dark:text-white focus:ring-[#1A1C1E] dark:focus:ring-white"
                  />
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-[#1A1C1E] dark:text-white">Require Active Voice</span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">Enforce conversational tone and direct wording ("you", "we").</span>
                  </div>
                </label>

                <label className="flex items-center gap-3 cursor-pointer select-none border border-gray-100 dark:border-white/10 bg-[#F7F5F2]/50 dark:bg-white/5 p-3 rounded-lg hover:bg-[#F7F5F2] dark:hover:bg-white/10 transition-all">
                  <input
                    type="checkbox"
                    checked={useAnchors}
                    onChange={(e) => setUseAnchors(e.target.checked)}
                    className="w-4 h-4 rounded text-[#1A1C1E] dark:text-white focus:ring-[#1A1C1E] dark:focus:ring-white"
                  />
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-[#1A1C1E] dark:text-white">Visual Anchors & Markdown Bullets</span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">Use emojis or symbols as pointers for critical information.</span>
                  </div>
                </label>

                <label className="flex items-center gap-3 cursor-pointer select-none border border-gray-100 dark:border-white/10 bg-[#F7F5F2]/50 dark:bg-white/5 p-3 rounded-lg hover:bg-[#F7F5F2] dark:hover:bg-white/10 transition-all">
                  <input
                    type="checkbox"
                    checked={includeGlossary}
                    onChange={(e) => setIncludeGlossary(e.target.checked)}
                    className="w-4 h-4 rounded text-[#1A1C1E] dark:text-white focus:ring-[#1A1C1E] dark:focus:ring-white"
                  />
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-[#1A1C1E] dark:text-white">Append 'Words to Know' Glossary</span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">Include simple definitions for any unavoidable technical terms.</span>
                  </div>
                </label>
              </div>
            </div>
          </div>

          <button
            onClick={handleCopy}
            className="mt-6 px-6 py-3.5 bg-[#1A1C1E] dark:bg-white text-white dark:text-[#1A1C1E] font-bold rounded-xl hover:bg-[#1A1C1E]/90 dark:hover:bg-white/90 transition duration-150 flex items-center justify-center gap-2 w-full shadow-lg dark:shadow-white/5"
          >
            {copied ? <CheckCircle className="h-5 w-5" /> : <Copy className="h-5 w-5" />}
            {copied ? 'Prompt Copied to Clipboard!' : 'Copy System Instructions Prompt'}
          </button>
        </div>

        {/* Live Prompt Preview Output */}
        <div className="bg-white dark:bg-[#1A1C1E] border border-[#1A1C1E]/10 dark:border-white/10 rounded-xl p-6 flex flex-col justify-between h-full shadow-sm">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-bold text-[#1A1C1E] dark:text-white flex items-center gap-2">
                📋 Live Prompt Preview
              </span>
              <button
                onClick={handleCopy}
                className="text-gray-400 dark:text-gray-500 hover:text-[#1A1C1E] dark:hover:text-white text-xs font-semibold flex items-center gap-1 transition-colors"
              >
                {copied ? 'Copied' : 'Copy'}
              </button>
            </div>

            <textarea
              readOnly
              value={generatePrompt()}
              className="w-full h-[400px] p-4 border border-[#1A1C1E]/15 dark:border-white/10 rounded-xl bg-gray-50/50 dark:bg-black/20 font-mono text-sm leading-relaxed select-all resize-none focus:outline-none text-[#1A1C1E] dark:text-white transition-all"
            />
          </div>

          <div className="flex items-center gap-2 text-xs font-medium text-[#1A1C1E]/70 dark:text-white/70 bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 p-3 rounded-xl mt-3 select-none">
            <Sparkles className="h-4 w-4 text-[#1A1C1E] dark:text-white flex-shrink-0" />
            <span>Load these system instructions into any GPT, Claude, or LLM to get standard accessible results.</span>
          </div>
        </div>
      </div>
    </div>
  );
}
