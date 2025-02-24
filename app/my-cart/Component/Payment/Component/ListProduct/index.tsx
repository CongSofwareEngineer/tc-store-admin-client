import { images } from '@/configs/images'
import useLanguage from '@/hook/useLanguage'
import React from 'react'
import ListItemCart from '../../../ListItemCart'
import useMedia from '@/hook/useMedia'
import Image from 'next/image'

const ListProduct = ({ lisDataBill }: { lisDataBill: any[] }) => {
  const { translate } = useLanguage()
  const { isMobile } = useMedia()

  return (
    <div className='bg-white w-full mt-4 flex flex-col  border-[1px] shadow-gray1 border-gray-300 p-3 px-4 pt-4'>
      <div className='flex w-full gap-2'>
        <div>
          <Image
            src={images.icon.iconCart}
            alt='my-cart-bill'
            fill
            className='!relative !w-[25px] !h-[25px]'
          />
        </div>
        <div className='text-medium font-semibold'>{translate('bill.infoBill')}</div>
      </div>
      <div className='relative w-full border-[1px] my-3 border-gray-300' />
      <div className='w-full min-h-11 max-h-[300px] overflow-y-auto '>
        <ListItemCart loading={false} dataCart={lisDataBill} noEdit noTitle={isMobile} />
      </div>
    </div>
  )
}

export default ListProduct
