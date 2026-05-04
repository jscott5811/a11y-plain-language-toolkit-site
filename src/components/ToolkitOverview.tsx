import { CheckCircle, XCircle, FileText, Layers, Type, Eye, Sparkles } from 'lucide-react';

export default function ToolkitOverview() {
  return (
    <div className="space-y-10">
      {/* Intro Header */}
      <div className="border-l-4 border-[#1A1C1E] dark:border-white pl-6 py-2">
        <h2 className="text-3xl font-bold tracking-tight text-[#1A1C1E] dark:text-white">
          Accessibility & Plain Language System
        </h2>
        <p className="mt-2 text-[#1A1C1E]/80 dark:text-white/80 max-w-3xl text-lg leading-relaxed">
          Accessibility in writing is a civil right. This system provides clear instructions, 
          style standards, and conversion tools to translate complex text into readable 
          Plain Language and Easy Read formats.
        </p>
      </div>

      {/* Two Standards Grid */}
      <div className="grid md:grid-cols-2 gap-8">
        {/* Plain Language Card */}
        <div className="bg-white dark:bg-[#1A1C1E] border-2 border-[#1A1C1E]/10 dark:border-white/10 rounded-xl p-8 hover:border-[#1A1C1E]/30 dark:hover:border-white/30 transition-all shadow-sm">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-3 bg-[#1A1C1E] dark:bg-white text-white dark:text-[#1A1C1E] rounded-lg">
              <FileText className="h-6 w-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-[#1A1C1E] dark:text-white">Plain Language</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">Standard Audience</p>
            </div>
          </div>
          <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
            Direct, conversational communication using standard sizes. Targets a 
            <strong className="dark:text-white"> 6th to 8th-grade</strong> reading level for quick comprehension.
          </p>
          <ul className="space-y-3 text-sm text-[#1A1C1E] dark:text-white/90">
            <li className="flex items-start gap-2">
              <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-500 flex-shrink-0 mt-0.5" />
              <span>Uses short, active paragraphs with 12 to 18 words per sentence.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-500 flex-shrink-0 mt-0.5" />
              <span>Speaks directly using "you" and "we".</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-500 flex-shrink-0 mt-0.5" />
              <span>Keeps terminology standard and explains all new terms immediately.</span>
            </li>
          </ul>
        </div>

        {/* Easy Read Card */}
        <div className="bg-white dark:bg-[#1A1C1E] border-2 border-[#1A1C1E]/10 dark:border-white/10 rounded-xl p-8 hover:border-[#1A1C1E]/30 dark:hover:border-white/30 transition-all shadow-sm">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-3 bg-amber-100 dark:bg-amber-900/30 border border-amber-500 dark:border-amber-700 text-amber-800 dark:text-amber-400 rounded-lg">
              <Eye className="h-6 w-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-[#1A1C1E] dark:text-white">Easy Read</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">Cognitive Accessibility</p>
            </div>
          </div>
          <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
            Highly structured model using literal meanings and visual anchors. 
            <strong className="dark:text-white">Targets a 3rd to 5th-grade</strong> reading level.
          </p>
          <ul className="space-y-3 text-sm text-[#1A1C1E] dark:text-white/90">
            <li className="flex items-start gap-2">
              <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-500 flex-shrink-0 mt-0.5" />
              <span>Places only one single idea on each line.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-500 flex-shrink-0 mt-0.5" />
              <span>Limits content strictly to 5 short paragraphs or points per section.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-500 flex-shrink-0 mt-0.5" />
              <span>Uses distinct emojis, shapes, or icons as anchors for information.</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Typography & Spacing specs */}
      <div className="bg-white dark:bg-[#1A1C1E] border-2 border-[#1A1C1E]/10 dark:border-white/10 rounded-xl p-8">
        <h3 className="text-xl font-bold mb-6 text-[#1A1C1E] dark:text-white flex items-center gap-2">
          <Layers className="h-5 w-5" />
          Design and Accessibility Constraints
        </h3>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="border border-gray-100 dark:border-white/10 p-4 rounded-lg bg-[#F7F5F2]/50 dark:bg-white/5">
            <h4 className="font-bold text-[#1A1C1E] dark:text-white flex items-center gap-2 mb-2">
              <Type className="h-4 w-4" /> Plain Typography
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">Open Sans, 16px</p>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Line Height: 1.5</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Weight: 400 (Body)</p>
          </div>

          <div className="border border-gray-100 dark:border-white/10 p-4 rounded-lg bg-[#F7F5F2]/50 dark:bg-white/5">
            <h4 className="font-bold text-[#1A1C1E] dark:text-white flex items-center gap-2 mb-2">
              <Type className="h-4 w-4" /> Easy Read Typography
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">Open Sans, 20px</p>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Line Height: 1.8</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Weight: 400 (Enlarged)</p>
          </div>

          <div className="border border-gray-100 dark:border-white/10 p-4 rounded-lg bg-[#F7F5F2]/50 dark:bg-white/5">
            <h4 className="font-bold text-[#1A1C1E] dark:text-white flex items-center gap-2 mb-2">
              <Layers className="h-4 w-4" /> Spacing & Bounds
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">Sentence max: 18 words</p>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Idea per line (Easy Read)</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Paragraphs max: 5 (Easy Read)</p>
          </div>
        </div>
      </div>

      {/* Do's and Don'ts */}
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white dark:bg-[#1A1C1E] border-2 border-green-600/10 dark:border-green-500/20 rounded-xl p-8">
          <h3 className="text-xl font-bold mb-4 text-green-700 dark:text-green-400 flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-500" /> System Do's
          </h3>
          <ul className="space-y-3 text-sm text-[#1A1C1E] dark:text-white/90">
            <li className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-green-600 dark:bg-green-500 flex-shrink-0 mt-2" />
              <span>Use active voice to show exactly who completes each action.</span>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-green-600 dark:bg-green-500 flex-shrink-0 mt-2" />
              <span>Put the main point of your message first in the communication.</span>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-green-600 dark:bg-green-500 flex-shrink-0 mt-2" />
              <span>Offer concrete examples when introducing abstract rules.</span>
            </li>
          </ul>
        </div>

        <div className="bg-white dark:bg-[#1A1C1E] border-2 border-red-600/10 dark:border-red-500/20 rounded-xl p-8">
          <h3 className="text-xl font-bold mb-4 text-red-700 dark:text-red-400 flex items-center gap-2">
            <XCircle className="h-5 w-5 text-red-600 dark:text-red-500" /> System Don'ts
          </h3>
          <ul className="space-y-3 text-sm text-[#1A1C1E] dark:text-white/90">
            <li className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-red-600 dark:bg-red-500 flex-shrink-0 mt-2" />
              <span>Don't use jargon or complex technical terms without immediately clarifying.</span>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-red-600 dark:bg-red-500 flex-shrink-0 mt-2" />
              <span>Don't stack more than one single idea in sentences for Easy Read.</span>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-red-600 dark:bg-red-500 flex-shrink-0 mt-2" />
              <span>Avoid passive sentences or high-syllable, indirect language styles.</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Inclusive Design Skills Section */}
      <div className="bg-[#1A1C1E]/5 dark:bg-white/5 border-2 border-dashed border-[#1A1C1E]/20 dark:border-white/20 rounded-2xl p-8 mb-10">
        <div className="flex flex-col md:flex-row gap-6 items-start">
          <div className="p-4 bg-white dark:bg-[#101214] border-2 border-[#1A1C1E] dark:border-white rounded-2xl shadow-xl flex-shrink-0">
            <Sparkles className="h-10 w-10 text-[#1A1C1E] dark:text-white" />
          </div>
          <div>
            <h3 className="text-2xl font-black text-[#1A1C1E] dark:text-white uppercase tracking-tight">
              Inclusive Design Skills Integrated
            </h3>
            <p className="mt-2 text-[#1A1C1E]/70 dark:text-white/70 leading-relaxed font-medium">
              This toolkit leverages principles from the <a href="https://github.com/Owl-Listener/inclusive-design-skills" target="_blank" rel="noopener noreferrer" className="underline font-bold hover:text-[#1A1C1E] dark:hover:text-white transition-colors">Owl-Listener Inclusive Design Skills</a> library. 
              These skills go beyond basic accessibility to focus on cognitive load, dignity in design, and radical transparency.
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
              <div className="flex items-center gap-3">
                <code className="bg-white dark:bg-black border border-gray-200 dark:border-white/10 px-2 py-1 rounded font-mono text-[10px] font-bold">/check-wcag</code>
                <span className="text-[9px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest leading-none">Audit</span>
              </div>
              <div className="flex items-center gap-3">
                <code className="bg-white dark:bg-black border border-gray-200 dark:border-white/10 px-2 py-1 rounded font-mono text-[10px] font-bold">/cognitive-load</code>
                <span className="text-[9px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest leading-none">Density</span>
              </div>
              <div className="flex items-center gap-3">
                <code className="bg-white dark:bg-black border border-gray-200 dark:border-white/10 px-2 py-1 rounded font-mono text-[10px] font-bold">/fix-contrast</code>
                <span className="text-[9px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest leading-none">Visual</span>
              </div>
              <div className="flex items-center gap-3">
                <code className="bg-white dark:bg-black border border-gray-200 dark:border-white/10 px-2 py-1 rounded font-mono text-[10px] font-bold">/alt-text-gen</code>
                <span className="text-[9px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest leading-none">Images</span>
              </div>
              <div className="flex items-center gap-3">
                <code className="bg-white dark:bg-black border border-gray-200 dark:border-white/10 px-2 py-1 rounded font-mono text-[10px] font-bold">/plain-language</code>
                <span className="text-[9px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest leading-none">Grade 6-8</span>
              </div>
              <div className="flex items-center gap-3">
                <code className="bg-white dark:bg-black border border-gray-200 dark:border-white/10 px-2 py-1 rounded font-mono text-[10px] font-bold">/easy-read</code>
                <span className="text-[9px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest leading-none">Grade 3-5</span>
              </div>
              <div className="flex items-center gap-3">
                <code className="bg-white dark:bg-black border border-gray-200 dark:border-white/10 px-2 py-1 rounded font-mono text-[10px] font-bold">/inclusive-labeling</code>
                <span className="text-[9px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest leading-none">ARIA</span>
              </div>
              <div className="flex items-center gap-3">
                <code className="bg-white dark:bg-black border border-gray-200 dark:border-white/10 px-2 py-1 rounded font-mono text-[10px] font-bold">/inclusive-research</code>
                <span className="text-[9px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest leading-none">Protocol</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12 pt-8 border-t border-gray-200 dark:border-white/5 text-center">
        <p className="text-xs font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-4">
          Documentation & Standards Policy
        </p>
        <div className="flex flex-wrap justify-center gap-4 text-[10px] font-bold text-gray-500 uppercase">
          <span>Validated: Design.md</span>
          <span className="text-gray-300 dark:text-gray-700">|</span>
          <span>Standards: WCAG 2.2 AA/AAA</span>
          <span className="text-gray-300 dark:text-gray-700">|</span>
          <span>Source: Owl-Listener Inclusive Skills</span>
        </div>
      </div>
    </div>
  );
}
