import { Collapse, CollapseProps } from 'antd'
import React from 'react'

export type ItemCollapseProps = CollapseProps['items']

type CollapseType = {
  items: ItemCollapseProps
  defaultActiveKey?: Array<string>
  onChange?: any
  className?: string
  expandIcon?: any
  rootClassName?: string
} & CollapseProps

const MyCollapse = ({
  items,
  defaultActiveKey,
  onChange,
  className = '',
  expandIcon = null,
  rootClassName = '',
  ...props
}: CollapseType) => {
  return (
    <Collapse
      expandIcon={expandIcon}
      items={items}
      defaultActiveKey={defaultActiveKey}
      onChange={onChange}
      className={className}
      rootClassName={rootClassName}
      {...props}
    />
  )
}

export default MyCollapse
