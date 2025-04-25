import PlayButton from "./playButton"

export default function Header() {
    return (
        <div className='w-full mx-auto h-20 sm:min-h-28 flex flex-row'>
            <div className='m-10 my-auto flex sm:hidden'>
                <button className='border-1 border-black rounded-3xl p-3'>Side</button>
            </div>
            <div className='my-auto sm:ml-20 gap-5 hidden sm:flex'>
                <PlayButton link='/home' text='Home' />
                <PlayButton link='/lessons' text='Lessons' />
                <PlayButton link='/cards' text='Words' />
                <PlayButton link='/kanji' text='Kanji' />
                <PlayButton link='/vocabulary' text='Vocabulary' />
            </div>
            <div className='ml-auto my-auto mr-10 sm:mr-20'>
                <PlayButton link='/logout' text='Log out' />
            </div>
        </div>
    )
}