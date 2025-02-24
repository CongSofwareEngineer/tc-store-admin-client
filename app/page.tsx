'use client'

import useLanguage from '@/hook/useLanguage'
import { FilterAPI } from '@/constant/app'
import dynamic from 'next/dynamic'
import CategoryHome from './(ComponentHome)/Category'
import useMedia from '@/hook/useMedia'
import InfoHome from './(ComponentHome)/InfoHome'
import Banner from './(ComponentHome)/Banner'
import useAos from '@/hook/useAos'
import { NextPage } from 'next'
import useFirstLoadPage from '@/hook/useFirstLoadPage'
const ListProduct = dynamic(() => import('./(ComponentHome)/ListProduct'), {
  ssr: false,
})
const SocialMedia = dynamic(() => import('./(ComponentHome)/SocialMedia'), {
  ssr: false,
})

// const Banner = dynamic(() => import('./(ComponentHome)/Banner'), {
//   ssr: true,
// })

const Home: NextPage = () => {
  useAos()
  useFirstLoadPage()
  const { translate } = useLanguage()
  const { isMobile } = useMedia()

  const renderDesktop = () => {
    return (
      <div>
        <div className='flex  gap-5'>
          <div className='w-[250px]' data-aos='fade-right'>
            <CategoryHome />
          </div>
          <Banner />
        </div>
        <div className='w-[90%] m-auto my-14'>
          <InfoHome />
        </div>
        <div className='w-full flex flex-col gap-4' data-aos='fade-up'>
          <ListProduct title={translate('textPopular.shoes')} type={FilterAPI.Shoes} />

          {/* <ListProduct title={translate('textPopular.nest')} type={'nest'} /> */}
        </div>
        <SocialMedia />
      </div>
    )
  }

  const renderMobile = () => {
    return (
      <div>
        <Banner />
        <div className='w-[90%] m-auto my-8'>
          <InfoHome />
        </div>
        <div className='mb-3' />
        <ListProduct title={translate('textPopular.shoes')} type={FilterAPI.Shoes} />
        <div className='mb-3' />
        {/* <ListProduct title={translate('textPopular.nest')} type={'nest'} /> */}
      </div>
    )
  }

  return (
    <>
      <h1 className='absolute opacity-0'>
        TC Store - Cửa Hàng Đa Dạng Sản Phẩm: Giày Dép, Yến Sào, Laptop, Cà Phê & Nhiều Mặt Hàng
        Khác
      </h1>
      <h2 className='absolute opacity-0'>Sản Phẩm Nổi Bật Tại TC Store</h2>
      <h2 className='absolute opacity-0'>Giày Dép Thời Trang - Phong Cách & Chất Lượng</h2>
      <h2 className='absolute opacity-0'>Yến Sào Cao Cấp - Bổ Dưỡng Cho Sức Khỏe</h2>
      <h2 className='absolute opacity-0'>Laptop Hiện Đại - Công Nghệ Hàng Đầu</h2>
      <h2 className='absolute opacity-0'>Cà Phê Nguyên Chất - Hương Vị Tự Nhiên</h2>
      <h2 className='absolute opacity-0'>Mua Sắm Nhiều Mặt Hàng Khác Tại TC Store</h2>
      {isMobile ? renderMobile() : renderDesktop()}
    </>
  )
}

export default Home
