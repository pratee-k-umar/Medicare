import { connectToDB } from "@/utils/database";
import Contact from "@/models/contact";

export const POST = async (req, res) => {
  const { sender, name, email, message } = await req.json()
  try {
    await connectToDB()
    const newContact = new Contact({
      sender,
      name,
      email,
      message
    })
    newContact.save()
    return new Response(JSON.stringify(newContact), { status: 200 })
  } catch (error) {
    console.log(error)
    return new Response("Error sending message..!", { status: 500 })
  }
}