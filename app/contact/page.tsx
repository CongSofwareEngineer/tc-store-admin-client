import React from 'react'
import { generateMetaBase } from '@/utils/serverNext'
import { NextPage, ResolvingMetadata } from 'next'
import ContactScreen from './view'

export async function generateMetadata(_: any, parent: ResolvingMetadata) {
  const dataBase = await parent
  const metaData = generateMetaBase({
    dataBase,
    title: 'Liên Hệ TC Store - Kết Nối Nhanh, Hỗ Trợ Tận Tâm',
    override: true,
    des: 'Cần tư vấn hoặc giải đáp thắc mắc? Liên hệ TC Store ngay để được hỗ trợ nhanh chóng. Chúng tôi luôn sẵn sàng giúp bạn với các sản phẩm yến sào, laptop, cây cảnh, nước hoa, cà phê và hơn thế nữa!',
  })
  return metaData
}
const ContactLayout: NextPage = () => {
  return (
    <>
      <h1 className='absolute opacity-0'>Liên Hệ TC Store - Kết Nối Với Chúng Tôi Ngay Hôm Nay</h1>
      <h2 className='absolute opacity-0'>Thông Tin Liên Hệ Chính Thức Của TC Store</h2>
      <h2 className='absolute opacity-0'>Hỗ Trợ Khách Hàng 24/7 - Giải Đáp Mọi Thắc Mắc</h2>
      <h2 className='absolute opacity-0'>Địa Chỉ Showroom & Văn Phòng TC Store</h2>
      <h2 className='absolute opacity-0'>Gửi Tin Nhắn Trực Tiếp Cho Đội Ngũ Hỗ Trợ</h2>
      <h2 className='absolute opacity-0'>Câu Hỏi Thường Gặp (FAQs) Về Liên Hệ</h2>
      <ContactScreen />
    </>
  )
}

export default ContactLayout
