import { connectToDB } from "@/utils/database";
import User from "@/models/user";

export const DELETE = async (request, { params }) => {
  try {
    await connectToDB()
    await User.findByIdAndDelete(params.id)
    return new Response("Deleted Successfully...", { status: 200 })
  } catch (error) {
    console.log(error)
    return new Response("Error deleting user..!", { status: 500 })
  }
}