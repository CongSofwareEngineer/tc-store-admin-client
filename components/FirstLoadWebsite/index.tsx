import { COOKIE_EXPIRED, COOKIE_KEY, LOCAL_STORAGE_KEY, OBSERVER_KEY } from '@/constant/app'
import { TYPE_ZUSTAND, ZUSTAND } from '@/constant/zustand'
import useCheckPatchName from '@/hook/tank-query/useCheckPatchName'
import useVoucherUser from '@/hook/tank-query/useVoucherUser'
import ClientApi from '@/services/clientApi'
import { deleteCookie, getCookie, setCookie } from '@/services/CookiesService'
import ObserverService from '@/services/observer'
import { decryptData } from '@/utils/crypto'
import { getDataLocal, removeDataLocal, scrollTop } from '@/utils/functions'
import { useCategoryMenu } from '@/zustand/useCategoryMenu'
import { useProvinces } from '@/zustand/useProvinces'
import { useUserData } from '@/zustand/useUserData'
import { LoadingOutlined } from '@ant-design/icons'
import { NextPage } from 'next'
import { usePathname } from 'next/navigation'
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import secureLocalStorage from 'react-secure-storage'

const FirstLoadWebsite: NextPage = () => {
  const [isLoading, setIsLoading] = useState(false)

  useCheckPatchName()
  const pathName = usePathname()
  const { fetchData: fetchCategoryMenu } = useCategoryMenu()
  const { fetchData: fetchDataProvinces } = useProvinces()
  const { reset: resetUser, userData, setUserData } = useUserData()
  const { data: dataVoucher } = useVoucherUser()

  const listUrlExitedRef = useRef<string[]>([])
  const userRef = useRef<TYPE_ZUSTAND[ZUSTAND.UserData]>(null)

  useLayoutEffect(() => {
    fetchCategoryMenu()
    fetchDataProvinces()
  }, [fetchDataProvinces, fetchCategoryMenu])

  useEffect(() => {
    if (!userRef.current) {
      userRef.current = userData
    }
  }, [userData])

  useEffect(() => {
    if (userData && dataVoucher) {
      console.log({ dataVoucher, userData })
    }
  }, [userData, dataVoucher])

  useEffect(() => {
    scrollTop()
  }, [pathName])

  //re login
  useEffect(() => {
    const loginWithDB = async (sdt: string, pass: string) => {
      const data = await ClientApi.login(sdt, pass)

      if (data?.data) {
        setUserData(data?.data)
        await setCookie(COOKIE_KEY.Auth, data?.data.auth?.toString(), COOKIE_EXPIRED.ExpiredAuth)
      }
      return data?.data || null
    }

    const refreshLogin = async () => {
      const dataSecure = secureLocalStorage.getItem(ZUSTAND.UserData)
      if (dataSecure) {
        const dataDecode = decryptData(dataSecure.toString())
        if (dataDecode) {
          const userData = JSON.parse(dataDecode)
          const refreshAuth = await getCookie(COOKIE_KEY.AuthRefresh)

          if (!refreshAuth) {
            ObserverService.emit(OBSERVER_KEY.LogOut, false)
            return
          }
          const data = await loginWithDB(userData.sdt!, userData.pass!)
          if (!data) {
            ObserverService.emit(OBSERVER_KEY.LogOut, false)
          }
        } else {
          ObserverService.emit(OBSERVER_KEY.LogOut, false)
        }
      }
    }
    refreshLogin()
  }, [setUserData])

  //logout
  useEffect(() => {
    const handleLogout = async (isReload = true) => {
      if (userRef.current && Array.isArray(userRef.current?.tokenNoti)) {
        const tokenLocal = getDataLocal(LOCAL_STORAGE_KEY.TokenFirebase)
        const tokens = userRef.current?.tokenNoti.filter((item: string) => item !== tokenLocal)

        ClientApi.updateTokenNoti(userRef.current?._id || '', {
          tokenNoti: tokens,
          isLogout: true,
        })

        userRef.current = null
      }
      resetUser()
      setTimeout(() => {
        secureLocalStorage.removeItem(ZUSTAND.UserData)
        deleteCookie(COOKIE_KEY.Auth)
        deleteCookie(COOKIE_KEY.AuthRefresh)
        removeDataLocal(LOCAL_STORAGE_KEY.TokenFirebase)
      }, 100)
      if (isReload) {
        window.location.href = '/'
      }
    }

    const routePage = ({ url = '' }: { url?: string }) => {
      if (!listUrlExitedRef.current.includes(url)) {
        setIsLoading(true)
        listUrlExitedRef.current.push(url)
      }
    }

    ObserverService.on(OBSERVER_KEY.RoutePage, routePage)
    ObserverService.on(OBSERVER_KEY.FirstLoadPage, () => setIsLoading(false))
    ObserverService.on(OBSERVER_KEY.LogOut, handleLogout)

    return () => {
      ObserverService.removeListener(OBSERVER_KEY.RoutePage)
      ObserverService.removeListener(OBSERVER_KEY.LogOut)
      ObserverService.removeListener(OBSERVER_KEY.FirstLoadPage)
    }
  }, [resetUser])

  return isLoading ? (
    <div
      style={{
        position: 'fixed',
        zIndex: 999999999999999,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        inset: 0,
        width: '100vw',
        height: '100vh',
        background: '#8487843d',
        backdropFilter: 'blur(1px)',
      }}
    >
      <div className='text-2xl text-green-600'>
        <LoadingOutlined style={{ fontSize: 35 }} />
      </div>
    </div>
  ) : (
    <></>
  )
}

export default FirstLoadWebsite
