import { useState } from "react"

interface componentFun {
    setLogin: (userID: string) => void
}

const Login: React.FC<componentFun> = ({setLogin}) => {
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')

    const registerFun = async () => {
        try {
            const request = await fetch('http://192.168.1.38:3560/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: name, password: password })
            })
            const respond = await request.json()
            if (respond.succes) {
                window.alert('Secces!')
            } else {
                window.alert('This name is already exist')
            }
        } catch {

        }
    }

    const logInFun = async () => {
        try {
            const request = await fetch('http://192.168.1.38:3560/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: name, password: password })
            })
            const respond = await request.json()
            if (respond.succes) {
                setLogin(respond.userID)
            } else {
                window.alert('Wrong password or User Name')
            }
        } catch {

        }
    }

    return (
        <div className="w-full h-100 shadow-[8px_8px_8px_rgba(0,0,0,0.2)] rounded-4xl gap-0 flex flex-col justify-between px-10 py-15 relative">
            <div className=" absolute size-full inset-0 rounded-4xl shadow-[-8px_-8px_8px_rgba(255,255,255,1)]"></div>
            <div className="bg-gray-100 mx-auto w-full h-fit rounded-3xl flex flex-col justify-between relative inset-shadow-[2px_2px_15px_rgb(0,0,0,0.2)]">
                <div className=" absolute w-full h-full inset-0 rounded-3xl inset-shadow-[-6px_-6px_10px_rgb(255,255,255,1)] z-0"></div>
                <input onChange={(e) => { setName(e.target.value) }} placeholder="Name" value={name} type="text" className="z-1 rounded-3xl p-2 text-center cursor-pointer flex mx-auto w-full h-full justify-center text-2xl font-medium text-gray-600" />
            </div>
            <div className="bg-gray-100 mx-auto w-full h-fit rounded-3xl flex flex-col justify-between relative inset-shadow-[2px_2px_15px_rgb(0,0,0,0.2)]">
                <div className=" absolute w-full h-full inset-0 rounded-3xl inset-shadow-[-6px_-6px_10px_rgb(255,255,255,1)] z-0"></div>
                <input onChange={(e) => { setPassword(e.target.value) }} placeholder="Password" value={password} type="text" className="z-1 rounded-3xl p-2 text-center cursor-pointer flex mx-auto w-full h-full justify-center text-2xl font-medium text-gray-600" />
            </div>
            <div className="flex flex-col">
                <button onClick={registerFun} className="w-50 bg-[rgb(231,92,92,1)] m-auto shadow-md text-2xl p-4 rounded-4xl font-bold text-gray-700 relative">
                    <div className=" cursor-pointer absolute size-full -translate-x-4 -translate-y-4 rounded-4xl shadow-[-8px_-8px_8px_rgba(255,255,255,1)] "></div>
                    Register
                </button>
                <p className="flex m-auto z-1">Still don't have an accaunt? <a href="/cards" className="z-1 underline"> Register</a></p>
            </div>
            <div className="flex flex-col">
                <button onClick={logInFun} className="w-50 bg-[rgb(231,92,92,1)] m-auto shadow-md text-2xl p-4 rounded-4xl font-bold text-gray-700 relative">
                    <div className=" cursor-pointer absolute size-full -translate-x-4 -translate-y-4 rounded-4xl shadow-[-8px_-8px_8px_rgba(255,255,255,1)] "></div>
                    logIn
                </button>
                <p className="flex m-auto z-1">Still don't have an accaunt? <a href="/cards" className="z-1 underline"> Register</a></p>
            </div>
        </div>
    )
}

export default Login