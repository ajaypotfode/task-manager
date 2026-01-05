'use client'
import { categoriesAtom } from '@/src/atom/categoryAtom'
import { openModalAtom } from '@/src/atom/modalAtom'
import { taskListAtom } from '@/src/atom/taskAtom'
import TaskCard from '@/src/components/ui/TaskCard'
import { useCategoriesMutation } from '@/src/mutation/categoryMutation'
import { useDaleteTaskMutation, useGetTaskListMutation, useMarkAsCompleteMutation } from '@/src/mutation/taskMutation'
import { useAtom, useSetAtom } from 'jotai'
import { Plus } from 'lucide-react'
import Link from 'next/link'
import { useEffect } from 'react'

const TaskList = () => {
    const [taskList, setTaskList] = useAtom(taskListAtom);
    const [categories, setCategories] = useAtom(categoriesAtom)
    const { isPending: isTaskListPending, mutate: getTaskList } = useGetTaskListMutation();
    const { isPending: isDeleteTaskPending, mutate: getDeleteTask } = useDaleteTaskMutation();
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

    const fetchTaskList = (type: string = 'all') => {
        getTaskList(
            type, {
            onSuccess: (data) => {
                setTaskList(data.tasks)
            },
            onError: (error) => {
                setDialog({
                    title: 'Fetch Failed',
                    message: error.message || 'Failed To Fetch Tasks',
                    buttonText: 'Close'
                })
            }
        }
        )
    }

    useEffect(() => {
        fetchTaskList();
        fetchCategories();
    }, []);


    const markAsCompleteTask = (id: string) => {
        markTask(
            id, {
            onSuccess: (data) => {
                const updatedTaskList = taskList.map((task) => (
                    task._id === data.task._id ?
                        { ...task, isComplete: data.task.isComplete } : task
                ))
                setTaskList(updatedTaskList)
            },
            onError: (error) => {
                setDialog({
                    title: 'Update Failed',
                    message: error.message || 'Failed To Update Task',
                    buttonText: 'Close'
                })
            }
        }
        )
    };


    const deleteTask = (id: string) => {
        getDeleteTask(
            id, {
            onSuccess: (data) => {
                const updatedTaskList = taskList.filter(task => (
                    task._id !== data.task._id
                ))

                setTaskList(updatedTaskList)
            },
            onError: (error) => {
                setDialog({
                    title: 'Update Failed',
                    message: error.message || 'Failed To Update Task',
                    buttonText: 'Close'
                })
            }
        }
        )
    }


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
                <button className='px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap bg-gray-900 text-white shadow-md'
                    onClick={() => fetchTaskList('all')} >
                    All Task
                </button>
                {isCategoryPending ? <p>Loading....</p> :
                    categories.map((category) => (
                        <button key={category._id} className='px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap bg-gray-900 text-white shadow-md'
                            onClick={() => fetchTaskList(category._id)} >
                            {category.name}
                        </button>
                    ))
                }
            </div>
            <div className='space-y-4'>
                {
                    isTaskListPending ? <p>Loading....</p> :
                        taskList.map((task) => (
                            <TaskCard
                                key={task._id}
                                color={task.category?.color}
                                category={task.category.name}
                                title={task.title}
                                time={task.time}
                                complete={task.isComplete}
                                id={task._id}
                                markAsComplete={markAsCompleteTask}
                                deleteTask={deleteTask}
                            />
                        ))
                }
                {/* <TaskCard
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
                /> */}
            </div>
        </div>
    )
}

export default TaskList