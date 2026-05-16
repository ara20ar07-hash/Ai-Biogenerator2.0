// At the very top of js/ui.js
import { dictionary, currentLang, setCurrentLang, currentTool } from './config.js';

// ... other UI functions ...

export const toggleLanguage = () => {
    // 1. Update the language state safely
    const newLang = currentLang === 'en' ? 'ku' : 'en';
    setCurrentLang(newLang);
    
    // 2. RTL Flip
    document.documentElement.dir = newLang === 'ku' ? 'rtl' : 'ltr';
    
    // 3. Toggle Button Text
    const langText = newLang === 'ku' ? 'English / EN' : 'کوردی / KU';
    document.getElementById('desktopLangBtn').innerText = langText;
    document.getElementById('mobileLangBtn').innerText = newLang === 'ku' ? 'EN' : 'KU';

    // 4. Translate Static UI
    const d = dictionary[newLang];
    document.getElementById('t_setup').innerText = d.setup;
    document.getElementById('t_navProfile').innerText = d.navProfile;
    document.getElementById('t_tools').innerText = d.tools;
    document.getElementById('t_navBio').innerText = d.navBio;
    document.getElementById('t_navCaption').innerText = d.navCaption;
    document.getElementById('t_navHook').innerText = d.navHook;
    document.getElementById('t_navPlanner').innerText = d.navPlanner;
    document.getElementById('t_navRoast').innerText = d.navRoast;
    document.getElementById('t_account').innerText = d.account;
    document.getElementById('t_navHistory').innerText = d.navHistory;
    document.getElementById('t_navDark').innerText = d.navDark;
    document.getElementById('t_btnSignOut').innerText = d.btnSignOut;
    document.getElementById('t_btnSignIn').innerText = d.btnSignIn;
    document.getElementById('t_syncText').innerText = d.syncText;
    document.getElementById('t_labelPlatform').innerText = d.labelPlatform;
    document.getElementById('t_labelTone').innerText = d.labelTone;
    document.getElementById('t_tonePro').innerText = d.tonePro;
    document.getElementById('t_toneFun').innerText = d.toneFun;
    document.getElementById('t_toneEdgy').innerText = d.toneEdgy;
    document.getElementById('t_btnExport').innerText = d.btnExport;
    document.getElementById('t_btnClear').innerText = d.btnClear;
    document.getElementById('t_loading').innerText = d.loading;
    document.getElementById('t_tabInput').innerText = d.tabInput;
    document.getElementById('t_tabOutput').innerText = d.tabOutput;
    
    // 5. Update Empty States based on history tab
    if (currentTool === 'history') {
        document.getElementById('rightSideTitle').innerText = d.titleHistory;
        // Note: You will need to import currentUser from firebase.js later for this to work perfectly
        // document.getElementById('emptyStateText').innerText = !currentUser ? d.emptyLogin : d.emptyHistory; 
    } else {
        document.getElementById('rightSideTitle').innerText = d.titleResults;
        document.getElementById('emptyStateText').innerText = d.emptyDefault;
    }

    // 6. Refresh Dynamic UI
    // Ensure switchTool is in ui.js or imported!
    switchTool(currentTool, null); 
};
