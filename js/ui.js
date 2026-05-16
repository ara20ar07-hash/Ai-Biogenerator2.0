// js/ui.js
import { dictionary, currentLang, currentTool, setCurrentTool, getToolsConfig } from './config.js';
import { currentUser, userProfileContext, userSocialAvatar, generationHistory } from './firebase.js';

// --- UI DOM VARIABLES ---
export const mainInput = document.getElementById('mainInput');
export const optionsSection = document.getElementById('optionsSection');
export const resultsContainer = document.getElementById('resultsContainer');
export const emptyState = document.getElementById('emptyState');
export const emptyStateText = document.getElementById('emptyStateText');
export const loadingState = document.getElementById('loadingState');
export const inputSection = document.getElementById('inputSection');
export const outputSection = document.getElementById('outputSection');

// --- UI STATE MANAGEMENT ---
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
        badge.classList.add('hidden'); 
    }
};

export const notifyMobileResults = () => {
    const isMobile = window.innerWidth < 1024;
    if (!isMobile) return;
    const badge = document.getElementById('resultsBadge');
    badge.classList.remove('hidden');
    showMobileTab('output');
};

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
        
        renderHistoryList();
    } else {
        if (window.innerWidth < 1024) showMobileTab('input');
        else inputSection.classList.remove('hidden');
        
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
        clearResults();

        if (toolKey === 'profile' && userProfileContext) {
            mainInput.value = userProfileContext;
        }
    }

    updateDynamicToolUI(); 
    toggleMobileMenu(true); 
};

// --- RENDERING FUNCTIONS ---
export const renderHistoryList = () => {
    Array.from(resultsContainer.querySelectorAll('.result-card')).forEach(el => el.remove());
    const d = dictionary[currentLang];
    
    if (!currentUser) {
        emptyState.classList.remove('hidden');
        emptyStateText.innerText = d.emptyLogin;
        return;
    }

    if (generationHistory.length === 0) {
        emptyState.classList.remove('hidden');
        emptyStateText.innerText = d.emptyHistory;
        return;
    }

    emptyState.classList.add('hidden');

    generationHistory.forEach(item => {
        const date = new Date(item.timestamp).toLocaleDateString();
        const card = document.createElement('div');
        card.className = "result-card bg-white dark:bg-gray-800 p-5 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm relative mb-4";
        
        let resultsHtml = item.results.map(res => 
            `<div class="bg-gray-50 dark:bg-gray-700/50 p-3 rounded-lg text-sm text-gray-700 dark:text-gray-300 mb-2 relative group">
                <p class="px-6 whitespace-pre-wrap">${res}</p>
                <button onclick='window.copyToClipboard(${JSON.stringify(res).replace(/'/g, "&#39;")})' class="absolute top-2 right-2 rtl:left-2 rtl:right-auto text-gray-400 hover:text-purple-500 opacity-0 group-hover:opacity-100 transition"><i class="fa-regular fa-copy"></i></button>
            </div>`
        ).join('');

        card.innerHTML = `
            <div class="flex justify-between items-start mb-3">
                <span class="text-xs font-bold text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/30 px-2 py-1 rounded">${item.tool}</span>
                <span class="text-xs text-gray-400">${date}</span>
            </div>
            <p class="text-sm font-medium text-gray-600 dark:text-gray-400 mb-3 border-s-2 border-gray-200 dark:border-gray-600 px-2">"${item.input}"</p>
            <div class="space-y-2">
                ${resultsHtml}
            </div>
        `;
        resultsContainer.appendChild(card);
    });
};

export const renderErrorCard = (errKey, statusCode) => {
    const d = dictionary[currentLang];
    emptyState.classList.add('hidden');
    const card = document.createElement('div');
    card.className = 'result-card error-shake mb-4';

    const iconMap = {
        errServer:  { icon: 'fa-server',       color: 'text-orange-500', bg: 'bg-orange-50 dark:bg-orange-900/20', border: 'border-orange-200 dark:border-orange-800/40' },
        errNetwork: { icon: 'fa-wifi-slash',    color: 'text-red-500',    bg: 'bg-red-50 dark:bg-red-900/20',       border: 'border-red-200 dark:border-red-800/40' },
        errParse:   { icon: 'fa-triangle-exclamation', color: 'text-yellow-500', bg: 'bg-yellow-50 dark:bg-yellow-900/20', border: 'border-yellow-200 dark:border-yellow-800/40' },
        errGeneric: { icon: 'fa-circle-xmark', color: 'text-red-500',    bg: 'bg-red-50 dark:bg-red-900/20',       border: 'border-red-200 dark:border-red-800/40' }
    };
    const style = iconMap[errKey] || iconMap.errGeneric;
    const message = d[errKey] || d.errGeneric;
    const statusHtml = statusCode ? `<span class="ml-2 text-xs font-mono text-gray-400">HTTP ${statusCode}</span>` : '';

    card.innerHTML = `
        <div class="flex items-start gap-4 p-5 rounded-xl border ${style.bg} ${style.border}">
            <div class="mt-0.5 w-10 h-10 rounded-full flex items-center justify-center bg-white/60 dark:bg-gray-900/40 flex-shrink-0 shadow-sm">
                <i class="fa-solid ${style.icon} ${style.color} text-lg"></i>
            </div>
            <div class="flex-1 min-w-0">
                <p class="text-sm font-semibold text-gray-800 dark:text-gray-100 flex items-center flex-wrap gap-1">
                    Oops, something went wrong${statusHtml}
                </p>
                <p class="text-sm text-gray-600 dark:text-gray-400 mt-1 leading-relaxed">${message}</p>
                <button onclick="window.generateContent()" class="mt-3 inline-flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 shadow-sm transition active:scale-95">
                    <i class="fa-solid fa-rotate-right"></i> ${d.errRetry}
                </button>
            </div>
        </div>
    `;
    resultsContainer.appendChild(card);
    notifyMobileResults();
};

