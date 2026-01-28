import Doctor from "@/models/doctor";
import User from "@/models/user";
import { connectToDB } from "@/utils/database";

export async function GET(request, context) {
    try {
        const params = await context.params;
        await connectToDB();
        const user = await User.findById(params.id);
        const doctor = await Doctor.find({ creator: user.id });
        return new Response(JSON.stringify(doctor), { status: 200 });
    } catch (error) {
        console.log(error);
        return new Response("No user found..!", { status: 500 });
    }
}
