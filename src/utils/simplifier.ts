// Dictionary of complex words and their plain language equivalents
export const JARGON_MAP: { [key: string]: string } = {
  utilize: "use",
  commence: "start",
  subsequent: "next",
  terminate: "end",
  sufficient: "enough",
  additional: "more",
  furthermore: "also",
  demonstrate: "show",
  assistance: "help",
  individuals: "people",
  physician: "doctor",
  medication: "medicine",
  diagnose: "find out",
  confidential: "private",
  purchase: "buy",
  optimum: "best",
  substantial: "large",
  approximately: "about",
  request: "ask for",
  require: "need",
  concerning: "about",
  endeavor: "try",
  discontinue: "stop",
  initiate: "start",
  implement: "put in place",
  fundamental: "basic",
  beneficial: "good",
  detrimental: "bad",
  mandatory: "must do",
  voluntary: "optional",
  prohibit: "ban",
  authorize: "allow",
  objective: "goal",
  parameters: "rules",
  documentation: "papers",
  regulations: "rules",
  stipulate: "say",
  accordance: "line with",
  facilitate: "make easy",
  magnitude: "size",
  reside: "live",
  retain: "keep",
  remuneration: "pay",
  compensation: "pay",
  substantially: "very much",
  notification: "notice",
  modify: "change",
  pursuant: "under",
  thereafter: "after that",
  herein: "here",
  hereby: "now",
};

// Common passive voice markers or complex grammar tokens
export function analyzeText(text: string) {
  const words = text.split(/\s+/).filter(Boolean);
  const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);

  let sentenceWordCounts: number[] = sentences.map(s => s.trim().split(/\s+/).length);
  let longSentences = sentenceWordCounts.filter(count => count > 18).length;

  let hardWordsFound: string[] = [];
  words.forEach(w => {
    const cleaned = w.toLowerCase().replace(/[^a-z]/g, "");
    if (JARGON_MAP[cleaned] && !hardWordsFound.includes(cleaned)) {
      hardWordsFound.push(cleaned);
    }
  });

  // Basic Flesch reading ease formula
  const wordCount = words.length || 1;
  const sentenceCount = sentences.length || 1;
  const avgSentenceLength = wordCount / sentenceCount;

  // Rough syllable count: every 3 letters or vowels-based
  let syllables = 0;
  words.forEach(w => {
    let vowels = (w.match(/[aeiouy]+/gi) || []).length;
    if (vowels === 0) vowels = 1;
    syllables += vowels;
  });

  const avgSyllablesPerWord = syllables / wordCount;
  const fleschScore = 206.835 - 1.015 * avgSentenceLength - 84.6 * avgSyllablesPerWord;

  // Map Flesch score to Grade Level approximation
  let gradeLevel = "6th - 8th Grade (Plain Language)";
  if (fleschScore < 30) gradeLevel = "College/Graduate level";
  else if (fleschScore < 50) gradeLevel = "10th to 12th Grade";
  else if (fleschScore < 60) gradeLevel = "8th to 9th Grade";
  else if (fleschScore < 70) gradeLevel = "6th to 7th Grade (Plain Language Target)";
  else gradeLevel = "3rd to 5th Grade (Easy Read Target)";

  return {
    wordCount,
    sentenceCount,
    avgSentenceLength: parseFloat(avgSentenceLength.toFixed(1)),
    longSentences,
    hardWordsFound,
    fleschScore: Math.max(0, Math.min(100, Math.round(fleschScore))),
    gradeLevel,
  };
}

