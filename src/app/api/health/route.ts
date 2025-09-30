import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("teestudio");

    // Ping Mongo
    await db.command({ ping: 1 });

    return NextResponse.json({ ok: true, message: "MongoDB connected successfully ✅" });
  } catch (err: any) {
    return NextResponse.json({ ok: false, error: err.message }, { status: 500 });
  }
}