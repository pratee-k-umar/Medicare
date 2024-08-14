import { connectToDB } from "@/utils/database";
import User from "@/models/user";

export const GET = async (req) => {
  const url = new URL(req.url)
  const query = url.searchParams.get('q')
  try {
    await connectToDB()
    const searchConditions = query ? {
      $or: [
        { username: { $regex: query, $options: 'i'} },
        { email: { $regex: query, $options: 'i'} }
      ]
    }: {}
    const conditions = {
      $and: [searchConditions, { role: "user" }],
    };
    const fetchedUsers = await User.find(conditions).populate('username').populate('email')
    return new Response(JSON.stringify(fetchedUsers), { status: 200 })
  } catch (error) {
    console.log(error)
    return new Response("Doctors not found..!", { status: 500 })
  }
}