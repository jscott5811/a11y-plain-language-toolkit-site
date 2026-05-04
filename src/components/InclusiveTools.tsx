import { useState, useRef, useEffect } from 'react';
import { 
  ShieldCheck, 
  Brain, 
  Palette, 
  Image as ImageIcon, 
  Tag, 
  UserSearch, 
  ChevronRight, 
  AlertCircle,
  CheckCircle2,
  Sparkles,
  Upload,
  X,
  Loader2,
  Settings,
  Globe
} from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import { convertToPlainLanguage, convertToEasyRead, analyzeText } from '../utils/simplifier';

type ToolId = 'audit' | 'density' | 'visual' | 'images' | 'plain' | 'easy' | 'aria' | 'research';

interface Tool {
  id: ToolId;
  label: string;
  command: string;
  icon: any;
  description: string;
}

const TOOLS: Tool[] = [
  { id: 'audit', label: 'Audit', command: '/check-wcag', icon: ShieldCheck, description: 'Simulate a technical WCAG 2.2 Level AA/AAA compliance audit.' },
  { id: 'density', label: 'Density', command: '/cognitive-load', icon: Brain, description: 'Analyze information density and identify potential cognitive overload.' },
  { id: 'visual', label: 'Visual', command: '/fix-contrast', icon: Palette, description: 'Generate accessible color palettes and contrast check recommendations.' },
  { id: 'images', label: 'Images', command: '/alt-text-gen', icon: ImageIcon, description: 'Draft equitable and descriptive alt-text for complex imagery.' },
  { id: 'plain', label: 'Plain language', command: '/plain-language', icon: Sparkles, description: 'Rewrite content to a target reading level of 6th to 8th grade.' },
  { id: 'easy', label: 'Easy Read', command: '/easy-read', icon: Sparkles, description: 'Rewrite content to a target reading level of 3rd to 5th grade.' },
  { id: 'aria', label: 'ARIA', command: '/inclusive-labeling', icon: Tag, description: 'Suggest semantic labels and ARIA roles for inclusive UI components.' },
  { id: 'research', label: 'Protocol', command: '/inclusive-research', icon: UserSearch, description: 'Draft research protocols and scripts for includes testing with people with disabilities.' },
];

