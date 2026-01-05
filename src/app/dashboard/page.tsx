'use client'
import { categoriesAtom, categoryFormAtom, categoryPayloadAtom } from '@/src/atom/categoryAtom'
import { openModalAtom } from '@/src/atom/modalAtom'
import { recentTasksAtom } from '@/src/atom/taskAtom'
import CategoryCard from '@/src/components/ui/CategoryCard'
import DashboardCards from '@/src/components/ui/DashboardCards'
import DashboardHeader from '@/src/components/ui/DashboardHeader'
import TaskCard from '@/src/components/ui/TaskCard'
import { quickActionCard } from '@/src/helpers/quickActionCardData'
import { useCategoriesMutation, useCreateCategoryMutation } from '@/src/mutation/categoryMutation'
import { useGetRecentTasksMutation, useMarkAsCompleteMutation } from '@/src/mutation/taskMutation'
import { useAtom, useSetAtom } from 'jotai'
import { Plus } from 'lucide-react'
import Link from 'next/link'
import React, { useEffect } from 'react'

const Dashboard = () => {

    const [recentTask, setRecentTask] = useAtom(recentTasksAtom);
    const [categories, setCategories] = useAtom(categoriesAtom);
    const { isPending: isRecentTaskPending, mutate: getRecentTask } = useGetRecentTasksMutation();
    const { isPending: isMarkTaskPending, mutate: markTask } = useMarkAsCompleteMutation();
    const { isPending: isCategoryPending, mutate: getCategories } = useCategoriesMutation();
    const setDialog = useSetAtom(openModalAtom);



    const fetchCategories = () => {
        getCategories(
            undefined, {
            onSuccess: (data) => {
                setCategories(data.categories)
            },
            onError: (error) => {
                setDialog({
                    title: 'Fetch Failed',
                    message: error.message || 'Failed To Fetch Categories',
                    buttonText: 'Close'
                })
            }
        }
        )
    }

    const fetchRecentTasks = () => {
        getRecentTask(
            undefined, {
            onSuccess: (data) => {
                setRecentTask(data.tasks)
            },
            onError: (error) => {
                setDialog({
                    title: 'Fetch Failed',
                    message: error.message || 'Failed To Fetch Recent Tasks',
                    buttonText: 'Close'
                })
            }
        }
        )
    }

    useEffect(() => {
        fetchRecentTasks();
        fetchCategories();
    }, []);


    const markAsCompleteTask = (id: string) => {
        markTask(
            id, {
            onSuccess: (data) => {
                const updatedTaskList = recentTask.map((task) => (
                    task._id === data.task._id ?
                        { ...task, isComplete: data.task.isComplete } : task
                ))
                setRecentTask(updatedTaskList)
            },
            onError: (error) => {
                setDialog({
                    title: 'Update Failed',
                    message: error.message || 'Failed To Update Recent Task',
                    buttonText: 'Close'
                })
            }
        }
        )
    };



    return (
        <div className='grid grid-cols-1 space-y-6 '>
            <DashboardHeader />
            <div className=''>
                <h1 className='text-gray-400 text-bold mb-4 font-bold ' >QUICK ACTION</h1>
                <div className='grid grid-cols-2 md:grid-cols-4 gap-4 '>
                    {
                        quickActionCard.map((cardData, index) => (
                            <DashboardCards
                                key={index}
                                icon={cardData.icon}
                                route={cardData.route}
                                text={cardData.text}
                                color={cardData.color}
                            />
                        ))
                    }
                </div>
            </div>
            <div className='todays-focus-container w-full grid-cols-1 space-y-2'>
                <div className='w-full flex justify-between'>
                    <h1 className='text-black font-bold '>Todays Focus</h1>
                    <Link href={''} className='text-violate font-semibold '>View All</Link>
                </div>
                <div className='w-full grid grid-cols-1 space-y-3 '>
                    {
                        isRecentTaskPending ? <p>Loading....</p> :
                            recentTask.map((task) => (
                                <TaskCard
                                    key={task._id}
                                    color={task.category?.color}
                                    category={task.category.name}
                                    title={task.title}
                                    time={task.time}
                                    complete={task.isComplete}
                                    id={task._id}
                                    markAsComplete={markAsCompleteTask}
                                />
                            ))
                    }
                </div>
            </div>
            <div className='todays-focus-container w-full grid-cols-1 space-y-2'>
                <div className='w-full flex justify-between'>
                    <h1 className='text-gray-400 text-bold mb-4 font-bold ' >CATEGORY</h1>
                </div>
                <div className='w-full flex overflow-x-auto space-x-3 scrollbar-hidden '>
                    {
                        isCategoryPending ? <p>loading...</p> :
                            categories.map((category) => (
                                <CategoryCard
                                    key={category._id}
                                    title={category.name}
                                    color={category.color}
                                    count={category.taskCount}
                                />
                            ))

                    }
                </div>
            </div>

        </div>
    )
}

export default Dashboard