import { useState, useMemo } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { ChevronRight, Search, BookOpen, Brain, MousePointer2, Type, Users, Settings2, Info, LayoutDashboard } from 'lucide-react';

const SKILLS_DATA = {
  overview: {
    title: "Skills Overview",
    content: `
# Inclusive Design Skills

This library provides actionable commands and principles to build digital products that respect the full range of human ability.

### Integrated Frameworks
- **Cognitive**: Minimizing load and maximizing clarity.
- **Interaction**: Flexible input methods and safe motion.
- **Content**: Truly readable and structured information.
- **Personas**: Designing for the ability spectrum.
- **Adaptive**: Interfaces that listen to the OS.
- **Decisions**: Tracking accessibility as quality debt.
`
  },
  'cognitive-accessibility': {
    title: "Cognitive Accessibility",
    content: `
# Cognitive Accessibility

Focus on reducing **Extraneous Load** (complexity added by design) to maximize **Germane Load** (effort invested in the actual task).

### Specialized Commands
- \`/assess-load\`: Map cognitive load across a multi-step process.
- \`/simplify\`: Produce a cognitively simplified version of content or flows.
- \`/contextual-help\`: Design help that meets people where they are — on the screen they're stuck on.
- \`/plain-language\`: Evaluate and rewrite content for immediate comprehension.
- \`/memory-load-reduction\`: Audit for information that users are forced to carry across screens.
`
  },
  'inclusive-interaction': {
    title: "Inclusive Interaction",
    content: `
# Inclusive Interaction

Design interactions so that every task can be completed using only a keyboard or varied input methods.

### Specialized Commands
- \`/keyboard-audit\`: Run a focused review of keyboard-only accessibility.
- \`/motion-sensitivity\`: Design motion that serves function without causing harm.
- \`/touch-target-spec\`: Specify target sizes (minimum 44x44px on touch).
- \`/multi-modal-check\`: Ensure every task has at least two input methods (e.g. keyboard + touch).
- \`/gesture-alternatives\`: Identify swipe/pinch actions and provide button equivalents.
`
  },
  'accessible-content': {
    title: "Accessible Content",
    content: `
# Accessible Content

Structure and write content so that assistive technology can parse and present it meaningfully.

### Specialized Commands
- \`/alt-text-design\`: Write alt text that conveys purpose, not just appearance.
- \`/heading-structure\`: Design a logical navigation hierarchy (No skipped levels).
- \`/link-text-review\`: Identify and fix generic links like "click here".
- \`/form-label-audit\`: Ensure persistent, visible labels for every input field.
- \`/table-structure\`: Plan headers and captions for data relationships.
`
  },
  'inclusive-personas': {
    title: "Inclusive Personas",
    content: `
# Inclusive Personas

Build personas where disability is woven into the full picture of a person, not isolated.

### Specialized Commands
- \`/ability-spectrum\`: Map features against permanent, temporary, and situational impairments.
- \`/generate-persona\`: Create diverse user profiles including assistive tech users.
- \`/scenario-map\`: Generate step-by-step usage narratives for diverse ability setups.
- \`/edge-case-audit\`: Identify scenarios teams dismiss as "edge" but are daily realities for many.
`
  },
  'adaptive-interfaces': {
    title: "Adaptive Interfaces",
    content: `
# Adaptive Interfaces

The operating system already knows what the user needs. Your job is to listen and respond.

### Specialized Commands
- \`/preference-audit\`: Test response to system settings (Reduced Motion, High Contrast, Dark Mode).
- \`/flexible-typography\`: Design type systems that scale to 200% without breaking.
- \`/information-density\`: Provide controls for Compact vs Spacious views.
- \`/responsive-a11y\`: Verify content reflow at 200% zoom without horizontal scroll.
`
  },
  'accessibility-decisions': {
    title: "Accessibility Decisions",
    content: `
# Accessibility Decisions

Record accessibility decisions so that future teams understand not just what was decided, but why.

### Specialized Commands
- \`/debt-tracking\`: Log known barriers as known liabilities with remediation deadlines.
- \`/handoff-spec\`: Package accessibility decisions into clear implementation requirements.
- \`/tradeoff-analysis\`: Rigorously analyze who benefits and who is excluded by a design choice.
- \`/stakeholder-frame\`: Translate a11y needs into language for leadership, PMs, or engineering.
`
  }
};

