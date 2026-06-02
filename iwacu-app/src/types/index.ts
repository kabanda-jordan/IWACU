// ============================================================
// IWACU Real Estate Platform — Type Definitions
// ============================================================

export type PropertyType =
  | "Apartment"
  | "House"
  | "Villa"
  | "Land"
  | "Commercial"
  | "Office";

export type PropertyStatus = "For Sale" | "For Rent" | "Sold" | "Rented";

export type UserRole = "Buyer" | "Agent" | "Admin";

export interface Property {
  id: string;
  title: string;
  description: string;
  price: number;
  priceType: "sale" | "rent"; // rent = per month
  type: PropertyType;
  status: PropertyStatus;
  city: string;
  district: string;
  address: string;
  bedrooms: number;
  bathrooms: number;
  area: number; // sqm
  parking: number;
  floors?: number;
  yearBuilt?: number;
  images: string[];
  amenities: string[];
  features: string[];
  agentId: string;
  isFeatured: boolean;
  isVerified: boolean;
  views: number;
  createdAt: string;
  updatedAt: string;
}

export interface Agent {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  bio: string;
  city: string;
  specialization: PropertyType[];
  listings: number;
  sold: number;
  rating: number;
  reviews: number;
  isVerified: boolean;
  joinedAt: string;
}

export interface Review {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  propertyId: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  role: UserRole;
  isVerified: boolean;
  savedProperties: string[];
  createdAt: string;
}

export interface Message {
  id: string;
  senderId: string;
  senderName: string;
  senderAvatar: string;
  receiverId: string;
  content: string;
  createdAt: string;
  isRead: boolean;
}

export interface Conversation {
  id: string;
  participants: string[];
  participantName: string;
  participantAvatar: string;
  lastMessage: string;
  lastMessageAt: string;
  unreadCount: number;
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: "info" | "success" | "warning" | "error";
  isRead: boolean;
  createdAt: string;
}

export interface FilterState {
  type: PropertyType | "";
  status: PropertyStatus | "";
  city: string;
  district: string;
  minPrice: number;
  maxPrice: number;
  minBedrooms: number;
  minBathrooms: number;
  minArea: number;
  maxArea: number;
  amenities: string[];
}

export interface StatCard {
  label: string;
  value: number;
  suffix?: string;
  prefix?: string;
}
