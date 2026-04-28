# CivicGuide — Frictionless Election Process Assistant

> **PromptWars Virtual 2** | Civic Tech & Accessibility Vertical

**Live Application**: [https://civicguide-609095350122.us-central1.run.app](https://civicguide-609095350122.us-central1.run.app)

CivicGuide is a smart, dynamic election process assistant designed to eliminate all barriers to civic engagement. By replacing mandatory account registration with high-performance browser-local persistence, CivicGuide provides a high-trust, account-free experience.

It guides users through exhaustive, region-specific election roadmaps (13 steps for India, 10 for USA) with Text-to-Speech accessibility and native multi-language support (English, Hindi, Marathi).

---

## 🏛️ Chosen Vertical

**Civic Tech & Information Access**

Navigating complex voting protocols is often the biggest hurdle to democratic participation. CivicGuide solves this through **"Frictionless Information Design"** — zero sign-ups, instant GPS-based localization, and exhaustive step-by-step verified roadmaps tailored to the user's exact jurisdiction.

---

## 🚀 The Approach: "Unified Full-Stack Container"

To minimize deployment complexity and maximize performance, CivicGuide uses a **Unified Mono-Container** architecture.

### 1. Architecture Logic
- **Gateway Layer**: Next.js (Frontend) acts as the primary entry point, listening on the Cloud Run `$PORT`. It handles all SSR rendering and static assets.
- **Service Layer**: An Express.js (Backend) instance runs internally on port `3001`.
- **Proxy Routing**: All requests to `/api/*` are transparently proxied by Next.js to `localhost:3001`, creating a seamless full-stack experience within a single service.
- **Frictionless Persistence**: Instead of backend-driven auth, we utilize a persistent **Zustand Store** synced to `localStorage`. This ensures progress and preferences survive reloads without ever collecting PII (Personally Identifiable Information).

### 2. Multi-Language Engine
- **Native Localization**: Built-in translation dictionaries for English, Hindi, and Marathi.
- **Dynamic Guide Translation**: The roadmap engine fetches legal steps via ID, which are then localized in real-time on the client using the user's preferred language.
- **Localized Activity Logs**: Recent historical actions (Complete/Undo) are translated on-the-fly in the dashboard feed.

---

## ✨ Features

| Feature | Description |
|---------|-------------|
| **Exhaustive Guides** | 13-step Roadmap for India; 10-step for USA |
| **Account-Free Persistence** | Save progress locally without ever creating an account |
| **Activity Timeline** | Live localized feed of roadmap completions and reversals |
| **Undo / Revert** | Flexibility to manage roadmap status to correct mistakes |
| **Text-to-Speech** | Accessibility reader with region-aware voice selection |
| **GPS Geolocation** | Instant coordinate scanning to unlock legal workflows |
| **Triple-Locale Support** | Native translations for English, Hindi, and Marathi |
| **Premium UI** | High-contrast Dark/Light mode with clockwise progress visuals |

---

## ☁️ Google Services Integration

| Service | Usage |
|---------|-------|
| **Google Cloud Run** | Scalable hosting for the Unified Full-Stack container |
| **Google Cloud Build** | Multi-stage production pipeline compiling Next.js and TypeScript |
| **Cloud Billing** | Automated project linking for resource management |
| **Web Speech API** | Chrome-native TTS for inclusive accessibility |
| **Artifact Registry** | Secure container image management |

---

## 🛠️ Technical Implementation Details

- **Frontend**: Next.js 15, React 19, Tailwind CSS v4, Zustand (Persistence).
- **Backend**: Express 5, TypeScript, Swagger (API Discovery).
- **Build System**: Multi-stage Docker build that tree-shakes dependencies to keep the image slim.
- **Size**: Optimized to **~1.5 MB** source size, well within contest limits.

---

## 🏁 How to Run Locally

1. **Clone the repository**:
   ```bash
   git clone https://github.com/shreyashjagtap157/PromptWars-Virtual-2.git
   ```
2. **Install Root Dependencies**:
   ```bash
   npm install -g concurrently
   ```
3. **Build & Run (Unified Mode)**:
   ```bash
   # Building both frontend and backend
   cd frontend && npm install && npm run build
   cd ../backend && npm install && npm run build
   
   # Run concurrently from root
   concurrently "PORT=3001 node backend/dist/index.js" "PORT=3000 node frontend/server.js"
   ```

---

**Built with pride for PromptWars Virtual 2.**
Virtual 2.**