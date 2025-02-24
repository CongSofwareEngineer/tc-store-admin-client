'use client'
import { Loading3QuartersOutlined } from '@ant-design/icons'
import React, { useEffect, useState } from 'react'

const LoadingFirstPage = () => {
  const [isClient, setIsClient] = useState(false)
  useEffect(() => {
    setIsClient(true)
  }, [])
  return isClient ? (
    <></>
  ) : (
    <div className='bg-white z-[999999999] flex w-screen h-screen fixed justify-center items-center inset-0'>
      <Loading3QuartersOutlined
        style={{ color: 'green' }}
        className='text-[40px] animation_spin1s '
      />
    </div>
  )
}

export default LoadingFirstPage
