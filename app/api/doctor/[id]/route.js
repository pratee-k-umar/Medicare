import Doctor from "@/models/doctor"
import { connectToDB } from "@/utils/database"

export const GET = async (request, {params}) => {
  try {
    await connectToDB()
    const response = await Doctor.findById(params.id)
    return new Response(JSON.stringify(response), { status: 200 })
  }
  catch(error) {
    console.log(error)
    return new Response("No user found..!", { status: 500 })
  }
}

export const PATCH = async (req, {params}) => {
  const { location, specilization, qualification, experience, fees } = await req.json()
  try {
    await connectToDB()
    const doctor = await Doctor.findById(params.id)
    if(!doctor) return new Response("No user found..!", { status: 500 })
    doctor.location = location
    doctor.specilization = specilization
    doctor.qualification = qualification
    doctor.experience = experience
    doctor.fees = fees
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