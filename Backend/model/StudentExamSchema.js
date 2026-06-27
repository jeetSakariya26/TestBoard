import mongoose from "mongoose";

export const AnalisisSchema = new mongoose.Schema({
    Correct : {
        type : Number,
        default : 0
    },
    Incorrect : {
        type : Number,
        default : 0
    },
    Unattempted : {
        type : Number,
        default : 0
    },
    Subject : [{
        SubjectName : {
            type : String,
            required : true
        },
        Correct : {
            type : Number,
            default : 0
        },
        Incorrect : {
            type : Number,
            default : 0
        },
        Unattempted : {
            type : Number,
            default : 0
        },
        TotalMarks : {
            type : Number,
            default : 0
        },
        TotalQue : {
            type : Number,
            default : 0
        },
        ObtainedMarks : {
            type : Number,
            default : 0
        }
    }]
});

const StudentExamSchema = new mongoose.Schema({
    StudentID : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Student",
        required : true
    },
    AssignedBy : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Teacher",
        required : false,
    },
    ExamName : {
        type : String,
        required : true
    },
    ExamID : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "CreatedExam"
    },
    State : {
        type : String,
        required : true,
        default : "Pending",
        enum : ["OnGoing", "Completed", "Missed","Pending","Result","Account Not Created"]
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
        required : true,
        default : 0
    },
    EndTime : {
        type : Date,
        required : false,
    },
    StartTime : {
        type : Date,
        required : true,
        default : Date.now()
    },
    AttemptedQue : {
        type : Number,
        required : true,
        default : 0
    },
    TotalQuestions : {
        type : Number,
        required : true
    },
    Analisis : {
        type : AnalisisSchema,
        required : false
    }
});

export default mongoose.model("StudentExam", StudentExamSchema);