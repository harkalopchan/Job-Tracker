import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  // Create demo user
  const hashedPassword = await bcrypt.hash("demo123", 12);
  
  const user = await prisma.user.upsert({
    where: { email: "demo@example.com" },
    update: {},
    create: {
      email: "demo@example.com",
      password: hashedPassword,
      name: "Demo User",
      role: "USER",
    },
  });

  // Create demo tags
  const tags = await Promise.all([
    prisma.tag.upsert({
      where: { name: "Frontend" },
      update: {},
      create: { name: "Frontend", color: "#3B82F6" },
    }),
    prisma.tag.upsert({
      where: { name: "Backend" },
      update: {},
      create: { name: "Backend", color: "#10B981" },
    }),
    prisma.tag.upsert({
      where: { name: "Full Stack" },
      update: {},
      create: { name: "Full Stack", color: "#8B5CF6" },
    }),
    prisma.tag.upsert({
      where: { name: "Remote" },
      update: {},
      create: { name: "Remote", color: "#F59E0B" },
    }),
    prisma.tag.upsert({
      where: { name: "Senior" },
      update: {},
      create: { name: "Senior", color: "#EF4444" },
    }),
  ]);

  // Create demo jobs
  const jobs = await Promise.all([
    prisma.job.create({
      data: {
        title: "Senior Frontend Developer",
        company: "TechCorp",
        location: "San Francisco, CA",
        description: "Building modern web applications with React and TypeScript",
        salary: "$120,000 - $150,000",
        url: "https://techcorp.com/careers",
        stage: "APPLIED",
        priority: "HIGH",
        userId: user.id,
        tags: {
          create: [
            { tagId: tags[0].id },
            { tagId: tags[4].id },
          ],
        },
      },
    }),
    prisma.job.create({
      data: {
        title: "Backend Engineer",
        company: "StartupXYZ",
        location: "Remote",
        description: "Building scalable APIs and microservices",
        salary: "$100,000 - $130,000",
        url: "https://startupxyz.com/jobs",
        stage: "INTERVIEW",
        priority: "MEDIUM",
        userId: user.id,
        tags: {
          create: [
            { tagId: tags[1].id },
            { tagId: tags[3].id },
          ],
        },
      },
    }),
    prisma.job.create({
      data: {
        title: "Full Stack Developer",
        company: "Enterprise Inc",
        location: "New York, NY",
        description: "Working on enterprise applications",
        salary: "$110,000 - $140,000",
        url: "https://enterprise.com/careers",
        stage: "OFFER",
        priority: "URGENT",
        userId: user.id,
        tags: {
          create: [
            { tagId: tags[2].id },
          ],
        },
      },
    }),
  ]);

  // Create demo notes
  await Promise.all([
    prisma.note.create({
      data: {
        content: "Applied through LinkedIn. Company looks promising with good benefits.",
        userId: user.id,
        jobId: jobs[0].id,
      },
    }),
    prisma.note.create({
      data: {
        content: "First interview scheduled for next week. Need to prepare for system design questions.",
        userId: user.id,
        jobId: jobs[1].id,
      },
    }),
    prisma.note.create({
      data: {
        content: "Received offer letter! Negotiating salary and benefits.",
        userId: user.id,
        jobId: jobs[2].id,
      },
    }),
  ]);

  console.log("Database seeded successfully!");
  console.log("Demo user:", user.email);
  console.log("Demo jobs created:", jobs.length);
  console.log("Demo tags created:", tags.length);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
