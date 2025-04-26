import { useState } from "react"
import Logo from "./logo"
import PlayButton from "./playButton"

export default function Header() {
    const [clicked, setClicked] = useState(false)

    return (
        <div className='w-full mx-auto h-20 sm:min-h-28 flex flex-row relative'>
            <div style={{ transform: clicked ? 'translateX(0%)' : 'translateX(-110%)' }} className="z-32 absolute duration-800 h-screen w-[100%] rounded-4xl shadow-2xl">
                <div id="menu-container" className="size-full flex flex-col">
                    <Logo />
                    <div className="w-50 h-80 m-auto flex-col flex gap-2 z-1">
                        <PlayButton link='/home' text='Home' />
                        <PlayButton link='/lessons' text='Lessons' />
                        <PlayButton link='/vocabulary' text='Vocabulary' />
                        <PlayButton link='/cards' text='Words' />
                        <PlayButton link='/kanji' text='Kanji' />
                        <div className="mt-10 text-center">
                            <PlayButton link='/logout' text='Log out' />
                        </div>
                    </div>
                    <button className="size-full absolute inset-0 z-0" onClick={() => setClicked(!clicked)} />
                </div>
            </div>
            <div className=' p-5 w-full flex sm:hidden mt-5'>
                <button onClick={() => setClicked(!clicked)} className=' h-6 w-10 bg-cover border-black bg-[url("/menu.png")] animate-[homeCards_1s_forwards]'></button>
            </div>
            <div className='my-auto sm:ml-20 gap-5 hidden sm:flex'>
                <PlayButton link='/home' text='Home' />
                <PlayButton link='/lessons' text='Lessons' />
                <PlayButton link='/cards' text='Words' />
                <PlayButton link='/kanji' text='Kanji' />
                <PlayButton link='/vocabulary' text='Vocabulary' />
            </div>
            <div className='ml-auto my-auto mr-10 hidden sm:block sm:mr-20'>
                <PlayButton link='/logout' text='Log out' />
            </div>
        </div>
    )
}