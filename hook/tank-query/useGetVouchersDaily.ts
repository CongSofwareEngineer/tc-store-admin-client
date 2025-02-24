import { QUERY_KEY } from '@/constant/reactQuery'
import ClientApi from '@/services/clientApi'
import { useQuery } from '@tanstack/react-query'
const getData = async () => {
  const data = await ClientApi.getVouchersDaily()
  return data.data
}
const useGetVouchersDaily = () => {
  const { data, isLoading, refetch } = useQuery({
    queryKey: [QUERY_KEY.VouchersDaily],
    queryFn: getData,
  })
  return {
    data,
    isLoading,
    refetch,
  }
}

export default useGetVouchersDaily
