import { useEffect, useState } from "react"

interface Word {
    id: Number;
    japaneseWord: string;
    english: string;
    ukrainian: string;
    englishMeaning: string;
    wordType: string;
    lesson: Number
}

interface CardsFunctionProps {
    wordsArray: Word[];
}

const CardsFunction: React.FC<CardsFunctionProps> = ({ wordsArray }) => {
    const [clickButton, setClickButton] = useState(false)
    const [workArray, setWorkArray] = useState<Word[]>([{
        id: 0,
        japaneseWord: '',
        english: '',
        ukrainian: '',
        englishMeaning: '',
        wordType: '',
        lesson: 0
    }])
    const [repeatArray, setRepeateArray] = useState<Word[]>([])
    const [display, setDisplay] = useState({
        japanese: '',
        english: '',
        ukrainian: ''
    })
    const [finish, setFinish] = useState(false)

    const arrayUpdate = (newArray: Word[]) => {
        setDisplay((d) => ({
            ...d,
            japanese: newArray[0].japaneseWord,
            english: newArray[0].englishMeaning,
            ukrainian: newArray[0].ukrainian
        }))
    }

    const cardsNext = () => {
        if (
            workArray.length === 1 && repeatArray.length === 0 ||
            workArray.length === 0 && repeatArray.length === 1
        ) {
            setFinish(true)
            setDisplay((d) => ({ ...d, japanese: 'DONE!', english: '', ukrainian: '' }))
        } else if (workArray.length === 0 && repeatArray.length > 0 && clickButton) {
            let newArray = repeatArray.slice(1)
            arrayUpdate(newArray)
            setRepeateArray(newArray)
            setClickButton(!clickButton)
        } else if (clickButton) {
            let newArray = workArray.slice(1)
            setWorkArray(newArray)
            arrayUpdate(newArray)

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

            arrayUpdate(finalArray)
            setRepeateArray(finalArray)
        } else if (workArray.length != 0) {
            let newArray = workArray.slice(1)
            setRepeateArray((r) => ([...r, workArray[0]]))
            arrayUpdate(newArray)
            setWorkArray(newArray)
        } else {
            let newArray = repeatArray.slice(1)
            arrayUpdate(newArray)
            setRepeateArray(newArray)
        }
    }

    useEffect(() => {
        setWorkArray(wordsArray)
        arrayUpdate(wordsArray)
    }, [wordsArray])

    return (
        <div className="w-150 h-100 shadow-lg rounded-4xl gap-5 flex flex-col justify-between px-10 py-15 relative">
            <div className=" absolute size-full -translate-x-10 -translate-y-15 rounded-4xl shadow-[-8px_-8px_8px_rgba(255,255,255,1)]"></div>
            <div style={{ display: finish ? 'none' : '' }}>
                <div className="flex w-full">
                    <p className="flex">Repeat {repeatArray.length}</p>
                    <p className="flex ml-auto">New words {workArray.length}</p>
                </div>
                <div className="flex mt-5 w-full h-5 rounded-4xl inset-shadow-[0_4px_10px_rgb(0,0,0,0.2)]"></div>
            </div>
            <div className="flex my-auto">
                <p className="m-auto text-2xl font-bold">
                    {display.japanese}
                    {display.english}
                    {display.ukrainian}
                </p>
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
        </div>
    )
}

export default CardsFunction