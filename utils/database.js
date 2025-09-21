import mongoose from "mongoose";

let isConnected = false

export const connectToDB = async () => {
    if (isConnected) {
        console.log("Database connected...")
        return
    }
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            dbName: "user"
        })
        isConnected = true
        console.log("Database connected...")
    }
    catch (error) {
        console.log(error)
    }
}