import React, { Suspense } from 'react'
import { generateMetaBase } from '@/utils/serverNext'
import { NextPage, ResolvingMetadata } from 'next'
import PageNestsScreen from './view'

export async function generateMetadata(_: any, parent: ResolvingMetadata) {
  const dataBase = await parent
  const metaData = generateMetaBase({
    dataBase,
    title: 'TC Store - Yến Sào Chất Lượng & Hơn Thế Nữa',
    override: true,
    des: 'TC Store -  Yến sào cao cấp, nguyên chất và chất lượng 100% từ thiên nhiên Gia Lai. Mua sắm ngay để nhận ưu đãi đặc biệt!',
  })
  return metaData
}
const PageNests: NextPage = () => {
  return (
    <>
      <h1 className='absolute opacity-0'>TC Store - Yến Sào Cao Cấp, Chất Lượng Từ Thiên Nhiên</h1>
      <h2 className='absolute opacity-0'>Yến Sào Tổ Trắng - Tinh Túy Dinh Dưỡng</h2>
      <h2 className='absolute opacity-0'>Yến Sào Tổ Vàng - Thượng Hạng Cho Sức Khỏe</h2>
      <h2 className='absolute opacity-0'>Yến Sào Nguyên Tổ - Tự Nhiên & Tinh Khiết</h2>
      <h2 className='absolute opacity-0'>Đặc Điểm Nổi Bật Của Yến Sào Tại TC Store</h2>
      <h2 className='absolute opacity-0'>Hướng Dẫn Sử Dụng Yến Sào Hiệu Quả</h2>
      <h2 className='absolute opacity-0'>Ưu Đãi Đặc Biệt Khi Mua Yến Sào Tại TC Store</h2>
      <h2 className='absolute opacity-0'>Phản Hồi Tích Cực Từ Khách Hàng</h2>
      <Suspense>
        <PageNestsScreen />
      </Suspense>
    </>
  )
}

export default PageNests
