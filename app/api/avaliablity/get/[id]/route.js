import Avaliable from "@/models/avaliability";
import User from "@/models/user";
import { connectToDB } from "@/utils/database";

export async function GET(request, context) {
    try {
        const params = await context.params;
        await connectToDB();
        const user = await User.findById(params.id);
        const fetchDays = await Avaliable.find({ user: user.id });
        return new Response(JSON.stringify(fetchDays), { status: 200 });
    } catch (error) {
        console.log(error);
        return new Response("Couldn't fetch detials..!", { status: 500 });
    }
}
