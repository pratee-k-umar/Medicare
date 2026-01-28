import Doctor from "@/models/doctor";
import User from "@/models/user";
import { connectToDB } from "@/utils/database";

export const GET = async (req) => {
    try {
        await connectToDB();
        const url = new URL(req.url);
        const query = url.searchParams.get("q") || "";

        let userIds = [];
        if (query) {
            const users = await User.find({
                username: { $regex: query, $options: "i" },
            }).select("_id");
            userIds = users.map((u) => u._id);
        }

        // Use aggregation to search joined creator.username as well as doctor fields
        if (!query) {
            const all = await Doctor.find({}).populate("creator");
            console.log("search: returning all doctors ->", all.length);
            return new Response(JSON.stringify(all), { status: 200 });
        }

        const regex = { $regex: query, $options: "i" };
        const pipeline = [
            {
                $lookup: {
                    from: "users",
                    localField: "creator",
                    foreignField: "_id",
                    as: "creator",
                },
            },
            { $unwind: { path: "$creator", preserveNullAndEmptyArrays: true } },
            {
                $match: {
                    $or: [
                        { specilization: regex },
                        { location: regex },
                        { qualification: regex },
                        { "creator.username": regex },
                    ],
                },
            },
        ];

        const aggRes = await Doctor.aggregate(pipeline).exec();
        console.log("search: matched doctors ->", aggRes.length);
        return new Response(JSON.stringify(aggRes), { status: 200 });
    } catch (error) {
        console.log(error);
        return new Response("Doctors not found..!", { status: 500 });
    }
};