export const renderResults = (resultsArray) => {
    const currentInputText = mainInput.value.trim();
    const currentToolTitle = getToolsConfig()[currentTool].title;

    resultsArray.forEach((text, index) => {
        const card = document.createElement('div');
        card.className = "result-card bg-white dark:bg-gray-800 p-5 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm relative group mb-4";
        
        let labelHtml = "";
        if (currentTool === 'roast') {
            const labelText = index === 0 ? "🔥" : "✨";
            const labelColor = index === 0 ? "text-orange-500 bg-orange-50 dark:bg-orange-900/30" : "text-purple-600 bg-purple-50 dark:bg-purple-900/30";
            labelHtml = `<span class="inline-block px-2 py-1 rounded text-xs font-bold mb-2 ${labelColor}">${labelText}</span><br>`;
        }

        const safeText = JSON.stringify(text).replace(/'/g, "&#39;").replace(/"/g, "&quot;");
        const safeInput = JSON.stringify(currentInputText).replace(/'/g, "&#39;").replace(/"/g, "&quot;");
        const safeTitle = JSON.stringify(currentToolTitle).replace(/"/g, "&quot;");

        let saveButtonHtml = "";
        if (currentTool !== 'profile') {
            saveButtonHtml = `
                <button onclick='window.saveSingleResult(${safeTitle}, ${safeInput}, ${safeText}, this)' class="text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition p-2 rounded-lg hover:bg-blue-50 dark:hover:bg-gray-700" title="Save to History">
                    <i class="fa-regular fa-bookmark"></i>
                </button>
            `;
        }

        card.innerHTML = `
            ${labelHtml}
            <p class="text-gray-700 dark:text-gray-200 text-sm whitespace-pre-wrap px-12 leading-relaxed">${text}</p>
            <div class="absolute top-3 right-3 rtl:left-3 rtl:right-auto flex gap-1 opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition">
                ${saveButtonHtml}
                <button onclick='window.copyToClipboard(${safeText})' class="text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition p-2 rounded-lg hover:bg-purple-50 dark:hover:bg-gray-700" title="Copy text">
                    <i class="fa-regular fa-copy"></i>
                </button>
            </div>
        `;
        resultsContainer.appendChild(card);
    });
};

export const clearResults = () => {
    Array.from(resultsContainer.querySelectorAll('.result-card')).forEach(el => el.remove());
    emptyState.classList.remove('hidden');
    if(currentTool !== 'profile') mainInput.value = "";
};

export const copyToClipboard = (text) => {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
    showToast(dictionary[currentLang].toastCopy);
};

export const showToast = (msg) => {
    const toast = document.getElementById('toast');
    toast.textContent = msg;
    toast.classList.remove('opacity-0');
    setTimeout(() => toast.classList.add('opacity-0'), 2500);
};

export const toggleTheme = () => {
    const html = document.documentElement;
    html.classList.toggle('dark');
    const isDark = html.classList.contains('dark');
    document.getElementById('desktopThemeIcon').className = `fa-solid ${isDark ? 'fa-sun text-yellow-400' : 'fa-moon'} w-5 text-center`;
    document.getElementById('mobileThemeIcon').className = `fa-solid ${isDark ? 'fa-sun text-yellow-400' : 'fa-moon'}`;
};

export const toggleMobileMenu = (forceClose = false) => {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('overlay');
    if (forceClose || !sidebar.classList.contains('-translate-x-full')) {
        sidebar.classList.add('-translate-x-full');
        overlay.classList.add('hidden');
    } else {
        sidebar.classList.remove('-translate-x-full');
        overlay.classList.remove('hidden');
    }
};
