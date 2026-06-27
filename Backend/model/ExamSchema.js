import mongoose from "mongoose";

const AnalistSchema = new mongoose.Schema({
    Avarage : {
        type : Number,
        required : true
    },
    Min : {
        type : Number,
        required : true
    },
    Max : {
        type : Number,
        required : true
    },
    TotalStudentTakenExam : {
        type : Number,
        required : true
    }
});

const QuestionWiseAnalisisSchema = new mongoose.Schema({
    QuestionID : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Question",
        required : true
    },
    NoOfStudentAttempted : {
        type : Number,
        required : true
    },
    NoOfStudentAnsweredCorrectly : {
        type : Number,
        required : true
    },
    NoOfStudentWhoChooseOption : [{
        Option : {
            type : String,
            required : true
        },
        NoOfStudent : {
            type : Number,
            required : true
        }
    }]
})


const CreatedExamSchema = new mongoose.Schema({
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
    Creater : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Teacher",
        required : true
    },
    Questions : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : "Question"
    }],
    StartTime : {
        type : Date,
        required : true,
        default : Date.now()
    },
    EndTime : {
        type : Date,
        required : true,
        default : Date.now()
    },
    Duration : {
        type : Number,
        required : true
    },
    StudentID : [{
        type : mongoose.Schema.Types.ObjectId,
        ref  : "StudentExam"
    }],
    PendingStudentID : [{
        type : mongoose.Schema.Types.ObjectId,
        ref  : "PendingStudent"
    }],
    TotalQuestions : {
        type : Number,
        required : true
    },
    IsResultAnnounced : {
        type : Boolean,
        default : false
    },
    Analist : {
        type : AnalistSchema,
        required : false
    },
    QuestionWiseAnalisis : [{
        type : QuestionWiseAnalisisSchema,
        required : false
    }]
});

export default mongoose.model("CreatedExam", CreatedExamSchema);