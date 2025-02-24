import { OBSERVER_KEY } from '@/constant/app'
import ObserverService from '@/services/observer'
import { useRouter } from 'next/navigation'

const useRoutePage = () => {
  const router = useRouter()

  const push = (url: string = '') => {
    const urlFinal = url
    const urlPathName = url.replace(/\?.*$/, '')
    ObserverService.emit(OBSERVER_KEY.RoutePage, { url: urlPathName })
    router.push(urlFinal)
  }

  return {
    ...router,
    push,
  }
}

export default useRoutePage
