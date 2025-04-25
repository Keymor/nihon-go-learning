import { useEffect, useState } from "react"

interface Word {
    id: Number;
    japaneseWord: string;
    english?: string;
    ukrainian: string;
    englishMeaning: string;
    wordType?: string;
    lesson: number
}

interface CardsFunctionProps {
    lessonArray: Word[] | Kanji[];
    lessonUpdate: () => void
}

interface Kanji {
    id: number,
    japaneseWord: string,
    englishMeaning: string,
    ukrainian: string,
    lesson: number
}

const FlashCardsFunction: React.FC<CardsFunctionProps> = ({ lessonArray, lessonUpdate }) => {
    const [lessonType, setLessonType] = useState('')
    const [clickButton, setClickButton] = useState(false)
    const [workArray, setWorkArray] = useState<Word[] | Kanji[]>([
        {
            id: 0,
            japaneseWord: '',
            english: '',
            ukrainian: '',
            englishMeaning: '',
            wordType: '',
            lesson: 0
        }
    ])
    const [repeatArray, setRepeateArray] = useState<Word[]>([])
    const [finish, setFinish] = useState(false)

    const cardsNext = () => {
        if (workArray.length === 0 && repeatArray.length > 0 && clickButton) {
            let newArray = repeatArray.slice(1)
            setRepeateArray(newArray)
            setClickButton(!clickButton)
        } else if (clickButton) {
            let newArray = workArray.slice(1)
            setWorkArray(newArray)

            setClickButton(!clickButton)
        } else {
            setClickButton(!clickButton)
        }
    }

    const repeatWords = () => {
        if (workArray.length === 0) {
            let newArray = repeatArray
            let firstElement = newArray.shift()
            let finalArray = [...newArray, firstElement!]
            setRepeateArray(finalArray)
            setClickButton(false)
        } else if (workArray.length != 0) {
            let newArray = workArray.slice(1)
            setRepeateArray((r) => ([...r, workArray[0]]))
            setWorkArray(newArray)
            setClickButton(false)
        } else {
            let newArray = repeatArray.slice(1)
            setRepeateArray(newArray)
            setClickButton(false)
        }
    }

    const displayWords = () => {
        return (
            <div className="m-auto flex flex-col">
                <p className="mx-auto text-3xl font-bold text-gray-700">
                    {workArray.length === 0 ? '' : workArray[0].japaneseWord}
                    {repeatArray.length > 0 && workArray.length === 0 ? repeatArray[0].japaneseWord : ''}
                    {repeatArray.length === 0 && workArray.length === 0 ? 'Congratulations' : ''}
                </p>
                <p style={{ visibility: clickButton ? 'visible' : 'hidden' }} className="mx-auto mt-4 text-xl font-bold text-[rgb(231,92,92,1)]">
                    {workArray.length === 0 ? '' : workArray[0].englishMeaning}
                    {repeatArray.length > 0 && workArray.length === 0 ? repeatArray[0].englishMeaning : ''}
                </p>
                <p style={{ display: repeatArray.length === 0 && workArray.length === 0 ? '' : 'none' }} className="mx-auto mt-4 text-xl font-bold text-gray-600">
                    You did it!
                </p>
            </div>
        )
    }

    const reloadFun = () => {

        const userUpdate = async (lessonNum: number) => {
            const token = localStorage.getItem('token')
            const req = await fetch(`/userdata`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            })

            const res = await req.json()

            switch (lessonType) {
                case 'words':

                    if (!res.completLessonsWords.includes(`lesson${lessonNum}`)) {
                        const lessonNumber = 'lesson' + lessonNum
                        await fetch(`/user/data/updatewords`, {
                            method: 'POST',
                            headers: {
                                'Authorization': `Bearer ${token}`,
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({ words: res.words + 10, completLessonsWords: lessonNumber })
                        })
                    }

                    break;

                case 'kanji':

                    if (!res.completLessonsKanji.includes(`lesson${lessonNum}`)) {
                        const lessonNumber = 'lesson' + lessonNum
                        await fetch(`/user/data/updatekanji`, {
                            method: 'POST',
                            headers: {
                                'Authorization': `Bearer ${token}`,
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({ kanji: res.kanji + 10, completLessonsKanji: lessonNumber })
                        })
                    }

                    break

                default:
                    break;
            }
        }

        switch (lessonType) {
            case 'words':
                userUpdate(lessonArray[0].lesson)
                break;

            case 'kanji':
                userUpdate(lessonArray[0].lesson)
                break;
            default:
                break;
        }
        lessonUpdate()
        setFinish(false)
    }

    useEffect(() => {
        if (!lessonArray) {
            console.log(undefined)
        } else {
            if ('wordType' in lessonArray[0]) {
                setLessonType('words')
            } else {
                setLessonType('kanji')
            }
        }
        setWorkArray(lessonArray)
    }, [lessonArray])

    useEffect(() => {
        if (repeatArray.length === 0 && workArray.length === 0) {
            setFinish(true)
        }
    }, [workArray, repeatArray])

    return (
        <div className="w-150 h-100 shadow-lg rounded-4xl gap-5 flex flex-col justify-between px-10 py-15 relative">
            <div className=" absolute size-full -translate-x-10 -translate-y-15 rounded-4xl shadow-[-8px_-8px_8px_rgba(255,255,255,1)]"></div>
            <div style={{ display: finish ? 'none' : '' }}>
                <div className="flex w-full">
                    <p className="flex">Repeat {repeatArray.length}</p>
                    <p className="flex ml-auto">New words {workArray?.length}</p>
                </div>
                <div className=" relative flex mt-5 w-full h-5 rounded-4xl inset-shadow-[0_4px_10px_rgb(0,0,0,0.2)] animate-[homeCards_1s_forwards]">
                    <div style={{
                        width: `${(10 - (workArray?.length + repeatArray.length)) * 10}%`
                    }}
                        className=" bg-[rgb(231,92,92,1)] inset-0 absolute h-5 rounded-4xl z-1 duration-200"></div>
                </div>
            </div>
            <div className="flex my-auto">
                {displayWords()}
            </div>
            <div style={{ display: finish ? 'none' : '' }} className="flex flex-row">
                <button className="hover:bg-gray-700 hover:text-[rgb(231,92,92,1)] cursor-pointer w-50 shadow-md p-4 rounded-4xl font-bold text-gray-700 relative"
                    disabled={repeatArray.length === 0 && workArray.length === 0 ? true : false}>
                    <div onClick={repeatWords} className="absolute size-full -translate-x-4 -translate-y-4 rounded-4xl shadow-[-8px_-8px_8px_rgba(255,255,255,1)]"></div>
                    REPEAT</button>
                <button onClick={cardsNext} className="hover:bg-[rgb(231,92,92,1)] cursor-pointer w-50 ml-auto shadow-md p-4 rounded-4xl font-bold text-gray-700 relative">
                    <div className=" absolute size-full -translate-x-4 -translate-y-4 rounded-4xl shadow-[-8px_-8px_8px_rgba(255,255,255,1)]"></div>
                    {clickButton ? 'NEXT' : 'CHECK'}
                </button>
            </div>
            <button style={{ display: finish ? '' : "none" }}
                className="hover:bg-[rgb(231,92,92,1)] cursor-pointer w-50 m-auto shadow-md p-4 rounded-4xl font-bold text-gray-700 relative z-2"
                onClick={reloadFun}
            >
                <div className="absolute size-full -translate-x-4 -translate-y-4 rounded-4xl shadow-[-8px_-8px_8px_rgba(255,255,255,1)]"></div>
                Go back</button>
        </div>
    )
}

export default FlashCardsFunction