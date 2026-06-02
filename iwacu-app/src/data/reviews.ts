import type { Review } from "@/types";

export const MOCK_REVIEWS: Review[] = [
  {
    id: "rev-001",
    userId: "user-001",
    userName: "David Mugisha",
    userAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80",
    propertyId: "prop-001",
    rating: 5,
    comment:
      "Absolutely stunning villa. Emmanuel was incredibly professional and guided us through the entire process. We couldn't be happier with our new home.",
    createdAt: "2024-02-20",
  },
  {
    id: "rev-002",
    userId: "user-002",
    userName: "Sarah Uwase",
    userAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80",
    propertyId: "prop-002",
    rating: 5,
    comment:
      "The apartment is exactly as described. Amina was responsive and very helpful. The city views are breathtaking every morning.",
    createdAt: "2024-03-01",
  },
  {
    id: "rev-003",
    userId: "user-003",
    userName: "Patrick Nzabonimana",
    userAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&q=80",
    propertyId: "prop-006",
    rating: 4,
    comment:
      "Beautiful property with amazing volcano views. The agent was knowledgeable about the area. Minor delays in paperwork but overall great experience.",
    createdAt: "2024-03-10",
  },
  {
    id: "rev-004",
    userId: "user-004",
    userName: "Grace Umutoniwase",
    userAvatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=100&q=80",
    propertyId: "prop-007",
    rating: 5,
    comment:
      "Waking up to Lake Kivu every day is a dream come true. Christine found us the perfect lakefront home. Exceptional service from start to finish.",
    createdAt: "2024-03-12",
  },
  {
    id: "rev-005",
    userId: "user-005",
    userName: "Bernard Hakizimana",
    userAvatar: "https://images.unsplash.com/photo-1463453091185-61582044d556?w=100&q=80",
    propertyId: "prop-003",
    rating: 4,
    comment:
      "Solid family home in a great neighbourhood. Emmanuel handled everything professionally. We negotiated a fair price and moved in quickly.",
    createdAt: "2024-02-28",
  },
];
