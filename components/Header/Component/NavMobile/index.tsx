import { OBSERVER_KEY } from '@/constant/app'
import useLanguage from '@/hook/useLanguage'
import useModalDrawer from '@/hook/useModalDrawer'
import useUserData from '@/hook/useUserData'
import ObserverService from '@/services/observer'
import {
  ContactsOutlined,
  HighlightOutlined,
  HomeOutlined,
  LoginOutlined,
  ShopOutlined,
  UserOutlined,
} from '@ant-design/icons'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import styled from 'styled-components'
const LinkCustom = styled(styled(Link)<{ $isSelected?: boolean }>``).attrs({
  className: 'hover:underline hover:text-blue-700',
})`
  color: ${(props) => (props.$isSelected ? 'blue !important' : 'black')};
  font-weight: ${(props) => (props.$isSelected ? '700 !important' : 'nonce')};
`

const LinkRoute = ({
  text,
  icon,
  path,
}: {
  text?: string
  icon?: React.ReactNode
  path: string
}) => {
  const pathname = usePathname()
  const { closeModalDrawer } = useModalDrawer()

  const checkSelected = () => {
    if (pathname === '/' || pathname === '') {
      return pathname === path
    }
    if (path === '/') {
      return false
    }
    return pathname.includes(path)
  }
  return (
    <LinkCustom onClick={closeModalDrawer} $isSelected={checkSelected()} href={path}>
      <span className='flex gap-2 items-center'>
        {icon && <span className='text-green-500 text-base'>{icon}</span>}

        <span>{text}</span>
      </span>
    </LinkCustom>
  )
}
const NavMobile = () => {
  const { isLogin, userData } = useUserData()
  const { translate } = useLanguage()
  const pathname = usePathname()
  const { closeModalDrawer } = useModalDrawer()

  const handleLogOut = () => {
    ObserverService.emit(OBSERVER_KEY.LogOut, false)
    closeModalDrawer()
  }

  return (
    <div className='flex flex-1  flex-col gap-3'>
      {isLogin && (
        <LinkRoute
          path='/my-page'
          icon={<UserOutlined />}
          text={translate('myProfile.myProfile')}
        />
      )}
      <LinkRoute path='/' icon={<HomeOutlined />} text={translate('header.home')} />

      <LinkRoute path='/shop' icon={<ShopOutlined />} text={translate('header.shop')} />

      {/* <LinkRoute path='/nests' icon={<ShopOutlined />} text={translate('textPopular.nest')} /> */}

      <LinkRoute path='/shoes' icon={<ShopOutlined />} text={translate('textPopular.shoes')} />

      <LinkRoute path='/contact' icon={<ContactsOutlined />} text={translate('header.contact')} />
      <LinkRoute path='/about' icon={<ContactsOutlined />} text={translate('header.about')} />

      {!isLogin && (
        <LinkRoute
          path='/register'
          icon={<HighlightOutlined />}
          text={translate('header.register')}
        />
      )}
      {isLogin && (
        <div onClick={handleLogOut} className='flex gap-2 items-center'>
          <span className='text-green-500 text-base'>
            <LoginOutlined />
          </span>
          <span className='cursor-pointer hover:underline'>{translate('common.logOut')}</span>
        </div>
      )}

      {!!userData?.isAdmin && (
        <LinkCustom $isSelected={pathname.includes('/admin')} href={'/admin'}>
          Admin
        </LinkCustom>
      )}
    </div>
  )
}

export default NavMobile
