import Doctor from "@/models/doctor"
import { connectToDB } from "@/utils/database"

export const GET = async (request) => {
  try {
    await connectToDB()
    const doctor = await Doctor.findOne({ _id: doctor }).populate("doctorId")
    return new Response(JSON.stringify(doctor), { status: 200 })
  }
  catch(error) {
    console.log(error)
    return new Response("Error displaying info..!", { status: 500 })
  }
}