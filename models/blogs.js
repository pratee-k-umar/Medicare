import { Schema, model, models } from "mongoose";

const BlogSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  creator: {
    type: Schema.Types.ObjectId,
    ref: "Doctor",
    required: true
  },
  title: { type: String },
  tag: { type: String },
  imageUrl: [{ type: String }],
  publicId: [{ type: String }],
  content: { type: String },
}, {
  timestamps: true
})

BlogSchema.pre("save", async function (next) {
  const user = await mongoose.model("User").findById(this.userID)
  this.creatorName = user.name
  next()
})

const Blogs = models.Blogs || model("Blogs", BlogSchema)
export default Blogs