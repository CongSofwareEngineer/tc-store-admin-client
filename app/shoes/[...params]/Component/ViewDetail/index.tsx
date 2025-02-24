import dynamic from 'next/dynamic'
import React, { useState } from 'react'
import { ItemDetailType } from '../../type'
import useAos from '@/hook/useAos'
import useMedia from '@/hook/useMedia'
import { DataAddCart } from '@/constant/mongoDB'
import { COOKIE_KEY } from '@/constant/app'
import useRefreshQuery from '@/hook/tank-query/useRefreshQuery'
import useLanguage from '@/hook/useLanguage'
import useUserData from '@/hook/useUserData'
import { detectImg, formatPrice, formatPriceBase } from '@/utils/functions'
import { QUERY_KEY } from '@/constant/reactQuery'
import { getCookie, setCookie } from '@/services/CookiesService'
import BtnBack from '@/components/BtnBack'
import InfoItemDetail from '@/components/InfoItemDetail'
import SubAndPlus from '@/components/SubAndPlus'

import { images } from '@/configs/images'
import ClientApi from '@/services/clientApi'
import { DataItemType } from '@/app/my-cart/type'
import { showNotificationSuccess } from '@/utils/notification'
import { Button } from 'antd'
import Attributes from '../Attributes'
import MyImage from '@/components/MyImage'
// import MoreCollections from '@/components/MoreCollections'

const MoreInfo = dynamic(() => import('@/components/MoreInfo'), {
  ssr: true,
})

const ImageMore = dynamic(() => import('@/components/ImgMoreProduct'), {
  ssr: false,
})

const MoreCollections = dynamic(() => import('@/components/MoreCollections'), {
  ssr: false,
})

