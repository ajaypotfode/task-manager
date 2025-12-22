import React from 'react'

const AddTask = () => {
    return (
        <div className='max-w-xl mx-auto text-gray-900 '>
            <h1 className='text-3xl font-bold mb-8'>
                New Task
            </h1>
            <form action="" className='space-y-6 glass-card p-8 rounded-3xl bg-white ' style={{ opacity: 1, transform: 'none' }} >
                <div className='space-y-2'>
                    <label htmlFor="" className='form-label'>
                        What we needs to be done?
                    </label>
                    <input type="text" className='form-input' placeholder='ex.Buy a Flowers for Mom' />
                </div>
                <div className='grid grid-cols-2 gap-6'>
                    <div className='space-y-2'>
                        <label htmlFor="" className='form-label'>Date</label>
                        <input type="date" className='form-input' />
                    </div>
                    <div className='space-y-2'>
                        <label htmlFor="" className='form-label'>Time</label>
                        <input type="time" className='form-input' />
                    </div>
                </div>
                <div className='space-y-2'>
                    <label htmlFor="" className='form-label'>Category</label>
                    <select className='form-input'>
                        <option>All</option>
                        <option>Personal</option>
                    </select>
                </div>
                <div className='grid grid-cols-3 gap-6'>
                    <label className="cursor-pointer">
                        <input type="radio" name="size" className="peer hidden" />

                        <div className=" h-12 rounded-xl border border-gray-200 flex items-center justify-center 
                                        text-sm font-medium text-gray-600 transition-all  hover:bg-gray-50 peer-checked:bg-blue-60 
                                        peer-checked:text-whit peer-checked:border-blue-600">
                            High
                        </div>
                    </label>
                    <label className="cursor-pointer">
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
                    </label>
                </div>
                <div className='pt-4'>
                    <button className='w-full flex justify-center my-button text-white py-2 font-bold rounded-2xl text-center '>
                        Create Task
                    </button>
                </div>
            </form>
        </div>
    )
}

export default AddTask