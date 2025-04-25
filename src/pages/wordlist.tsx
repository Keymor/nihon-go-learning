import { useState } from "react"
import '../App.css'

//put a value of choise lesson

interface wordsArray {
    id: Number;
    japaneseWord: String;
    english: String;
    ukrainian: String;
    englishMeaning: String;
    wordType: String;
    lesson: Number
}

export default function WordList() {
    const [words, setWords] = useState<wordsArray[]>()
    const [index, setIndex] = useState(Number)

    const wordListGet = async () => {
        try {
            await fetch(`cards/words`)
                .then(res => res.json())
                .then(data => setWords(data[0].words))
        } catch {
            (err: string) => console.log(err)
        }
    }

    const nextWord = () => {
        if (index === 9) {
            setIndex(0)
        } else {
            setIndex(index + 1)
        }
    }

    const addWords = async (lessonNum: number) => {
        try {
            const res = await fetch(`cards/lesson`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ lesson: lessonNum })
            })
            const responde = await res.json()
            setWords(responde[0].words)
        } catch {
            (err: string) => console.log(err)
        }
    }

    return (
        <div className="flex flex-col mt-10 gap-10">
            <h1 className="mx-auto w-40 h-20 rounded-md bg-gray-400 flex">
                <p className="m-auto">Word list</p>
            </h1>
            <p className="mx-auto">
                New word: <br />
                {words && words[index] && words[index].japaneseWord}<br />
                {words && words[index] && words[index].english}<br />
                {words && words[index] && words[index].englishMeaning}
            </p>
            <div className="flex flex-row gap-10 mx-auto">
                <button className="flex bg-gray-600 p-2 rounded-sm text-white" onClick={wordListGet}>Show Words</button>
                <button className="flex bg-gray-600 p-2 rounded-sm text-white" onClick={nextWord}>Next</button>
                <button className="flex bg-gray-600 p-2 rounded-sm text-white" onClick={() => addWords(1)}>lesson 1</button>
                <button className="flex bg-gray-600 p-2 rounded-sm text-white" onClick={() => addWords(2)}>lesson 2</button>
            </div>
        </div>
    )
}