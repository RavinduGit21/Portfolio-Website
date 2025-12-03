## Ceylon Journeys

Discover Sri Lanka with a modern, fast, and responsive web app showcasing destinations, tours, hotels, and a handy "Plan Your Trip" tool. Built with React, TypeScript, Vite, Tailwind CSS, and shadcn‑ui components.

### Demo
- **URL**: https://ceylon-journies.vercel.app/
- **Title**: Ceylon Journeys — Discover Sri Lanka's Beauty
- SPA routing with `react-router-dom`
- Vercel-ready deployment (`vercel.json` rewrite for SPA)

---

### Features
- Home page with sections: Header, Hero, Destinations, Hotels, Tours, About, Contact, Footer
- Plan Your Trip page with filters (budget slider, duration, interests, search) and sample itineraries
- Floating in‑app Chatbot with suggested Q&A and linkified replies
- Theme support via `next-themes` and `TooltipProvider`
- Toast and sonner notifications (`ui/toaster`, `ui/sonner`)
- Responsive UI built with Tailwind and shadcn‑ui primitives

---

### Tech Stack
- React 18 + TypeScript
- Vite 5 (React SWC plugin)
- Tailwind CSS 3 + `tailwindcss-animate`
- shadcn‑ui components (Radix UI under the hood)
- React Router v6
- TanStack Query for async state
- Zod, React Hook Form (available in deps)

---

### Getting Started

Prerequisites: Node.js 18+ and npm.

```bash
# install dependencies
npm install

# start dev server (http://localhost:8080)
npm run dev

# production build
npm run build

# preview production build
npm run preview

# lint
npm run lint
```

Vite dev server is configured to run on port 8080 and listen on all interfaces.

---

### Project Structure

```
.
├─ public/
│  └─ logo.png, favicons, robots.txt
├─ src/
│  ├─ assets/               # images used across the app
│  ├─ components/
│  │  ├─ ui/                # shadcn‑ui components
│  │  ├─ Chatbot.tsx
│  │  ├─ Header.tsx, Footer.tsx, Hero.tsx, ...
│  ├─ hooks/
│  ├─ lib/
│  ├─ pages/
│  │  ├─ Index.tsx          # home page
│  │  ├─ PlanYourTrip.tsx   # filters and itineraries
│  │  └─ NotFound.tsx
│  ├─ App.tsx               # router and providers
│  ├─ main.tsx              # React root
│  └─ index.css             # Tailwind layers and design tokens
├─ index.html               # app shell
├─ tailwind.config.ts       # Tailwind setup
├─ vite.config.ts           # Vite + aliases + plugins
├─ tsconfig.json            # path alias `@/*`
└─ vercel.json              # SPA rewrites for Vercel
```

---

### Routing
Defined in `src/App.tsx` using `react-router-dom`:
- `/` → `pages/Index`
- `/plan` → `pages/PlanYourTrip`
- `*` → `pages/NotFound`

`vercel.json` includes a catch‑all rewrite to `/` for client‑side routing.

---

### UI System
- Tailwind configuration extends colors, shadows, radii, typography, and animations
- Design tokens are defined in `src/index.css` as CSS variables (HSL)
- shadcn‑ui components live in `src/components/ui`

Helpful utilities:
- Alias `@` → `./src` (configured in `vite.config.ts` and `tsconfig`)
- `Toaster` and `Sonner` mounted in `App.tsx`

---

### Development Notes
- Dev server: `vite` on port 8080
- Build modes: `npm run build` (prod), `npm run build:dev` (development mode bundle)
- Linting via ESLint 9 + TypeScript ESLint
- Images are imported from `src/assets`

---

### Deployment (Vercel)
This project is ready for Vercel. Key points:
- `vercel.json` rewrites all routes to `/` (SPA)
- Build command: `npm run build`
- Output directory: `dist`

On other static hosts, ensure unknown routes are served by `index.html`.

---

### Contributing
1. Fork and create a feature branch
2. Install dependencies and run `npm run dev`
3. Commit with clear messages and open a PR

---

### License
This project is provided as‑is. Add a license file if you plan to distribute.
