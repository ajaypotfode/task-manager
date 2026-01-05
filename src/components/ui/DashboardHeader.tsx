import { Sun } from "lucide-react"

const DashboardHeader = () => {
    return (
        <div>
            <span className="p-4 flex flex-col gap-3">
                <span className="flex text-violate gap-2">
                    <Sun className='text-amber-500' />
                    Good Morning, Ajay
                </span>
                <div className="font-bold flex flex-col gap-2 text-4xl text-black ">
                    <h1 className=" "> What Would You Like To</h1>
                    <h1 className="text-violate ">Achive Today?</h1>
                </div>
            </span>
            <div></div>
        </div>
    )
}

export default DashboardHeader