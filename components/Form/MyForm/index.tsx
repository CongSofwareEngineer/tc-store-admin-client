import { Form, FormProps } from 'antd'
import React from 'react'

type FormPropsType = {
  children?: React.ReactNode | null
  formData?: Record<string, any> | null
} & FormProps

const MyForm = ({ formData, children, ...props }: FormPropsType) => {
  if (!formData) {
    return <></>
  }
  return (
    <Form
      initialValues={formData}
      {...props}
      className={`form-container ${props?.className || ''}`}
    >
      {children}
    </Form>
  )
}

export default MyForm