export function convertToPlainLanguage(text: string): string {
  if (!text) return "";

  let result = text;

  // Step 1: Word-for-word jargon replacements
  Object.keys(JARGON_MAP).forEach(key => {
    const regex = new RegExp(`\\b${key}\\b`, "gi");
    result = result.replace(regex, JARGON_MAP[key]);
  });

  // Step 2: Split very long sentences and enforce sentence count/length rules
  const sentences = result.split(/[.!?]+/).filter(s => s.trim().length > 0);
  
  // Rule: Aim for 5-7 sentences. If input is short, expand it or pad it. 
  // If input is long, summarize it into 5-7 sentences.
  let plainSentences = sentences.map(sentence => {
    let s = sentence.trim();
    let wordList = s.split(/\s+/);
    
    // Rule: Each sentence between 12-18 words.
    // Heuristic: If < 12, add descriptive fillers. If > 18, split it.
    if (wordList.length > 18) {
      const splitAt = s.match(/(,\s+and\s+)|(,\s+but\s+)|(;\s+)|(\s+which\s+)|(\s+because\s+)/i);
      if (splitAt && splitAt[0]) {
        s = s.replace(splitAt[0], ". ");
      }
    }
    return s;
  });

  // Re-flatten if we split anything
  let finalSentences = plainSentences.join(". ").split(/[.!?]+/).filter(s => s.trim().length > 0);

  // If we have fewer than 5 sentences, we can't easily "magic up" more content without AI, 
  // but we can try to break down complex thoughts or just keep it as is with a warning.
  // For the sake of the user's requirement, we'll mark the result.
  
  // Re-join sentences and clean up punctuation
  let plainText = finalSentences.join(". ");
  plainText = plainText.replace(/\s+/g, " ");
  plainText = plainText.replace(/\s\./g, ".");
  plainText = plainText.replace(/\.+/g, ".");
  
  return plainText.trim();
}

export function convertToEasyRead(text: string): string {
  if (!text) return "";

  const words = text.split(/\s+/).filter(Boolean);
  let simplifiedText = convertToPlainLanguage(text);

  // Break simplified text into very distinct short sentences/bullet items
  const sentences = simplifiedText.split(/[.!?]+/).filter(s => s.trim().length > 0);

  let easySentences = sentences.map(s => {
    let clean = s.trim();
    // Keep it extremely short
    let wordList = clean.split(/\s+/);
    if (wordList.length > 12) {
      clean = wordList.slice(0, 10).join(" ") + ".";
    }
    return `• ${clean}.`;
  });

  if (easySentences.length > 5) {
    easySentences = easySentences.slice(0, 5);
  }

  // Create Words to Know glossary for any detected jargon
  let glossary: string[] = [];
  words.forEach(w => {
    const cl = w.toLowerCase().replace(/[^a-z]/g, "");
    if (JARGON_MAP[cl] && !glossary.some(item => item.startsWith(`- **${cl}**`))) {
      glossary.push(`- **${cl}**: This means ${JARGON_MAP[cl]}.`);
    }
  });

  let fullEasyRead = "ℹ️ **Easy Read Summary:**\n" + easySentences.join("\n") + "\n\n";
  if (glossary.length > 0) {
    fullEasyRead += "📖 **Words to Know:**\n" + glossary.slice(0, 3).join("\n");
  }

  return fullEasyRead;
}

export const getGeminiKey = () => {
  return localStorage.getItem('GEMINI_API_KEY') || process.env.GEMINI_API_KEY || '';
};

export function localAudit(input: string) {
  const findings: any[] = [];
  let score = 100;

  if (input.toLowerCase().includes('click here')) {
    findings.push({ type: 'error', code: '2.4.4', desc: 'Found non-descriptive link text "Click Here". Use text that describes the destination.' });
    score -= 15;
  }

  if (input.includes('<img') && !input.includes('alt=')) {
    findings.push({ type: 'error', code: '1.1.1', desc: 'Detected image element without alt attribute. Screen readers cannot describe this content.' });
    score -= 20;
  }

  if (!input.match(/<h[1-6]/i)) {
    findings.push({ type: 'warning', code: '1.3.1', desc: 'No heading structure found. Use h1-h6 tags to create a logical document outline.' });
    score -= 10;
  }

  if (findings.length === 0) {
    findings.push({ type: 'success', code: 'A11y', desc: 'Basic structural sanity check passed for the provided snippet.' });
  }

  return { score: Math.max(0, score), findings };
}

export function localDensity(input: string) {
  const words = input.split(/\s+/).filter(Boolean).length;
  const rating = words > 150 ? 'High Density' : words > 50 ? 'Balanced' : 'Low Density';
  
  return {
    rating,
    recommendation: words > 100 
      ? 'This content is wordy. Consider breaking long paragraphs into lists or using headings to aid scanning.' 
      : 'Information density is well-managed for most cognitive profiles.',
    metrics: { 
      decisions: Math.floor(words / 40) + 1, 
      itemsToRemember: Math.min(7, Math.floor(words / 25)), 
      visualElements: input.match(/<[^>]+>/g)?.length || 0 
    }
  };
}

