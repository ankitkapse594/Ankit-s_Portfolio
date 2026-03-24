# Ankit Kapse — Personal Portfolio

A futuristic, AI-inspired personal portfolio website built with React, Vite, and Express. Features a dark theme with neon accents, glassmorphism UI, interactive particle animations, and a functional contact form backed by PostgreSQL.

---

## Live Demo

Deploy to Netlify in one click by connecting this repository (see [Deployment](#deployment) below).

---

## Features

- **Futuristic Dark Theme** — Neon cyan, violet, and pink accents with glassmorphism panels
- **Interactive Particle Network** — Canvas-based neural network that reacts to mouse movement
- **Custom Neon Cursor** — Glowing dot with spring-physics trailing ring; changes colour on hover
- **Text Scramble Effect** — Hero name resolves from random characters on load (matrix/hacker style)
- **Typing Animation** — Roles cycle with live type/delete animation and blinking cursor
- **Scroll Progress Bar** — Tri-colour gradient bar at the top of the page
- **3D Animations** — Mouse-tracking tilt on project cards, 3D floating geometry, perspective entrances
- **Experience Timeline** — Vertical neon-accented timeline with bullet points
- **Projects Section** — 3D tilt cards with glare shimmer and tag pills
- **Skills Grid** — 3D perspective flip-in cards with icon spin on hover
- **Certifications** — Cards with Google Drive link to view originals
- **Contact Form** — Validated form (Zod + React Hook Form) that saves to PostgreSQL
- **Netlify-Ready** — Static frontend + serverless function for the contact API

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18, Vite 7, TypeScript |
| Styling | Tailwind CSS v3, shadcn/ui |
| Animations | Framer Motion, Canvas 2D API |
| Forms | React Hook Form, Zod |
| Data Fetching | TanStack Query v5 |
| Backend (dev) | Express.js |
| Backend (prod) | Netlify Functions (serverless) |
| Database | PostgreSQL via Drizzle ORM |
| Fonts | Orbitron (display), Exo 2 (body), JetBrains Mono |

---

## Project Structure

```
├── client/               # React frontend (Vite root)
│   ├── public/           # Static assets & _redirects
│   └── src/
│       ├── components/   # UI + animation components
│       ├── hooks/        # Custom React hooks
│       └── pages/        # Page components
├── netlify/
│   └── functions/
│       └── contact.ts    # Serverless contact form handler
├── server/               # Express server (development only)
├── shared/
│   ├── schema.ts         # Drizzle schema + Zod types
│   └── routes.ts         # Shared API definitions
├── attached_assets/      # Profile photo & resume PDF
├── netlify.toml          # Netlify build & redirect config
└── vite.config.ts        # Vite configuration
```

---

## Getting Started (Local Development)

### Prerequisites

- Node.js 20+
- A PostgreSQL database (connection string required)

### Setup

```bash
# 1. Install dependencies
npm install

# 2. Set environment variables
# Create a .env file or export directly:
export DATABASE_URL="postgresql://user:password@host:5432/dbname"
export SESSION_SECRET="your-secret-here"

# 3. Push the database schema
npm run db:push

# 4. Start the development server
npm run dev
```

The app will be available at `http://localhost:5000`.

---

## Production Build

```bash
npm install
npx vite build
```

Output is written to `dist/public/` — this is what Netlify serves as the static site.

---

## Deployment

### Netlify (Recommended)

1. **Push** this repository to GitHub or GitLab.
2. **Connect** the repo to [Netlify](https://netlify.com) — it will auto-detect `netlify.toml`.
3. **Set environment variables** in Netlify → Site configuration → Environment variables:

   | Variable | Value |
   |---|---|
   | `DATABASE_URL` | Your PostgreSQL connection string |

4. **Deploy** — Netlify runs `npx vite build`, publishes `dist/public/`, and deploys the contact serverless function automatically.

> **How the backend works on Netlify:**  
> Netlify can't run a long-running Express server. Instead, the single API endpoint (`POST /api/contact`) is served by a Netlify Function at `netlify/functions/contact.ts`. The `netlify.toml` transparently redirects `/api/contact` to `/.netlify/functions/contact`, so the frontend code requires no changes.

### SPA Routing

Deep links and page refreshes are handled by two redirect rules (both present for redundancy):
- `netlify.toml` `[[redirects]]` rule
- `dist/public/_redirects` file (copied from `client/public/_redirects` at build time)

---

## Environment Variables

| Variable | Required | Description |
|---|---|---|
| `DATABASE_URL` | Yes | PostgreSQL connection string |
| `SESSION_SECRET` | Dev only | Express session secret (not used in production/Netlify) |

---

## Customisation

To update the portfolio content, edit the data arrays at the top of `client/src/pages/Home.tsx`:

- `experiences` — Work history
- `projects` — Project cards
- `skills` — Tech stack categories
- `certifications` — Certification cards

To change the profile photo or resume, replace the files in `attached_assets/` and update the import paths in `Home.tsx`.

---

## Contact

**Ankit Kapse**  
📧 ankitkapse594@gmail.com  
📞 +91 7499039470  
📍 Nagpur, India  
🔗 [LinkedIn](https://www.linkedin.com/in/ankit-kapse-ak02) · [GitHub](https://github.com/ankitkapse594) · [Codolio](https://codolio.com/profile/ankit_kapse)
