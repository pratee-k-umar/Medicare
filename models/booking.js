import { Schema, models, model } from "mongoose"

const BookingSchema = new Schema({
    doctor: {
        type: Schema.Types.ObjectId,
        ref: "Doctor",
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    appointmentDate: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        enum: ["pending", "approved", "cancelled"],
        default: "pending"
    },
}, { timestamps: true })

const Booking = models.Booking || model("Booking", BookingSchema)

export default Booking