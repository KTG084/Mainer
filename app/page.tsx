"use client"
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const Page = () => {
  return (
    <div className="flex justify-center mt-10">
      <Button asChild className="cursor-pointer hover:bg-red-500">
        <Link href="/resume">Resume Ranker</Link>
      </Button>
    </div>
  );
};

export default Page;
