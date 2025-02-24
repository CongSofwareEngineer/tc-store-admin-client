import React from 'react'
import styled from 'styled-components'
import { Checkbox } from 'antd'

const CheckBoxCustom = styled(Checkbox)<{ $size?: number }>`
  .ant-checkbox-inner {
    width: ${({ $size }) => $size || 22}px !important;
    height: ${({ $size }) => $size || 22}px !important;
    @media (max-width: 768px) {
      width: ${({ $size }) => $size || 16}px !important;
      height: ${({ $size }) => $size || 16}px !important;
    }
  }
`

type MyCheckBoxProps = {
  className?: string
  onClick?: (param?: any) => any
  size?: number
  value?: boolean
}
const MyCheckBox = ({
  className = '',
  onClick = () => {},
  size,
  value = false,
}: MyCheckBoxProps) => {
  return <CheckBoxCustom checked={value} onClick={onClick} $size={size} className={className} />
}

export default MyCheckBox
