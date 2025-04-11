import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import cors from 'cors'
import Lessons from './lesson.js'
import UserData from './user.js'
import bcrypt from 'bcrypt'
const PORT = 3560

dotenv.config()
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

app.post('/register', async (req, res) => {
    const checkName = await UserData.find({ name: req.body.name })
    if (checkName.length === 0) {
        try {
            const hashedPassword = await bcrypt.hash(req.body.password, 10)
            await UserData.create({ name: req.body.name, password: hashedPassword, lessons: 0, words: 0, kanji: 0 })
            res.json({ succes: true })
        } catch {
            res.status(500).send()
        }
    } else {
        res.json({ succes: false })   
    }
})

app.post('/login', async (req, res) => {
    const userData = await UserData.find({ name: `${req.body.name}` })
    if (userData.length === 0) {
        res.json({ succes: false })
    } else {
        const userPassword = userData[0].password
        const result = await bcrypt.compare(req.body.password, userPassword)
        if (result) {
            res.json({ succes: true, userID: userData[0]._id })
        } else {
            res.json({ succes: false })
        }
    }
})

app.get('/cards/lesson', async (req, res) => {
    const list = await Lessons.find()
    res.json(list)
})

app.listen(PORT, () => {
    console.log('Listen port: 3560')
})