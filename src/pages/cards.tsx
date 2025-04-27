import Header from "../components/header"
import Logo from "../components/logo"
import Loading from "../components/loading"
import Footer from "../components/footer"
import FlashCardsFunction from "../components/flashCardsFunction"
import { useEffect, useState } from "react"

interface wordsArray {
    id: Number;
    japaneseWord: string;
    english: string;
    ukrainian: string;
    englishMeaning: string;
    wordType: string;
    lesson: number
}

export default function Cards() {

    const [loading, setLoading] = useState(false)
    const [startLesson, setStartLesson] = useState(false)
    const [choose, setChoose] = useState(false)
    const [lessonNum, setLessonNum] = useState(0)
    const [lessonsArray, setLessonsArray] = useState([])
    const [lessonWordsArray, setLessonWordsArray] = useState<wordsArray[]>([{
        id: 0,
        japaneseWord: '',
        english: '',
        ukrainian: '',
        englishMeaning: '',
        wordType: '',
        lesson: 0
    }])

    // Loading chousen lesson and starting flash cards.
    const cardsStarts = async (lessonNum: number) => {
        setLoading(true)
        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/cards/lesson`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ lesson: lessonNum })
            })
            const responde = await res.json()
            setLessonWordsArray(responde[0].words)
            setStartLesson(true)
            setLoading(false)
        } catch {
            (err: string) => console.log(err)
        }
    }

    // Hendle user choose and save only number of lesson.
    const hendleLessonNum = (lesson: string) => {
        const lastChar = lesson.split(' ')[1]
        const lessonNumber = parseInt(lastChar)
        setLessonNum(lessonNumber)
    }

    // Finish fun. Set all important stats to default.
    const finishLessonFun = () => {
        setChoose(false)
        setStartLesson(false)
        setChoose(false)
        setLessonNum(0)
    }

    // Get all available lessons and push it to state. 
    useEffect(() => {
        const updatelesNum = async () => {
            try {
                const res = await fetch(`${import.meta.env.VITE_API_URL}/cards/lesson`, {
                    method: 'GET'
                })
                const responde = await res.json()

                const newArray = responde.map((obj: wordsArray) => 'Lesson ' + obj.lesson)
                newArray.sort((a: string, b: string) => {
                    const aNumb = parseInt(a.substring(7));
                    const bNumb = parseInt(b.substring(7));

                    return aNumb - bNumb
                })
                setLessonsArray(newArray)
            } catch {
                (err: string) => console.log(err)
            }
        }
        updatelesNum()
    }, [])

    return (
        <div className="flex flex-col w-screen h-screen">
            {loading ? <Loading /> : null}
            <div >
                <Logo />
            </div>
            <Header />
            <div className="flex flex-col mt-15 mx-auto animate-[homeCards_1s_forwards]">
                <h1 className="flex m-auto font-bold text-2xl sm:text-4xl text-gray-700">Vocabulary practice</h1>
                <p className="flex m-auto text-lg sm:text-xl text-gray-500">Flesh cards</p>
            </div>
            <div style={{ display: startLesson ? 'none' : 'flex' }} className="flex-col animate-[homeCards_1s_forwards]">
                <div className="bg-gray-100 mx-auto mt-15 w-80 py-5 h-fit rounded-3xl flex flex-col justify-between relative inset-shadow-[2px_2px_15px_rgb(0,0,0,0.2)]">
                    <div className=" absolute w-80 h-full inset-0 rounded-3xl inset-shadow-[-6px_-6px_10px_rgb(255,255,255,1)] z-0"></div>
                    <p onClick={() => setChoose(!choose)} style={{ display: choose ? 'none' : 'flex' }} className="z-1 cursor-pointer flex mx-auto w-80 justify-center text-2xl font-medium text-gray-300">Choose lesson</p>
                    {/* Array with available lessons. */}
                    {choose ?
                        lessonsArray.map((item, index) => {
                            return (
                                <div style={{ backgroundColor: lessonNum === (index + 1) ? 'rgb(231,92,92,1)' : '' }} onClick={() => hendleLessonNum(item)} className="z-1 cursor-pointer hover:bg-[rgb(231,92,92,1)] hover:text-white flex w-full text-2xl text-gray-600 justify-center py-1" key={index}>
                                    {item}
                                </div>
                            )
                        }) :
                        null
                    }
                </div>
                <button style={{ backgroundColor: lessonNum > 0 ? '' : 'rgb(199, 199, 199)' }} disabled={lessonNum > 0 ? false : true} className="w-50 mt-10 bg-[rgb(231,92,92,1)] mx-auto shadow-md text-2xl p-4 rounded-4xl font-bold text-gray-700 relative">
                    <div onClick={() => cardsStarts(lessonNum)} className=" cursor-pointer absolute size-full -translate-x-4 -translate-y-4 rounded-4xl shadow-[-8px_-8px_8px_rgba(255,255,255,1)] "></div>
                    START
                </button>
            </div>
            <div style={{ display: startLesson ? 'flex' : 'none' }} className="flex w-full mx-auto mt-15 animate-[homeCards_1s_forwards]">
                <FlashCardsFunction lessonArray={lessonWordsArray} lessonUpdate={finishLessonFun} />
            </div>
            <Footer />
        </div>
    )
}