import useLanguage from '@/hook/useLanguage'
import {
  BarChartOutlined,
  ClusterOutlined,
  HighlightOutlined,
  HomeOutlined,
  LineChartOutlined,
  MessageOutlined,
  ProductOutlined,
  ShoppingCartOutlined,
  UsergroupAddOutlined,
} from '@ant-design/icons'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const MenuAdminMobile = () => {
  const { translate } = useLanguage()
  const patchName = usePathname()

  const LIST_MENU = [
    {
      title: translate('admin.revenue'),
      url: '/admin',
      icon: <LineChartOutlined />,
    },
    {
      title: translate('bill.title'),
      url: '/admin/bill',
      icon: <BarChartOutlined />,
    },
    {
      title: translate('header.cart'),
      url: '/admin/cart',
      icon: <ShoppingCartOutlined />,
    },
    {
      title: translate('textPopular.comment'),
      url: '/admin/comment',
      icon: <HighlightOutlined />,
    },
    {
      title: translate('textPopular.product'),
      url: '/admin/product',
      icon: <ProductOutlined />,
    },
    {
      title: translate('menuProduct.category'),
      url: '/admin/category',
      icon: <ClusterOutlined />,
    },
    {
      title: 'Voucher',
      url: '/admin/voucher',
      icon: <ProductOutlined />,
    },
    {
      title: 'User',
      url: '/admin/user',
      icon: <UsergroupAddOutlined />,
    },
    {
      title: 'Chat',
      url: '/admin/chats',
      icon: <MessageOutlined />,
    },
  ]
  return (
    <div className='flex w-full gap-3  flex-col pb-3  '>
      <div className='w-auto'>
        <Link href={'/'} className={`text-black flex gap-2 items-baseline`}>
          <span className='text-xl text-green-500'>
            <HomeOutlined />
          </span>
          <span> {translate('header.home')}</span>
        </Link>
      </div>
      {LIST_MENU.map((e) => {
        return (
          <div key={e.url} className='w-auto'>
            <Link
              href={e.url}
              className={`${patchName === e.url ? 'font-bold underline' : ''}   text-black flex gap-2 items-baseline`}
            >
              <span className='text-xl text-green-500'>{e.icon}</span>
              <span>{e.title}</span>
            </Link>
          </div>
        )
      })}
    </div>
  )
}

export default MenuAdminMobile
