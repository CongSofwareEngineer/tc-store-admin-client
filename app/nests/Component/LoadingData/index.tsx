import { LoadingDataProps } from '@/app/my-page/bill/Component/LoadingData'
import MySkeleton from '@/components/MySkeleton'
import useMedia from '@/hook/useMedia'
import React from 'react'

const LoadingData = ({ loading }: LoadingDataProps) => {
  const { isMobile } = useMedia()

  if (!loading) {
    return <></>
  }

  return (
    <div className='gap-4 w-full mt-4 grid  md:grid-cols-4 sm:grid-cols-3 grid-cols-2'>
      <MySkeleton className='w-full items-center flex gap-2 flex-col md:p-5 p-3 rounded-lg aspect-square'>
        <MySkeleton className='w-[100%] aspect-square ' />
        <MySkeleton className='w-full h-6' />
        <MySkeleton className='w-full h-6' />
        <MySkeleton className='w-full h-6' />
      </MySkeleton>
      <MySkeleton className='w-full items-center flex gap-2 flex-col md:p-5 p-3 rounded-lg aspect-square'>
        <MySkeleton className='w-[100%] aspect-square ' />
        <MySkeleton className='w-full h-6' />
        <MySkeleton className='w-full h-6' />
        <MySkeleton className='w-full h-6' />
      </MySkeleton>
      <MySkeleton className='w-full items-center flex gap-2 flex-col md:p-5 p-3 rounded-lg aspect-square'>
        <MySkeleton className='w-[100%] aspect-square ' />
        <MySkeleton className='w-full h-6' />
        <MySkeleton className='w-full h-6' />
        <MySkeleton className='w-full h-6' />
      </MySkeleton>
      <MySkeleton className='w-full items-center flex gap-2 flex-col md:p-5 p-3 rounded-lg aspect-square'>
        <MySkeleton className='w-[100%] aspect-square ' />
        <MySkeleton className='w-full h-6' />
        <MySkeleton className='w-full h-6' />
        <MySkeleton className='w-full h-6' />
      </MySkeleton>
      {!isMobile && (
        <>
          <MySkeleton className='w-full items-center flex gap-2 flex-col md:p-5 p-3 rounded-lg aspect-square'>
            <MySkeleton className='w-[100%] aspect-square ' />
            <MySkeleton className='w-full h-6' />
            <MySkeleton className='w-full h-6' />
            <MySkeleton className='w-full h-6' />
          </MySkeleton>
          <MySkeleton className='w-full items-center flex gap-2 flex-col md:p-5 p-3 rounded-lg aspect-square'>
            <MySkeleton className='w-[100%] aspect-square ' />
            <MySkeleton className='w-full h-6' />
            <MySkeleton className='w-full h-6' />
            <MySkeleton className='w-full h-6' />
          </MySkeleton>
          <MySkeleton className='w-full items-center flex gap-2 flex-col md:p-5 p-3 rounded-lg aspect-square'>
            <MySkeleton className='w-[100%] aspect-square ' />
            <MySkeleton className='w-full h-6' />
            <MySkeleton className='w-full h-6' />
            <MySkeleton className='w-full h-6' />
          </MySkeleton>
          <MySkeleton className='w-full items-center flex gap-2 flex-col md:p-5 p-3 rounded-lg aspect-square'>
            <MySkeleton className='w-[100%] aspect-square ' />
            <MySkeleton className='w-full h-6' />
            <MySkeleton className='w-full h-6' />
            <MySkeleton className='w-full h-6' />
          </MySkeleton>
        </>
      )}
    </div>
  )
}

export default LoadingData
