# CivicGuide - Election Process Assistant

CivicGuide is a smart, dynamic election process assistant built during the PromptWars Virtual 2 challenge. It simplifies civic engagement by guiding voters through personalized, region-specific election workflows dynamically served from a robust backend architecture.

## Chosen Vertical
**Civic Tech & Accessibility (Information Access)**
We chose to build a smart assistant dedicated to democratic participation. Navigating voting laws across different districts can be overwhelming and confusing. By structuring local election requirements into a digestible timeline interface equipped with multi-lingual support and Text-to-Speech (TTS), we break down the barriers to exercising one's right to vote.

## Approach and Logic

The solution adopts a full-stack dual-application architecture:
1.  **Frontend (Next.js App Router):** A modern, responsive React UI built with Tailwind CSS V4 to match exact styling guidelines. Zustands serves as the state-management layer, reacting asynchronously to `region` selections simulating auto-location detectors.
2.  **Backend (Express + Node.js):** REST API utilizing **Firebase Admin SDK** to resolve complex civic procedures and mock OAuth logic. 
3.  **Context-Driven Rendering:** When users select a state or country (e.g. India vs the US) on `/region`, the frontend pushes the state upward via Zustand, triggering an active API fetch on `/guide` rendering step-by-step custom tasks.

## How the Solution Works

1. **Dashboard & Navigation**: Users begin on a landing page highlighting the assistant's verified sources and trust elements. They advance to `/region`, navigating a detection UI to lock in their "Home District."
2. **Timeline Interface (`/guide`)**: Next.js hits `http://localhost:8080/process?region=...`, dynamically importing their local guide steps. Users tap to complete phases, which update the overarching UI Dashboard completion rings and update the internal Firestore state representations natively over backend hooks. 
3. **Accessibility Controls Module**: Built-in **Google Web Speech API** triggers dictation of paragraph components, alongside mocked implementations of **Google Translate API** parameters (`/translate`).

### Getting Started Locally

You need two terminal instances:
**Backend**:
```bash
cd backend
npm install
npm run dev
# Running on localhost:8080
```
**Frontend**:
```bash
cd frontend
npm install
npm run dev
# Running on localhost:3000
```

## Google Services Integration
- **Firebase Authentication & Firestore**: Configured safely using the robust Firebase Admin SDK on the Express tier, storing tracking tokens and mimicking secure login processes required for saving voter profiles.
- **Translation Web APIs**: Connected mock endpoints imitating the standard Google Cloud Translate payload specifications to deliver multi-language civic accessibility.

## Assumptions Made
1. **Mock Constraints**: Because an active API Key and Service Account pair was unsupported in this automated Sandbox, the `firebase-admin` instance leverages "Mock" identifiers, gracefully handling simulated database saves without crashing the Express listener.
2. **Dynamic Database Rules**: We assumed US and Indian electoral procedures for basic data-set mapping. Unknown regions fallback to a general "democratic standard".
3. **Server Configurations**: We assumed the Frontend will explicitly try referencing the Node listener on `:8080` overriding strict CORS proxying via the local loopback fetch parameters.