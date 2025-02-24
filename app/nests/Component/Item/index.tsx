import MySliderSell from '@/components/MySliderSell'
import { images } from '@/configs/images'
import useLanguage from '@/hook/useLanguage'
import useMedia from '@/hook/useMedia'
import { detectImg, formatPrice, formatPriceBase, numberWithCommas } from '@/utils/functions'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const ItemNest = ({ data }: { data: Record<string, any> | null }) => {
  const { isMobile } = useMedia()
  const { translate } = useLanguage()

  return (
    <Link className='w-full cursor-pointer relative' href={`/shop/${data?.keyName}`}>
      <div className='absolute right-0 top-4 bg-green-300 px-3 rounded-l-lg z-20'>
        {data?.disCount || 0}%
      </div>
      <div className='p-5 hover:shadow-lg cursor-pointer group bg-white rounded-lg w-full flex flex-col items-center justify-center'>
        <div className='relative w-full aspect-square  overflow-hidden'>
          <Image
            src={detectImg(data?.imageMain || images.footer.iconFace)}
            alt={data?.name}
            className='!w-full !h-auto !relative img-item group-hover:scale-110 transition duration-300 ease-in-out '
            fill
          />
        </div>
        <div className='w-full gap-1 flex flex-col mt-2 te'>
          <p className='w-full md:text-medium font-bold whitespace-nowrap overflow-hidden text-ellipsis'>
            {data?.name}
          </p>
          <div className=' w-full text-green-400 line-through md:text-sm text-xs   '>{`${formatPriceBase(
            data?.price || 150,
            data?.disCount
          )} VNĐ`}</div>
          <div className='w-full  text-green-600 md:text-[18px] text-[13px] font-bold flex justify-between  '>
            {formatPrice(data?.price || 150)}
            VNĐ
          </div>

          {!isMobile && (
            <MySliderSell total={data?.amount} sell={data?.sold} className={'text-[12px]'} />
          )}
          <span className='text-[11px] md:mt-1 '>{`${translate('productDetail.sold')}  ${numberWithCommas(
            data?.sold || '0'
          )}`}</span>
        </div>
      </div>
    </Link>
  )
}

export default ItemNest
