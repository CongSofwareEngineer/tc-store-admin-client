import React from 'react'
import { generateMetaBase } from '@/utils/serverNext'
import { ResolvingMetadata } from 'next'

export async function generateMetadata(_: any, parent: ResolvingMetadata) {
  const dataBase = await parent
  const metaData = generateMetaBase({
    dataBase,
    title: 'Yến',
  })
  return metaData
}
const LayoutNests = ({ children }: { children: React.ReactNode }) => {
  return children
}

export default LayoutNests
