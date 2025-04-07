import PlayButton from "./playButton"

export default function Header() {
    return (
        <div className='w-full mx-auto h-30 flex flex-row'>
            <div className='m-10 my-auto flex sm:hidden'>
                <button className='border-1 border-black rounded-3xl p-3'>Side</button>
            </div>
            <div className='my-auto sm:ml-20 gap-5 hidden sm:flex'>
                <PlayButton link='/' text='Home' />
                <PlayButton link='/lessons' text='Lessons' />
                <PlayButton link='/cards' text='Cards' />
                <PlayButton link='/vocabulary' text='Vocabulary' />
            </div>
            <div className='ml-auto my-auto mr-20'>
                <PlayButton link='/user' text='User name' />
            </div>
        </div>
    )
}