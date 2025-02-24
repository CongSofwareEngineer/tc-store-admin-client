import { PAGE_SIZE_LIMIT } from '@/constant/app'
import { QUERY_KEY, TypeHookReactQuery } from '@/constant/reactQuery'
import ClientApi from '@/services/clientApi'
import { useInfiniteQuery } from '@tanstack/react-query'
import { useMemo } from 'react'
const getAllProduct = async ({
  queryKey,
  pageParam,
}: {
  queryKey: any
  pageParam: number
}): Promise<TypeHookReactQuery> => {
  const queryUrl = `${queryKey[1]}?page=${pageParam}&limit=${PAGE_SIZE_LIMIT}`

  const dataServer = await ClientApi.getCommentById(queryUrl)

  return {
    data: dataServer?.data || [],
    page: pageParam,
  }
}
const useComment = (isProduct = '') => {
  const { data, isLoading, fetchNextPage, isFetchingNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: [QUERY_KEY.GetCommentProduction, isProduct],
    initialPageParam: 1,
    queryFn: getAllProduct,
    getNextPageParam: (lastPage: { data: any; page: number }) => {
      if (lastPage.data.length == PAGE_SIZE_LIMIT) {
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

export default useComment
