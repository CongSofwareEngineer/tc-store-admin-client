'use client'

import { images } from '@/configs/images'
import useLanguage from '@/hook/useLanguage'
import useMedia from '@/hook/useMedia'
import useUserData from '@/hook/useUserData'
import { Col, Row } from 'antd'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect } from 'react'
import { PropsWithChildren } from 'react'
import Avatar from '../Avatar'
import Image from 'next/image'
import useRoutePage from '@/hook/useRoutePage'
const Container = ({ children }: PropsWithChildren) => {
  const { isMobile } = useMedia()
  const { translate } = useLanguage()
  const { userData, isLogin } = useUserData()
  const patchName = usePathname()
  const router = useRoutePage()

  useEffect(() => {
    if (!isLogin && router) {
      router.push('/')
    }
  }, [isLogin, router])

  const renderItem = (icon: string, name: string, link: string) => {
    return (
      <Link
        href={link}
        className='cursor-pointer text-black  flex md:flex-row flex-col gap-1 md:items-start items-center hover:underline'
        style={{
          fontWeight: patchName === link ? 'bold' : 'normal',
          color: 'black',
        }}
      >
        <Image
          src={icon}
          alt={`icon-menu-my-profile-${name}`}
          fill
          className='!relative md:!w-[25px] md:!h-[25px] !w-5 !h-5'
        />
        <span>{name}</span>
      </Link>
    )
  }

  const renderMobile = () => {
    return (
      <div className='bg-white w-[calc(100%+40px)]  p-4 top-[-6px] relative left-[-20px]'>
        <div className='w-full relative '>
          <div className='fixed bg-white  w-full flex justify-around bottom-0 left-0 py-3  border-t-[1px] shadow-gray1 border-gray-300 z-10'>
            <Row className='w-full'>
              <Col span={8}>{renderItem(images.icon.iconHome, translate('header.home'), '/')}</Col>
              <Col span={8}>
                {renderItem(images.icon.iconHistory, translate('myPage.myOder'), '/my-page/bill')}
              </Col>
              <Col span={8}>
                {renderItem(images.icon.iconMyUser, translate('myPage.myUser'), '/my-page')}
              </Col>
            </Row>
          </div>
          <div className='w-full mb-[75px]'>{children}</div>
        </div>
      </div>
    )
  }

  const renderDesktop = () => {
    return (
      <div className='w-full flex gap-6 h-full'>
        <div className='w-[200px] flex flex-col  items-center gap-3 h-full'>
          <Avatar />
          <div className='text-center text-medium'>{userData?.name}</div>
          <div className='flex flex-col w-full gap-5 text-medium'>
            {renderItem(images.icon.iconMyUser, translate('myProfile.myProfile'), '/my-page')}
            {renderItem(images.icon.iconBill, translate('bill.title'), '/my-page/bill')}
            {renderItem(images.icon.iconCart, translate('header.cart'), '/my-cart')}
          </div>
        </div>
        <div className='flex flex-1 bg-white p-4 h-fit max-h-[calc(100vh-80px)] overflow-y-auto '>
          {children}
        </div>
      </div>
    )
  }

  return <>{isLogin && (isMobile ? renderMobile() : renderDesktop())}</>
}

export default Container
