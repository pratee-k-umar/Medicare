import { connectToDB } from "@/utils/database";
import Doctor from "@/models/doctor";

export const DELETE = async (req, {params}) => {
  try {
    await connectToDB()
    await Doctor.findByIdAndDelete(params.id)
    return new Response("Data deleted successfully...", { status: 200 })
  } catch (error) {
    console.log(error)
    return new Response("Error deleting data..!", { status: 500 })
  }
}