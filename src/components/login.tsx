import { useEffect, useState } from "react"

interface componentFun {
    setLogin: () => void
}

const Login: React.FC<componentFun> = ({ setLogin }) => {
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [secondPass, setSeccondPass] = useState('')
    const [checkErr, setCheckErr] = useState(true)
    const [checkText, setCheckText] = useState(false)
    const [registration, setRegistration] = useState(false)
    const [fade, setFade] = useState(false)

    const registerFun = async () => {
        try {
            const request = await fetch('http://localhost:3560/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: name, password: password })
            })
            const respond = await request.json()
            if (respond.succes) {
                localStorage.setItem('token', respond.token)
                setLogin()
                console.log(respond)
            } else {
                window.alert('This name is already exist')
            }
        } catch {

        }
    }

    const logInFun = async () => {
        try {
            const request = await fetch('http://localhost:3560/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: name, password: password })
            })
            const respond = await request.json()
            if (respond.succes) {
                localStorage.setItem('token', respond.token)
                setLogin()
            } else {
                window.alert('Wrong password or User Name')
            }
        } catch {
            console.log('err from log in fun')
        }
    }

    useEffect(() => {
        if (fade) {
            setTimeout(() => {
                setRegistration(!registration)
                setFade(false)
            }, 300)
        }
    }, [fade])

    useEffect(() => {
        if (password.length === 0 && secondPass.length === 0) {
            setCheckErr(true)
        }
        else if (password === secondPass) {
            setCheckErr(false)
            setCheckText(false)
        } else {
            setCheckErr(true)
            setCheckText(true)
        }
    }, [password, secondPass])

    return (
        <div style={{ transition: '0.3s', opacity: fade ? '0%' : '100%' }} className=" opacity-0 w-full min-h-fit h-100 shadow-[8px_8px_8px_rgba(0,0,0,0.2)] rounded-4xl gap-5 flex flex-col justify-between px-10 py-15 relative">
            <div className=" absolute size-full inset-0 rounded-4xl shadow-[-8px_-8px_8px_rgba(255,255,255,1)]"></div>
            <div className="bg-gray-100 mx-auto w-full min-h-fit h-15 rounded-3xl flex flex-col justify-between relative inset-shadow-[2px_2px_15px_rgb(0,0,0,0.2)]">
                <div className=" absolute w-full h-full inset-0 rounded-3xl inset-shadow-[-6px_-6px_10px_rgb(255,255,255,1)] z-0"></div>
                <input onChange={(e) => { setName(e.target.value) }} placeholder="Name" value={name} type="text" className="z-1 rounded-3xl p-2 text-center cursor-pointer flex mx-auto w-full h-full justify-center text-2xl font-medium text-gray-600" />
            </div>
            <p style={{ display: checkText && registration ? '' : 'none' }} className="text-red-600 text-center">Make sure your passwords match</p>
            <div className="bg-gray-100 mx-auto w-full min-h-fit h-15 rounded-3xl flex flex-col justify-between relative inset-shadow-[2px_2px_15px_rgb(0,0,0,0.2)]">
                <div className=" absolute w-full h-full inset-0 rounded-3xl inset-shadow-[-6px_-6px_10px_rgb(255,255,255,1)] z-0"></div>
                <input onChange={(e) => { setPassword(e.target.value) }} placeholder="Password" value={password} type="password" className="z-1 rounded-3xl p-2 text-center cursor-pointer flex mx-auto w-full h-full justify-center text-2xl font-medium text-gray-600" />
            </div>
            <div style={{ display: registration ? '' : 'none' }} className="bg-gray-100 mx-auto w-full min-h-fit h-15 rounded-3xl flex flex-col justify-between relative inset-shadow-[2px_2px_15px_rgb(0,0,0,0.2)]">
                <div className=" absolute w-full h-full inset-0 rounded-3xl inset-shadow-[-6px_-6px_10px_rgb(255,255,255,1)] z-0"></div>
                <input onChange={(e) => { setSeccondPass(e.target.value) }} placeholder="Password" value={secondPass} type="password" className="z-1 rounded-3xl p-2 text-center cursor-pointer flex mx-auto w-full h-full justify-center text-2xl font-medium text-gray-600" />
            </div>
            <div className="flex flex-col">
                {registration ?
                    <div className="flex flex-col">
                        <button disabled={checkErr} onClick={registerFun} className=" disabled:bg-gray-400 w-50 bg-[rgb(231,92,92,1)] m-auto shadow-md text-2xl p-4 rounded-4xl font-bold text-gray-700 relative">
                            <div className=" cursor-pointer absolute size-full -translate-x-4 -translate-y-4 rounded-4xl shadow-[-8px_-8px_8px_rgba(255,255,255,1)] "></div>
                            Registration
                        </button>
                    </div>
                    :
                    <button onClick={logInFun} className="w-50 bg-[rgb(231,92,92,1)] m-auto shadow-md text-2xl p-4 rounded-4xl font-bold text-gray-700 relative">
                        <div className=" cursor-pointer absolute size-full -translate-x-4 -translate-y-4 rounded-4xl shadow-[-8px_-8px_8px_rgba(255,255,255,1)] "></div>
                        logIn
                    </button>
                }
                <p style={{ display: registration ? 'none' : '' }} className="flex mt-2 m-auto z-1">Still don't have an accaunt? <a onClick={() => setFade(true)} className="z-1 underline cursor-pointer"> Register</a></p>
                <p style={{ display: registration ? '' : 'none' }} className="flex mt-2 m-auto z-1">Already have an accaunt? <a onClick={() => setFade(true)} className="z-1 underline cursor-pointer"> logIn</a></p>
            </div>
        </div>
    )
}

export default Login