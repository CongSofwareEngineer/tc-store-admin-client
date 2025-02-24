import React from 'react'
import { InfoBillType } from '../../../type'
import { images } from '@/configs/images'
import useLanguage from '@/hook/useLanguage'
import useMedia from '@/hook/useMedia'
import { detectImg, numberWithCommas } from '@/utils/functions'
import MyImage from '@/components/MyImage'
import useRoutePage from '@/hook/useRoutePage'

const InfoBill = ({ data, amountBuy }: InfoBillType) => {
  const { translate } = useLanguage()
  const { isMobile } = useMedia()
  const router = useRoutePage()

  const handleClickName = () => {
    router.push(`/shoes/${data?.idProduct}/${data?.keyName}`)
  }

  const renderConfigBill = () => {
    return (
      <div className='flex md:flex-col flex-row  md:gap-1 gap-3'>
        {Object.entries(data?.configBill).map(([key, value]) => {
          const keyLocal: any = `textPopular.${key}`
          const valueLocal: any = `admin.${key}.${value}`
          return (
            <div key={`renderConfigBill-${key}`} className='flex gap-1 text-xs'>
              <div>{translate(keyLocal) || key}</div>
              <span>:</span>
              <div>{translate(valueLocal) || value}</div>
            </div>
          )
        })}
      </div>
    )
  }

  const renderItemMobile = () => {
    return (
      <div className='w-full flex flex-col'>
        <div className='w-full flex gap-4 bg-green-100 border-b-2 border-gray-300 py-3 font-bold'>
          {/* header */}
          <div className='w-[100px] text-center'>{translate('textPopular.image')}</div>
          <div className='w-[100px]  flex flex-1'>{translate('textPopular.infor')}</div>
        </div>
        {/* content */}
        <div className='w-full flex gap-4 relative py-2 items-center'>
          <div className='w-[100px] '>
            <div className='flex justify-center mt-2'>
              <MyImage
                className='!relative !w-auto !h-[80px]'
                src={detectImg(data?.imageMain?.toString() || '')}
                alt={`item-${data?.name}`}
              />
            </div>
          </div>
          <div className='w-[100px] flex flex-1'>
            <div className='flex flex-col gap-1 w-full'>
              <div className='text-medium font-bold'>{data?.name}</div>
              <div className='text-[12px] opacity-60'>{renderConfigBill()}</div>
              <div>{`${translate('textPopular.amount')} : x${amountBuy}`}</div>
              <div className='flex gap-1'>
                <span>{translate('textPopular.totalMoney')} :</span>
                <span className='font-bold text-green-700'>
                  {numberWithCommas(amountBuy * data?.price)} VNĐ
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const renderItemDesktop = () => {
    return (
      <div className='w-full flex flex-col'>
        <div className='w-full flex gap-4 bg-green-100 border-b-2 border-gray-300 py-3 font-bold'>
          {/* header */}
          <div className='w-[100px] text-center'>{translate('textPopular.image')}</div>
          <div className='w-[100px]  flex flex-1'>{translate('textPopular.nameProduct')}</div>
          <div className='w-[20%] text-center'>{translate('productDetail.price')}</div>
          <div className='w-[10%] text-center'>{translate('textPopular.amount')}</div>
          <div className='w-[20%] text-center '>{translate('textPopular.totalMoney')}</div>
        </div>
        {/* content */}
        <div className='w-full flex gap-4 relative py-2 items-center'>
          <div className='w-[100px] '>
            <div className='relative flex justify-center mt-2'>
              <MyImage
                className='!relative !w-auto !h-[80px]'
                src={detectImg(data?.imageMain?.toString() || '')}
                alt={`item-${data?.name}`}
              />
            </div>
          </div>
          <div className='w-[100px] flex flex-1'>
            <div className='flex flex-col gap-1'>
              <div
                className='font-semibold   cursor-pointer md:hover:underline'
                onClick={handleClickName}
              >
                {data?.name}
              </div>
              {/* <div className='opacity-80 text-xs '>
                {`${translate('category')} : ${translate(`textPopular.${data?.category}`) || data?.category}`}
              </div> */}
              {renderConfigBill()}
            </div>
          </div>
          <div className='w-[20%] '>
            <div className='  text-green-800 flex flex-col  justify-items-start items-center gap-2'>
              <span className='line-through text-xs'>{numberWithCommas(data?.price * 1.2)}</span>
              <div className=' text-green-800'>{numberWithCommas(data?.price)}</div>
            </div>
          </div>
          <div className='w-[10%] text-center'>{`x${amountBuy}`}</div>
          <div className='w-[20%] text-green-500 font-bold text-center'>
            {numberWithCommas(amountBuy * data?.price)} VNĐ
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className='bg-white w-full mt-4 flex flex-col  border-[1px] shadow-gray1 border-gray-300 p-3 px-4 pt-4'>
      <div className='flex w-full gap-2'>
        <div>
          <MyImage
            className='!relative !w-[25px] !h-[25px]'
            src={images.icon.iconCart}
            alt='my-cart-bill'
          />
        </div>
        <div className='text-medium font-semibold'>{translate('bill.infoBill')}</div>
      </div>
      <div className='relative w-full border-[1px] my-3 border-gray-300' />
      <div className='w-full overflow-y-auto'>
        {isMobile ? renderItemMobile() : renderItemDesktop()}
      </div>
    </div>
  )
}

export default InfoBill
