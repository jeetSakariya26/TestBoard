import mongoose  from "mongoose";

const StudentPracticeSchema = new mongoose.Schema({
    PracticeID : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Practice",
        required : true
    },
    ChoosenAnswer : [{
        QuestionID : {
            type : mongoose.Schema.Types.ObjectId,
            ref : "Question",
            required : true
        },
        Choosen : {
            type : Number,
            required : false
        },
        IsAttempted : {
            type : Boolean,
            default : false
        }
    }],
    TotalMarks : {
        type : Number,
        required : false
    },
    ObtainedMarks : {
        type : Number,
        required : false
    },
    StartTime : {
        type : Date,
        required : true
    },
    EndTime : {
        type : Date,
        required : true
    }
});

export default mongoose.model("StudentPractice", StudentPracticeSchema);