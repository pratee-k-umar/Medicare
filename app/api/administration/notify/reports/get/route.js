import { connectToDB } from "@/utils/database";
import Report from "@/models/report";

export const GET = async (req) => {
  try {
    await connectToDB()
    const fetchReports = await Report.find()
    return new Response(JSON.stringify(fetchReports), { status: 200 })
  } catch (error) {
    console.log(error)
    return new Response("Error fetching reports..!", { status: 500 })
  }
}