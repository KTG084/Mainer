import { NextResponse } from "next/server";
import { auth, unstable_update } from "@/auth";
import { prisma } from "@/db/prisma";
import { fetchandCache, invalidateResumeCache } from "@/app/rank/fetchRank";

export async function DELETE() {
  const session = await auth();

  if (!session?.user?.resumeIds?.length) {
    return NextResponse.json(
      {
        message: "You dont have a resume",
        error: true,
      },
      { status: 400 }
    );
  }

  await prisma.resumes.deleteMany({
    where: { id: { in: session.user.resumeIds } },
  });

  await prisma.user.update({
    where: {
      id: session.user.id,
    },
    data: {
      schId: null,
      branch: null,
      batch: null,
      rollNo: null,
    },
  });

  await unstable_update({
    ...session,
    user: {
      ...session.user,
      resumeIds: null,
      schId: null,
      branch: null,
      batch: null,
      rollNo: null,
    },
  });

  await invalidateResumeCache("OK");
  await fetchandCache("OK");
  await invalidateResumeCache(session.user.resumeIds);
  return NextResponse.json({
    success: true,
    message: "User and resumes deleted successfully",
  });
}
