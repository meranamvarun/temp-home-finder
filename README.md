# temp-home-finder

A lightweight decision-support web app that ranks Indian Army Military Hospital (MH) locations by how practical they are for accompanying spouses/family members—especially those who may need to **travel frequently** and/or **work remotely** from the posting location.

The app surfaces a "sweet spot" list of hospitals based on configurable thresholds and weighted scoring so families can quickly understand:

- How feasible regular travel is from selected home cities.
- How far the hospital area is from the nearest airport.
- Typical airport-to-hospital travel time/cab burden.
- Whether connectivity is likely to support remote work (5G / broadband signals).
- Whether flights are daily and what approximate fares look like.

## Who this is for

- Spouses and family members of Army personnel evaluating practical living/travel constraints.
- Users who may need to maintain remote/hybrid work while accompanying posted staff.
- Anyone comparing field vs non-field locations from a travel-and-connectivity perspective.

## What the score represents

Each hospital gets a composite score (0–100) derived from weighted factors in the app:

1. Airport→hospital travel time.
2. Average airfare from selected origin cities.
3. Connectivity readiness (5G / broadband availability flags).
4. Flight frequency (daily availability across selected origin cities).
5. Airport→hospital cab/time burden.

Users can adjust both:

- **Eligibility criteria** (max travel time, max average fare, require daily flights, require BB/5G).
- **Factor weights** (travel, fare, connectivity, frequency, cab burden).

## Data model and how data is produced

The current dataset is manually curated in-app and uses **only publicly available information**. The app does not rely on private, classified, or restricted sources.

### Public data sources used by data point

- **Hospital names, locations, and command context**
  - Public military/location references and open web listings (e.g., Wikipedia and other publicly accessible references).

- **Nearest airport mapping (airport name/code)**
  - Public airport information (Wikipedia airport pages, Airports Authority of India and other public airport references).

- **Distance / transit time / terrain tags (airport to hospital area)**
  - Public map and routing estimates (Google Maps / OpenStreetMap-style routing tools and public map references).

- **Connectivity markers (4G/5G/broadband)**
  - Public telecom coverage maps and product availability pages (e.g., Jio, Airtel, BSNL public coverage/service pages).

- **Flight routing pattern, fare ranges, and daily-frequency flags**
  - Public travel portals and airline booking sites (e.g., MakeMyTrip, Yatra, IndiGo, Air India) using indicative/publicly visible schedules and pricing.

- **Cab cost estimates**
  - Publicly visible ride-hailing/taxi estimates and map-based fare approximations for representative routes.

## Installation and usage (Windows, macOS, Linux)

> This repository currently contains the core React component (`army_mh_classification_spouce_support.jsx`) and documentation, but does not yet include a complete React app scaffold (`package.json`, build scripts, etc.).
>
> If you want to run it locally right now, create a small React app and drop this component in.

### Prerequisites (all operating systems)

- Install **Node.js 18+** (LTS recommended) and npm.
- Install **Git**.

### 1) Clone the repository

#### Windows (PowerShell)

```powershell
git clone https://github.com/<your-org-or-user>/temp-home-finder.git
cd temp-home-finder
```

#### macOS / Linux (Terminal)

```bash
git clone https://github.com/<your-org-or-user>/temp-home-finder.git
cd temp-home-finder
```

### 2) Create a React app shell (Vite) and copy the component

#### Windows (PowerShell)

```powershell
npm create vite@latest temp-home-finder-app -- --template react
cd temp-home-finder-app
npm install
Copy-Item ..\temp-home-finder\army_mh_classification_spouce_support.jsx .\src\App.jsx -Force
npm run dev
```

#### macOS / Linux (Terminal)

```bash
npm create vite@latest temp-home-finder-app -- --template react
cd temp-home-finder-app
npm install
cp ../temp-home-finder/army_mh_classification_spouce_support.jsx ./src/App.jsx
npm run dev
```

Vite will print a local URL (typically `http://localhost:5173`) you can open in your browser.

### 3) Build for production (optional)

#### Windows (PowerShell)

```powershell
npm run build
npm run preview
```

#### macOS / Linux (Terminal)

```bash
npm run build
npm run preview
```

## How to use the app

1. Click **⚙ Configure**.
2. Select one or more origin cities.
3. Set sweet-spot criteria:
   - Max travel time
   - Max average fare
   - Require BB/5G (optional)
   - Require daily flights (optional)
4. Adjust scoring weights based on your priorities.
5. Use tabs:
   - **Sweet** for shortlisted locations
   - **All** for full list
   - **Field** / **Non-Field** for category-specific views
6. Expand a hospital card to inspect factor-wise score breakdown and flight details.

## Important caveats

- All fares, frequencies, and transit times are **approximate** and can change seasonally or due to operations/weather.
- Connectivity in remote/field areas may vary by exact neighborhood, terrain, and network congestion.
- This app is a planning aid and should be used alongside latest on-ground verification.

## Intended use

Use this app to shortlist likely feasible stations for family accompaniment and remote-work viability—not as a final or official posting advisory.

## Current implementation notes

- Single-page React component with an in-file static dataset and scoring logic.
- Covers field and non-field hospitals with configurable filters and scoring.
