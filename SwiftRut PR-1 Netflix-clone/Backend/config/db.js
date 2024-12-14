import mongoose from "mongoose";
import { ENV_VARS } from "./config.js";

export const conectDB = async () =>{
    try {
        const conn = await mongoose.connect(ENV_VARS.MONGO_URL);
        console.log("monogo db conected" + conn.connection.host);
        
    } catch (error) {
        console.error("errror conecting to mongodb " + error.message)
        process.exit(1)
    }
}
