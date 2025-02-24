'use client'
import ImageAdmin from '@/components/ImageAdmin'
import ModalDelete from '@/components/ModalDelete'
import MyCheckBox from '@/components/MyCheckBox'
import MyTable, { ColumnsType } from '@/components/MyTable'
import TextCopy from '@/components/TextCopy'
import { PAGE_SIZE_LIMIT } from '@/constant/app'
import { QUERY_KEY } from '@/constant/reactQuery'
import useUserAdmin from '@/hook/tank-query/Admin/useUserAdmin'
import useRefreshQuery from '@/hook/tank-query/useRefreshQuery'
import useLanguage from '@/hook/useLanguage'
import useMedia from '@/hook/useMedia'
import useModalDrawer from '@/hook/useModalDrawer'
import useQuerySearch from '@/hook/useQuerySearch'
import useSearchBaseAdmin from '@/hook/useSearchBaseAdmin'
import AdminApi from '@/services/adminApi'
import { ellipsisText, numberWithCommas } from '@/utils/functions'
import { formatDateTime } from '@/utils/momentFunc'
import { showNotificationError, showNotificationSuccess } from '@/utils/notification'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import React from 'react'
import ModalConfig from './modalConfig'
import Link from 'next/link'

const UserAdminScreen = () => {
  const { renderContent } = useSearchBaseAdmin({
    dateEnd: true,
    dateStart: true,
    admin: true,
  })
  const { queries } = useQuerySearch()
  const { data, isLoading } = useUserAdmin(queries)
  const { openModalDrawer } = useModalDrawer()
  const { translate } = useLanguage()
  const { refreshQuery } = useRefreshQuery()
  const { isMobile } = useMedia()

  const getAddressShip = (address: any) => {
    const addressDefault = address[0]
    if (addressDefault) {
      addressDefault.address = addressDefault.address.replaceAll('---', ' ')
      return `${addressDefault.addressDetail} (${addressDefault.address})`
    }
    return ''
  }

  const updatePermission = (item: any) => {
    openModalDrawer({
      content: <ModalConfig data={item} />,
    })
  }

  const handleDelete = (id: string) => {
    const callback = async () => {
      const res = await AdminApi.deleteUserAdmin(id)
      if (res.data) {
        await refreshQuery(QUERY_KEY.GetUserAdmin)
        showNotificationSuccess(translate('success.delete'))
      } else {
        showNotificationError(translate('error.delete'))
      }
    }
    openModalDrawer({
      content: <ModalDelete callback={callback} />,
      configModal: {
        overClickClose: false,
      },
    })
  }

  const getColumns = (): ColumnsType[] => {
    if (isMobile) {
      const columns: ColumnsType[] = [
        {
          title: translate('textPopular.infor'),
          key: 'status',
          dataIndex: 'status',
          sorter: (a: any, b: any) => a.isAdmin - b.isAdmin,

          render: (_: any, record: any) => {
            return (
              <div className='flex justify-between gap-3'>
                <div className='w-[90px] m-w-[90px]  flex flex-col gap-1'>
                  <ImageAdmin
                    className='!w-[90px] aspect-square rounded-xl !relative overflow-hidden'
                    src={record.avatar}
                  />
                  <div className='flex gap-2  items-center  justify-center'>
                    <div className='text-2xl text-green-500'>
                      <EditOutlined
                        className='hover:scale-105 cursor-pointer'
                        style={{ fontSize: 24 }}
                        onClick={() => updatePermission(record)}
                      />
                    </div>

                    <div className='text-red-500'>
                      <DeleteOutlined
                        onClick={() => handleDelete(record._id)}
                        className='hover:scale-105 cursor-pointer'
                        style={{ fontSize: 24 }}
                      />
                    </div>
                  </div>
                </div>
                <div className='flex flex-col gap-1 flex-1'>
                  <div className='flex text-xs justify-between'>
                    <div>{formatDateTime(parseInt(record.date))}</div>
                    <span className='flex gap-1'>
                      <MyCheckBox size={16} value={!!record.isAdmin} className='!w-4 !h-4' />
                      <span>Admin</span>
                    </span>
                  </div>
                  <div className='font-bold'>{record.name}</div>
                  <Link href={`tel:${record.sdt}`} className='font-bold'>
                    <TextCopy textView={record.sdt} value={record.sdt} />
                  </Link>
                  <div className='flex gap-1 text-xs'>
                    <div className='whitespace-nowrap'>{translate('userDetail.exp')}:</div>
                    <span>{numberWithCommas(record.exp)}</span>
                  </div>
                  <div className='text-xs'>{getAddressShip(record.addressShipper)}</div>
                </div>
              </div>
            )
          },
        },
      ]
      return columns
    }
    const columns: ColumnsType[] = [
      {
        title: 'SDT',
        key: 'sdt',
        dataIndex: 'sdt',
        render: (sdt: any, record: any) => {
          return (
            <div className='flex flex-col gap-2'>
              <TextCopy value={sdt} textView={ellipsisText(sdt, 4, 4)} />
              <div className='whitespace-nowrap'>{formatDateTime(parseInt(record.date))}</div>
            </div>
          )
        },
      },

      {
        title: translate('textPopular.image'),
        key: 'avatar',
        dataIndex: 'avatar',
        render: (avatar: any) => {
          return <ImageAdmin className='!w-[100px]' src={avatar} />
        },
      },

      {
        title: translate('userDetail.name'),
        key: 'name',
        dataIndex: 'name',
        render: (name: any) => {
          return name
          // return <TextCopy value={name} textView={ellipsisText(name)} />
        },
      },
      {
        title: 'Admin',
        key: 'isAdmin',
        dataIndex: 'isAdmin',
        sorter: (a: any, b: any) => a.isAdmin - b.isAdmin,
        // onFilter: (value: any, record: any) => record.status === value,
        render: (isAdmin: any) => {
          return <MyCheckBox value={isAdmin} />
        },
      },
      {
        title: translate('textPopular.addressShip'),
        key: 'addressShipper',
        dataIndex: 'addressShipper',
        render: (addressShipper: any) => {
          return <div className='min-w-[150px] '>{getAddressShip(addressShipper)}</div>
        },
      },
      {
        title: translate('userDetail.exp'),
        key: 'exp',
        dataIndex: 'exp',
        sorter: (a: any, b: any) => a.exp - b.exp,
        render: (exp: any) => {
          return <div className='min-w-[80px]'>{numberWithCommas(exp)}</div>
        },
      },

      {
        title: 'Action',
        key: 'addressShip',
        dataIndex: 'addressShip',
        fixed: 'right',
        render: (_: any, record: any) => {
          return (
            <div className='flex gap-2  items-center justify-end'>
              <div className='text-2xl text-green-500'>
                <EditOutlined
                  className='hover:scale-105 cursor-pointer'
                  style={{ fontSize: 24 }}
                  onClick={() => updatePermission(record)}
                />
              </div>

              <div className='text-red-500'>
                <DeleteOutlined
                  onClick={() => handleDelete(record._id)}
                  className='hover:scale-105 cursor-pointer'
                  style={{ fontSize: 24 }}
                />
              </div>
            </div>
          )
        },
      },
    ]
    return columns
  }

  return (
    <div className='flex flex-col gap-3 w-full'>
      {renderContent()}
      <MyTable
        columns={getColumns()}
        loading={isLoading}
        data={data || []}
        limit={PAGE_SIZE_LIMIT}
        total={20}
      />
    </div>
  )
}

export default UserAdminScreen
