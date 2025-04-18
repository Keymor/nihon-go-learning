import mongoose from "mongoose";

const kanjiSchema = new mongoose.Schema({
    id: {type: Number},
    kanji: {type: String},
    english: {type: String},
    ukrainian: {type: String}
})

const Kanji = mongoose.model('Kanji', kanjiSchema, 'kanji-list')

export default Kanji