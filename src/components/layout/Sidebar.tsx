"use client"
import { ChartNoAxesColumnDecreasing, Home, ListTodoIcon } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
// import React from 'react'


const routes = [
    {
        name: 'Home',
        icon: Home,
        link: '/dashboard'
    },
    {
        name: 'Task',
        icon: ListTodoIcon,
        link: '/task/list'
    },
    {
        name: 'Summary',
        icon: ChartNoAxesColumnDecreasing,
        link: '/summary'
    }
]


const Sidebar = () => {
    const pathname = usePathname()
    const [isMobile, setIsMobile] = useState(false)

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth <= 768)
        checkMobile();
        window.addEventListener('resize', checkMobile)

        return ()=> window.removeEventListener('resize', checkMobile)
    }, [])

    return (
        <>
            {
                !isMobile ?
                    // Desktop Sidebar
                    <aside className="hidden md:flex flex-col w-64 border-r border-border/40 bg-white backdrop-blur-xl p-6 fixed inset-y-0 z-50 shadow-sm">
                        <nav className='w-full p-4 h-full'>
                            <div className='p-2 w-full items-center space-x-2 flex mb-5 '>
                                <div className=' h-8 w-8 rounded-full  bg-violet-500 text-center font-bold text-white text-lg '>V</div>
                                <h1 className='text-violet-600 font-bold text-lg '>My Task</h1>
                            </div>
                            <ul className='text-gray-500 flex flex-col justify-baseline space-y-3 '>
                                {
                                    routes.map((route, index) => (
                                        <li key={index}>
                                            <Link href={route.link} className={`${pathname === route.link ? 'text-violate bg-gray-200/50 ' : ''} p-2 rounded-xl flex items-center gap-2 text-sm font-medium   `} >
                                                <span className='' ><route.icon className='w-4 h-4' /></span>
                                                {route.name}
                                            </Link>
                                        </li>
                                    ))
                                }
                            </ul>
                        </nav>
                    </aside>
                    // Mobile Navigation
                    : <nav className=' text-gray-500 md:hidden fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-xl border-t border-border/40 px-6 py-4 pb-6 z-50 flex items-center justify-between shadow-2xl shadow-indigo-500/10'>
                        {
                            routes.map((route, index) => (
                                <Link key={route.link} href={route.link} className={`${pathname === route.link ? 'text-violate bg-gray-200/50 ' : ''} p-2 rounded-xl flex items-center gap-2 text-sm font-medium   `} >
                                    <span className='' ><route.icon className='w-4 h-4' /></span>
                                    {route.name}
                                </Link>
                            ))
                        }
                    </nav>
            }
        </>
    )
}

export default Sidebar