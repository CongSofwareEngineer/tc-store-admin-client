'use client'
import useMedia from '@/hook/useMedia'
import { NextPage } from 'next'
import React, { Suspense } from 'react'
import VoucherScreen from './view'

const VoucherLayout: NextPage = () => {
  const { isClient } = useMedia()
  return <Suspense>{isClient ? <VoucherScreen /> : <></>}</Suspense>
}

export default VoucherLayout
