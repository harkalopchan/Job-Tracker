import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { tagId } = body;

    if (!tagId) {
      return NextResponse.json({ error: "Tag ID is required" }, { status: 400 });
    }

    // Verify the job belongs to the user
    const job = await prisma.job.findFirst({
      where: {
        id,
        userId: session.user.id,
      },
    });

    if (!job) {
      return NextResponse.json({ error: "Job not found" }, { status: 404 });
    }

    // Check if tag already exists on the job
    const existingJobTag = await prisma.jobTag.findFirst({
      where: {
        jobId: id,
        tagId,
      },
    });

    if (existingJobTag) {
      return NextResponse.json({ error: "Tag already exists on this job" }, { status: 400 });
    }

    // Create the job-tag association
    const jobTag = await prisma.jobTag.create({
      data: {
        jobId: id,
        tagId,
      },
      include: {
        tag: true,
      },
    });

    return NextResponse.json(jobTag, { status: 201 });
  } catch (error) {
    console.error("Error adding tag to job:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const tagId = searchParams.get("tagId");

    if (!tagId) {
      return NextResponse.json({ error: "Tag ID is required" }, { status: 400 });
    }

    // Verify the job belongs to the user
    const job = await prisma.job.findFirst({
      where: {
        id,
        userId: session.user.id,
      },
    });

    if (!job) {
      return NextResponse.json({ error: "Job not found" }, { status: 404 });
    }

    // Delete the job-tag association
    await prisma.jobTag.deleteMany({
      where: {
        jobId: id,
        tagId,
      },
    });

    return NextResponse.json({ message: "Tag removed successfully" });
  } catch (error) {
    console.error("Error removing tag from job:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
