import Header from "../components/header"
import Logo from "../components/logo"
import { useEffect, useState } from "react"


interface UserParam {
    lessons: number,
    words: number,
    kanji: number
}

export default function Home() {
    const [userScore, setUserScore] = useState<UserParam>({
        lessons: 0,
        words: 0,
        kanji: 0
    })
    const [animation, setAnimation] = useState({ first: true, second: false })

    useEffect(() => {
        const updateScore = async () => {
            const req = await fetch('http://localhost:3560/user/data', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id: '67f6133b390fe7af1b547c45' })
            })
            const res = await req.json()
            setUserScore((u) => ({...u, lessons: res.lessons, words: res.words, kanji: res.kanji}))
        }
        updateScore()
    }, [])

    useEffect(() => {
        setTimeout(() => {
            setAnimation((a) => ({ ...a, first: false, second: true }))
        }, 1000)
    }, [])

    return (
        <div className="flex flex-col w-screen min-h-screen">
            <div style={{ display: animation.second ? '' : 'none' }} className="animate-[homeCards_1s_forwards]">
                <Logo />
            </div>
            <Header />
            <div style={{ display: animation.second ? '' : 'none' }} className="flex flex-col mt-15 animate-[homeCards_2s_forwards]">
                <h1 className="flex m-auto font-bold text-4xl text-gray-700">Welcome</h1>
                <p className="flex m-auto text-xl text-gray-500">Continue your journey to mastering Japanese</p>
            </div>
            <div className="w-full flex flex-col">
                <div style={{ display: animation.first ? '' : 'none' }} className=" animate-[logo_1s_ease-in_forwards] m-auto mt-20 flex bg-[url('/circle.png')] lg:w-[624px] lg:h-[660px] w-[250px] h-[310px] bg-cover bg-center">
                    <p className=" flex mx-auto mt-[41%] text-xl lg:text-4xl font-bold text-white text-shadow-lg">日本語学習</p>
                </div>
                <div className="flex flex-row mt-15 mx-auto gap-30">
                    <div style={{ display: animation.second ? '' : 'none' }} className="relative animate-[homeCards_0.5s_forwards] bg-[url('/homeButton1.jpg')] bg-cover bg-no-repeat lg:w-80 lg:h-115 rounded-4xl shadow-xl flex flex-col">
                        <p className="m-auto font-bold text-6xl text-gray-700">{userScore.lessons}/100</p>
                        <p className="absolute bottom-10 left-1/2 -translate-x-1/2 text-2xl text-gray-700 whitespace-nowrap">Lessons complite</p>
                    </div>
                    <div style={{ display: animation.second ? '' : 'none' }} className="relative animate-[homeCards_1s_forwards] bg-[url('/homeButton2.jpg')] bg-cover bg-no-repeat lg:w-80 lg:h-115 rounded-4xl flex flex-col shadow-xl">
                        <p className="m-auto font-bold text-6xl text-gray-700">{userScore.words}/150</p>
                        <p className="absolute bottom-10 left-1/2 -translate-x-1/2 text-2xl text-gray-700 whitespace-nowrap">Mastered words</p>
                    </div>
                    <div style={{ display: animation.second ? '' : 'none' }} className="relative animate-[homeCards_1.5s_forwards] bg-[url('/homeButton3.jpg')] bg-cover bg-no-repeat lg:w-80 lg:h-115 rounded-4xl flex flex-col shadow-xl">
                        <p className="m-auto font-bold text-6xl text-gray-700">{userScore.kanji}/100</p>
                        <p className="absolute bottom-10 left-1/2 -translate-x-1/2 text-2xl text-gray-700">Kanji</p>
                    </div>
                </div>
            </div>
        </div>
    )
}