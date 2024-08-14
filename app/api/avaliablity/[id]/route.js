import { connectToDB } from "@/utils/database";
import Avaliable from "@/models/avaliability";
import User from "@/models/user";

export const GET = async (req, { params }) => {
  try {
    await connectToDB()
    const user = await User.findById(params.id)
    const fetchDays = await Avaliable.find({ user: user.id })
    return new Response(JSON.stringify(fetchDays), { status: 200 })
  } catch (error) {
    console.log(error)
    return new Response("Couldn't fetch detials..!", { status: 500 })
  }
}

export const DELETE = async (req, { params }) => {
  try {
    await connectToDB()
    await Avaliable.findByIdAndDelete(params.id)
    return new Response("Data deleted successfully...", { status: 200 })
  } catch (error) {
    console.log(error)
    return new Response("Couldn't delete the data..!", { status: 500 })
  }
}