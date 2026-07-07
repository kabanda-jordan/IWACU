// ============================================================
// IWACU — App-wide Constants
// ============================================================

export const GOLD = "#C6A86A";
export const BLACK = "#0B0B0B";

export const CITIES = [
  "Kigali",
  "Musanze",
  "Rubavu",
  "Huye",
  "Rusizi",
  "Nyagatare",
  "Muhanga",
  "Kayonza",
];

export const DISTRICTS: Record<string, string[]> = {
  Kigali: ["Gasabo", "Kicukiro", "Nyarugenge"],
  Musanze: ["Musanze"],
  Rubavu: ["Rubavu"],
  Huye: ["Huye"],
  Rusizi: ["Rusizi"],
  Nyagatare: ["Nyagatare"],
  Muhanga: ["Muhanga"],
  Kayonza: ["Kayonza"],
};

export const PROPERTY_TYPES = [
  "Apartment",
  "House",
  "Villa",
  "Land",
  "Commercial",
  "Office",
] as const;

export const AMENITIES = [
  "Swimming Pool",
  "Garden",
  "Gym",
  "Security",
  "Parking",
  "Generator",
  "Solar Power",
  "Internet",
  "Air Conditioning",
  "Balcony",
  "Elevator",
  "Furnished",
];

export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Properties", href: "/properties" },
  { label: "Agents", href: "/agents" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export const PRICE_RANGES = [
  { label: "Any Price", min: 0, max: 0 },
  { label: "Under RWF 50M", min: 0, max: 50000000 },
  { label: "RWF 50M – 100M", min: 50000000, max: 100000000 },
  { label: "RWF 100M – 200M", min: 100000000, max: 200000000 },
  { label: "RWF 200M – 500M", min: 200000000, max: 500000000 },
  { label: "Above RWF 500M", min: 500000000, max: 0 },
];

export const BEDROOM_OPTIONS = [1, 2, 3, 4, 5];
export const BATHROOM_OPTIONS = [1, 2, 3, 4, 5];

export const SORT_OPTIONS = [
  { label: "Newest First", value: "newest" },
  { label: "Oldest First", value: "oldest" },
  { label: "Price: Low to High", value: "price_asc" },
  { label: "Price: High to Low", value: "price_desc" },
  { label: "Most Viewed", value: "most_viewed" },
];

export const PROPERTY_CATEGORIES = [
  {
    type: "House",
    icon: "Home",
    description: "Family homes with gardens",
    count: 48,
  },
  {
    type: "Apartment",
    icon: "Building2",
    description: "Modern urban apartments",
    count: 92,
  },
  {
    type: "Villa",
    icon: "Castle",
    description: "Luxury villas & estates",
    count: 24,
  },
  {
    type: "Land",
    icon: "Landmark",
    description: "Prime plots & land",
    count: 65,
  },
  {
    type: "Commercial",
    icon: "Store",
    description: "Shops & commercial spaces",
    count: 31,
  },
  {
    type: "Office",
    icon: "Briefcase",
    description: "Office spaces & suites",
    count: 18,
  },
];

export const WHY_IWACU = [
  {
    icon: "ShieldCheck",
    title: "Verified Listings",
    description:
      "Every property on IWACU is verified by our team to ensure authenticity and accuracy.",
  },
  {
    icon: "UserCheck",
    title: "Trusted Agents",
    description:
      "Work with certified professionals who know Rwanda's real estate market inside out.",
  },
  {
    icon: "Lock",
    title: "Secure Transactions",
    description:
      "Our platform ensures your property transactions are safe, transparent, and legally sound.",
  },
  {
    icon: "MapPin",
    title: "Rwanda-wide Coverage",
    description:
      "From Kigali to Rubavu, discover premium properties across all Rwanda's major cities.",
  },
];

export const PLATFORM_STATS = [
  { label: "Properties Listed", value: 2847, suffix: "+" },
  { label: "Active Agents", value: 126, suffix: "+" },
  { label: "Happy Clients", value: 5200, suffix: "+" },
  { label: "Cities Covered", value: 12, suffix: "+" },
];
