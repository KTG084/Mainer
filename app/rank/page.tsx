import RankLeaderboard from "@/components/RankLeaderboard";
import { prisma } from "@/db/prisma";


export default async function Rank() {
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

  return <RankLeaderboard resumes={resumes} />;
}
