"use client";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { User, UserRole } from "@/types";

interface AuthStore {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string, role?: UserRole) => Promise<boolean>;
  register: (data: Partial<User> & { password: string }) => Promise<boolean>;
  logout: () => void;
  updateProfile: (data: Partial<User>) => void;
}

// Mock user data
const MOCK_USERS: User[] = [
  {
    id: "user-buyer-001",
    name: "Jean Buyer",
    email: "buyer@iwacu.rw",
    phone: "+250 788 000 001",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80",
    role: "Buyer",
    isVerified: true,
    savedProperties: ["prop-001", "prop-006"],
    createdAt: "2024-01-01",
  },
  {
    id: "agent-001",
    name: "Emmanuel Habimana",
    email: "agent@iwacu.rw",
    phone: "+250 788 123 456",
    avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80",
    role: "Agent",
    isVerified: true,
    savedProperties: [],
    createdAt: "2016-03-15",
  },
  {
    id: "user-admin-001",
    name: "IWACU Admin",
    email: "admin@iwacu.rw",
    phone: "+250 788 999 000",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80",
    role: "Admin",
    isVerified: true,
    savedProperties: [],
    createdAt: "2023-01-01",
  },
];

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,

      login: async (email, _password) => {
        // Mock authentication
        const user = MOCK_USERS.find((u) => u.email.toLowerCase() === email.toLowerCase());
        if (user) {
          set({ user, isAuthenticated: true });
          return true;
        }
        return false;
      },

      register: async (data) => {
        const newUser: User = {
          id: `user-${Date.now()}`,
          name: data.name || "New User",
          email: data.email || "",
          phone: data.phone || "",
          avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&q=80",
          role: (data.role as UserRole) || "Buyer",
          isVerified: false,
          savedProperties: [],
          createdAt: new Date().toISOString(),
        };
        set({ user: newUser, isAuthenticated: true });
        return true;
      },

      logout: () => set({ user: null, isAuthenticated: false }),

      updateProfile: (data) => {
        set((s) => ({
          user: s.user ? { ...s.user, ...data } : null,
        }));
      },
    }),
    {
      name: "iwacu-auth-store",
    }
  )
);
