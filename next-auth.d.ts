import { Resumes, User } from "@prisma/client";
import { type DefaultSession } from "next-auth";

export type ExtendedUser = DefaultSession["user"] & {
  schId: User["schId"];
  branch: User["branch"];
  batch: User["batch"];
  rank: User["rank"];
  rollNo: User["rollNo"];
  resumeId: Resumes["id"]
};

declare module "next-auth" {
  interface Session {
    user: ExtendedUsr;
  }
}
