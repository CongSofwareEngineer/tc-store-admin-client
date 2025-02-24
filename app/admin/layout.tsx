import { generateMetaBase } from '@/utils/serverNext'
import React from 'react'

import { ResolvingMetadata } from 'next'
import ContainerAdmin from './Component/Container'
export async function generateMetadata(_: any, parent: ResolvingMetadata) {
  const dataBase = await parent
  const metaData = generateMetaBase({
    dataBase,
    title: 'Admin',
  })
  return metaData
}

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return <ContainerAdmin>{children}</ContainerAdmin>
}

export default AdminLayout
