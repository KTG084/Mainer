/* eslint-disable @typescript-eslint/no-explicit-any */
import { prisma } from "@/db/prisma";
import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import decodeScholar from "./decode";
import { auth } from "@/auth";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
  secure: true,
});

export async function POST(req: NextRequest) {
  const session = await auth();
  const formData = await req.formData();
  const resume = formData.get("resume") as File;
  const schId = formData.get("schId") as string;

  const alreadyupload = await prisma.user.findFirst({
    where: {
      schId: schId,
    },
  });

  if (alreadyupload) {
    return NextResponse.json(
      {
        message: "You have already uploaded a resume",
        error: true,
      },
      { status: 400 }
    );
  }
  if (!resume) {
    return NextResponse.json({ error: "No file found" }, { status: 400 });
  }

  const pythonFormData = new FormData();
  pythonFormData.append("file", resume);
  let atsData;

  try {
    
    const fastApiServer = process.env.FASTAPI_SERVER;
    if (!fastApiServer) {
      throw new Error("FASTAPI_SERVER environment variable is not defined");
    }

    const res = await fetch(fastApiServer, {
      method: "POST",
      body: pythonFormData,
    });

    if (!res.ok) {
      throw new Error(`Python API error: ${res.status} ${res.statusText}`);
    }

    atsData = await res.json();
  } catch (error: any) {
    console.error("Failed to call Python ATS API:", error);

    if (error.name === "AbortError") {
      return NextResponse.json(
        {
          error:
            "Resume evaluation timed out. Please try again with a smaller file.",
        },
        { status: 408 }
      );
    }
    return NextResponse.json(
      { error: "Failed to evaluate resume. Please try again." },
      { status: 500 }
    );
  }

  const buffer = Buffer.from(await resume.arrayBuffer());
  const uploadResult = await new Promise<any>((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        resource_type: "raw",
        folder: "resumes",
        public_id: `resume_${Date.now()}`,
      },
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      }
    );
    stream.end(buffer);
  });

  const resumess = await prisma.resumes.create({
    data: {
      user: {
        connect: { email: session?.user.email },
      },
      url: uploadResult.secure_url,
      ats: atsData.ats_score.overall_percentage,
    },
  });

  await prisma.resumeEvaluation.create({
    data: {
      filename: atsData.filename,
      url: uploadResult.secure_url,
      status: atsData.status,
      overallPercentage: atsData.ats_score.overall_percentage,
      compatibilityLevel: atsData.ats_score.compatibility_level,
      keywordsFound: atsData.ats_score.keywords_found,
      totalKeywordsChecked: atsData.ats_score.total_keywords_checked,
      categoryBreakdown: atsData.ats_score.category_breakdown,
      foundKeywords: atsData.found_keywords,
      academicPerformance: atsData.academic_performance,
      detailedFeedback: atsData.llm_analysis.detailed_feedback,
      sourceChunks: atsData.llm_analysis.source_chunks,
      summary: atsData.summary,
      percentileRank: atsData.competitive_benchmarking.percentile_rank,
      industryAverage: atsData.competitive_benchmarking.industry_average,
      resume: {
        connect: { id: resumess.id },
      },
    },
  });

  const schDetail = decodeScholar(schId);

  if (!session?.user?.email) {
    throw new Error("User email is missing from session");
  }
  await prisma.user.update({
    where: { email: session?.user.email },
    data: {
      schId,
      batch: schDetail.batch,
      rollNo: schDetail.rollNo,
      branch: schDetail.branch,
    },
  });

  return NextResponse.json({
    status: 200,
    resumeId: resumess.id,
    statuss: atsData.status,
  });
}
