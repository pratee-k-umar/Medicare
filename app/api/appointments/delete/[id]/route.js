import { connectToDB } from "@/utils/database";
import Appointment from "@/models/appointment";

export const DELETE = async (req, { params }) => {
  try {
    await connectToDB()
    await Appointment.findByIdAndDelete(params.id)
    return new Response("Data deleted successfully...", { status: 200 })
  } catch (error) {
    console.log(error)
    return new Response("Error deleting data..!", { status: 500 })
  }
}