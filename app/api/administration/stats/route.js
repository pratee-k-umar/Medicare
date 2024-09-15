import { connectToDB } from "@/utils/database";
import User from "@/models/user";
import Doctor from "@/models/doctor";
import Appointment from "@/models/appointment";

export const GET = async () => {
  const { searchParams } = new URL(req.url);
  const month = searchParams.get('month');
  const year = searchParams.get('year');

  try {
    await connectToDB();

    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0, 23, 59, 59);

    const users = await User.find({ createdAt: { $gte: startDate, $lt: endDate } });
    const doctors = await Doctor.find({ createdAt: { $gte: startDate, $lt: endDate } });
    const bookings = await Appointment.find({ createdAt: { $gte: startDate, $lt: endDate } });

    return new Response(JSON.stringify({ users, doctors, bookings }), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Error fetching stats", { status: 500 });
  }
}