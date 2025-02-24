import useLanguage from '@/hook/useLanguage'
import { detectImg, numberWithCommas } from '@/utils/functions'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const ModalViewBillDetail = ({ data }: { data: any }) => {
  const { translate } = useLanguage()
  console.log({ data })

  return (
    <div className='flex flex-col gap-4 w-full'>
      {data?.listBill.map((e: any) => {
        return (
          <div key={e._id} className='flex gap-2 w-full pb-4 border-b-2 border-b-gray-200'>
            <div className='w-[100px]'>
              <Image
                alt={e.keyName}
                src={detectImg(e.more_data.imageMain)}
                fill
                className='!relative !w-full !h-auto'
              />
            </div>
            <div className='flex flex-col flex-1 gap-2'>
              <Link href={`/shop/${e.keyName}`} className='font-bold hover:underline'>
                {e.more_data.name}
              </Link>
              <div className='flex gap-2'>
                <div>{`${translate('textPopular.amount')} :`}</div>
                <div>{numberWithCommas(e.amount)}</div>
              </div>

              <div className='flex gap-2'>
                <div>{`${translate('productDetail.price')} :`}</div>
                <div className='text-green-500'>{numberWithCommas(e.more_data.price)}</div>
              </div>
            </div>
          </div>
        )
      })}
      <div className='flex w-full text-green-500 gap-2 font-bold justify-end items-center'>
        <span>{`${translate('textPopular.totalMoney')} :`}</span>
        <span>{numberWithCommas(data?.totalBill)}</span>
        <span>VND</span>
      </div>
    </div>
  )
}

export default ModalViewBillDetail
