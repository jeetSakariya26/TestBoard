import mongoose from "mongoose";

const PendingStudentSchema = new mongoose.Schema({
    Email : {
        type :String ,
        require : true
    },
    Exam : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : "CreatedExam"
    }]
});

export default mongoose.model("PendingStudent", PendingStudentSchema);