import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import cors from 'cors'
import Lessons from './lesson.js'
import UserData from './user.js'
const PORT = 3560

dotenv.config()
const uri = process.env.MONGODB_URI
const app = express()

app.use(cors())
app.use(express.json())

mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.log('NO CONNECTION TO MANGODB', err))

app.post('/user/data', async (req, res) => {
    const user = await UserData.findById(req.body.id)
    res.json(user)
})

app.post('/user/data/updatewords', async (req, res) => {
    await UserData.updateOne(
        { _id: '67f6133b390fe7af1b547c45' },
        {
            $set: { words: req.body.words },
            $push: { completLessonsWords: req.body.completLessonsWords }
        }
    )
})

app.post('/cards/lesson', async (req, res) => {
    const lesson = await Lessons.find(req.body)
    res.json(lesson)
})

app.get('/cards/lesson', async (req, res) => {
    const list = await Lessons.find()
    res.json(list)
})

app.listen(PORT, () => {
    console.log('Listen port: 3560')
})