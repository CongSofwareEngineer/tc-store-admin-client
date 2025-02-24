import MyCollapse from '@/components/MyCollapse'
import styled from 'styled-components'

export const CollapseCustom = styled(MyCollapse)`
  .ant-collapse-content {
    margin-top: 20px;
    background-color: transparent !important;
  }
  .ant-collapse-item-active {
    border-bottom: 0px !important;
  }
`
