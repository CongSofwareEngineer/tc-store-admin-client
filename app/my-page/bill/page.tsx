import { generateMetaBase } from '@/utils/serverNext'
import { ResolvingMetadata } from 'next'
import BillScreen from './view'

export async function generateMetadata(_: any, parent: ResolvingMetadata) {
  const dataBase = await parent
  const metaData = generateMetaBase({
    dataBase,
    title: 'My Bill',
  })
  return metaData
}

const BillLayout = () => {
  return <BillScreen />
}

export default BillLayout
