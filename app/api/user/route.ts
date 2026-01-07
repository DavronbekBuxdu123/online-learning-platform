import { db } from "@/config";
import { usersTable } from "@/config/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { email, name } = await req.json();

    const users = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, email));

    if (users.length === 0) {
      const result = await db
        .insert(usersTable)
        .values({
          email,
          name,
        })
        .returning();
      return NextResponse.json(result);
    }

    return NextResponse.json(users[0]);
  } catch (error) {
    return new NextResponse("Internal server error", { status: 500 });
  }
}
