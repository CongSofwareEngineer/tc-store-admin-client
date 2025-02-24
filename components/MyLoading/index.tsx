import React from 'react'
import { LoadingOutlined } from '@ant-design/icons'
import Image from 'next/image'
// import MyLottie from '../MyLottie'
// import MyLottie from '../MyLottie'

type MyLoadingType = {
  icon?: string
  className?: string
  size?: any
}
const MyLoading = ({ icon, className, size = 36 }: MyLoadingType) => {
  return (
    <div className={`w-full flex justify-center items-center ${className}`}>
      {icon ? (
        <Image className='!relative' fill src={icon} alt='icon loading' />
      ) : (
        <div className='my-5 text-2xl text-green-500'>
          <LoadingOutlined style={{ fontSize: size }} />
        </div>
      )}
    </div>
  )
}

export default MyLoading
