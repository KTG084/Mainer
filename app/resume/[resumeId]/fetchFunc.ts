import { prisma } from "@/db/prisma";
import { Resumes } from "@prisma/client";

import Redis from "ioredis";

const client = new Redis(process.env.REDIS_URL!);

export async function fetchandCache(key: Resumes["id"]) {
  const cachedData = await client.get(key);

  if (cachedData) {
    return JSON.parse(cachedData);
  } else {
    const resumeData = await prisma.resumeEvaluation.findFirst({
      where: {
        resumesId: key,
      },

      include: {
        resume: {
          include: {
            user: true,
          },
        },
      },
    });

    if (resumeData) {
      await client.set(key, JSON.stringify(resumeData), "EX", 60 * 5);
    }

    return resumeData;
  }
}
