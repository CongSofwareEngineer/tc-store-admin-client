import React from 'react'
import { generateMetaBase } from '@/utils/serverNext'
import { NextPage, ResolvingMetadata } from 'next'
import MyCartScreen from './view'

export async function generateMetadata(_: any, parent: ResolvingMetadata) {
  const dataBase = await parent
  const metaData = generateMetaBase({
    dataBase,
    title: 'Giỏ hàng',
  })
  return metaData
}
const MyCartPage: NextPage = () => {
  return <MyCartScreen />
}

export default MyCartPage
