import { prisma } from "@/db/prisma";
import Redis from "ioredis";

const client = new Redis(process.env.REDIS_URL!);

export async function fetchandCache(key: string) {
  const cachedData = await client.get(key);

  if (cachedData) {
    return JSON.parse(cachedData);
  } else {
    const resumes = await prisma.resumes.findMany({
      orderBy: { ats: "desc" },
      include: {
        user: {
          select: {
            name: true,
            schId: true,
            branch: true,
            batch: true,
            image: true,
          },
        },
      },
    });

    await client.set(key, JSON.stringify(resumes), "EX", 60 * 5);

    return resumes;
  }
}

export async function invalidateResumeCache(key: string) {
  await client.del(key);
}
