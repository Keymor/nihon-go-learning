import mongoose from "mongoose";

const wordSchema = new mongoose.Schema({
    id: {type: Number},
    japaneseWord: {type: String},
    english: {type: String},
    ukrainian: {type: String},
    englishMeaning: {type: String},
    wordType: {type: String},
    lesson: {type: Number}
})

const lessonsSchema = new mongoose.Schema({
    lesson: Number,
    words: [wordSchema]
})

const Lessons = mongoose.model('Lessons', lessonsSchema, 'words-for-cards')

export default Lessons