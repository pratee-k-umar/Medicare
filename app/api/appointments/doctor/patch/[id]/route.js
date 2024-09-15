import { connectToDB } from "@/utils/database";
import Appointment from "@/models/appointment";

export const PATCH = async (req, { params }) => {
  const { status } = await req.json()
  try {
    await connectToDB()
    const updateAppointment = await Appointment.findById(params.id)
    updateAppointment.status = status
    updateAppointment.save()
    return new Response(JSON.stringify(updateAppointment), { status: 200 })
  } catch (error) {
    console.log(error)
    return new Response("Error updating data..!", { status: 500 })
  }
}