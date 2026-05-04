import { CheckCircle, XCircle, FileText, Layers, Type, Eye } from 'lucide-react';

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
    </div>
  );
}
