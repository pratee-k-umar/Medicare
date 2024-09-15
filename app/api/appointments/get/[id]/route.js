import { connectToDB } from "@/utils/database";
import User from "@/models/user";
import Appointment from "@/models/appointment";

export const GET = async (req, { params }) => {
  try {
    await connectToDB()
    const user = await User.findById(params.id)
    const fetchDays = await Appointment.find({ user: user.id })
    return new Response(JSON.stringify(fetchDays), { status: 200 })
  } catch (error) {
    console.log(error)
    return new Response("Error fetching data..!", { status: 500 })
  }
}