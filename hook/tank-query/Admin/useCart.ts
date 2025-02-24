import { PAGE_SIZE_LIMIT } from '@/constant/app'
import { QUERY_KEY, TypeHookReactQuery } from '@/constant/reactQuery'
import AdminApi from '@/services/adminApi'
import { useInfiniteQuery } from '@tanstack/react-query'
import { useMemo } from 'react'

const getData = async ({
  queryKey,
  pageParam = 1,
}: {
  queryKey: any
  pageParam: any
}): Promise<TypeHookReactQuery> => {
  const queryUrl = `?page=${pageParam}&limit=${queryKey[2]}`
  const dataServer = await AdminApi.getCart(queryUrl)

  return {
    data: dataServer?.data || [],
    page: pageParam,
  }
}

const useCartAdmin = (pageSize = PAGE_SIZE_LIMIT) => {
  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery({
    queryKey: [QUERY_KEY.MyCartUser, pageSize],
    queryFn: getData,
    initialPageParam: 1,
    getNextPageParam: (lastPage: { data: any; page: number }) => {
      if (lastPage?.data?.length == pageSize) {
        return lastPage.page + 1
      }
      return null
    },
  })

  const dataFinal = useMemo(() => {
    if (!data) {
      return []
    }
    const dataFormat = data?.pages.flatMap((e: any) => e.data)
    return dataFormat
  }, [data])

  return {
    data: dataFinal,
    isLoading: isFetchingNextPage || isLoading,
    loadMore: fetchNextPage,
    hasNextPage,
  }
}

export default useCartAdmin
