import { connectToDB } from "@/utils/database";
import Contact from "@/models/contact";

export const GET = async (req) => {
  try {
    await connectToDB()
    const contacts = await Contact.find().populate("sender")
    return new Response(JSON.stringify(contacts), { status: 200 }) 
  } catch (error) {
    console.log(error)
    return new Response("Error getting contact..!", { status: 500 })
  }
}