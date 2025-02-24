import useDebounce from '@/hook/useDebounce'
import useLanguage from '@/hook/useLanguage'
import useRoutePage from '@/hook/useRoutePage'
import { SearchOutlined } from '@ant-design/icons'
import { Input } from 'antd'
import { usePathname, useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const InputSearch = ({ keySearch = 'name' }: { keySearch?: string }) => {
  const router = useRoutePage()
  const pathname = usePathname()
  const { translate } = useLanguage()
  const searchParam = useSearchParams()

  const [nameSearch, setNameSearch] = useState('')
  const nameSearchDebounce = useDebounce(nameSearch)

  useEffect(() => {
    setNameSearch(searchParam.get(keySearch) || '')
  }, [searchParam])

  useEffect(() => {
    if (nameSearchDebounce) {
      router.push(`${pathname}?${keySearch}=${nameSearch}`)
    } else {
      router.push(pathname)
    }
  }, [nameSearchDebounce])

  const handleSearch = () => {
    if (!nameSearch) {
      router.push(pathname)
    } else {
      router.push(`${pathname}?${keySearch}=${nameSearch}`)
    }
  }

  const handlePressSearch = () => {
    if (!nameSearch) {
      router.push(pathname)
    } else {
      router.push(`${pathname}?${keySearch}=${nameSearch}`)
    }
  }

  return (
    <Input
      onPressEnter={handlePressSearch}
      className='w-full'
      suffix={
        <SearchOutlined
          className='cursor-pointer hover:scale-105'
          placeholder={translate('textPopular.searchNameProduct')}
          onClick={handleSearch}
        />
      }
      value={nameSearch}
      onChange={(e) => setNameSearch(e.target.value)}
    />
  )
}

export default InputSearch
