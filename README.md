# IWACU — Rwanda's Premier Real Estate Platform

A modern, full-featured real estate platform built for Rwanda with a luxury dark theme, multi-role dashboards, and a complete property marketplace.

![Next.js](https://img.shields.io/badge/Next.js-16.2.7-black?style=flat-square&logo=next.js)
![React](https://img.shields.io/badge/React-19-58c4dc?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)
![Tailwind](https://img.shields.io/badge/Tailwind-4-38bdf8?style=flat-square&logo=tailwindcss)

## Tech Stack

| Category          | Technology                                                       |
| ----------------- | ---------------------------------------------------------------- |
| **Framework**     | Next.js 16 (App Router + Turbopack)                              |
| **Language**      | TypeScript 5                                                     |
| **Styling**       | Tailwind CSS v4                                                  |
| **Animations**    | Framer Motion (spring physics, staggered reveals, hover effects) |
| **Icons**         | Lucide React                                                     |
| **Charts**        | Recharts                                                         |
| **Forms**         | React Hook Form + Zod                                            |
| **State**         | Zustand with localStorage persist                                |
| **Carousel**      | Swiper.js                                                        |
| **UI Primitives** | Radix UI (avatar, dialog, dropdown, select, tabs, toast, etc.)   |
| **Utilities**     | class-variance-authority, clsx, tailwind-merge                   |

## Features

### Core Platform

- **Property Marketplace** — Browse, search, and filter listings across Rwanda
- **Property Details** — Image galleries, amenities, agent info, reviews, contact
- **Advanced Filters** — Location, property type, price range, bedrooms, amenities
- **Favorites** — Save and manage liked properties
- **Multi-role Auth** — Login/register with Buyer, Agent, or Admin role

### Buyer Dashboard (`/dashboard`)

Overview stats, favorites, messaging, notifications, profile, settings.

### Agent Dashboard (`/agent`)

Performance analytics, property management (CRUD), multi-step property submission, verification requests, profile.

### Admin Dashboard (`/admin`)

Platform statistics, user management, property approval, agent verification, settings.

## Design

- **Dark luxury theme** — Black (`#0B0B0B`) background with gold (`#C6A86A`) accents
- **Glassmorphism cards** — Frosted glass surfaces with subtle borders
- **Smooth animations** — Spring-based entry, staggered reveals, hover lifts, border glows, image zooms, animated counters
- **Fully responsive** — Mobile-first, all breakpoints

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

````

## Build

```bash
npm run build
npm start
````
