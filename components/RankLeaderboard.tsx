/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { Branch, Resumes } from "@prisma/client";
import { Award, ChevronUp, Crown, Medal, Trophy } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useMemo, useState } from "react";
import { Avatar, AvatarImage } from "./ui/avatar"; 
import { GeneratedAvatar } from "./GeneratedAvatar";

type Props = {
  resumes: (Resumes & {
    user: {
      name: string | null;
      schId: string | null;
      branch: Branch | null;
      batch: number | null;
      image: string | null;
    };
  })[];
};

const RankLeaderboard = ({ resumes }: Props) => {
  const [rsumeId, setrsumeId] = useState("");
  const [isRank, setisRank] = useState<number>(0);

  const router = useRouter();

  // const rankedResumes = useMemo(() => {
  //   return [...resumes].sort((a, b) => (b.ats ?? 0) - (a.ats ?? 0));
  // }, [resumes]);

  const topThree = resumes.slice(0, 3);
  const remainingResumes = resumes.slice(3);

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="w-5 h-5 text-emerald-400 fill-emerald-400" />;
      case 2:
        return <Medal className="w-5 h-5 text-emerald-300 fill-emerald-300" />;
      case 3:
        return <Award className="w-5 h-5 text-emerald-500 fill-emerald-500" />;
      default:
        return (
          <div className="w-6 h-6 rounded-full flex items-center justify-center">
            <span className="text-sm font-medium text-gray-500">{rank}</span>
          </div>
        );
    }
  };

  if (resumes.length === 0) {
    return <div>No Resumes till now, Add Yours in the ATS Tab</div>;
  }

  return (
    <div className="min-h-screen px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <div className="flex items-center justify-center gap-3 mb-5">
            <Trophy className="w-8 h-8 text-amber-400" />
            <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-amber-400 to-yellow-300">
              Resume ATS Leaderboard
            </h1>
          </div>
          <p className="text-gray-400 max-w-xl mx-auto">Select any Resume to check it out</p>
        </div>

        <div className="mb-10">
          <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-400 mb-8 flex items-center justify-center gap-3">
            <Trophy className="w-6 h-6 text-amber-400 animate-pulse" />
            Top Performers
            <Trophy className="w-6 h-6 text-amber-400 animate-pulse" />
          </h2>

          <div className="grid grid-cols-3 gap-4 items-end max-w-4xl mx-auto">
            {/* 2nd Place */}
            {topThree[1] && (
              <div
                className="bg-gradient-to-br from-slate-600/90 via-slate-700 to-slate-800 border border-slate-500/50 rounded-2xl p-6 pt-8 text-center transform hover:scale-105 hover:-translate-y-2 transition-all duration-300 cursor-pointer shadow-xl hover:shadow-2xl hover:shadow-slate-500/25 relative overflow-hidden group"
                onClick={(e) => {
                  e.preventDefault();
                  const id = topThree[1].id;
                  setrsumeId(id);
                  setisRank(2);
                  router.push(`/resume/${id}`); 
                }}
              >
              
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-slate-400 to-slate-600 flex items-center justify-center border-4 border-slate-300 shadow-lg">
                    <span className="text-lg font-bold text-white">{getRankIcon(2)}</span>
                  </div>
                </div>

                <div className="relative mb-6 mt-4">
                  <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-slate-500 to-slate-700 p-1 shadow-xl group-hover:shadow-slate-400/50 transition-all duration-300">
                    {topThree[1].user.image ? (
                      <Avatar className="h-full w-full relative z-10">
                        <AvatarImage
                          src={topThree[1].user.image}
                          className="rounded-full object-cover ring-2 ring-slate-400/30"
                        />
                      </Avatar>
                    ) : (
                      <GeneratedAvatar
                        seed={topThree[1].user.name ?? "User"}
                        className="h-full w-full relative z-10 ring-2 ring-slate-400/30"
                        variant="botttsNeutral"
                      />
                    )}
                  </div>

                  <div className="absolute inset-0 rounded-full bg-slate-400/20 blur-md scale-110 group-hover:scale-125 transition-transform duration-300"></div>
                </div>

                <div className="space-y-2 mb-4">
                  <h3 className="font-bold text-lg text-gray-100 group-hover:text-white transition-colors duration-300">
                    {topThree[1].user.name}
                  </h3>
                  <p className="font-medium text-slate-300 text-sm">{topThree[1].user.branch}</p>
                  <p className="font-mono text-xs text-slate-400">ID: {topThree[1].user.schId}</p>
                </div>

                <div className="flex items-center justify-center gap-2 bg-gradient-to-r from-slate-600/50 to-slate-700/50 rounded-full px-4 py-2 backdrop-blur-sm">
                  <ChevronUp className="w-4 h-4 text-emerald-400 animate-bounce" />
                  <p className="text-2xl font-bold text-white">{topThree[1].ats}</p>
                </div>
                <p className="text-xs text-slate-300 mt-2 font-medium">POINTS</p>
              </div>
            )}

            {/* 1st Place */}
            {topThree[0] && (
              <div
                className="bg-gradient-to-br from-amber-500 via-amber-600 to-yellow-600 border-2 border-amber-400/60 rounded-2xl p-6 pt-10 text-center transform hover:scale-105 hover:-translate-y-3 transition-all duration-300 cursor-pointer shadow-2xl hover:shadow-amber-500/40 relative overflow-hidden group mt-[-20px]"
                onClick={(e) => {
                  e.preventDefault();
                  const id = topThree[0].id;
                  setrsumeId(id);
                  setisRank(1);
                  router.push(`/resume/${id}`); // <-- navigate directly with the correct id
                }}
              >
                {/* ...rest unchanged */}
                <div className="absolute left-1/2 transform -translate-x-1/2 animate-bounce">
                  <Crown className="w-12 h-12 text-yellow-300 drop-shadow-lg" />
                </div>

                <div className="absolute top-4 right-4 bg-gradient-to-r from-yellow-400 to-amber-400 text-amber-900 text-xs font-bold px-3 py-1 rounded-full shadow-lg animate-pulse">
                  HIGHEST ATS
                </div>

                <div className="relative mb-6 mt-6">
                  <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-yellow-400 to-amber-500 p-1 shadow-2xl group-hover:shadow-amber-400/60 transition-all duration-300">
                    {topThree[0].user.image ? (
                      <Avatar className="h-full w-full relative z-10">
                        <AvatarImage
                          src={topThree[0].user.image}
                          className="rounded-full object-cover ring-3 ring-yellow-300/50"
                        />
                      </Avatar>
                    ) : (
                      <GeneratedAvatar
                        seed={topThree[0].user.name ?? "User"}
                        className="h-full w-full relative z-10 ring-3 ring-yellow-300/50"
                        variant="botttsNeutral"
                      />
                    )}
                  </div>

                  <div className="absolute inset-0 rounded-full bg-yellow-400/30 blur-lg scale-110 group-hover:scale-130 transition-transform duration-300"></div>
                  <div className="absolute inset-0 rounded-full bg-amber-400/20 blur-xl scale-125 group-hover:scale-150 transition-transform duration-300"></div>
                </div>

                <div className="space-y-2 mb-6">
                  <h3 className="font-bold text-xl text-amber-900 group-hover:text-amber-800 transition-colors duration-300">{topThree[0].user.name}</h3>
                  <p className="font-semibold text-amber-800 text-sm">{topThree[0].user.branch}</p>
                  <p className="font-mono text-xs text-amber-700">ID: {topThree[0].user.schId}</p>
                </div>

                <div className="flex items-center justify-center gap-2 bg-gradient-to-r from-yellow-400/80 to-amber-400/80 rounded-full px-6 py-3 backdrop-blur-sm border border-yellow-300/30">
                  <ChevronUp className="w-5 h-5 text-amber-800 animate-bounce" />
                  <p className="text-3xl font-bold text-amber-900">{topThree[0].ats}</p>
                </div>
                <p className="text-sm text-amber-800 mt-2 font-bold tracking-wider">POINTS</p>
              </div>
            )}

            {/* 3rd Place */}
            {topThree[2] && (
              <div
                className="bg-gradient-to-br from-orange-700/80 via-amber-800/70 to-orange-900/80 border border-orange-600/50 rounded-2xl p-6 pt-8 text-center transform hover:scale-105 hover:-translate-y-2 transition-all duration-300 cursor-pointer shadow-xl hover:shadow-2xl hover:shadow-orange-500/25 relative overflow-hidden group"
                onClick={(e) => {
                  e.preventDefault();
                  const id = topThree[2].id;
                  setrsumeId(id);
                  setisRank(3);
                  router.push(`/resume/${id}`); 
                }}
              >
                
                <div className="absolute -top-1 left-1/2 transform -translate-x-1/2">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-600 to-amber-700 flex items-center justify-center border-4 border-orange-400 shadow-lg">
                    <span className="text-lg font-bold text-orange-100">{getRankIcon(3)}</span>
                  </div>
                </div>

                <div className="relative mb-6 mt-4">
                  <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-orange-600 to-amber-700 p-1 shadow-xl group-hover:shadow-orange-400/50 transition-all duration-300">
                    {topThree[2].user.image ? (
                      <Avatar className="h-full w-full relative z-10">
                        <AvatarImage
                          src={topThree[2].user.image}
                          className="rounded-full object-cover ring-2 ring-orange-400/30"
                        />
                      </Avatar>
                    ) : (
                      <GeneratedAvatar
                        seed={topThree[2].user.name ?? "User"}
                        className="h-full w-full relative z-10 ring-2 ring-orange-400/30"
                        variant="botttsNeutral"
                      />
                    )}
                  </div>

                  <div className="absolute inset-0 rounded-full bg-orange-500/20 blur-md scale-110 group-hover:scale-125 transition-transform duration-300"></div>
                </div>

                <div className="space-y-2 mb-4">
                  <h3 className="font-bold text-lg text-orange-100 group-hover:text-white transition-colors duration-300">{topThree[2].user.name}</h3>
                  <p className="font-medium text-orange-200 text-sm">{topThree[2].user.branch}</p>
                  <p className="font-mono text-xs text-orange-300">ID: {topThree[2].user.schId}</p>
                </div>

                <div className="flex items-center justify-center gap-2 bg-gradient-to-r from-orange-700/50 to-amber-800/50 rounded-full px-4 py-2 backdrop-blur-sm">
                  <ChevronUp className="w-4 h-4 text-emerald-400 animate-bounce" />
                  <p className="text-2xl font-bold text-orange-100">{topThree[2].ats}</p>
                </div>
                <p className="text-xs text-orange-200 mt-2 font-medium">POINTS</p>
              </div>
            )}
          </div>

          {/* Decorative elements */}
          <div className="flex justify-center mt-8 space-x-4 opacity-60">
            <div className="w-2 h-2 bg-amber-400 rounded-full animate-pulse"></div>
            <div className="w-2 h-2 bg-slate-400 rounded-full animate-pulse delay-300"></div>
            <div className="w-2 h-2 bg-orange-400 rounded-full animate-pulse delay-600"></div>
          </div>
        </div>

        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-slate-300 via-gray-200 to-slate-400 flex items-center gap-3">
            <Medal className="w-6 h-6 text-amber-400" />
            Full Rankings
          </h2>
          <div className="text-sm text-gray-400 bg-gray-800/30 px-3 py-1 rounded-full border border-gray-700">
            {remainingResumes.length} participants
          </div>
        </div>

        <div className="space-y-2 mb-10">
          {remainingResumes.map((resumes, index) => {
            const rank = index + 4;
            const isTopTen = rank <= 10;

            return (
              <div
                key={resumes.id}
                onClick={(e) => {
                  e.preventDefault();
                  const id = resumes.id;
                  setrsumeId(id);
                  setisRank(rank);
                  router.push(`/resume/${id}`); 
                }}
                className={`group flex cursor-pointer items-center justify-between p-5 rounded-2xl border transition-all duration-200 ${
                  isTopTen
                    ? "bg-gradient-to-r from-gray-800/60 via-gray-800/40 to-gray-800/60 border-gray-600/50 hover:from-gray-700/70 hover:via-gray-700/50 hover:to-gray-700/70 hover:border-gray-500/60"
                    : "bg-gray-800/30 border-gray-700/50 hover:bg-gray-800/50 hover:border-gray-600/60"
                } hover:shadow-lg hover:shadow-gray-900/20`}
              >
                <div className="flex items-center gap-6 flex-1">
                  <div
                    className={`relative min-w-[2.5rem] h-10 rounded-xl flex items-center justify-center font-bold text-sm ${
                      isTopTen
                        ? "bg-gradient-to-br from-slate-600 to-slate-700 text-slate-200 shadow-md"
                        : "bg-gray-700/80 text-gray-300"
                    }`}
                  >
                    {rank <= 10 && (
                      <div className="absolute -inset-0.5 bg-gradient-to-r from-slate-500/20 to-slate-600/20 rounded-xl blur-sm"></div>
                    )}
                    <span className="relative z-10">#{rank}</span>
                  </div>

                  <div className="flex-1">
                    <h3 className="font-semibold text-lg text-gray-100 group-hover:text-white mb-1">
                      {resumes.user.name}
                    </h3>
                    <div className="flex items-center gap-6 text-sm">
                      <div className="flex items-center gap-1">
                        <span className="text-gray-500">ID:</span>
                        <span className="text-gray-300 font-mono">{resumes.user.schId}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="text-gray-500">Batch:</span>
                        <span className="text-gray-300">{resumes.user.batch}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="text-gray-500">Branch:</span>
                        <span className="text-gray-300">{resumes.user.branch}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 min-w-[120px] justify-end">
                  <div className="flex items-center gap-2 bg-gray-900/50 px-4 py-2 rounded-xl border border-gray-700/50 group-hover:border-gray-600/50">
                    <ChevronUp className="w-4 h-4 text-emerald-400" />
                    <div className="text-xl font-bold text-white">{resumes.ats}</div>
                    <div className="text-xs text-gray-400 uppercase tracking-wide">pts</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default RankLeaderboard;
