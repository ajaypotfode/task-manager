import CategoryCard from '@/src/components/layout/CategoryCard'
import DashboardCards from '@/src/components/layout/DashboardCards'
import DashboardHeader from '@/src/components/layout/DashboardHeader'
import TaskCard from '@/src/components/layout/TaskCard'
import Link from 'next/link'
import React from 'react'

const Dashboard = () => {
    return (
        <div className='grid grid-cols-1 space-y-6 '>
            <DashboardHeader />
            <div className=''>
                <h1 className='text-gray-400 text-bold mb-4 font-bold ' >QUICK ACTION</h1>
                <div className='grid grid-cols-2 md:grid-cols-4 gap-4 '>
                    <DashboardCards
                        icon='Add'
                        route='/add-task'
                        text='New Task'
                        color='#1469fb'

                    />
                    <DashboardCards
                        icon='Summary'
                        route='/summary'
                        text='Summary'
                        color='#f59e0b'

                    />
                    <DashboardCards
                        icon='Calendar'
                        route='/calendar'
                        text='Calendar'
                        color='#fb1414'

                    />
                    <DashboardCards
                        icon='SeeAll'
                        route='/add-task'
                        text='See All'
                        color='#00f832'

                    />
                </div>
            </div>
            <div className='todays-focus-container w-full grid-cols-1 space-y-2'>
                <div className='w-full flex justify-between'>
                    <h1 className='text-black font-bold '>Todays Focus</h1>
                    <Link href={''} className='text-violate font-semibold '>View All</Link>
                </div>
                <div className='w-full grid grid-cols-1 space-y-3 '>
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
            <div className='todays-focus-container w-full grid-cols-1 space-y-2'>
                <div className='w-full flex justify-between'>
                    <h1 className='text-gray-400 text-bold mb-4 font-bold ' >CATEGORY</h1>
                </div>
                <div className='w-full flex overflow-x-auto space-x-3 scrollbar-hidden '>
                    <CategoryCard
                        title='Work'
                        color='#0794ff'
                        count={4}
                    />
                    <CategoryCard
                        title='Helth'
                        color='#09a134'
                        count={4}
                    />
                    <CategoryCard
                        title='Home'
                        color='#c64905'
                        count={4}
                    />
                    <CategoryCard
                        title='Finance'
                        color='#ff07da'
                        count={4}
                    />
                    <CategoryCard
                        title='Personal'
                        color='#7b0101'
                        count={4}
                    />
                </div>
            </div>

        </div>
    )
}

export default Dashboard