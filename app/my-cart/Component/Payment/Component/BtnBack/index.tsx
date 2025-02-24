import { images } from '@/configs/images'
import useLanguage from '@/hook/useLanguage'
import { RightOutlined } from '@ant-design/icons'
import Image from 'next/image'
import React from 'react'

const BtnBack = ({ clickBack }: { clickBack: () => void }) => {
  const { translate } = useLanguage()
  return (
    <div className='flex w-full align-middle justify-start gap-1 mb-3 md:mb-6 items-center '>
      <Image
        onClick={clickBack}
        src={images.icon.iconBack}
        fill
        alt={'TC Store Icon Back page '}
        className='cursor-pointer !relative !w-[25px] !h-[25px] '
      />
      <a
        onClick={clickBack}
        className='cursor-pointer hover:underline text-[16px] text-blue-700 flex gap-1'
      >
        <h2>{translate('header.cart')}</h2>
        <RightOutlined className='black' />
      </a>
      <h1 className='text-medium'>{translate('cart.payment')}</h1>
    </div>
  )
}

export default BtnBack
