import User from "@/models/user"
import { connectToDB } from "@/utils/database"

export const DELETE = async (req, { params }) => {
  try {
    await connectToDB()
    await User.findByIdAndDelete(params.id)
    return new Response("User deleted successfully..!", { status: 200 })
  }
  catch(error) {
    console.log(error)
    return new Response("Error", { status: 500 })
  }
}