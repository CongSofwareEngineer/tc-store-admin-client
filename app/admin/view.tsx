import { PAGE_SIZE_LIMIT } from '@/constant/app'
import useRevenue from '@/hook/tank-query/Admin/useRevenue'
import useLanguage from '@/hook/useLanguage'
import useModalDrawer from '@/hook/useModalDrawer'
import useQuerySearch from '@/hook/useQuerySearch'
import useSearchBaseAdmin from '@/hook/useSearchBaseAdmin'
import { NextPage } from 'next'
import React from 'react'
import GraphRevenue from './Component/GraphRevenue'
import useFirstLoadPage from '@/hook/useFirstLoadPage'
import { plusDay } from '@/utils/momentFunc'

const DATE_START = plusDay(null, -30).valueOf()
const DATE_END = Date.now()

const RevenueScreen: NextPage = () => {
  useFirstLoadPage()
  const { queries, updateQuery } = useQuerySearch()
  const { translate } = useLanguage()
  const { openModalDrawer } = useModalDrawer()

  const { renderContent } = useSearchBaseAdmin(
    {
      dateEnd: true,
      dateStart: true,
    },
    {},
    {
      dateStart: DATE_START,
      dateEnd: DATE_END,
    }
  )

  const { data } = useRevenue(PAGE_SIZE_LIMIT, queries)

  return (
    <div className='flex flex-col gap-3 w-full overflow-y-auto '>
      {renderContent()}
      <GraphRevenue data={data} />
    </div>
  )
}

export default RevenueScreen
