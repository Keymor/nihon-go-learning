import Logo from "../components/logo"
import Header from "../components/header"
import Footer from "../components/footer";
import Loading from "../components/loading";
import { useEffect, useState } from "react"

interface wordsArray {
    id: Number;
    japaneseWord: string;
    english: string;
    ukrainian: string;
    englishMeaning: string;
    wordType: string;
    lesson: Number
}

interface mainArray {
    lesson: number;
    words: [wordsArray]
}

export default function Vocabulary() {

    const [loading, setLoading] = useState(false)
    const [search, setSearch] = useState('')
    const [vocab, setVocab] = useState<wordsArray[]>()

    // Set array with words.
    const addVocab = async () => {
        const token = localStorage.getItem('token')
        const req = await fetch(`${import.meta.env.VITE_API_URL}/vocabulary`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        const res = await req.json()
        let newArray: wordsArray[] = []
        res.forEach((item: mainArray) => {
            newArray = [...newArray, ...item.words]
        })
        setLoading(false)
        setVocab(newArray)
    }

    // Start getting array. 
    useEffect(() => {
        setLoading(true)
        addVocab()
    }, [])

    return (
        <div className="flex flex-col max-w-screen h-screen sm:min-h-screen relative">
            {loading ? <Loading /> : null}
            <div >
                <Logo />
            </div>
            <Header />
            <div className="flex flex-col mt-15 mx-auto animate-[homeCards_1s_forwards]">
                <h1 className="flex m-auto font-bold text-2xl sm:text-4xl text-gray-700">Vocabulary</h1>
            </div>
            <div className="flex w-70 bg-gray-100 min-w-fit flex-col mx-auto mt-15 relative py-2 rounded-2xl inset-shadow-[2px_2px_15px_rgb(0,0,0,0.2)]">
                <div className=" absolute size-full inset-0 rounded-2xl inset-shadow-[-6px_-6px_10px_rgb(255,255,255,1)] z-0" />
                <input placeholder="Search" className="z-1 text-center text-gray-400 text-xl font-bold mx-auto rounded-2xl w-full h-10 focus:outline-none" type="text" value={search} onChange={(e) => setSearch(e.target.value)} />
            </div>
            <div className="flex flex-wrap sm:max-w-320 justify-center gap-5 sm:gap-25 mx-auto py-20 w-full">
                {vocab?.map((item, index) => {
                    return (
                        <div
                            key={index}
                            style={{
                                animation: `homeCards ${0.1 + (index / 10)}s forwards`,
                                display: item.englishMeaning.includes(search) || item.japaneseWord.includes(search) ? '' : 'none'
                            }}
                            className="relative size-44 sm:size-50 p-4 shadow-lg rounded-4xl text-center">
                            <div
                                className=" inset-0 absolute size-full rounded-4xl shadow-[-8px_-8px_8px_rgba(255,255,255,1)]">
                            </div>
                            <div className="flex flex-col h-full gap-5">
                                <h1 className="flex mt-auto mx-auto font-bold text-3xl">{item.japaneseWord}</h1>
                                <h2 className="flex mb-auto mx-auto text-xl font-bold text-[rgb(231,92,92,1)]">{item.englishMeaning}</h2>
                            </div>
                        </div>
                    )
                })}
            </div>
            <Footer /> 
        </div>
    )
}