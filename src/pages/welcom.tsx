import Logo from "../components/logo"

export default function Welcome() {
    return (
        <div className="flex flex-col w-screen h-screen sm:min-h-screen">
            <div className="animate-[logoUp_1s_forwards]">
                <Logo />
            </div>
            <div className="animate-[homeCards_1s_forwards] m-auto flex flex-col items-center">
                <h1 className="text-gray-700 font-bold text-4xl">  New to Japanese? </h1>
                <p className="text-gray-600">Create a free account and start learning step by step!</p>
                <button className="hover:scale-105 duration-200 bg-gray-200 hover:bg-[rgb(231,92,92,1)] mt-5 cursor-pointer w-50 shadow-md p-4 rounded-4xl font-bold text-gray-700 text-xl relative">
                    <a href="/home" className="size-full absolute inset-0 z-10"></a>
                    <div className=" absolute size-full -translate-x-4 -translate-y-4 rounded-4xl shadow-[-8px_-8px_8px_rgba(255,255,255,1)]"></div>
                    GET STARTED
                </button>
            </div>
        </div>
    )
}