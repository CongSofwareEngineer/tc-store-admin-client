import MySkeleton from '@/components/MySkeleton'
import useMedia from '@/hook/useMedia'
import React from 'react'
export type LoadingDataProps = {
  loading?: boolean
}
const LoadingData = ({ loading }: LoadingDataProps) => {
  const { isMobile } = useMedia()

  if (!loading) {
    return <></>
  }

  return isMobile ? (
    <div className='flex flex-col gap-3 w-full mt-3 '>
      <MySkeleton className='w-full h-20  rounded-md' />
      <MySkeleton className='w-full h-20  rounded-md' />
      <MySkeleton className='w-full h-20  rounded-md' />
    </div>
  ) : (
    <div className='flex flex-col gap-3 w-full mt-3 '>
      <MySkeleton className='w-full h-20 rounded-md' />
      <MySkeleton className='w-full h-20 rounded-md' />
      <MySkeleton className='w-full h-20 rounded-md' />
    </div>
  )
}

export default LoadingData
