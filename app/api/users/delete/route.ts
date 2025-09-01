import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/db/prisma";

export async function POST() {
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
      id: session.user.id
    },
    data: {
      schId: ""
    }
  })

  return new NextResponse(null, { status: 204 });
}
