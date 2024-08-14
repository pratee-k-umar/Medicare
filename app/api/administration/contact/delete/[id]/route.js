import { connectToDB } from "@/utils/database";
import Contact from "@/models/contact";

export const DELETE = async (req, {params}) => {
  try {
    await connectToDB()
    await Contact.findByIdAndDelete(params.id)
    return new Response("Data deleted successfully..!", { status: 200 })
  } catch (error) {
    console.log(error)
    return new Response("Error deleting data..!", { status: 500 })
  }
}