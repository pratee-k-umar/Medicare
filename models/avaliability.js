import { Schema, model, models} from "mongoose"

const availabilitySchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  doctor: {
    type: Schema.Types.ObjectId,
    ref: "Doctor"
  },
  date: {
    type: String,
  },
  shift: {
    type: String,
  },
  time: {
    type: String,
  }
})

const Avaliable = models.Avaliable || model("Avaliable", availabilitySchema)

export default Avaliable