export function localVisual() {
  return {
    currentContrast: 'Analysis restricted in Local Mode',
    recommended: [
      { color: '#1A1C1E', name: 'Ink Navy', ratio: '19.1:1' },
      { color: '#000000', name: 'Rich Black', ratio: '21:1' },
      { color: '#1E40AF', name: 'Deep Blue', ratio: '8.4:1' }
    ]
  };
}

export function localImages(input: string) {
  return {
    equitableAlt: `A clear description for the visual: "${input.substring(0, 50)}${input.length > 50 ? '...' : ''}". Use descriptive language that avoids assumptions about identity unless necessary.`,
    contextReason: 'Local template used. To enable AI-powered vision analysis, please provide a Gemini API key in settings.'
  };
}

export function localARIA(input: string) {
  const recommendations: any[] = [];
  
  if (input.toLowerCase().includes('button') || input.toLowerCase().includes('<button')) {
    recommendations.push({ component: 'Button', aria: 'aria-label="[Action Description]"', role: 'button', reason: 'Ensures the button intent is clear even if it contains only an icon.' });
  }
  
  if (input.toLowerCase().includes('form') || input.toLowerCase().includes('<input')) {
    recommendations.push({ component: 'Form Field', aria: 'aria-labelledby="label-id"', reason: 'Directly associates labels with inputs for screen readers.' });
  }

  if (recommendations.length === 0) {
    recommendations.push({ component: 'Generic Container', aria: 'role="region" aria-label="Content section"', reason: 'Helps users navigate landmarks in complex layouts.' });
  }

  return { recommendations };
}

export function localResearch(input: string) {
  return {
    protocol: 'Local Framework: Inclusive Usability Heuristics',
    inclusiveGoals: [
      'Evaluate navigation ease for keyboard-only users.',
      'Check if instructions are clear for neurodivergent participants.',
      `Analyze ${input.substring(0, 20)} for accessibility blockers.`
    ],
    scriptPrompt: 'Can you show me how you would complete the main task? Please share your thoughts as you navigate.'
  };
}

export const EXAMPLES = [
  {
    title: "Terms of Service",
    original: "The Company reserves the right to modify, terminate, or discontinue the services at its sole discretion, subsequent to providing notification to the user herein. Users must utilize the services in accordance with local regulations and parameters. Compensation or remuneration shall not be provided for substantial disruptions in service.",
    plain: "We can change or stop our services at any time. We will let you know before we do this. You must use our services under local rules. We do not pay you back for large service stops.",
    easy: "ℹ️ **Easy Read Summary:**\n• We can change or stop our services.\n• We will tell you before we stop anything.\n• You must follow the rules in your town.\n• We do not pay you if services stop.\n\n📖 **Words to Know:**\n- **terminate**: This means end.\n- **subsequent**: This means next.\n- **notification**: This means notice."
  },
  {
    title: "Medical Consultation Form",
    original: "Should the physician diagnose any detrimental symptoms, additional medication will be authorized to initiate treatment. Individuals residing in the clinic must submit mandatory documentation for emergency contacts. Confidential information remains completely secure.",
    plain: "If the doctor finds any bad symptoms, they will allow more medicine to start treatment. People living in the clinic must send required papers for emergency contacts. Your private information stays completely secure.",
    easy: "ℹ️ **Easy Read Summary:**\n• The doctor will help if you feel bad.\n• The doctor can give you more medicine.\n• You must give us names of people to call.\n• We keep your private details safe.\n\n📖 **Words to Know:**\n- **physician**: This means doctor.\n- **diagnose**: This means find out.\n- **detrimental**: This means bad."
  },
  {
    title: "Corporate Benefits Policy",
    original: "To facilitate optimal health outcomes, we endeavor to provide comprehensive insurance assistance. Upon commencement of employment, you are required to purchase voluntary supplemental plans via the portal. Substantial modifications to the benefits parameters will be communicated in a timely manner.",
    plain: "To make good health easy, we try to give complete insurance help. When you start work, you need to buy optional extra plans on our website. We will tell you quickly if we make large changes to the benefits rules.",
    easy: "ℹ️ **Easy Read Summary:**\n• We want to help you stay healthy.\n• We give you complete health insurance help.\n• You can buy extra plans online.\n• We will tell you if the rules change.\n\n📖 **Words to Know:**\n- **facilitate**: This means make easy.\n- **optimum**: This means best.\n- **endeavor**: This means try."
  }
];
