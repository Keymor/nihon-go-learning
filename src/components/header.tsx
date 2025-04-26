import { useState } from "react"
import Logo from "./logo"
import PlayButton from "./playButton"

export default function Header() {
    const [clicked, setClicked] = useState(false)
    return (
        <div className='w-full mx-auto h-20 sm:min-h-28 flex flex-row'>
            <div popover="" id="menu" className="h-full w-[110%] rounded-4xl bg-white animate-[slide_0.8s_forwards] shadow-2xl">
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
                    <button popoverTargetAction="hide" popoverTarget="menu" className="size-full absolute inset-0 z-0" onClick={() => console.log('clicked')} />
                </div>
            </div>
            <div className='p-4 m-10 my-auto flex sm:hidden'>
                <button popoverTargetAction="show" popoverTarget="menu" className='border-1 border-black rounded-3xl p-3'>Side</button>
            </div>
            <div className='my-auto sm:ml-20 gap-5 hidden sm:flex'>
                <PlayButton link='/home' text='Home' />
                <PlayButton link='/lessons' text='Lessons' />
                <PlayButton link='/cards' text='Words' />
                <PlayButton link='/kanji' text='Kanji' />
                <PlayButton link='/vocabulary' text='Vocabulary' />
            </div>
            <div className='ml-auto my-auto mr-10 hidden sm:mr-20'>
                <PlayButton link='/logout' text='Log out' />
            </div>
        </div>
    )
}