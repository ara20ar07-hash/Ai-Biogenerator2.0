// js/app.js

import * as UI from './ui.js';
import { generateContent } from './api.js';
import { saveSingleResult, signInWithGoogle, handleSignOut, exportHistoryCSV } from './firebase.js';

// 1. Attach functions to window
window.switchTool      = UI.switchTool;
window.copyToClipboard = UI.copyToClipboard;
window.showToast       = UI.showToast;
window.toggleTheme     = UI.toggleTheme;
window.toggleLanguage  = UI.toggleLanguage;   // ← THIS WAS MISSING
window.clearResults    = UI.clearResults;
window.showMobileTab   = UI.showMobileTab;
window.generateContent = generateContent;
window.saveSingleResult = saveSingleResult;
window.signInWithGoogle = signInWithGoogle;
window.handleSignOut    = handleSignOut;
window.exportHistoryCSV = exportHistoryCSV;

// 2. Event listeners
const platformSelectBtn  = document.getElementById('platformSelectBtn');
const platformDropdownMenu = document.getElementById('platformDropdownMenu');

platformSelectBtn.addEventListener('click', () => platformDropdownMenu.classList.toggle('hidden'));

document.querySelectorAll('.platform-option').forEach(option => {
    option.addEventListener('click', () => {
        document.getElementById('platformSelect').value = option.getAttribute('data-value');
        document.getElementById('selectedPlatformDisplay').innerHTML = option.innerHTML;
        platformDropdownMenu.classList.add('hidden');
    });
});

document.getElementById('mobileMenuBtn').addEventListener('click', () => UI.toggleMobileMenu());
document.getElementById('overlay').addEventListener('click', () => UI.toggleMobileMenu(true));
document.getElementById('generateBtn').addEventListener('click', generateContent);
UI.mainInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) generateContent();
});

// 3. Initialize
UI.switchTool('bio', null);
