'use client'
import { Spin } from 'antd'
import React, { useLayoutEffect, useState } from 'react'

const FirstLoading = () => {
  const [isClient, setIsClient] = useState(false)

  useLayoutEffect(() => {
    setIsClient(true)
  }, [])
  return !isClient ? (
    <div className='fixed h-screen w-screen inset-0 bg-white flex justify-center items-center'>
      <Spin style={{ fontSize: 20 }} />
    </div>
  ) : (
    <></>
  )
}

export default FirstLoading
