'use client'
import React, { useState } from 'react'
import { ItemDetailType } from './type'
import useGetProductByID from '@/hook/tank-query/useGetProductByID'
import useUserData from '@/hook/useUserData'
// import PaymentShop from './Component/payment'
import { useEffect } from 'react'
import useAos from '@/hook/useAos'
import ViewDetail from './Component/ViewDetail'
import dynamic from 'next/dynamic'
import { cloneData } from '@/utils/functions'
import MyLoading from '@/components/MyLoading'
import useFirstLoadPage from '@/hook/useFirstLoadPage'

const PaymentShop = dynamic(() => import('./Component/payment'), {
  ssr: true,
  loading: () => {
    return <MyLoading />
  },
})
const ShopDetailScreen = ({ productDetail }: { productDetail: ItemDetailType }) => {
  const [amountBuy, setAmountBuy] = useState(1)
  const [isPayment, setIsPayment] = useState(false)
  const [productState, setProductState] = useState<ItemDetailType>(productDetail)

  useAos()
  useFirstLoadPage()
  const { isLogin } = useUserData()
  const { data } = useGetProductByID(productDetail?.id)
  const dataItem = data?.data ?? productDetail

  useEffect(() => {
    setIsPayment(false)
  }, [isLogin])

  useEffect(() => {
    const dataClone = cloneData(dataItem)
    dataClone.configBill = {}
    setProductState(dataClone)
  }, [dataItem])

  return isPayment ? (
    <PaymentShop callBack={() => setIsPayment(false)} data={productState} amount={amountBuy} />
  ) : (
    <ViewDetail
      amountBuy={amountBuy}
      isPayment={isPayment}
      productDetail={productState}
      setAmountBuy={setAmountBuy}
      setIsPayment={setIsPayment}
      onChangeData={setProductState}
    />
  )
}

export default ShopDetailScreen
