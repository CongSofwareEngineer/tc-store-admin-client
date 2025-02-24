import { QUERY_KEY } from '@/constant/reactQuery'
import ClientApi from '@/services/clientApi'
import { useQuery } from '@tanstack/react-query'
import useUserData from '../useUserData'
import { getCookie } from '@/services/CookiesService'
import { COOKIE_KEY } from '@/constant/app'
const getData = async ({ queryKey }: any) => {
  const isLogin = queryKey[2]
  if (isLogin) {
    const lengthCart = await ClientApi.getLengthCart(queryKey[1])

    return lengthCart?.data || { lengthCart: 0 }
  } else {
    const data = await getCookie(COOKIE_KEY.MyCart)

    if (Array.isArray(data)) {
      return { lengthCart: data.length }
    }
  }
  return { lengthCart: 0 }
}
const useLengthCart = (id = '') => {
  const { isLogin } = useUserData()
  const { data, isLoading } = useQuery({
    queryKey: [QUERY_KEY.LengthCartUser, id, isLogin],
    queryFn: getData,
  })
  return {
    data,
    isLoading,
  }
}

export default useLengthCart
