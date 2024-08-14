import { Schema, models, model } from "mongoose"

const contactSchema = new Schema({
  sender: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  name: { type: String },
  email: { type: String },
  message: { type: String },
}, {
  timestamps: true
})

const Contact = models.Contact || model("Contact", contactSchema)

export default Contact