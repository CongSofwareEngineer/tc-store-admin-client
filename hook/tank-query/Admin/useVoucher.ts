import { PAGE_SIZE_LIMIT } from '@/constant/app'
import { QUERY_KEY, TypeHookReactQuery } from '@/constant/reactQuery'
import AdminApi from '@/services/adminApi'
import { isObject } from '@/utils/functions'
import { useInfiniteQuery } from '@tanstack/react-query'
import { useMemo } from 'react'

const getData = async ({
  queryKey,
  pageParam = 1,
}: {
  queryKey: any
  pageParam: any
}): Promise<TypeHookReactQuery> => {
  try {
    const query = queryKey[1]
    let queryUrl = `?page=${pageParam}&limit=${PAGE_SIZE_LIMIT}`
    if (isObject(query)) {
      for (const key in query) {
        queryUrl += `&${key}=${query[key]?.toString()}`
      }
    }

    const dataServer = await AdminApi.getVouchers(queryUrl)

    return {
      data: dataServer?.data || [],
      page: pageParam,
    }
  } catch {
    return {
      data: [],
      page: pageParam,
    }
  }
}

const useVoucher = (queries: Record<string, (string | null)[]> | null) => {
  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery({
    queryKey: [QUERY_KEY.VoucherAdmin, queries],
    queryFn: getData,

    initialPageParam: 1,
    getNextPageParam: (lastPage: { data: any; page: number }) => {
      if (lastPage?.data?.length == PAGE_SIZE_LIMIT) {
        return lastPage.page + 1
      }
      return null
    },
  })

  const dataFinal = useMemo(() => {
    console.log({ data })

    if (!data) {
      return []
    }
    const dataFormat = data?.pages.flatMap((e: any) => e.data)
    return dataFormat
  }, [data])

  return {
    data: dataFinal,
    isLoading,
    loadMore: fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  }
}

export default useVoucher
