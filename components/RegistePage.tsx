"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import AnimatedContent from "@/components/AnimatedContent";
import React, { useState } from "react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { showToast } from "@/lib/toaster";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters long",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters long.",
  }),
});

export default function RegisterPage({ callbackUrl }: { callbackUrl: string }) {
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { username: "", email: "", password: "" },
  });

  const onClick = (provider: "google" | "github") => {
    localStorage.setItem("toast", "register_success");
    signIn(provider, { callbackUrl });
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    try {
      const res = await fetch("/api/users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const data = await res.json();

      if (!res.ok) {
        const errMsg = data?.error || "Registration failed. Please try again.";
        showToast.error(errMsg);
        setLoading(false);
      } else {
        localStorage.setItem("toast", "register_success");
        signIn("credentials", {
          email: values.email,
          password: values.password,
          callbackUrl,
        });
      }
    } catch (err: unknown) {
      showToast.error(
        err instanceof Error ? err.message : "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative">
      <AnimatedContent
        distance={200}
        direction="vertical"
        reverse={false}
        duration={0.5}
        ease="easeOutCubic"
        initialOpacity={0}
        animateOpacity
        scale={1.05}
        threshold={0.2}
        delay={0.15}
      >
        <div className="relative z-10 backdrop-blur-2xl bg-gradient-to-br from-gray-900/70 via-black/60 to-emerald-900/20 
          border border-emerald-400/40 rounded-2xl shadow-[0_8px_40px_#10b98166] 
          px-10 py-10 w-[450px] max-w-full">
          <h2 className="text-4xl font-extrabold mb-8 text-center bg-gradient-to-r from-emerald-400 via-green-300 to-emerald-500 bg-clip-text text-transparent drop-shadow-lg">
            Register
          </h2>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-7">
              {/* Username */}
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-emerald-300">Username</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your username"
                        {...field}
                        value={field.value ?? ""}
                        className="bg-black/40 border border-emerald-500/30 text-emerald-200 placeholder-gray-600 
                          focus:border-emerald-400 focus:ring-emerald-400 rounded-xl shadow-inner"
                      />
                    </FormControl>
                    <FormDescription className="text-gray-500 text-sm">
                      This is your public username
                    </FormDescription>
                    <FormMessage className="text-red-400 text-sm" />
                  </FormItem>
                )}
              />

              {/* Email */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-emerald-300">Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your email"
                        {...field}
                        value={field.value ?? ""}
                        className="bg-black/40 border border-emerald-500/30 text-emerald-200 placeholder-gray-600 
                          focus:border-emerald-400 focus:ring-emerald-400 rounded-xl shadow-inner"
                      />
                    </FormControl>
                    <FormDescription className="text-gray-500 text-sm">
                      This is your email address.
                    </FormDescription>
                    <FormMessage className="text-red-400 text-sm" />
                  </FormItem>
                )}
              />

              {/* Password */}
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-emerald-300">Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Enter your password"
                        {...field}
                        value={field.value ?? ""}
                        className="bg-black/40 border border-emerald-500/30 text-emerald-200 placeholder-gray-600 
                          focus:border-emerald-400 focus:ring-emerald-400 rounded-xl shadow-inner"
                      />
                    </FormControl>
                    <FormDescription className="text-gray-500 text-sm">
                      Must be at least 6 characters long.
                    </FormDescription>
                    <FormMessage className="text-red-400 text-sm" />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-emerald-500 via-green-400 to-emerald-600 
                  hover:from-emerald-400 hover:to-green-500 
                  text-black font-semibold rounded-xl py-2.5 shadow-[0_0_20px_#10b981aa] transition-all duration-300"
              >
                Register
              </Button>
            </form>
          </Form>

          {/* Divider */}
          <div className="flex items-center gap-4 mt-6">
            <hr className="flex-grow border-t border-white/20" />
            <span className="text-white/50 text-sm">or</span>
            <hr className="flex-grow border-t border-white/20" />
          </div>

          {/* OAuth Buttons */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 mt-6">
            <Button
              onClick={() => onClick("google")}
              variant="ghost"
              className="cursor-pointer hover:text-cyan-400 flex items-center gap-2 px-6 py-2 rounded-xl shadow-md bg-cyan-400/10 backdrop-blur-md border border-white/20 hover:bg-cyan-400/20 transition text-white"
            >
              <FcGoogle className="w-5 h-5" />
              <span className="text-sm font-medium">Google</span>
            </Button>
            <Button
              onClick={() => onClick("github")}
              variant="ghost"
              className="cursor-pointer hover:text-cyan-400 flex items-center gap-2 px-6 py-2 rounded-xl shadow-md bg-cyan-400/10 backdrop-blur-md border border-white/20 hover:bg-cyan-400/20 transition text-white"
            >
              <FaGithub className="w-5 h-5" />
              <span className="text-sm font-medium">Github</span>
            </Button>
          </div>

          {/* Login link */}
          <p className="text-sm text-center text-white/70 mt-8">
            Already have an account?{" "}
            <Link
              href="/auth/login"
              className="text-cyan-400 hover:text-cyan-300 font-semibold underline underline-offset-4 transition"
            >
              Login
            </Link>
          </p>
        </div>
      </AnimatedContent>
    </div>
  );
}
