'use client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React from 'react'
import InfoDialog from '../components/modal/modal'

const queryClient = new QueryClient()
const Provider = ({ children }: { children: React.ReactNode }) => {
    return (
        <QueryClientProvider client={queryClient} >
            {children}
            <InfoDialog />
        </QueryClientProvider>
    )
}

export default Provider