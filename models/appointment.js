import { Schema, model, models } from "mongoose"

const AppointmentSchema = new Schema({
  doctor: {
    type: Schema.Types.ObjectId,
    ref: "doctor"
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "user"
  },
  status: {
    type: String,
    enum: ["pending", "approved"],
    default: "pending"
  },
  date: {
    type: String,
    required: true
  },
  shift: {
    type: String,
    required: true
  },
  time: {
    type: String,
    required: true
  }
}, {
  timestamps: true
})

const Appointment = models.Appointment || model("Appointment", AppointmentSchema)

export default Appointment