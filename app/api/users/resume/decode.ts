import { Branch } from "@prisma/client";

type ScholarDetails = {
  batch: number;
  branch: Branch;
  rollNo: number;
};


export default function decodeScholar(schId: string): ScholarDetails {
  const batch = parseInt(schId.slice(0, 2));
  const rollNo = parseInt(schId.slice(4));
  const branchCode = schId.slice(2, 4);

  const branchMap: Record<string, Branch> = {
    "11": Branch.CE,
    "15": Branch.ME,
    "13": Branch.EE,
    "12": Branch.CSE,
    "14": Branch.ECE,
    "16": Branch.EIE,
  };

  return {
    batch: 2000 + batch + 4,
    rollNo,
    branch: branchMap[branchCode] ?? null,
  };
}
