"use client";
import { AnimatedBackground } from "@/components/motion-primitives/animated-background";
import { signOut, useSession } from "next-auth/react";
import React, { useEffect, useRef } from "react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { GeneratedAvatar } from "./GeneratedAvatar";
import { Delete, LogOut, User } from "lucide-react";
import { showToast } from "@/lib/toaster";

const TABS = [
  { name: "Home", path: "/" },
  { name: "ATS", path: "/resume" },
  { name: "Rank", path: "/rank" },
  { name: "Contact", path: "/contact" },
];

const Navbar = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  const searchParams = useSearchParams();

  const login_requiredToast = searchParams.get("toast");
  const toastShown = useRef(false);
  const pathname = usePathname();
  useEffect(() => {
    if (!toastShown.current) {
      if (login_requiredToast === "login_required") {
        showToast.warning("Please login to continue");
        toastShown.current = true;
      }
    }
  }, [login_requiredToast]);
  let onResumePage = false;
  if (session) {
    onResumePage = pathname.startsWith(`/resume/${session.user.resumeIds}`);
  }

  const handleTabClick = (path: string) => {
    router.push(path);
  };
  useEffect(() => {
    const toast = localStorage.getItem("toast");
    if (!toast) return;

    switch (toast) {
      case "login_success":
        showToast.success("You have logged in");
        break;
      case "register_success":
        showToast.success("You are registered successfully");
        break;
      case "logged_out":
        showToast.warning("You are logged out");
        break;
      case "ats_success":
        showToast.success("ATS calculated successfully");
        break;
    }

    localStorage.removeItem("toast");
  }, []);
  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-6xl px-8">
      <div className="relative overflow-hidden rounded-3xl border border-emerald-500/20 bg-gradient-to-r from-slate-900/95 via-gray-900/98 to-slate-900/95 backdrop-blur-2xl shadow-2xl shadow-emerald-950/40">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 via-transparent to-emerald-500/5"></div>
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-400/50 to-transparent"></div>

        <div className="relative flex items-center justify-between py-4 px-8">
          <div className="flex items-center space-x-3">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center shadow-lg shadow-emerald-500/30">
              <div className="h-4 w-4 rounded-sm bg-white/20 backdrop-blur-sm"></div>
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-emerald-300 to-emerald-500 bg-clip-text text-transparent tracking-tight">
              Resume Checker
            </span>
          </div>

          <div className="flex items-center">
            <AnimatedBackground
              defaultValue={TABS[0].name}
              className="rounded-2xl bg-gradient-to-r from-emerald-500/10 to-emerald-400/15 shadow-inner"
              transition={{
                type: "spring",
                bounce: 0.15,
                duration: 0.4,
              }}
              enableHover
            >
              {TABS.map((tab, index) => (
                <button
                  key={index}
                  data-id={tab.name}
                  type="button"
                  onClick={() => handleTabClick(tab.path)}
                  className="relative px-5.5 py-2 text-lg text-emerald-300/90 transition-all duration-300 hover:text-emerald-200 group"
                >
                  <span className="relative z-10">{tab.name}</span>
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-emerald-500/0 to-emerald-400/0 group-hover:from-emerald-500/5 group-hover:to-emerald-400/10 transition-all duration-300"></div>
                </button>
              ))}
            </AnimatedBackground>
          </div>

          <div className="flex items-center">
            {status === "authenticated" ? (
              <DropdownMenu>
                <DropdownMenuTrigger className="group relative p-1 rounded-full bg-gradient-to-br from-slate-800/80 to-slate-900/90 border border-emerald-400/30 shadow-lg shadow-emerald-500/20 hover:shadow-emerald-400/30 hover:shadow-xl transition-all duration-300 hover:scale-105">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-emerald-400/10 to-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  {session.user.image ? (
                    <Avatar className="h-9 w-9 relative z-10">
                      <AvatarImage
                        src={session?.user?.image}
                        className="rounded-full object-cover ring-2 ring-emerald-400/20"
                      />
                    </Avatar>
                  ) : (
                    <GeneratedAvatar
                      seed={session.user.name}
                      className="h-9 w-9 relative z-10 ring-2 ring-emerald-400/20"
                      variant="initials"
                    />
                  )}
                </DropdownMenuTrigger>

                <DropdownMenuContent className="w-56 p-2 mt-4 bg-gradient-to-br from-slate-900/98 via-gray-900/98 to-slate-900/98 backdrop-blur-2xl rounded-2xl border border-emerald-500/20 shadow-2xl shadow-emerald-950/50 animate-in fade-in slide-in-from-top-2 duration-300">
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-emerald-500/5 to-transparent"></div>
                  <div className="relative">
                    <DropdownMenuLabel className="px-4 py-3 text-emerald-200 font-semibold text-base">
                      <div className="truncate">{session.user?.name}</div>
                      <div className="text-xs text-emerald-400/70 font-normal truncate mt-0.5">
                        {session.user?.email}
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator className="bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent my-2" />

                    <DropdownMenuItem
                      disabled={onResumePage}
                      onSelect={(e) => {
                        if (onResumePage) {
                          e.preventDefault();
                          return;
                        }
                        handleTabClick(`resume/${session.user.resumeIds}`);
                      }}
                      className="flex items-center gap-3 hover:bg-gradient-to-r hover:from-emerald-500/10 hover:to-emerald-400/5 px-4 py-3 rounded-xl transition-all duration-200 cursor-pointer group"
                    >
                      <User className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform duration-200" />
                      <span className="text-emerald-100 font-medium">
                        Profile
                      </span>
                    </DropdownMenuItem>

                    <DropdownMenuItem
                      onClick={async (e) => {
                        e.preventDefault();
                        const res = await fetch("/api/users/delete", {
                          method: "POST",
                        });

                        const data = await res.json();

                        if (!res.ok || data.error) {
                          showToast.warning(data.message || "Deleter failed");
                          return;
                        }
                        showToast.info("Resume deleted successfully!");
                        handleTabClick("resume")
                      }}
                      className="flex items-center gap-3 hover:bg-gradient-to-r hover:from-emerald-500/10 hover:to-emerald-400/5 px-4 py-3 rounded-xl transition-all duration-200 cursor-pointer group"
                    >
                      <Delete className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform duration-200" />
                      <span className="text-emerald-100 font-medium">
                        Delete Your Resume
                      </span>
                    </DropdownMenuItem>

                    <DropdownMenuSeparator className="bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent my-2" />

                    <DropdownMenuItem
                      onClick={async () => {
                        localStorage.setItem("toast", "logged_out");
                        await signOut({ callbackUrl: "/" });
                      }}
                      className="flex items-center gap-3 text-red-300 hover:bg-gradient-to-r hover:from-red-500/10 hover:to-red-400/5 px-4 py-3 rounded-xl transition-all duration-200 cursor-pointer group"
                    >
                      <LogOut className="w-4 h-4 text-red-400 group-hover:scale-110 transition-transform duration-200" />
                      <span className="font-medium">Logout</span>
                    </DropdownMenuItem>
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link href="/auth/login">
                <button className="relative px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500/10 to-emerald-400/15 border border-emerald-400/30 text-emerald-300 font-medium shadow-lg shadow-emerald-500/20 hover:shadow-emerald-400/30 hover:shadow-xl hover:from-emerald-500/20 hover:to-emerald-400/25 hover:text-emerald-200 hover:scale-105 transition-all duration-300 group overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/0 via-emerald-300/5 to-emerald-400/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                  <span className="relative z-10">Login</span>
                </button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
