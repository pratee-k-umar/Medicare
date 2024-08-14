import { Schema, model, models } from "mongoose"

const UserSchema = new Schema({
  username: {
    type: String,
    required: [true, "Username is required..!"],
    match: [/^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/, "Username is invalid, it should contain 8-20 alphanumeric letters and be unique!"]
  },
  email: {
    type: String,
    unique: [true, "Email already exists!"],
    required: [true, "Email required..!"]
  },
  image: { type: String },
  role: { type: String }
}, {
  timestamps: true
})

const User = models.User || model("User", UserSchema)

export default User