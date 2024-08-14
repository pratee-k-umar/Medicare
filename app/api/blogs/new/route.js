import { connectToDB } from "@/utils/database";
import Blogs from "@/models/blogs";
import Doctor from "@/models/doctor";

export const POST = async () => {
  const {userId, title, imageUrl, publicId, tag, content} = await res.json()
  try {
    await connectToDB()
    const newBlog = await Blogs.create({
      user: userId,
      creator: await Doctor.findOne(userId).populate('_id').exec(),
      title,
      imageUrl,
      publicId,
      tag,
      content
    })
  } catch (error) {
    console.log(error)
    return new Response("Error creating new blog..!", { status:500 })
  }
}