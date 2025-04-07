import Header from "../components/header"
import Logo from "../components/logo"
import CardsFunction from "../components/cardsFunction"
import { useState } from "react"

export default function Cards() {
    const [startLesson, setStartLesson] = useState(false)
    const [choose, setChoose] = useState(false)

    const lessonsArray: string[] = ['Lesson 1', 'Lesson 2', 'Lesson 3', 'Lesson 4']


    const setLesson = () => {
        setStartLesson(true)
    }

    return (
        <div className="flex flex-col w-screen h-screen">
            <div >
                <Logo />
            </div>
            <Header />
            <div className="flex flex-col mt-30 mx-auto animate-[homeCards_1s_forwards]">
                <h1 className="flex m-auto font-bold text-4xl text-gray-700">Welcome</h1>
                <p className="flex m-auto text-xl text-gray-500">Continue your journey to mastering Japanese</p>
            </div>
            <div style={{ display: startLesson ? 'none' : 'flex' }} className="flex-col animate-[homeCards_1s_forwards]">
                <div className="bg-gray-100 mx-auto mt-30 w-80 py-5 h-fit rounded-3xl flex flex-col justify-between relative inset-shadow-[0_4px_10px_rgb(0,0,0,0.2)]">
                    <p onClick={() => setChoose(!choose)} style={{display: choose ? 'none' : 'flex'}} className=" cursor-pointer flex mx-auto w-80 justify-center text-2xl font-bold text-gray-400">Choose lesson</p>
                    {choose ?
                        lessonsArray.map((item, index) => {
                            return (
                                <div className=" hover:bg-[rgb(231,92,92,1)] hover:text-white flex w-full text-2xl text-gray-600 justify-center py-1" key={index}>{item}</div>
                            )
                        }) :
                        null
                    }
                </div>
                <button className="w-50 mt-10 bg-[rgb(231,92,92,1)] mx-auto shadow-md text-2xl p-4 rounded-4xl font-bold text-gray-700 relative">
                    <div onClick={setLesson} className=" cursor-pointer absolute size-full -translate-x-4 -translate-y-4 rounded-4xl shadow-[-8px_-8px_8px_rgba(255,255,255,1)] "></div>
                    START
                </button>
            </div>
            <div style={{ display: startLesson ? 'flex' : 'none' }} className="flex mx-auto mt-30 animate-[homeCards_1s_forwards]">
                <CardsFunction />
            </div>
        </div>
    )
}