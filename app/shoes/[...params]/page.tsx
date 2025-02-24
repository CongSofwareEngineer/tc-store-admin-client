import { generateMetaBase } from '@/utils/serverNext'
import { ResolvingMetadata } from 'next'
import ShopDetail from './view'
import { ItemDetailType } from './type'
import { notFound } from 'next/navigation'
import ClientApi from '@/services/clientApi'

const getCoffeeDetail = async (keyName: string): Promise<ItemDetailType> => {
  const data = await ClientApi.getProductByKeyName(keyName)

  return data.data
}

export async function generateMetadata({ params }: any, parent: ResolvingMetadata) {
  const [dataBase, data]: any[] = await Promise.allSettled([
    parent,
    getCoffeeDetail(params.params[0]),
  ])

  const metaData = generateMetaBase({
    dataBase: dataBase?.value,
    image: data?.value?.imageMain,
    title: data?.value?.titleSeo || data?.value?.name,
    des: data?.value?.desSeo || data?.value?.des,
    override: true,
  })
  return metaData
}
const ShopPageDetail = async ({ params }: { params: Record<string, string[]> }) => {
  const productDetail = await getCoffeeDetail(params.params[0])
  if (!productDetail) {
    return notFound()
  }
  return <ShopDetail productDetail={productDetail} />
}

export default ShopPageDetail
