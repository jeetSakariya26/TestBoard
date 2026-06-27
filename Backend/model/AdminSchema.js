import moongoose from "mongoose";

const AdminSchema = new moongoose.Schema({
    Email : {
        type : String,
        required : true
    },
    Password : {
        type : String,
        required : true
    }
});

export default moongoose.model("Admin", AdminSchema);