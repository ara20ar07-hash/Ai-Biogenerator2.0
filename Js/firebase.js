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

