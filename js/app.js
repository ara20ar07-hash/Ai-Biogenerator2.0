// js/app.js

import * as UI from './ui.js';
import { generateContent } from './api.js';
import { saveSingleResult, signInWithGoogle, handleSignOut, exportHistoryCSV } from './firebase.js';
import { runAdviceAnalysis } from './advice.js';
import { renderAdviceReport } from './advice-ui.js';
import { getCurrentTool } from './config.js';

// 1. Attach functions to window so onclick="..." in HTML can reach them
window.switchTool       = UI.switchTool;
window.copyToClipboard  = UI.copyToClipboard;
window.showToast        = UI.showToast;
window.toggleTheme      = UI.toggleTheme;
window.toggleLanguage   = UI.toggleLanguage;
window.clearResults     = UI.clearResults;
window.showMobileTab    = UI.showMobileTab;
window.generateContent  = generateContent;
window.saveSingleResult = saveSingleResult;
window.signInWithGoogle = signInWithGoogle;
window.handleSignOut    = handleSignOut;
window.exportHistoryCSV = exportHistoryCSV;

// 2. Single handler that decides which generator to run
function handleGenerate() {
    if (getcurrentTool() === 'advice') {
        // --- Advice tool path ---
        const profileText = UI.mainInput.value.trim();
        const comparators = document.getElementById('adviceComparators')?.value || '';
        const niche       = document.getElementById('adviceNiche')?.value || '';
        const platform    = document.getElementById('platformSelect')?.value || '';
        const container   = UI.resultsContainer;
        const btn         = document.getElementById('generateBtn');

        runAdviceAnalysis({
            profileText,
            comparators,
            niche,
            platform,
            onStart() {
                UI.emptyState.classList.add('hidden');
                Array.from(container.querySelectorAll('.result-card')).forEach(el => el.remove());
                UI.loadingState.classList.remove('hidden');
                UI.loadingState.classList.add('flex');
                btn.disabled = true;
                btn.classList.add('opacity-50');
            },
            onResult(report) {
                UI.loadingState.classList.add('hidden');
                UI.loadingState.classList.remove('flex');
                btn.disabled = false;
                btn.classList.remove('opacity-50');
                renderAdviceReport(report, container);
                UI.notifyMobileResults();
            },
            onError() {
                UI.loadingState.classList.add('hidden');
                UI.loadingState.classList.remove('flex');
                btn.disabled = false;
                btn.classList.remove('opacity-50');
                UI.renderErrorCard('errGeneric', null);
            },
        });

    } else {
        // --- All other tools path (unchanged behaviour) ---
        generateContent();
    }
}

// 3. Event listeners
const platformSelectBtn    = document.getElementById('platformSelectBtn');
const platformDropdownMenu = document.getElementById('platformDropdownMenu');

platformSelectBtn.addEventListener('click', () => {
    platformDropdownMenu.classList.toggle('hidden');
});

document.querySelectorAll('.platform-option').forEach(option => {
    option.addEventListener('click', () => {
        document.getElementById('platformSelect').value = option.getAttribute('data-value');
        document.getElementById('selectedPlatformDisplay').innerHTML = option.innerHTML;
        platformDropdownMenu.classList.add('hidden');
    });
});

document.getElementById('mobileMenuBtn').addEventListener('click', () => UI.toggleMobileMenu());
document.getElementById('overlay').addEventListener('click', () => UI.toggleMobileMenu(true));

// Generate button now calls handleGenerate instead of generateContent directly
document.getElementById('generateBtn').addEventListener('click', handleGenerate);

UI.mainInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) handleGenerate();
});

// 4. Boot the app
UI.switchTool('bio', null);
