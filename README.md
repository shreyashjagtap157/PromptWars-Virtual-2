# CivicGuide — Frictionless Election Process Assistant

> **PromptWars Virtual 2** | Civic Tech & Accessibility Vertical

CivicGuide is a smart, dynamic election process assistant that eliminates all barriers to civic engagement. By replacing mandatory account registration with high-performance local persistence, CivicGuide provides a high-trust, account-free experience. 

It guides users through exhaustive, region-specific election roadmaps (13 steps for India, 10 for USA) with Text-to-Speech accessibility and native multi-language support (English, Hindi, Marathi).

---

## Chosen Vertical

**Civic Tech & Information Access**

Navigating complex voting protocols can be the biggest barrier to democratic participation. CivicGuide solves this by providing "Frictionless Information Design" — zero sign-ups, instant GPS-based localization, and exhaustive step-by-step verified roadmaps tailored to the user's jurisdiction.

---

## Approach & Logic

### 1. Frictionless Architecture
To maximize accessibility, we removed mandatory authentication. 
- **Persistence**: All user progress, region selections, and language preferences are handled via a persistent **Zustand Store** synced to the browser's `localStorage`.
- **Privacy**: No user data is stored on our servers, ensuring a privacy-first civic experience.
- **Zero-Barrier**: Users can start their roadmap instantly upon opening the app.

### 2. Decision Logic
- **Region Detection**: Automatically detects the user's country via IP-based geolocation (fallback) or manual selection.
- **Exhaustive Roadmap Engine**: The backend serves specific legal protocols.
  - **India**: 13 comprehensive steps covering ECI search, EPIC download, Form 17A signing, and VVPAT verification.
  - **USA**: 10 steps covering SOS portal checks, overvote reviews, and optical scanner submission.
- **Dynamic Translation**: Native dictionary-based translation system for UI and Guide content (English, Hindi, Marathi).

---

## Features

| Feature | Description |
|---------|-------------|
| **Exhaustive Guides** | Full legal roadmaps for India (13 steps) and USA (10 steps) |
| **Account-Free Persistence** | Save progress locally without ever creating an account |
| **Activity Timeline** | Live feed of roadmap completions and reversals with timestamps |
| **Undo Support** | Flexibility to mark steps as "Not Complete" to correct mistakes |
| **Text-to-Speech** | Accessibility-first design with built-in voice reader for all steps |
| **GPS Geolocation** | Instant region detection to unlock the correct legal workflow |
| **Triple-Locale Support** | Native translations for English, Hindi, and Marathi |
| **Premium Dark Mode** | Sleek, high-contrast UI optimized for mobile and desktop |

---

## Google Services & Integration

| Service | Usage |
|---------|-------|
| **Google Cloud Run** | Scalable, containerized hosting for both the Next.js Frontend and Express Backend |
| **Google Translate** | Backend `TranslateService` prepared for real-time translation expansion |
| **Web Speech API** | Chrome-native TTS for accessibility with region-aware voice selection |
| **GPS Geolocation API** | Browser-native coordinate scanning for precision regional matching |

---

## How It Works

### Pages
- **`/`** — Cinematic landing page with trust markers and "Experience Now" entry.
- **`/region`** — GPS-powered sector that unlocks the exhaustive guide.
- **`/guide`** — The core workflow with TTS, exhaustive steps, and completion markers.
- **`/app`** — Personalized dashboard with a progress ring, activity log, and next-step logic.

---

## Deployment to Cloud Run

### 1. Prerequisites
- Google Cloud Project with the **Cloud Build** and **Cloud Run** APIs enabled.
- Artifact Registry repository created for your containers.

### 2. Deployment Steps
The project is optimized for deployment via `gcloud` commands.

#### Backend Deployment
```bash
cd backend
gcloud builds submit --tag gcr.io/YOUR_PROJECT/civicguide-backend
gcloud run deploy civicguide-backend \
  --image gcr.io/YOUR_PROJECT/civicguide-backend \
  --platform managed \
  --allow-unauthenticated \
  --region us-central1
```

#### Frontend Deployment
```bash
cd frontend
gcloud builds submit --tag gcr.io/YOUR_PROJECT/civicguide-frontend
gcloud run deploy civicguide-frontend \
  --image gcr.io/YOUR_PROJECT/civicguide-frontend \
  --platform managed \
  --allow-unauthenticated \
  --set-env-vars BACKEND_URL=https://YOUR_BACKEND_URL.run.app \
  --region us-central1
```

---

## Technical Audit & Guidelines Compliance

- **Size**: Repository is **< 1 MB**, well within the 10 MB limit.
- **Architecture**: Decoupled Frontend (Next.js) and Backend (Express) linked via secure rewrites.
- **Code Quality**: Strict TypeScript implementation, semantic HTML, and accessibility-first components.
- **Privacy**: No PII (Personally Identifiable Information) collection; fully frictionless.

---

## Assumptions & Disclaimers
1. **Official Data**: Election steps provided match current 2024 protocols for India/USA but should be verified by official Electoral Commission feeds for production voting.
2. **Translation**: Marathi and Hindi translations are curated for quality; additional regional languages can be added via `i18n.ts`.
3. **Environment**: App assumes a modern browser environment supporting `localStorage` and `SpeechSynthesis`.

---

**Built with pride for PromptWars Virtual 2.**