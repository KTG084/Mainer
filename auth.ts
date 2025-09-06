/* eslint-disable @typescript-eslint/no-explicit-any */
import NextAuth, { Session } from "next-auth";
import authConfig from "@/auth.config";
import { JWT } from "next-auth/jwt";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "./db/prisma";
import { Resumes, User } from "@prisma/client";

export const { auth, handlers, signIn, signOut, unstable_update } = NextAuth({
  callbacks: {
    async session({ session, token }: { session: Session; token: JWT }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
        session.user.image = token.picture as string;
        session.user.schId = token.schId as User["schId"];
        session.user.rollNo = token.rollNo as User["rollNo"];
        session.user.batch = token.batch as User["batch"];
        session.user.branch = token.branch as User["branch"];
        session.user.resumeIds = token.resumeIds as Resumes["id"];
      }
      return session;
    },

    async jwt({
      token,
      trigger,
      session,
    }: {
      token: JWT;
      trigger?: "signIn" | "signUp" | "update";
      session?: any;
    }) {
      if (trigger === "update" && session) {
      
        return {
          ...token,
          ...session,
          user: {
            ...(token.user as object),
            ...session.user,
          },
        };
      }
      if (!token.sub) return token;
      const existingUser = await prisma.user.findUnique({
        where: { id: token.sub },
        select: {
          email: true,
          name: true,
          schId: true,
          batch: true,
          branch: true,
          rollNo: true,

          Resumes: {
            select: { id: true },
          },
        },
      });

      if (!existingUser) return token;

      return {
        ...token,
        ...existingUser,
        resumeIds: existingUser.Resumes.map((r) => r.id),
      };
    },
  },
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  ...authConfig,
});
