import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import cors from 'cors'
import Lessons from './lesson.js'
import UserData from './user.js'
import Kanji from './kanji.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import ReadLessons from './readLessons.js'
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
    const authHeader = req.headers['authorization']
    const token = authHeader?.split(' ')[1]

    if (!token) res.sendStatus(401);

    const user = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
    await UserData.updateOne(
        { _id: user.iD },
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

            const userId = await UserData.find({ name: req.body.name })
            const user = { iD: userId[0]._id }
            const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '12h' })
            res.json({ succes: true, userID: userId[0]._id, userName: userId[0].name, token: accessToken })
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
            const user = { iD: userData[0]._id }
            const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '12h' })
            res.json({ succes: true, userID: userData[0]._id, userName: userData.name, token: accessToken })
        } else {
            res.json({ succes: false })
        }
    }
})

app.get('/cards/lesson', async (req, res) => {
    const list = await Lessons.find()
    res.json(list)
})

app.get('/lessons', async (req, res) => {
    const authHeader = req.headers['authorization']
    const token = authHeader?.split(' ')[1]

    if (!token) res.sendStatus(401);

    try {
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        const lessons = await ReadLessons.find()
        res.json(lessons)
    } catch {
        console.error(err)
    }
})

app.post('/lessons', async (req, res) => {
    const authHeader = req.headers['authorization']
    const token = authHeader?.split(' ')[1]

    if (!token) res.sendStatus(401);

    try {

        const user = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        const userData = await UserData.findById(user.iD)

        if (!userData.completLessons.includes(req.body.lessons)) {
            const amountOfLessons = userData.lessons ? userData.lessons + 1 : 1
            await UserData.updateOne(
                { _id: user.iD },
                {
                    $push: { completLessons: req.body.lessons },
                    $set: { lessons: amountOfLessons }
                }
            )
        }
    } catch {
        console.error(err)
    }
})

app.get('/userdata', async (req, res) => {
    const authHeader = req.headers['authorization']
    const token = authHeader?.split(' ')[1]

    if (!token) res.sendStatus(401);

    try {
        const user = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        const userData = await UserData.findById(user.iD)
        res.json(userData)
    } catch {
        console.error(err)
    }
})

app.get('/vocabulary', async (req, res) => {
    const authHeader = req.headers['authorization']
    const token = authHeader?.split(' ')[1]

    if (!token) res.sendStatus(401);

    try {
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        const vocab = await Lessons.find();
        res.json(vocab)
    } catch (error) {
        console.error('JWT Verification Error:', error)
        return res.status(401).json({ message: 'Unauthorized' })
    }
})

app.get('/kanji/list', async (req, res) => {
    const authHeader = req.headers['authorization']
    const token = authHeader?.split(' ')[1]

    if (!token) res.sendStatus(401)

    try {
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        const kanji = await Kanji.find()
        res.json(kanji)
    } catch (error) {
        console.error('JWT Verification Error:', error)
        return res.status(401).json({ message: 'Unauthorized' })
    }
})

app.listen(PORT, () => {
    console.log('Listen port: 3560')
})