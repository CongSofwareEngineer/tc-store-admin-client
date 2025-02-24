import React from 'react'
import { ItemDetailType } from './type'
import { TYPE_PRODUCT_EX } from '@/constant/mongoDB'
import { Rate } from 'antd'
import useMedia from '@/hook/useMedia'
import useLanguage from '@/hook/useLanguage'
import { numberWithCommas } from '@/utils/functions'

const InfoItemDetail = ({ data }: { data: ItemDetailType }) => {
  const { isMobile } = useMedia()
  const { translate } = useLanguage()

  const getTypeProduct = () => {
    if (data?.category === 'shoes') {
      return TYPE_PRODUCT_EX.shoes
    }
    // if (data?.category === 'nests') {
    //   return TYPE_PRODUCT_EX.nests
    // }
    return TYPE_PRODUCT_EX.normal
  }

  const renderItemDes = (title: string, des?: any) => {
    return des ? (
      <div className='flex md:gap-3 gap-[10px]'>
        <span className='font-bold whitespace-nowrap'>{`${title} :`}</span>
        {typeof des === 'number' ? (
          <span>{typeof des === 'number' ? numberWithCommas(des) : des}</span>
        ) : (
          <div
            className='whitespace-break-spaces'
            dangerouslySetInnerHTML={{
              __html: des,
            }}
          />
        )}
      </div>
    ) : (
      <></>
    )
  }

  const renderDesktop = () => {
    return (
      <div className='w-full flex flex-col gap-2  '>
        <div className='flex gap-1 items-center'>
          <Rate disabled defaultValue={4.5} style={{ fontSize: 18 }} />
        </div>
        {renderItemDes(translate('textPopular.description'), data.des)}
        {renderItemDes(translate('productDetail.sold'), Number(data.sold))}
        {getTypeProduct() === TYPE_PRODUCT_EX.normal &&
          renderItemDes(translate('productDetail.weight'), data.weight)}
        {renderItemDes(translate('productDetail.totalNumber'), Number(data.amount))}
        {renderItemDes(translate('textPopular.freeShip'), 'Free ship trong 20 KM')}
      </div>
    )
  }

  const renderMobile = () => {
    return (
      <div className='w-full flex flex-col gap-2 '>
        <div className='flex gap-1 items-center'>
          <Rate disabled defaultValue={4.5} style={{ fontSize: 18 }} />
        </div>
        {renderItemDes(translate('textPopular.description'), data.des)}
        {renderItemDes(translate('productDetail.sold'), Number(data.sold))}
        {getTypeProduct() === TYPE_PRODUCT_EX.normal &&
          renderItemDes(translate('productDetail.weight'), data.weight)}
        {renderItemDes(translate('productDetail.totalNumber'), Number(data.amount))}
        {renderItemDes(translate('textPopular.freeShip'), 'Free ship trong 20 KM')}
      </div>
    )
  }

  return isMobile ? renderMobile() : renderDesktop()
}

export default InfoItemDetail
