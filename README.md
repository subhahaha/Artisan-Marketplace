# Artisan MarketPlace

A multi-vendor marketplace for handmade goods from local Nepali artisans — pottery, textiles, jewelry, woodwork, and paper craft. Built as a portfolio project to demonstrate practical React skills beyond a basic shopping-cart clone: state management, form validation, authentication-gated routes, and a real client-server data flow.

** https://artisan-marketplace-git-main-svbha.vercel.app/

![Homepage screenshot](![alt text](image.png))


## Why this project

Most beginner e-commerce projects are single-vendor and read from static, hardcoded data. This one is a **multi-vendor marketplace**: buyers browse and check out as usual, but sellers can log in, list their own products, and see basic sales stats — closer to how a real platform like Etsy is structured, and a better showcase of CRUD, auth-gated routing, and derived state than a typical single-store demo.

## Features

**Buyer side**
- Product grid with live search and category filtering
- Product detail pages with dynamic routing
- Cart with quantity controls, persisted via a real backend (not just localStorage)
- Multi-field checkout form with full validation
- Stock-aware UI — "only X left" updates live based on what's already in your cart, and you're blocked from adding more than what's in stock

**Seller side**
- Mock authentication gating the dashboard (see [Demo credentials](#demo-credentials))
- Add / edit / delete product listings
- Basic sales stats dashboard (revenue chart, inventory value) — uses simulated data since there's no real order pipeline, and the UI says so explicitly

## Tech stack

| Layer | Tool | Why |
|---|---|---|
| UI | React 19 + Vite | Fast dev server, modern React |
| Routing | React Router v7 | Nested routes, protected routes for the seller dashboard |
| Styling | Tailwind CSS v4 | Utility-first, fast iteration |
| Cart / state | Context API + `useReducer` | Cart logic has multiple related actions (add/remove/update quantity) — a reducer keeps that in one predictable place instead of scattered `useState` calls |
| Forms | React Hook Form + Zod | Uncontrolled inputs avoid re-rendering on every keystroke; Zod centralizes validation rules in one schema instead of scattered `if` checks |
| Server state | TanStack Query (React Query) | Handles fetching, caching, and cache invalidation after mutations (e.g. refetching the seller's product list after adding one) |
| Charts | Recharts | Dashboard revenue chart |
| Backend | json-server | A REST API over a JSON file — enough to demonstrate real client-server data flow (loading states, error states, network failures) without building a full backend for a frontend-focused project |

## Project structure

```
kaarigar-bazaar/
├── server/
│   └── db.json              # json-server data — product catalog + seller listings
├── src/
│   ├── api/                 # fetch wrappers for the API
│   ├── components/          # reusable UI pieces (ProductCard, Navbar, ProductForm, ...)
│   ├── context/             # CartContext, AuthContext, ProductsContext
│   ├── data/                # static category list
│   ├── pages/                # one component per route
│   └── schemas/             # Zod validation schemas
└── package.json
```

## Getting started

Requires Node.js 18+.

```bash
git clone <your-repo-url>
cd kaarigar-bazaar
npm install
```

This project needs **two processes running at once**, in two terminals:

```bash
# Terminal 1 — the API
npm run server      # http://localhost:3001

# Terminal 2 — the frontend
npm run dev          # http://localhost:5173
```

## Demo credentials

The seller dashboard is gated by a mock login (no real backend auth — just enough to demonstrate protected routes):

```
Email:    seller@kaarigar.com
Password: password123
```

## Known limitations


- **Authentication is mock-only** — credentials are hardcoded client-side, not a real auth system. Fine for a demo, not production-ready.
- **Sales stats are simulated** — there's no real order pipeline generating revenue data, so the dashboard chart uses seeded (but deterministic, not random-every-refresh) placeholder numbers. The UI labels this explicitly.
- **Checkout doesn't process real payment** — it validates and submits a mock order, then clears the cart.
- **json-server is a development stand-in**, not a production database — good enough to demonstrate a real client-server split (loading states, error handling, cache invalidation), but a production version would swap this for a proper backend (e.g. FastAPI, which I've used in other projects).

## Possible next steps

- Swap json-server for a real backend (FastAPI) with a proper database
- Real authentication (JWT-based)
- Image upload instead of pasting a URL for new listings
- Order history tied to a real backend

