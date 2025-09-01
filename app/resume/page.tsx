"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Upload, FileText, User } from "lucide-react";
import { TextShimmerWave } from "@/components/motion-primitives/text-shimmer-wave";
import AnimatedContent from "@/components/AnimatedContent";
import { showToast } from "@/lib/toaster";

const Page = () => {
  const [files, setfiles] = useState<File | null>(null);
  const [schId, setschId] = useState<string>("");
  const [loading, setloading] = useState(false);
  const router = useRouter();

  const sender = async () => {
    setloading(true);

    try {
      if (!files || !schId) {
        showToast.error("Please upload file and enter scholar ID");
        return;
      }

      const formData = new FormData();
      formData.append("resume", files);
      formData.append("schId", schId);

      const res = await fetch("/api/users/resume", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok || data.error) {
        showToast.error(data.message || "Upload failed");
        return;
      }

      if (data.statuss === "success" && data.resumeId) {
        showToast.success("Resume uploaded successfully!");  
        router.push(`resume/${data.resumeId}`);
      } else {
        showToast.error("Upload failed - invalid response");
      }
    } catch (error) {
      if (error instanceof Error) {
        showToast.error(error.message || "An error occurred during upload");
      }
    } finally {
      setloading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
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
        <div className="absolute inset-0  bg-[radial-gradient(circle_at_50%_50%,_rgba(16,185,129,0.1)_0%,_transparent_50%)]"></div>

        <div className="relative w-full max-w-lg">
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 rounded-3xl blur-xl"></div>

          <div className="relative overflow-hidden rounded-3xl border border-emerald-500/20 bg-gradient-to-br from-slate-900/95 via-gray-900/98 to-slate-950/95 backdrop-blur-2xl shadow-2xl shadow-emerald-950/50">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-emerald-400/5"></div>
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-400/50 to-transparent"></div>

            <div className="relative p-10 space-y-8">
              <div className="text-center space-y-3">
                <div className="inline-flex h-12 w-12 rounded-2xl bg-gradient-to-br from-emerald-400 to-emerald-600 items-center justify-center shadow-lg shadow-emerald-500/30 mb-4">
                  <FileText className="h-6 w-6 text-white" />
                </div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-300 to-emerald-500 bg-clip-text text-transparent">
                  Resume Analysis
                </h1>
                <p className="text-emerald-200/70 text-sm">
                  Upload your resume and enter your scholar ID to get started
                </p>
              </div>

              <div className="space-y-4">
                <div className="space-y-3">
                  <Label className="flex items-center gap-2 text-sm font-medium text-emerald-300 tracking-wide">
                    <Upload className="h-4 w-4" />
                    Upload your Resume
                  </Label>
                  <div className="relative">
                    <Input
                      type="file"
                      accept=".pdf"
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        if (e.target.files && e.target.files[0]) {
                          setfiles(e.target.files[0]);
                        }
                      }}
                      className="
      cursor-pointer rounded-2xl border border-emerald-500/30 
      bg-gradient-to-br from-slate-800/50 to-slate-900/80 
      text-emerald-100 backdrop-blur-sm h-14
      transition-all duration-300 
      hover:border-emerald-400/50 hover:shadow-lg hover:shadow-emerald-500/20 
      focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/20
      file:mr-4 file:py-3 file:px-6 file:rounded-xl file:border-0 
      file:text-sm file:font-medium file:cursor-pointer file:h-10
      file:bg-gradient-to-r file:from-emerald-500 file:to-emerald-600 
      file:text-white file:shadow-lg file:shadow-emerald-500/30 
      hover:file:from-emerald-400 hover:file:to-emerald-500 
      hover:file:shadow-emerald-400/40 hover:file:scale-105
      file:transition-all file:duration-300
    "
                    />
                  </div>

                  {files && (
                    <div className="flex items-center gap-2 text-xs text-emerald-400/80 bg-emerald-500/10 px-3 py-2 rounded-lg border border-emerald-500/20">
                      <FileText className="h-3 w-3" />
                      {files.name}
                    </div>
                  )}
                </div>

                <div className="space-y-4">
                  <Label className="flex items-center gap-2 text-sm font-medium text-emerald-300 tracking-wide">
                    <User className="h-4 w-4" />
                    Enter Your Scholar ID
                  </Label>
                  <div className="flex justify-center">
                    <InputOTP
                      maxLength={7}
                      pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
                      value={schId}
                      onChange={(val) => setschId(val)}
                    >
                      <InputOTPGroup className="gap-3">
                        {[...Array(7)].map((_, i) => (
                          <InputOTPSlot
                            key={i}
                            index={i}
                            className="relative w-12 h-12 text-lg font-semibold text-emerald-300 border border-emerald-500/30 bg-gradient-to-br from-slate-800/50 to-slate-900/80 rounded-xl backdrop-blur-sm transition-all duration-300 hover:border-emerald-400/50 hover:shadow-lg hover:shadow-emerald-500/20 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/20 focus:shadow-lg focus:shadow-emerald-500/30 group"
                          >
                            <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-emerald-500/0 to-emerald-400/0 group-focus:from-emerald-500/10 group-focus:to-emerald-400/5 transition-all duration-300"></div>
                          </InputOTPSlot>
                        ))}
                      </InputOTPGroup>
                    </InputOTP>
                  </div>
                </div>
              </div>

              <Button
                onClick={sender}
                disabled={!files || schId.length < 7}
                className="relative w-full h-12 bg-gradient-to-r from-emerald-500 via-emerald-400 to-emerald-600 hover:from-emerald-400 hover:via-emerald-300 hover:to-emerald-500 disabled:from-slate-600 disabled:via-slate-700 disabled:to-slate-600 text-white font-semibold rounded-2xl shadow-xl shadow-emerald-500/30 hover:shadow-2xl hover:shadow-emerald-400/40 disabled:shadow-slate-500/20 transition-all duration-300 hover:scale-[1.02] disabled:scale-100 disabled:cursor-not-allowed group overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] group-disabled:translate-x-[-100%] transition-transform duration-700"></div>
                <span className="relative z-10 flex items-center justify-center gap-2">
                  <FileText className="h-4 w-4" />
                  {loading ? (
                    <TextShimmerWave className="text-white font-mono text-sm">
                      This may take a few seconds...
                    </TextShimmerWave>
                  ) : (
                    "Submit"
                  )}
                </span>
              </Button>

              <div className="text-center">
                <p className="text-xs text-emerald-400/60">
                  Supported formats: PDF Only
                </p>
              </div>
            </div>
          </div>
        </div>
      </AnimatedContent>
    </div>
  );
};

export default Page;
