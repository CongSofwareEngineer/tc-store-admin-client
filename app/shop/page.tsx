import { generateMetaBase } from '@/utils/serverNext'
import { NextPage, ResolvingMetadata } from 'next'
import ShopScreen from './view'
import { Suspense } from 'react'

export async function generateMetadata(_: any, parent: ResolvingMetadata) {
  const dataBase = await parent
  const metaData = generateMetaBase({
    dataBase,
    title:
      'TC Store - Giày đẹp, Yến Sào, Laptop, Cây Cảnh, Nước Hoa, Cà Phê Chất Lượng & Hơn Thế Nữa',
    override: true,
    des: 'TC Store - Cửa hàng đa dạng: Giày đẹp, yến sào cao cấp, laptop hiện đại, cây cảnh đẹp, nước hoa chính hãng, cà phê nguyên chất và nhiều sản phẩm tốt khác. Mua sắm ngay để nhận ưu đãi đặc biệt!',
  })
  return metaData
}

const ShopPage: NextPage = () => {
  return (
    <>
      <h1 className='absolute opacity-0'>
        TC Store - Cửa Hàng Đa Dạng Sản Phẩm: Giày, Yến Sào, Laptop, Cà Phê & Hơn Thế Nữa
      </h1>
      <h2 className='absolute opacity-0'>Khám Phá Bộ Sưu Tập Giày Dép Thời Trang</h2>
      <h2 className='absolute opacity-0'>Yến Sào Cao Cấp - Lựa Chọn Hoàn Hảo Cho Sức Khỏe</h2>
      <h2 className='absolute opacity-0'>Laptop Chính Hãng - Hiệu Suất Cao</h2>
      <h2 className='absolute opacity-0'>Cà Phê Nguyên Chất - Hương Vị Đậm Đà</h2>
      <h2 className='absolute opacity-0'>Mua Sắm Các Mặt Hàng Tiện Ích Khác</h2>
      <h2 className='absolute opacity-0'>Ưu Đãi Đặc Biệt & Sản Phẩm Hot Nhất</h2>
      <h2 className='absolute opacity-0'>Phản Hồi & Đánh Giá Từ Khách Hàng</h2>
      <Suspense>
        <ShopScreen />
      </Suspense>
    </>
  )
}

export default ShopPage
