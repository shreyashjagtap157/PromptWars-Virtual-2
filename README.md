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
- **Gateway Layer**: Next.js 16 (Frontend) is the primary entry point. It handles SSR, static assets, and route rewrites.
- **Service Layer**: An Express.js (Backend) instance runs on `8080` in local development and on `3001` inside the provided container image.
- **Proxy Routing**: All requests to `/api/*` are transparently proxied by Next.js to the backend, keeping the client configuration simple.
- **Frictionless Persistence**: Instead of backend-driven auth, we utilize a persistent **Zustand Store** synced to `localStorage`. This ensures progress and preferences survive reloads without ever collecting PII (Personally Identifiable Information).

### 2. Multi-Language Engine
- **Native Localization**: Built-in translation dictionaries for English, Hindi, and Marathi.
- **Dynamic Guide Translation**: The roadmap engine fetches legal steps by region, which are then localized in real time on the client using the user's preferred language.
- **Localized Activity Logs**: Recent historical actions (Complete/Undo) are translated on the fly in the dashboard feed.

### 3. Performance Work
- **Shared guide cache**: The frontend deduplicates guide requests across the guide page, dashboard, and step timeline.
- **Static roadmap payloads**: The backend serves prebuilt guide data instead of reconstructing the same arrays on every request.
- **Translation caching**: Repeated translation requests are cached in memory to reduce external API calls.
- **Render slicing**: Client components subscribe only to the Zustand fields they need, reducing unnecessary rerenders.
- **Font loading**: Inter is loaded through `next/font`, eliminating an extra render-blocking stylesheet request.

### 4. API Hardening
- **Rate limiting**: Public and authenticated endpoints now have per-route request throttles to reduce abuse and protect external APIs.
- **Request validation**: Process, translation, and user update payloads are validated before they reach the service layer.
- **Request IDs and logs**: Each request gets a request ID and structured completion/error logging for easier debugging.
- **Security headers**: The backend adds common hardening headers and a stricter CORS allowlist.
- **Health endpoint**: A lightweight `/healthz` endpoint is available for uptime checks and deployment probes.

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

- **Frontend**: Next.js 16, React 19, Tailwind CSS v4, Zustand (Persistence).
- **Backend**: Express 5, TypeScript, Swagger (API Discovery).
- **Build System**: Multi-stage Docker build with standalone Next.js output for a slim runtime image.
- **Efficiency**: Browser-side caching, backend in-memory caching, reduced rerenders, request-size limits, and stale fallback for guide data.
- **Reliability**: Backend rate limiting, request validation, request IDs, and health checks.

## ✅ Continuous Integration

- The repository includes a GitHub Actions workflow at [.github/workflows/ci.yml](.github/workflows/ci.yml) that installs both apps, runs the backend build, runs the frontend lint step, and builds the frontend on every push and pull request.

---

## 🏁 How to Run Locally

1. **Install dependencies**:
   ```bash
   cd backend && npm install
   cd ../frontend && npm install
   ```
2. **Run in development**:
   ```bash
   # Terminal 1
   cd backend
   npm run dev

   # Terminal 2
   cd frontend
   npm run dev
   ```
   The frontend proxies `/api/*` to the backend automatically through [frontend/next.config.ts](frontend/next.config.ts).
3. **Run production builds locally**:
   ```bash
   cd backend && npm run build && npm start
   cd ../frontend && npm run build && npm start
   ```
   If the backend is hosted elsewhere, set `BACKEND_URL` before starting the frontend server.

---

**Built with pride for PromptWars Virtual 2.**