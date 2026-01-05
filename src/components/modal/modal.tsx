import { closeModalAtom, isModalOpenAtom, modalAtom } from '@/src/atom/modalAtom';
import { useAtom, useSetAtom } from 'jotai';
import React from 'react'

const InfoDialog = () => {
    const [modalData] = useAtom(modalAtom);
    const [isOpen] = useAtom(isModalOpenAtom)
    const closeModal = useSetAtom(closeModalAtom)

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-53 flex items-center justify-center">

            <div className="fixed inset-0 bg-gray-700/50 backdrop-blur-sm" onClick={closeModal} />

            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg z-10 max-w-sm w-full">
                <h3 className="dark:text-white text-xl font-bold mb-2">{modalData.title}</h3>
                <p className="mb-4 text-gray-700 dark:text-white">{modalData.message}</p>
                <div className="text-right">
                    <button
                        onClick={closeModal}
                        className="cursor-pointer bg-b text-white px-4 py-2 rounded hover:bg-blue-600"
                    >
                        {modalData.buttonText}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default InfoDialog