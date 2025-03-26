export type ISizeModel = {
  size: number
  sold: number
  amount: number
}

export type IModel = {
  model: string
  name: string
  sizes: Array<ISizeModel>
}

export type INewProduct = {
  _id?: string
  cost: number
  amount: number
  disCount: number
  dateEndSale: number
  dateSale: number
  nsx: string
  hsd: string
  images: Array<{
    url: any
    model: string
  }>
  des: string
  des2: string
  name: string
  keyName: string
  linkShoppe?: string
  linkFacebook?: string
  numberLike?: number
  price: number
  category: string
  titleSeo: string
  desSeo: string
  attributes?: { [key: string]: any }
  models: Array<IModel>
}
