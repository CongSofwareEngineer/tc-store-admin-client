'use client'

import useAos from '@/hook/useAos'
import { NextPage } from 'next'
import useFirstLoadPage from '@/hook/useFirstLoadPage'
import ModalLogin from '@/components/Header/Component/ModalLogin'
import useUserData from '@/hook/useUserData'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

const Home: NextPage = () => {
  useAos()
  useFirstLoadPage()
  const { userData } = useUserData()
  const router = useRouter()

  useEffect(() => {
    if (userData?.isAdmin) {
      router.push('/admin')
    } else {
      router.push('/')
    }
  }, [userData, router])

  return (
    <div className='w-full m-auto max-w-[500px]'>
      <ModalLogin />
    </div>
  )
}

export default Home
