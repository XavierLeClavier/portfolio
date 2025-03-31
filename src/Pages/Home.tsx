import { Link } from "react-router-dom";

export default function Home() {
    return(
        <>
        <div className="flex justify-center items-center flex-col w-screen">
            <h1>Xavier Lacroix</h1>
            <em>your data guy</em>
            <h2>Check out my projects !</h2>
            <Link to="/projects" className="text-blue-500 underline">
                View Projects
            </Link>
        </div>
        </>
    )
}