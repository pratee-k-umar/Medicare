import cloudinary from "cloudinary"

cloudinary.v2.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
})

const removeImage = async (publicId) => {
  try {
    await cloudinary.v2.uploader.destroy(publicId)
    return new Response("Image successfully removed...", { status: 200 })
  } catch (error) {
    return new Response("Error removing image..!", { status: 500 })
  }
}

export async function POST(req) {
  const { publicId } = await req.json()
  await removeImage(publicId)
  return new Response("Image removed successfully...", { status: 200 })
}