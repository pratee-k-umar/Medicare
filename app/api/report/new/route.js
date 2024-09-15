import { connectToDB } from "@/utils/database";
import Report from "@/models/report";

export const POST = async (req) => {
  const { senderEmail, doctorEmail, reason, description } = await req.json()
  try {
    await connectToDB()
    const newReport = new Report({
      senderEmail,
      doctorEmail,
      reason,
      description
    })
    await newReport.save()
    return new Response(JSON.stringify(newReport), { status: 201 })
  } catch (error) {
    console.log(error)
    return new Response("Error submitting report..!", { status: 500 })
  }
}