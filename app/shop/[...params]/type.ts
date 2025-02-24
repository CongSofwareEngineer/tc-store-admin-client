export type ItemDetailType = {
  imageMain?: string
  typeProduct?: string
  des?: string
  name: string
  _id?: string
  keyName?: string
  [key: string]: any
}

export type ModalBuyLoginType = {
  data?: ItemDetailType
  amount: number
}

export type PaymentShopType = {
  data?: ItemDetailType
  callBack: () => void
  amount: number
}

export type InfoBillType = {
  data?: ItemDetailType
  amountBuy: number
}