export default function InclusiveTools() {
  const [activeTool, setActiveTool] = useState<ToolId>('audit');
  const [input, setInput] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [showSettings, setShowSettings] = useState(false);
  const [userApiKey, setUserApiKey] = useState(() => localStorage.getItem('GEMINI_API_KEY') || '');
  const [output, setOutput] = useState<{ status: 'idle' | 'processing' | 'done' | 'error', result: any | null, error?: string, isLocal?: boolean }>({
    status: 'idle',
    result: null
  });

  useEffect(() => {
    localStorage.setItem('GEMINI_API_KEY', userApiKey);
  }, [userApiKey]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setFilePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const clearFile = () => {
    setSelectedFile(null);
    setFilePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const currentTool = TOOLS.find(t => t.id === activeTool)!;

  const handleProcess = async () => {
    if (!input.trim() && !selectedFile) return;
    
    setOutput({ status: 'processing', result: null });

    const apiKey = userApiKey || process.env.GEMINI_API_KEY;

    if (!apiKey) {
      // Local Fallback for specific tools
      if (activeTool === 'plain' || activeTool === 'easy') {
        setTimeout(() => {
          const stats = analyzeText(input);
          const result = activeTool === 'plain' 
            ? { 
                plainText: convertToPlainLanguage(input), 
                gradeLevel: stats.gradeLevel, 
                readabilityScore: `Flesch: ${stats.fleschScore}` 
              }
            : { 
                easyText: convertToEasyRead(input), 
                gradeLevel: "3rd-5th Grade", 
                visualAnchors: "Local mode generated summary" 
              };
          setOutput({ status: 'done', result, isLocal: true });
        }, 800);
        return;
      }
      
      setOutput({ 
        status: 'error', 
        result: null, 
        error: "An API Key is required for this tool. Click the settings gear to provide one for local browser usage." 
      });
      return;
    }

    try {
      const ai = new GoogleGenAI({ apiKey });
      const contentsData = await getContents(activeTool, input, selectedFile);
      
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: contentsData,
        config: {
          responseMimeType: "application/json",
          systemInstruction: getSystemInstruction(activeTool)
        }
      });

      const text = response.text || '';
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      const cleanJson = jsonMatch ? jsonMatch[0] : text;
      const result = JSON.parse(cleanJson || '{}');
      
      setOutput({ status: 'done', result });
    } catch (err) {
      console.error("Gemini Error:", err);
      setOutput({ status: 'error', result: null, error: "AI Error. Verify your API key or connection." });
    }
  };

  async function getContents(tool: ToolId, text: string, file: File | null) {
    const parts: any[] = [{ text: text || "Process this request based on your instructions." }];
    
    if (file && tool === 'images') {
      const base64 = await toBase64(file);
      parts.push({
        inlineData: {
          mimeType: file.type,
          data: base64.split(',')[1]
        }
      });
    }
    
    return { parts };
  }

  const toBase64 = (file: File): Promise<string> => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = error => reject(error);
  });

  function getSystemInstruction(tool: ToolId) {
    switch (tool) {
      case 'audit':
        return `Analyze the following code or content for WCAG 2.2 Level AA/AAA compliance. 
        Return JSON with:
        - score: number (0-100)
        - findings: Array<{ type: 'error'|'warning'|'success', code: string, desc: string }>`;
      case 'density':
        return `Analyze information density and cognitive load. 
        Return JSON with:
        - rating: string (Low/Balanced/High)
        - recommendation: string
        - metrics: { decisions: number, itemsToRemember: number, visualElements: number }`;
      case 'visual':
        return `Suggest accessible color palettes.
        Return JSON with:
        - currentContrast: string
        - recommended: Array<{ color: string, name: string, ratio: string }>`;
      case 'images':
        return `You are an expert in Web Accessibility and Inclusive Design. 
        Your task is to generate high-quality, equitable, and descriptive Alt-text for the provided image or context.
        
        CRITICAL GUIDELINES:
        - Describe what is happening in the image, not just the objects.
        - Include relevant details about diversity, skin tone, gender expression, and disability if they are central to the image's message or representation.
        - Be concise but thorough (typically 1-3 sentences).
        - If context is provided in the text input, incorporate it to make the alt-text more relevant.
        - Avoid phrases like "Image of" or "Photo of".
        
        Return JSON with:
        - equitableAlt: string (the refined alt-text)
        - contextReason: string (explanation of why this alt-text is inclusive and effective)`;
      case 'plain':
        return `TRANSFORMATION RULE: Rewrite the input text into Plain Language (6th-8th grade). 
        STRICT FORMATTING:
        - Each paragraph MUST have exactly 5 to 7 sentences.
        - Each sentence SHOULD be between 12 and 18 words.
        - Use professional, active voice.
        Return JSON with:
        - plainText: string (the full rewritten text)
        - gradeLevel: string
        - readabilityScore: string`;
      case 'easy':
        return `TRANSFORMATION RULE: Rewrite the input text into Easy Read (3rd-5th grade).
        STRICT FORMATTING:
        - Use simple words and bullet points.
        - Use short, clear statements.
        - Suggest 3 specific visual anchors (icons or images).
        Return JSON with:
        - easyText: string (the full rewritten text)
        - gradeLevel: string
        - visualAnchors: string`;
      case 'aria':
        return `Suggest ARIA roles and labels for the described UI.
        Return JSON with:
        - recommendations: Array<{ component: string, aria: string, role?: string, reason: string }>`;
      case 'research':
        return `Draft a research protocol and script.
        Return JSON with:
        - protocol: string
        - inclusiveGoals: Array<string>
        - scriptPrompt: string`;
    }
  }

  return (
    <div className="flex flex-col lg:flex-row gap-10 bg-white dark:bg-[#1A1C1E] border-2 border-gray-200 dark:border-white/10 rounded-3xl p-8 lg:p-12 shadow-sm min-h-[700px]">
      {/* Tool Sidebar */}
      <aside className="w-full lg:w-72 flex-shrink-0 space-y-6">
        <div>
          <h2 className="text-sm font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-6">Inclusive Toolkit</h2>
          <nav className="flex flex-col gap-2">
            {TOOLS.map((tool) => {
              const Icon = tool.icon;
              const isActive = activeTool === tool.id;
              return (
                <button
                  key={tool.id}
                  onClick={() => {
                    setActiveTool(tool.id);
                    setOutput({ status: 'idle', result: null });
                  }}
                  className={`flex items-center gap-4 p-4 rounded-xl text-left transition-all group ${
                    isActive
                      ? 'bg-[#1A1C1E] dark:bg-white text-white dark:text-[#1A1C1E] shadow-xl scale-[1.02]'
                      : 'hover:bg-gray-50 dark:hover:bg-white/5 text-[#1A1C1E]/60 dark:text-white/60'
                  }`}
                >
                  <Icon className={`h-5 w-5 transition-transform ${isActive ? 'scale-110' : 'group-hover:scale-110'}`} />
                  <div className="flex-1">
                    <span className="block font-black text-sm uppercase tracking-tight">{tool.label}</span>
                    <code className={`text-[10px] font-bold ${isActive ? 'text-white/60 dark:text-[#1A1C1E]/50' : 'text-gray-400'}`}>
                      {tool.command}
                    </code>
                  </div>
                  {isActive && <ChevronRight className="h-4 w-4" />}
                </button>
              );
            })}
          </nav>
        </div>
        
        <div className="p-4 bg-[#F7F5F2] dark:bg-black/20 rounded-2xl border border-[#1A1C1E]/5 dark:border-white/5">
          <p className="text-[10px] leading-relaxed font-bold text-gray-500 uppercase tracking-widest">Tool Policy</p>
          <p className="mt-2 text-xs text-[#1A1C1E]/60 dark:text-white/60 leading-relaxed font-medium">
            AI-powered by Gemini. Results based on the Owl-Listener Inclusive Design Skills framework. Use these as a starting point for expert review.
          </p>
        </div>
      </aside>

      {/* Workspace */}
      <div className="flex-1 flex flex-col gap-8">
        <header>
          <div className="flex justify-between items-start">
            <div>
              <div className="inline-flex items-center gap-3 px-4 py-1.5 bg-gray-100 dark:bg-white/5 rounded-full border border-gray-200 dark:border-white/10 mb-4">
                <currentTool.icon className="h-4 w-4 text-[#1A1C1E] dark:text-white" />
                <span className="text-[10px] font-black uppercase tracking-widest text-[#1A1C1E] dark:text-white">{currentTool.label} Environment</span>
              </div>
              <h1 className="text-3xl font-black text-[#1A1C1E] dark:text-white uppercase tracking-tight">{currentTool.label} Tool</h1>
            </div>
            
            <div className="relative">
              <button 
                onClick={() => setShowSettings(!showSettings)}
                className="p-3 bg-gray-100 dark:bg-white/5 rounded-2xl hover:bg-gray-200 dark:hover:bg-white/10 transition-colors border border-gray-200 dark:border-white/10"
              >
                <Settings className={`h-5 w-5 ${userApiKey ? 'text-green-500' : 'text-gray-400'}`} />
              </button>
              
              {showSettings && (
                <div className="absolute right-0 mt-3 w-80 bg-white dark:bg-[#1A1C1E] border-2 border-gray-200 dark:border-white/10 rounded-2xl p-6 shadow-2xl z-50 animate-in fade-in zoom-in-95 duration-200">
                  <h4 className="text-[10px] font-black uppercase tracking-widest text-[#1A1C1E] dark:text-white mb-4">Local API Configuration</h4>
                  <p className="text-xs text-gray-500 mb-4 leading-relaxed font-medium">To run features on GitHub Pages, provide your own Gemini API Key. It is saved only in your browser.</p>
                  <input 
                    type="password"
                    value={userApiKey}
                    onChange={(e) => setUserApiKey(e.target.value)}
                    placeholder="Enter Gemini API Key..."
                    className="w-full p-3 bg-gray-100 dark:bg-black border border-transparent focus:border-[#1A1C1E] dark:focus:border-white rounded-xl text-xs outline-none transition-all"
                  />
                  {!userApiKey && (
                    <div className="mt-4 flex items-center gap-2 text-[10px] font-black text-amber-600 uppercase">
                      <Globe className="h-3 w-3" /> Basic Mode Active
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          <p className="mt-2 text-lg text-[#1A1C1E]/70 dark:text-white/70 font-medium leading-relaxed max-w-2xl">
            {currentTool.description}
          </p>
        </header>

        <section className="space-y-6">
          {activeTool === 'images' && (
            <div className="space-y-4">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 ml-1">
                <label className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest block">
                  Step 1: Upload Source Image
                </label>
                <span className="text-[10px] font-bold text-blue-500 dark:text-blue-400 uppercase tracking-tight bg-blue-50 dark:bg-blue-900/20 px-2 py-0.5 rounded">
                  Required for Vision Analysis
                </span>
              </div>
              <div 
                onClick={() => fileInputRef.current?.click()}
                className={`relative group cursor-pointer border-2 border-dashed rounded-3xl p-8 transition-all overflow-hidden ${
                  filePreview 
                  ? 'border-[#1A1C1E] dark:border-white bg-white dark:bg-[#1A1C1E]' 
                  : 'border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 hover:border-[#1A1C1E] dark:hover:border-white'
                }`}
              >
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  onChange={handleFileChange} 
                  accept="image/*" 
                  className="hidden" 
                />
                
                {filePreview ? (
                  <div className="relative group/preview max-w-md mx-auto">
                    <img src={filePreview} alt="Upload preview" className="w-full rounded-2xl shadow-2xl transition-transform group-hover/preview:scale-[1.01]" />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/preview:opacity-100 transition-opacity flex items-center justify-center rounded-2xl">
                      <p className="text-white text-xs font-black uppercase tracking-widest">Change Image</p>
                    </div>
                    <button 
                      onClick={(e) => { e.stopPropagation(); clearFile(); }}
                      className="absolute -top-3 -right-3 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-all shadow-xl z-20"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center gap-4 py-8">
                    <div className="p-4 bg-white dark:bg-white/5 rounded-2xl shadow-sm group-hover:scale-110 transition-transform">
                      <Upload className="h-10 w-10 text-[#1A1C1E] dark:text-white" />
                    </div>
                    <div className="text-center">
                      <p className="text-lg font-black text-[#1A1C1E] dark:text-white uppercase tracking-tight mb-1">Click or Drop Image</p>
                      <p className="text-xs text-gray-400 font-bold uppercase tracking-wide">Supports PNG, JPG, WEBP • Max 10MB</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          <div className="space-y-3">
            <label className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest block ml-1">
              {activeTool === 'plain' || activeTool === 'easy' ? 'Step 2: Source Text to Translate' : 
               activeTool === 'images' ? 'Step 2: Context / Branding Guidelines (Optional)' :
               activeTool === 'audit' || activeTool === 'density' ? 'Analyze Context / Code' : 
               activeTool === 'visual' ? 'Enter Color Values (Hex/RGB)' :
               activeTool === 'aria' ? 'Describe the UI Component' : 'Research Objectives'}
            </label>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={
                activeTool === 'images' 
                ? "Example: This is for a luxury fashion brand's summer collection..." 
                : `Enter input for ${currentTool.command}...`
              }
              className="w-full h-40 p-6 bg-[#F7F5F2] dark:bg-black/40 border-2 border-transparent focus:border-[#1A1C1E] dark:focus:border-white rounded-3xl resize-none font-medium text-lg outline-none transition-all"
            />
          </div>

          <button
            onClick={handleProcess}
            disabled={output.status === 'processing' || (!input.trim() && !selectedFile)}
            className="w-full md:w-auto px-10 py-4 bg-[#1A1C1E] dark:bg-white text-white dark:text-[#1A1C1E] rounded-2xl font-black uppercase tracking-widest text-xs hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-3"
          >
            {output.status === 'processing' ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Translating...
              </>
            ) : (
              <>
                Run {currentTool.command}
              </>
            )}
          </button>
        </section>

        {/* Results Area */}
        <section className="flex-1 mt-4">
          <div className="bg-gray-50 dark:bg-white/5 border-2 border-dashed border-gray-200 dark:border-white/10 rounded-3xl min-h-[300px] p-8">
            {output.status === 'idle' && (
              <div className="h-full flex flex-col items-center justify-center text-center py-20">
                <currentTool.icon className="h-12 w-12 text-gray-200 dark:text-white/10 mb-4" />
                <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">
                  Awaiting Input
                </p>
              </div>
            )}

            {output.status === 'processing' && (
              <div className="h-full flex flex-col items-center justify-center py-20">
                <div className="w-12 h-1 bg-gray-200 dark:bg-white/10 rounded-full overflow-hidden mb-6">
                  <div className="w-full h-full bg-[#1A1C1E] dark:bg-white animate-[progress_1.5s_infinite]"></div>
                </div>
                <p className="text-sm font-bold text-[#1A1C1E] dark:text-white uppercase tracking-widest animate-pulse">
                  Generative Translation via {currentTool.command}...
                </p>
              </div>
            )}

            {output.status === 'error' && (
              <div className="h-full flex flex-col items-center justify-center text-center py-20 text-red-500">
                <AlertCircle className="h-12 w-12 mb-4" />
                <p className="font-bold uppercase tracking-widest text-sm">{output.error}</p>
                <button 
                  onClick={() => setOutput({ status: 'idle', result: null })}
                  className="mt-4 text-[10px] font-black uppercase underline"
                >
                  Try Again
                </button>
              </div>
            )}

            {output.status === 'done' && output.result && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="flex items-center gap-3 mb-8 pb-4 border-b border-gray-200 dark:border-white/5">
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                  <h3 className="text-lg font-black uppercase tracking-tight text-[#1A1C1E] dark:text-white">Translation Result</h3>
                </div>

                {/* Sub-tool specific results display */}
                {activeTool === 'audit' && (
                  <div className="space-y-6">
                    <div className="flex items-center gap-4">
                      <div className="text-5xl font-black text-[#1A1C1E] dark:text-white">{output.result.score}</div>
                      <div>
                        <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Compliance Score</div>
                        <div className="text-xs font-bold text-green-500 uppercase tracking-wide">Target: Legally Defensible</div>
                      </div>
                    </div>
                    <div className="grid gap-3 mt-8">
                      {output.result.findings?.map((f: any, i: number) => (
                        <div key={i} className="flex gap-4 p-4 bg-white dark:bg-[#1A1C1E] border border-gray-200 dark:border-white/10 rounded-xl">
                          {f.type === 'error' ? <AlertCircle className="h-5 w-5 text-red-500 shrink-0" /> : 
                           f.type === 'warning' ? <AlertCircle className="h-5 w-5 text-amber-500 shrink-0" /> :
                           <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0" />}
                          <div>
                            <div className="text-[10px] font-black uppercase text-gray-400 mb-1">WCAG {f.code}</div>
                            <p className="text-sm font-medium text-[#1A1C1E] dark:text-white">{f.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTool === 'density' && (
                  <div className="space-y-8">
                    <div className="p-6 bg-amber-50 dark:bg-amber-900/10 border-2 border-amber-200 dark:border-amber-700/50 rounded-2xl">
                      <div className="text-[10px] font-black text-amber-900 dark:text-amber-400 uppercase tracking-widest mb-2">Complexity Rating</div>
                      <div className="text-2xl font-black text-amber-950 dark:text-amber-200 uppercase tracking-tight">{output.result.rating}</div>
                      <p className="mt-4 text-sm font-medium text-amber-900/80 dark:text-amber-200/80 leading-relaxed">
                        {output.result.recommendation}
                      </p>
                    </div>
                    <div className="grid grid-cols-3 gap-6">
                      {Object.entries(output.result.metrics || {}).map(([key, val]: [string, any]) => (
                        <div key={key}>
                          <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">{key.replace(/([A-Z])/g, ' $1')}</div>
                          <div className="text-2xl font-black text-[#1A1C1E] dark:text-white">{val}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTool === 'visual' && (
                  <div className="space-y-6">
                    <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Current: {output.result.currentContrast}</div>
                    <div className="grid sm:grid-cols-3 gap-4">
                      {output.result.recommended?.map((c: any, i: number) => (
                        <div key={i} className="p-5 bg-white dark:bg-[#1A1C1E] border border-gray-200 dark:border-white/10 rounded-2xl shadow-sm">
                          <div className="w-full h-12 rounded-lg mb-4" style={{ backgroundColor: c.color }}></div>
                          <div className="text-xs font-black uppercase tracking-tight mb-1">{c.name}</div>
                          <code className="text-[10px] text-gray-500 block mb-2">{c.color}</code>
                          <div className="text-[10px] font-black text-green-500 uppercase">Ratio: {c.ratio}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTool === 'images' && (
                  <div className="space-y-6">
                    <div className="p-8 bg-white dark:bg-[#1A1C1E] border-2 border-[#1A1C1E] dark:border-white rounded-3xl shadow-xl">
                      <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4">Equitable Alt-Text</div>
                      <p className="text-xl font-bold leading-relaxed italic text-[#1A1C1E] dark:text-white">
                        "{output.result.equitableAlt}"
                      </p>
                    </div>
                    <div className="flex gap-4 p-4 bg-blue-50 dark:bg-blue-900/10 border border-blue-200 dark:border-blue-700/50 rounded-xl">
                      <Brain className="h-5 w-5 text-blue-600 dark:text-blue-400 shrink-0" />
                      <p className="text-sm font-medium text-blue-900/80 dark:text-blue-400/80">
                        <span className="font-black uppercase text-[10px] block mb-1">Inclusion Strategy</span>
                        {output.result.contextReason}
                      </p>
                    </div>
                  </div>
                )}

                {(activeTool === 'plain' || activeTool === 'easy') && (
                  <div className="space-y-6">
                    <div className="p-8 bg-white dark:bg-[#1A1C1E] border-2 border-[#1A1C1E] dark:border-white rounded-3xl shadow-xl">
                      <div className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-4 text-[#1A1C1E] dark:text-white">
                        {activeTool === 'plain' ? 'Plain Language Rewrite' : 'Easy Read Rewrite'}
                      </div>
                      <div className={`text-xl font-bold leading-relaxed text-[#1A1C1E] dark:text-white whitespace-pre-wrap ${activeTool === 'easy' ? 'font-normal' : ''}`}>
                        {activeTool === 'plain' ? output.result.plainText : output.result.easyText}
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 bg-gray-100 dark:bg-white/5 rounded-xl">
                        <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Grade Target</div>
                        <div className="text-lg font-black text-[#1A1C1E] dark:text-white">{output.result.gradeLevel}</div>
                      </div>
                      <div className="p-4 bg-gray-100 dark:bg-white/5 rounded-xl">
                        <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">
                          {activeTool === 'plain' ? 'Readability' : 'Visual Strategy'}
                        </div>
                        <div className="text-xs font-bold text-[#1A1C1E] dark:text-white">
                          {activeTool === 'plain' ? output.result.readabilityScore : output.result.visualAnchors}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTool === 'aria' && (
                  <div className="grid gap-4">
                    {output.result.recommendations?.map((r: any, i: number) => (
                      <div key={i} className="p-6 bg-white dark:bg-[#1A1C1E] border border-gray-100 dark:border-white/5 rounded-2xl shadow-sm flex flex-col md:flex-row justify-between gap-6">
                        <div className="flex-1">
                          <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Component: {r.component}</div>
                          <code className="block p-4 bg-[#F7F5F2] dark:bg-black rounded-xl text-blue-600 dark:text-blue-400 font-mono text-sm overflow-x-auto">
                            {r.aria}
                          </code>
                        </div>
                        {r.reason && (
                          <div className="md:w-64">
                            <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Implementation Note</div>
                            <p className="text-xs font-medium text-[#1A1C1E]/60 dark:text-white/60 leading-relaxed">{r.reason}</p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {activeTool === 'research' && (
                  <div className="space-y-8">
                    <div className="p-6 bg-[#1A1C1E] text-white rounded-3xl">
                      <div className="text-[10px] font-black text-white/50 uppercase tracking-widest mb-4">Draft Research Script</div>
                      <p className="text-xl font-bold leading-relaxed">{output.result.scriptPrompt}</p>
                    </div>
                    <div className="grid md:grid-cols-2 gap-8">
                      <div>
                        <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4 border-b border-gray-200 pb-2">Inclusive Objectives</h4>
                        <ul className="space-y-3">
                          {output.result.inclusiveGoals?.map((g: string, i: number) => (
                            <li key={i} className="flex gap-3 text-sm font-medium text-[#1A1C1E]/80 dark:text-white/80">
                              <span className="text-[#1A1C1E] dark:text-white">•</span>
                              {g}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="p-4 bg-gray-50 dark:bg-white/5 rounded-xl">
                        <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Protocol Format</h4>
                        <p className="text-sm font-bold text-[#1A1C1E] dark:text-white">{output.result.protocol}</p>
                        <p className="mt-2 text-xs text-gray-500 leading-relaxed font-medium">Standard baseline for testing with users who have cognitive or sensory differences.</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </section>
      </div>
      
      <style>{`
        @keyframes progress {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
}