type Props = {
  productDetail: ItemDetailType
  isPayment: boolean
  amountBuy: number
  setIsPayment: (e: any) => void
  setAmountBuy: (e: any) => void
  onChangeData?: (param: any) => void
}
const ViewDetail = ({
  onChangeData,
  productDetail,
  amountBuy = 0,
  setIsPayment,
  setAmountBuy,
}: Props) => {
  useAos(500)

  const { isMobile } = useMedia()
  const { refreshQuery } = useRefreshQuery()
  const { translate } = useLanguage()
  const { userData, isLogin } = useUserData()
  const [imageShow, setImageShow] = useState('')

  const [loadingAddCart, setLoadingAddCart] = useState(false)

  const handleBuy = () => {
    setIsPayment(true)
  }

  const handleAddCartLogin = async (data: DataAddCart) => {
    const listCartUser = await ClientApi.getCartDetail(data.idUser!, data.idProduct!)

    const dataExited = listCartUser?.data[0]
    if (!dataExited) {
      await ClientApi.createMyCart(data)
    } else {
      const body: DataAddCart = {
        amount: Number(dataExited.amount) + Number(amountBuy),
        configBill: data.configBill,
      }
      const dataAddCart = await ClientApi.updateMyCart(dataExited._id, body)

      if (!dataAddCart?.data) {
        throw new Error('error add cart')
      }
    }
  }

  const addCartNoLogin = async (body: DataItemType) => {
    const dataCart = await getCookie(COOKIE_KEY.MyCart)
    const arrTemp: Array<DataItemType> = []
    if (Array.isArray(dataCart)) {
      let isExited = false
      dataCart.forEach((e: DataItemType) => {
        const itemTemp = e
        if (itemTemp.idProduct === body.idProduct) {
          itemTemp.amount = itemTemp.amount + body.amount
          itemTemp.date = body.date
          isExited = true
        }
        arrTemp.push(itemTemp)
      })
      if (!isExited) {
        arrTemp.push(body)
      }
    } else {
      arrTemp.push(body)
    }

    await setCookie(COOKIE_KEY.MyCart, arrTemp)
  }

  const handleAddCart = async () => {
    try {
      setLoadingAddCart(true)
      const body: DataAddCart = {
        amount: amountBuy,
        idProduct: productDetail._id?.toString(),
        configBill: productDetail.configBill,
      }
      if (isLogin) {
        body.idUser = userData?._id
        await handleAddCartLogin(body)
      } else {
        const bodyOther: DataItemType = {
          amount: Number(body.amount),
          idProduct: body.idProduct!.toString(),
          keyNameProduct: productDetail?.keyName!,
          selected: true,
          id: '',
          configBill: productDetail.configBill,
        }
        bodyOther.date = new Date().getTime().toFixed()
        bodyOther.more_data = {
          imageMain: productDetail.imageMain,
          name: productDetail.name,
          keyName: productDetail.keyName,
          price: productDetail.price,
          category: productDetail.category,
          disCount: productDetail.disCount,
          _id: productDetail._id,
          sold: productDetail.sold,
        }
        await addCartNoLogin(bodyOther)
      }
      await Promise.all([
        refreshQuery(QUERY_KEY.LengthCartUser),
        refreshQuery(QUERY_KEY.MyCartUser),
      ])
      setLoadingAddCart(false)
      showNotificationSuccess(translate('addCart.addSuccess'))
    } catch {
    } finally {
      setLoadingAddCart(false)
    }
  }

  const renderDesktop = () => {
    return (
      <div className='flex flex-col'>
        <BtnBack title={[translate('textPopular.shoes'), productDetail.name]} url={['/shoes']} />
        <div className='w-full flex gap-6 bg-white rounded-xl p-6'>
          <div
            data-aos='fade-right'
            className='relative min-w-[300px] max-w-[450px] w-[50%] p-5 overflow-hidden '
          >
            <MyImage
              src={detectImg(imageShow || productDetail.imageMain || '')}
              alt={`img-main--${productDetail.name}`}
              className='!relative !w-full !h-auto'
            />
            <ImageMore onHover={(url) => setImageShow(url!)} data={productDetail} />
          </div>
          <div className='flex-1 flex flex-col gap-2 justify-center  ' data-aos='fade-left'>
            <h1 className='text-title font-bold'>{productDetail.name}</h1>
            <InfoItemDetail data={productDetail} />
            <div className='text-medium  line-through text-green-400'>
              {formatPriceBase(productDetail.price, productDetail.discount)} VNĐ
            </div>
            <div className='text-title font-bold text-green-500'>{`${formatPrice(
              Number(productDetail.price || '0') * amountBuy
            )} VNĐ`}</div>
            <Attributes onChange={onChangeData} data={productDetail} />
            <div />
            <SubAndPlus
              callBackSub={(e) => setAmountBuy(e)}
              value={amountBuy}
              maxAmount={productDetail.amount - productDetail.sold}
              callBackPlus={(e) => setAmountBuy(e)}
            />
            <div className='flex gap-6 mt-4'>
              <Button onClick={handleBuy} className='min-w-[30%] !h-[40px]'>
                {translate('common.buyNow')}
              </Button>
              <Button
                type='primary'
                onClick={handleAddCart}
                className='min-w-[30%] !h-[40px]'
                loading={loadingAddCart}
              >
                <div className='flex gap-3 whitespace-nowrap'>
                  <MyImage
                    src={images.icon.iconCart}
                    alt='btn-add-cart'
                    className='!relative !w-[25px] !h-[25px]'
                  />
                  <span>{translate('common.addCart')}</span>
                </div>
              </Button>
            </div>
          </div>
        </div>

        <div data-aos='fade-up' className='w-full bg-white rounded-xl p-6 mt-6'>
          <MoreInfo data={productDetail} />
        </div>

        <div data-aos='fade-up' className='w-full bg-white py-4 px-4   rounded-xl  mt-6'>
          <div className='text-medium capitalize font-bold'>
            {translate('textPopular.moreLike')}
          </div>
          <MoreCollections />
        </div>
      </div>
    )
  }

  const renderMobile = () => {
    return (
      <div className='flex flex-col gap-2'>
        <BtnBack title={[translate('textPopular.shoes'), productDetail.name]} url={['/shoes']} />
        <div className='pt-8 pb-2 shadow-lg shadow-yellow-50 bg-white   w-full flex flex-col justify-center items-center'>
          <div data-aos='fade-right' className='w-[80%]  overflow-hidden '>
            <MyImage
              src={detectImg(productDetail.imageMain || images.userDetail.iconUserDetail)}
              alt={productDetail.des || ''}
              className='!relative !w-full !h-auto'
            />
            <ImageMore onHover={(url) => setImageShow(url!)} data={productDetail} />
          </div>
          <div data-aos='fade-right' className='w-full flex-col gap-2 px-5 pt-5'>
            <h1 className='text-title font-bold'>{productDetail.name}</h1>
            <InfoItemDetail data={productDetail} />
            <div className='text-medium  line-through'>
              {formatPriceBase(productDetail?.price, productDetail?.discount)} VNĐ
            </div>
            <div className='text-title font-bold text-green-500'>{`${formatPrice(
              Number(productDetail?.price || '0') * amountBuy
            )} VNĐ`}</div>
            <Attributes onChange={onChangeData} data={productDetail} />
            <div className='mb-3' />
            <SubAndPlus
              callBackSub={(e) => setAmountBuy(e)}
              value={amountBuy}
              maxAmount={productDetail.amount - productDetail.sold}
              callBackPlus={(e) => setAmountBuy(e)}
            />
            <div className='flex sm:gap-6 gap-2 mt-4 mb-3 sm:flex-row flex-col'>
              <Button onClick={handleBuy} className='min-w-[30%] ' style={{ height: 40 }}>
                {translate('common.buyNow')}
              </Button>
              <Button
                type='primary'
                onClick={handleAddCart}
                className='min-w-[30%] '
                style={{ height: 40 }}
                loading={loadingAddCart}
              >
                <div className='flex gap-3 whitespace-nowrap'>
                  <MyImage
                    src={images.icon.iconCart}
                    alt='btn-add-cart'
                    className='!relative !w-[25px] !h-[25px]'
                  />
                  <span>{translate('common.addCart')}</span>
                </div>
              </Button>
            </div>
          </div>
        </div>
        <div
          data-aos='fade-right'
          className=' shadow-yellow-50 bg-white p-5 md:pr-5 pr-3 w-full flex flex-col gap-2 mt-2'
        >
          <MoreInfo data={productDetail} />
        </div>
        <div data-aos='fade-right' className='w-full bg-white p-4  mt-2 '>
          <div className='text-medium capitalize font-bold mb-1'>
            {translate('textPopular.moreLike')}
          </div>
          <MoreCollections />
        </div>
      </div>
    )
  }

  return isMobile ? renderMobile() : renderDesktop()
}

export default ViewDetail
