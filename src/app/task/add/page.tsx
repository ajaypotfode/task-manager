'use client'
import { categoriesAtom } from '@/src/atom/categoryAtom';
import { formValidAtom, taskPayloadAtom } from '@/src/atom/taskAtom'
import { useCategoriesMutation } from '@/src/mutation/categoryMutation';
import { useCreateTaskMutation } from '@/src/mutation/taskMutation';
import { useAtom } from 'jotai'
import React, { FormEvent, useEffect } from 'react'


const priorities = [
    { value: 'high', name: 'High' },
    { value: 'medium', name: 'Medium' },
    { value: 'low', name: 'Low' }
]

const AddTask = () => {
    const [formData, setFormData] = useAtom(taskPayloadAtom);
    const { isPending: isCreateTaskPendding, mutate: createTask } = useCreateTaskMutation();
    const { isPending: isCategoriesPendding, mutate: getCategories } = useCategoriesMutation();
    const [formValid, setFormValid] = useAtom(formValidAtom);
    const [categories, setCategories] = useAtom(categoriesAtom)

    useEffect(() => {
        const isValid =
            formData.title?.trim() !== '' &&
            formData.time?.trim() !== '' &&
            formData.category?.trim() !== '' &&
            formData.date?.trim() !== '' &&
            formData.priority?.trim() !== ''

        setFormValid(isValid);
    }, [formData]);

    useEffect(() => {
        getCategories(
            undefined,
            {
                onSuccess: (data) => {
                    console.log('Categories Fetched Success');
                    setCategories(data.categories)
                },
                onError: (err) => {
                    console.log("error Is :", err);

                }

            }
        )
    }, [])


    const submitTask = (e: FormEvent) => {
        e.preventDefault();
        if (!formValid || isCreateTaskPendding) return;
        // console.log("formData Is :", formData);

        // const dateObj = formData.date ? new Date(formData.date):
        createTask(
            formData,
            {
                onSuccess: (data) => {
                    console.log('task Create Success');

                },
                onError: (err) => {
                    console.log("error Is :", err);

                }

            }
        )
    }

    return (
        <div className='max-w-xl mx-auto text-gray-900 '>
            <h1 className='text-3xl font-bold mb-8'>
                New Task
            </h1>
            <form action="" className='space-y-6 glass-card p-8 rounded-3xl bg-white ' style={{ opacity: 1, transform: 'none' }}
                onSubmit={submitTask} >
                <div className='space-y-2'>
                    <label htmlFor="task-title" className='form-label'>
                        What we needs to be done?
                    </label>
                    <input
                        type="text"
                        id='task-title'
                        className='form-input'
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        placeholder='ex.Buy a Flowers for Mom' />
                </div>
                <div className='grid grid-cols-2 gap-6'>
                    <div className='space-y-2'>
                        <label htmlFor="task-date" className='form-label'>Date</label>
                        <input
                            type="date"
                            id='task-date'
                            className='form-input'
                            value={formData.date}
                            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                        />
                    </div>
                    <div className='space-y-2'>
                        <label htmlFor="task-time" className='form-label'>Time</label>
                        <input
                            type="time"
                            id='task-time'
                            className='form-input'
                            value={formData.time}
                            onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                        />
                    </div>
                </div>
                <div className='space-y-2'>
                    <label htmlFor="task-category" className='form-label'>Category</label>
                    <select
                        id='task-category'
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        className='form-input'>
                        <option>All</option>
                        <option>Personal</option>
                    </select>
                </div>
                <div className='grid grid-cols-3 gap-6'>
                    {
                        priorities.map((priority, index) => (
                            <label key={index} className="cursor-pointer">
                                <input
                                    type="radio"
                                    name="size"
                                    value={priority.value}
                                    checked={formData.priority === priority.value}
                                    onChange={(e) =>
                                        setFormData({ ...formData, priority: e.target.value })
                                    }
                                    className="peer hidden" />

                                <div className=" h-12 rounded-xl border border-gray-200 flex items-center justify-center 
                                        text-sm font-medium text-gray-600 transition-all  hover:bg-gray-50 peer-checked:bg-blue-60 
                                        peer-checked:text-whit peer-checked:border-blue-600">
                                    {priority.name}
                                </div>
                            </label>
                        ))
                    }
                    {/* <label className="cursor-pointer">
                        <input type="radio" name="size" className="peer hidden" />

                        <div className=" h-12 rounded-xl border border-gray-200 flex items-center justify-center 
                                        text-sm font-medium text-gray-600 transition-all  hover:bg-gray-50 peer-checked:bg-blue-60 
                                        peer-checked:text-whit peer-checked:border-blue-600">
                            Medium
                        </div>
                    </label>
                    <label className="cursor-pointer">
                        <input type="radio" name="size" className="peer hidden" />

                        <div className=" h-12 rounded-xl border border-gray-200 flex items-center justify-center 
                                        text-sm font-medium text-gray-600 transition-all  hover:bg-gray-50 peer-checked:bg-blue-60 
                                        peer-checked:text-whit peer-checked:border-blue-600">
                            Low
                        </div>
                    </label> */}
                </div>
                <div className='pt-4'>
                    <button
                        disabled={isCreateTaskPendding || !formValid}
                        type='submit'
                        className='w-full flex justify-center my-button text-white py-2 font-bold rounded-2xl text-center '>
                        Create Task
                    </button>
                </div>
            </form>
        </div>
    )
}

export default AddTask