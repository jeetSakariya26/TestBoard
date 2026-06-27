import mongoose, { mongo } from "mongoose";

const StudentSchema = new mongoose.Schema({
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
        State: {
            type : String,
            required : true,
            default : "Pending",
            enum : ["OnGoing", "Completed", "Missed","Pending","Result"]
        },
        ExamDescription : {
            type : String,
            required : true
        }
    }],
    PracticeTestID : [{
        PracticeID : {
            type : mongoose.Schema.Types.ObjectId,
            ref : "Practice"
        },
        ExamName : {
            type : String,
            required : true
        },
        TotalMarks : {
            type : Number,
            required : true
        },
        State: {
            type : String,
            required : true,
            default : "Pending",
            enum : ["OnGoing", "Completed", "Missed","Pending","Result"]
        },
        ExamDescription : {
            type : String,
            required : true
        }
    }]
});

export default mongoose.model("Student", StudentSchema);