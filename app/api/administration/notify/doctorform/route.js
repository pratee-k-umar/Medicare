import Doctor from "@/models/doctor"
import { connectToDB } from "@/utils/database"

export const GET = async (request, { params }) => {
  try {
    await connectToDB()
    const pendingDoctors = await Doctor.find({ isDoctorApproved: "pending" }).populate("creator")
    return new Response(JSON.stringify(pendingDoctors), { status: 200 })
  }
  catch(error) {
    console.log(error)
    return new Response("Error fetching the data...", { status: 500 })
  }
}