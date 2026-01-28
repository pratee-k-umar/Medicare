import Appointment from "@/models/appointment";
import Doctor from "@/models/doctor";
import User from "@/models/user";
import { connectToDB } from "@/utils/database";

export async function GET(request, context) {
    try {
        const params = await context.params;
        await connectToDB();
        const userId = await User.findById(params.id);
        const doctorId = await Doctor.find({ creator: userId });
        const doctorAppointments = await Appointment.find({ doctor: doctorId });
        return new Response(JSON.stringify(doctorAppointments), {
            status: 200,
        });
    } catch (error) {
        console.log(error);
        return new Response("Error fetching data..!", { status: 500 });
    }
}
