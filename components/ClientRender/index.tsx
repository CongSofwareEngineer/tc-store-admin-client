'use client'
import React, { useLayoutEffect } from 'react'
import useAos from '@/hook/useAos'
import { useCategoryMenu } from '@/zustand/useCategoryMenu'
import dynamic from 'next/dynamic'
import useMedia from '@/hook/useMedia'

const MyModal = dynamic(() => import('@/components/MyModal'))
const ModalDrawer = dynamic(() => import('@/components/MyDrawer'))

const ChatFirebase = dynamic(() => import('@/components/ChatFirebase'), {
  ssr: false,
})

const MyModalAdmin = dynamic(() => import('@/components/MyModalAdmin'), {
  ssr: false,
})
const CheckPingServer = dynamic(() => import('@/components/CheckPingServer'), {
  ssr: false,
})

const FirstLoadWebsite = dynamic(() => import('@/components/FirstLoadWebsite'), {
  ssr: false,
})

const ToastNoti = dynamic(() => import('@/components/ToastNoti'), {
  ssr: false,
})

const Notification = dynamic(() => import('@/components/Notification'), {
  ssr: false,
})

const ClientRender = ({
  children,
  menuCategory = [],
}: {
  children: React.ReactNode
  menuCategory: any[]
}) => {
  useAos()
  const { isClient } = useMedia()
  const { setCategoryMenu } = useCategoryMenu()

  useLayoutEffect(() => {
    setCategoryMenu(menuCategory)
  }, [menuCategory, setCategoryMenu])

  return (
    <>
      {children}
      <ChatFirebase />
      <MyModalAdmin />
      <CheckPingServer />
      <FirstLoadWebsite />
      <ToastNoti />
      <Notification />

      {isClient && (
        <>
          <MyModal />
          <ModalDrawer />
        </>
      )}
    </>
  )
}

export default ClientRender
