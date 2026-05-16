// js/api.js

const apiKey = ""; // Provided by execution environment automatically
const isNetlifyOrVercel = window.location.hostname.includes('netlify.app') || window.location.hostname.includes('vercel.app');

// Use preview model when running in sandbox environment, preserve Vercel route for production
export const API_URL = isNetlifyOrVercel 
    ? `/api/generate` 
    : `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`;

// ... your generateContent function will go below here ...
