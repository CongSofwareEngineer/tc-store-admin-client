import { FILTER_BILL, PAGE_SIZE_LIMIT } from '@/constant/app'
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
  const query = queryKey[2]
  const limit = queryKey[1]
  const { dateEnd, dateStart, sdt, status, id = '' } = query

  let queryUrl = `?page=${pageParam}&limit=${limit}&status=${FILTER_BILL.DeliverySuccess}`

  if (dateEnd) {
    queryUrl += `&dateEnd=${dateEnd[0]}`
  }
  if (dateStart) {
    queryUrl += `&dateStart=${dateStart[0]}`
  }
  if (sdt) {
    queryUrl += `&sdt=${sdt}`
  }
  if (status && status !== FILTER_BILL.All) {
    queryUrl += `&status=${status}`
  }

  if (id) {
    queryUrl += `&id=${id}`
  }

  const dataServer = await AdminApi.getRevenue(queryUrl)

  return {
    data: dataServer?.data || [],
    page: 1,
  }
}

const useRevenue = (pageSize = PAGE_SIZE_LIMIT, query: any) => {
  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery({
    queryKey: [QUERY_KEY.RevenueAdmin, pageSize, query],
    initialPageParam: 1,
    queryFn: getData,
    getNextPageParam: (lastPage: { data: any; page: number }) => {
      if (lastPage.data.length == pageSize) {
        return lastPage.page + 1
      }
      return null
    },
  })

  const dataFinal = useMemo(() => {
    if (!data) {
      return []
    }
    const dataFormat = data?.pages.flatMap((e) => e.data)
    return dataFormat
  }, [data])

  return {
    data: dataFinal,
    isLoading: isLoading,
    isFetchingNextPage,
    loadMore: fetchNextPage,
    hasNextPage,
  }
}

export default useRevenue
