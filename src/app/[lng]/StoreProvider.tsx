'use client'
import { Provider } from 'react-redux'
import React, { ReactNode } from 'react'
import store from '@/lib/store'

export default function StoreProvider({ children }: { children: ReactNode }) {


    return <Provider store={store}>{children}</Provider>
}