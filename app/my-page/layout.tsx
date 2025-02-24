import { generateMetaBase } from '@/utils/serverNext'
import { NextPage, ResolvingMetadata } from 'next'
import Container from './Component/Container'
import { PropsWithChildren, Suspense } from 'react'
import MyLoading from '@/components/MyLoading'

export async function generateMetadata(_: any, parent: ResolvingMetadata) {
  const dataBase = await parent
  const metaData = generateMetaBase({
    dataBase,
    title: 'My Page | TC Store',
    override: true,
  })
  return metaData
}

const MyPageLayout: NextPage = ({ children }: PropsWithChildren) => {
  return (
    <Suspense
      fallback={
        <div className=' flex justify-center items-center w-screen h-screen'>
          <MyLoading />
        </div>
      }
    >
      <Container>{children}</Container>
    </Suspense>
  )
}

export default MyPageLayout
