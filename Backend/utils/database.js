import mongoose from "mongoose";
import "dotenv/config";

const DataBaseURL = process.env.MONGO_URL;
// console.log(DataBaseURL);

const connectDataBase = async ()=>{
    try{
        await mongoose.connect(DataBaseURL);
        console.log("connected to DataBase successfully");
    }catch(err){
        console.log(err);
    }
}

export default connectDataBase;