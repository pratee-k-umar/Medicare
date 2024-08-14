import Doctor from "@/models/doctor"
import { connectToDB } from "@/utils/database"

export const PATCH = async (request, {params}) => {
  const { isDoctorApproved } = await request.json()
  try {
    await connectToDB()
    const doctor = await Doctor.findById(params.id)
    doctor.isDoctorApproved = isDoctorApproved
    await doctor.save()
    return new Response(JSON.stringify(doctor), { status: 200 })
  }
  catch(error) {
    console.log(error)
    return new Response("Error editing User..!", { status: 500 })
  }
}

export const DELETE = async (request, {params}) => {
  try {
    await connectToDB()
    await Doctor.findByIdAndDelete(params.id)
    return new Response("Deleted successfully...", { status: 200 })
  }
  catch(error) {
    console.log(error)
    return new Response("User not deleted..!", { status: 500 })
  }
}