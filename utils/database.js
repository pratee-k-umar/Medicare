import mongoose from "mongoose";

const globalAny = globalThis;

if (!globalAny.__mongoose_cache) {
    globalAny.__mongoose_cache = { conn: null, promise: null };
}

export const connectToDB = async () => {
    if (globalAny.__mongoose_cache.conn) {
        return globalAny.__mongoose_cache.conn;
    }

    if (!globalAny.__mongoose_cache.promise) {
        const opts = {
            dbName: "user",
            bufferCommands: false,
        };
        globalAny.__mongoose_cache.promise = mongoose.connect(process.env.MONGODB_URI, opts).then((mongoose) => {
            return mongoose;
        });
    }

    try {
        globalAny.__mongoose_cache.conn = await globalAny.__mongoose_cache.promise;
        return globalAny.__mongoose_cache.conn;
    } catch (error) {
        console.error("Failed to connect to MongoDB:", error);
        globalAny.__mongoose_cache.promise = null;
        throw error;
    }
}