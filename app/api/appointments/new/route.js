import { connectToDB } from "@/utils/database";
import Appointment from "@/models/appointment";

export const POST = async (req) => {
  const { doctor, user, status, date, shift, time } = await req.json()
  try {
    await connectToDB()
    const newAppointment = new Appointment({
      doctor,
      user,
      status,
      date,
      shift,
      time
    })
    await newAppointment.save()
    return new Response("Appointment booked successfully...", { status: 200 })
  } catch (error) {
    console.log(error)
    return new Response("Error booking appointment..!", { status: 500 })
  }
}