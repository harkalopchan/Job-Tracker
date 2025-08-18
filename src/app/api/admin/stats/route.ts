import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Check if user is admin
    if (session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Admin access required" }, { status: 403 });
    }

    // Get system statistics
    const [totalUsers, totalJobs, totalNotes, totalTags] = await Promise.all([
      prisma.user.count(),
      prisma.job.count(),
      prisma.note.count(),
      prisma.tag.count(),
    ]);

    const stats = {
      totalUsers,
      totalJobs,
      totalNotes,
      totalTags,
    };

    return NextResponse.json(stats);
  } catch (error) {
    console.error("Error fetching system stats:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
