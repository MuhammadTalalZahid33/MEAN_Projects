import mongoose from "mongoose"
import { DB_NAME } from "../constants.js";

mongoose.set('strictQuery', true); 

let cachedConnection = null

const connectDB = async () => {
    if (cachedConnection) {
        return cachedConnection;
    }
    try {
        const uri = process.env.MONGODB_URI.includes(DB_NAME)
            ? process.env.MONGODB_URI
            : `${process.env.MONGODB_URI}/${DB_NAME}`;
        cachedConnection = await mongoose.connect(uri);

        console.log(`Atlas DB connected... DB Host: ${cachedConnection.connection.host}`);
    } catch (error) {
        console.log("DB connection error: ", error);
        throw error;
    }

}

export default connectDB;