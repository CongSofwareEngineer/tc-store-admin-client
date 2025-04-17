import { IItemReply } from '@/app/admin/comment/type'

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

export type IItemBill = {
  idProduct: string
  amountBuy: number
  price: number
  models: {
    model: string
    size: number
  }
  moreData: IProduct
}

export type IBillResponse = {
  _id?: string
  date?: string
  discount?: 0
  idUser?: string
  addressShip?: {
    addressDetail?: string
    address?: string
  }
  abort?: false
  note?: null
  name?: string
  sdt?: string
  status?: string
  infoBanking?: null
  listBill?: Array<IItemBill>
}

export type ICommentRes = {
  _id: string
  date: string
  sdt: string
  name: string
  note: string
  idProduct: string
  listReply: Array<IItemReply>
  userLikes: string[]
  rate: number
  listImg: string[]
  user: {
    avatar: string
    sdt: string
  }
  product: {
    name: string
    keyName: string
    category: string
  }
}
