import mongoose from "mongoose";

const PracticeSchema = new mongoose.Schema({
    ExamName : {
        type : String,
        required : true
    },
    ExamDescription : {
        type : String,
        required : true
    },
    TotalMarks : {
        type : Number,
        required : true
    },
    Questions : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : "Question",
        required : true
    }],
    Duration : {
        type : Number,
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
});

export default mongoose.model("Practice", PracticeSchema);