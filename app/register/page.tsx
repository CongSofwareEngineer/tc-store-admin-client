import { generateMetaBase } from '@/utils/serverNext'
import { NextPage, ResolvingMetadata } from 'next'
import RegisterScreen from './view'

export async function generateMetadata(_: any, parent: ResolvingMetadata) {
  const dataBase = await parent
  const metaData = generateMetaBase({
    dataBase,
    title: 'Đăng Ký Tài Khoản tại TC Store - Mua Sắm Đa Sản Phẩm Dễ Dàng',
    override: true,
    des: 'Tạo tài khoản tại TC Store để trải nghiệm mua sắm tiện lợi: yến sào cao cấp, laptop hiện đại, cây cảnh đẹp, nước hoa chính hãng và cà phê nguyên chất. Đăng ký ngay để nhận ưu đãi hấp dẫn!',
  })
  return metaData
}

const RegisterPage: NextPage = () => {
  return (
    <>
      <h1 className='absolute opacity-0'>
        Đăng Ký Tài Khoản Tại TC Store - Bắt Đầu Hành Trình Mua Sắm Dễ Dàng
      </h1>
      <h2 className='absolute opacity-0'>Lợi Ích Khi Đăng Ký Tài Khoản TC Store</h2>
      <h2 className='absolute opacity-0'>Cách Đăng Ký Tài Khoản Nhanh Chóng</h2>
      <h2 className='absolute opacity-0'>Ưu Đãi Đặc Biệt Dành Cho Thành Viên Mới</h2>
      <h2 className='absolute opacity-0'>Hỗ Trợ Khách Hàng 24/7 Trong Quá Trình Đăng Ký</h2>
      <RegisterScreen />
    </>
  )
}

export default RegisterPage
