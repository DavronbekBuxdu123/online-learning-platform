import { db } from "@/config";
import { coursesTable, enrollcoursesTable } from "@/config/schema";
import { currentUser } from "@clerk/nextjs/server";
import { and, desc, eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const user = await currentUser();
  const { courseId } = await req.json();
  const email = user?.primaryEmailAddress?.emailAddress;
  if (!email) return NextResponse.json([], { status: 200 });
  const enrollCourses = await db
    .select()
    .from(enrollcoursesTable)
    .where(
      and(
        eq(enrollcoursesTable.userEmail, email),
        eq(enrollcoursesTable.cid, courseId)
      )
    );

  if (enrollCourses.length == 0) {
    const res = await db
      .insert(enrollcoursesTable)
      .values({
        userEmail: user?.primaryEmailAddress?.emailAddress,
        cid: courseId,
      })
      .returning();

    return NextResponse.json(res);
  } else {
    return NextResponse.json({ resp: "Already enrolled" });
  }
}

export async function GET(req: NextRequest) {
  const user = await currentUser();
  const { searchParams } = new URL(req.url);
  const email = user?.primaryEmailAddress?.emailAddress;
  if (!email) return NextResponse.json([], { status: 200 });
  const courseId = searchParams.get("courseId");
  if (courseId) {
    const result = await db
      .select()
      .from(enrollcoursesTable)
      .innerJoin(coursesTable, eq(coursesTable.cid, enrollcoursesTable.cid))
      .where(
        and(
          eq(enrollcoursesTable.userEmail, email),
          eq(enrollcoursesTable.cid, courseId)
        )
      );
    return NextResponse.json(result[0]);
  } else {
    const result = await db
      .select()
      .from(enrollcoursesTable)
      .innerJoin(coursesTable, eq(coursesTable.cid, enrollcoursesTable.cid))
      .where(
        eq(
          enrollcoursesTable.userEmail,
          user?.primaryEmailAddress?.emailAddress
        )
      )
      .orderBy(desc(enrollcoursesTable.id));
    return NextResponse.json(result);
  }
}

export async function PUT(req: NextRequest) {
  const user = await currentUser();
  const { courseId, completedChapters } = await req.json();
  const email = user?.primaryEmailAddress?.emailAddress;
  if (!email) return NextResponse.json([], { status: 200 });
  const res = await db
    .update(enrollcoursesTable)
    .set({
      completedChapters: completedChapters,
    })
    .where(
      and(
        eq(enrollcoursesTable.cid, courseId),
        eq(enrollcoursesTable.userEmail, email)
      )
    )
    .returning();

  return NextResponse.json(res);
}
