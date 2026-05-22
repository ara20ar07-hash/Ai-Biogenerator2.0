// js/advice.js
import { currentLang, dictionary } from './config.js';
import { userProfileContext } from './firebase.js';
import { showToast } from './ui.js';
import { API_URL } from './api.js';

// ─── Build the structured mega-prompt ───────────────────────────────────────
function buildAdvicePrompt(profileText, comparators, platform, niche) {
  const comparatorBlock = comparators.trim()
    ? `\n\nCOMPARATOR CREATORS (similar niche, public data provided by user):\n${comparators}`
    : '\n\nNo comparator data provided — infer typical benchmarks for this niche from your training knowledge.';

  return `You are an elite social media growth strategist with deep expertise in content virality, audience psychology, and platform algorithms (Instagram, TikTok, YouTube, Twitter/X, LinkedIn).

A creator needs a full growth audit. Analyse their profile and return a deeply personalised, evidence-based report.

CREATOR PROFILE & CONTENT:
"""
${profileText}
"""

PLATFORM: ${platform || 'Not specified — infer from content'}
NICHE: ${niche || 'Not specified — infer from content'}
${comparatorBlock}

YOUR TASK:
Produce a rigorous growth audit. Think like a top-tier consultant. Be specific, blunt, and actionable. No generic advice.

Return ONLY valid JSON matching this exact schema — no markdown, no preamble:

{
  "executiveSummary": {
    "mainOpportunity": "string — 1-2 sentence headline insight",
    "confidenceScore": number (0-100),
    "verdict": "string — one of: needs_work | on_track | strong"
  },
  "profileScore": {
    "overall": number (0-100),
    "bio": number (0-100),
    "consistency": number (0-100),
    "hooks": number (0-100),
    "engagement": number (0-100),
    "posting": number (0-100)
  },
  "recommendations": [
    {
      "priority": number (1-5),
      "title": "string",
      "why": "string — the specific evidence from their profile",
      "howToImplement": ["string", "string", "string"],
      "expectedImpact": "string",
      "timeframe": "string (e.g. 1-2 weeks)",
      "effort": "string — one of: low | medium | high"
    }
  ],
  "contentExamples": [
    {
      "type": "string — one of: bio_rewrite | hook_rewrite | caption_rewrite | thumbnail_concept",
      "label": "string",
      "before": "string — their current version (or [no example provided])",
      "after": "string — your improved version",
      "whyItWorks": "string"
    }
  ],
  "tacticalPlaybook": {
    "postingCadence": "string",
    "bestPostingTimes": ["string"],
    "hashtagStrategy": {
      "tier1": ["string"],
      "tier2": ["string"],
      "tier3": ["string"],
      "explanation": "string"
    },
    "ctaTemplates": ["string"],
    "crossPostPlan": "string",
    "contentMix": "string"
  },
  "benchmarking": {
    "summary": "string — how they compare overall",
    "metrics": [
      {
        "metric": "string",
        "theirEstimate": "string",
        "benchmarkRange": "string",
        "gap": "string — positive or negative delta",
        "status": "string — one of: behind | on_par | ahead"
      }
    ]
  },
  "abTests": [
    {
      "hypothesis": "string",
      "control": "string — current approach",
      "variant": "string — what to test",
      "metric": "string — what to measure",
      "duration": "string"
    }
  ]
}

Rules:
- recommendations array must have EXACTLY 5 items, priority 1 = highest impact
- contentExamples array must have EXACTLY 3 items
- abTests array must have EXACTLY 3 items
- benchmarking.metrics must have EXACTLY 5 items
- Be specific to THIS creator's content. No boilerplate.
- If data is sparse, use what you have and flag assumptions in the text.`;
}

// ─── Run the analysis ────────────────────────────────────────────────────────
export const runAdviceAnalysis = async ({
  profileText,
  comparators,
  platform,
  niche,
  onStart,
  onResult,
  onError,
}) => {
  const finalProfile = profileText.trim() ||
    (userProfileContext ? `Saved profile context: ${userProfileContext}` : '');

  if (!finalProfile) {
    showToast('Please describe your profile or paste some content first!');
    return;
  }

  onStart?.();

  const systemPrompt = buildAdvicePrompt(finalProfile, comparators || '', platform, niche);

  const payload = {
    contents: [{ parts: [{ text: 'Run the full growth audit.' }] }],
    systemInstruction: { parts: [{ text: systemPrompt }] },
    generationConfig: {
      responseMimeType: 'application/json',
      temperature: 0.4,
      maxOutputTokens: 4096,
    },
  };

  const endpoint = window.location.hostname.includes('netlify.app') ||
    window.location.hostname.includes('vercel.app')
    ? '/api/advice'
    : API_URL;

  let attempt = 0;
  const delays = [1000, 2000, 4000];

  while (attempt <= 3) {
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.error || `HTTP ${response.status}`);
      }

      const data = await response.json();

      // Extract the raw text safely from our clean Groq server output
      const rawText = data.text;

      if (!rawText) throw new Error('Empty response from AI engine');

      // Strip any accidental markdown blocks and parse the JSON report string
      const clean = rawText.replace(/```json|```/g, '').trim();
      const report = JSON.parse(clean);

      // Pass the fully parsed JSON object to your UI component
      onResult?.(report);
      return; 
    } catch (err) {
      if (attempt === 3) {
        console.error('Advice analysis failed:', err);
        showToast(err.message || "Generation failed.");
        onError?.(err);
        return;
      }
      await new Promise(r => setTimeout(r, delays[attempt]));
      attempt++;
    }
  }
};
