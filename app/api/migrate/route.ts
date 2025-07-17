import { NextResponse } from "next/server"
import { migrate } from "@/lib/db-migrate"

export async function GET() {
  try {
    await migrate()
    return NextResponse.json({ message: "Migration completed successfully" })
  } catch (error) {
    console.error("Migration error:", error)
    // Check if the error is due to tables or columns already existing
    if (error instanceof Error && error.message.includes("already exists")) {
      return NextResponse.json({ message: "Database schema is up to date, no migration needed" })
    }
    return NextResponse.json({ error: "Migration failed" }, { status: 500 })
  }
}
