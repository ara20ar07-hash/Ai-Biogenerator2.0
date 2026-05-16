// --- 2. Configuration & API ---
        const apiKey = ""; // Provided by execution environment automatically
        const isNetlifyOrVercel = window.location.hostname.includes('netlify.app') || window.location.hostname.includes('vercel.app');
        
        // Use preview model when running in sandbox environment, preserve Vercel route for production
        const API_URL = isNetlifyOrVercel 
            ? `/api/generate` 
            : `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`;

        let currentTool = 'bio';

        const getToolsConfig = () => {
            const d = dictionary[currentLang];
            return {
                bio: { title: d.navBio, desc: d.descBio, icon: "fa-regular fa-id-badge text-indigo-500 dark:text-indigo-400", inputLabel: d.inputBio, placeholder: d.placeholderBio, showOptions: true, btnText: d.btnBio, optionalWithContext: true },
                caption: { title: d.navCaption, desc: d.descCap, icon: "fa-solid fa-pen-nib text-pink-500 dark:text-pink-400", inputLabel: d.inputCap, placeholder: d.placeholderCap, showOptions: true, btnText: d.btnCap, optionalWithContext: false },
                hook: { title: d.navHook, desc: d.descHook, icon: "fa-solid fa-magnet text-yellow-500 dark:text-yellow-400", inputLabel: d.inputHook, placeholder: d.placeholderHook, showOptions: false, btnText: d.btnHook, optionalWithContext: false },
                planner: { title: d.navPlanner, desc: d.descPlan, icon: "fa-solid fa-calendar-week text-blue-500 dark:text-blue-400", inputLabel: d.inputPlan, placeholder: d.placeholderPlan, showOptions: true, btnText: d.btnPlan, optionalWithContext: true },
                roast: { title: d.navRoast, desc: d.descRoast, icon: "fa-solid fa-fire text-orange-500 dark:text-orange-400", inputLabel: d.inputRoast, placeholder: d.placeholderRoast, showOptions: false, btnText: d.btnRoast, optionalWithContext: true },
                profile: { title: d.navProfile, desc: d.descProf, icon: "fa-solid fa-user-cog text-green-500 dark:text-green-400", inputLabel: d.inputProf, placeholder: d.placeholderProf, showOptions: false, btnText: d.btnProf, optionalWithContext: false },
                history: { title: d.navHistory, icon: "fa-solid fa-clock-rotate-left text-gray-500 dark:text-gray-400" }
            };
        };

