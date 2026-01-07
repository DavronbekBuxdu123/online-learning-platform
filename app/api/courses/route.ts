import { db } from "@/config";
import { coursesTable } from "@/config/schema";
import { currentUser } from "@clerk/nextjs/server";
import { desc, eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const user = await currentUser();
  const email = user?.primaryEmailAddress?.emailAddress;
  if (!email) return NextResponse.json([], { status: 200 });
  const { searchParams } = new URL(req.url);
  const courseId = searchParams.get("courseId");
  if (courseId) {
    const result = await db
      .select()
      .from(coursesTable)
      .where(eq(coursesTable.cid, courseId));
    return NextResponse.json(result[0]);
  } else {
    const result = await db
      .select()
      .from(coursesTable)
      .where(eq(coursesTable.userEmail, email))
      .orderBy(desc(coursesTable.id));
    return NextResponse.json(result);
  }
}
