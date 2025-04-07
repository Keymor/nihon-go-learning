import Header from "../components/header"
import Logo from "../components/logo"
import { useEffect, useState } from "react"


export default function Home() {

    const [animation, setAnimation] = useState({ first: true, second: false })

    useEffect(() => {
        setTimeout(() => {
            setAnimation((a) => ({ ...a, first: false, second: true }))
        }, 1000)
    }, [])

    return (
        <div className="flex flex-col w-screen h-screen">
            <div style={{ display: animation.second ? 'flex' : 'none' }} className="animate-[homeCards_1s_forwards]">
                <Logo />
            </div>
            <Header />
            <div style={{ display: animation.second ? 'flex' : 'none' }} className="flex flex-col mt-30 animate-[homeCards_2s_forwards]">
                <h1 className="flex m-auto font-bold text-4xl text-gray-700">Welcome</h1>
                <p className="flex m-auto text-xl text-gray-500">Continue your journey to mastering Japanese</p></div>
            <div className="w-full h-[100%] flex flex-col">
                <div style={{ display: animation.first ? 'flex' : 'none' }} className=" animate-[logo_1s_forwards] m-auto flex bg-[url('/circle.png')] lg:w-[624px] lg:h-[660px] w-[250px] h-[310px] bg-cover bg-center">
                    <p className=" flex mx-auto mt-[41%] text-xl lg:text-4xl font-bold text-white text-shadow-lg">日本語学習</p>
                </div>
                <div className="flex flex-row mx-auto">
                    <div style={{ display: animation.second ? 'flex' : 'none' }} className="relative animate-[homeCards_0.5s_forwards] bg-[url('/homeButton1.jpg')] bg-center bg-no-repeat lg:w-[450px] lg:h-[666px] rounded-4xl shadow-xl flex flex-col scale-70">
                        <p className="m-auto font-bold text-7xl text-gray-700">25/100</p>
                        <p className="absolute bottom-10 left-1/2 -translate-x-1/2 text-2xl text-gray-700">Lessons complite</p>
                    </div>
                    <div style={{ display: animation.second ? 'flex' : 'none' }} className="relative animate-[homeCards_1s_forwards] bg-[url('/homeButton2.jpg')] bg-center bg-no-repeat lg:w-[450px] lg:h-[666px] rounded-4xl flex flex-col shadow-xl scale-70">
                        <p className="m-auto font-bold text-7xl text-gray-700">45/150</p>
                        <p className="absolute bottom-10 left-1/2 -translate-x-1/2 text-2xl text-gray-700">Mastered word</p>
                    </div>
                    <div style={{ display: animation.second ? 'flex' : 'none' }} className="relative animate-[homeCards_1.5s_forwards] bg-[url('/homeButton3.jpg')] bg-center bg-no-repeat lg:w-[450px] lg:h-[666px] rounded-4xl flex flex-col shadow-xl scale-70">
                        <p className="m-auto font-bold text-7xl text-gray-700">65/100</p>
                        <p className="absolute bottom-10 left-1/2 -translate-x-1/2 text-2xl text-gray-700">Kanji</p>
                    </div>
                </div>
            </div>
        </div>
    )
}