export default function Lesson2() {
    return (
        <div className="text-gray-700">
            <div className="flex flex-col gap-5 sm:flex-row justify-between font-bold text-xl sm:text-3xl">
                <h1 className="">これ・それ・あれ (This, That, That over there)</h1>
                <h1 className="text-[rgb(231,92,92,1)]">だい2か (Lesson 2)</h1>
            </div>
            <h2 className="mt-5 font-bold text-[rgb(231,92,92,1)]">1. かいわ (Conversation)</h2>
            <h3 className="mt-1 font-medium text-gray-700">👥 A & B talk about objects</h3>
            <div className="flex flex-col gap-1">
                <div><b>A:</b> これは なんですか？</div>
                <div><b>B:</b> それは ほんです。</div>
                <div><b>A:</b> あれは なんですか？</div>
                <div><b>B:</b> あれは わたしの じしょです。</div>
            </div>
            <h2 className="mt-10 font-bold text-[rgb(231,92,92,1)]">2. ぶんぽう (Grammar)</h2>
            <p className="text-xl font-bold inline mt-1">①</p><b> これ / それ / あれ (This / That / That over there) </b>Used to refer to objects based on their location.
            <p>
                <b>📌 Examples: </b>
                これは ほんです。 (This is a book.)
                それは かぎです。 (That is a key.)
                あれは じしょです。 (That over there is a dictionary.)
            </p><br />
            <p className="text-xl font-bold inline">②</p><b> この / その / あの + Noun (This / That / That over there + Noun) </b>Used when a noun follows the demonstrative.
            <p>
                <b>📌 Examples: </b>
                この ほんは わたしのです。 (This book is mine.)
                その かぎは たなかさんのですか？ (Is that key Tanaka-san’s?)
                あの じしょは たかいです。 (That dictionary over there is expensive.)
            </p><br />
            <p className="text-xl font-bold inline">③</p><b> なん / なに (What) </b>Used to ask for information about an object.
            <p>
                <b>📌 Examples: </b>
                これは なんですか？ (What is this?)
                それは なんの ざっしですか？ (What kind of magazine is that?)
            </p>
        </div>
    )
}
