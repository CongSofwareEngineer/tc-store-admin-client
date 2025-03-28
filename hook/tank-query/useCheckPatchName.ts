import { useEffect } from 'react'
import useUserData from '../useUserData'
import { usePathname } from 'next/navigation'
import useModalDrawer from '../useModalDrawer'
import { LIST_PAGE_NO_FOOTER, LIST_PAGE_REQUIRE_LOGIN, OBSERVER_KEY } from '@/constant/app'
import ObserverService from '@/services/observer'
import useRoutePage from '../useRoutePage'

const useCheckPatchName = () => {
  const { isLogin } = useUserData()
  const patchName = usePathname()
  const { closeModalDrawer } = useModalDrawer()
  const router = useRoutePage()

  useEffect(() => {
    if (!isLogin) {
      if (LIST_PAGE_REQUIRE_LOGIN.includes(patchName)) {
        router.push('/')
      }
    } else {
      switch (patchName) {
        case '/register':
          router.push('/')
          break
      }
    }

    const footer = window.document.getElementsByClassName('footer-web')[0]
    const header = window.document.getElementsByClassName('header-main')[0]
    if (
      patchName.includes('/admin') ||
      patchName.includes('/my-page') ||
      LIST_PAGE_NO_FOOTER.includes(patchName)
    ) {
      if (footer) {
        footer.classList.add('no-display')
      }
    } else {
      if (footer) {
        footer.classList.remove('no-display')
      }
    }
    if (patchName.includes('/pass-key')) {
      if (footer) {
        footer.classList.add('no-display')
      }
      if (header) {
        header.classList.add('no-display')
      }
    }
    closeModalDrawer()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLogin, patchName])
}

export default useCheckPatchName
