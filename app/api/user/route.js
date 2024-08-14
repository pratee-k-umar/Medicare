import User from "@/models/user";
import { connectToDB } from "@/utils/database";

export const GET = async () => {
  try {
    await connectToDB()
    const totalUsers = await User.countDocuments({ role: { $ne: 'admin' } })
    return new Response(JSON.stringify(totalUsers), { status: 200 })
  } catch (error) {
    return new Response("Could not fetch users..!", { status: 400 })
    console.log(error)
  }
}