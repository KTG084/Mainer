/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Prisma } from "@prisma/client";
import React from "react";
import {
  CheckCircle,
  File,
  FileText,
  TrendingUp,
  User,
  GraduationCap,
  Star,
  AlertCircle,
  BookOpen,
  MessageSquare,
} from "lucide-react";
import { Avatar, AvatarImage } from "./ui/avatar";
import { GeneratedAvatar } from "./GeneratedAvatar";
type ResumeData = Prisma.ResumeEvaluationGetPayload<{
  include: {
    resume: {
      include: {
        user: true;
      };
    };
  };
}>;
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useRouter } from "next/navigation";
type Props = {
  resumeData_: ResumeData | null;
};
interface AcademicPerformance {
  cgpa?: string | number;
  [key: string]: any;
}
interface SummaryData {
  strengths?: string[];
  areas_for_improvement?: string[];
  [key: string]: any;
}
const ResumeIndie = ({ resumeData_ }: Props) => {
  // const resumeData_ = useMemo(() => resumeData, [resumeData]);
  const router = useRouter();

  if (!resumeData_) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-slate-900 flex items-center justify-center px-4">
        <div className="relative overflow-hidden rounded-3xl border border-slate-500/20 bg-gradient-to-br from-slate-900/95 via-gray-900/98 to-slate-900/95 backdrop-blur-2xl shadow-2xl shadow-slate-950/40 w-full max-w-md">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-500/5 to-transparent"></div>
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-slate-400/50 to-transparent"></div>
          <div className="relative p-8">
            <div className="flex flex-col items-center text-center space-y-6">
              <div className="p-4 rounded-2xl bg-gradient-to-br from-slate-500/10 to-slate-400/5 shadow-inner">
                <AlertCircle className="h-12 w-12 text-slate-400" />
              </div>
              <div className="space-y-3">
                <h3 className="text-xl font-bold text-slate-200">
                  No Resume Data Found
                </h3>
                <p className="text-slate-300/70 leading-relaxed">
                  The resume data you&apos;re looking for could not be found or
                  is currently unavailable.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const getAcademicPerformance = (): AcademicPerformance => {
    if (
      typeof resumeData_.academicPerformance === "object" &&
      resumeData_.academicPerformance !== null
    ) {
      return resumeData_.academicPerformance as AcademicPerformance;
    }
    return {};
  };
  const getSummaryData = (): SummaryData => {
    if (
      typeof resumeData_.summary === "object" &&
      resumeData_.summary !== null
    ) {
      return resumeData_.summary as SummaryData;
    }
    return {};
  };
  const getCategoryBreakdown = (): Record<string, number> => {
    if (
      typeof resumeData_.categoryBreakdown === "object" &&
      resumeData_.categoryBreakdown !== null
    ) {
      return resumeData_.categoryBreakdown as Record<string, number>;
    }
    return {};
  };
  const getFoundKeywords = (): Record<string, number> => {
    if (
      typeof resumeData_.foundKeywords === "object" &&
      resumeData_.foundKeywords !== null
    ) {
      return resumeData_.foundKeywords as Record<string, number>;
    }
    return {};
  };
  const academicPerformance = getAcademicPerformance();
  const summaryData = getSummaryData();
  const categoryBreakdown = getCategoryBreakdown();
  const foundKeywords = getFoundKeywords();
  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12 space-y-6">
          <div className="flex items-center justify-center gap-4">
            <div className="p-4 rounded-2xl bg-gradient-to-br from-amber-500/20 to-amber-400/10 shadow-lg shadow-amber-500/20">
              <FileText className="w-10 h-10 text-amber-400" />
            </div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-amber-300 to-amber-500 bg-clip-text text-transparent tracking-tight">
              Resume Analysis
            </h1>
          </div>
          <div className="flex items-center justify-center gap-3">
            <File className="w-6 h-6 text-amber-400/70" />
            <span className="text-2xl text-amber-300 font-semibold">
              {resumeData_.filename}
            </span>
          </div>
          <p className="text-slate-300/70 text-lg max-w-3xl mx-auto leading-relaxed">
            Comprehensive analysis tailored for Software Development Engineer
            roles. Additional role analysis coming soon.
          </p>
        </div>
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="relative overflow-hidden rounded-3xl border border-amber-500/20 bg-gradient-to-br from-slate-900/95 via-gray-900/98 to-slate-900/95 backdrop-blur-2xl shadow-2xl shadow-amber-950/40">
            <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-transparent"></div>
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-amber-400/50 to-transparent"></div>
            <div className="relative p-8">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-8">
                <div className="flex items-center gap-4">
                  <div className="p-2 rounded-2xl bg-gradient-to-br from-amber-500/10 to-amber-400/5">
                    {resumeData_.resume.user.image ? (
                      <Avatar className="h-12 w-12">
                        <AvatarImage
                          src={resumeData_.resume.user.image}
                          className="rounded-full object-cover ring-2 ring-amber-400/30"
                        />
                      </Avatar>
                    ) : (
                      <GeneratedAvatar
                        seed={resumeData_.resume.user.name ?? ""}
                        className="h-12 w-12 ring-2 ring-amber-400/30"
                        variant="botttsNeutral"
                      />
                    )}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-amber-200">
                      {resumeData_.resume.user.name}
                    </h2>
                    <p className="text-amber-400/70">
                      Student Profile & Academic Information
                    </p>
                  </div>
                </div>
                <a
                  href={`${resumeData_.url}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group"
                >
                  <button className="relative px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500/20 to-amber-400/25 border border-amber-400/30 text-amber-300 font-medium shadow-lg shadow-amber-500/20 hover:shadow-amber-400/30 hover:shadow-xl hover:from-amber-500/30 hover:to-amber-400/35 hover:text-amber-200 hover:scale-105 transition-all duration-300 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-amber-400/0 via-amber-300/10 to-amber-400/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                    <span className="relative z-10 flex items-center gap-2">
                      <File className="w-4 h-4" />
                      Download Resume
                    </span>
                    <span>ADD .pdf to the file before downloading </span>
                  </button>
                </a>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="space-y-4">
                  <div className="flex items-center gap-4 p-4 rounded-2xl bg-gradient-to-r from-slate-500/10 to-slate-400/5 border border-slate-500/20 shadow-inner">
                    <div className="p-2 rounded-xl bg-gradient-to-br from-slate-400/20 to-slate-500/10">
                      <GraduationCap className="w-5 h-5 text-slate-400" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-400/80">
                        Batch
                      </p>
                      <p className="text-lg font-bold text-slate-200">
                        {resumeData_.resume.user.batch}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-4 rounded-2xl bg-gradient-to-r from-slate-500/10 to-slate-400/5 border border-slate-500/20 shadow-inner">
                    <div className="p-2 rounded-xl bg-gradient-to-br from-slate-400/20 to-slate-500/10">
                      <FileText className="w-5 h-5 text-slate-400" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-400/80">
                        Branch
                      </p>
                      <p className="text-lg font-bold text-slate-200">
                        {resumeData_.resume.user.branch}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-4 p-4 rounded-2xl bg-gradient-to-r from-slate-500/10 to-slate-400/5 border border-slate-500/20 shadow-inner">
                    <div className="p-2 rounded-xl bg-gradient-to-br from-slate-400/20 to-slate-500/10">
                      <User className="w-5 h-5 text-slate-400" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-400/80">
                        Scholar ID
                      </p>
                      <p className="text-lg font-bold text-slate-200">
                        {resumeData_.resume.user.schId}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-4 rounded-2xl bg-gradient-to-r from-amber-500/10 to-amber-400/5 border border-amber-500/20 shadow-inner">
                    <div className="p-2 rounded-xl bg-gradient-to-br from-amber-400/20 to-amber-500/10">
                      <Star className="w-5 h-5 text-amber-400" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-amber-400/80">
                        CGPA
                      </p>
                      <p className="text-lg font-bold text-amber-200">
                        {academicPerformance.cgpa ?? "N/A"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="h-px bg-gradient-to-r from-transparent via-amber-500/30 to-transparent mb-8"></div>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-amber-200 flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-gradient-to-br from-emerald-400/20 to-emerald-500/10">
                      <TrendingUp className="w-5 h-5 text-emerald-400" />
                    </div>
                    ATS Compatibility Score
                  </h3>
                  <div className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500/20 to-emerald-400/15 border border-emerald-400/30 shadow-inner">
                    <span className="text-2xl font-bold text-emerald-300">
                      {resumeData_.resume.ats}%
                    </span>
                  </div>
                </div>
                <div className="relative">
                  <div className="h-3 bg-gradient-to-r from-slate-800/50 to-slate-700/50 rounded-full overflow-hidden shadow-inner">
                    <div
                      className="h-full bg-gradient-to-r from-emerald-500 to-emerald-400 rounded-full shadow-lg shadow-emerald-500/30 transition-all duration-1000 ease-out"
                      style={{ width: `${resumeData_.resume.ats}%` }}
                    ></div>
                  </div>
                </div>
                <p className="text-slate-300/70">
                  Higher scores indicate better compatibility with Applicant
                  Tracking Systems
                </p>
              </div>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-3xl border border-slate-500/20 bg-gradient-to-br from-slate-900/95 via-gray-900/98 to-slate-900/95 backdrop-blur-2xl shadow-2xl shadow-slate-950/40">
            <div className="absolute inset-0 bg-gradient-to-br from-slate-500/5 to-transparent"></div>
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-slate-400/50 to-transparent"></div>
            <div className="relative p-8">
              <div className="flex items-center gap-4 mb-8">
                <div className="p-3 rounded-2xl bg-gradient-to-br from-green-500/20 to-green-400/10 shadow-lg shadow-green-500/20">
                  <CheckCircle className="w-8 h-8 text-green-400" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-slate-200">
                    Analysis Complete
                  </h2>
                  <p className="text-slate-400/70">
                    Resume evaluation has been processed successfully
                  </p>
                </div>
              </div>
              <div className="space-y-8">
                <div className="p-6 rounded-2xl bg-gradient-to-r from-amber-500/10 to-amber-400/5 border border-amber-500/20 shadow-inner">
                  <h3 className="text-lg font-bold text-amber-200 mb-2">
                    Compatibility Level
                  </h3>
                  <p className="text-2xl font-bold bg-gradient-to-r from-amber-300 to-amber-500 bg-clip-text text-transparent">
                    {resumeData_.compatibilityLevel}
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-200 mb-6 flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-gradient-to-br from-slate-400/20 to-slate-500/10">
                      <TrendingUp className="w-5 h-5 text-slate-400" />
                    </div>
                    Category Breakdown
                  </h3>
                  <div className="space-y-4">
                    {Object.entries(categoryBreakdown).map(
                      ([keyword, count]) => (
                        <div
                          key={keyword}
                          className="p-5 rounded-2xl bg-gradient-to-r from-slate-500/10 to-slate-400/5 border border-slate-500/20 shadow-inner hover:from-slate-500/15 hover:to-slate-400/10 transition-all duration-300 group"
                        >
                          <div className="flex justify-between items-center mb-3">
                            <span className="font-semibold text-slate-200 capitalize text-lg">
                              {keyword}
                            </span>
                            <div className="px-4 py-2 rounded-xl bg-gradient-to-r from-slate-600/30 to-slate-500/20 border border-slate-400/30 shadow-lg shadow-slate-500/20">
                              <span className="text-slate-300 font-bold text-lg">
                                {count}%
                              </span>
                            </div>
                          </div>
                          <div className="relative">
                            <div className="h-3 bg-gradient-to-r from-slate-800/50 to-slate-700/50 rounded-full overflow-hidden shadow-inner">
                              <div
                                className="h-full bg-gradient-to-r from-slate-500 to-slate-400 rounded-full shadow-lg shadow-slate-500/30 transition-all duration-1000 ease-out group-hover:shadow-slate-400/40"
                                style={{
                                  width: `${count}%`,
                                }}
                              >
                                <div className="h-full bg-gradient-to-r from-slate-300/30 to-transparent rounded-full"></div>
                              </div>
                            </div>
                          </div>
                          <div className="mt-2 text-right">
                            <span className="text-xs text-slate-400/60">
                              {count >= 75
                                ? "Excellent"
                                : count >= 50
                                ? "Good"
                                : count >= 25
                                ? "Fair"
                                : "Needs Improvement"}
                            </span>
                          </div>
                        </div>
                      )
                    )}
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-200 mb-6 flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-gradient-to-br from-slate-400/20 to-slate-500/10">
                      <BookOpen className="w-5 h-5 text-slate-400" />
                    </div>
                    Academic Performance
                  </h3>
                  <div className="space-y-4">
                    {Object.entries(academicPerformance).map(
                      ([keyword, count]) => (
                        <div
                          key={keyword}
                          className="flex justify-between items-center p-4 rounded-xl bg-gradient-to-r from-slate-500/10 to-slate-400/5 border border-slate-500/20 shadow-inner hover:from-slate-500/15 hover:to-slate-400/10 transition-all duration-300"
                        >
                          <span className="font-semibold text-slate-200 capitalize">
                            {keyword}
                          </span>
                          <div className="px-3 py-1 rounded-lg bg-gradient-to-r from-slate-600/30 to-slate-500/20 border border-slate-400/30">
                            <span className="text-slate-300 font-bold">
                              {String(count)}
                            </span>
                          </div>
                        </div>
                      )
                    )}
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-500/10 to-slate-400/5 border border-slate-500/20 shadow-inner">
                    <h4 className="text-lg font-bold text-slate-200 mb-2">
                      Total Keywords Checked
                    </h4>
                    <p className="text-3xl font-bold text-slate-300">
                      {resumeData_.totalKeywordsChecked}
                    </p>
                  </div>
                  <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-500/10 to-slate-400/5 border border-slate-500/20 shadow-inner">
                    <h4 className="text-lg font-bold text-slate-200 mb-4">
                      Keywords Found
                    </h4>
                    <p className="text-3xl font-bold text-slate-300 mb-4">
                      {resumeData_.keywordsFound}
                    </p>
                    <div className="relative">
                      <div className="h-2 bg-gradient-to-r from-slate-800/50 to-slate-700/50 rounded-full overflow-hidden shadow-inner">
                        <div
                          className="h-full bg-gradient-to-r from-slate-500 to-slate-400 rounded-full shadow-lg shadow-slate-500/30 transition-all duration-1000 ease-out"
                          style={{
                            width: `${
                              (resumeData_.keywordsFound /
                                resumeData_.totalKeywordsChecked) *
                              100
                            }%`,
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-200 mb-6">
                    Found Keywords
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {Object.entries(foundKeywords).map(([keyword, count]) => (
                      <div
                        key={keyword}
                        className="flex justify-between items-center p-4 rounded-xl bg-gradient-to-r from-slate-500/10 to-slate-400/5 border border-slate-500/20 shadow-inner hover:from-slate-500/15 hover:to-slate-400/10 transition-all duration-300"
                      >
                        <span className="font-semibold text-slate-200 capitalize">
                          {keyword}
                        </span>
                        <div className="px-3 py-1 rounded-lg bg-gradient-to-r from-slate-600/30 to-slate-500/20 border border-slate-400/30">
                          <span className="text-slate-300 font-bold">
                            {count}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-3xl border border-amber-500/20 bg-gradient-to-br from-slate-900/95 via-gray-900/98 to-slate-900/95 backdrop-blur-2xl shadow-2xl shadow-amber-950/40">
            <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-transparent"></div>
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-amber-400/50 to-transparent"></div>
            <div className="relative p-8">
              <div className="flex items-center gap-4 mb-8">
                <div className="p-3 rounded-2xl bg-gradient-to-br from-amber-500/20 to-amber-400/10 shadow-lg shadow-amber-500/20">
                  <MessageSquare className="w-8 h-8 text-amber-400" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-amber-200">
                    Detailed Feedback
                  </h2>
                  <p className="text-amber-400/70">
                    Comprehensive analysis and recommendations
                  </p>
                </div>
              </div>
              <div className="prose prose-lg max-w-none prose-headings:text-amber-200 prose-p:text-slate-300/80 prose-strong:text-amber-300 prose-ul:text-slate-300/80 prose-ol:text-slate-300/80 prose-li:text-slate-300/80 prose-blockquote:text-slate-300/70 prose-blockquote:border-amber-500/30 prose-code:text-amber-400 prose-pre:bg-slate-800/50 prose-pre:border prose-pre:border-amber-500/20">
                <div className="text-slate-400/70 ">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {resumeData_.detailedFeedback}
                  </ReactMarkdown>
                </div>
              </div>
              <div className="mt-8 p-6 rounded-2xl bg-gradient-to-r from-slate-500/10 to-slate-400/5 border border-slate-500/20 shadow-inner">
                <h3 className="text-lg font-bold text-slate-200 mb-6 flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-gradient-to-br from-slate-400/20 to-slate-500/10">
                    <FileText className="w-5 h-5 text-slate-400" />
                  </div>
                  Source Analysis
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-slate-800/30 to-slate-700/20 border border-slate-500/10">
                    <span className="font-medium text-slate-300">
                      Source Chunks Processed:
                    </span>
                    <div className="px-3 py-1 rounded-lg bg-gradient-to-r from-slate-600/30 to-slate-500/20 border border-slate-400/30">
                      <span className="text-slate-300 font-bold text-lg">
                        {resumeData_.sourceChunks}
                      </span>
                    </div>
                  </div>
                  {resumeData_.sourceChunks === 0 ? (
                    <div className="p-5 rounded-2xl bg-gradient-to-r from-red-500/10 to-red-400/5 border border-red-500/20 shadow-inner">
                      <div className="flex items-start gap-4">
                        <div className="p-2 rounded-xl bg-gradient-to-br from-red-500/20 to-red-400/10 flex-shrink-0 mt-1">
                          <AlertCircle className="w-5 h-5 text-red-400" />
                        </div>
                        <div className="space-y-2">
                          <h4 className="font-semibold text-red-300">
                            Analysis Incomplete
                          </h4>
                          <p className="text-red-300/80 leading-relaxed">
                            The LLM analysis didn&apos;t process properly due to
                            limitations with the free open-source model. For the
                            most accurate results, please delete this resume and
                            upload it again.
                          </p>
                          <div className="mt-4">
                            <button
                              onClick={(e) => {
                                e.preventDefault();
                                router.push("/resume");
                              }}
                              className="relative px-4 py-2 rounded-xl bg-gradient-to-r from-red-500/20 to-red-400/15 border border-red-400/30 text-red-300 font-medium shadow-lg shadow-red-500/20 hover:shadow-red-400/30 hover:shadow-xl hover:from-red-500/30 hover:to-red-400/25 hover:text-red-200 hover:scale-105 transition-all duration-300 group overflow-hidden"
                            >
                              <div className="absolute inset-0 bg-gradient-to-r from-red-400/0 via-red-300/10 to-red-400/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                              <span className="relative z-10 text-sm">
                                Try Re-uploading
                              </span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="p-5 rounded-2xl bg-gradient-to-r from-green-500/10 to-green-400/5 border border-green-500/20 shadow-inner">
                      <div className="flex items-start gap-4">
                        <div className="p-2 rounded-xl bg-gradient-to-br from-green-500/20 to-green-400/10 flex-shrink-0 mt-1">
                          <CheckCircle className="w-5 h-5 text-green-400" />
                        </div>
                        <div className="space-y-2">
                          <h4 className="font-semibold text-green-300">
                            Analysis Successful
                          </h4>
                          <p className="text-green-300/80 leading-relaxed">
                            LLM analysis has completed successfully. All{" "}
                            {resumeData_.sourceChunks} source chunks have been
                            processed and analyzed for comprehensive feedback.
                          </p>
                          <div className="flex items-center gap-2 mt-3">
                            <div className="h-2 w-2 rounded-full bg-green-400 animate-pulse"></div>
                            <span className="text-sm text-green-400/70">
                              Analysis Quality: High
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          {resumeData_.summary && (
            <div className="relative overflow-hidden rounded-3xl border border-slate-500/20 bg-gradient-to-br from-slate-900/95 via-gray-900/98 to-slate-900/95 backdrop-blur-2xl shadow-2xl shadow-slate-950/40">
              <div className="absolute inset-0 bg-gradient-to-br from-slate-500/5 to-transparent"></div>
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-slate-400/50 to-transparent"></div>
              <div className="relative p-8">
                <div className="flex items-center gap-4 mb-8">
                  <div className="p-3 rounded-2xl bg-gradient-to-br from-slate-500/20 to-slate-400/10 shadow-lg shadow-slate-500/20">
                    <TrendingUp className="w-8 h-8 text-slate-400" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-slate-200">
                      Performance Summary
                    </h2>
                    <p className="text-slate-400/70">
                      Strengths, improvements, and competitive analysis
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {summaryData.strengths &&
                    Array.isArray(summaryData.strengths) &&
                    summaryData.strengths.length > 0 && (
                      <div>
                        <h3 className="text-xl font-bold text-slate-200 mb-4 flex items-center gap-3">
                          <div className="p-2 rounded-xl bg-gradient-to-br from-green-400/20 to-green-500/10">
                            <CheckCircle className="w-5 h-5 text-green-400" />
                          </div>
                          Strengths
                        </h3>
                        <div className="space-y-3">
                          {summaryData.strengths.map((strength, index) => (
                            <div
                              key={index}
                              className="flex items-center gap-3 p-4 rounded-xl bg-gradient-to-r from-green-500/10 to-green-400/5 border border-green-500/20 shadow-inner hover:from-green-500/15 hover:to-green-400/10 transition-all duration-300"
                            >
                              <div className="p-1.5 rounded-lg bg-gradient-to-br from-green-400/30 to-green-500/20">
                                <Star className="w-4 h-4 text-green-400" />
                              </div>
                              <span className="font-medium text-green-200">
                                {strength}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  {summaryData.areas_for_improvement &&
                    Array.isArray(summaryData.areas_for_improvement) &&
                    summaryData.areas_for_improvement.length > 0 && (
                      <div>
                        <h3 className="text-xl font-bold text-slate-200 mb-4 flex items-center gap-3">
                          <div className="p-2 rounded-xl bg-gradient-to-br from-orange-400/20 to-orange-500/10">
                            <AlertCircle className="w-5 h-5 text-orange-400" />
                          </div>
                          Areas for Improvement
                        </h3>
                        <div className="space-y-3">
                          {summaryData.areas_for_improvement.map(
                            (area, index) => (
                              <div
                                key={index}
                                className="flex items-center gap-3 p-4 rounded-xl bg-gradient-to-r from-orange-500/10 to-orange-400/5 border border-orange-500/20 shadow-inner hover:from-orange-500/15 hover:to-orange-400/10 transition-all duration-300"
                              >
                                <div className="p-1.5 rounded-lg bg-gradient-to-br from-orange-400/30 to-orange-500/20">
                                  <TrendingUp className="w-4 h-4 text-orange-400" />
                                </div>
                                <span className="font-medium text-orange-200">
                                  {area}
                                </span>
                              </div>
                            )
                          )}
                        </div>
                      </div>
                    )}
                </div>
                <div className="space-y-6 mt-8">
                  <h3 className="text-xl font-bold text-slate-200 mb-4 flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-gradient-to-br from-slate-400/20 to-slate-500/10">
                      <User className="w-5 h-5 text-slate-400" />
                    </div>
                    Competitive Benchmarking
                  </h3>
                  {resumeData_.percentileRank && (
                    <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-500/10 to-slate-400/5 border border-slate-500/20 shadow-inner">
                      <p className="text-slate-300/80 leading-relaxed">
                        {resumeData_.percentileRank}
                      </p>
                    </div>
                  )}
                  {resumeData_.industryAverage && (
                    <div className="p-6 rounded-2xl bg-gradient-to-r from-gray-500/10 to-gray-400/5 border border-gray-500/20 shadow-inner">
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="text-lg font-bold text-slate-200">
                          Industry Average
                        </h4>
                        <div className="px-4 py-2 rounded-xl bg-gradient-to-r from-gray-600/30 to-gray-500/20 border border-gray-400/30 shadow-lg shadow-gray-500/20">
                          <span className="text-gray-300 font-bold text-xl">
                            {resumeData_.industryAverage}
                          </span>
                        </div>
                      </div>
                      <p className="text-gray-300/80 leading-relaxed">
                        Typical ATS compatibility range for software engineering
                        positions
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default ResumeIndie;
