import { FILTER_BILL } from '@/constant/app'

export type ISizesModel = {
  size: number
  sold: number
  amount: number
}

export type IModels = {
  model: string
  name: string
  sizes: Array<ISizesModel>
}

export type IImageProduct = {
  url:
    | string
    | {
        base64: string
        [key: string]: any
      }
  model: string
}

export type IConfigCart = {
  model: string
  size: number
}
export type IProduct = {
  _id?: string
  cost?: number
  amount?: number
  amountBuy?: number
  disCount?: number
  dateEndSale?: string
  dateSale?: string
  images?: Array<IImageProduct>
  des?: string
  des2?: string
  name?: string
  keyName?: string
  linkShoppe?: string
  linkFacebook?: string
  numberLike?: number
  price?: number
  category?: string
  titleSeo?: string
  desSeo?: string
  attributes?: { [key: string]: any }
  models: Array<IModels>
  configBill?: {
    price?: number
  } & IConfigCart
  configCart?: IConfigCart
  [key: string]: unknown
}

export type IMyCart = {
  _id: string
  amount: number
  date: string
  idProduct: string
  idUser: string
  configBill: {
    models: string
    size: string
  }
  moreData: IProduct
  [key: string]: unknown
}

export type ILengthCart = {
  lengthCart: number
}

export type IComment = {
  _id: string
  date: string
  sdt: string
  name: string
  note: string
  idProduct: string
  listReply: Array<{
    like: number
    date: string
    note: string
  }>
  userLikes: string[]
  rate: number
  listImg: string[]
  user: Array<{
    avatar: string
    [key: string]: unknown
  }>
}

export type IItemListBill = {
  idProduct: number
  amountBuy: number
  price: number
  models: {
    model: string
    size: number
  }
  moreData: IProduct
}

export type IInfoBanking = {
  id: string
  messages: string
}
export type IBill = {
  _id: string
  date: string
  discount: number
  idUser: string
  addressShip: {
    addressDetail: string
    address: string
  }
  abort: boolean
  note: string | null
  name: string
  sdt: string
  status: FILTER_BILL
  infoBanking?: IInfoBanking
  listBill: Array<IItemListBill>
}

export type IAdminApi = {
  product: IProduct
  myCart: IMyCart
  lengthCart: ILengthCart
  comment: IComment
  bill: IBill
}
