import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import cors from 'cors'
import Lessons from './lesson.js'
const PORT = 3560

dotenv.config()
const uri = process.env.MONGODB_URI
const app = express()

app.use(cors())
app.use(express.json())

mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.log('NO CONNECTION TO MANGODB', err))

app.get('/cards/words', async (req, res) => {
    const firstLesson = await Lessons.find({ lesson: 1 })
    res.json(firstLesson)
})

app.get('/', (req, res) => {
    res.send('works')
})

app.post('/cards/lesson', async (req, res) => {
    const lesson = await Lessons.find(req.body)
    res.json(lesson)
})

app.listen(PORT, () => {
    console.log('Listen port: 3560')
})