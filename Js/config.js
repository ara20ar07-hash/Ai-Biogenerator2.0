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
