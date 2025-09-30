import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("teestudio");

    // Ping Mongo
    await db.command({ ping: 1 });

    return NextResponse.json({ ok: true, message: "MongoDB connected successfully ✅" });
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
    return NextResponse.json({ ok: false, error: errorMessage }, { status: 500 });
  }
}