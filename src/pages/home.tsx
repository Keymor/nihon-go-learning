import Header from "../components/header"
import Logo from "../components/logo"
import Login from "../components/login"
import Footer from "../components/footer"
import { useEffect, useState } from "react"

//end of cards logo ?
//logo shift ?
//red cercle dissapear to quikly ?
//clean code

//loadin regitration


interface UserParam {
    lessons: number,
    words: number,
    kanji: number,
    username: string
}

export default function Home() {
    const [loginCheck, setLoginCheck] = useState(false)
    const [userScore, setUserScore] = useState<UserParam>({
        lessons: 0,
        words: 0,
        kanji: 0,
        username: ''
    })
    const [animation, setAnimation] = useState({ first: true, second: false })

    // Reload page after log in.
    const hendleLogin = () => {
        updateScore()
        window.location.reload()
    }

    // Checking if user verifyed. If isn't, return log in box. Secon anim need for animation play.
    const logInFun = () => {
        if (loginCheck === false && animation.second === true) {
            return (
                <div className=" animate-[homeCards_1s_forwards] flex m-auto">
                    <Login setLogin={hendleLogin} />
                </div>
            )
        }
    }

    // Checking user token and update scors on the main screen like words and kanji.
    const updateScore = async () => {
        const token = localStorage.getItem('token')
        await fetch(`${import.meta.env.VITE_API_URL}/userdata`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(res => res.json())
            .then(data => {
                setLoginCheck(true)
                setUserScore((u) => ({ ...u, lessons: data.lessons, words: data.words, kanji: data.kanji, username: data.name }))
            })
    }

    // Running update scors and dilay state for correct playing animation.
    useEffect(() => {
        setTimeout(() => {
            setAnimation((a) => ({ ...a, first: false, second: true }))
        }, 1000)
        updateScore()
    }, [])

    return (
        <div className="flex flex-col w-screen h-screen sm:min-h-screen">
            <div style={{ display: animation.second ? '' : 'none' }} className="animate-[homeCards_1s_forwards] hidden sm:block">
                <Logo />
            </div>
            <div style={{ display: loginCheck && animation.second ? '' : 'none' }} className="animate-[logoUp_1s_forwards] z-50 sm:z-0">
                <Header />
            </div>
            <div className="h-full flex flex-col gap-10 sm:gap-20 sm:m-auto">
                <div style={{ display: animation.second && loginCheck ? '' : 'none' }} className="flex flex-col mt-15 mx-auto animate-[homeCards_2s_forwards]">
                    <h1 className="flex mx-auto font-bold text-2xl sm:text-4xl text-gray-700">Welcome, {userScore.username}</h1>
                    <p className="flex mx-auto text-lg sm:text-xl text-gray-500">Continue your journey to mastering Japanese</p>
                </div>
                <div className=" min-h-full min-w-full mx-auto flex flex-col">
                    {/* Main big animated logo. */}
                    <div style={{ display: animation.first ? '' : 'none' }} className=" animate-[logo_1s_ease-in_forwards] m-auto translate-y-10 flex bg-[url('/circle.png')] lg:w-[624px] lg:h-[660px] w-[250px] h-[310px] bg-cover bg-center">
                        <p className=" flex mx-auto mt-[37%] text-xl lg:text-4xl font-bold text-white text-shadow-lg">日本語学習</p>
                    </div>
                    {logInFun()}
                    {/* Three main box with words, kanji and lessons. */}
                    <div style={{ display: loginCheck ? '' : 'none' }} className="w-full flex flex-col sm:flex-row mx-auto gap-3 sm:gap-30">
                        <div style={{ display: animation.second ? '' : 'none' }} className="relative animate-[homeCards_0.5s_forwards] bg-[url('/homeMobile3.jpg')] sm:bg-[url('/homeButton1.jpg')] bg-cover bg-no-repeat h-55 w-2/5 mx-auto lg:w-80 lg:h-115 rounded-4xl shadow-xl flex flex-col">
                            <p className="m-auto font-bold text-4xl sm:text-6xl text-gray-700">{userScore.lessons}/10</p>
                            <p className="absolute bottom-10 left-1/2 -translate-x-1/2 text-md sm:text-2xl text-gray-700 whitespace-nowrap">Lessons complite</p>
                        </div>
                        <div style={{ display: animation.second ? '' : 'none' }} className="relative animate-[homeCards_1s_forwards] bg-[url('/homeMobile1.jpg')] sm:bg-[url('/homeButton2.jpg')] bg-cover bg-no-repeat h-55 w-2/5 mx-auto lg:w-80 lg:h-115 rounded-4xl flex flex-col shadow-xl">
                            <p className="m-auto font-bold text-4xl sm:text-6xl text-gray-700">{userScore.words}/100</p>
                            <p className="absolute bottom-10 left-1/2 -translate-x-1/2 text-md sm:text-2xl text-gray-700 whitespace-nowrap">Mastered words</p>
                        </div>
                        <div style={{ display: animation.second ? '' : 'none' }} className="relative animate-[homeCards_1.5s_forwards] bg-[url('/homeMobile2.jpg')] sm:bg-[url('/homeButton3.jpg')] bg-cover bg-no-repeat h-55 w-2/5 mx-auto lg:w-80 lg:h-115 rounded-4xl flex flex-col shadow-xl">
                            <p className="m-auto font-bold text-4xl sm:text-6xl text-gray-700">{userScore.kanji}/100</p>
                            <p className="absolute bottom-10 left-1/2 -translate-x-1/2 text-md sm:text-2xl text-gray-700">Kanji</p>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}