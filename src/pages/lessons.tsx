import Header from "../components/header"
import Logo from "../components/logo"
import Footer from "../components/footer"
import Lesson1 from "../lessons/lesson1"
import Lesson2 from "../lessons/Lesson2"
import Lesson3 from "../lessons/Lesson3"
import Lesson4 from "../lessons/Lesson4"
import Lesson5 from "../lessons/Lesson5"
import Lesson6 from "../lessons/Lesson6"
import Lesson7 from "../lessons/Lesson7"
import Lesson8 from "../lessons/Lesson8"
import Lesson9 from "../lessons/Lesson9"
import Lesson10 from "../lessons/Lesson10"
import { useEffect, useState } from "react"

interface Lessons {
    time: number,
    lvl: string,
    lesson: string,
    title: string,
    discription: string,
    exampleTitle: string,
    example: string
}

export default function Lessons() {
    const [lessons, setLessons] = useState<Lessons[]>()
    const [startLesson, setStartLesson] = useState(false)
    // const [animation, setAnimation] = useState(false)
    const [lesNum, setLesNum] = useState(0)
    const [currentLesson, setCurrentLesson] = useState<React.ReactNode | null>()

    const addVocab = async () => {
        const token = localStorage.getItem('token')
        const req = await fetch(`${process.env.REACT_APP_PUBLIC_API_URL}/userdata/lessons`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })
        const res = await req.json()
        let newArray: Lessons[] = []
        res.forEach((item: Lessons) => {
            newArray = [...newArray, item]
        })
        setLessons(newArray)
    }

    const toggleLesson = (num: number) => {
        setStartLesson(!startLesson)
        setLesNum(num)
        switch (num) {
            case 1:
                setCurrentLesson(<Lesson1 />)
                break;

            case 2:
                setCurrentLesson(<Lesson2 />)
                break;

            case 3:
                setCurrentLesson(<Lesson3 />)
                break;

            case 4:
                setCurrentLesson(<Lesson4 />)
                break;

            case 5:
                setCurrentLesson(<Lesson5 />)
                break;

            case 6:
                setCurrentLesson(<Lesson6 />)
                break;

            case 7:
                setCurrentLesson(<Lesson7 />)
                break;

            case 8:
                setCurrentLesson(<Lesson8 />)
                break;

            case 9:
                setCurrentLesson(<Lesson9 />)
                break;

            case 10:
                setCurrentLesson(<Lesson10 />)
                break;

            default:
                <div></div>
                break;
        }
    }

    const compliteLesson = async (lessonNum: number) => {
        toggleLesson(0)
        
        const token = localStorage.getItem('token')
        fetch (`${process.env.REACT_APP_PUBLIC_API_URL}/userdata/lessons`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({lessons: `Lesson ${lessonNum}`})
        })
    }

    useEffect(() => {
        addVocab()
    }, [])

    return (
        <div className="w-screen h-screen flex flex-col">
            <Logo />
            <Header />
            <div style={{ display: startLesson ? 'none' : '' }} className="flex flex-col animate-[homeCards_1s_forwards]">
                <h1 className="flex m-auto text-4xl text-center font-bold mt-15 text-gray-700">Lessons</h1>
                <p className="flex m-auto text-xl text-gray-500">Basic level</p>
            </div>
            <div style={{ display: startLesson ? 'none' : '' }} className="flex flex-wrap sm:max-w-320 justify-center gap-8 mx-auto py-20 w-full">
                {lessons?.map((item, index) => {
                    return (
                        <div
                            key={index}
                            style={{
                                animation: `homeCards ${0.1 + (index / 10)}s forwards`
                            }}
                            className="relative w-90 h-90 p-8 shadow-[5px_5px_8px_rgb(0,0,0,0.15)] rounded-4xl">
                            <div className=" inset-0 absolute size-full rounded-4xl shadow-[-8px_-8px_8px_rgba(255,255,255,1)]" />
                            <div className="flex flex-col h-full">
                                <div className="flex flex-row justify-between">
                                    <p className="my-auto text-gray-500">{item.lvl}</p>
                                    <h1 className="text-4xl font-bold text-[rgb(231,92,92,1)] my-auto">{item.lesson}</h1>
                                    <p className="my-auto text-gray-500">{item.time} min</p>
                                </div>
                                <h1 className="mt-5 text-xl font-bold text-gray-900">{item.title}</h1>
                                <p className="text-gray-400 mt-1 text-sm">{item.discription}</p>
                                <h2 className="mt-5 font-medium text-gray-900">Examples:</h2>
                                <p className="text-gray-500 font-medium">{item.example}</p>
                                <button onClick={() => toggleLesson(index + 1)} className="hover:bg-[rgb(231,92,92,1)] cursor-pointer w-40 mt-auto mx-auto shadow-md p-3 rounded-4xl font-bold text-gray-700 relative z-2">
                                    <div className="absolute size-full inset-0 rounded-4xl shadow-[-8px_-8px_8px_rgba(255,255,255,1)]" />
                                    START
                                </button>
                            </div>
                        </div>
                    )
                })}
            </div>
            <div style={{ display: startLesson ? '' : 'none' }} className="flex flex-col sm:max-w-320 justify-center gap-8 mx-auto my-20 p-10 w-full shadow-[5px_5px_8px_rgb(0,0,0,0.15)] rounded-2xl relative animate-[homeCards_1s_forwards]">
                <div className=" inset-0 absolute size-full rounded-4xl shadow-[-8px_-8px_8px_rgba(255,255,255,1)]" />
                {currentLesson}
                <div className="flex flex-row">
                    <button onClick={() => toggleLesson(0)} className="hover:bg-[rgb(231,92,92,1)] hover:text-gray-700 cursor-pointer w-80 mt-auto mx-auto shadow-md p-5 rounded-4xl font-extrabold text-gray-400 text-xl relative z-2">
                        <div className="absolute size-full inset-0 rounded-4xl shadow-[-8px_-8px_8px_rgba(255,255,255,1)]" />
                        BACK
                    </button>
                    <button onClick={() => compliteLesson(lesNum)} className="hover:bg-[rgb(231,92,92,1)] hover:text-gray-700 cursor-pointer w-80 mt-auto mx-auto shadow-md p-5 rounded-4xl font-extrabold text-gray-400 text-xl relative z-2">
                        <div className="absolute size-full inset-0 rounded-4xl shadow-[-8px_-8px_8px_rgba(255,255,255,1)]" />
                        COMPLETE
                    </button>
                    <a href="/cards" className="hover:bg-[rgb(231,92,92,1)] text-center hover:text-gray-700 cursor-pointer w-80 mt-auto mx-auto shadow-md p-5 rounded-4xl font-extrabold text-gray-400 text-xl relative z-2">
                        <div className="absolute size-full inset-0 rounded-4xl shadow-[-8px_-8px_8px_rgba(255,255,255,1)]" />
                        CARDS
                    </a>
                </div>
            </div>
            <Footer /> 
        </div>
    )
}