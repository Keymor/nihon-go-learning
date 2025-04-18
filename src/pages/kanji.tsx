import Logo from "../components/logo"
import Header from "../components/header"
import { use, useEffect, useState } from "react"

interface Kanji {
    id: number,
    kanji: string,
    english: string,
    ukrainian: string
}

export default function Kanji() {
    const [knajiList, setKanjiList] = useState<Kanji[]>()
    const [kanjiLesson, setKanjiLesson] = useState()

    useEffect(() => {
        const token = localStorage.getItem('token')
        const getLessons = async () => {
            const req = await fetch('http://localhost:3560/kanji/list', {
                method: 'GET',
                headers: { 'Authorization': `Bearer ${token}` }
            }
            )
            const res = await req.json()
            console.log(res)
        }
        getLessons()
    }, [])

    return (
        <div className="flex flex-col w-screen h-screen">
            <div >
                <Logo />
            </div>
            <Header />
            <div className="flex flex-col mt-15 mx-auto animate-[homeCards_1s_forwards]">
                <h1 className="flex m-auto font-bold text-4xl text-gray-700">Welcome</h1>
                <p className="flex m-auto text-xl text-gray-500">Continue your journey to mastering Japanese</p>
            </div>
        </div>
    )
}