import { connectToDB } from "@/utils/database";
import Doctor from "@/models/doctor";

export const GET = async (req) => {
  const url = new URL(req.url)
  const query = url.searchParams.get('q')
  try {
    await connectToDB()
    const conditions = query ? {
      $or: [
        { username: { $regex: query, $options: 'i'} },
        { specilization: { $regex: query, $options: 'i'} },
        { location: { $regex: query, $options: 'i'} }
      ]
    }: {}
    const fetchedDoc = await Doctor.find(conditions).populate('creator').populate('specilization').populate('location')
    return new Response(JSON.stringify(fetchedDoc), { status: 200 })
  } catch (error) {
    console.log(error)
    return new Response("Doctors not found..!", { status: 500 })
  }
}