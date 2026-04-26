# CivicGuide — Election Process Assistant

> **PromptWars Virtual 2** | Civic Tech & Accessibility Vertical

CivicGuide is a smart, dynamic election process assistant that simplifies civic engagement by guiding voters through personalized, region-specific election workflows. It provides step-by-step voting instructions, Text-to-Speech accessibility, multi-language support, and persistent progress tracking — all backed by Firebase Authentication and Firestore.

---

## Chosen Vertical

**Civic Tech & Information Access**

Navigating voting laws across different countries, states, and districts can be overwhelming. CivicGuide breaks down regional election processes into digestible, actionable timelines — making democratic participation accessible to everyone.

---

## Approach & Logic

### Architecture
```
┌─────────────────────┐     ┌────────────────────────┐
│   Next.js Frontend  │────▶│   Express.js Backend   │
│   (App Router, TS)  │ /api│   (TypeScript)         │
│                     │proxy│                        │
│  • Zustand Store    │     │  • Firebase Admin SDK   │
│  • Firebase Client  │     │  • Firestore Database   │
│  • TTS Engine       │     │  • Swagger UI Docs      │
└─────────────────────┘     └────────────────────────┘
```

### Decision Logic
1. **Region Detection** → User selects country/state/district (or uses auto-detect)
2. **Backend Resolution** → `GET /process?region=India` returns India-specific steps (Voter List, EPIC, EVM); `region=US` returns US-specific steps; no region returns a general democratic fallback
3. **Dynamic Rendering** → Frontend fetches and renders a personalized timeline
4. **Progress Tracking** → Steps are marked complete via Zustand; for authenticated users, progress syncs to Firestore via `PUT /user/progress`
5. **Session Persistence** → On reload, `onAuthStateChanged` pulls saved state from `GET /user/profile` back into the store

### Guest vs Registered
- **Guests**: Can browse landing, select region, view guide, and use TTS. Progress is local-only (not persisted).
- **Registered Users**: All guest features + progress, region, and language preferences persist to Firestore and sync across sessions.

---

## Features

| Feature | Description |
|---------|-------------|
| **Region-Aware Guide** | Dynamic election steps from backend based on country |
| **Firebase Authentication** | Real email/password auth via Firebase Client SDK |
| **Firestore Persistence** | User progress, region, and language sync to cloud |
| **Text-to-Speech** | Browser Speech API with language-aware voice selection |
| **Dark/Light Theme** | System-aware theme toggle with instant switching |
| **Language Switch** | Toggle between en-US and es-ES (extensible) |
| **Swagger API Docs** | Interactive API documentation at `/api-docs` |
| **Mobile Responsive** | Hamburger menu, touch-friendly layouts, responsive grids |
| **Accessibility** | TTS reader mode, semantic HTML, keyboard navigation |

---

## How It Works

### Pages
- **`/`** — Landing page with hero, trust badges, and feature cards
- **`/region`** — Region selector with auto-detect and manual cascading dropdowns (India, US, Canada)
- **`/guide`** — Dynamic election timeline fetched from backend, with TTS and step completion
- **`/app`** — User dashboard with progress ring, next action card, activity feed, and preferences
- **`/auth`** — Sign in / Register page with Firebase Authentication

### API Endpoints
| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | `/process?region=` | No | Get election steps for a region |
| GET | `/translate?text=&targetLanguage=` | No | Mock translation |
| POST | `/auth/register` | Yes | Create Firestore profile after signup |
| GET | `/user/profile` | Yes | Get saved user state |
| PUT | `/user/progress` | Yes | Save guide step progress |
| PUT | `/user/preferences` | Yes | Save region & language |

---

## Getting Started

### Prerequisites
- Node.js 20+
- A Firebase project with Authentication (Email/Password) and Firestore enabled

### 1. Clone the repository
```bash
git clone https://github.com/YOUR_USERNAME/PromptWars-Virtual-2.git
cd PromptWars-Virtual-2
```

### 2. Setup Backend
```bash
cd backend
cp .env.example .env
# Edit .env with your Firebase project ID
# Place your Firebase service account key as serviceAccountKey.json
npm install
npm run dev
# → Running on http://localhost:8080
# → Swagger docs at http://localhost:8080/api-docs
```

### 3. Setup Frontend
```bash
cd frontend
cp .env.example .env.local
# Edit .env.local with your Firebase Web App config
npm install
npm run dev
# → Running on http://localhost:3000
```

---

## Environment Variables

### Backend (`backend/.env`)
| Variable | Required | Description |
|----------|----------|-------------|
| `PORT` | No | Server port (default: 8080) |
| `FIREBASE_PROJECT_ID` | Yes | Your Firebase project ID |
| `GOOGLE_APPLICATION_CREDENTIALS` | Yes* | Path to service account JSON (*auto on Cloud Run) |

### Frontend (`frontend/.env.local`)
| Variable | Required | Description |
|----------|----------|-------------|
| `NEXT_PUBLIC_FIREBASE_API_KEY` | Yes | Firebase Web API key |
| `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN` | Yes | Firebase auth domain |
| `NEXT_PUBLIC_FIREBASE_PROJECT_ID` | Yes | Firebase project ID |
| `BACKEND_URL` | No | Backend URL for API proxy (default: http://localhost:8080) |

---

## Deploying to Cloud Run

### Backend
```bash
cd backend
gcloud builds submit --tag gcr.io/YOUR_PROJECT/civicguide-backend
gcloud run deploy civicguide-backend \
  --image gcr.io/YOUR_PROJECT/civicguide-backend \
  --platform managed \
  --allow-unauthenticated \
  --set-env-vars FIREBASE_PROJECT_ID=your-project-id
```

### Frontend
```bash
cd frontend
gcloud builds submit --tag gcr.io/YOUR_PROJECT/civicguide-frontend
gcloud run deploy civicguide-frontend \
  --image gcr.io/YOUR_PROJECT/civicguide-frontend \
  --platform managed \
  --allow-unauthenticated \
  --set-env-vars BACKEND_URL=https://civicguide-backend-xxxxx.run.app
```

---

## Google Services Integration

| Service | Usage |
|---------|-------|
| **Firebase Authentication** | Real email/password auth with `onAuthStateChanged` listener |
| **Cloud Firestore** | Persistent storage for user profiles, progress, and preferences |
| **Firebase Admin SDK** | Server-side token verification and Firestore admin access |
| **Web Speech API** | Browser-native TTS for accessibility (Google Chrome voices) |
| **Cloud Run** | Containerized deployment for both frontend and backend |

---

## Assumptions

1. **Firebase Project**: A Firebase project with Email/Password authentication and Firestore must be provisioned. Without credentials, the app gracefully degrades to guest-only mode.
2. **Regional Data**: Election steps for India and the US are representative examples. A production system would source data from official electoral commission APIs.
3. **Translation**: The `/translate` endpoint is a mock simulating Google Cloud Translation API responses. A real API key can be swapped in.
4. **Guest Mode**: Unsigned users can use all features except persistence. This is intentional for accessibility.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js 16, React 19, TypeScript, Tailwind CSS v4 |
| State | Zustand |
| Auth | Firebase Client SDK |
| Backend | Express 5, TypeScript, Firebase Admin SDK |
| Database | Cloud Firestore |
| Docs | Swagger UI (OpenAPI 3.0) |
| Deployment | Docker, Google Cloud Run |