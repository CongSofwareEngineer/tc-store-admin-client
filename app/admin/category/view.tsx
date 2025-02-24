'use client'
import ImageAdmin from '@/components/ImageAdmin'
import { PAGE_SIZE_LIMIT } from '@/constant/app'
import useCategory from '@/hook/tank-query/Admin/useCategory'
import useLanguage from '@/hook/useLanguage'
import useMedia from '@/hook/useMedia'
import useModalDrawer from '@/hook/useModalDrawer'
import useQuerySearch from '@/hook/useQuerySearch'
import useSearchBaseAdmin from '@/hook/useSearchBaseAdmin'
import { detectImg } from '@/utils/functions'
import { Button } from 'antd'
import React from 'react'
import MyTable, { ColumnsType } from '@/components/MyTable'
import TextCopy from '@/components/TextCopy'
import MyCheckBox from '@/components/MyCheckBox'
import ModalDelete from '@/components/ModalDelete'
import useRefreshQuery from '@/hook/tank-query/useRefreshQuery'
import { QUERY_KEY } from '@/constant/reactQuery'
import ModalConfigCategory from './modalConfig'
import { showNotificationError, showNotificationSuccess } from '@/utils/notification'
import AdminApi from '@/services/adminApi'
import useFirstLoadPage from '@/hook/useFirstLoadPage'

const CategoryAdminScreen = () => {
  useFirstLoadPage()
  const { renderContent } = useSearchBaseAdmin({
    category: true,
    keyName: true,
    id: true,
  })
  const { queries } = useQuerySearch()
  const { isMobile } = useMedia()
  const { translate, lang } = useLanguage()
  const { openModalDrawer } = useModalDrawer()
  const { data, isLoading } = useCategory(queries)
  const { refreshQuery } = useRefreshQuery()

  const handleDelete = (item: any) => {
    const callback = async () => {
      try {
        const res = await AdminApi.deleteCategories(item._id)
        if (res?.data) {
          showNotificationSuccess(translate('success.delete'))
          await refreshQuery(QUERY_KEY.GetCategoryAdmin)
        } else {
          showNotificationError(translate('error.delete'))
        }
      } finally {
        refreshQuery(QUERY_KEY.GetCategoryAdmin)
      }
    }

    openModalDrawer({
      content: <ModalDelete autoClose callback={callback} />,
    })
  }

  const handleUpdate = (item: any) => {
    openModalDrawer({
      content: <ModalConfigCategory data={item} />,
      useDrawer: true,
      title: item ? `Update ${getName(item.lang)}` : 'Create',
      configModal: {
        width: '700px',
      },
      configDrawer: {
        height: 'auto',
        placement: 'bottom',
      },
    })
  }

  const getName = (type: Record<string, string>) => {
    try {
      return type[lang]
    } catch {
      return lang
    }
  }

  const renderShowScreen = (isShow: boolean | 'undefined') => {
    if (isShow === true) {
      return <MyCheckBox value size={18} />
    }
    return <MyCheckBox size={18} />
  }

  const renderItem = (name: string, value: any) => {
    return (
      <div className='flex gap-2 w-full items-center'>
        <span className='font-bold text-blue-900 text-nowrap'>{`${name} :`}</span>
        <span>{value}</span>
      </div>
    )
  }

  const renderTable = () => {
    const columns: ColumnsType[] = [
      {
        title: 'Info',
        key: 'isShow',
        dataIndex: 'isShow',
        filters: [
          {
            text: translate('textPopular.showScreen'),
            value: true,
          },
        ],
        onFilter: (value, record) => record.isShow === value,
        render: (_: any, record: any) => {
          return (
            <div className='flex flex-col gap-2'>
              {isMobile && (
                <div className='aspect-square md:w-[200px] w-[100px] overflow-hidden m-auto'>
                  <ImageAdmin src={detectImg(record.icon)} />
                </div>
              )}
              <div className='flex gap-4 w-full items-center'>
                {!isMobile && (
                  <div className='aspect-square md:w-[200px] w-[100px] overflow-hidden m-auto'>
                    <ImageAdmin src={detectImg(record.icon)} />
                  </div>
                )}
                <div className='flex flex-1 flex-col gap-2'>
                  {renderItem(translate('header.name'), getName(record.lang))}
                  {renderItem('Key name', <TextCopy value={record.keyName} />)}
                  {renderItem(translate('textPopular.showScreen'), renderShowScreen(record.isShow))}
                </div>

                {!isMobile && (
                  <div className='md:w-[100px] w-full flex flex-col justify-center items-center gap-4'>
                    <Button onClick={() => handleUpdate(record)} className='w-full'>
                      {translate('common.update')}
                    </Button>
                    <Button onClick={() => handleDelete(record)} className='w-full' type='primary'>
                      {translate('common.delete')}
                    </Button>
                  </div>
                )}
              </div>
              {isMobile && (
                <div className='md:w-[100px] w-full flex flex-col justify-center items-center gap-4'>
                  <Button onClick={() => handleUpdate(record)} className='w-full'>
                    {translate('common.update')}
                  </Button>
                  <Button onClick={() => handleDelete(record)} className='w-full' type='primary'>
                    {translate('common.delete')}
                  </Button>
                </div>
              )}
            </div>
          )
        },
      },
    ]

    return (
      <div>
        <MyTable
          columns={columns}
          loading={isLoading}
          data={data?.data || []}
          limit={PAGE_SIZE_LIMIT}
          total={20}
          extra={<Button onClick={() => handleUpdate(null)}>{translate('common.addNew')}</Button>}
        />
      </div>
    )
  }

  return (
    <div className='flex flex-col w-full gap-2 overflow-y-auto'>
      {renderContent()}
      {renderTable()}
    </div>
  )
}

export default CategoryAdminScreen
