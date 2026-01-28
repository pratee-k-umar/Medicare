import User from "@/models/user";
import { connectToDB } from "@/utils/database";

export async function GET(request, context) {
    try {
        const params = await context.params;
        await connectToDB();
        const user = await User.findById(params.id);
        return new Response(JSON.stringify(user), { status: 200 });
    } catch (error) {
        console.log(error);
        return new Response("Error", { status: 500 });
    }
}
