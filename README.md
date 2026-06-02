# IWACU — Rwanda's Premier Real Estate Platform 🏡

A complete, modern frontend-only real estate platform built for Rwanda, featuring luxury dark theme design, comprehensive dashboards, and a full property marketplace experience.

![IWACU Platform](https://img.shields.io/badge/Next.js-16.2.7-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38bdf8?style=flat-square&logo=tailwindcss)

---

## ✨ Features

### **🏠 Core Platform**
- **Property Marketplace** — Browse, search, filter and view detailed property listings
- **Property Details** — Full property pages with image galleries, amenities, agent info, and reviews
- **Advanced Search** — Location, type, price range, and amenity filtering
- **Favorites** — Save and manage favorite properties
- **Real-time Search** — Instant property search with multiple filters

### **👥 Multi-Role Dashboards**
#### **Buyer Dashboard**
- Overview with stats (saved properties, views, messages, notifications)
- Favorites management
- Message center with agents
- Notifications feed
- Profile management
- Settings & preferences

#### **Agent Dashboard**
- Performance overview with analytics
- Property management (view, add, edit, delete)
- Multi-step property submission form
- Analytics & insights (views, leads, conversion)
- Verification request system
- Profile customization

#### **Admin Dashboard**
- Platform statistics & growth metrics
- User management (buyers, agents, admins)
- Property approval workflow
- Agent verification management
- Platform settings & configuration

### **🎨 Design System**
- **Dark Luxury Theme** — Black (`#0B0B0B`) background with Gold (`#C6A86A`) accents
- **Glassmorphism Cards** — Modern frosted glass effects
- **Smooth Animations** — Framer Motion powered transitions
- **Fully Responsive** — Mobile, tablet, and desktop optimized
- **Premium Typography** — Clean, elegant font hierarchy

---

## 🚀 Tech Stack

| Category | Technology |
|----------|-----------|
| **Framework** | Next.js 15 (App Router) |
| **Language** | TypeScript 5 |
| **Styling** | Tailwind CSS v4 |
| **UI Components** | shadcn/ui + Radix UI |
| **Animations** | Framer Motion |
| **Icons** | Lucide React |
| **Charts** | Recharts |
| **Forms** | React Hook Form + Zod |
| **State** | Zustand (with persist) |
| **Carousel** | Swiper.js |

---

## 📂 Project Structure

```
src/
├── app/                          # Next.js App Router pages
│   ├── page.tsx                  # Homepage (hero, stats, featured, testimonials)
│   ├── properties/               # Property listing page
│   ├── property/[id]/            # Individual property detail
│   ├── login/                    # Login page
│   ├── register/                 # Registration page
│   ├── dashboard/                # Buyer dashboard
│   │   ├── page.tsx              # Overview
│   │   ├── favorites/            # Saved properties
│   │   ├── messages/             # Chat interface
│   │   ├── notifications/        # Notification center
│   │   ├── profile/              # Profile settings
│   │   └── settings/             # User preferences
│   ├── agent/                    # Agent dashboard
│   │   ├── page.tsx              # Overview with analytics
│   │   ├── properties/           # Property management
│   │   ├── add-property/         # Multi-step property form
│   │   ├── analytics/            # Performance insights
│   │   ├── verification/         # Verification submission
│   │   └── profile/              # Agent profile
│   ├── admin/                    # Admin dashboard
│   │   ├── page.tsx              # Platform overview
│   │   ├── users/                # User management
│   │   ├── properties/           # Property approval
│   │   ├── agents/               # Agent management
│   │   ├── verification/         # Verification requests
│   │   └── settings/             # Platform settings
│   └── agents/                   # Public agents directory
│
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx            # Responsive navbar with auth
│   │   └── Footer.tsx            # Site footer with newsletter
│   ├── ui/
│   │   ├── Button.tsx            # Button component
│   │   ├── Input.tsx             # Form input
│   │   ├── Badge.tsx             # Status badges
│   │   ├── StatCard.tsx          # Animated stat cards
│   │   ├── Pagination.tsx        # Page navigation
│   │   ├── EmptyState.tsx        # No results placeholder
│   │   └── LoadingSkeleton.tsx   # Loading placeholders
│   ├── property/
│   │   └── PropertyCard.tsx      # Property card (grid/list)
│   ├── shared/
│   │   ├── SearchBar.tsx         # Hero search component
│   │   ├── FilterSidebar.tsx     # Advanced filters
│   │   ├── AgentCard.tsx         # Agent profile card
│   │   └── ReviewCard.tsx        # Review display
│   └── dashboard/
│       ├── DashboardSidebar.tsx  # Multi-role sidebar
│       └── DashboardHeader.tsx   # Dashboard page header
│
├── data/
│   ├── properties.ts             # 20+ mock properties
│   ├── agents.ts                 # Mock agent profiles
│   └── reviews.ts                # Mock reviews
│
├── store/
│   ├── usePropertyStore.ts       # Property state + filters
│   └── useAuthStore.ts           # Auth state (mock)
│
├── types/
│   └── index.ts                  # TypeScript interfaces
│
├── constants/
│   └── index.ts                  # App constants (cities, types, etc.)
│
├── lib/
│   └── utils.ts                  # Utility functions
│
└── hooks/                        # Custom React hooks
```

---

## 🎯 Getting Started

### Prerequisites
- Node.js 20+ and npm/yarn
- Modern browser (Chrome, Firefox, Safari, Edge)

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd iwacu-app

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
# Create production build
npm run build

# Start production server
npm start
```

---

## 👤 Demo Accounts

The platform includes mock authentication. Use any password with these accounts:

| Role | Email | Dashboard |
|------|-------|-----------|
| **Buyer** | `buyer@iwacu.rw` | `/dashboard` |
| **Agent** | `agent@iwacu.rw` | `/agent` |
| **Admin** | `admin@iwacu.rw` | `/admin` |

---

## 🗂️ Key Pages

### Public Pages
- **`/`** — Homepage with hero, featured properties, categories, testimonials
- **`/properties`** — Property marketplace with filters and search
- **`/property/[id]`** — Property detail with gallery, info, agent card
- **`/agents`** — Agent directory
- **`/login`** — Authentication page
- **`/register`** — Registration with role selection

### Buyer Dashboard (`/dashboard`)
- Overview, Favorites, Messages, Notifications, Profile, Settings

### Agent Dashboard (`/agent`)
- Overview, My Properties, Add Property, Analytics, Verification, Profile

### Admin Dashboard (`/admin`)
- Overview, Users, Properties, Agents, Verification, Settings

---

## 🎨 Design Highlights

### Color Palette
```css
--gold: #C6A86A       /* Primary accent */
--black: #0B0B0B      /* Background */
--black-card: #111    /* Card backgrounds */
--white: #FFFFFF      /* Text */
```

### Typography
- **Headings**: Geist Sans (bold, black weights)
- **Body**: Geist Sans (regular weight)
- **Accents**: Gold gradient text effects

### Components
- Glassmorphism cards with subtle borders
- Smooth hover animations and transitions
- Elegant loading skeletons
- Responsive grid layouts
- Mobile-first design approach

---

## 📊 Mock Data

The platform includes realistic mock data:
- **20+ Properties** across Rwanda (Kigali, Musanze, Rubavu, Huye, etc.)
- **4 Agents** with profiles, ratings, and listings
- **5 Reviews** with user feedback
- Property types: Apartments, Houses, Villas, Land, Commercial, Offices
- Price ranges from RWF 600K/month to RWF 1.2B

All properties use real Unsplash images for visual quality.

---

## 🛠️ Customization

### Adding New Property Types
Edit `src/constants/index.ts`:
```typescript
export const PROPERTY_TYPES = ["Apartment", "House", "YourNewType"];
```

### Changing Theme Colors
Edit `src/app/globals.css`:
```css
:root {
  --gold: #YourColor;
  --black: #YourBackground;
}
```

### Adding New Cities
Edit `src/constants/index.ts`:
```typescript
export const CITIES = ["Kigali", "YourNewCity"];
```

---

## 📱 Responsive Breakpoints

| Breakpoint | Width | Usage |
|------------|-------|-------|
| `sm` | 640px+ | Tablets (portrait) |
| `md` | 768px+ | Tablets (landscape) |
| `lg` | 1024px+ | Laptops |
| `xl` | 1280px+ | Desktops |
| `2xl` | 1536px+ | Large displays |

---

## 🚧 Future Enhancements (Backend Integration)

When connecting to the backend API at `https://umuragetrust-backend.onrender.com/api/`:

1. Replace `MOCK_PROPERTIES` with API calls
2. Implement real authentication with JWT
3. Connect Zustand stores to API endpoints
4. Add image upload functionality
5. Implement real-time messaging
6. Add payment integration

---

## 📄 License

This project is for educational purposes. All rights reserved.

---

## 🤝 Contributing

This is a portfolio/educational project. Feel free to fork and customize for your own use.

---

## 📞 Support

For questions or issues, please open an issue in the repository.

---

**Built with ❤️ for Rwanda's Real Estate Market**
