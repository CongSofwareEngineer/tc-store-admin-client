import useLanguage from '@/hook/useLanguage'
import { useModalAdmin } from '@/zustand/useModalAdmin'
import { Button, Checkbox } from 'antd'
import React, { useState } from 'react'
type IOptionAddNew = {
  onchange: (type: 1 | 2) => void
}
const OptionAddNew = ({ onchange }: IOptionAddNew) => {
  const [type, setType] = useState<1 | 2>(2)
  const { closeModal } = useModalAdmin()
  const { translate } = useLanguage()

  const handleSubmit = () => {
    closeModal()
    onchange(type)
  }
  return (
    <div className='flex flex-col gap-4 w-full'>
      <div className='flex justify-between gap-3'>
        <div className='flex flex-col flex-1 '>
          <Checkbox onClick={() => setType(1)} checked={type === 1}>
            Option 1
          </Checkbox>
          <div className='mt-3'>{`{`}</div>
          <div className='ml-3'>{`[key] : [value1,value2]`}</div>
          <div>{`}`}</div>
        </div>
        <div className='flex flex-col flex-1 '>
          <Checkbox onClick={() => setType(2)} checked={type === 2}>
            Option 2
          </Checkbox>
          <div className='mt-3'>{`{`}</div>
          <div className='ml-3'>
            <div>{`[key] : [`}</div>
            <div className='ml-6'>
              <div>{`{`}</div>
              <div className='ml-6'>
                <div>{`[key] : any`}</div>
              </div>
              <div>{`}`}</div>
            </div>

            <div>{`]`}</div>
          </div>
          <div>{`}`}</div>
        </div>
      </div>
      <Button onClick={handleSubmit}>{translate('common.submit')}</Button>
    </div>
  )
}

export default OptionAddNew
