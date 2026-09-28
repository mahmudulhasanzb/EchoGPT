# EchoGPT — Next-Gen Multi-AI Workspace & Browser Copilot

> Designed & developed for the **Software Engineering Internship (Frontend) Practical Assignment** at **AppifyDevs**.

[![Next.js](https://img.shields.io/badge/Next.js-16.3.6-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2.8-blue?style=for-the-badge&logo=react)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4.0-38bdf8?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178c6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Package Manager](https://img.shields.io/badge/Bun-1.4.0-fbf0df?style=for-the-badge&logo=bun)](https://bun.sh/)

---

## 🌟 Live Demo & Repository

- **GitHub Repository:** [https://github.com/mahmudulhasanzb/EchoGPT](https://github.com/mahmudulhasanzb/EchoGPT)
- **Live Deployment:** Deployable instantly to Vercel / Netlify with `bun run build` / `npm run build`.

---

## 🎯 Executive Overview & Problem Statement

The assignment required analyzing and redesigning the **EchoGPT ecosystem**:
1. **EchoGPT Web App (`https://echogpt.live/`)**: The original UI suffered from a cluttered sidebar, visual clipping between suggestion cards and the floating dock, lack of dark mode, and missing real-time multi-model side-by-side comparison despite its "Multi-AI" identity.
2. **EchoGPT Single-Page Landing Page**: A high-converting, modern landing page communicating product capabilities, model choices, interactive product preview, testimonials, FAQ, and pricing.
3. **EchoGPT Chrome Extension (`Chrome Web Store`)**: Reimagining the popup, navigation, prompt input experience, AI model selection, page reading, writing assistant, and translation workflows into a fluid, hotkey-driven browser sidebar.

To make evaluation seamless, this project packages **all three core requirements into a single unified Next.js application** with a header **View Switcher**:
- 🌐 **View 1: Single-Page Website (Landing Page)**
- 💻 **View 2: Redesigned EchoGPT Web App (Workspace)**
- 🧩 **View 3: Chrome Extension Interactive Simulator**

---

## 🚀 Key Features Implemented

### 1. Single-Page Website (Landing Page)
- **Hero Section**: High-impact typography, telemetry pill badge, dual action CTAs, and instant trust proof points.
- **Unified Model Hub (Model Matrix)**: Interactive tabbed showcase featuring **Claude 3.5 Sonnet**, **GPT-4o**, **Gemini 1.5 Pro**, **DeepSeek R1**, and **Llama 3.3 70B** with context window specs, generation velocity, and benchmark scores (HumanEval, MMLU, MATH-500).
- **Interactive Product Sandbox**: Live interactive comparison simulator allowing visitors to switch sample prompts (Code Refactoring, Copywriting Pitch, Research Synthesis) and observe real-time dual stream outputs with 1-click code copying.
- **Why Choose EchoGPT**: Direct comparison matrix highlighting the cost, redundancy, and efficiency advantages over single-vendor subscriptions.
- **Feature Cards**: Industrial dark glassmorphism cards showcasing BYOK, split-screen compare, zero-training privacy, and failover routing.
- **Transparent Pricing**: Monthly vs. Annual toggle with automated 25% discount calculation, feature checklist, and "Most Popular" highlight.
- **FAQ Accordion**: Smooth toggle states addressing security, browser privacy, BYOK, and hotkeys.
- **Social Proof**: Testimonials from software engineers, researchers, and content directors.
- **Call-to-Action & Structured Footer**: Responsive footer with service status indicator and quick navigation.

### 2. Redesigned Web App Workspace
- **Dual-Model Synchronous Compare Mode**: Toggle between Single-Chat and Dual-Compare with a single click. Prompts are dispatched to Model A (e.g. Claude 3.5 Sonnet) and Model B (e.g. GPT-4o) simultaneously with simulated streaming tokens, latency tracking, and tokens/sec telemetry.
- **Collapsible Sidebar**: Organized by time frames (*Today*, *Yesterday*, *Previous 7 Days*), with active chat session indicator, unread count, and quick tool shortcuts (*Prompt Studio*, *Model Connectors*).
- **Session Persistence**: Ability to start new sessions (`⌘N` / `Ctrl+N`), switch existing sessions, and retain message threads.
- **Floating Intelligent Input Dock**:
  - Independent Model A & Model B dropdown pickers.
  - Live Web Search toggle.
  - Attachment simulation.
  - Voice dictation trigger.
  - Keyboard shortcuts (`Enter` to send, `Shift+Enter` for newline).
  - Quick prompt carousel pills for instant injection.
- **Prompt Studio Drawer**: Modal library of curated prompts for Coding, Writing, Analysis, and Productivity with 1-click injection into the chat input.
- **Settings & BYOK Modal**: Support for user-provided OpenAI and Anthropic API keys, temperature slider (0.1 - 1.0), and zero-retention policy compliance.

### 3. Chrome Extension Concept (Interactive Simulator)
- **Realistic Browser Chrome Frame**: Simulated browser address bar (`github.com/anthropics/...`), navigation arrows, security lock, and toolbar extension icon.
- **Dual Extension Views**:
  - **Docked Sidebar View**: Resizable right rail with pin/unpin toggle and page awareness.
  - **Toolbar Popup View**: Compact floating modal with quick 1-click actions.
- **Core Workflow Tabs**:
  - 💬 **Chat Tab**: Page-aware chat displaying active webpage context badge, quick chips (*"Summarize page"*, *"Explain code"*, *"Compare trade-offs"*), and assistant stream.
  - ✍️ **Write Tab**: Dedicated drafting studio with Topic input, Format selection (*Email*, *Message*, *Outline*, *Tweet*, *Article*), Tone selection (*Professional*, *Casual*, *Direct*, *Friendly*), and 1-click clipboard copy.
  - 📖 **Read Tab**: Instant page breakdown providing an **Executive TL;DR**, bulleted **Key Insights**, and recommended **Action Items**.
  - 🌐 **Translate Tab**: Multi-language translation engine with Auto-Detect source language, target language selection, and quick translation previews.
  - ⚙️ **Settings Tab**: Custom hotkey mapping (`⌘K` / `Alt+S`), selection popups, and route status.

---

## 🎨 Design Philosophy & Aesthetics

Following **Mahmudul Hasan's** signature frontend design standards:
- **Palette**: Deep dark industrial aesthetic (`#09090b`, `#0d0d12`, `#111118`) blended with vibrant EchoGPT violet/indigo brand gradients (`#7c3aed`, `#6366f1`).
- **Theme**: Seamless Light and Dark mode with persistence in `localStorage` and zero flash of unstyled content.
- **Typography**: Next.js Google Fonts (`Geist Sans` & `Geist Mono`) for crisp legibility and technical elegance.
- **Micro-Animations**: Hover cards with subtle elevation, pulse badges for operational status, pinging indicators for streaming state, and smooth accordion transitions.
- **Accessibility (WCAG)**: High-contrast ratios, semantic HTML5 elements (`<header>`, `<nav>`, `<main>`, `<aside>`, `<footer>`), descriptive ARIA labels, and keyboard navigability.

---

## 📂 Project Architecture

```
echogpt/
├── public/                     # Static assets and icons
├── src/
│   ├── app/
│   │   ├── globals.css         # Tailwind CSS v4 CSS-first design tokens & glassmorphism
│   │   ├── layout.tsx          # RootLayout with ThemeProvider, fonts, metadata
│   │   └── page.tsx            # View controller hosting Landing, WebApp & Extension
│   ├── components/
│   │   ├── ThemeToggle.tsx     # Sun / Moon theme toggle
│   │   ├── ViewSwitcher.tsx    # Header view switcher (Landing | Web App | Extension)
│   │   ├── landing/            # Single-Page Website components
│   │   │   ├── HeroSection.tsx
│   │   │   ├── ModelMatrix.tsx
│   │   │   ├── ProductPreview.tsx
│   │   │   ├── FeaturesSection.tsx
│   │   │   ├── WhyEchoGPT.tsx
│   │   │   ├── PricingSection.tsx
│   │   │   ├── TestimonialsSection.tsx
│   │   │   ├── FaqSection.tsx
│   │   │   ├── CtaFooter.tsx
│   │   │   └── LandingPage.tsx
│   │   ├── webapp/             # Redesigned EchoGPT Web Workspace
│   │   │   ├── Sidebar.tsx
│   │   │   ├── MessageBubble.tsx
│   │   │   ├── InputDock.tsx
│   │   │   ├── PromptLibraryModal.tsx
│   │   │   ├── SettingsModal.tsx
│   │   │   ├── WebApp.tsx
│   │   │   └── mockData.ts
│   │   └── extension/          # Redesigned Chrome Extension Simulator
│   │       ├── SimulatedWebPage.tsx
│   │       ├── ExtensionSidebar.tsx
│   │       ├── ExtensionPopup.tsx
│   │       └── ExtensionSimulator.tsx
│   └── context/
│       └── ThemeContext.tsx    # Client-side Theme provider with localStorage persistence
├── package.json
├── tsconfig.json
└── README.md
```

---

## 🛠️ Tech Stack

- **Framework:** Next.js 16 (App Router with Turbopack)
- **UI Library:** React 19
- **Styling:** Tailwind CSS v4 (CSS-first engine)
- **Icons:** Lucide React
- **Runtime:** Bun 1.4

---

## 💻 Getting Started Locally

### Prerequisites
- [Bun](https://bun.sh/) (recommended) or [Node.js](https://nodejs.org/) (v18+)

### Installation

```bash
# Clone the repository
git clone https://github.com/mahmudulhasanzb/EchoGPT.git
cd EchoGPT/echogpt

# Install dependencies
bun install
# or: npm install

# Start development server
bun run dev
# or: npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
bun run build
bun run start
```

---

## 📋 Evaluation Checklist

| Criteria | Requirement | Status |
|---|---|---|
| **Web App Redesign** | Improve UX, responsiveness, accessibility, and modern aesthetics | ✅ Completed (Multi-model split view, prompt studio, session history) |
| **Landing Page** | Hero, Features, AI Models, Preview, Why EchoGPT, Pricing, FAQ, Footer | ✅ Completed (Interactive matrix, live sandbox, pricing toggle, accordion) |
| **Chrome Extension** | Popup UI, sidebar navigation, prompt input, write/read/translate workflows | ✅ Completed (Interactive browser simulator with docked sidebar & popup) |
| **Code Quality** | Clean component architecture, TypeScript, reusable tokens | ✅ Completed |
| **Bonus Features** | Dark/Light mode, animations, WCAG considerations, zero lock-in | ✅ Completed |

---

### Author
**Mahmudul Hasan**  
Submission for AppifyDevs — Software Engineering Internship (Frontend) Assignment.
