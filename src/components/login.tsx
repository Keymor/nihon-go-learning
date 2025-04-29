import { useEffect, useState } from "react"
import Loading from "./loading"

interface componentFun {
    setLogin: () => void
}

const Login: React.FC<componentFun> = ({ setLogin }) => {
    const [loading, setLoading] = useState(false)
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [secondPass, setSeccondPass] = useState('')
    const [checkErr, setCheckErr] = useState(true)
    const [checkText, setCheckText] = useState(false)
    const [registration, setRegistration] = useState(false)
    const [fade, setFade] = useState(false)
    const [incorrect, setInccorect] = useState(false)

    const guestUser = () => {
        const nameChar = '0123456789';
        const passwordsChar = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=';
        let randomFeald = 'Guest';
        let randomPasword = ''
        for (let i = 0; i < 5; i++) {
            randomFeald += nameChar.charAt(Math.floor(Math.random() * nameChar.length));
            randomPasword += passwordsChar.charAt(Math.floor(Math.random() * passwordsChar.length))
        }

        const newUser = [randomFeald, randomPasword]
        registerFun(newUser[0], newUser[1])
    }

    // Registration new user with checking available name.
    const registerFun = async (nameUser: string, passwordUser: string) => {
        try {
            setLoading(true)
            const request = await fetch(`${import.meta.env.VITE_API_URL}/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: nameUser, password: passwordUser })
            })
            const respond = await request.json()
            if (respond.succes) {
                setLoading(false)
                localStorage.setItem('token', respond.token)
                setLogin()
            } else {
                setLoading(false)
                window.alert('This name is already exist')
            }
        } catch {

        }
    }

    // LogIn with checkin if user is already exist. Save token from the server.
    const logInFun = async () => {
        try {
            setLoading(true)
            const request = await fetch(`${import.meta.env.VITE_API_URL}/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: name, password: password })
            })
            const respond = await request.json()
            if (respond.succes) {
                localStorage.setItem('token', respond.token)
                setLoading(false)
                setLogin()
                setInccorect(false)
            } else {
                setLoading(false)
                setInccorect(true)
            }
        } catch (err) {
            console.error(err)
        }
    }

    // Time out for propper animation play.
    useEffect(() => {
        if (fade) {
            setTimeout(() => {
                setRegistration(!registration)
                setFade(false)
            }, 300)
        }
    }, [fade])

    // Checking condition of name and password field.
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
        <div>
            <div style={{ transition: '0.3s', opacity: fade ? '0%' : '100%' }} className=" opacity-0 w-full min-h-fit h-120 shadow-[8px_8px_8px_rgba(0,0,0,0.2)] rounded-4xl flex flex-col justify-between px-10 py-8 relative">
                <h1 className="font-bold mx-auto text-3xl text-gray-700">{registration ? 'Sign Up' : 'Log In'}</h1>
                <div className="inset-0 absolute size-full rounded-4xl overflow-hidden">
                    {loading ? <Loading /> : null}
                </div>
                <div className=" absolute size-full inset-0 rounded-4xl shadow-[-8px_-8px_8px_rgba(255,255,255,1)]"></div>
                <p style={{ display: incorrect ? '' : 'none' }} className="text-red-600 text-center">Wrong password or User Name</p>
                <div className="mx-auto w-full min-h-fit h-10 flex flex-col justify-between relative">
                    <div className=" absolute w-[80%] h-[2px] inset-0 bg-gray-300 z-0 top-full mx-auto"></div>
                    <input onChange={(e) => { setName(e.target.value) }} placeholder="Name" value={name} type="text" className="z-1 p-2 text-center cursor-pointer flex mx-auto w-full h-full justify-center text-2xl font-medium text-gray-700 outline-0" />
                </div>
                <p style={{ display: checkText && registration ? '' : 'none' }} className="text-red-600 text-center">Make sure your passwords match</p>
                <div className="mx-auto w-full min-h-fit h-10 flex flex-col justify-between relative">
                    <div className=" absolute w-[80%] h-[2px] inset-0 bg-gray-300 z-0 top-full mx-auto"></div>
                    <input onChange={(e) => { setPassword(e.target.value) }} placeholder="Password" value={password} type="password" className="z-1 rounded-3xl p-2 text-center cursor-pointer flex mx-auto w-full h-full justify-center text-2xl font-medium text-gray-600 outline-0" />
                </div>
                <div style={{ display: registration ? '' : 'none' }} className="mx-auto w-full min-h-fit h-10 flex flex-col justify-between relative">
                    <div className=" absolute w-[80%] h-[2px] inset-0 bg-gray-300 z-0 top-full mx-auto"></div>
                    <input onChange={(e) => { setSeccondPass(e.target.value) }} placeholder="Repeate password" value={secondPass} type="password" className="z-1 rounded-3xl p-2 text-center cursor-pointer flex mx-auto w-full h-full justify-center text-2xl font-medium text-gray-600 outline-0" />
                </div>
                <div className="flex flex-col">
                    {registration ?
                        <div className="flex flex-col">
                            <button disabled={checkErr} onClick={() => registerFun(name, password)} className=" disabled:bg-gray-400 w-50 bg-[rgb(231,92,92,1)] mt-5 mx-auto shadow-md text-2xl p-4 rounded-4xl font-bold text-gray-700 relative">
                                <div className=" cursor-pointer absolute size-full -translate-x-4 -translate-y-4 rounded-4xl shadow-[-8px_-8px_8px_rgba(255,255,255,1)] "></div>
                                Applay
                            </button>
                        </div>
                        :
                        <div className="flex flex-col">
                            <button onClick={logInFun} className="w-50 bg-[rgb(231,92,92,1)] mt-5 mx-auto shadow-md text-2xl p-4 rounded-4xl font-bold text-gray-700 relative">
                                <div className=" cursor-pointer absolute size-full -translate-x-4 -translate-y-4 rounded-4xl shadow-[-8px_-8px_8px_rgba(255,255,255,1)] "></div>
                                logIn
                            </button>
                            <button onClick={guestUser} className="w-50 bg-[rgb(231,208,92)] mt-5 mx-auto shadow-md text-2xl p-4 rounded-4xl font-bold text-gray-700 relative">
                                Go as Guest
                            </button>
                        </div>
                    }
                    <p style={{ display: registration ? 'none' : '' }} className="flex mt-5 m-auto z-1">Still don't have an accaunt? <a onClick={() => { setFade(true), setInccorect(false) }} className="z-1 underline cursor-pointer"> Register</a></p>
                    <p style={{ display: registration ? '' : 'none' }} className="flex mt-5 m-auto z-1">Already have an accaunt? <a onClick={() => setFade(true)} className="z-1 underline cursor-pointer"> logIn</a></p>
                </div>
            </div>
        </div>
    )
}

export default Login