import Logo from "../components/logo"
import Header from "../components/header"
import Loading from "../components/loading"
import Footer from "../components/footer"
import FlashCardsFunction from "../components/flashCardsFunction"
import { useEffect, useState } from "react"

interface Kanji {
    id: 0,
    japaneseWord: '',
    english: '',
    ukrainian: '',
    englishMeaning: '',
    wordType: '',
    lesson: 0
}

interface KanjiArray {
    kanjiList: string,
    kanjis: Kanji[]
}

export default function Kanji() {
    const [loading, setLoading] = useState(false)
    const [choose, setChoose] = useState(false)
    const [startLesson, setStartLesson] = useState(false)
    const [choosed, setChoosed] = useState(0)
    const [lessonNum, setLessonNum] = useState(-1)
    const [kanjiListArray, setKanjiListArray] = useState<KanjiArray[]>([{
        kanjiList: '',
        kanjis: [
            {   
                id: 0,
                japaneseWord: '',
                english: '',
                ukrainian: '',
                englishMeaning: '', 
                wordType: '',
                lesson: 0
            }
        ]
    }])

    useEffect(() => {
        setLoading(true)
        const token = localStorage.getItem('token')
        const getLessons = async () => {
            const req = await fetch('http://localhost:3560/kanji/list', {
                method: 'GET',
                headers: { 'Authorization': `Bearer ${token}` }
            }
            )
            const res = await req.json()
            setKanjiListArray(res)
            setLoading(false)
        }
        getLessons()
    }, [])

    const hendleLessonNum = (num: number) => {
        setLessonNum(num)
        setChoosed(num)
    }

    const startLessonFun = () => {
        setStartLesson(!startLesson)
    }

    return (
        <div className="flex flex-col w-screen h-screen">
            {loading ? <Loading /> : null}
            <div >
                <Logo />
            </div>
            <Header />
            <div className="flex flex-col mt-15 mx-auto animate-[homeCards_1s_forwards]">
                <h1 className="flex m-auto font-bold text-4xl text-gray-700">Welcome</h1>
                <p className="flex m-auto text-xl text-gray-500">Continue your journey to mastering Japanese</p>
            </div>
            <div style={{ display: startLesson ? 'none' : 'flex' }} className="flex-col animate-[homeCards_1s_forwards]">
                <div className="bg-gray-100 mx-auto mt-15 w-80 py-5 h-fit rounded-3xl flex flex-col justify-between relative inset-shadow-[2px_2px_15px_rgb(0,0,0,0.2)]">
                    <div className=" absolute w-80 h-full inset-0 rounded-3xl inset-shadow-[-6px_-6px_10px_rgb(255,255,255,1)] z-0"></div>
                    <p onClick={() => setChoose(!choose)} style={{ display: choose ? 'none' : 'flex' }} className="z-1 cursor-pointer flex mx-auto w-80 justify-center text-2xl font-medium text-gray-300">Choose kanji list</p>
                    {choose ?
                        kanjiListArray.map((item, index) => {
                            return (
                                <div style={{ backgroundColor: lessonNum === index ? 'rgb(231,92,92,1)' : '' }} onClick={() => hendleLessonNum(index)} className="z-1 cursor-pointer hover:bg-[rgb(231,92,92,1)] hover:text-white flex w-full text-2xl text-gray-600 justify-center py-1" key={index}>
                                    {'Kanji ' + item.kanjiList}
                                </div>
                            )
                        }) :
                        null
                    }
                </div>
                <button style={{ backgroundColor: lessonNum > -1 ? '' : 'rgb(199, 199, 199)' }} disabled={lessonNum > -1 ? false : true} className="w-50 mt-10 bg-[rgb(231,92,92,1)] mx-auto shadow-md text-2xl p-4 rounded-4xl font-bold text-gray-700 relative">
                    <div onClick={() => startLessonFun()} className=" cursor-pointer absolute size-full -translate-x-4 -translate-y-4 rounded-4xl shadow-[-8px_-8px_8px_rgba(255,255,255,1)] "></div>
                    START
                </button>
            </div>
            <div style={{ display: startLesson ? '' : 'none' }} className="flex mx-auto mt-15 animate-[homeCards_1s_forwards]">
                <FlashCardsFunction lessonArray={kanjiListArray[choosed]?.kanjis} lessonUpdate={startLessonFun} />
            </div>
            <Footer />
        </div>
    )
}