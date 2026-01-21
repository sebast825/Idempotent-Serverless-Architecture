import { checkDatabaseHealth } from "@/lib/prisma";
import { NextResponse } from "next/server";

// Force the route to be dynamic and bypass cache
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  const isAlive = await checkDatabaseHealth();

  if (!isAlive) {
    return NextResponse.json(
      { status: "error", database: "unreachable" },
      { status: 503 }
    );
  }

  return NextResponse.json(
    { status: "ok", database: "connected" },
    { status: 200 }
  );
}
