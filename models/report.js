import { Schema, model, models } from "mongoose";

const ReportSchema = new Schema({
  senderEmail: {
    type: String,
    required: true
  },
  doctorEmail: {
    type: String,
    required: true
  },
  reason: {
    type: String,
    required: true
  },
  description: {
    type: String,
  },
})

const Report = models.Report || model("Report", ReportSchema)

export default Report