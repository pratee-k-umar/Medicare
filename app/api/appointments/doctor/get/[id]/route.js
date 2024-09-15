import { connectToDB } from "@/utils/database";
import User from "@/models/user";
import Doctor from "@/models/doctor";
import Appointment from "@/models/appointment";

export const GET = async (req, { params }) => {
  try {
    await connectToDB()
    const userId = await User.findById(params.id)
    const doctorId = await Doctor.find({ creator: userId })
    const doctorAppointments = await Appointment.find({ doctor: doctorId })
    return new Response(JSON.stringify(doctorAppointments), { status: 200 })
  } catch (error) {
    console.log(error)
    return new Response("Error fetching data..!", { status: 500 })
  }
}