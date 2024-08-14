import { connectToDB } from "@/utils/database";
import Doctor from "@/models/doctor";

export const GET = async (req) => {
  try {
    await connectToDB()
    const doctorId = await Doctor.findOne().select('_id')
    return new Response(JSON.stringify(doctorId), { status: 200 })
  } catch (error) {
    console.log(error)
    return new Response("Error deleting data..!", { status: 500 })
  }
}