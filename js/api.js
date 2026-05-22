// js/api.js

import { getToolsConfig, currentTool, currentLang } from './config.js';
import { userProfileContext, saveUserProfileContext } from './firebase.js';
import { mainInput, emptyState, resultsContainer, loadingState, showToast, renderErrorCard, renderResults, notifyMobileResults } from './ui.js';

// --- API URL CONFIGURATION ---
const apiKey = ""; // Provided by execution environment automatically
const isNetlifyOrVercel = window.location.hostname.includes('netlify.app') || window.location.hostname.includes('vercel.app');

// Use preview model when running in sandbox environment, preserve Vercel route for production
export const API_URL = isNetlifyOrVercel 
    ? `/api/generate` 
    : `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`;

// --- GENERATION FUNCTION ---
export const generateContent = async () => {
    let inputText = mainInput.value.trim();
    const platform = document.getElementById('platformSelect').value;
    const tone = document.querySelector('input[name="tone"]:checked').value;
    const config = getToolsConfig()[currentTool];

    // Guard: advice tool has its own dedicated runner — never handled here
    if (currentTool === 'advice') return;

    if (currentTool === 'profile') {
        if (!inputText) {
            showToast("Please enter your profile link or bio first!");
            return;
        }
        saveUserProfileContext(inputText); // We assume this is exported from firebase.js
        return;
    }

    if (!inputText) {
        if (config.optionalWithContext && userProfileContext) {
            inputText = "Generate this purely based on my saved Profile Context.";
        } else {
            showToast("Please fill out the input box first!");
            return;
        }
    }

    emptyState.classList.add('hidden');
    Array.from(resultsContainer.querySelectorAll('.result-card')).forEach(el => el.remove());
    loadingState.classList.remove('hidden');
    loadingState.classList.add('flex');
    
    const btn = document.getElementById('generateBtn');
    btn.disabled = true;
    btn.classList.add('opacity-50');

    let systemPrompt = "";
    if (currentTool === 'bio') {
        systemPrompt = `You are an expert copywriter. Generate EXACTLY 3 unique bio options based on the user input. Platform: ${platform}. Tone: ${tone}. Include emojis. Format strictly as a JSON array of strings.`;
    } else if (currentTool === 'caption') {
        systemPrompt = `You are a social media manager. Generate EXACTLY 3 highly engaging captions for a ${platform} post. Tone: ${tone}. Include hooks, emojis, and hashtags. Format strictly as a JSON array of strings.`;
    } else if (currentTool === 'hook') {
        systemPrompt = `You are a TikTok producer. Generate EXACTLY 5 scroll-stopping opening verbal hooks (1-2 sentences each) for the video topic. Format strictly as a JSON array of strings.`;
    } else if (currentTool === 'roast') {
        systemPrompt = `You are a comedian. Item 1: A sarcastic roast of their bio. Item 2: A professional rewrite of their bio. Format strictly as a JSON array of exactly 2 strings.`;
    } else if (currentTool === 'planner') {
        systemPrompt = `You are a master content strategist. The user will provide their niche/topic. Generate a 7-day viral content calendar for ${platform} in a ${tone} tone. Return EXACTLY 7 items. Each item must be a single string representing one day, formatted exactly like this:\n\n📅 Day 1: [Catchy Video Title]\n💡 Hook: [The first 3 seconds of script]\n🎬 Concept: [1-2 sentences explaining the video]\n\nFormat strictly as a JSON array of 7 strings.`;
    }

    if (userProfileContext) {
        systemPrompt += `\n\nCRITICAL CONTEXT: Deeply personalize the results using this background information/link about the user: "${userProfileContext}". Integrate this persona naturally into the generated content.`;
    }

    if (currentLang === 'ku') {
        systemPrompt += `\n\nCRITICAL LANGUAGE REQUIREMENT: You MUST translate and write the final output entirely in Sorani Kurdish using the Arabic alphabet. Ensure the output is natural and professional in Kurdish. Do not output English unless absolutely necessary for a brand name. Keep the JSON Array structure exactly the same.`;
    }

    const payload = {
        contents: [{ parts: [{ text: `Input: ${inputText}` }] }],
        systemInstruction: { parts: [{ text: systemPrompt }] },
        generationConfig: {
            responseMimeType: "application/json",
            responseSchema: { type: "ARRAY", items: { type: "STRING" } }
        }
    };

    let attempt = 0;
    const maxRetries = 5;
    const delays = [1000, 2000, 4000, 8000, 16000];
    let response;
    let finalError = null;

    try {
        while (attempt <= maxRetries) {
            try {
                response = await fetch(API_URL, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                });
                
                if (response.ok) {
                    finalError = null;
                    break; 
                }
                
                if (attempt === maxRetries) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
            } catch (e) {
                finalError = e;
                if (attempt === maxRetries) throw e;
            }
            
            await new Promise(r => setTimeout(r, delays[attempt]));
            attempt++;
        }

        if (!response || !response.ok) {
            let errKey = 'errServer';
            if (response && response.status === 429) errKey = 'errServer'; 
            if (response && response.status >= 500) errKey = 'errServer';
            renderErrorCard(errKey, response ? response.status : null);
            return;
        }

        const data = await response.json();
        const rawText = data.candidates?.[0]?.content?.parts?.[0]?.text;

        let resultsArray;
        try {
            resultsArray = JSON.parse(rawText);
        } catch (parseErr) {
            renderErrorCard('errParse');
            return;
        }

        renderResults(resultsArray);
        notifyMobileResults(); 

    } catch (error) {
        const isOffline = !navigator.onLine || error instanceof TypeError;
        renderErrorCard(isOffline ? 'errNetwork' : 'errGeneric');
    } finally {
        loadingState.classList.add('hidden');
        loadingState.classList.remove('flex');
        btn.disabled = false;
        btn.classList.remove('opacity-50');
    }
};
