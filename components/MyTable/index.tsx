import React from 'react'
import { Card, Table } from 'antd'
import MyLoadMore from '../MyLoadMore'
import styled from 'styled-components'
import {
  ColumnFilterItem,
  FilterDropdownProps,
  FilterSearchType,
  FilterValue,
  SorterTooltipProps,
  SortOrder,
} from 'antd/es/table/interface'
const CardCustom = styled(Card)`
  .ant-table-cell {
    text-align: center !important;
  }
  @media screen and (max-width: 768px) {
    .ant-card-body {
      padding: 10px !important;
    }
  }
`

export type ColumnsType = {
  title?: any
  key?: string
  dataIndex?: string
  sorter?: any
  sortOrder?: SortOrder
  defaultSortOrder?: SortOrder
  sortDirections?: SortOrder[]
  sortIcon?: (props: { sortOrder: SortOrder }) => React.ReactNode
  showSorterTooltip?: boolean | SorterTooltipProps
  filtered?: boolean
  filters?: ColumnFilterItem[]
  filterDropdown?: React.ReactNode | ((props: FilterDropdownProps) => React.ReactNode)
  filterOnClose?: boolean
  filterMultiple?: boolean
  filteredValue?: FilterValue | null
  defaultFilteredValue?: FilterValue | null
  filterIcon?: React.ReactNode | ((filtered: boolean) => React.ReactNode)
  filterMode?: 'menu' | 'tree'
  filterSearch?: FilterSearchType<ColumnFilterItem>
  onFilter?: (value: React.Key | boolean, record: any) => boolean
  /**
   * Can cover `<Dropdown>` props
   * @since 5.22.0
   */

  filterDropdownOpen?: boolean
  fixed?: 'left' | 'right' | boolean
  /**
   * @deprecated Please use `filterDropdownProps.onOpenChange` instead.
   * @since 4.23.0
   */
  onFilterDropdownOpenChange?: (visible: boolean) => void
  /** @deprecated Please use `filterDropdownProps.open` instead. */
  filterDropdownVisible?: boolean
  /** @deprecated Please use `filterDropdownProps.onOpenChange` instead */
  onFilterDropdownVisibleChange?: (visible: boolean) => void
  render?: (text: any, record: any, index: number) => React.ReactNode
}

type Props = {
  data?: any[]
  columns?: ColumnsType[]
  limit?: number
  total?: number
  loading?: boolean
  extra?: React.ReactNode
  hasMoreData?: boolean
  isFetchingNextPage?: boolean
  loadMore?: () => any
  classCard?: string
  className?: string
}
const MyTable = ({
  data = [],
  columns = [],
  loading = false,
  total = 0,
  extra = null,
  hasMoreData = false,
  isFetchingNextPage = false,
  loadMore,
  classCard = '',
  className = '',
}: Props) => {
  return (
    <CardCustom
      extra={extra}
      title={`Total : ${total || 0}`}
      className={`w-full overflow-x-auto  ${classCard}`}
    >
      <Table
        loading={loading}
        columns={columns}
        dataSource={data}
        pagination={false}
        className={className}
      />
      <MyLoadMore
        hasLoadMore={hasMoreData}
        isFetchingNextPage={isFetchingNextPage}
        loading={loading}
        callback={loadMore}
      />
    </CardCustom>
  )
}

export default MyTable
