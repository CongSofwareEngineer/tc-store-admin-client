import { QUERY_KEY, TypeHookReactQuery } from '@/constant/reactQuery'
import ClientApi from '@/services/clientApi'
import { useQuery } from '@tanstack/react-query'

const getData = async ({ queryKey }: { queryKey: any }): Promise<TypeHookReactQuery> => {
  const res = await ClientApi.getMoreCollections(queryKey[1])
  return {
    data: res?.data || [],
    page: 1,
  }
}

const useMoreCollections = (amount = 10) => {
  const { data, isLoading } = useQuery({
    queryKey: [QUERY_KEY.GetMoreCollections, amount],
    queryFn: getData,
  })

  return { data, isLoading }
}

export default useMoreCollections