export default function InclusiveSkills() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeSection, setActiveSection] = useState<keyof typeof SKILLS_DATA>('overview');

  const sections = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'cognitive-accessibility', label: 'Cognitive', icon: Brain },
    { id: 'inclusive-interaction', label: 'Interaction', icon: MousePointer2 },
    { id: 'accessible-content', label: 'Content', icon: Type },
    { id: 'inclusive-personas', label: 'Personas', icon: Users },
    { id: 'adaptive-interfaces', label: 'Adaptive', icon: Settings2 },
    { id: 'accessibility-decisions', label: 'Decisions', icon: Info },
  ] as const;

  const filteredSections = useMemo(() => {
    if (!searchQuery) return sections;
    return sections.filter(s => 
      s.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
      SKILLS_DATA[s.id as keyof typeof SKILLS_DATA].content.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  return (
    <div className="flex flex-col lg:flex-row gap-8 min-h-[600px]">
      {/* Sidebar Navigation */}
      <aside className="w-full lg:w-64 flex-shrink-0">
        <div className="sticky top-8 space-y-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search skills..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white dark:bg-[#1A1C1E] border-2 border-gray-200 dark:border-white/10 rounded-xl focus:border-[#1A1C1E] dark:focus:border-white transition-all text-sm outline-none"
            />
          </div>

          <nav className="space-y-1">
            {filteredSections.map((section) => {
              const Icon = section.icon;
              const isActive = activeSection === section.id;
              return (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id as keyof typeof SKILLS_DATA)}
                  className={`w-full flex items-center justify-between group p-3 rounded-xl transition-all ${
                    isActive 
                      ? 'bg-[#1A1C1E] text-white dark:bg-white dark:text-black shadow-lg scale-[1.02]' 
                      : 'hover:bg-gray-100 dark:hover:bg-white/5 text-[#1A1C1E]/60 dark:text-white/60'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="h-4 w-4" />
                    <span className="font-bold text-sm">{section.label}</span>
                  </div>
                  <ChevronRight className={`h-4 w-4 transition-all ${isActive ? 'opacity-100 translate-x-1' : 'opacity-0 group-hover:opacity-100'}`} />
                </button>
              );
            })}
          </nav>

          <div className="p-4 bg-[#F7F5F2] dark:bg-amber-900/10 border border-amber-200 dark:border-amber-700/30 rounded-xl">
            <div className="flex items-center gap-2 text-amber-900 dark:text-amber-400 mb-2">
              <BookOpen className="h-4 w-4" />
              <span className="font-bold text-xs uppercase tracking-wider">Credits & Standards</span>
            </div>
            <p className="text-[10px] leading-relaxed text-amber-900/70 dark:text-amber-400/70 font-medium">
              Commands adapted from <a href="https://github.com/Owl-Listener/inclusive-design-skills" target="_blank" className="underline">Owl-Listener's Inclusive Design Skills</a>. 
              Validated via <a href="https://github.com/google/design.md" target="_blank" className="underline">Google Design.md</a>.
            </p>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 bg-white dark:bg-[#1A1C1E] border-2 border-[#1A1C1E]/10 dark:border-white/10 rounded-3xl p-8 lg:p-12 shadow-sm min-h-[700px]">
        <div 
          key={activeSection}
          className="prose dark:prose-invert prose-slate max-w-none animate-in fade-in slide-in-from-bottom-2 duration-300
            prose-headings:font-black prose-headings:tracking-tight prose-headings:uppercase
            prose-h1:text-4xl prose-h1:mb-8 text-[#1A1C1E] dark:text-white
            prose-h2:text-2xl prose-h2:mt-12 prose-h2:pb-4 prose-h2:border-b-2 prose-h2:border-[#1A1C1E]/10 dark:prose-h2:border-white/5
            prose-h3:text-lg prose-h3:mt-8 prose-h3:mb-4
            prose-p:text-[#1A1C1E]/80 dark:prose-p:text-white/70 prose-p:leading-relaxed prose-p:text-lg
            prose-li:text-[#1A1C1E]/80 dark:prose-li:text-white/70 prose-li:my-1
            prose-code:bg-[#F7F5F2] dark:prose-code:bg-white/5 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:font-mono
            prose-a:text-[#1A1C1E] dark:prose-a:text-white prose-a:font-bold prose-a:underline
          "
        >
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {SKILLS_DATA[activeSection].content}
          </ReactMarkdown>
          
          <div className="mt-16 p-6 bg-[#F7F5F2] dark:bg-white/5 rounded-2xl border-2 border-dashed border-[#1A1C1E]/10 dark:border-white/10 text-center">
            <p className="text-sm font-medium text-gray-500">
              The full skill repository contains 50+ specialized commands for cognitive, interaction, and structural accessibility.
            </p>
            <a 
              href="https://github.com/Owl-Listener/inclusive-design-skills" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-block mt-4 text-xs font-black uppercase tracking-widest border-b-2 border-current"
            >
              View Full Documentation on GitHub
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

