import { NextResponse } from "next/server"
import fs from "fs"
import path from "path"

const dataFilePath = path.join(process.cwd(), "data", "vehicles.json")

export async function POST(req: Request) {
  try {
    const vehicle = await req.json()

    // Read existing data
    let vehicles = []
    if (fs.existsSync(dataFilePath)) {
      const fileContents = fs.readFileSync(dataFilePath, "utf8")
      vehicles = JSON.parse(fileContents)
    }

    // Add new vehicle
    vehicles.push(vehicle)

    // Write updated data back to file
    fs.writeFileSync(dataFilePath, JSON.stringify(vehicles, null, 2))

    return NextResponse.json({ message: "Vehicle added successfully" }, { status: 200 })
  } catch (error) {
    console.error("Error adding vehicle:", error)
    return NextResponse.json({ message: "Error adding vehicle" }, { status: 500 })
  }
}

export async function GET() {
  try {
    if (fs.existsSync(dataFilePath)) {
      const fileContents = fs.readFileSync(dataFilePath, "utf8")
      const vehicles = JSON.parse(fileContents)
      return NextResponse.json(vehicles)
    } else {
      return NextResponse.json([])
    }
  } catch (error) {
    console.error("Error fetching vehicles:", error)
    return NextResponse.json({ message: "Error fetching vehicles" }, { status: 500 })
  }
}
