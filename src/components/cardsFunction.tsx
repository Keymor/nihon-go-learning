export default function CardsFunction() {
    return (
        <div className="w-150 h-100 shadow-lg rounded-4xl gap-5 flex flex-col justify-between px-10 py-15 relative">
            <div className=" absolute size-full -translate-x-10 -translate-y-15 rounded-4xl shadow-[-8px_-8px_8px_rgba(255,255,255,1)]"></div>
            <div>
                <div className="flex w-full">
                    <p className="flex">Repeat 0</p>
                    <p className="flex ml-auto">New words 0</p>
                </div>
                <div className="flex mt-5 w-full h-5 rounded-4xl inset-shadow-[0_4px_10px_rgb(0,0,0,0.2)]"></div>
            </div>
            <div className="flex">
                <p className="m-auto text-2xl font-bold">Japanese</p>
            </div>
            <div className="flex flex-row">
                <button className="w-50 shadow-md p-4 rounded-4xl font-bold text-gray-700 relative">
                    <div className="absolute size-full -translate-x-4 -translate-y-4 rounded-4xl shadow-[-8px_-8px_8px_rgba(255,255,255,1)]"></div>
                    REPEAT</button>
                <button className="w-50 ml-auto shadow-md p-4 rounded-4xl font-bold text-gray-700 relative">
                    <div className=" absolute size-full -translate-x-4 -translate-y-4 rounded-4xl shadow-[-8px_-8px_8px_rgba(255,255,255,1)]"></div>
                    CHECK</button>
            </div>
        </div>
    )
}