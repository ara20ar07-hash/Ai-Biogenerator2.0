# 🚀 CreatorKit AI Dashboard & SaaS Landing Page

CreatorKit is a premium, production-ready AI-powered suite designed for modern content creators. It combines an ultra-sleek, premium SaaS landing page with a robust, context-aware dashboard housing 5 custom AI tools. Powered by Google Gemini AI, Firebase, and a highly scalable ES6 modular architecture, it delivers deep content personalization in real time.

Live URL: https://creatorkitpro.vercel.app/

---

## ✨ Features & Capabilities

### ⚡ The 5-Tool AI Workspace
* **AI Bio Generator:** Crafts highly engaging, platform-specific bios tailored to user goals.
* **Hook Generator:** Generates viral-style hooks to capture audience attention instantly.
* **Plus 3 Additional Specialized Creator Tools:** Dynamic UI panels seamlessly toggle between 5 distinct generation states.

### 🧠 Context-Aware Persona Engine
* **Deep Personalization:** Users can save a profile bio or target niche. The AI automatically injects this context background into *every single request* to ensure results sound uniquely like them.
* **Smart Avatar Fetching:** Features an automated parsing utility that extracts usernames from inputted Instagram, X (Twitter), or YouTube links and streams their actual social profile picture using `unavatar.io`.

### 🔐 Full-Scale Backend Integration
* **Hybrid Authentication:** Implements secure Google Auth Popups alongside silent, fallback Anonymous User Sign-ins.
* **Real-Time History Syncing:** Uses live Firestore `onSnapshot` listeners to stream generation history instantly across open browser tabs without refreshing.
* **Data Exportation:** One-click utility compiling and formatting generation history directly into a downloadable clean CSV file.

---

## 🎨 Premium UI & Aesthetic System

Inspired by top-tier modern AI tools, the design system steps away from generic templates to deliver a highly interactive visual experience:

* **Color Palette:** Cinematic deep-dark mode canvas (`#080810`) accented with vibrant purple, pink, and cyan neon gradients.
* **Typography:** Editorial pairing featuring **Syne** for bold, structural headlines and **DM Sans** for ultra-clean, readable body copy.
* **Visual Depth:** Dynamic animated gradient ambient orbs floating in the background layered beneath a fine, premium texturized noise overlay.
* **Interactivity:** Smooth scroll-reveal layout animations on every structural block, featuring a custom interactive multi-platform dropdown selector and error-shaking validation states.

---

## 🗺️ App Architecture (Modular JS)

The codebase has been refactored from a single monolithic script into a clean, senior-level decoupled architecture:

```text
📁 js/
├── 📄 config.js     # Centralized app dictionary, translations, and global application state.
├── 📄 ui.js         # Pure DOM rendering, visual states, toast notifications, and event animations.
├── 📄 api.js        # Isolated AI engine handling system prompts, Gemini payload requests, and token cleaning.
├── 📄 firebase.js   # Real-time Firestore database rules, custom auth events, and profile syncing.
└── 📄 app.js        # The master controller orchestration file wiring events and window-scoped bindings.
