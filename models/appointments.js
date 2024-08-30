import { Schema, model, models } from "@mui/icons-material";

const AppointmentSchema = new Schema({
  doctor: {
    type: Schema.Types.ObjectId,
    ref: "doctor"
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "user"
  },
  date: {
    
  }
})