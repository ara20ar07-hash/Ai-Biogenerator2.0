// js/app.js

import * as UI from './ui.js';
import { generateContent } from './api.js';
import { saveSingleResult } from './firebase.js'; // Assuming this is in your firebase file

// 1. Attach necessary functions to the global window object 
// This ensures your HTML 'onclick' buttons still work without changing the HTML code!
window.switchTool = UI.switchTool;
window.copyToClipboard = UI.copyToClipboard;
window.showToast = UI.showToast;
window.toggleTheme = UI.toggleTheme;
window.clearResults = UI.clearResults;
window.showMobileTab = UI.showMobileTab;
window.generateContent = generateContent;
window.saveSingleResult = saveSingleResult; 

// 2. Attach Event Listeners
const platformSelectBtn = document.getElementById('platformSelectBtn');
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

// 3. Initialize the app
UI.switchTool('bio', null);
