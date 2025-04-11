import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    lessons: Number,
    words: Number,
    kanji: Number,
    completLessonsWords: [String],
    completLessons: [String],
    completLessonsKanji: [String],
    name: String,
    password: String
})

const UserData = mongoose.model('UserData', userSchema, 'users-list')

export default UserData