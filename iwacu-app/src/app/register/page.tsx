"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, User, Mail, Phone, Lock, Home, Briefcase } from "lucide-react";
import Image from "next/image";
import { useAuthStore } from "@/store/useAuthStore";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { cn } from "@/lib/utils";

const schema = z.object({
  name: z.string().min(2, "Full name is required"),
  email: z.string().email("Enter a valid email"),
  phone: z.string().min(10, "Enter a valid phone number"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string(),
  role: z.enum(["Buyer", "Agent"]),
}).refine((d) => d.password === d.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

type FormData = z.infer<typeof schema>;

export default function RegisterPage() {
  const router = useRouter();
  const { register: registerUser } = useAuthStore();
  const [showPwd, setShowPwd] = useState(false);
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { role: "Buyer" },
  });

  const role = watch("role");

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    await registerUser({ 
      name: data.name, 
      email: data.email, 
      phone: data.phone, 
      role: data.role, 
      password: data.password 
    });
    setLoading(false);
    router.push(data.role === "Agent" ? "/agent" : "/dashboard");
  };

  return (
    <div className="min-h-screen bg-[#0B0B0B] flex">
      {/* Left image */}
      <div className="hidden lg:block lg:w-1/2 relative">
        <Image
          src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&q=80"
          alt="Luxury Villa"
          fill
          className="object-cover"
          sizes="50vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#0B0B0B]" />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute bottom-12 left-12 right-12">
          <Link href="/" className="flex items-center gap-3 mb-8">
            <Image src="/Iwacu_logo.png" alt="IWACU" width={40} height={40} className="w-10 h-10" />
            <span className="text-2xl font-black tracking-widest text-white">IWACU</span>
          </Link>
          <h2 className="text-white text-2xl font-bold mb-3">Start your property journey today</h2>
          <p className="text-white/50 text-sm leading-relaxed">
            Join thousands of Rwandans buying, selling, and renting premium properties through IWACU.
          </p>
        </div>
      </div>

      {/* Right form */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-12 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          <Link href="/" className="flex items-center gap-2 mb-8 lg:hidden">
            <Image src="/Iwacu_logo.png" alt="IWACU" width={32} height={32} className="w-8 h-8" />
            <span className="text-xl font-black tracking-widest text-white">IWACU</span>
          </Link>

          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">Create an account</h1>
            <p className="text-white/40">Join IWACU and discover Rwanda&apos;s finest properties</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Role */}
            <div>
              <label className="text-sm font-medium text-white/80 mb-2 block">I am a…</label>
              <div className="grid grid-cols-2 gap-3">
                {(["Buyer", "Agent"] as const).map((r) => {
                  const Icon = r === "Buyer" ? Home : Briefcase;
                  return (
                    <button
                      key={r}
                      type="button"
                      onClick={() => setValue("role", r)}
                      className={cn(
                        "flex items-center gap-3 p-4 rounded-xl border text-sm font-medium transition-all",
                        role === r
                          ? "bg-[#C6A86A]/10 border-[#C6A86A] text-[#C6A86A]"
                          : "bg-white/3 border-white/10 text-white/50 hover:border-white/30"
                      )}
                    >
                      <Icon className="w-4 h-4" />
                      {r}
                    </button>
                  );
                })}
              </div>
              {errors.role && <p className="text-xs text-red-400 mt-1">{errors.role.message}</p>}
            </div>

            <Input
              label="Full Name"
              placeholder="Jean Mugisha"
              icon={<User className="w-4 h-4" />}
              error={errors.name?.message}
              {...register("name")}
            />

            <Input
              label="Email Address"
              type="email"
              placeholder="you@example.com"
              icon={<Mail className="w-4 h-4" />}
              error={errors.email?.message}
              {...register("email")}
            />

            <Input
              label="Phone Number"
              type="tel"
              placeholder="+250 788 000 000"
              icon={<Phone className="w-4 h-4" />}
              error={errors.phone?.message}
              {...register("phone")}
            />

            {/* Password */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-white/80">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                <input
                  type={showPwd ? "text" : "password"}
                  placeholder="Min 8 characters"
                  className={`w-full bg-white/5 border rounded-lg text-white placeholder:text-white/30 focus:outline-none focus:ring-1 transition-colors text-sm pl-10 pr-10 py-2.5 ${
                    errors.password ? "border-red-500 focus:ring-red-500" : "border-white/10 focus:border-[#C6A86A] focus:ring-[#C6A86A]"
                  }`}
                  {...register("password")}
                />
                <button type="button" onClick={() => setShowPwd(!showPwd)} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white">
                  {showPwd ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {errors.password && <p className="text-xs text-red-400">{errors.password.message}</p>}
            </div>

            <Input
              label="Confirm Password"
              type="password"
              placeholder="Repeat your password"
              icon={<Lock className="w-4 h-4" />}
              error={errors.confirmPassword?.message}
              {...register("confirmPassword")}
            />

            <div className="pt-1">
              <p className="text-white/30 text-xs mb-4">
                By creating an account you agree to our{" "}
                <Link href="#" className="text-[#C6A86A] hover:underline">Terms of Service</Link> and{" "}
                <Link href="#" className="text-[#C6A86A] hover:underline">Privacy Policy</Link>.
              </p>
              <Button type="submit" variant="gold" size="lg" className="w-full" loading={loading}>
                Create Account
              </Button>
            </div>
          </form>

          <p className="text-center text-white/40 text-sm mt-6">
            Already have an account?{" "}
            <Link href="/login" className="text-[#C6A86A] hover:underline font-medium">
              Sign in
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
