import { NextResponse } from "next/server"
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: Request) {
  try {
    const formData = await req.formData()
    const name = formData.get("name") as string
    const email = formData.get("email") as string
    const vehicle = formData.get("vehicle") as string
    const message = formData.get("message") as string
    const file = formData.get("file") as File

    // Process file in memory
    const fileBuffer = await file.arrayBuffer()
    const fileBase64 = Buffer.from(fileBuffer).toString("base64")

    const { data, error } = await resend.emails.send({
      from: "ST Tuning <onboarding@resend.dev>",
      to: ["tony.shivenkov@gmail.com"],
      subject: `New Tune Request from ${name}`,
      html: `
        <h2>New Tune Request</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Vehicle:</strong> ${vehicle}</p>
        <p><strong>Message:</strong> ${message}</p>
        <p><strong>Instagram:</strong> <a href="https://www.instagram.com/sttuning_kz/">@sttuning_kz</a></p>
      `,
      attachments: [
        {
          filename: file.name,
          content: fileBase64,
        },
      ],
    })

    if (error) {
      console.error("Email error:", error)
      return NextResponse.json({ error: "Failed to send email" }, { status: 500 })
    }

    return NextResponse.json({ success: true, data })
  } catch (error) {
    console.error("Request error:", error)
    return NextResponse.json({ error: "Failed to process request" }, { status: 500 })
  }
}

export const runtime = "nodejs" // This specifies that this route should use the Node.js runtime
