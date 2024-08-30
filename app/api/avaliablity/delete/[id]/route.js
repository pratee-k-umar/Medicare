import { connectToDB } from "@/utils/database";
import Avaliable from "@/models/avaliability";

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