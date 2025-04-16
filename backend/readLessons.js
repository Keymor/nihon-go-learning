import mongoose from "mongoose";

const ReadLessonsSchema = new mongoose.Schema({
    lesson: String,
    time: Number,
    lvl: String,
    title: String,
    discription: String,
    exampleTitle: String,
    example: String
})

const ReadLessons = mongoose.model('ReadLessons', ReadLessonsSchema, 'read-lessons')

export default ReadLessons