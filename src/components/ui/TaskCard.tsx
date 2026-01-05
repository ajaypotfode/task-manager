import { Clock12Icon, Trash } from 'lucide-react'
import React from 'react'


interface TaskCardProps {
    color: string;
    id: string;
    category: string;
    title: string;
    time: string;
    date?: string;
    complete: boolean;
    markAsComplete(id: string): void;
    deleteTask?(id: string): void
}

const TaskCard: React.FC<TaskCardProps> = ({ color, category, title, time, date, id, complete = true, markAsComplete, deleteTask }) => {
    return (
        <div
            className="w-full py-4 shadow-sm hover:shadow-xl hover:shadow-indigo-500/10 rounded-2xl flex px-4 items-center group  gap-4 transition-all
                 duration-300 cursor-pointer  hover:-translate-y-1 hover:scale-[1.02] active:scale-95 
                justify-between border border-white/60" >
            <div className='flex items-start justify-between w-full  '>
                <input type="checkBox" id='task-check-field' className={`w-6 h-6 mt-1 rounded-full `}
                    checked={complete}
                    onChange={() => markAsComplete(id)}
                />
                <div className='m-0  flex-1  md:max-w-[90%] max-w-[85%] ml-2 ' >
                    <h1 className={` ${complete ? 'line-through text-gray-500 ' : 'text-gray-900 '} font-semibold sm:text-xl text-lg mb-2  truncate transition-all`}>{title}</h1>
                    <span className='flex text-gray-500 text-sm gap-2 '>
                        <p className='px-2 rounded-2xl ' style={{
                            backgroundColor: `${color}22`,
                            boxShadow: `0 0 10px ${color}55`,
                            color: `${color}`
                        }} >{category}</p>
                        <span className='flex gap-0.5 items-center ' > <Clock12Icon className='h-4 w-4' /> <p>{time}</p></span>
                    </span>
                </div>
                {deleteTask && <span onClick={() => deleteTask(id)}>
                    <Trash className='w-4 h-4 text-red-500' />
                </span>}
            </div>
        </div>
    )
}

export default TaskCard