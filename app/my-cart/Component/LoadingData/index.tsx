import { LoadingDataProps } from '@/app/my-page/bill/Component/LoadingData'
import MySkeleton from '@/components/MySkeleton'
import React from 'react'

const LoadingData = ({ loading }: LoadingDataProps) => {
  if (!loading) {
    return <></>
  }

  return (
    <div className='w-full flex gap-4 h-ful'>
      <div className='flex flex-1 flex-col gap-3'>
        <MySkeleton className=' w-full rounded-lg h-12' />
        <MySkeleton className='md:p-5 p-3  w-full flex gap-3 rounded-lg '>
          <MySkeleton className='md:w-[150px] w-[100px] h-full rounded-lg' />
          <div className='flex w-full flex-col gap-2'>
            <MySkeleton className=' w-full rounded-lg h-12' />
            <MySkeleton className=' w-full rounded-lg h-12' />
            <MySkeleton className=' w-full rounded-lg h-12' />
          </div>
        </MySkeleton>
        <MySkeleton className='md:p-5 p-3  w-full flex gap-3 rounded-lg '>
          <MySkeleton className='md:w-[150px] w-[100px] h-full rounded-lg' />
          <div className='flex w-full flex-col gap-2'>
            <MySkeleton className=' w-full rounded-lg h-12' />
            <MySkeleton className=' w-full rounded-lg h-12' />
            <MySkeleton className=' w-full rounded-lg h-12' />
          </div>
        </MySkeleton>
        <MySkeleton className='md:p-5 p-3  w-full flex gap-3 rounded-lg '>
          <MySkeleton className='md:w-[150px] w-[100px] h-full rounded-lg' />
          <div className='flex w-full flex-col gap-2'>
            <MySkeleton className=' w-full rounded-lg h-12' />
            <MySkeleton className=' w-full rounded-lg h-12' />
            <MySkeleton className=' w-full rounded-lg h-12' />
          </div>
        </MySkeleton>
      </div>
      <MySkeleton className='lg:w-[300px]   rounded-lg lg:h-[50vh]' />
    </div>
  )
}

export default LoadingData
