import ImageMain from '@/components/ImageMain'
import TextCopy from '@/components/TextCopy'
import { TYPE_PRODUCT } from '@/constant/admin'
import useLanguage from '@/hook/useLanguage'
import { IBill, IItemListBill } from '@/type'
import { formatPrice, getTotalBill, numberWithCommas } from '@/utils/functions'
import React from 'react'

const ItemDetail = ({ data }: { data: IBill }) => {
  const { translate } = useLanguage()

  const renderModel = (model: IItemListBill) => {
    const modelBuy = model.moreData.models.find((item) => item.model === model.models.model)
    return (
      <div>
        <span className='font-bold whitespace-nowrap'>{`Model :`}</span>
        <span>{modelBuy?.name}</span>
      </div>
    )
  }

  const renderAddress = () => {
    if (data.addressShip.addressDetail) {
      return (
        <div>
          <span className='font-bold whitespace-nowrap'>{`${translate('textPopular.addressShip')} :`}</span>
          <TextCopy
            value={`${data.addressShip.addressDetail} (${data.addressShip.address.replaceAll('---', ', ')})`}
            textView={`${data.addressShip.addressDetail} (${data.addressShip.address.replaceAll('---', ', ')})`}
          />
        </div>
      )
    }
  }

  const renderInfoBanking = () => {
    if (data?.infoBanking?.id) {
      return (
        <div className='flex flex-col  gap-1'>
          <span className='font-bold'>{`${translate('banking.title')} (Vietcombank) :`}</span>
          <div className='flex gap-1 ml-3'>
            <span className='font-bold'>{`+ Ma HĐ :`}</span>
            <TextCopy textView={data?.infoBanking?.id} value={data?.infoBanking?.id} />
          </div>
          <div className='fex gap-1  ml-3'>
            <span className='font-bold'>{`+ ${translate('textPopular.content')} :`}</span>
            <span className='ml-1'>{data?.infoBanking?.messages} </span>
          </div>
        </div>
      )
    }
    return <></>
  }

  return (
    <div className='flex flex-col w-full gap-2'>
      {renderInfoBanking()}
      {renderAddress()}
      <div className='flex gap-1'>
        <span className='font-bold'>{`${translate('userDetail.sdt')} :`}</span>
        <TextCopy value={data?.sdt} textView={data?.sdt} />
      </div>
      <div className='flex gap-1'>
        <span className='font-bold'>{`${translate('userDetail.name')} :`}</span>
        <span>{data?.name || 'no-name'}</span>
      </div>

      {data?.note && (
        <div className='flex gap-1'>
          <span className='text-nowrap'>Note :</span>
          <div>{data?.note}</div>
        </div>
      )}

      {data?.listBill.map((e: IItemListBill) => {
        return (
          <div
            className={`flex gap-4 w-full justify-center items-center border-b-2 border-gray-300 pb-5 pt-5`}
            key={e.moreData._id}
          >
            <div className='w-[150px] aspect-square overflow-hidden'>
              <ImageMain listImage={e.moreData.images} model={e.models.model} />
            </div>
            <div className='flex flex-col gap-2 flex-1'>
              <div className='text-green-500 flex gap-2 text-medium font-bold'>
                {e.moreData.name}
              </div>
              <div className='flex gap-2 '>
                <span className='font-bold'>{translate('textPopular.amount')}:</span>
                <span>x{e.amountBuy}</span>
              </div>
              <div className='flex gap-2 '>
                <span className='font-bold'>{translate('productDetail.price')} :</span>
                <span>{formatPrice(e.moreData.price)}</span>
              </div>
              {e.moreData.category === TYPE_PRODUCT.shoes && (
                <div className='flex gap-2 '>
                  {renderModel(e)}
                  <div className='flex gap-2 '>
                    <span className='font-bold'>, Size :</span>
                    <span>{e.models.size}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        )
      })}

      <div className='flex justify-end w-full'>
        <div className='text-green-500 font-bold text-medium'>{`${numberWithCommas(getTotalBill(data))} VNĐ`}</div>
      </div>
    </div>
  )
}

export default ItemDetail
