import mongoose from "mongoose";

const QuestionSchema = new mongoose.Schema({
    Type:{
        type : String,
        required : true,
        default : "SCQ"
    },
    Question:{
        type: String,
        required : true
    },
    Options : [{
        type : String,
        required : true
    }],
    QueImage : {
        type : String,
        required : false
    },
    CorrectAnswer : {
        type : String,
        required : true
    },
    PreviousJeeQuestion : {
        type : Boolean,
        required : true,
        default : false
    },
    PreviousJeeAdvancedQuestion : {
        type : Boolean,
        required : true,
        default : false
    },
    YearOfQuestion :{
        type : Number,
        reqquired : false
    },
    Subject :{
        type : String,
        required : true,
        enum: ["Maths","Physics","Chemistry"]
    },
    Chapter :{
        type : String,
        required : true
    },
    Difficulty :{
        type : String,
        required : true
    },
    Solution :{
        type : String,
        required : false
    },
    SolutionImage :{
        type : String,
        required : false
    },
    MarkForCorrect :{
        type : Number,
        required : true,
        default : 4
    },
    MarkForIncorrect :{
        type : Number,
        required : true,
        default : -1
    }
});

export default mongoose.model("Question",QuestionSchema);