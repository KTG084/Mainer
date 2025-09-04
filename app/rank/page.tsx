import RankLeaderboard from "@/components/RankLeaderboard";
import { fetchandCache } from "./fetchRank";

export default async function Rank() {
  const resumes = await fetchandCache("OK");
  
  return <RankLeaderboard resumes={resumes} />;
}
