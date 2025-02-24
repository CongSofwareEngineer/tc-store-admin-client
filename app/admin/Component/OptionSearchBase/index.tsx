import { Button, DatePicker } from 'antd'
import React, { useEffect, useState } from 'react'
import dayjs from 'dayjs'
import MyInput from '@/components/MyInput'
import { formatDateTime, plusDay } from '@/utils/momentFunc'

type Props = {
  onChangeDateTime?: (param: any) => any
  onSearchSDT?: () => any
  onSearchIDOther?: () => any
}
const dateStart = plusDay(Date.now(), -24, 'days').format('YYYY-MM-DD')
const { RangePicker } = DatePicker

const OptionSearchBase = ({
  onChangeDateTime = () => {},
  onSearchSDT = () => {},
  onSearchIDOther = () => {},
}: Props) => {
  const [dateTimeBase, setDateTimeBase] = useState([
    dateStart,
    formatDateTime(Date.now(), 'YYYY-MM-DD'),
  ])

  useEffect(() => {
    onChangeDateTime(dateTimeBase)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dateTimeBase])

  const [sdt, setSdt] = useState('')
  const [idOther, setIdOther] = useState('')

  const handleSearchSDT = () => {
    setIdOther('')
    onSearchSDT()
  }

  const handleSearchIDOther = () => {
    setSdt('')
    onSearchIDOther()
  }

  return (
    <div className='flex md:flex-row flex-col gap-3'>
      <RangePicker
        style={{ minWidth: 250 }}
        defaultValue={[
          dayjs(dateStart, 'YYYY-MM-DD'),
          dayjs(formatDateTime(Date.now(), 'YYYY-MM-DD'), 'YYYY-MM-DD'),
        ]}
        defaultPickerValue={[
          dayjs(dateStart, 'YYYY-MM-DD'),
          dayjs(formatDateTime(Date.now(), 'YYYY-MM-DD'), 'YYYY-MM-DD'),
        ]}
        onChange={(_, dateString) => {
          setDateTimeBase(dateString)
        }}
      />
      <div className='flex flex-1 gap-3'>
        <MyInput
          placeholder='SDT'
          type='string'
          value={sdt}
          onChange={(e) => setSdt(e?.toString() || '')}
        />
        <Button type='dashed' onClick={handleSearchSDT}>
          Search
        </Button>
      </div>
      <div className='flex flex-1 gap-3'>
        <MyInput
          placeholder='Id'
          type='string'
          value={idOther}
          onChange={(e) => setIdOther(e?.toString() || '')}
        />
        <Button type='dashed' onClick={handleSearchIDOther}>
          Search
        </Button>
      </div>
    </div>
  )
}

export default OptionSearchBase
