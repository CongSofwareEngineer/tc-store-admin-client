'use client'
import { images } from '@/configs/images'
import useLanguage from '@/hook/useLanguage'
import useMedia from '@/hook/useMedia'
import useRoutePage from '@/hook/useRoutePage'
import useUserData from '@/hook/useUserData'
import { TagFilled } from '@ant-design/icons'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect } from 'react'

const ContainerAdmin = ({ children }: { children: React.ReactNode }) => {
  const { isMobile, isClient } = useMedia()
  const { translate } = useLanguage()
  const patchName = usePathname()
  const { userData } = useUserData()
  const router = useRoutePage()

  useEffect(() => {
    const sectionMain = window.document.getElementById('id-section-content')
    const header = window.document.getElementById('id-container-header')
    if (patchName.includes('/admin')) {
      if (sectionMain) {
        sectionMain.classList.add('container-admin')
      }
      if (header && !isMobile) {
        header.classList.add('container-admin')
      }
    }

    return () => {
      sectionMain && sectionMain.classList.remove('container-admin')
      header && header.classList.remove('container-admin')
    }
  }, [patchName, isMobile])

  useEffect(() => {
    if (!userData?.isAdmin) {
      router.push('/')
    }
  }, [userData, router])

  const renderMenu = () => {
    const LIST_MENU = [
      {
        title: translate('admin.revenue'),
        url: '/admin',
      },
      {
        title: translate('bill.title'),
        url: '/admin/bill',
      },
      {
        title: translate('header.cart'),
        url: '/admin/cart',
      },
      {
        title: translate('textPopular.comment'),
        url: '/admin/comment',
      },
      {
        title: translate('textPopular.product'),
        url: '/admin/product',
      },
      {
        title: translate('menuProduct.category'),
        url: '/admin/category',
      },
      // {
      //   title: translate('admin.subCategories'),
      //   url: '/admin/sub-categories',
      // },
      {
        title: 'Voucher',
        url: '/admin/voucher',
      },
      {
        title: 'User',
        url: '/admin/user',
      },
      {
        title: 'Chat',
        url: '/admin/chats',
      },
    ]

    return LIST_MENU.map((e) => {
      return (
        <div key={e.url} className='flex gap-3 mt-2 items-center'>
          <TagFilled style={{ color: 'white' }} />
          <Link
            href={e.url}
            className='capitalize text-medium hover:underline text-white'
            style={{
              fontWeight: patchName.includes(e.url) ? 'bold' : 'normal',
            }}
          >
            {e.title}
          </Link>
        </div>
      )
    })
  }

  return (
    <div className='md:fixed  w-screen   flex md:flex-row flex-col h-full max-h-[calc(100vh-56px)]'>
      {userData?.isAdmin && isClient && (
        <>
          {!isMobile && (
            <div className='w-[200px] flex flex-col p-3 gap-3 bg-[#000000d6]'>
              <div className='w-full'>
                <Image
                  fill
                  alt='logo-admin'
                  src={images.logo}
                  className='!relative !w-full !h-auto'
                />
              </div>
              {renderMenu()}
            </div>
          )}
          <div className='flex flex-1 md:p-4 p-5 md:max-w-[calc(100vw-212px)] overflow-y-auto'>
            {children}
          </div>
        </>
      )}
    </div>
  )
}

export default ContainerAdmin
