import { auth } from "@/auth";
import ResumeIndie from "@/components/ResumeIndie";
import { prisma } from "@/db/prisma";
import { Suspense } from "react";
export const dynamic = "force-dynamic";

export default async function Page({
  params,
}: {
  params: Promise<{ resumeId: string }>;
}) {
  const { resumeId } = await params;

  const session = await auth();

  const resumeData = await prisma.resumeEvaluation.findFirst({
    where: {
      resumesId: resumeId,
    },

    include: {
      resume: {
        include: {
          user: true,
        },
      },
    },
  });

  if (!session?.user?.id || !resumeId) {
    return (
      <div className="flex items-center justify-center min-h-screen text-lg text-red-500 font-semibold">
        🚫 Invalid session or resumeId
      </div>
    );
  }

  if (!resumeData) {
    return (
      <div className="flex items-center justify-center min-h-screen text-lg text-red-500 font-semibold">
        ⚠️ Resume not found
      </div>
    );
  }

  return (
    <Suspense
      fallback={
        <div className="text-emerald-600 flex items-center justify-center">
          Loading
        </div>
      }
    >
      <ResumeIndie resumeData={resumeData} />
    </Suspense>
  );
}
