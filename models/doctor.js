import { Schema, model, models } from "mongoose"

const DoctorSchema = new Schema({
    creator: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    isDoctorApproved: {
        type: String,
        enum: ["pending", "accepted"],
        default: "pending",
        required: true
    },
    location: { type: String },
    specilization: { type: String },
    qualification: { type: String },
    experience: { type: String },
    fees: { type: String },
    timeSlots: { type: Array },
    isBookingApproved: {
        type: String,
        enum: ["pending", "approved"],
        default: "pending"
    },
    appointments: [{
        type: Schema.Types.ObjectId,
        ref: "Appointment"
    }]
}, {
    timestamps: true
})

const Doctor = models.Doctor || model("Doctor", DoctorSchema)

export default Doctor