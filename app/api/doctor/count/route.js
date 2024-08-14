import Doctor from "@/models/doctor";
import { connectToDB } from "@/utils/database";

export const GET = async () => {
  try {
    await connectToDB()
    const totalDoctor = await Doctor.countDocuments()
    return new Response(JSON.stringify(totalDoctor), { status: 200 })
  } catch (error) {
    console.log(error)
    return new Response("Error fetching count..!", { status: 500 })
  }
}