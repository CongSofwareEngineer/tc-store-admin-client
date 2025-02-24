import { QUERY_KEY } from '@/constant/reactQuery'
import AdminApi from '@/services/adminApi'
import { useQuery } from '@tanstack/react-query'

const getData = async ({ queryKey }: { queryKey: any }): Promise<any> => {
  const data = await AdminApi.getUserDetailById(queryKey[1])
  return data?.data
}

const useUserDetail = (id?: string) => {
  const { data, isLoading } = useQuery({
    queryKey: [QUERY_KEY.GetUserDetailById, id],
    queryFn: getData,
    enabled: !!id,
  })

  return { data, isLoading }
}

export default useUserDetail
