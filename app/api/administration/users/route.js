import User from "@/models/user"
import { connectToDB } from "@/utils/database"

export const GET = async () => {
  try {
    await connectToDB()
    const users = await User.find({ role: "user" })
    return new Response(JSON.stringify(users), { status: 200 })
  }
  catch(error) {
    console.log(error)
    return new Response(JSON.stringify({ error: error.message }), { status: 500 })
  }
}