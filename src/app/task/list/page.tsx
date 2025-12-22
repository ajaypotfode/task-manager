import TaskCard from '@/src/components/layout/TaskCard'
import { Plus } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const TaskList = () => {
    return (
        <div className='grid grid-cols-1 space-y-6 '>
            <div className='flex items-center justify-between mb-8'>
                <h1 className='text-3xl font-bold text-gray-900'>My Tasks</h1>
                <Link href={'/task/add'} >
                    <button className='inline-flex items-center justify-center gap-2 text-sm 
                   [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 min-h-9 py-2 px-4 my-button rounded-4xl font-bold '>
                        <Plus />
                        Add Task
                    </button>
                </Link>
            </div>
            <div className='flex gap-2 overflow-x-auto pb-4 mb-6 hide-scrollbar scrollbar-hidden '>
              <button className='px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap bg-gray-900 text-white shadow-md'>
                All Task
                </button> 
                  <button className='px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'>
                All Task
                </button> 
                 <button className='px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap bg-gray-900 text-white shadow-md'>
                All Task
                </button> 
                 <button className='px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap bg-gray-900 text-white shadow-md'>
                All Task
                </button> 
                 <button className='px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap bg-gray-900 text-white shadow-md'>
                All Task
                </button> 
                 <button className='px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap bg-gray-900 text-white shadow-md'>
                All Task
                </button> 
            </div>
            <div className='space-y-4'>
                 <TaskCard
                        color='#1469fb'
                        category='work'
                        title='Review Q4 Marketing Statergy'
                        time='10:00 pm'
                        complete={false}
                    />
                    <TaskCard
                        color='#1469fb'
                        category='work'
                        title='Review Q4 Marketing Statergy'
                        time='10:00 pm'
                        complete={true}
                    />
                    <TaskCard
                        color='#1469fb'
                        category='work'
                        title='Review Q4 Marketing Statergy'
                        time='10:00 pm'
                        complete={false}
                    />
            </div>
        </div>
    )
}

export default TaskList