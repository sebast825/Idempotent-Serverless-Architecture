import { checkDatabaseHealth } from "@/lib/prisma";
import { NextResponse } from "next/server";

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
