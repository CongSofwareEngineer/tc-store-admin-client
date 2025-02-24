import { images } from '@/configs/images'
import useLanguage from '@/hook/useLanguage'
import { numberWithCommas } from '@/utils/functions'
import Image from 'next/image'
import React from 'react'

const GraphRevenue = ({ data }: { data: any }) => {
  const { translate } = useLanguage()

  const renderTotal = () => {
    let total = 0
    data.forEach((e: any) => {
      total += e.totalBill
    })
    return (
      <div className='flex gap-2 w-full items-center'>
        <div className='md:w-[60px] w-10 aspect-square'>
          <Image
            className='!relative !w-full !h-auto'
            alt='iconBill'
            src={images.icon.iconBill}
            fill
          />
        </div>
        <div>
          <div className='md:text-lg text-green-500'>{numberWithCommas(total)}</div>
          <div className='md:text-lg text-green-500'>{translate('textPopular.totalMoney')}</div>
        </div>
      </div>
    )
  }

  const renderTotalAmountSell = () => {
    let total = 0
    data.forEach((e: any) => {
      e.listBill.forEach((e: any) => {
        total += e.amount
      })
    })
    return (
      <div className='flex gap-2 w-full'>
        <div className='w-[30px] aspect-square'>
          <Image
            className='!relative !w-full !h-auto'
            alt='iconBill'
            src={images.icon.iconBill}
            fill
          />
        </div>
        <div>
          <div className='text-lg text-green-500'>{numberWithCommas(total)}</div>
          <div className='text-lg text-green-500'>{translate('textPopular.totalMoney')}</div>
        </div>
      </div>
    )
  }

  const renderTotalAmountUserBuy = () => {
    return (
      <div className='flex gap-2 w-full'>
        <div className='w-[30px] aspect-square'>
          <Image
            className='!relative !w-full !h-auto'
            alt='iconBill'
            src={images.icon.iconBill}
            fill
          />
        </div>
        <div>
          <div className='text-lg text-green-500'>{numberWithCommas(data.length)}</div>
          <div className='text-lg text-green-500'>{translate('textPopular.totalMoney')}</div>
        </div>
      </div>
    )
  }

  return (
    <div className='flex items-center flex-col gap-3'>
      <div className='grid md:grid-cols-3 grid-cols-1 gap-3 w-full'>
        {renderTotal()}
        {renderTotalAmountSell()}
        {renderTotalAmountUserBuy()}
      </div>
    </div>
  )
}

export default GraphRevenue
