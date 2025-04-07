import { Link } from "react-router-dom"

type ButtonProps = {
    text: string;
    link: string
}

export default function PlayButton({text, link}: ButtonProps) {

    return (
        <button className='p-2 cursor-pointer text-gray-900'><Link to={link}>{text}</Link></button>
    )
}