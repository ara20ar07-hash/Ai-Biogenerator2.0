 <script type="module">
        // --- 0. TRANSLATION ENGINE & RTL SETUP ---
        let currentLang = 'en';
        
        const dictionary = {
            en: {
                setup: "Setup", navProfile: "Profile Context",
                tools: "Tools", navBio: "Bio Generator", navCaption: "Viral Captions", navHook: "Video Hooks", navPlanner: "7-Day Planner", navRoast: "Roast My Profile",
                account: "Account", navHistory: "My History", navDark: "Dark Mode",
                btnSignOut: "Sign Out", btnSignIn: "Sign in", syncText: "Sync history across devices",
                labelPlatform: "Platform", labelTone: "Tone", tonePro: "Pro", toneFun: "Fun", toneEdgy: "Edgy",
                btnExport: "Export CSV", btnClear: "Clear",
                emptyDefault: "Select a tool, fill out the details, and let AI do the magic.",
                emptyLogin: "Please sign in to view your history.",
                emptyHistory: "No history yet. Start generating content and click the save icon!",
                loading: "Crafting AI magic...", toastCopy: "Copied to clipboard!",
                titleResults: "Results", titleHistory: "Saved Generations",
                tabInput: "Fill In", tabOutput: "Results",
                // Error messages
                errServer: "Server error — please try again in a moment.",
                errNetwork: "No connection — check your internet and retry.",
                errParse: "Unexpected response from AI — please try again.",
                errGeneric: "Something went wrong — please try again.",
                errRetry: "Try Again",
                // Tool Config Overrides
                descBio: "Generate the perfect social media bio in seconds.", placeholderBio: "e.g. Fitness coach, love pizza, helping moms get strong...", inputBio: "Tell us about yourself", btnBio: "Generate Bios",
                descCap: "Write engaging captions with emojis and hashtags.", placeholderCap: "e.g. A photo of my cat sleeping on my laptop keyboard.", inputCap: "What is this post/photo about?", btnCap: "Write Captions",
                descHook: "Stop the scroll with 5 catchy opening lines for TikTok/Reels.", placeholderHook: "e.g. 3 ways to organize your desk for maximum productivity.", inputHook: "What is your video about?", btnHook: "Generate Hooks",
                descPlan: "Beat writer's block with a full week of highly engaging video ideas.", placeholderPlan: "e.g. Real estate tips, budget travel, easy healthy recipes...", inputPlan: "What is your niche or topic?", btnPlan: "Generate Planner",
                descRoast: "Get playfully roasted, then get an improved version.", placeholderRoast: "e.g. 'Just a guy trying to make it in the world.'", inputRoast: "Paste your current bio or profile link here:", btnRoast: "Roast Me",
                descProf: "Save your social media link or base bio. The AI will use it to personalize everything.", placeholderProf: "https://www.tiktok.com/@username OR 'I'm a tech reviewer...'", inputProf: "Your Profile Link or Base Bio", btnProf: "Save Context",
                lblOptional: "Optional (Using Saved Context)"
            },
            ku: {
                setup: "ڕێکخستن", navProfile: "زانیاری پرۆفایل",
                tools: "ئامرازەکان", navBio: "دروستکەری بایۆ", navCaption: "کاپشنی ڤایڕەڵ", navHook: "ڕستەی ڕاکێشەری ڤیدیۆ", navPlanner: "پلانی ٧ ڕۆژە", navRoast: "هەڵسەنگاندنی پرۆفایل",
                account: "هەژمار", navHistory: "مێژووەکەم", navDark: "دۆخی تاریک",
                btnSignOut: "چوونە دەرەوە", btnSignIn: "چوونە ژوورەوە", syncText: "مێژووەکەت هاوکات بکە",
                labelPlatform: "پلاتفۆرم", labelTone: "تۆن", tonePro: "پڕۆفیشناڵ", toneFun: "کۆمیدی", toneEdgy: "سەرنجڕاکێش",
                btnExport: "هەناردەکردنی فایل", btnClear: "سڕینەوە",
                emptyDefault: "ئامرازێک هەڵبژێرە، زانیارییەکان پڕبکەرەوە، و با ژیری دەستکرد کارەکانی تر بکات.",
                emptyLogin: "تکایە بڕۆ ژوورەوە بۆ بینینی مێژووەکەت.",
                emptyHistory: "هیچ مێژوویەک نییە. دەست بکە بە دروستکردنی ناوەڕۆک و دوگمەی پاشەکەوتکردن دابگرە!",
                loading: "لە دروستکردندایە...", toastCopy: "لەبەرگیرا!",
                titleResults: "ئەنجامەکان", titleHistory: "مێژووی پاشەکەوتکراو",
                tabInput: "پڕکردنەوە", tabOutput: "ئەنجامەکان",
                // Error messages (Kurdish)
                errServer: "هەڵەی سێرڤەر — تکایە دووبارە هەوڵ بدەرەوە.",
                errNetwork: "کەبڵ نییە — پەیوەندی ئینتەرنێتەکەت بپشکنە.",
                errParse: "وەڵامی نامۆقول لە AI — تکایە دووبارە هەوڵ بدەرەوە.",
                errGeneric: "هەڵەیەک ڕوویدا — تکایە دووبارە هەوڵ بدەرەوە.",
                errRetry: "دووبارە هەوڵ بدە",
                // Tool Config Overrides
                descBio: "لە چەند چرکەیەکدا باشترین بایۆی سۆشیاڵ میدیا دروست بکە.", placeholderBio: "بۆ نموونە: ڕاهێنەری وەرزشی، حەزم لە پیزایە...", inputBio: "باسێکی خۆتمان بۆ بکە", btnBio: "دروستکردنی بایۆ",
                descCap: "کاپشنی سەرنجڕاکێش بنووسە لەگەڵ ئیمۆجی و هاشتاگ.", placeholderCap: "بۆ نموونە: وێنەی پشیلەکەم خەوتووە لەسەر کۆمپیوتەرەکەم.", inputCap: "ئەم پۆستە/وێنەیە دەربارەی چییە؟", btnCap: "نووسینی کاپشن",
                descHook: "٥ ڕستەی دەستپێکی سەرنجڕاکێش دروست بکە بۆ تیکتۆک/ڕیڵز.", placeholderHook: "بۆ نموونە: ٣ ڕێگا بۆ ڕێکخستنی مێزەکەت.", inputHook: "ڤیدیۆکەت دەربارەی چییە؟", btnHook: "دروستکردنی هووک",
                descPlan: "بیرۆکەی ڤیدیۆی زۆر سەرنجڕاکێش بۆ تەواوی هەفتەیەک دروست بکە.", placeholderPlan: "بۆ نموونە: ئامۆژگاری خانووبەرە، گەشتی هەرزان...", inputPlan: "بوار یان بابەتەکەت چییە؟", btnPlan: "دروستکردنی پلان",
                descRoast: "هەڵسەنگاندنێکی کۆمیدیانە وەربگرە، پاشان جۆرێکی باشترکراو.", placeholderRoast: "بۆ نموونە: 'تەنها کوڕێکم هەوڵی ژیان دەدەم.'", inputRoast: "بایۆی ئێستات یان لینکی پرۆفایلەکەت لێرە دابنێ:", btnRoast: "هەڵمەسەنگێنە",
                descProf: "لینکی سۆشیاڵ میدیا یان بایۆکەت پاشەکەوت بکە بۆ تایبەتمەندکردنی ناوەڕۆک.", placeholderProf: "https://www.tiktok.com/@username", inputProf: "لینکی ئەکاونتەکەت دابنێ لێرە", btnProf: "پاشەکەوتکردن",
                lblOptional: "ئارەزوومەندانە (زانیاریت پاشەکەوت کردووە)"
            }
        };

        window.toggleLanguage = function() {
            currentLang = currentLang === 'en' ? 'ku' : 'en';
            
            // RTL Flip
            document.documentElement.dir = currentLang === 'ku' ? 'rtl' : 'ltr';
            
            // Toggle Button Text
            const langText = currentLang === 'ku' ? 'English / EN' : 'کوردی / KU';
            document.getElementById('desktopLangBtn').innerText = langText;
            document.getElementById('mobileLangBtn').innerText = currentLang === 'ku' ? 'EN' : 'KU';

            // Translate Static UI
            const d = dictionary[currentLang];
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
            
            // Update Empty States based on history tab
            if (currentTool === 'history') {
                document.getElementById('rightSideTitle').innerText = d.titleHistory;
                document.getElementById('emptyStateText').innerText = !currentUser ? d.emptyLogin : d.emptyHistory;
            } else {
                document.getElementById('rightSideTitle').innerText = d.titleResults;
                document.getElementById('emptyStateText').innerText = d.emptyDefault;
            }

            // Refresh Dynamic UI
            window.switchTool(currentTool, null); 
        };

        // --- 1. Firebase Setup ---
        import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";
        import { getAuth, signInWithCustomToken, signInAnonymously, onAuthStateChanged, GoogleAuthProvider, signInWithPopup, signOut } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";
        import { getFirestore, collection, addDoc, onSnapshot, doc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";

        // Environment-Aware Configuration
        let firebaseConfig;
        try {
            firebaseConfig = typeof __firebase_config !== 'undefined' ? JSON.parse(__firebase_config) : {
                apiKey: "AIzaSyBmJdtlXRjIVp3cMbQwKCcFGYgwozLjo2k",
                authDomain: "creatorkit-e7832.firebaseapp.com",
                projectId: "creatorkit-e7832",
                storageBucket: "creatorkit-e7832.firebasestorage.app",
                messagingSenderId: "816063437935",
                appId: "1:816063437935:web:03e8a3ec0923eb83f4019a",
                measurementId: "G-XH4E6DHDQ5"
            };
        } catch(e) {
            console.warn("Could not parse config, falling back to default.", e);
        }
        
        const appId = typeof __app_id !== 'undefined' ? __app_id : 'creator-ai-dashboard'; 
        
        let app, auth, db, currentUser = null;
        let generationHistory = [];
        let userProfileContext = ""; 
        let userSocialAvatar = ""; 

        try {
            app = initializeApp(firebaseConfig);
            auth = getAuth(app);
            db = getFirestore(app);

            const initAuth = async () => {
                try {
                    if (typeof __initial_auth_token !== 'undefined' && __initial_auth_token) {
                        await signInWithCustomToken(auth, __initial_auth_token);
                    } else {
                        await signInAnonymously(auth);
                    }
                } catch (error) {
                    try {
                        await signInAnonymously(auth);
                    } catch (anonErr) {
                        console.log("Anonymous auth disabled. User must sign in manually.");
                    }
                }
            };
            initAuth();

            onAuthStateChanged(auth, (user) => {
                currentUser = user;
                const loggedInUI = document.getElementById('loggedInState');
                const loggedOutUI = document.getElementById('loggedOutState');
                
                if (user && !user.isAnonymous) {
                    loggedOutUI.classList.add('hidden');
                    loggedInUI.classList.remove('hidden');
                    
                    const displayName = user.displayName || `Creator_${user.uid.substring(0,5)}`;
                    document.getElementById('userAccountName').innerText = displayName;
                    
                    if (user.photoURL) {
                        document.getElementById('userAvatar').src = user.photoURL;
                        document.getElementById('userAvatar').classList.remove('bg-gradient-to-r', 'from-purple-500', 'to-indigo-500');
                    }
                    
                    loadUserProfile(); 
                    setupHistoryListener(); 
                    
                } else {
                    loggedInUI.classList.add('hidden');
                    loggedOutUI.classList.remove('hidden');
                    generationHistory = [];
                    userProfileContext = "";
                    userSocialAvatar = ""; 
                    if (currentTool === 'history') renderHistoryList();
                }
                updateDynamicToolUI();
            });
        } catch (error) {
            console.warn("Firebase offline.", error);
        }

        const googleProvider = new GoogleAuthProvider();
        
        window.signInWithGoogle = async () => {
            try {
                await signInWithPopup(auth, googleProvider);
            } catch (error) {
                console.error("Login Failed", error);
                if (error.code === 'auth/unauthorized-domain') {
                    window.showToast("Please test on your live Vercel URL! This preview window is not authorized in Firebase.");
                } else {
                    window.showToast("Sign in failed. Check your connection.");
                }
            }
        };

        window.handleSignOut = async () => {
            try {
                await signOut(auth);
                window.showToast(dictionary[currentLang].btnSignOut + " Successful");
                if (currentTool === 'history') {
                    window.switchTool('bio', null); 
                }
            } catch (error) {
                console.error("Sign Out Failed", error);
            }
        };

        function setupHistoryListener() {
            if (!currentUser) return;
            // Uses valid environment collection pattern structure
            const historyRef = collection(db, 'artifacts', appId, 'users', currentUser.uid, 'history');
            onSnapshot(historyRef, (snapshot) => {
                generationHistory = [];
                snapshot.forEach(doc => {
                    generationHistory.push({ id: doc.id, ...doc.data() });
                });
                generationHistory.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
                if (currentTool === 'history') renderHistoryList();
            }, (error) => {
                console.error("Error fetching history:", error);
            });
        }

        async function loadUserProfile() {
            if (!currentUser) return;
            try {
                const profileDocRef = doc(db, 'artifacts', appId, 'users', currentUser.uid, 'settings', 'profile');
                const docSnap = await getDoc(profileDocRef);
                if (docSnap.exists()) {
                    userProfileContext = docSnap.data().context || "";
                    userSocialAvatar = docSnap.data().socialAvatar || ""; 
                }
                updateDynamicToolUI();
            } catch (e) {
                console.error("Error loading profile context", e);
            }
        }

        function extractAvatarUrl(text) {
            let match;
            if ((match = text.match(/instagram\.com\/([a-zA-Z0-9_.]+)/))) return `https://unavatar.io/instagram/${match[1]}`;
            if ((match = text.match(/(?:twitter\.com|x\.com)\/([a-zA-Z0-9_]+)/))) return `https://unavatar.io/twitter/${match[1]}`;
            if ((match = text.match(/youtube\.com\/@([a-zA-Z0-9_-]+)/))) return `https://unavatar.io/youtube/${match[1]}`;
            return null; 
        }

        async function saveUserProfileContext(text) {
            if (!currentUser) {
                window.showToast(dictionary[currentLang].emptyLogin);
                return;
            }
            try {
                const extractedAvatar = extractAvatarUrl(text) || ""; 
                const profileDocRef = doc(db, 'artifacts', appId, 'users', currentUser.uid, 'settings', 'profile');
                await setDoc(profileDocRef, { 
                    context: text, 
                    socialAvatar: extractedAvatar,
                    updatedAt: new Date().toISOString() 
                }, { merge: true });
                
                userProfileContext = text;
                userSocialAvatar = extractedAvatar;
                
                window.showToast("Profile context saved!");
                updateDynamicToolUI(); 
                renderResults([`✅ Successfully saved your profile context:\n\n"${text}"\n\nAll tools will now use this to deeply personalize your content.`]);
            } catch (e) {
                console.error("Error saving profile", e);
                window.showToast("Error saving profile.");
            }
        }

        window.saveSingleResult = async function(toolTitle, inputText, singleResultText, buttonElement) {
            if (!currentUser) {
                window.showToast(dictionary[currentLang].emptyLogin);
                return;
            }
            try {
                buttonElement.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i>';
                const historyRef = collection(db, 'artifacts', appId, 'users', currentUser.uid, 'history');
                await addDoc(historyRef, {
                    tool: toolTitle,
                    input: inputText,
                    results: [singleResultText], 
                    timestamp: new Date().toISOString()
                });
                buttonElement.innerHTML = '<i class="fa-solid fa-check text-green-500"></i>';
                buttonElement.disabled = true; 
                window.showToast("Saved to History!");
            } catch (e) {
                console.error("Failed to save to history", e);
                buttonElement.innerHTML = '<i class="fa-regular fa-bookmark"></i>';
            }
        };

        window.exportHistoryCSV = function() {
            if (generationHistory.length === 0) {
                window.showToast(dictionary[currentLang].emptyHistory);
                return;
            }
            let csvContent = "data:text/csv;charset=utf-8,";
            csvContent += "Date,Tool,Input,Generated Content\n";
            generationHistory.forEach(item => {
                const date = new Date(item.timestamp).toLocaleDateString();
                const safeTool = item.tool.replace(/"/g, '""');
                const safeInput = item.input.replace(/"/g, '""');
                const combinedResults = item.results.join(" | ").replace(/"/g, '""');
                csvContent += `"${date}","${safeTool}","${safeInput}","${combinedResults}"\n`;
            });
            const encodedUri = encodeURI(csvContent);
            const link = document.createElement("a");
            link.setAttribute("href", encodedUri);
            link.setAttribute("download", "CreatorKit_History.csv");
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.showToast("Exported to CSV!");
        };

