import { prisma } from "@/db/prisma";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { username, email, password } = await req.json();

    if (!email || !username || !password) {
      return NextResponse.json(
        { error: "fill up the feilds" },
        { status: 400 }
      );
    }

    const hashedPass = await bcrypt.hash(password, 10);
    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "Email already registered" },
        { status: 400 }
      );
    }

    await prisma.user.create({
      data: {
        email,
        password: hashedPass,
        name: username,
        
      },
    });

    return NextResponse.json(
      { message: "Registration Successfull" },
      { status: 200 }
    );
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to register user";
    return NextResponse.json({ error: message }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
