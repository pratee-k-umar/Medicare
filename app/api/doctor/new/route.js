import Doctor from "@/models/doctor"
import { connectToDB } from "@/utils/database"

export const POST = async (req) => {
  const { userId, isDoctor, location, specilization, qualification, experience } = await req.json()
  try {
    await connectToDB()
    const newDoctor = new Doctor({
      creator: userId,
      isDoctor,
      location,
      specilization,
      qualification,
      experience
    })
    await newDoctor.save()
    return new Response(JSON.stringify(newDoctor), { status: 201 })
  }
  catch(error) {
    return new Response("Error registering for new Doctor..!", { status: 500 })
  }
}