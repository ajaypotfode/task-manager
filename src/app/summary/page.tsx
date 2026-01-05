'use client'
import { modalAtom, openModalAtom } from '@/src/atom/modalAtom'
import { summaryAtom } from '@/src/atom/taskAtom'
import SummaryChart from '@/src/components/ui/summaryGraph'
import { useGetSummaryMutation } from '@/src/mutation/taskMutation'
import { useAtom, useSetAtom } from 'jotai'
import { CheckCircle2Icon, Clock, LucideTimer } from 'lucide-react'
import { useEffect } from 'react'


const GraphPage = () => {
    const [summary, setSummary] = useAtom(summaryAtom);
    const { isPending: isSummaryPending, mutate: fetchSummary } = useGetSummaryMutation();
    const setDialog = useSetAtom(openModalAtom);


    const getSummaryData = () => {
        fetchSummary(
            undefined, {
            onSuccess: (data) => {
                setSummary(data.summary)
            },
            onError: (error) => {
                setDialog({
                    title: 'Fetch Failed',
                    message: error.message || 'Failed To Fetch Summary',
                    buttonText: 'Close'
                })
            }
        }
        )
    }

    useEffect(() => {
        getSummaryData()
    }, [])


    return (
        <div className='grid grid-cols-1 space-y-6 '>
            <div className=' mb-8'>
                <h1 className='text-3xl font-bold text-gray-900'>Weekly Insights</h1>
                <p className='text-mutedColor'>Your more productive on thrursdays</p>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mb-8'>
                <div className=' shadow-sm border border-white/60 p-6 rounded-2xl bg-white'>
                    <div className='flex items-center gap-4 mb-4'>
                        <div className='p-3 bg-green-100 text-green-600 rounded-xl'>
                            <CheckCircle2Icon />
                        </div>
                        <div>
                            <p className='text-mutedColor text-sm font-medium'>Task Completed</p>
                            <h3 className='text-3xl font-bold text-gray-900'>29</h3>
                        </div>
                    </div>
                    <p className='text-xs text-green-600 font-medium'>
                        +12% from last week
                    </p>
                </div>
                <div className=' shadow-sm border border-white/60 p-6 rounded-2xl bg-white'>
                    <div className='flex items-center gap-4 mb-4'>
                        <div className='p-3 bg-amber-100 text-amber-600 rounded-xl'>
                            <Clock />
                        </div>
                        <div>
                            <p className='text-mutedColor text-sm font-medium'>Avg Completion Time</p>
                            <h3 className='text-3xl font-bold text-gray-900'>45 min</h3>
                        </div>
                    </div>
                    <p className='text-xs text-amber-600 font-medium'>
                        -5% min faster than usual
                    </p>
                </div>

            </div>
            <div className='flex gap-2 overflow-x-auto pb-4 mb-6 hide-scrollbar scrollbar-hidden shadow-sm '>
                <SummaryChart />
            </div>
        </div>
    )
}

export default GraphPage