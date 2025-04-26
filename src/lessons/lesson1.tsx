export default function Lesson1() {
    return (
        <div className="text-gray-700">
            <div className="flex flex-col gap-5 sm:flex-row justify-between font-bold text-3xl">
                <h1 className="">はじめまして (Nice to meet you) </h1>
                <h1 className="text-[rgb(231,92,92,1)]">だい1か (Lesson 1)</h1>
            </div>
            <h2 className="mt-5 font-bold text-[rgb(231,92,92,1)]">1. かいわ (Conversation)</h2>
            <h3 className="mt-1 font-medium text-gray-700">👥 A & B introduce themselves</h3>
            <div className="flex flex-row">
                <b>A:</b> はじめまして。マイク・ミラーです。アメリカからきました。よろしくおねがいします。<br />
                <b>B:</b> はじめまして。たなかです。にほんじんです。よろしくおねがいします。
            </div>
            <h2 className="mt-10 font-bold text-[rgb(231,92,92,1)]">2. ぶんぽう (Grammar)</h2>
            <p className="text-xl font-bold inline mt-1">①</p><b> A は B です (A is B) </b>This is a basic sentence pattern used for introducing yourself.
            <p>
                <b>📌 Examples: </b>
                わたしは マイク・ミラー です。 (I am Mike Miller.)
                たなかさんは にほんじん です。 (Tanaka-san is Japanese.)
            </p><br />
            <p className="text-xl font-bold inline">②</p><b> A は B じゃありません (A is not B) </b>
            <p className="inline">
                Used to negate a sentence.
                📌 Examples:
                わたしは がくせいじゃありません。 (I am not a student.)
                ミラーさんは せんせいじゃありません。 (Miller-san is not a teacher.)
            </p><br />
            <br />
            <p className="text-xl font-bold inline">③</p><b> A は B ですか？ (Is A B?)</b> Used to ask a question.
            <p>
                <b>📌 Examples: </b>
                あなたは がくせいですか？ (Are you a student?) → はい、がくせいです / いいえ、がくせいじゃありません
                ミラーさんは せんせいですか？ (Is Miller-san a teacher?)
            </p>
        </div>
    )
}