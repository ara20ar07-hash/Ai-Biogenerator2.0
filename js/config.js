// js/config.js

export let currentLang = 'en';
export let currentTool = 'bio';

export const setCurrentLang = (lang) => { currentLang = lang; };
export const setCurrentTool = (tool) => { currentTool = tool; };

export const dictionary = {
  en: {
    setup: 'Setup', tools: 'Tools', account: 'Account',
    navProfile: 'Profile Context', navBio: 'Bio Generator',
    navCaption: 'Viral Captions', navHook: 'Video Hooks',
    navPlanner: '7-Day Planner', navRoast: 'Roast My Profile',
    navHistory: 'My History', navDark: 'Dark Mode',
    navAdvice: 'Growth Advisor',
    btnAnalyze: 'Analyze My Profile',
    btnSignOut: 'Sign Out', btnSignIn: 'Sign in',
    syncText: 'Sync history across devices',
    labelPlatform: 'Platform', labelTone: 'Tone',
    tonePro: 'Pro', toneFun: 'Fun', toneEdgy: 'Edgy',
    btnExport: 'Export CSV', btnClear: 'Clear',
    loading: 'Crafting AI magic...', tabInput: 'Fill In', tabOutput: 'Results',
    titleResults: 'Results', titleHistory: 'My History',
    emptyDefault: 'Select a tool, fill out the details, and let AI do the magic.',
    emptyLogin: 'Please sign in to view your history.',
    emptyHistory: 'No history yet. Generate something!',
    toastCopy: 'Copied to clipboard!', errRetry: 'Try Again',
    errServer: 'Server error. Please try again shortly.',
    errNetwork: 'Network error. Check your connection.',
    errParse: 'Could not read AI response. Please retry.',
    errGeneric: 'Something went wrong. Please retry.',
    lblOptional: 'optional',
  },
  ku: {
    setup: 'ڕێکخستن', tools: 'ئامرازەکان', account: 'ئەکاونت',
    navProfile: 'زانیاری پرۆفایل', navBio: 'دروستکردنی بایۆ',
    navCaption: 'کاپشنی بەرفراوان', navHook: 'هوکی ڤیدیۆ',
    navPlanner: 'پلانی ٧ ڕۆژ', navRoast: 'ئامۆژگاری پرۆفایل',
    navHistory: 'مێژووی من', navDark: 'دۆخی تاریک',
    navAdvice: 'ڕێنمایی گەشەسەندن',
    btnAnalyze: 'شیکاری پرۆفایلم',
    btnSignOut: 'چوونەدەرەوە', btnSignIn: 'چوونەژوورەوە',
    syncText: 'هاوکێشانی مێژوو لە ئامێرەکاندا',
    labelPlatform: 'پلاتفۆرم', labelTone: 'شێواز',
    tonePro: 'پیشەیی', toneFun: 'سەرگەرمی', toneEdgy: 'جێگیر',
    btnExport: 'هەناردەکردن CSV', btnClear: 'پاككردنەوە',
    loading: 'داتا ئامادەدەکرێت...', tabInput: 'پڕکردنەوە', tabOutput: 'ئەنجامەکان',
    titleResults: 'ئەنجامەکان', titleHistory: 'مێژووی من',
    emptyDefault: 'ئامرازێک هەڵبژێرە و زانیاریەکان پڕبکەرەوە.',
    emptyLogin: 'تکایە بچۆ ژوورەوە بۆ بینینی مێژووت.',
    emptyHistory: 'هێشتا مێژوو نییە. شتێک دروستبکە!',
    toastCopy: 'کۆپی کرا!', errRetry: 'دووبارە هەوڵبدەرەوە',
    errServer: 'هەڵەی سێرڤەر. تکایە دووبارە هەوڵبدەرەوە.',
    errNetwork: 'هەڵەی تۆڕ. پەیوەندیت پشکنینەوە.',
    errParse: 'وەڵامی AI نەتوانرا بخوێندرێتەوە.',
    errGeneric: 'هەڵەیەک ڕوویدا. تکایە دووبارە هەوڵبدەرەوە.',
    lblOptional: 'دیاریکراوی',
  }
};

export const getToolsConfig = () => ({
  profile: {
    title: 'Profile Context', icon: 'fa-solid fa-user-cog text-green-500',
    desc: 'Save your profile link or bio to personalize all tools.',
    placeholder: 'Paste your Instagram/TikTok link or describe yourself...',
    inputLabel: 'Your profile link or bio', showOptions: false, optionalWithContext: false,
  },
  bio: {
    title: 'Bio Generator', icon: 'fa-regular fa-id-badge text-indigo-500',
    desc: 'Generate the perfect social media bio in seconds.',
    placeholder: 'e.g. Fitness coach, love pizza, helping moms get strong...',
    inputLabel: 'Tell us about yourself', showOptions: true, optionalWithContext: true,
    btnText: 'Generate Bios',
  },
  caption: {
    title: 'Viral Captions', icon: 'fa-solid fa-pen-nib text-pink-500',
    desc: 'Create scroll-stopping captions for your posts.',
    placeholder: 'e.g. A photo of me at the gym, looking tired but happy...',
    inputLabel: 'Describe your post', showOptions: true, optionalWithContext: true,
    btnText: 'Generate Captions',
  },
  hook: {
    title: 'Video Hooks', icon: 'fa-solid fa-magnet text-yellow-500',
    desc: 'Generate 5 scroll-stopping opening hooks for your video.',
    placeholder: 'e.g. How I lost 20kg in 3 months without going to the gym...',
    inputLabel: 'What is your video about?', showOptions: false, optionalWithContext: true,
    btnText: 'Generate Hooks',
  },
  planner: {
    title: '7-Day Planner', icon: 'fa-solid fa-calendar-week text-blue-500',
    desc: 'Get a full week of viral content ideas for your niche.',
    placeholder: 'e.g. Personal finance for Gen Z, travel vlogs on a budget...',
    inputLabel: 'Your niche or content topic', showOptions: true, optionalWithContext: true,
    btnText: 'Generate Plan',
  },
  roast: {
    title: 'Roast My Profile', icon: 'fa-solid fa-fire text-orange-500',
    desc: 'Get a brutal honest roast + a professional rewrite.',
    placeholder: 'Paste your current bio here...',
    inputLabel: 'Your current bio', showOptions: false, optionalWithContext: false,
    btnText: 'Roast Me 🔥',
  },
  history: {
    title: 'My History', icon: 'fa-solid fa-clock-rotate-left text-gray-500',
    desc: '', placeholder: '', inputLabel: '', showOptions: false,
  },
  advice: {
  title: 'Growth Advisor',
  icon: 'fa-solid fa-chart-line text-emerald-500',
  desc: 'AI analysis of your profile vs. similar creators. Get a prioritized action plan.',
  placeholder: 'Paste your bio, recent captions, or Instagram/TikTok URL…',
  inputLabel: 'Your profile & recent content',
  showOptions: false,
  optionalWithContext: true,
  btnText: 'Analyze My Profile',
  },
});
