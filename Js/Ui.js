// js/ui.js

// 1. IMPORTS
import { dictionary, currentLang, setCurrentLang, currentTool, setCurrentTool, getToolsConfig } from './config.js';
import { currentUser, userProfileContext, userSocialAvatar } from './firebase.js';

// 2. UI DOM VARIABLES
export const mainInput = document.getElementById('mainInput');
export const optionsSection = document.getElementById('optionsSection');
export const resultsContainer = document.getElementById('resultsContainer');
export const emptyState = document.getElementById('emptyState');
export const emptyStateText = document.getElementById('emptyStateText');
export const loadingState = document.getElementById('loadingState');
export const inputSection = document.getElementById('inputSection');
export const outputSection = document.getElementById('outputSection');

// 3. UI FUNCTIONS

// ── Mobile tab switching ──────────────────────────────────
export const showMobileTab = (tab) => {
    const isInput = tab === 'input';
    const inputBtn  = document.getElementById('tabInputBtn');
    const outputBtn = document.getElementById('tabOutputBtn');
    const badge     = document.getElementById('resultsBadge');

    if (isInput) {
        inputSection.classList.add('mobile-active');
        outputSection.classList.remove('mobile-active');
        inputBtn.className  = 'flex items-center justify-center gap-2 py-3 text-sm font-semibold transition bg-purple-600 text-white';
        outputBtn.className = 'flex items-center justify-center gap-2 py-3 text-sm font-semibold transition text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700/50';
    } else {
        outputSection.classList.add('mobile-active');
        inputSection.classList.remove('mobile-active');
        outputBtn.className = 'flex items-center justify-center gap-2 py-3 text-sm font-semibold transition bg-purple-600 text-white';
        inputBtn.className  = 'flex items-center justify-center gap-2 py-3 text-sm font-semibold transition text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700/50';
        badge.classList.add('hidden'); // clear badge when results tab opened
    }
};

// Light up the badge and flip to results tab on mobile after generation
export const notifyMobileResults = () => {
    const isMobile = window.innerWidth < 1024;
    if (!isMobile) return;
    const badge = document.getElementById('resultsBadge');
    badge.classList.remove('hidden');
    // Auto-flip to results tab
    showMobileTab('output');
};
// ─────────────────────────────────────────────────────────

export const updateDynamicToolUI = () => {
    const dynamicUI = document.getElementById('dynamicToolUI');
    dynamicUI.innerHTML = ''; 
    const d = dictionary[currentLang];
    const config = getToolsConfig()[currentTool];

    if (currentTool !== 'profile' && currentTool !== 'history') {
        let labelHtml = config.inputLabel;
        if (config.optionalWithContext && userProfileContext) {
            labelHtml += ` <span class="text-green-600 dark:text-green-400 text-xs mx-2 font-bold"><i class="fa-solid fa-magic"></i> ${d.lblOptional}</span>`;
        }
        document.getElementById('mainInputLabel').innerHTML = labelHtml;
    }

    if (currentTool === 'profile') {
        dynamicUI.classList.remove('hidden');
        if (currentUser && !currentUser.isAnonymous) {
            const googlePhoto = currentUser.photoURL || '';
            let avatarHtml = '';
            let titleText = 'Account Linked';
            if (userSocialAvatar) {
                const fallbackImg = googlePhoto ? googlePhoto : 'https://ui-avatars.com/api/?name=Creator&background=random';
                avatarHtml = `<img src="${userSocialAvatar}" onerror="this.onerror=null; this.src='${fallbackImg}';" class="w-12 h-12 rounded-full border-2 border-green-500 shadow-md object-cover bg-white">`;
                titleText = 'Social Profile Linked!';
            } else if (googlePhoto) {
                avatarHtml = `<img src="${googlePhoto}" class="w-10 h-10 rounded-full border-2 border-white dark:border-gray-700 shadow-sm object-cover">`;
            } else {
                avatarHtml = `<div class="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 flex items-center justify-center text-white"><i class="fa-solid fa-user"></i></div>`;
            }
            dynamicUI.innerHTML = `
                <div class="flex items-center gap-4 bg-white/50 dark:bg-gray-800/50 p-4 rounded-xl border border-gray-200 dark:border-gray-700 mt-2 shadow-sm">
                    ${avatarHtml}
                    <div>
                        <p class="text-sm font-bold text-gray-800 dark:text-gray-200">${titleText}</p>
                        <p class="text-xs text-green-600 dark:text-green-400 font-medium mt-0.5"><i class="fa-solid fa-cloud-arrow-up mx-1"></i> Ready</p>
                    </div>
                </div>
            `;
        } else {
            dynamicUI.innerHTML = `
                <div class="p-4 bg-amber-50 dark:bg-amber-900/20 text-amber-800 dark:text-amber-400 text-sm rounded-xl border border-amber-200 dark:border-amber-800/30 flex items-start gap-3 shadow-sm">
                    <i class="fa-solid fa-triangle-exclamation mt-0.5 text-amber-500 text-lg"></i>
                    <div>
                        <p class="font-bold mb-1">Wait! You are not signed in.</p>
                        <p class="text-xs opacity-90 leading-relaxed">Please sign in with Google before saving your context.</p>
                    </div>
                </div>
            `;
        }
    } else {
        dynamicUI.classList.add('hidden');
    }
};

export const switchTool = (toolKey, event) => {
    if(event) event.preventDefault();
    setCurrentTool(toolKey); 
    const config = getToolsConfig()[toolKey];
    const d = dictionary[currentLang];

    if(event) {
        document.querySelectorAll('.nav-item').forEach(el => el.classList.remove('active'));
        event.currentTarget.classList.add('active');
    }

    if (toolKey === 'history') {
        if (window.innerWidth < 1024) {
            inputSection.classList.remove('mobile-active');
            outputSection.classList.add('mobile-active');
        } else {
            inputSection.classList.add('hidden');
        }
        outputSection.classList.remove('lg:w-1/2');
        outputSection.classList.add('w-full');
        
        document.getElementById('rightSideTitle').innerText = d.titleHistory;
        document.getElementById('clearBtn').classList.add('hidden');
        document.getElementById('exportCsvBtn').classList.remove('hidden'); 
        
        if (typeof renderHistoryList === 'function') renderHistoryList();
    } else {
        if (window.innerWidth < 1024) {
            showMobileTab('input');
        } else {
            inputSection.classList.remove('hidden');
        }
        outputSection.classList.add('lg:w-1/2');
        outputSection.classList.remove('w-full');
        
        document.getElementById('toolTitleText').innerText = config.title;
        document.getElementById('toolDesc').innerText = config.desc;
        document.getElementById('toolIcon').className = config.icon;
        mainInput.placeholder = config.placeholder;
        document.getElementById('btnText').innerText = config.btnText || d.btnBio;
        
        document.getElementById('rightSideTitle').innerText = d.titleResults;
        document.getElementById('clearBtn').classList.remove('hidden');
        document.getElementById('exportCsvBtn').classList.add('hidden'); 
        
        optionsSection.classList.toggle('hidden', !config.showOptions);
        
        if (typeof clearResults === 'function') clearResults();

        if (toolKey === 'profile' && userProfileContext) {
            mainInput.value = userProfileContext;
        }
    }

    updateDynamicToolUI(); 
    if (typeof toggleMobileMenu === 'function') toggleMobileMenu(true); 
};
