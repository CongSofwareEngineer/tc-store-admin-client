import { FILTER_BILL } from '@/constant/app'

export type IProductInBill = {
  idProduct: string
  model: string
  size: number
  sold: number
}
export type IBodyBill = {
  status: FILTER_BILL
  listUpdate?: Array<IProductInBill>
  idUser?: string
  exp?: number
}
