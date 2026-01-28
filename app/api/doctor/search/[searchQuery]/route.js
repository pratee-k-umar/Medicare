import Doctor from "@/models/doctor";
import User from "@/models/user";
import { connectToDB } from "@/utils/database";

export const GET = async (req) => {
    const url = new URL(req.url);
    const query = url.searchParams.get("q");
    try {
        await connectToDB();

        // If there's a username match, find corresponding user ids and include them in the search
        let userIds = [];
        if (query) {
            const users = await User.find({
                username: { $regex: query, $options: "i" },
            }).select("_id");
            userIds = users.map((u) => u._id);
        }

        const conditions = query
            ? {
                  $or: [
                      { specilization: { $regex: query, $options: "i" } },
                      { location: { $regex: query, $options: "i" } },
                      ...(userIds.length
                          ? [{ creator: { $in: userIds } }]
                          : []),
                  ],
              }
            : {};

        const fetchedDoc = await Doctor.find(conditions).populate("creator");
        return new Response(JSON.stringify(fetchedDoc), { status: 200 });
    } catch (error) {
        console.log(error);
        return new Response("Doctors not found..!", { status: 500 });
    }
};
