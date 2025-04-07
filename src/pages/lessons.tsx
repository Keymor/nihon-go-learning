import Header from "../components/header"
import Logo from "../components/logo"

export default function Lessons() {
    return (
        <body className="w-screen h-screen flex flex-col">
            <Logo />
            <Header />
            <div className="h-[100%] flex">
                <h1 className="flex m-auto text-4xl text-center">Lessons</h1>
            </div>
        </body>
    )
}