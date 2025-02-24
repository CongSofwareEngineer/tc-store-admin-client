import ConfigBill from '@/components/ConfigBill'
import MyImage from '@/components/MyImage'
import { images } from '@/configs/images'
import useLanguage from '@/hook/useLanguage'
import useMedia from '@/hook/useMedia'
import useRoutePage from '@/hook/useRoutePage'
import { detectImg, numberWithCommas } from '@/utils/functions'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'

const ViewListOrder = ({ dataCart }: { dataCart: any[] }) => {
  const { isMobile } = useMedia()
  const { translate, getLabelCategory } = useLanguage()
  const router = useRoutePage()

  const [listDataValid, setListDataValid] = useState<any[]>([])

  useEffect(() => {
    const arrTemp = dataCart.filter((e) => e?.selected)
    console.log({ arrTemp })
    setListDataValid(arrTemp)
  }, [dataCart])

  const handleClickName = (data: any) => {
    router.push(`/shop/${data?.keyName}`)
  }

  const getItemForShow = (e: any) => {
    if (e?.moreConfig) {
      return e?.moreConfig
    }
    return e.more_data || {}
  }

  const renderItemMobile = () => {
    return (
      <div className='w-full flex flex-col'>
        <div className='w-full flex gap-4 bg-green-100 border-b-2 border-gray-300 py-3 font-bold'>
          {/* header */}
          <div className='w-[100px] text-center'>{translate('textPopular.image')}</div>
          <div className='w-[100px]  flex flex-1'>{translate('textPopular.infor')}</div>
        </div>
        <div className=' max-h-[400px] overflow-auto flex flex-col'>
          {listDataValid.map((e, index) => {
            return (
              <div
                key={e._id}
                className={`w-full flex gap-4 relative py-2 items-center ${
                  index < listDataValid.length - 1 && 'border-b-[3px] border-gray-200'
                }`}
              >
                <div className='w-[100px] '>
                  <div className='relative flex justify-center mt-2'>
                    <MyImage
                      className='!relative !w-auto !h-[80px]'
                      src={detectImg(getItemForShow(e)?.imageMain)}
                      alt={`item-${getItemForShow(e)?.name}`}
                    />
                  </div>
                </div>
                <div className='w-[100px] flex flex-1'>
                  <div className='flex flex-col gap-1 w-full'>
                    <div className='text-medium font-bold'>{getItemForShow(e)?.name}</div>
                    <div className='w-full flex  gap-1'>
                      <div className='text-[12px] opacity-60'>{`${translate('category')} :`}</div>
                      <div className='text-[12px] opacity-60'>{`${getLabelCategory(getItemForShow(e)?.category)}`}</div>
                    </div>
                    <ConfigBill item={e} />

                    <div>{`${translate('textPopular.amount')} : x${e.amount}`}</div>
                    <div className='flex gap-1'>
                      <span>{translate('textPopular.totalMoney')} :</span>
                      <span className='font-bold text-green-700'>
                        {numberWithCommas(e.amount * getItemForShow(e)?.price)} VNĐ
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
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
        <div className=' max-h-[400px] overflow-auto flex flex-col'>
          {listDataValid.map((e, index) => {
            return (
              <div
                key={e._id}
                className={`w-full flex gap-4 relative py-2 items-center ${
                  index < listDataValid.length - 1 && 'border-b-[3px] border-gray-200'
                }`}
              >
                <div className='w-[100px] '>
                  <div className='relative flex justify-center mt-2'>
                    <MyImage
                      className='!relative !h-[80px] !w-auto'
                      fill
                      src={detectImg(getItemForShow(e)?.imageMain)}
                      alt={`item-${getItemForShow(e)?.name}`}
                    />
                  </div>
                </div>
                <div className='w-[100px] flex flex-1'>
                  <div className='flex flex-col gap-1'>
                    <div
                      className='font-semibold   cursor-pointer md:hover:underline'
                      onClick={() => handleClickName(getItemForShow(e))}
                    >
                      {getItemForShow(e)?.name}
                    </div>
                    <div className='opacity-80 text-xs '>{`${translate('category')} : ${
                      getLabelCategory(getItemForShow(e)?.category) || 'typeProduct'
                    }`}</div>
                    <ConfigBill item={e} />
                  </div>
                </div>
                <div className='w-[20%] '>
                  <div className='  text-green-800 flex flex-col  justify-items-start items-center gap-2'>
                    <span className='line-through text-xs'>
                      {numberWithCommas(getItemForShow(e)?.price * 1.2)}
                    </span>
                    <div className=' text-green-800'>
                      {numberWithCommas(getItemForShow(e)?.price)}
                    </div>
                  </div>
                </div>
                <div className='w-[10%] text-center'>{`x${e.amount}`}</div>
                <div className='w-[20%] text-green-500 font-bold text-center'>
                  {numberWithCommas(e.amount * getItemForShow(e)?.price)} VNĐ
                </div>
              </div>
            )
          })}
        </div>
      </div>
    )
  }

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
      <div className='w-full overflow-y-auto'>
        {isMobile ? renderItemMobile() : renderItemDesktop()}
      </div>
    </div>
  )
}

export default ViewListOrder
