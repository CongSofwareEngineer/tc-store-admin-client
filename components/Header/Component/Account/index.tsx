import useLanguage from '@/hook/useLanguage'
import useUserData from '@/hook/useUserData'
import React from 'react'
import ModalLogin from '../ModalLogin'
import { DownOutlined, MenuOutlined } from '@ant-design/icons'
import NavMobile from '../NavMobile'
import { Dropdown, MenuProps } from 'antd'
// import CartUser from './cartUser'
import useMedia from '@/hook/useMedia'
import useModalDrawer from '@/hook/useModalDrawer'
import { usePathname } from 'next/navigation'
import dynamic from 'next/dynamic'
import ObserverService from '@/services/observer'
import { OBSERVER_KEY } from '@/constant/app'
import Image from 'next/image'
import { detectAvatar } from '@/utils/functions'
import useRoutePage from '@/hook/useRoutePage'
// import MenuAdminMobile from '@/app/admin/Component/MenuMobile'
const CartUser = dynamic(() => import('./cartUser'), { ssr: false })
const MenuAdminMobile = dynamic(() => import('@/app/admin/Component/MenuMobileAdmin'), {
  ssr: false,
})

const Account = () => {
  const { openModalDrawer } = useModalDrawer()
  const { translate } = useLanguage()
  const { isLogin, userData } = useUserData()
  const { isMobile, isClient } = useMedia(900)
  const route = useRoutePage()
  const pathName = usePathname()

  const handleLogin = () => {
    if (isLogin) {
      ObserverService.emit(OBSERVER_KEY.LogOut, false)
    } else {
      openModalDrawer({
        content: <ModalLogin />,
      })
    }
  }

  const handleViewMenu = () => {
    let content = <NavMobile />
    if (pathName?.includes('admin')) {
      content = <MenuAdminMobile />
    }

    openModalDrawer({
      content,
      onlyDrawer: true,
      title: renderTitleDrawer(),
      configDrawer: {
        width: '70%',
        placement: 'right',
      },
    })
  }

  const renderTitleDrawer = () => {
    return (
      <div className='flex flex-col   w-full'>
        <span>{userData?.name}</span>
        <span>{userData?.sdt}</span>
      </div>
    )
  }

  const renderMobile = () => {
    return (
      <div className='flex gap-2 items-center'>
        <CartUser />
        {isLogin ? (
          <div className='flex gap-2 items-center pr-1'>
            {userData?.avatar && (
              <Image
                fill
                alt='user-avatar'
                className='!relative !w-6 !h-6 rounded-[50%]'
                src={detectAvatar(userData?.avatar)}
              />
            )}
            <div>{userData?.name}</div>
          </div>
        ) : (
          <div
            onClick={handleLogin}
            className='rounded h-full cursor-pointer w-24  flex justify-center items-center'
          >
            <span className='text-black underline'>{translate('common.login')}</span>
          </div>
        )}
        <MenuOutlined onClick={handleViewMenu} style={{ fontSize: 20 }} />
      </div>
    )
  }

  const renderDesktop = () => {
    if (!isClient) {
      return <></>
    }
    const items: MenuProps['items'] = [
      {
        key: '1',
        label: (
          <div onClick={() => route.push('/my-page')} className='cursor-pointer'>
            {translate('myProfile.myProfile')}
          </div>
        ),
      },
      {
        key: '2',
        label: (
          <div onClick={handleLogin} className='cursor-pointer'>
            {translate('common.logOut')}
          </div>
        ),
      },
    ]

    return (
      <div className='h-full fex gap-2 items-center'>
        <div className='rounded h-full cursor-pointer  flex justify-center items-center'>
          {isLogin ? (
            <div className='flex gap-4 items-center'>
              <CartUser />

              <Dropdown menu={{ items }}>
                <div className='flex gap-2 items-center '>
                  {userData?.avatar && (
                    <Image
                      fill
                      alt='user-avatar'
                      className='!relative !w-6 !h-6 rounded-[50%]'
                      src={detectAvatar(userData?.avatar)}
                      key={detectAvatar(userData?.avatar)}
                    />
                  )}

                  <div className='whitespace-nowrap mr-1 max-w-[120px] text-ellipsis overflow-hidden'>{`${
                    userData?.name || userData?.sdt
                  }`}</div>
                  <DownOutlined />
                </div>
              </Dropdown>
            </div>
          ) : (
            <div className='flex gap-2 items-center'>
              <CartUser />
              <span onClick={handleLogin} className='text-black underline  w-24 '>
                {translate('common.login')}
              </span>
              {isLogin && <MenuOutlined onClick={handleViewMenu} style={{ fontSize: 20 }} />}
            </div>
          )}
        </div>
      </div>
    )
  }

  return isMobile ? renderMobile() : renderDesktop()
}

export default Account
