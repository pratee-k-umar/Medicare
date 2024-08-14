import { connectToDB } from "@/utils/database";
import Avaliable from "@/models/avaliability";

export const POST = async (req) => {
  const { user, doctor, date, shift, time } = await req.json()
  try {
    await connectToDB()
    const newAvaliable = new Avaliable({
      user,
      doctor,
      date,
      shift,
      time
    })
    await newAvaliable.save()
    return new Response(JSON.stringify(newAvaliable), { status: 201 })
  } catch (error) {
    console.log(error)
    return new Response("Could not save data..!", { status: 500 })
  }
}