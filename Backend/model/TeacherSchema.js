import mongoose, { mongo } from "mongoose";

const TeacherSchema = new mongoose.Schema({
    Name : {
        type : String,
        required : true
    },
    Email : {
        type : String,
        required : true
    },
    Password : {
        type : String,
        required : true
    },
    CollageName : {
        type : String,
        required : false
    },
    ExamsDetails : [{
        ExamID : {
            type : mongoose.Schema.Types.ObjectId,
            ref : "CreatedExam"
        },
        ExamName : {
            type : String,
            required : true
        },
        TotalMarks : {
            type : Number,
            required : true
        },
        TotalQuestion : {
            type : Number,
            required : true
        }
    }]
});

export default mongoose.model("Teacher", TeacherSchema);